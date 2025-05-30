import { Product } from '../../../types/product';

export const filterProducts = (
  allProducts: Product[],
  searchTerm: string = '',
  category: string = 'all',
  canadianOnly: boolean = false,
): Product[] => {
  return allProducts.filter((product) => {
    // Apply search filter
    const matchesSearch
      = searchTerm === ''
        || product.title.toLowerCase().includes(searchTerm.toLowerCase())
        || product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply category filter (works with categories: string[])
    const matchesCategory
      = category === 'all'
        || product.categories.includes(category);

    // Apply Canadian only filter
    const matchesCanadian
      = !canadianOnly
        || product.isMadeInCanada;

    return matchesSearch && matchesCategory && matchesCanadian;
  });
};
