
import React, { useState } from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface SearchPageProps {
  onSearch: (category: Category, product: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [productName, setProductName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      setError('Please select a category.');
      return;
    }
    if (!productName.trim()) {
      setError('Please enter a product name.');
      return;
    }
    setError('');
    onSearch(selectedCategory, productName.trim());
  };

  return (
    <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Product Reviews</h1>
            <p className="text-slate-400">Select a category and enter a product name to get started.</p>
        </div>
        <div className="bg-slate-800 p-8 rounded-xl shadow-2xl shadow-slate-950/50">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                        1. Select a Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value as Category);
                            if (error) setError('');
                        }}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    >
                        <option value="" disabled>-- Choose a category --</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="product" className="block text-sm font-medium text-slate-300 mb-2">
                        2. Enter Product Name
                    </label>
                    <input
                        type="text"
                        id="product"
                        value={productName}
                        onChange={(e) => {
                            setProductName(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="e.g., 'iPhone 15 Pro'"
                        disabled={!selectedCategory}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div>
                    <button
                        type="submit"
                        disabled={!selectedCategory || !productName}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:hover:bg-slate-600 shadow-md hover:shadow-lg shadow-purple-900/50"
                    >
                        Search Reviews
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SearchPage;
