#!/bin/bash

wget https://datasets.imdbws.com/title.basics.tsv.gz
gzip -d title.basics.tsv.gz

wget https://datasets.imdbws.com/title.akas.tsv.gz
gzip -d title.akas.tsv.gz | gzip -d

pip install duckdb
pip install IMDbPY
pip install jinja2

python generate.py > ../_includes/movies.html
