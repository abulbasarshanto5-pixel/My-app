import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
            নতুন
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ছাড়
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-yellow-400 mb-1">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">৳ {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">৳ {product.originalPrice}</span>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;