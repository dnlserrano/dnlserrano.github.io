#!/bin/bash

if [ ! -f "title.basics.tsv" ]; then
    wget https://datasets.imdbws.com/title.basics.tsv.gz
    gzip -d title.basics.tsv.gz
fi

if [ ! -f "title.akas.tsv" ]; then
    wget https://datasets.imdbws.com/title.akas.tsv.gz
    gzip -d title.akas.tsv.gz
fi

pip install duckdb
pip install IMDbPY
pip install jinja2
pip install requests

python generate.py