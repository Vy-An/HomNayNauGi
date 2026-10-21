const https = require('https');

function getOgImage(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return getOgImage(res.headers.location).then(resolve);
      }
      if (res.statusCode !== 200) {
        return resolve({ url, status: res.statusCode, ogImage: null });
      }
      let html = '';
      res.on('data', chunk => { html += chunk; });
      res.on('end', () => {
        const m = html.match(/<meta property="og:image" content="([^"]+)"/i);
        resolve({ url, status: 200, ogImage: m ? m[1] : null });
      });
    }).on('error', err => resolve({ url, error: err.message, ogImage: null }));
  });
}

const candidates = [
  'https://cookbeo.com/recipes/bap-cai-luoc/',
  'https://cookbeo.com/recipes/rau-lang-luoc/',
  'https://cookbeo.com/recipes/cai-chua-xao-trung/',
  'https://cookbeo.com/recipes/ga-xao-muop/',
  'https://cookbeo.com/recipes/ga-kho-sa-ot/',
  'https://cookbeo.com/recipes/thit-kho-mam-ruoc/',
  'https://cookbeo.com/recipes/tom-rim-thit-ba-chi/',
  'https://cookbeo.com/recipes/suon-kho-thom/',
  'https://cookbeo.com/recipes/trung-chien-thit-bam/',
  'https://cookbeo.com/recipes/trung-ran-thit/',
  'https://cookbeo.com/recipes/dau-hu-chien-sa/',
  'https://cookbeo.com/recipes/dau-phu-tam-hanh/'
];

async function run() {
  for (const c of candidates) {
    const res = await getOgImage(c);
    console.log(`${c} -> status: ${res.status}, ogImage: ${res.ogImage}`);
  }
}

run();
