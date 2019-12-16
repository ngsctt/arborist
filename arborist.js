const Path = require('path');
const fs = require('fs');

const defaultOptions = {
  typeKey: "type"
};

function step (p, o, m, l) {
  let stats = fs.lstatSync(p);
  let pathObj = Path.parse(p);
  
  let info = {
    path: p,
    [o.typeKey]: undefined
  };
  if (stats.isFile()) {
    info[o.typeKey] = 'file';
    info.extension = pathObj.ext;
  }
  if (o && o.path && Array.isArray(o.path)) {
    o.path.forEach(x => {
      if (pathObj[x]) info[x] = pathObj[x];
    });
  }
  if (o && o.stats && Array.isArray(o.stats)) {
    o.stats.forEach(x => {
      if (stats[x]) info[x] = stats[x];
    });
  }
  if (stats.isDirectory()) {
    info[o.typeKey] = 'directory';
    let childNodes = fs.readdirSync(p).map(c => {
      return { base: c, path: Path.join(p, c) };
    });
    if (o && o.exclude && Array.isArray(o.exclude)) {
      let exclusions = o.exclude.map(r => new RegExp(r));
      childNodes = childNodes.filter(c => {
        return exclusions.reduce((o, e) => {
          if (o === true) return !e.test(c.base) && !e.test(c.path);
          else return false;
        }, true);
      });
    }
    if (!m || l + 1 < m) info.children = childNodes.map(c => step(c.path, o, m, l+1));
    else info.children = childNodes;
  }
  return info;
}

const arborist = module.exports = (path, options, m) => {
  const o = Object.assign(defaultOptions, options);
  return step(path, o, m, 0);
}
