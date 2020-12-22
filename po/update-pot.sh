#!/bin/bash

# Script to update main.pot and *.po files
#
# This Script is released under GPL v3 license
# Copyright (C) 2020 Just Perfection

set -e

# Go the repo root.
cd "$( cd "$( dirname "$0" )" && pwd )/.."

xgettext --from-code=UTF-8 --copyright-holder="Just Perfection" --package-name="Just Perfection" \
  --package-version="3" --output="po/main.pot" ui/prefs.ui

for file in po/*.po
do
  echo -n "Updating $(basename "$file" .po) "
  msgmerge -U "$file" po/main.pot
  
  if grep --silent "#, fuzzy" "$file"; then
    fuzzy+=("$(basename "$file" .po)")
  fi
done

# Display a warning if any translation needs an update.
if [[ -v fuzzy ]]; then
  echo "WARNING: Some translations have unclear strings and need an update: ${fuzzy[*]}"
fi
