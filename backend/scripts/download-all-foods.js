const fs = require('fs');
const path = require('path');
const https = require('https');

const foodsDir = path.resolve(__dirname, '../public/images/foods');

if (!fs.existsSync(foodsDir)) {
    fs.mkdirSync(foodsDir, { recursive: true });
}

// 31 missing dishes (dish 19 'canh-rau-ngot-thit-bam.jpg' is already generated via AI!)
const foodImages = {
    'canh-muop-tom.jpg': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=85',
    'canh-kho-qua-nhoi-thit.jpg': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=85',
    'canh-bi-xanh-tom.jpg': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=85',
    'canh-rong-bien-dau-hu.jpg': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=85',
    'canh-khoai-mo-thit-bam.jpg': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=85',
    'canh-cai-chua-suon.jpg': 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=900&auto=format&fit=crop&q=85',
    'ca-loc-kho-tieu.jpg': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=85',
    'thit-kho-mam-ruoc.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=85',
    'tom-rim-thit-ba-chi.jpg': 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=85',
    'suon-kho-thom.jpg': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=85',
    'bo-kho-ca-rot.jpg': 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=900&auto=format&fit=crop&q=85',
    'ca-basa-kho-nghe.jpg': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=85',
    'ga-kho-sa-ot.jpg': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=900&auto=format&fit=crop&q=85',
    'muc-xao-can-tay.jpg': 'https://images.unsplash.com/photo-1535400255456-984241443b29?w=900&auto=format&fit=crop&q=85',
    'tom-xao-bong-cai.jpg': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=85',
    'ga-xao-muop.jpg': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=85',
    'bo-xao-bong-cai.jpg': 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=900&auto=format&fit=crop&q=85',
    'nui-xao-bo.jpg': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900&auto=format&fit=crop&q=85',
    'cai-chua-xao-trung.jpg': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900&auto=format&fit=crop&q=85',
    'muop-xao-toi.jpg': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&auto=format&fit=crop&q=85',
    'dau-hu-chien-sa.jpg': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=85',
    'cha-ca-chien-thi-la.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&auto=format&fit=crop&q=85',
    'tom-chien-bot.jpg': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900&auto=format&fit=crop&q=85',
    'canh-ga-chien-gion.jpg': 'https://images.unsplash.com/photo-1527477245898-ddce2c049c98?w=900&auto=format&fit=crop&q=85',
    'trung-chien-thit-bam.jpg': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=900&auto=format&fit=crop&q=85',
    'ca-ro-phi-chien-gion.jpg': 'https://images.unsplash.com/photo-1514944298352-78097b69288e?w=900&auto=format&fit=crop&q=85',
    'bau-luoc-cham-trung.jpg': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=900&auto=format&fit=crop&q=85',
    'rau-lang-luoc.jpg': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=900&auto=format&fit=crop&q=85',
    'ga-luoc-la-chanh.jpg': 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=85',
    'thit-heo-luoc-cuon-rau.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=85',
    'bap-cai-luoc.jpg': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=900&auto=format&fit=crop&q=85'
};

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        function get(currentUrl, redirectCount = 0) {
            if (redirectCount > 5) {
                return reject(new Error('Too many redirects'));
            }
            https.get(currentUrl, res => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return get(res.headers.location, redirectCount + 1);
                }
                if (res.statusCode !== 200) {
                    return reject(new Error(`HTTP ${res.statusCode}`));
                }
                const file = fs.createWriteStream(destPath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(() => resolve());
                });
                file.on('error', err => {
                    fs.unlink(destPath, () => {});
                    reject(err);
                });
            }).on('error', err => {
                fs.unlink(destPath, () => {});
                reject(err);
            });
        }
        get(url);
    });
}

async function run() {
    console.log('--- Bắt đầu tải và đồng bộ ảnh các món ăn ---');
    let success = 0;
    let skipped = 0;
    let failed = 0;

    for (const [filename, url] of Object.entries(foodImages)) {
        const destPath = path.join(foodsDir, filename);
        if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
            console.log(`[Đã tồn tại] ${filename}`);
            skipped++;
            continue;
        }

        try {
            console.log(`[Đang tải] ${filename}...`);
            await downloadImage(url, destPath);
            const size = fs.statSync(destPath).size;
            console.log(` -> OK: ${filename} (${(size / 1024).toFixed(1)} KB)`);
            success++;
        } catch (err) {
            console.error(` -> Lỗi tải ${filename}: ${err.message}`);
            failed++;
        }
    }

    console.log(`\nKết quả: Đã tải mới: ${success}, Đã có sẵn: ${skipped}, Thất bại: ${failed}`);

    // Liệt kê tổng số ảnh trong thư mục foods
    const allFiles = fs.readdirSync(foodsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    console.log(`Tổng số ảnh món ăn hiện có trong thư mục: ${allFiles.length}`);
}

run();
