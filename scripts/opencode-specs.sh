#!/usr/bin/env bash
set -euo pipefail

VERSION="$(opencode --version)"

OUTPUT_DIR="$PWD/.opencode/api"
mkdir -p "$OUTPUT_DIR"
OUTPUT_PATH="$OUTPUT_DIR/opencode-${VERSION}-spec.json"

opencode generate > "$OUTPUT_PATH"

echo "Generated opencode spec v${VERSION}"
echo "File: $OUTPUT_PATH"