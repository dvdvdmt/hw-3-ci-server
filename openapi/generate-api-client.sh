#!/bin/bash

set -e

scriptDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
rootDir="$scriptDir/.."
clientDir="$rootDir/client"
generatorOutTmpDir="$clientDir/api-tmp"
generatedApiDir="$clientDir/src/api/generated"

npx openapi-generator generate \
  --enable-post-process-file \
  --input-spec "$rootDir/public/openapi.yml" \
  --generator-name javascript \
  --config "$scriptDir/generator-config.yml" \
  --output "$generatorOutTmpDir"
# more options can be found here https://github.com/OpenAPITools/openapi-generator/blob/master/docs/usage.md#generate

mkdir -p "$generatedApiDir" && cp -r "$generatorOutTmpDir/src/" "$generatedApiDir"

npx prettier --write "$generatedApiDir/**/*.js"

rm -rf "$generatorOutTmpDir"

