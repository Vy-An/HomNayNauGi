const https = require('https');
const http = require('http');

function getOgImage(targetUrl) {
  return new Promise((resolve) => {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = parsed.origin + loc;
        return getOgImage(loc).then(resolve);
      }
      if (res.statusCode !== 200) {
        return resolve({ url: targetUrl, status: res.statusCode, ogImage: null });
      }
      let html = '';
      res.on('data', chunk => { html += chunk; });
      res.on('end', () => {
        const m = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i) ||
                  html.match(/<meta content=["']([^"']+)["'] property=["']og:image["']/i);
        resolve({ url: targetUrl, status: 200, ogImage: m ? m[1] : null });
      });
    }).on('error', err => resolve({ url: targetUrl, error: err.message, ogImage: null }));
  });
}

const urls = process.argv.slice(2);
if (urls.length === 0) {
  urls.push('https://www.dienmayxanh.com/vao-bep/cach-lam-dua-cai-chua-xao-trung-don-gian-moi-la-doi-vi-cho-13788');
}

async function run() {
  for (const u of urls) {
    const res = await getOgImage(u);
    console.log(JSON.stringify(res, null, 2));
  }
}

run();
