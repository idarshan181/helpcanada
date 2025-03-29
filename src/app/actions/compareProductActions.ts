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

//   const excludeRef = (products: Product[]) =>
//     products.filter(p => p.id !== referenceProduct.id);

//   const isCheaper = (p: Product) => p.price < referenceProduct.price;
//   const isCanadian = (p: Product) => p.isMadeInCanada;
//   const matchesCategory = (p: Product) =>
//     p.categories.some(cat => referenceProduct.categories.includes(cat));
//   const hasSameTitle = (p: Product) =>
//     p.title.toLowerCase() === referenceProduct.title.toLowerCase();
//   const sortByPrice = (list: Product[]) => list.sort((a, b) => a.price - b.price);

//   const allWithSameTitle = excludeRef(allProducts).filter(hasSameTitle);

//   // STEP 1: same title + cheaper + Canadian
//   let matched = allWithSameTitle.filter(p => isCheaper(p) && isCanadian(p));
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 2: same title + cheaper (any origin)
//   matched = allWithSameTitle.filter(isCheaper);
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 3: same title + Canadian (even if not cheaper)
//   matched = allWithSameTitle.filter(isCanadian);
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 4: same title (fallback, any origin & price)
//   if (allWithSameTitle.length > 0) {
//     return sortByPrice(allWithSameTitle);
//   }

//   // STEP 5: Fuzzy fallback
//   const fuse = new Fuse(allProducts, {
//     keys: ['title'],
//     threshold: 0.4,
//   });
//   const fuzzyResults = excludeRef(fuse.search(referenceProduct.title).map(r => r.item));

//   if (canadianOnly) {
//     matched = fuzzyResults.filter(p => isCheaper(p) && isCanadian(p));
//     if (matched.length > 0) {
//       return sortByPrice(matched);
//     }

//     matched = excludeRef(allProducts).filter(
//       p => isCheaper(p) && matchesCategory(p) && isCanadian(p),
//     );
//     if (matched.length > 0) {
//       return sortByPrice(matched);
//     }

//     matched = excludeRef(allProducts).filter(isCanadian);
//     if (matched.length > 0) {
//       return sortByPrice(matched);
//     }

//     return []; // nothing Canadian found
//   }

//   matched = fuzzyResults.filter(p => isCheaper(p) && isCanadian(p));
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   matched = fuzzyResults.filter(isCheaper);
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   matched = excludeRef(allProducts).filter(
//     p => isCheaper(p) && matchesCategory(p) && isCanadian(p),
//   );
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   matched = excludeRef(allProducts).filter(
//     p => isCheaper(p) && matchesCategory(p),
//   );
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   matched = excludeRef(allProducts).filter(isCheaper);
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   return excludeRef(allProducts).sort((a, b) => a.price - b.price);
// }

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

//   const excludeRef = (products: Product[]) =>
//     products.filter(p => p.id !== referenceProduct.id);

//   const isCheaper = (p: Product) => p.price < referenceProduct.price;
//   const isCanadian = (p: Product) => p.isMadeInCanada;
//   const matchesCategory = (p: Product) =>
//     p.categories.some(cat => referenceProduct.categories.includes(cat));
//   const hasSameTitle = (p: Product) =>
//     p.title.toLowerCase() === referenceProduct.title.toLowerCase();
//   const sortByPrice = (list: Product[]) => list.sort((a, b) => a.price - b.price);

//   const candidates = excludeRef(allProducts).filter(matchesCategory); // ✅ Filter by category first

//   // STEP 1: same title + cheaper + Canadian
//   let matched = candidates.filter(p =>
//     hasSameTitle(p) && isCheaper(p) && (!canadianOnly || isCanadian(p)),
//   );
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 2: same title + cheaper
//   matched = matched.filter(p =>
//     hasSameTitle(p) && isCheaper(p),
//   );
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 3: same title + Canadian
//   matched = matched.filter(p =>
//     hasSameTitle(p) && isCanadian(p),
//   );
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 4: exact title match
//   matched = matched.filter(hasSameTitle);
//   if (matched.length > 0) {
//     return sortByPrice(matched);
//   }

//   // STEP 5: Fuzzy match on title (within same category)
//   const fuse = new Fuse(candidates, {
//     keys: ['title'],
//     threshold: 0.4,
//   });

//   matched = fuse.search(referenceProduct.title).map(res => res.item);

//   if (canadianOnly) {
//     matched = matched.filter(isCanadian);
//   }

//   return matched.length > 0 ? sortByPrice(matched) : [];
// }

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

  const isCanadian = (p: Product) => p.isMadeInCanada;
  const sortByPrice = (list: Product[]) => list.sort((a, b) => a.price - b.price);

  const sharedCategoryCount = (p: Product): number => {
    const refCats = referenceProduct.categories ?? [];
    const prodCats = p.categories ?? [];
    return prodCats.filter(cat => refCats.includes(cat)).length;
  };

  const filterBySharedCategories = (count: number) =>
    excludeRef(allProducts).filter(p =>
      sharedCategoryCount(p) >= count
      && (!canadianOnly || isCanadian(p)),
    );

  // 🔒 Strict: match at least 3, then 2, then 1
  for (let matchCount = 3; matchCount >= 1; matchCount--) {
    const matched = filterBySharedCategories(matchCount);
    if (matched.length > 0) {
      return sortByPrice(matched);
    }
  }

  return []; // ✅ No relevant product found
}
