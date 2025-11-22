import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Category, SortOption } from '../types';
import { Filter, ChevronDown } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Newest);
  
  // Filter products based on search (from URL hash for demo) and category
  const filteredProducts = useMemo(() => {
    let items = products;

    // Category Filter
    if (selectedCategory !== 'All') {
      items = items.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortOption === SortOption.PriceLowHigh) {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === SortOption.PriceHighLow) {
      items = [...items].sort((a, b) => b.price - a.price);
    } else {
      // Newest first (mock logic using ID desc or isNew)
      items = [...items].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return items;
  }, [products, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img src="https://picsum.photos/seed/banner-hero/1920/600" className="w-full h-full object-cover" alt="Banner" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">সেরা ডিল, সেরা পণ্য</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">বাংলাদেশের বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম</p>
          <a href="#products" className="bg-primary hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg">
            শপিং করুন
          </a>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b-4 border-primary inline-block pb-1">ক্যাটাগরি</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`whitespace-nowrap px-6 py-2 rounded-full border ${selectedCategory === 'All' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300'}`}
          >
            সকল পণ্য
          </button>
          {Object.values(Category).map(cat => (
             <button 
             key={cat}
             onClick={() => setSelectedCategory(cat)}
             className={`whitespace-nowrap px-6 py-2 rounded-full border ${selectedCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 hover:border-primary'}`}
           >
             {cat}
           </button>
          ))}
        </div>
      </div>

      {/* Main Product Grid */}
      <div id="products" className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-600 dark:text-gray-400">
            মোট {filteredProducts.length} টি পণ্য পাওয়া গেছে
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-primary dark:text-white"
            >
              {Object.values(SortOption).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">দুঃখিত, কোনো পণ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
          <div className="text-center">
             <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">🚚</div>
             <h3 className="font-bold text-lg dark:text-white">দ্রুত ডেলিভারি</h3>
             <p className="text-sm text-gray-500">সমগ্র বাংলাদেশে ২-৩ দিনে ডেলিভারি</p>
          </div>
          <div className="text-center">
             <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">🛡️</div>
             <h3 className="font-bold text-lg dark:text-white">নিরাপদ পেমেন্ট</h3>
             <p className="text-sm text-gray-500">বিকাশ, নগদ ও ক্যাশ অন ডেলিভারি</p>
          </div>
          <div className="text-center">
             <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">🎧</div>
             <h3 className="font-bold text-lg dark:text-white">২৪/৭ সাপোর্ট</h3>
             <p className="text-sm text-gray-500">যেকোনো প্রয়োজনে আমাদের কল করুন</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;