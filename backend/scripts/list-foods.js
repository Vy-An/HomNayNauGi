const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const foods = await prisma.foods.findMany({
    orderBy: { id_food: 'asc' },
    select: { id_food: true, name: true, image: true }
  });
  console.log(JSON.stringify(foods, null, 2));
}

main().finally(() => prisma.$disconnect());
