#!/bin/bash

# Script to generate locale MO files
#
# This Script is released under GPL v3 license
# Copyright (C) 2020 Just Perfection

localeFolder="../locale";

for filename in *.po; do
    lang=$(basename "$filename" .po);
    moPath="$localeFolder/$lang/LC_MESSAGES/just-perfection.mo";
    mkdir -p "$localeFolder/$lang/LC_MESSAGES";
    msgfmt $filename --output-file="$moPath"
    echo "$lang [OK]";
done

