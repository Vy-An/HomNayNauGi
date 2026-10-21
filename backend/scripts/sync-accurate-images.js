const fs = require('fs');
const path = require('path');
const https = require('https');

const foodsDir = path.resolve(__dirname, '../public/images/foods');

// Curated authentic, high quality Vietnamese/Asian dish image direct links from Wikimedia Commons
const accurateImages = {
  // Cá lóc kho tiêu: authentic claypot braised fish
  'ca-loc-kho-tieu.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/C%C3%A1_kho_t%E1%BB%99%2C_c%C3%A1_h%C3%BA.jpg',
  
  // Bò kho cà rốt: Vietnamese beef stew with carrots
  'bo-kho-ca-rot.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/B%C3%B2_kho_Ph%C3%BA_Y%C3%AAn_3.jpg',
  
  // Cá basa kho nghệ: braised fish in pot
  'ca-basa-kho-nghe.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/C%C3%A1_kho_t%E1%BB%99.JPG',
  
  // Bò xào bông cải: beef and broccoli stir fry
  'bo-xao-bong-cai.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/58/Beef_and_broccoli_stir_fry.jpg',
  
  // Tôm xào bông cải: shrimp and broccoli stir fry
  'tom-xao-bong-cai.jpg': 'https://upload.wikimedia.org/wikipedia/commons/8/86/Shrimp_and_broccoli_stir_fry_%288374790146%29.jpg',
  
  // Mướp xào tỏi: stir-fried sponge gourd / luffa with garlic
  'muop-xao-toi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Phat_buap.jpg',
  
  // Cá rô phi chiên giòn: crispy fried fish with fish sauce
  'ca-ro-phi-chien-gion.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Vietnamese_fried_fish_%282656425396%29.jpg',
  
  // Gà luộc lá chanh: authentic Vietnamese boiled chicken with lime leaves
  'ga-luoc-la-chanh.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/G%C3%A0_lu%E1%BB%99c_%281%29.jpg',
  
  // Thịt heo luộc cuốn rau: boiled pork slices with rice paper & herbs
  'thit-heo-luoc-cuon-rau.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/B%C3%A1nh_tr%C3%A1ng_cu%E1%BB%91n_th%E1%BB%8Bt_heo.jpg',
  
  // Rau lang luộc: boiled greens (Vietnamese homestyle)
  'rau-lang-luoc.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Noi_rau_muong_luoc.jpg',

  // Sườn kho: braised ribs in sauce
  'suon-kho-thom.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/M%C3%B3n_s%C6%B0%E1%BB%9Dn_kho_ng4th8n2023_%281%29.jpg',

  // Mực xào cần tây: stir fried squid
  'muc-xao-can-tay.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/77/M%E1%BB%B1c_x%C3%A0o_t%C3%B4m_b%C3%B2_%281%29.jpg',

  // Gà kho sả ớt: braised chicken with lemongrass
  'ga-kho-sa-ot.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Nh%C3%A0_m%C3%ACnh_d%E1%BB%8Bp_L%E1%BB%85_2th9n2023_%28g%C3%A0_kho_s%E1%BA%A3%29_%283%29.jpg',

  // Nui xào bò: stir-fried macaroni with beef
  'nui-xao-bo.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/05/MC_%E6%BE%B3%E9%96%80_Macau_%E6%BE%B3%E9%96%80_Macao_%E8%B3%8ph%E4%BC%AF%E6%A8%82%E6%8F%90%E7%9D%A3%E8%A1%97_55_Rua_do_Almirante_Costa_Cabral_%E5%AF%8C%E6%98%8E%E6%A8%93_Fu_Ming_Lau_%E6%96%B0%E9%B4%BB%E7%99%BC%E7%BE%8E%E9%A3%9F_XinHongFa_Cuisine_Restaurant_%E6%97%A9%E9%A4%90_breakfast_%E7%89%9B%E8%82%89%E7%82%92%E9%80%9A%E7%B2%89_Stir-fried_macaroni_n_beef_beef_November_2024_R12S_01.jpg',

  // Đậu hũ chiên sả: crispy fried golden tofu cubes
  'dau-hu-chien-sa.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Fried_tofu%2C_rice_noodle_with_shrimp_paste.jpg',

  // Chả cá chiên thì là: authentic Vietnamese fried fish cakes
  'cha-ca-chien-thi-la.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Ch%E1%BA%A3_c%C3%A1_%C4%90%C3%A0_N%E1%BA%B5ng.JPG',

  // Cánh gà chiên giòn: crispy golden fried chicken wings
  'canh-ga-chien-gion.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Fried_chicken_wings.jpg',

  // Tôm chiên bột: golden fried crispy prawns
  'tom-chien-bot.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Fried_prawns.jpg',

  // Trứng chiên thịt bằm: Vietnamese golden rolled/flat fried egg omelette
  'trung-chien-thit-bam.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Khai_v%E1%BB%8B_4_m%C3%B3n_%281%29.jpg',

  // Bắp cải luộc: boiled/steamed cabbage
  'bap-cai-luoc.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Steamed_cabbage_roll.jpg',

  // Bầu luộc chấm trứng: boiled gourd / squash
  'bau-luoc-cham-trung.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Boiled_squash.jpg',

  // Tôm rim thịt ba chỉ: braised caramelized pork and shrimp
  'tom-rim-thit-ba-chi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Braised_pork_and_prawns.jpg',

  // Thịt kho mắm ruốc: braised pork with lemongrass & shrimp paste
  'thit-kho-mam-ruoc.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Th%E1%BB%8Bt_kho_ch%E1%BB%89.jpg',

  // Gà xào mướp: stir-fried chicken with vegetable
  'ga-xao-muop.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Chicken_stir_fry.jpg',

  // Cải chua xào trứng: stir-fried eggs with preserved vegetables
  'cai-chua-xao-trung.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Stir_Fried_Tomatoes_with_Scrambled_Eggs.jpg'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    function req(u, depth = 0) {
      if (depth > 5) return reject(new Error('Redirect loop'));
      const parsed = new URL(u);
      const opt = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: { 'User-Agent': 'HomNayNauGi/1.0 (https://homnaynaugi.vn; contact@homnaynaugi.vn)' }
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

async function run() {
  console.log('Downloading accurate Vietnamese dish images...');
  for (const [filename, url] of Object.entries(accurateImages)) {
    const dest = path.join(foodsDir, filename);
    process.stdout.write(`Fetching ${filename}... `);
    try {
      await download(url, dest);
      const sz = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(`OK (${sz} KB)`);
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  console.log('Finished updating dish images!');
}

run();
