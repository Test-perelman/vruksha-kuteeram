const { createReadStream, existsSync, statSync } = require('node:fs');
const { createServer } = require('node:http');
const { extname, join, normalize, resolve, sep } = require('node:path');

const root = resolve(__dirname, 'out');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function cacheControl(filePath) {
  if (filePath.includes(`${sep}_next${sep}static${sep}`) || filePath.includes(`${sep}brand-assets${sep}`)) {
    return 'public, max-age=31536000, immutable';
  }

  if (extname(filePath) === '.html') {
    return 'public, max-age=0, must-revalidate';
  }

  return 'public, max-age=3600';
}

function resolveRequestPath(requestUrl) {
  const { pathname } = new URL(requestUrl, 'http://localhost');
  const decodedPath = decodeURIComponent(pathname);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const fullPath = resolve(root, `.${safePath}`);

  if (!fullPath.startsWith(root + sep) && fullPath !== root) {
    return null;
  }

  if (existsSync(fullPath) && statSync(fullPath).isFile()) {
    return fullPath;
  }

  if (existsSync(fullPath) && statSync(fullPath).isDirectory()) {
    const indexPath = join(fullPath, 'index.html');
    if (existsSync(indexPath)) return indexPath;
  }

  const htmlPath = `${fullPath}.html`;
  if (existsSync(htmlPath)) return htmlPath;

  const fallbackPath = join(root, '404.html');
  return existsSync(fallbackPath) ? fallbackPath : join(root, 'index.html');
}

createServer((request, response) => {
  if (!root || !existsSync(root)) {
    response.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Static build is missing. Run npm run build first.');
    return;
  }

  const filePath = resolveRequestPath(request.url || '/');

  if (!filePath) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream';

  response.writeHead(filePath.endsWith('404.html') ? 404 : 200, {
    'Cache-Control': cacheControl(filePath),
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff'
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}).listen(port, host);
