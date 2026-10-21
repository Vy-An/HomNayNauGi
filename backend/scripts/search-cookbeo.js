const https = require('https');

function searchCookbeo(query) {
  return new Promise((resolve) => {
    const url = 'https://cookbeo.com/?s=' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let html = '';
      res.on('data', d => html += d);
      res.on('end', () => {
        const regex = /<h3 class="entry-title"><a href="([^"]+)">([^<]+)<\/a>/g;
        const results = [];
        let match;
        while ((match = regex.exec(html)) !== null) {
          results.push({ title: match[2].trim(), url: match[1].trim() });
        }
        resolve(results);
      });
    }).on('error', () => resolve([]));
  });
}

function getOgImage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return getOgImage(res.headers.location).then(resolve);
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const m = html.match(/<meta property="og:image" content="([^"]+)"/i);
        resolve(m ? m[1] : null);
      });
    }).on('error', () => resolve(null));
  });
}

const dishesToSearch = [
  'tôm rang thịt ba chỉ',
  'trứng đúc thịt',
  'đậu phụ rán sả ớt',
  'dưa chua xào trứng',
  'cá basa kho nghệ',
  'gà xào mướp',
  'nui xào bò',
  'mực xào cần tỏi'
];

async function main() {
  for (const q of dishesToSearch) {
    const items = await searchCookbeo(q);
    console.log(`\n=== Query: ${q} ===`);
    for (const item of items.slice(0, 2)) {
      const img = await getOgImage(item.url);
      console.log(`- ${item.title}: ${item.url}\n  Image: ${img}`);
    }
  }
}

main();
