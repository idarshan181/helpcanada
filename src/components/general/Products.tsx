'use client';

import { compareProducts } from '@/app/actions/compareProductActions';
import { filterProducts } from '@/app/actions/productActions';
import { products } from '@/app/utils/dummyData';
import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import CategoryFilter from './CanadianFilter';
import CanadianToggle from './CanadianToggle';
import ProductCard from './ProductCard';
import ProductComparisonModal from './ProductComparisonModal';
import SearchBar from './SearchBar';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [canadianOnly, setCanadianOnly] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // For the comparison modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null);
  const [alternativeProduct, setAlternativeProduct] = useState<null | typeof products[0]>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<typeof products>([]);

  // Update filters and results
  useEffect(() => {
    const results = filterProducts(products, searchTerm, selectedCategory, canadianOnly);
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, canadianOnly]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleCanadian = () => {
    setCanadianOnly(!canadianOnly);
  };

  // const handleProductClick = (product: typeof products[0]) => {
  //   setSelectedProduct(product);

  //   // Find an alternative product (different product in same category)
  //   const alternatives = products.filter(p =>
  //     p.id !== product.id
  //     && p.categories.some(category => product.categories.includes(category)),
  //   );

  //   if (alternatives.length > 0) {
  //     // Find a product that differs in "Made in Canada" status if possible
  //     const differentOriginAlts = alternatives.filter(p =>
  //       p.isMadeInCanada !== product.isMadeInCanada,
  //     );

  //     if (differentOriginAlts.length > 0) {
  //       setAlternativeProduct(differentOriginAlts[0]);
  //     } else {
  //       setAlternativeProduct(alternatives[0]);
  //     }
  //     setRecommendedProducts(alternatives);
  //   } else {
  //     setAlternativeProduct(null);

  //     // Find recommended products from any category within similar price range
  //     const priceRange = 0.3; // 30% above or below the product price
  //     const minPrice = product.price * (1 - priceRange);
  //     const maxPrice = product.price * (1 + priceRange);

  //     const recommendations = products.filter(p =>
  //       p.id !== product.id
  //       && p.price >= minPrice
  //       && p.price <= maxPrice,
  //     );

  //     setRecommendedProducts(recommendations.length > 0 ? recommendations : products.filter(p => p.id !== product.id));
  //   }

  //   setIsModalOpen(true);
  // };

  const handleProductClick = async (product: typeof products[0]) => {
    setSelectedProduct(product);

    // Use compareProducts to get better matches
    const matches = await compareProducts(products, product, canadianOnly);

    if (matches.length > 0) {
      setAlternativeProduct(matches[0]);
      setRecommendedProducts(matches);
    } else {
      setAlternativeProduct(null);
      setRecommendedProducts([]);
    }

    setIsModalOpen(true);
  };
  const handleSwitchRecommendation = (product: typeof products[0]) => {
    setAlternativeProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-canada-blue mb-4">
              Discover Canadian Products
            </h1>
            <p className="max-w-2xl mx-auto">
              Browse our curated selection of high-quality products, with options to filter for Canadian-made items.
            </p>
          </div>

          <div className="mb-6">
            <SearchBar onSearch={handleSearch} defaultValue={searchTerm} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <CanadianToggle
              canadianOnly={canadianOnly}
              onToggleCanadian={handleToggleCanadian}
            />
          </div>

          <Separator className="mb-8" />

          {filteredProducts.length > 0
            ? (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    Showing
                    {' '}
                    {filteredProducts.length}
                    {' '}
                    {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}
                  </div>
                </>
              )
            : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                </div>
              )}
        </div>
      </main>

      <ProductComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        alternativeProduct={alternativeProduct}
        recommendedProducts={recommendedProducts}
        onSwitchProduct={handleSwitchRecommendation}
      />
    </div>
  );
};

export default Products;
