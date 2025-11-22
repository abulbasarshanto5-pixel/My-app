import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-20 dark:text-white">পণ্যটি পাওয়া যায়নি</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-6">
        <ArrowLeft className="h-5 w-5 mr-1" /> ফিরে যান
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
            <img src={product.image} alt={product.name} className="max-h-96 object-contain" />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{product.category}</span>
              {product.stock > 0 ? (
                <span className="flex items-center text-green-600 text-xs font-bold">
                  <CheckCircle className="h-3 w-3 mr-1" /> স্টক আছে ({product.stock})
                </span>
              ) : (
                <span className="text-red-500 text-xs font-bold">স্টক আউট</span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-primary">৳ {product.price}</span>
              {product.originalPrice && (
                 <span className="text-xl text-gray-400 line-through ml-4">৳ {product.originalPrice}</span>
              )}
            </div>

            <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 mb-8">
              <p>{product.description}</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-primary hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                কার্টে যোগ করুন
              </button>
              <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">
                ♥
              </button>
            </div>

            <div className="mt-8 border-t dark:border-gray-700 pt-6">
              <h3 className="font-bold text-lg dark:text-white mb-2">ডেলিভারি এবং রিটার্ন</h3>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <li>• ঢাকা সিটির ভিতরে ৬০ টাকা ডেলিভারি চার্জ</li>
                <li>• ঢাকা সিটির বাইরে ১২০ টাকা ডেলিভারি চার্জ</li>
                <li>• ৭ দিনের সহজ রিটার্ন পলিসি</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;