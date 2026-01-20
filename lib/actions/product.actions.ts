"use server";

import prisma from '@/db/prisma';
import { Product } from '@/types/Product';
import { convertToPlainObject } from '../utils';

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  const plain = convertToPlainObject(data);
  return plain.map((product: typeof data[0]) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await prisma.product.findUnique({
    where: { slug },
  });
  if (!data) return null;
  const product = convertToPlainObject(data);
  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  };
}