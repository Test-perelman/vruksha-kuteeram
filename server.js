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

  if (['.html', '.txt', '.json'].includes(extname(filePath))) {
    return 'no-store, no-cache, must-revalidate, max-age=0, s-maxage=0';
  }

  return 'public, max-age=3600';
}

function responseHeaders(filePath) {
  const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream';
  const control = cacheControl(filePath);
  const headers = {
    'Cache-Control': control,
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff'
  };

  if (control.includes('no-store')) {
    headers.Pragma = 'no-cache';
    headers.Expires = '0';
    headers['CDN-Cache-Control'] = 'no-store';
    headers['Surrogate-Control'] = 'no-store';
  }

  return headers;
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

  return join(root, 'index.html');
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

  response.writeHead(200, responseHeaders(filePath));

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}).listen(port, host);
