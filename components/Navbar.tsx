import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Search, Menu, X, Sun, Moon, LogOut, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { cart, user, logout, darkMode, toggleDarkMode } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would query DB. Here we just navigate to home with search param
      // For simplicity in this demo, we'll assuming local filtering on Home page
      window.location.hash = `/?search=${searchQuery}`;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary dark:text-white">আমার শপ</span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-500 hover:text-primary">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-primary">
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-primary">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary">
                  <UserIcon className="h-6 w-6" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block ring-1 ring-black ring-opacity-5">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                      অ্যাডমিন ড্যাশবোর্ড
                    </Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> লগ আউট
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium">
                লগ ইন
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 pb-4">
          <div className="px-4 py-2">
             <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-500">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
          <div className="flex flex-col space-y-2 px-4 mt-2">
             <button onClick={toggleDarkMode} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
            </button>
            {user ? (
               <>
                 <div className="py-2 text-primary font-semibold">{user.name}</div>
                 {user.role === 'admin' && (
                    <Link to="/admin" className="text-gray-700 dark:text-gray-200 py-2">অ্যাডমিন ড্যাশবোর্ড</Link>
                 )}
                 <button onClick={logout} className="text-red-500 py-2 flex items-center gap-2">
                   <LogOut className="h-4 w-4" /> লগ আউট
                 </button>
               </>
            ) : (
               <Link to="/login" className="bg-primary text-white text-center py-2 rounded-md">লগ ইন</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;