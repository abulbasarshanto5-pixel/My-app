import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 60 : 0; // Flat rate for demo
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
          <Trash2 className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">আপনার কার্ট খালি</h2>
        <p className="text-gray-500 mb-6">আপনি এখনো কোনো পণ্য যোগ করেননি।</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          শপিং শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">শপিং কার্ট ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              
              <div className="flex-1 text-center sm:text-left">
                <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 dark:text-white hover:text-primary">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="text-primary font-bold mt-1">৳ {item.price}</div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:text-red-500 disabled:opacity-50 dark:text-gray-300"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-semibold w-8 text-center dark:text-white">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:text-green-500 dark:text-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">অর্ডার সামারি</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>সাবটোটাল</span>
                <span>৳ {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>ডেলিভারি চার্জ</span>
                <span>৳ {shipping}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                <span>সর্বমোট</span>
                <span>৳ {total}</span>
              </div>
            </div>

            <div className="mb-4">
              <input 
                type="text" 
                placeholder="কুপন কোড" 
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-2 dark:bg-gray-700 dark:text-white"
              />
              <button className="w-full text-sm text-primary font-semibold hover:underline">কুপন অ্যাপ্লাই করুন</button>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              চেকআউট করুন <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;