export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    description: 'Latest iPhone with A17 Bionic chip and Titanium frame.',
    image: 'https://example.com/iphone15pro.jpg',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    description: 'Powerful Android phone with S Pen and 200MP camera.',
    image: 'https://example.com/galaxys24ultra.jpg',
  },
  {
    id: '3',
    name: 'MacBook Pro M3',
    price: 1999,
    description: 'Apple M3 chip, Liquid Retina XDR display, and macOS.',
    image: 'https://example.com/macbookprom3.jpg',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    price: 399,
    description: 'Noise-canceling headphones with superior sound quality.',
    image: 'https://example.com/sonywh1000xm5.jpg',
  },
  {
    id: '5',
    name: 'Nintendo Switch OLED',
    price: 349,
    description: 'OLED display, improved speakers, and portable gaming.',
    image: 'https://example.com/switcholed.jpg',
  },
];
