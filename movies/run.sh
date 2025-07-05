#!/bin/bash

for file in title.basics.tsv.gz title.akas.tsv.gz title.crew.tsv.gz title.ratings.tsv.gz name.basics.tsv.gz; do
    wget https://datasets.imdbws.com/$file
    gzip -d $file
done

pip install duckdb
pip install jinja2
pip install movieposters

python generate.py > ../_includes/movies.html
