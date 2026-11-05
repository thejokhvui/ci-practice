const fs = require('node:fs');
const path = require('node:path');
const { version } = require('../package.json');

const dist = path.join(__dirname, '..', 'dist');
fs.mkdirSync(dist, { recursive: true });

fs.writeFileSync(path.join(dist, 'index.html'), '<h1>Hello CI</h1>');

const info = {
  version,
  commit: process.env.GITHUB_SHA || 'local',
  builtAt: new Date().toISOString(),
};

fs.writeFileSync(path.join(dist, 'build-info.json'), JSON.stringify(info, null, 2));
console.log('Build done:', info);
