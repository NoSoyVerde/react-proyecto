import { PrismaClient } from '@/lib/generated/prisma/client';
import PrismaClientLogger from '@/lib/prisma-logger';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
  adapter 
}).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating : {
        compute(product) {
          return product.rating.toString();
        },
      },    
    }
  }
});

export default prisma;  