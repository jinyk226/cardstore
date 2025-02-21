"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { Product } from "@/types";

export const getLatestProducts = async (): Promise<Product[]> => {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
};

export const getProductBySlug = async (slug: string) => {
  return prisma.product.findFirst({ where: { slug } });
};
