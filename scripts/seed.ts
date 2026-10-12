import { seedInitialData } from '../lib/db';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('Populando banco de dados local.db via Prisma...');
  await seedInitialData();
  const projectCount = await prisma.project.count();
  const stackCount = await prisma.stackItem.count();
  console.log(`Banco populado com sucesso!`);
  console.log(`- Projetos: ${projectCount}`);
  console.log(`- Stacks: ${stackCount}`);
}

main()
  .catch((e) => {
    console.error('Erro ao popular banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
