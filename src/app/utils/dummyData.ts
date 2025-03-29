import { Category } from '../../../types/category';
import { Product } from '../../../types/product';

export const products: Product[] = [
  {
    id: '1',
    title: 'Maple Syrup',
    description: 'Pure Canadian maple syrup, harvested from Quebec maple trees',
    price: 12.99,
    imageSrc: 'https://images.unsplash.com/photo-1589418958964-f4c21f8fd247?q=80&w=1000&auto=format&fit=crop',
    category: 'grocery',
    isMadeInCanada: true,
    amazonUrl: 'https://amazon.ca',
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '2',
    title: 'Nanaimo Bars',
    description: 'Traditional Canadian dessert with a chocolate ganache top',
    price: 9.99,
    imageSrc: 'https://images.unsplash.com/photo-1602296750304-8afa09654ffe?q=80&w=1000&auto=format&fit=crop',
    category: 'grocery',
    isMadeInCanada: true,
    amazonUrl: 'https://amazon.ca',
  },
  {
    id: '3',
    title: 'Natural Face Cleanser',
    description: 'Organic face wash made with Canadian glacial clay',
    price: 24.99,
    imageSrc: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    category: 'beauty',
    isMadeInCanada: true,
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '4',
    title: 'Vitamin D Supplements',
    description: 'Essential vitamin D for Canadian winters',
    price: 15.99,
    imageSrc: 'https://images.unsplash.com/photo-1584308074527-e45fe2149b3c?q=80&w=1000&auto=format&fit=crop',
    category: 'health',
    isMadeInCanada: false,
    amazonUrl: 'https://amazon.ca',
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '5',
    title: 'Organic Honey',
    description: 'Wild flower honey from BC apiaries',
    price: 14.99,
    imageSrc: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=1000&auto=format&fit=crop',
    category: 'grocery',
    isMadeInCanada: true,
    amazonUrl: 'https://amazon.ca',
  },
  {
    id: '6',
    title: 'Lavender Essential Oil',
    description: 'Pure lavender oil from Canadian farms',
    price: 18.99,
    imageSrc: 'https://images.unsplash.com/photo-1601488891563-2f12a7e10f08?q=80&w=1000&auto=format&fit=crop',
    category: 'pharmacy',
    isMadeInCanada: true,
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '7',
    title: 'Ice Wine',
    description: 'Premium ice wine from Niagara region',
    price: 45.99,
    imageSrc: 'https://images.unsplash.com/photo-1598306442928-4d90f32c6866?q=80&w=1000&auto=format&fit=crop',
    category: 'grocery',
    isMadeInCanada: true,
    amazonUrl: 'https://amazon.ca',
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '8',
    title: 'Natural Lip Balm',
    description: 'Soothing lip balm with maple extract',
    price: 4.99,
    imageSrc: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1000&auto=format&fit=crop',
    category: 'beauty',
    isMadeInCanada: true,
    amazonUrl: 'https://amazon.ca',
  },
  {
    id: '9',
    title: 'Premium Coffee Beans',
    description: 'Freshly roasted in Vancouver',
    price: 16.99,
    imageSrc: 'https://images.unsplash.com/photo-1565600583791-3ad52fd826ab?q=80&w=1000&auto=format&fit=crop',
    category: 'grocery',
    isMadeInCanada: true,
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '10',
    title: 'Herbal Cold Remedy',
    description: 'Traditional herbal formula for cold symptoms',
    price: 19.99,
    imageSrc: 'https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=1000&auto=format&fit=crop',
    category: 'pharmacy',
    isMadeInCanada: false,
    amazonUrl: 'https://amazon.ca',
    walmartUrl: 'https://walmart.ca',
  },
  {
    id: '11',
    title: 'Maple Cookies',
    description: 'Crisp cookies with real maple filling',
    price: 5.99,
    imageSrc: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop',
    category: 'grocery',
    isMadeInCanada: true,
    amazonUrl: 'https://amazon.ca',
  },
  {
    id: '12',
    title: 'Anti-Aging Serum',
    description: 'With Canadian glacial mineral water',
    price: 59.99,
    imageSrc: 'https://images.unsplash.com/photo-1624984675449-168d6d5a60e1?q=80&w=1000&auto=format&fit=crop',
    category: 'beauty',
    isMadeInCanada: true,
    walmartUrl: 'https://walmart.ca',
  },
];

export const categories: Category[] = [
  { id: 'all', name: 'All Products' },
  { id: 'grocery', name: 'Grocery' },
  { id: 'health', name: 'Health' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'pharmacy', name: 'Pharmacy' },
];
