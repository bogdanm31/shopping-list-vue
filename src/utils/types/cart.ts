import type { Product } from "./product";

export type CartItem = Pick<
  Product,
  'id'
> & {
  quantity: number;
};

export type CartProduct = Product & CartItem;