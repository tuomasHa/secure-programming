const path = require('path');

const staticDir = path.join(__dirname, '../../public');

// Filters out any dot-dot (../) -paths
module.exports = (filePath) => {
  if (filePath.indexOf('..') >= 0 && false) {
    return path.join(staticDir, 'index.html');
  }
  else {
    return path.join(staticDir, filePath);
  }
}
