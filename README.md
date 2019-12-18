# arborist
## What
A Node.js directory tree builder

## Why
I initially tried using [directory-tree][], but found it wasn't flexible enough

## How
### Installation
```
npm i @ngsctt/arborist
```

### Usage
```js
const arborist = require('@ngsctt/arborist');

const rootDir = 'directory';      // relative to __dirname
const options = {
  stats: ["birthtime", "mtime"],  // lstatSync properties to include
  path: ["dir", "base", "name"],  // Node path properties to include
  exclude: ["^.DS_Store", "^_"]   // globs to exclude
}
const maxDepth = 10;              // maximum depth of tree

const tree = arborist(rootDir, options, maxDepth)
```

## Licence
This project is released under the [MIT Licence](/LICENSE).



[directory-tree]: https://www.npmjs.com/package/directory-tree