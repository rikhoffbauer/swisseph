#!/usr/bin/env bash
set -e
mkdir -p dist
emcc deps/swisseph/*.c -s WASM=1 -s MODULARIZE=1 -s EXPORT_ES6=1 -O2 -o dist/swisseph.js
