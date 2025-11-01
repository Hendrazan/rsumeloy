const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Tentukan apakah lingkungan ini adalah 'production' atau bukan
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Ambil PORT dari environment hosting, atau gunakan 3000 jika tidak ada
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    // Biarkan Next.js yang menangani semua request yang masuk
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});