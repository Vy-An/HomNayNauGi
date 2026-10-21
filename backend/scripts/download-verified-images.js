const fs = require('fs');
const path = require('path');
const https = require('https');

const foodsDir = path.resolve(__dirname, '../public/images/foods');

const imagesToDownload = {
  'bap-cai-luoc.jpg': 'https://cookbeo.com/media/2020/10/bap-cai-luoc/bap-cai-luoc.jpg',
  'rau-lang-luoc.jpg': 'https://cookbeo.com/media/2020/10/rau-lang-luoc/rau-lang-luoc.jpg',
  'ga-kho-sa-ot.jpg': 'https://cookbeo.com/media/2024/01/ga-kho-sa-ot/ga-kho-sa-ot.jpg',
  'thit-kho-mam-ruoc.jpg': 'https://cookbeo.com/media/2021/06/thit-kho-mam-ruoc/thit-kho-mam-ruoc.jpg',
  'suon-kho-thom.jpg': 'https://cookbeo.com/media/2020/12/suon-kho-thom/suon-kho-thom.jpg',
  'trung-chien-thit-bam.jpg': 'https://cookbeo.com/media/2020/10/trung-chien-thit-bam/trung-chien-thit-bam.jpg',
  'tom-rim-thit-ba-chi.jpg': 'https://cookbeo.com/media/2023/02/thit-rang-tom/thit-rang-tom.jpg',
  'ca-basa-kho-nghe.jpg': 'https://cookbeo.com/media/2023/05/ca-tram-kho-nghe/ca-tram-kho-nghe.jpg',
  'ga-xao-muop.jpg': 'https://cookbeo.com/media/2020/10/long-ga-xao-muop/long-ga-xao-muop.jpg'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => resolve(fs.statSync(dest).size));
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  for (const [filename, url] of Object.entries(imagesToDownload)) {
    const dest = path.join(foodsDir, filename);
    console.log(`Downloading ${filename} from ${url}...`);
    try {
      const size = await download(url, dest);
      console.log(`✓ Saved ${filename} (${Math.round(size / 1024)} KB)`);
    } catch (e) {
      console.error(`✗ Error downloading ${filename}: ${e.message}`);
    }
  }
  console.log('All downloads finished!');
}

main();
