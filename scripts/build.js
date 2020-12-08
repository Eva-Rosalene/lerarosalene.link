const pug = require('pug');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

async function build() {
  await promisify(fs.mkdir)('dist', { recursive: true });
  const public = await promisify(fs.readdir)('public');
  for (const entry of public) {
    await promisify(fs.copyFile)(path.join('public', entry), path.join('dist', entry));
  }

  const template = await promisify(fs.readFile)(path.join('src', 'index.pug'), 'utf-8');
  const locals = require('../src/locals');

  const render = pug.compile(template, { filename: 'index.pug' });
  const html = render(locals);

  await promisify(fs.writeFile)(path.join('dist', 'index.html'), html);
}

build().catch(error => console.error(error));
