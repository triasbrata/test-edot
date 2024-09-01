#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Path to Protoc Plugin
PROTOC_GEN_TS_PATH="${ROOT_DIR}/node_modules/.bin/protoc-gen-ts"

# Directory holding all .proto files
SRC_DIR="${ROOT_DIR}/proto"

# Directory to write generated code (.d.ts files)
OUT_DIR="${ROOT_DIR}/libs/proto/src"

# Clean all existing generated files
rm -r "${OUT_DIR}"
mkdir -p "${OUT_DIR}"

# Generate all messages
node ./node_modules/.bin/tsproto --comments --template template.hbs --path proto --output $OUT_DIR
