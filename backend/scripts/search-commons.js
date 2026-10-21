const https = require('https');

function searchWikiCommons(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime|size&format=json`;
    https.get(url, { headers: { 'User-Agent': 'HomNayNauGi/1.0 (contact@homnaynaugi.vn)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages || {};
          const results = Object.values(pages).map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url,
            mime: p.imageinfo?.[0]?.mime,
            size: p.imageinfo?.[0]?.size
          })).filter(x => x.mime && x.mime.startsWith('image/'));
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const terms = [
    'fried fish cake dill',
    'chả cá thì là',
    'chả cá chiên',
    'fried tofu lemongrass',
    'lemongrass tofu',
    'đậu hũ chiên sả',
    'đậu phụ sả',
    'scrambled egg pickled',
    'dưa chua xào trứng',
    'pickled mustard greens egg'
  ];

  for (const t of terms) {
    const list = await searchWikiCommons(t);
    console.log(`\n=== Term: "${t}" (${list.length} results) ===`);
    list.slice(0, 4).forEach(item => {
      console.log(`- ${item.title}: ${item.url}`);
    });
  }
}

run();
