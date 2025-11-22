import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-primary">আমার শপ</h3>
        <p className="text-gray-400 text-sm">বাংলাদেশের অন্যতম বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম। সেরা মানের পণ্য, দ্রুত ডেলিভারি এবং নিরাপদ পেমেন্ট।</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">কুইক লিংক</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>আমাদের সম্পর্কে</li>
          <li>গোপনীয়তা নীতি</li>
          <li>শর্তাবলী</li>
          <li>যোগাযোগ</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">কাস্টমার কেয়ার</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>হেল্প সেন্টার</li>
          <li>অর্ডার ট্র্যাক করুন</li>
          <li>রিটার্ন এবং রিফান্ড</li>
          <li>অভিযোগ জানান</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">পেমেন্ট মেথড</h4>
        <div className="flex gap-2">
          <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center"><span className="text-pink-600 font-bold text-xs">bKash</span></div>
          <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center"><span className="text-orange-600 font-bold text-xs">Nagad</span></div>
          <div className="bg-white p-1 rounded w-12 h-8 flex items-center justify-center"><span className="text-purple-600 font-bold text-xs">Rocket</span></div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
      &copy; 2023 Amar Shop. All rights reserved. Designed for Bangladesh.
    </div>
  </footer>
);

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin Route doesn't show standard Navbar/Footer for simplicity in this specific mock */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Public Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </HashRouter>
    </StoreProvider>
  );
}

export default App;