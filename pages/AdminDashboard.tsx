import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, ShoppingBag, Users, DollarSign, Trash2, Plus, Edit } from 'lucide-react';
import { Product, Category } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, orders, deleteProduct, addProduct, updateOrderStatus } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  
  // Dashboard Stats
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  
  // Mock Chart Data
  const salesData = [
    { name: 'Sat', sales: 4000 },
    { name: 'Sun', sales: 3000 },
    { name: 'Mon', sales: 2000 },
    { name: 'Tue', sales: 2780 },
    { name: 'Wed', sales: 1890 },
    { name: 'Thu', sales: 2390 },
    { name: 'Fri', sales: 3490 },
  ];

  // Product Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: Category.Panjabi,
    stock: 10,
    rating: 5,
    reviews: 0
  });

  const handleAddProduct = () => {
    if(newProduct.name && newProduct.price && newProduct.image) {
      addProduct({
        ...newProduct,
        id: Date.now().toString(),
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        rating: 0,
        reviews: 0,
      } as Product);
      setShowAddModal(false);
      setNewProduct({ category: Category.Panjabi });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
             <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">মোট বিক্রি</p>
            <h3 className="text-2xl font-bold dark:text-white">৳ {totalSales}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center">
          <div className="p-3 bg-green-100 text-green-600 rounded-full mr-4">
             <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">মোট অর্ডার</p>
            <h3 className="text-2xl font-bold dark:text-white">{totalOrders}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full mr-4">
             <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">মোট পণ্য</p>
            <h3 className="text-2xl font-bold dark:text-white">{products.length}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-bold mb-4 dark:text-white">বিক্রয়ের পরিসংখ্যান</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white">প্রোডাক্ট লিস্ট</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <Plus className="h-4 w-4" /> নতুন পণ্য
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm uppercase">
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded object-cover" alt="" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="p-4">৳ {p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4"><span className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-xs">{p.category}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
       <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold dark:text-white">অর্ডার ম্যানেজমেন্ট</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm uppercase">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300">
                <td className="p-4 font-mono text-sm">{o.id}</td>
                <td className="p-4 text-sm">{new Date(o.date).toLocaleDateString()}</td>
                <td className="p-4 font-bold">৳ {o.total}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold ${o.paymentMethod === 'bKash' ? 'text-pink-600 bg-pink-100' : o.paymentMethod === 'Nagad' ? 'text-orange-600 bg-orange-100' : 'text-green-600 bg-green-100'}`}>
                     {o.paymentMethod}
                   </span>
                   <div className="text-xs mt-1">{o.paymentStatus}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-4">
                   <select 
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                    className="text-sm border rounded p-1 dark:bg-gray-600 dark:text-white"
                   >
                     <option>Pending</option>
                     <option>Processing</option>
                     <option>Shipped</option>
                     <option>Delivered</option>
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="p-8 text-center text-gray-500">কোনো অর্ডার নেই</div>}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 hidden md:block">
        <div className="p-6">
           <h1 className="text-2xl font-bold text-primary">অ্যাডমিন প্যানেল</h1>
        </div>
        <nav className="mt-6">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-6 py-3 text-left ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <BarChart className="h-5 w-5 mr-3" /> ড্যাশবোর্ড
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center px-6 py-3 text-left ${activeTab === 'products' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <Package className="h-5 w-5 mr-3" /> প্রোডাক্টস
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center px-6 py-3 text-left ${activeTab === 'orders' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <ShoppingBag className="h-5 w-5 mr-3" /> অর্ডারস
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">নতুন পণ্য যোগ করুন</h2>
            <div className="space-y-4">
              <input 
                type="text" placeholder="পণ্যের নাম" 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <div className="flex gap-4">
                <input 
                  type="number" placeholder="দাম (৳)" 
                  className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
                <input 
                  type="number" placeholder="স্টক" 
                  className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
                  onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
              </div>
              <select 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
              >
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input 
                type="text" placeholder="ছবির URL" 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
              />
               <textarea 
                placeholder="বর্ণনা" 
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600">বাতিল</button>
                <button onClick={handleAddProduct} className="px-4 py-2 bg-primary text-white rounded">সংরক্ষণ করুন</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;