# poc-source-map-cli

Recover the original code from a minified file and source map.

## Installation

```shell
⇒ npm install
```

## Usage

Output JSON encoded object of fileUrls -> original source code:

```shell
⇒ ./index.js "/path/to/file.js.map"
```

You could then pipe that into `jq` to see all of the fileUrls included:

```shell
⇒ ./index.js "/path/to/file.js.map" | jq 'keys'
```

Then choosing one of those keys, use `jq` again to access just the original source code for that fileUrl:

```shell
⇒ ./index.js "/path/to/file.js.map" | jq -r '."webpack:///app/src/cli/main.ts"'
```

Which you could then pipe into a file, text editor, etc:

```shell
⇒ ./index.js "/path/to/file.js.map" | jq -r '."webpack:///app/src/cli/main.ts"' > main.ts.orign

⇒ ./index.js "/path/to/file.js.map" | jq -r '."webpack:///app/src/cli/main.ts"' | $EDITOR
```
