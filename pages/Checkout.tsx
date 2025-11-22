import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Smartphone, Truck, Loader2 } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, placeOrder, user } = useStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Dhaka',
    paymentMethod: 'bKash' as 'bKash' | 'Nagad' | 'COD'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPin, setPaymentPin] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + 60;

  useEffect(() => {
    if (cart.length === 0) navigate('/');
  }, [cart, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.paymentMethod === 'COD') {
      handlePlaceOrder('Unpaid');
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSubmit = () => {
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      handlePlaceOrder('Paid');
    }, 2000);
  };

  const handlePlaceOrder = (paymentStatus: 'Paid' | 'Unpaid') => {
    placeOrder({
      userId: user?.id || 'guest',
      items: cart,
      total: total,
      paymentMethod: formData.paymentMethod,
      shippingAddress: `${formData.address}, ${formData.city}`,
      transactionId: paymentStatus === 'Paid' ? `TXN-${Date.now()}` : undefined
    });
    // Redirect to Success Page (Simulated by alert then redirect home for this demo)
    alert("অর্ডার সফল হয়েছে! অর্ডার আইডি আপনার ইমেইলে পাঠানো হয়েছে।");
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold dark:text-white mb-8 text-center">চেকআউট</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" /> ডেলিভারি তথ্য
          </h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">পুরো নাম</label>
              <input 
                required
                type="text" 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">মোবাইল নাম্বার</label>
              <input 
                required
                type="tel" 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ঠিকানা</label>
              <textarea 
                required
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">শহর</label>
              <select 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
                <option>Rajshahi</option>
              </select>
            </div>
          </form>
        </div>

        {/* Order Summary & Payment */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">আপনার অর্ডার</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm dark:text-gray-300">
                  <span>{item.name} x {item.quantity}</span>
                  <span>৳ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 dark:border-gray-700">
              <div className="flex justify-between dark:text-gray-300">
                <span>সাবটোটাল</span>
                <span>৳ {subtotal}</span>
              </div>
              <div className="flex justify-between dark:text-gray-300">
                <span>ডেলিভারি চার্জ</span>
                <span>৳ 60</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary mt-2">
                <span>সর্বমোট</span>
                <span>৳ {total}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> পেমেন্ট মেথড
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'bKash' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'dark:border-gray-700'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="bKash"
                  checked={formData.paymentMethod === 'bKash'}
                  onChange={() => setFormData({...formData, paymentMethod: 'bKash'})}
                  className="h-4 w-4 text-pink-600"
                />
                <span className="ml-3 font-medium dark:text-white">বিকাশ পেমেন্ট (অটোমেটিক)</span>
              </label>
              
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'Nagad' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'dark:border-gray-700'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Nagad"
                  checked={formData.paymentMethod === 'Nagad'}
                  onChange={() => setFormData({...formData, paymentMethod: 'Nagad'})}
                  className="h-4 w-4 text-orange-600"
                />
                <span className="ml-3 font-medium dark:text-white">নগদ পেমেন্ট</span>
              </label>

              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'COD' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'dark:border-gray-700'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="COD"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={() => setFormData({...formData, paymentMethod: 'COD'})}
                  className="h-4 w-4 text-green-600"
                />
                <span className="ml-3 font-medium dark:text-white">ক্যাশ অন ডেলিভারি</span>
              </label>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              className="w-full mt-6 bg-primary hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
            >
              অর্ডার কনফার্ম করুন ৳ {total}
            </button>
          </div>
        </div>
      </div>

      {/* Fake Payment Gateway Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-bounce-in ${formData.paymentMethod === 'bKash' ? 'border-t-8 border-pink-600' : 'border-t-8 border-orange-600'}`}>
             <div className={`p-4 text-white flex items-center justify-between ${formData.paymentMethod === 'bKash' ? 'bg-pink-600' : 'bg-orange-600'}`}>
                <div className="flex items-center gap-2">
                   <Smartphone className="h-6 w-6" />
                   <span className="font-bold text-lg">{formData.paymentMethod} পেমেন্ট গেটওয়ে</span>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="text-white text-xl">&times;</button>
             </div>
             
             <div className="p-8 text-center">
                <div className="mb-6">
                  <p className="text-gray-500 mb-2">Merchant: AmarShop LTD</p>
                  <p className="text-2xl font-bold">Amount: ৳ {total}</p>
                </div>

                {!isProcessing ? (
                  <div className="space-y-4">
                    <input type="text" placeholder="Enter Mobile Number" className="w-full p-3 border rounded text-center text-lg" defaultValue={formData.phone} />
                    <input 
                      type="password" 
                      placeholder="Enter PIN" 
                      className="w-full p-3 border rounded text-center text-lg" 
                      value={paymentPin}
                      onChange={e => setPaymentPin(e.target.value)}
                      autoFocus
                    />
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => setShowPaymentModal(false)} className="flex-1 py-3 border rounded font-bold text-gray-600">CANCEL</button>
                      <button 
                        onClick={handlePaymentSubmit} 
                        disabled={!paymentPin}
                        className={`flex-1 py-3 rounded font-bold text-white ${formData.paymentMethod === 'bKash' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                      >
                        CONFIRM
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <Loader2 className={`h-12 w-12 animate-spin mx-auto mb-4 ${formData.paymentMethod === 'bKash' ? 'text-pink-600' : 'text-orange-600'}`} />
                    <p className="text-lg font-semibold text-gray-700">Processing Payment...</p>
                    <p className="text-sm text-gray-500">Please do not close this window</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;