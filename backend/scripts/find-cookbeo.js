const https = require('https');

function get(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return get(res.headers.location);
    }
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => {
      const og = b.match(/<meta property="og:image" content="([^"]+)"/i);
      console.log('OG Image:', og ? og[1] : 'Not found');
    });
  }).on('error', e => console.error(e.message));
}

get('https://cookbeo.com/recipes/bau-luoc');
