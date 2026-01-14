export type ProductApiModel = {
  id: string;
  description: string;
  productName: string;
  price: number;
  image: string;
  thumbnail: string;
  [key: string]: any;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
  thumbnail: string;
};