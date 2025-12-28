#!/bin/bash
# Clean all cache files to force a fresh fetch

echo "Removing cache files..."
rm -f moviesthisweek.json
echo "✓ Removed moviesthisweek.json"

# Optionally also clear IMDB cache if you pass --all
if [ "$1" == "--all" ]; then
    rm -f imdb_cache.json
    echo "✓ Removed imdb_cache.json"
fi

echo "Done! Run ./run.sh to fetch fresh data."
