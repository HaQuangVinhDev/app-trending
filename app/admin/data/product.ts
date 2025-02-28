export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  reviews: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Romantic Beach Landscape',
    image: 'https://trendingcustom.com/cdn/shop/files/For_Mom_200x.png?v=1740123307',
    price: 39.99,
    originalPrice: 44.99,
    reviews: 280,
    rating: 5,
  },
  {
    id: '2',
    name: 'Our Moon Couple Gift Moon Phase Art Anniversary for Wife, Gift for Husband Wedding Anniversary Personalized Poster',
    image: 'https://trendingcustom.com/cdn/shop/files/For_Grandma_200x.png?v=1740123307',
    price: 39.99,
    originalPrice: 44.99,
    reviews: 180,
    rating: 5,
  },
  {
    id: '3',
    name: 'Custom Pet Portrait',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34541_2_200x.png?v=1735282942',
    price: 39.99,
    originalPrice: 44.99,
    reviews: 118,
    rating: 4,
  },
  {
    id: '4',
    name: 'Personalized Name Necklace',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34541_3_200x.png?v=1735282942',
    price: 39.99,
    originalPrice: 44.99,
    reviews: 300,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Couple Birth Month Flower Personalized Acrylic Block LED Night Light, Heartfelt 2025  Gift For Him, For Her, Boyfriend, Girlfriend, Husband, Wife',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34541_4_200x.png?v=1735282941',
    price: 39.99,
    originalPrice: 44.99,
    reviews: 200,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Couple Birth Month Flower Personalized Acrylic Block LED Night Light, Heartfelt 2025  Gift For Him, For Her, Boyfriend, Girlfriend, Husband, Wife',
    image: 'https://trendingcustom.com/cdn/shop/files/Group_34541_5_200x.png?v=1735282942',
    price: 39.99,
    originalPrice: 44.99,
    reviews: 180,
    rating: 4,
  },
];
