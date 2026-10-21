const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const brainDir = path.resolve('C:/Users/Admin/.gemini/antigravity-ide/brain/e7a04aaa-bf5f-459f-8530-c4eca6610d5a');
const destDir = path.resolve(__dirname, '../public/images/foods');

const updates = [
  {
    id_food: 40,
    name: 'Đậu hũ chiên sả',
    sourceFile: 'dau_hu_chien_sa_1792511560283.jpg',
    targetFile: 'dau-hu-chien-sa.jpg',
    dbImagePath: '/images/foods/dau-hu-chien-sa.jpg'
  },
  {
    id_food: 33,
    name: 'Mực xào cần tây',
    sourceFile: 'muc_xao_can_tay_1792511580308.jpg',
    targetFile: 'muc-xao-can-tay.jpg',
    dbImagePath: '/images/foods/muc-xao-can-tay.jpg'
  },
  {
    id_food: 30,
    name: 'Bò kho cà rốt',
    sourceFile: 'bo_kho_ca_rot_1792511601310.jpg',
    targetFile: 'bo-kho-ca-rot.jpg',
    dbImagePath: '/images/foods/bo-kho-ca-rot.jpg'
  },
  {
    id_food: 9,
    name: 'Canh bí đỏ thịt bằm',
    sourceFile: 'canh_bi_do_1792511625329.jpg',
    targetFile: 'canh-bi-do-thit-bam.jpg',
    dbImagePath: '/images/foods/canh-bi-do-thit-bam.jpg'
  },
  {
    id_food: 3,
    name: 'Gà kho gừng',
    sourceFile: 'ga_kho_gung_1792511661123.jpg',
    targetFile: 'ga-kho-gung.jpg',
    dbImagePath: '/images/foods/ga-kho-gung.jpg'
  }
];

async function main() {
  console.log('=== BẮT ĐẦU CẬP NHẬT ẢNH MÓN ĂN VÀ DATABASE ===\n');

  for (const item of updates) {
    const src = path.join(brainDir, item.sourceFile);
    const dest = path.join(destDir, item.targetFile);

    if (!fs.existsSync(src)) {
      console.error(`[LỖI] Không tìm thấy file nguồn: ${src}`);
      continue;
    }

    // 1. Sao chép ảnh mới vào public/images/foods
    fs.copyFileSync(src, dest);
    const sizeKB = (fs.statSync(dest).size / 1024).toFixed(1);
    console.log(`[FILE OK] Đã sao chép ảnh cho "${item.name}":`);
    console.log(`          -> File: ${dest} (${sizeKB} KB)`);

    // 2. Cập nhật vào MySQL database qua Prisma
    const updatedRecord = await prisma.foods.update({
      where: { id_food: item.id_food },
      data: {
        image: item.dbImagePath,
        updated_at: new Date()
      },
      select: {
        id_food: true,
        name: true,
        image: true,
        updated_at: true
      }
    });

    console.log(`[DB OK] Đã lưu vào database:`);
    console.log(`        ID: ${updatedRecord.id_food} | Tên: ${updatedRecord.name}`);
    console.log(`        Image: ${updatedRecord.image} | UpdatedAt: ${updatedRecord.updated_at.toISOString()}\n`);
  }

  console.log('=== HOÀN TẤT CẬP NHẬT TẤT CẢ 5 MÓN ĂN! ===');
}

main()
  .catch(err => {
    console.error('Lỗi thực thi:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
