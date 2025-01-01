import json
import logging
import os
import requests

from datetime import datetime, timedelta

import duckdb
import imdb
import jinja2

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

            query = f"""
                SELECT
                    tb.tconst,
                    tb.originalTitle,
                    tb.startYear,
                    tb.genres
                FROM title_akas ta
                JOIN title_basics tb ON ta.titleId = tb.tconst
                WHERE ta.title = ?
                AND (ta.region = 'PT' OR ta.region = 'US')
                AND tb.titleType = 'movie'
                LIMIT 1;
            """

            try:
                movie_db = con.execute(query, [title]).fetchone()
                if movie_db:
                    try:
                        access = imdb.IMDb()
                        movie = access.get_movie(int(movie_db[0][2:]))

                        # poster
                        poster_url = movie['cover url']

                        # rating
                        rating = movie['rating']

                        # cast
                        cast = [actor for actor in map(lambda actor: actor['name'], movie['cast'])]
                        cast.sort()
                        cast = cast[0:10]

                        # director
                        director = [d['name'] for d in movie['director']]
                    except:
                        poster_url = ""
                        rating = None
                        cast = None

                    logger.debug(f"found match for {title} :: {movie_db[1]}")
                    movie = {
                        'id': movie_db[0],
                        'title': movie_db[1],
                        'year': movie_db[2],
                        'poster_url': poster_url,
                        'channel': channel_name,
                        'time': datetime.strptime(f"{date} {start}", "%d-%m-%Y %H:%M").strftime("%Y-%m-%dT%H:%M:00Z"),
                        'time_display': f"{start} - {finish}",
                        'date': date,
                        'genres': movie_db[3].split(','),
                        'rating': rating,
                        'cast': cast,
                        'director': director,
                    }
                    movies.append(movie)
                    logger.debug(f"found info to add {title}")
            except:
                logger.debug(f"error processing {title}")

    with open(MOVIES_FILE, 'w') as f:
        json.dump(movies, f)

    return movies

templateLoader = jinja2.FileSystemLoader(searchpath="./")
templateEnv = jinja2.Environment(loader=templateLoader)
template = templateEnv.get_template(TEMPLATE_FILE)

print(template.render(movies=fetch_movie_data()))