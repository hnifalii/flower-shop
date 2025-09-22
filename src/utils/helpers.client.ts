import { products } from "@/lib/Products";

export function getRandomProductId() {
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex].id;
}