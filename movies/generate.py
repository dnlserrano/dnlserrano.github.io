import json
import logging
import os
import requests

from datetime import datetime, timedelta

import duckdb
import jinja2
import movieposters as mp

logger = logging.getLogger(__name__)

TEMPLATE_FILE = 'template.html.j2'
MOVIES_FILE = 'moviesthisweek.json'
CHANNELS = [
    'TVCTOPH',
    'TVCEDIH',
    'TVCEMOH',
    'TVCACTH',
    'CINEHD',
    'HOLHD',
    'STARMOV',
    'AMCHD',
    'AXNMHD',
    'AXNHD',
    'AXWHD',
    'STARCHA',
    'STARLIF',
    'STARCRI',
    'STARCOM',
    'SYFHD',
    'VOD',
]

def fetch_movie_data():
    if os.path.exists(MOVIES_FILE):
        with open(MOVIES_FILE, 'r') as f:
            return json.load(f)

    api_url = 'https://authservice.apps.meo.pt/Services/GridTv/GridTvMng.svc/getProgramsFromChannels'
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Origin': 'https://www.meo.pt'
    }
    payload = {
        "service": "channelsguide",
        "channels": CHANNELS,
        "dateStart": (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        "dateEnd": (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%dT%H:%M:%S.000Z'),
        "accountID": ""
    }

    response = requests.post(api_url, headers=headers, data=json.dumps(payload))
    data = response.json()['d']['channels']

    con = duckdb.connect()
    con.execute("CREATE TABLE title_akas AS SELECT * FROM read_csv('title.akas.tsv', delim='\t', ignore_errors=true)")
    con.execute("CREATE TABLE title_basics AS SELECT * FROM read_csv('title.basics.tsv', delim='\t', ignore_errors=true)")
    con.execute("CREATE TABLE title_crew AS SELECT * FROM read_csv('title.crew.tsv', delim='\t', ignore_errors=true)")
    con.execute("CREATE TABLE title_ratings AS SELECT * FROM read_csv('title.ratings.tsv', delim='\t', ignore_errors=true)")
    con.execute("CREATE TABLE name_basics AS SELECT * FROM read_csv('name.basics.tsv', delim='\t', ignore_errors=true)")

    movies = []
    programs = []
    for channel in data:
        channel_name = channel['name']

        for program in channel['programs']:
            if program in programs:
                continue

            programs.append(program)
            title = program['name']
            date = program['date']
            start = program['timeIni']
            finish = program['timeEnd']
            logger.debug(f"analysing {channel_name} {title} {date} {start} {finish}")

            query = """
                SELECT
                    tb.tconst,
                    tb.originalTitle,
                    tb.startYear,
                    tb.genres,
                    tr.averageRating,
                    tc.directors,
                    tc.writers
                FROM title_akas ta
                JOIN title_basics tb ON ta.titleId = tb.tconst
                JOIN title_crew tc ON ta.titleId = tc.tconst
                JOIN title_ratings tr ON ta.titleId = tr.tconst
                WHERE ta.title = ?
                AND tb.titleType = 'movie'
                LIMIT 1;
            """

            try:
                movie_db = con.execute(query, [title]).fetchone()
                if movie_db:
                    imdb_id = movie_db[0]
                    director_ids = movie_db[5].split(',') if movie_db[5] else []
                    writers = movie_db[6].split(',') if movie_db[6] else []

                    # Query all director names in one go
                    if director_ids:
                        placeholders = ','.join(['?'] * len(director_ids))
                        director_query = f"SELECT primaryName FROM name_basics WHERE nconst IN ({placeholders})"
                        director_names = [row[0] for row in con.execute(director_query, director_ids).fetchall()]
                    else:
                        director_names = []

                    poster_url = ''
                    try:
                        poster_url = mp.get_poster(id=imdb_id)
                    except Exception as e:
                        logger.debug(f"error fetching poster: {e}")
                    logger.debug(poster_url)

                    movie = {
                        'id': imdb_id,
                        'title': movie_db[1],
                        'year': movie_db[2],
                        'poster_url': poster_url,
                        'channel': channel_name,
                        'time': datetime.strptime(f"{date} {start}", "%d-%m-%Y %H:%M").strftime("%Y-%m-%dT%H:%M:00Z"),
                        'time_display': f"{start} - {finish}",
                        'date': date,
                        'genres': movie_db[3].split(','),
                        'rating': movie_db[4],
                        'director': director_names,
                        'writer': writers,
                    }
                    movies.append(movie)
                    logger.debug(f"found info to add {title}")
                else:
                    logger.debug(f"no match found for {title}")
            except Exception as e:
                logger.debug(f"error processing {title}: {e}")

    with open(MOVIES_FILE, 'w') as f:
        json.dump(movies, f)

    return movies

templateLoader = jinja2.FileSystemLoader(searchpath="./")
templateEnv = jinja2.Environment(loader=templateLoader)
template = templateEnv.get_template(TEMPLATE_FILE)

if __name__ == "__main__":
    html = template.render(movies=fetch_movie_data())
    print(html)
