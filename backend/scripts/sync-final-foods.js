const fs = require('fs');
const path = require('path');
const https = require('https');

const foodsDir = path.resolve(__dirname, '../public/images/foods');

const titleMap = {
  'thit-kho-mam-ruoc.jpg': 'File:Thịt kho chỉ.jpg',
  'tom-rim-thit-ba-chi.jpg': 'File:หมูผัดกะปิ Stir-fried pork with shrimp paste (12174293475).jpg',
  'suon-kho-thom.jpg': 'File:Món sườn kho ng4th8n2023 (1).jpg',
  'ga-kho-sa-ot.jpg': 'File:Nhà mình dịp Lễ 2th9n2023 (gà kho sả) (3).jpg',
  'muc-xao-can-tay.jpg': 'File:Mực xào tôm bò (1).jpg',
  'tom-xao-bong-cai.jpg': 'File:Shrimp and broccoli stir fry (8374790146).jpg',
  'ga-xao-muop.jpg': 'File:Chicken stir fry.jpg',
  'nui-xao-bo.jpg': 'File:MC 澳門 Macau 澳門 Macao 賈伯樂提督街 55 Rua do Almirante Costa Cabral 富明樓 Fu Ming Lau 新鴻發美食 XinHongFa Cuisine Restaurant 早餐 breakfast 牛肉炒通粉 Stir-fried macaroni n beef beef November 2024 R12S 01.jpg',
  'cai-chua-xao-trung.jpg': 'File:Stir Fried Tomatoes with Scrambled Eggs.jpg',
  'muop-xao-toi.jpg': 'File:Phat buap.jpg',
  'dau-hu-chien-sa.jpg': 'File:Fried tofu, rice noodle with shrimp paste.jpg',
  'cha-ca-chien-thi-la.jpg': 'File:Cha ca La Vong.jpg',
  'tom-chien-bot.jpg': 'File:Fried prawns.jpg',
  'canh-ga-chien-gion.jpg': 'File:Home-Made-Fried-Chicken-Wings-2008.jpg',
  'trung-chien-thit-bam.jpg': 'File:FoodOmelete.jpg',
  'bau-luoc-cham-trung.jpg': 'File:Chayote hervido.jpg',
  'rau-lang-luoc.jpg': 'File:Noi rau muong luoc.jpg',
  'bap-cai-luoc.jpg': 'File:20260318 Cabbage Soup recipe.jpg'
};

function getFileUrl(title) {
  return new Promise((resolve, reject) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url&format=json';
    https.get(url, { headers: { 'User-Agent': 'HomNayNauGi/1.0 (contact@homnaynaugi.vn)' } }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(b);
          const p = Object.values(j.query.pages)[0];
          if (p && p.imageinfo && p.imageinfo[0].url) {
            resolve(p.imageinfo[0].url);
          } else {
            reject(new Error('Imageinfo missing for ' + title));
          }
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
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
  console.log('--- Bắt đầu tải và cập nhật ảnh chuẩn món ăn ---');
  let success = 0;
  for (const [filename, title] of Object.entries(titleMap)) {
    process.stdout.write(`Đang xử lý ${filename} (${title})... `);
    try {
      const realUrl = await getFileUrl(title);
      const dest = path.join(foodsDir, filename);
      await download(realUrl, dest);
      const sz = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(`OK (${sz} KB)`);
      success++;
    } catch (e) {
      console.log(`LỖI: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
  console.log(`--- Đã cập nhật thành công ${success}/${Object.keys(titleMap).length} ảnh! ---`);
}

main();
