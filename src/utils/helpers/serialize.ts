import type { Product, ProductApiModel } from "@/utils/types/product";

export const serializeProducts = (data: ProductApiModel[]): Product[] => data.map(
  ({
    description,
    id,
    image,
    price,
    productName,
    thumbnail
  }) => ({
    id,
    description,
    img: image,
    name: productName,
    price,
    thumbnail
  })
);