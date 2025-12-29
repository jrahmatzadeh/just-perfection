#!/bin/bash

# Script to update main.pot and *.po files
#
# This Script is released under GPL v3 license
# Copyright (C) 2020-2026 Javad Rahmatzadeh

set -e

# cd to the repo root
cd "$( cd "$( dirname "$0" )" && pwd )/.."

find -name *.ui -o -name *.js | xargs \
xgettext \
    --from-code=UTF-8 \
    --copyright-holder="Just Perfection" \
    --package-name="Just Perfection" \
    --package-version="3" \
    --output="po/main.pot"

for file in po/*.po
do
    echo -n "Updating $(basename "$file" .po)"
    msgmerge -U "$file" po/main.pot
  
    if grep --silent "#, fuzzy" "$file"; then
        fuzzy+=("$(basename "$file" .po)")
    fi
done

if [[ -v fuzzy ]]; then
    echo "WARNING: Translations have unclear strings and need an update: ${fuzzy[*]}"
fi

