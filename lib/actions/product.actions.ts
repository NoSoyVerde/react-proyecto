"use server";

// Use wrapper helpers exported from the Prisma module to call DB methods.
// This avoids calling instance methods on imported PrismaClient objects
// across app-RSC boundaries which can trigger Next.js "invalid invocation"
// runtime errors.
import { findProducts, findProductUnique, prismaBase } from '@/db/prisma';
import { Product } from '@/types/Product';
import { convertToPlainObject } from '../utils';
import { PAGE_SIZE, LATEST_PRODUCTS_LIMIT } from '../constants';

export async function getAllProducts({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}): Promise<{ products: Product[]; totalPages: number }> {
  const skip = (page - 1) * PAGE_SIZE;
  
  const whereClause = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { category: { contains: query, mode: "insensitive" as const } },
          { brand: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [data, totalCount] = await Promise.all([
    prismaBase.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prismaBase.product.count({ where: whereClause }),
  ]);

  const products = convertToPlainObject(data).map((product: typeof data[0]) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));

  return {
    products,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  };
}

export async function getLatestProducts(): Promise<Product[]> {
  const data = await findProducts({ 
    orderBy: { createdAt: 'desc' },
    take: LATEST_PRODUCTS_LIMIT,
  });
  const plain = convertToPlainObject(data);
  return plain.map((product: typeof data[0]) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await findProductUnique({ where: { slug } });
  if (!data) return null;
  const product = convertToPlainObject(data);
  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const data = await findProductUnique({ where: { id } });
  if (!data) return null;
  const product = convertToPlainObject(data);
  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  };
}

export async function deleteProduct(id: string): Promise<void> {
  await prismaBase.product.delete({
    where: { id },
  });
}