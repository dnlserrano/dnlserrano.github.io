import json
import logging
import os
import re
import requests
import sys
import time

from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta

import duckdb
import imdb
import jinja2

# Log to stderr so it doesn't pollute the HTML output
logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s: %(message)s',
    stream=sys.stderr
)
logger = logging.getLogger(__name__)

TEMPLATE_FILE = 'template.html.j2'
MOVIES_FILE = 'moviesthisweek.json'
IMDB_CACHE_FILE = 'imdb_cache.json'
CACHE_VERSION = 2  # Increment this when data structure changes
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
    # Check if cached data exists and is current version
    if os.path.exists(MOVIES_FILE):
        logger.info(f"Checking cached data from {MOVIES_FILE}")
        try:
            with open(MOVIES_FILE, 'r') as f:
                cached = json.load(f)
                # Check if it's the new versioned format
                if isinstance(cached, dict) and cached.get('version') == CACHE_VERSION:
                    logger.info("Using cached data (version matches)")
                    return cached.get('movies', [])
                else:
                    logger.info("Cache version mismatch or old format, refreshing...")
        except Exception as e:
            logger.warning(f"Could not load cache: {e}, refreshing...")

    logger.info("Fetching TV guide from MEO API...")

    # Fetch programs for yesterday, today, and tomorrow only
    all_programs = []
    today = datetime.now()

    for channel in CHANNELS:
        for day_offset in range(-1, 2):  # -1 (yesterday), 0 (today), 1 (tomorrow)
            date = today + timedelta(days=day_offset)
            date_str = date.strftime('%Y-%m-%d')

            url = f"https://meogouser.apps.meo.pt/Services/GridTv/GridTv.svc/GetLiveChannelProgramsByDate"
            params = {
                'callLetter': channel,
                'date': date_str,
                'userAgent': 'IPTV_OFR_GTV'
            }

            headers = {
                'accept': '*/*',
                'origin': 'https://www.meo.pt',
                'referer': 'https://www.meo.pt/'
            }

            logger.info(f"Fetching {channel} for {date_str}...")

            try:
                response = requests.get(url, params=params, headers=headers, timeout=10)
                response.raise_for_status()
                data = response.json()

                if data.get('Status') == 'OK':
                    programs = data.get('Result', [])
                    logger.info(f"  Found {len(programs)} programs")
                    all_programs.extend(programs)
                else:
                    logger.warning(f"  API returned status: {data.get('Status')}")
            except Exception as e:
                logger.error(f"  Error fetching data: {e}")

    logger.info(f"Total programs fetched: {len(all_programs)}")

    if not all_programs:
        logger.error("No programs found!")
        return []

    # Setup DuckDB
    logger.info("Setting up database...")
    con = duckdb.connect()
    con.execute("CREATE TABLE title_akas AS SELECT * FROM read_csv('title.akas.tsv', delim='\t', ignore_errors=true)")
    con.execute("CREATE TABLE title_basics AS SELECT * FROM read_csv('title.basics.tsv', delim='\t', ignore_errors=true)")

    # Extract all unique titles from programs
    logger.info("Extracting unique titles from programs...")
    unique_titles = list(set(program['Title'] for program in all_programs))
    logger.info(f"Found {len(unique_titles)} unique titles to lookup")

    # Run ONE big SQL query to get all matching movies at once
    logger.info("Running optimized bulk SQL query...")
    placeholders = ', '.join(['?' for _ in unique_titles])
    query = f"""
        SELECT DISTINCT ON (ta.title)
            ta.title,
            tb.tconst,
            tb.originalTitle,
            tb.startYear,
            tb.genres
        FROM title_akas ta
        JOIN title_basics tb ON ta.titleId = tb.tconst
        WHERE ta.title IN ({placeholders})
        AND (ta.region = 'PT' OR ta.region = 'US')
        AND tb.titleType = 'movie';
    """

    movie_db_results = con.execute(query, unique_titles).fetchall()
    logger.info(f"Database returned {len(movie_db_results)} movie matches")

    # Build a lookup dictionary: title -> movie_db_info
    movie_db_lookup = {row[0]: row[1:] for row in movie_db_results}

    # Load existing IMDB cache
    imdb_cache = {}
    if os.path.exists(IMDB_CACHE_FILE):
        logger.info(f"Loading IMDB cache from {IMDB_CACHE_FILE}")
        try:
            with open(IMDB_CACHE_FILE, 'r') as f:
                imdb_cache = json.load(f)
            logger.info(f"Loaded {len(imdb_cache)} cached IMDB entries")
        except Exception as e:
            logger.warning(f"Could not load IMDB cache: {e}")
            imdb_cache = {}

    # Fetch IMDB data for all found movies (PARALLEL!)
    # Only fetch movies not already in cache
    movies_to_fetch = {
        title: info for title, info in movie_db_lookup.items()
        if title not in imdb_cache
    }

    logger.info(f"Found {len(imdb_cache)} movies in cache, need to fetch {len(movies_to_fetch)} new ones")
    imdb_lookup = imdb_cache.copy()  # Start with cached data

    def fetch_imdb_data(title_and_info):
        """Fetch IMDB data for a single movie - designed for parallel execution"""
        title, movie_db_info = title_and_info
        tconst = movie_db_info[0]

        # Retry logic with exponential backoff
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Add delay to avoid rate limiting (stagger requests)
                time.sleep(0.5 + (attempt * 1.0))  # 0.5s, 1.5s, 2.5s

                # Each thread gets its own IMDb instance to avoid threading issues
                access = imdb.IMDb()
                movie = access.get_movie(int(tconst[2:]))

                result = {
                    'poster_url': movie.get('full-size cover url') or movie.get('cover url', ''),
                    'rating': movie.get('rating'),
                    'cast': [actor['name'] for actor in movie.get('cast', [])[:10]],
                    'director': [d['name'] for d in movie.get('director', [])],
                    'plot': movie.get('plot', [''])[0] if movie.get('plot') else '',
                }
                logger.info(f"✓ IMDB data for: {title} (rating: {result['rating']}, attempt: {attempt + 1})")
                return title, result
            except Exception as e:
                if attempt < max_retries - 1:
                    logger.warning(f"IMDB error for {title} (attempt {attempt + 1}/{max_retries}): {e}, retrying...")
                    time.sleep(2 ** attempt)  # Exponential backoff: 1s, 2s, 4s
                else:
                    logger.warning(f"IMDB error for {title} after {max_retries} attempts: {e}")
                    return title, {
                        'poster_url': '',
                        'rating': None,
                        'cast': [],
                        'director': [],
                        'plot': '',
                    }

    # Use ThreadPoolExecutor to fetch IMDB data in parallel
    # Use only 3 workers to avoid rate limiting
    if movies_to_fetch:
        logger.info(f"Fetching with 3 parallel workers and delays to avoid rate limiting...")
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = {
                executor.submit(fetch_imdb_data, item): item[0]
                for item in movies_to_fetch.items()
            }

            for future in as_completed(futures):
                title, imdb_data = future.result()
                imdb_lookup[title] = imdb_data

                # Save cache after each fetch to avoid losing progress
                try:
                    with open(IMDB_CACHE_FILE, 'w') as f:
                        json.dump(imdb_lookup, f, indent=2)
                except Exception as e:
                    logger.warning(f"Could not save IMDB cache: {e}")
    else:
        logger.info("All movies already cached, skipping IMDB fetch!")

    # Now process programs and match against lookup
    logger.info("Processing programs and matching against lookup...")
    movies = []
    for program in all_programs:
        title = program['Title']

        # Check if we have this title in our lookup
        if title not in movie_db_lookup:
            continue

        movie_db_info = movie_db_lookup[title]
        imdb_info = imdb_lookup.get(title, {
            'poster_url': '',
            'rating': None,
            'cast': [],
            'director': [],
            'plot': '',
        })

        channel_id = program.get('ChannelCallLetter', program.get('CallLetter', 'Unknown'))
        if channel_id == 'Unknown':
            logger.debug(f"Unknown channel for {title}, keys: {list(program.keys())[:5]}")
        start_date = datetime.fromisoformat(program['StartDate'].replace('Z', ''))
        end_date = datetime.fromisoformat(program['EndDate'].replace('Z', ''))

        # Format dates
        date_str = start_date.strftime('%d-%m-%Y')
        time_str = start_date.strftime('%H:%M')
        time_end_str = end_date.strftime('%H:%M')
        time_iso = start_date.strftime('%Y-%m-%dT%H:%M:00Z')

        movie = {
            'id': movie_db_info[0],  # tconst
            'title': movie_db_info[1],  # originalTitle
            'originalTitle': movie_db_info[1],
            'year': movie_db_info[2],  # startYear
            'poster_url': imdb_info['poster_url'],
            'channel': channel_id,
            'time': time_iso,
            'time_display': f"{time_str} - {time_end_str}",
            'date': date_str,
            'genres': movie_db_info[3].split(',') if movie_db_info[3] else [],  # genres
            'rating': imdb_info['rating'],
            'cast': imdb_info['cast'],
            'director': imdb_info['director'],
            'plot': imdb_info['plot'],
        }
        movies.append(movie)

    logger.info(f"Found {len(movies)} movies total")

    # Save with version info
    with open(MOVIES_FILE, 'w') as f:
        json.dump({
            'version': CACHE_VERSION,
            'generated_at': datetime.now().isoformat(),
            'movies': movies
        }, f, indent=2)

    return movies

templateLoader = jinja2.FileSystemLoader(searchpath="./")
templateEnv = jinja2.Environment(loader=templateLoader)
template = templateEnv.get_template(TEMPLATE_FILE)

print(template.render(movies=fetch_movie_data()))
