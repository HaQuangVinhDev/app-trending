export interface Product {
  id: string;
  name: string;
  image: any; // Dùng `any` vì `require` không có kiểu tĩnh
  price: number;
  originalPrice: number;
  reviews: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Romantic Beach Landscape',
    image: require('~/assets/images/imagenew/romatic.png'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 280,
    rating: 5,
  },
  {
    id: '2',
    name: 'Our Moon Couple Gift Moon Phase Art Anniversary for Wife, Gift for Husband Wedding Anniversary Personalized Poster',
    image: require('~/assets/images/imagenew/tabmoon.png'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 180,
    rating: 5,
  },
  {
    id: '3',
    name: 'Custom Pet Portrait',
    image: require('~/assets/images/imagenew/you.png'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 118,
    rating: 4,
  },
  {
    id: '4',
    name: 'Personalized Name Necklace',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 300,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Couple Birth Month Flower Personalized Acrylic Block LED Night Light, Heartfelt 2025  Gift For Him, For Her, Boyfriend, Girlfriend, Husband, Wife',
    image: require('~/assets/images/imagenew/couple.png'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 200,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Couple Birth Month Flower Personalized Acrylic Block LED Night Light, Heartfelt 2025  Gift For Him, For Her, Boyfriend, Girlfriend, Husband, Wife',
    image: require('~/assets/images/imagenew/Favorite.png'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 180,
    rating: 4,
  },
];
