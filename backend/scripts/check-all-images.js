const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const foodsDir = path.resolve(__dirname, '../public/images/foods');

async function main() {
  const foods = await prisma.foods.findMany({
    orderBy: { id_food: 'asc' },
    select: { id_food: true, name: true, image: true }
  });

  console.log(`ID | Food Name | Image Path | Exists? | Size`);
  console.log('-'.repeat(60));
  for (const f of foods) {
    const filename = path.basename(f.image);
    const fullPath = path.join(foodsDir, filename);
    const exists = fs.existsSync(fullPath);
    let size = 0;
    if (exists) {
      size = Math.round(fs.statSync(fullPath).size / 1024) + ' KB';
    }
    console.log(`${f.id_food.toString().padStart(2, ' ')} | ${f.name.padEnd(25, ' ')} | ${filename.padEnd(28, ' ')} | ${exists ? 'YES' : 'NO '} | ${size}`);
  }
}

main().finally(() => prisma.$disconnect());
