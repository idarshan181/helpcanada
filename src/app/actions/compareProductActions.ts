import Fuse from 'fuse.js';
import { Product } from '../../../types/product';

export async function compareProducts(
  allProducts: Product[],
  referenceProduct: Product,
  canadianOnly: boolean = false,
): Promise<Product[]> {
  if (!referenceProduct) {
    return [];
  }

  // Fuzzy search setup using title of reference product
  const fuse = new Fuse(allProducts, {
    keys: ['title'],
    threshold: 0.4,
  });

  const results = fuse.search(referenceProduct.title);

  // Extract matched products (excluding the reference product itself)
  let matched = results
    .map(res => res.item)
    .filter(product => product.id !== referenceProduct.id);

  // Filter for Canadian-made if requested
  if (canadianOnly) {
    matched = matched.filter(product => product.isMadeInCanada);
  }

  // Filter for cheaper options
  matched = matched.filter(product => product.price < referenceProduct.price);

  // Sort cheaper ones first
  matched.sort((a, b) => a.price - b.price);

  return matched;
}
