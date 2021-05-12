#!/bin/bash

# Script to build the extension zip and install the package
#
# This Script is released under GPL v3 license
# Copyright (C) 2021 Javad Rahmatzadeh

set -e

# cd to the repo root
cd "$( cd "$( dirname "$0" )" && pwd )/.."

echo "Compiling schemas..."
glib-compile-schemas schemas/

echo "Generating translations..."
scripts/generate-mo.sh

echo "Packing extension..."
gnome-extensions pack \
    --force \
    --extra-source="bin" \
    --extra-source="lib" \
    --extra-source="ui" \
    --extra-source="LICENSE" \
    --extra-source="README.md" \
    --extra-source="CHANGELOG.md"

echo "Packing Done!"

while getopts i flag; do
    case $flag in

        i)  gnome-extensions install \
            --force just-perfection-desktop@just-perfection.shell-extension.zip && \
            echo "Extension is installed. Now restart the GNOME Shell." || \
            { echo "ERROR: Could not install the extension!"; exit 1; };;

        *)  echo "ERROR: Invalid flag!"
            echo "Use '-i' to install the extension to your system."
            echo "To just build it, run the script without any flag."
            exit 1;;
    esac
done

