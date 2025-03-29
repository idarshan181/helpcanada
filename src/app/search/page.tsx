'use client';

import { useState } from 'react';
import { Product } from '../../../types/product';

import { compareProducts } from '../actions/compareProductActions';
import { filterProducts } from '../actions/productActions';
import { categories, products } from '../utils/dummyData';

export default function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [canadianOnly, setCanadianOnly] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [comparisonResults, setComparisonResults] = useState<Product[]>([]);
  const [comparingProduct, setComparingProduct] = useState<Product | null>(null);

  const handleFilter = () => {
    const filtered = filterProducts(products, searchTerm, selectedCategory, canadianOnly);
    setResults(filtered);
    setComparisonResults([]);
    setComparingProduct(null);
  };

  const handleCompare = async (product: Product) => {
    setComparingProduct(product);
    const compared = await compareProducts(products, product, canadianOnly);
    setComparisonResults(compared);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={canadianOnly}
            onChange={e => setCanadianOnly(e.target.checked)}
          />
          Only Canadian
        </label>

        <button
          type="button"
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Search Results</h2>
        {results.length === 0
          ? (
              <p className="text-gray-500">No results found.</p>
            )
          : (
              <ul className="space-y-3">
                {results.map((product, idx) => (
                  <li key={product.id} className="border p-4 rounded shadow">
                    <div className="flex justify-between items-center">
                      <span>{idx + 1}</span>
                      <div>
                        <h3 className="font-bold">{product.title}</h3>
                        <p className="text-sm text-gray-600">
                          $
                          {product.price}
                          {' '}
                          —
                          {' '}
                          {product.categories.slice(0, 3).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}

                          {' '}
                          {product.isMadeInCanada && '🇨🇦'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCompare(product)}
                        className="text-sm text-blue-600 underline"
                      >
                        Compare
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
      </div>

      {comparingProduct && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">
            Cheaper Alternatives to "
            {comparingProduct.title}
            "
          </h2>
          {comparisonResults.length === 0
            ? (
                <p className="text-gray-500">No cheaper matches found.</p>
              )
            : (
                <ul className="space-y-3 mt-2">
                  {comparisonResults.map(p => (
                    <li key={p.id} className="border p-4 rounded bg-green-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{p.title}</h3>
                          <p className="text-sm text-gray-600">
                            $
                            {p.price}
                            {' '}
                            —
                            {' '}
                            {p.categories.slice(0, 3).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}

                            {' '}
                            {p.isMadeInCanada && '🇨🇦'}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
        </div>
      )}
    </div>
  );
}
