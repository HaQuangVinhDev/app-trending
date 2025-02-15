export type Product = {
  id: number;
  name: string; // Đổi từ title -> name
  image: string;
  material: string;
  size: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  protection?: boolean;
};
