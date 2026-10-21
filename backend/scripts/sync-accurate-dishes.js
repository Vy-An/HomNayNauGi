const fs = require('fs');
const path = require('path');
const https = require('https');

const foodsDir = path.resolve(__dirname, '../public/images/foods');

const dishTargets = [
  { file: 'thit-kho-mam-ruoc.jpg', query: 'Thịt kho sả' },
  { file: 'tom-rim-thit-ba-chi.jpg', query: 'Stir-fried pork with shrimp paste' },
  { file: 'suon-kho-thom.jpg', query: 'Món sườn kho ng4th8n2023 (1).jpg' },
  { file: 'ga-kho-sa-ot.jpg', query: 'Nhà mình dịp Lễ 2th9n2023 (gà kho sả)' },
  { file: 'muc-xao-can-tay.jpg', query: 'Mực xào tôm bò (1).jpg' },
  { file: 'tom-xao-bong-cai.jpg', query: 'Shrimp and broccoli stir fry (8374790146).jpg' },
  { file: 'ga-xao-muop.jpg', query: 'Chicken stir fry vegetables' },
  { file: 'nui-xao-bo.jpg', query: 'Stir-fried macaroni n beef beef November 2024' },
  { file: 'cai-chua-xao-trung.jpg', query: 'Stir Fried Tomatoes with Scrambled Eggs.jpg' },
  { file: 'muop-xao-toi.jpg', query: 'Phat buap.jpg' },
  { file: 'dau-hu-chien-sa.jpg', query: 'Fried tofu, rice noodle with shrimp paste' },
  { file: 'cha-ca-chien-thi-la.jpg', query: 'Cha ca La Vong.jpg' },
  { file: 'tom-chien-bot.jpg', query: 'Fried prawns.jpg OR Ebi fry' },
  { file: 'canh-ga-chien-gion.jpg', query: 'Home-Made-Fried-Chicken-Wings-2008.jpg' },
  { file: 'trung-chien-thit-bam.jpg', query: 'Thai omelette OR Kai jeow' },
  { file: 'bau-luoc-cham-trung.jpg', query: 'Chayote hervido.jpg' },
  { file: 'rau-lang-luoc.jpg', query: 'Noi rau muong luoc.jpg' },
  { file: 'bap-cai-luoc.jpg', query: 'Boiled cabbage wedge OR Steamed cabbage' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HomNayNauGi/1.0 (contact@homnaynaugi.vn)' } }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(b));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function findImageUrl(query) {
  const searchUrl = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(query) + '&gsrlimit=3&prop=imageinfo&iiprop=url|mime&format=json';
  const data = await fetchJson(searchUrl);
  if (!data.query || !data.query.pages) return null;
  const pages = Object.values(data.query.pages);
  const jpegs = pages.filter(p => p.imageinfo && (p.imageinfo[0].mime === 'image/jpeg' || p.imageinfo[0].mime === 'image/png'));
  if (jpegs.length === 0) return null;
  return { title: jpegs[0].title, url: jpegs[0].imageinfo[0].url };
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    function req(u, depth = 0) {
      if (depth > 5) return reject(new Error('Too many redirects'));
      const parsed = new URL(u);
      const opt = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: { 'User-Agent': 'HomNayNauGi/1.0 (contact@homnaynaugi.vn)' }
      };
      https.get(opt, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return req(res.headers.location, depth + 1);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => fileStream.close(() => resolve()));
        fileStream.on('error', err => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      }).on('error', err => reject(err));
    }
    req(url);
  });
}

async function main() {
  console.log('--- Đồng bộ ảnh chính xác cho 18 món còn lại ---');
  for (const item of dishTargets) {
    process.stdout.write(`Đang tìm ảnh cho ${item.file} (${item.query})... `);
    try {
      const match = await findImageUrl(item.query);
      if (!match) {
        console.log('KHÔNG TÌM THẤY');
        continue;
      }
      console.log(`Tìm thấy: "${match.title}"`);
      const dest = path.join(foodsDir, item.file);
      await download(match.url, dest);
      const sz = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(` -> Tải thành công (${sz} KB)`);
    } catch (e) {
      console.log(` -> LỖI: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 800));
  }
  console.log('--- Hoàn tất đồng bộ! ---');
}

main();
