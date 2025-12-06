#!/bin/bash

DEST="$HOME/public/sy-test"

mkdir -p "$DEST"

rsync -av --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    ./ "$DEST"
