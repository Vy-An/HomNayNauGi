const https = require('https');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve);
      }
      if (res.statusCode !== 200) return resolve('');
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

const categories = [
  'https://cookbeo.com/category/mon-trung/',
  'https://cookbeo.com/category/mon-xao/',
  'https://cookbeo.com/category/mon-luoc/',
  'https://cookbeo.com/category/mon-kho/',
  'https://cookbeo.com/category/mon-chien/',
  'https://cookbeo.com/category/mon-rau/',
  'https://cookbeo.com/category/mon-ga/',
  'https://cookbeo.com/category/thit-lon/',
  'https://cookbeo.com/category/thit-bo/',
  'https://cookbeo.com/category/mon-rang/'
];

async function main() {
  const map = new Map();
  for (const cat of categories) {
    const html = await fetchPage(cat);
    // Find all <a href="https://cookbeo.com/recipes/.../ or /recipes/...
    const regex = /href="((?:https:\/\/cookbeo\.com)?\/recipes\/([^"\/]+)\/?)"[^>]*>([^<]+)<\/a>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const slug = match[2];
      const title = match[3].trim();
      const fullUrl = `https://cookbeo.com/recipes/${slug}`;
      if (title && !title.includes('<') && !map.has(fullUrl)) {
        map.set(fullUrl, title);
      }
    }
  }

  console.log(`Found ${map.size} recipes:`);
  for (const [url, title] of map.entries()) {
    console.log(`${title} -> ${url}`);
  }
}

main();
