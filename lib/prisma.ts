import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function initPrisma(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Verifica se a conexão é remota com a Turso (libsql:// ou https://)
  const isTursoRemote = Boolean(
    tursoUrl &&
      (tursoUrl.startsWith('libsql://') ||
        tursoUrl.startsWith('https://') ||
        (authToken && !tursoUrl.startsWith('file:')))
  );

  if (isTursoRemote && tursoUrl) {
    const adapter = new PrismaLibSQL({
      url: tursoUrl,
      authToken: authToken,
    });
    return new PrismaClient({ adapter });
  }

  // Fallback padrão para banco local SQLite (ex: file:../local.db)
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? initPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
