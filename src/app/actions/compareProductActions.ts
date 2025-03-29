// import Fuse from 'fuse.js';
// import { Product } from '../../../types/product';

// export async function compareProducts(
//   allProducts: Product[],
//   referenceProduct: Product,
//   canadianOnly: boolean = false,
// ): Promise<Product[]> {
//   if (!referenceProduct) {
//     return [];
//   }

//   // Fuzzy search setup using title of reference product
//   const fuse = new Fuse(allProducts, {
//     keys: ['title'],
//     threshold: 0.4,
//   });

//   const results = fuse.search(referenceProduct.title);

//   // Extract matched products (excluding the reference product itself)
//   let matched = results
//     .map(res => res.item)
//     .filter(product => product.id !== referenceProduct.id);

//   // Filter for Canadian-made if requested
//   if (canadianOnly) {
//     matched = matched.filter(product => product.isMadeInCanada);
//   }

//   // Filter for cheaper options
//   matched = matched.filter(product => product.price < referenceProduct.price);

//   // Sort cheaper ones first
//   matched.sort((a, b) => a.price - b.price);

//   return matched;
// }

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

  const excludeRef = (products: Product[]) =>
    products.filter(p => p.id !== referenceProduct.id);

  const isCheaper = (p: Product) => p.price < referenceProduct.price;
  const isCanadian = (p: Product) => p.isMadeInCanada;
  const matchesCategory = (p: Product) =>
    p.categories.some(cat => referenceProduct.categories.includes(cat));
  const hasSameTitle = (p: Product) =>
    p.title.toLowerCase() === referenceProduct.title.toLowerCase();
  const sortByPrice = (list: Product[]) => list.sort((a, b) => a.price - b.price);

  const allWithSameTitle = excludeRef(allProducts).filter(hasSameTitle);

  // STEP 1: same title + cheaper + Canadian
  let matched = allWithSameTitle.filter(p => isCheaper(p) && isCanadian(p));
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  // STEP 2: same title + cheaper (any origin)
  matched = allWithSameTitle.filter(isCheaper);
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  // STEP 3: same title + Canadian (even if not cheaper)
  matched = allWithSameTitle.filter(isCanadian);
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  // STEP 4: same title (fallback, any origin & price)
  if (allWithSameTitle.length > 0) {
    return sortByPrice(allWithSameTitle);
  }

  // STEP 5: Fuzzy fallback
  const fuse = new Fuse(allProducts, {
    keys: ['title'],
    threshold: 0.4,
  });
  const fuzzyResults = excludeRef(fuse.search(referenceProduct.title).map(r => r.item));

  if (canadianOnly) {
    matched = fuzzyResults.filter(p => isCheaper(p) && isCanadian(p));
    if (matched.length > 0) {
      return sortByPrice(matched);
    }

    matched = excludeRef(allProducts).filter(
      p => isCheaper(p) && matchesCategory(p) && isCanadian(p),
    );
    if (matched.length > 0) {
      return sortByPrice(matched);
    }

    matched = excludeRef(allProducts).filter(isCanadian);
    if (matched.length > 0) {
      return sortByPrice(matched);
    }

    return []; // nothing Canadian found
  }

  matched = fuzzyResults.filter(p => isCheaper(p) && isCanadian(p));
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  matched = fuzzyResults.filter(isCheaper);
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  matched = excludeRef(allProducts).filter(
    p => isCheaper(p) && matchesCategory(p) && isCanadian(p),
  );
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  matched = excludeRef(allProducts).filter(
    p => isCheaper(p) && matchesCategory(p),
  );
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  matched = excludeRef(allProducts).filter(isCheaper);
  if (matched.length > 0) {
    return sortByPrice(matched);
  }

  return excludeRef(allProducts).sort((a, b) => a.price - b.price);
}
