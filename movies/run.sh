#!/bin/bash

# Redirect all setup output to stderr so only the HTML goes to stdout
{
    if [ ! -f "title.basics.tsv" ]; then
        echo "Downloading title.basics.tsv..."
        wget -q https://datasets.imdbws.com/title.basics.tsv.gz
        gzip -d title.basics.tsv.gz
    fi

    if [ ! -f "title.akas.tsv" ]; then
        echo "Downloading title.akas.tsv..."
        wget -q https://datasets.imdbws.com/title.akas.tsv.gz
        gzip -d title.akas.tsv.gz
    fi

    echo "Installing Python dependencies..."
    pip install -q duckdb IMDbPY jinja2 requests

    echo "Generating movies page..."
} >&2

# Only the Python output (HTML) goes to stdout
python generate.py