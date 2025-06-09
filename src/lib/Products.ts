  import { Product } from "@/utils/Types";
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Rose Plushie",
      imageUrl: "/images/static/rose-plushie.webp",
      categoryId: [2],
    },
    {
      id: 2,
      name: "Spinning Rose",
      imageUrl: "/images/animated/spinning-rose.gif",
      categoryId: [6, 2],
    },
    {
      id: 3,
      name: "Koboi Krah Krah",
      imageUrl: "/images/static/krah-krah.jpg",
      categoryId: [2],
    },
    {
      id: 4,
      name: "Cat n Flower Drawing",
      imageUrl: "/images/static/cat-flower-drawing.webp",
      categoryId: [3],
    },
    {
      id: 5,
      name: "Cat Giving Rose",
      imageUrl: "/images/static/cat-giving-rose.webp",
      categoryId: [2],
    },
    {
      id: 6,
      name: "Giving Flower Drawing",
      imageUrl: "/images/static/giving-flower-drawing.webp",
      categoryId: [4],
    },
    {
      id: 7,
      name: "Giving Bouquet",
      imageUrl: "/images/static/giving-bouquet.png",
      categoryId: [1],
    },
    {
      id: 8,
      name: "For You",
      imageUrl: "/images/static/for-you.webp",
      categoryId: [2],
    },
    {
      id: 9,
      name: "Emoji Giving Flower",
      imageUrl: "/images/static/giving-flower-emoji.webp",
      categoryId: [5],
    },
    {
      id: 10,
      name: "Dead Rose",
      imageUrl: "/images/static/dead-rose-emoji.jpg",
      categoryId: [2],
    },
  ];
