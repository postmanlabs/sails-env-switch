#!/usr/bin/env bash

echo
echo "Running unit tests..."
echo "mocha v`mocha --version`";

mocha test/unit/**/*.test.js;