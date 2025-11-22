export enum Category {
  Panjabi = "পাঞ্জাবি",
  Saree = "শাড়ি",
  Electronics = "ইলেকট্রনিক্স",
  Mobile = "মোবাইল",
  Watch = "ঘড়ি",
  Beauty = "সৌন্দর্য চর্চা"
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  address?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'bKash' | 'Nagad' | 'COD';
  paymentStatus: 'Paid' | 'Unpaid';
  date: string;
  shippingAddress: string;
  transactionId?: string;
}

export enum SortOption {
  Newest = "নতুন",
  PriceLowHigh = "দাম (কম > বেশি)",
  PriceHighLow = "দাম (বেশি > কম)"
}