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
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 18,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Personalized Family Portrait',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 18,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Custom Pet Portrait',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 18,
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Personalized Name Necklace',
    image: require('~/assets/images/I9rUKYrNvO__web1_400x.webp'),
    price: 39.99,
    originalPrice: 44.99,
    reviews: 18,
    rating: 4.6,
  },
];
