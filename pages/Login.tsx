import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login
    if (isAdminLogin) {
       if(email.includes('admin')) {
         login(email, 'admin');
         navigate('/admin');
       } else {
         alert("অ্যাডমিন এক্সেস নেই (use 'admin' in email)");
       }
    } else {
       login(email, 'customer');
       navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          {isLogin ? 'স্বাগতম' : 'একাউন্ট তৈরি করুন'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isLogin ? 'আপনার একাউন্টে লগ ইন করুন' : 'দ্রুত কেনাকাটা করতে রেজিস্ট্রেশন করুন'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ইমেইল বা মোবাইল</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="example@mail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">কনফার্ম পাসওয়ার্ড</label>
               <input 
                 type="password" 
                 required
                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                 placeholder="••••••••"
               />
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
             <label className="flex items-center dark:text-gray-300">
               <input type="checkbox" className="mr-2 rounded text-primary focus:ring-primary" /> মনে রাখুন
             </label>
             <button type="button" className="text-primary hover:underline">পাসওয়ার্ড ভুলে গেছেন?</button>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors">
            {isLogin ? 'লগ ইন' : 'রেজিস্ট্রেশন'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? 'একাউন্ট নেই?' : 'আগেই একাউন্ট আছে?'} 
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold ml-1 hover:underline">
              {isLogin ? 'রেজিস্ট্রেশন করুন' : 'লগ ইন করুন'}
            </button>
          </p>
          
          <div className="border-t pt-4 dark:border-gray-700">
            <button 
              onClick={() => setIsAdminLogin(!isAdminLogin)}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {isAdminLogin ? 'গ্রাহক লগইন' : 'অ্যাডমিন প্যানেল এক্সেস'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;