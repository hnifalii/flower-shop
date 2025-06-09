export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number[];
};

export type Category = {
  id: number;
  name: string;
};