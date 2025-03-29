'use client';

import { useState } from 'react';
import { Product } from '../../../types/product';
import { filterProducts } from '../actions/productActions';
import { categories, products } from '../utils/dummyData';

export default function SearchProduct() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [canadianOnly, setCanadianOnly] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async () => {
    const filtered = await filterProducts(products, searchTerm, selectedCategory, canadianOnly);
    console.warn('filtered product: ', filtered);
    setResults(filtered);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded"
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
          onClick={handleSearch}
          className="bg-blue-600 text-black px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {results.map(product => (
          <li key={product.id} className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="text-sm text-gray-500 mt-1">
              Category:
              {' '}
              {product.category}
              {product.isMadeInCanada && ' 🇨🇦'}
            </div>
          </li>
        ))}
        {results.length === 0 && <p className="text-center text-gray-500">No products found.</p>}
      </ul>
    </div>
  );
}
