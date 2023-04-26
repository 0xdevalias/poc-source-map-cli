#!/usr/bin/env node --experimental-modules

// Ref:
//   https://github.com/mozilla/source-map
//     Consume and generate source maps
//
//     https://github.com/mozilla/source-map#sourcemapconsumerwith
//       Construct a new SourceMapConsumer from rawSourceMap and sourceMapUrl (see the SourceMapConsumer constructor for details. Then, invoke the async function f(SourceMapConsumer) -> T with the newly constructed consumer, wait for f to complete, call destroy on the consumer, and return f's return value.
//
//     https://github.com/mozilla/source-map#sourcemapconsumerprototypesourcecontentforsource-returnnullonmissing
//       Returns the original source content for the source provided.
//
//   https://github.com/mozilla/source-map/issues/484
//     Add minimal CLI tool to recover original source

import { readFileSync } from 'fs';
import { SourceMapConsumer } from 'source-map'

// Get the sourcemap path from the command line arguments
const sourcemapPath = process.argv[2];

if (!sourcemapPath || sourcemapPath.trim() === '') {
  console.error('Error: sourceMapPath argument is missing or empty');
  console.error('Usage: node index.js <sourceMapPath>');
  process.exit(1);
}

// Load the sourcemap data
const sourcemapData = readFileSync(sourcemapPath, 'utf8');

// Process the sourcemap data to recover the original source code
const originalSources = await SourceMapConsumer.with(sourcemapData, null, async (consumer) => {
  console.error("Original Source URLs:", consumer.sources);

  return consumer.sources.reduce((acc, sourceUrl) => ({
    ...acc,
    [sourceUrl]: consumer.sourceContentFor(sourceUrl)
  }), {});
});

// Output the mapping of sourceUrls to original source as JSON
console.log(JSON.stringify(originalSources, null, 2));
