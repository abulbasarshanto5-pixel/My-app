import { Product, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'প্রিমিয়াম কটন পাঞ্জাবি',
    price: 1250,
    originalPrice: 1800,
    category: Category.Panjabi,
    image: 'https://picsum.photos/seed/panjabi1/400/400',
    description: 'ঈদের জন্য স্পেশাল প্রিমিয়াম কটন পাঞ্জাবি। আরামদায়ক এবং স্টাইলিশ।',
    stock: 50,
    rating: 4.5,
    reviews: 12,
    isNew: true
  },
  {
    id: '2',
    name: 'জামদানি শাড়ি - লাল',
    price: 3500,
    originalPrice: 4500,
    category: Category.Saree,
    image: 'https://picsum.photos/seed/saree1/400/400',
    description: 'হাতে বোনা অরিজিনাল ঢাকাই জামদানি শাড়ি।',
    stock: 20,
    rating: 4.8,
    reviews: 25
  },
  {
    id: '3',
    name: 'স্মার্ট ওয়াচ T500',
    price: 850,
    originalPrice: 1200,
    category: Category.Watch,
    image: 'https://picsum.photos/seed/watch1/400/400',
    description: 'ব্লুটুথ কলিং ফিচার সহ স্মার্ট ওয়াচ।',
    stock: 100,
    rating: 4.2,
    reviews: 56
  },
  {
    id: '4',
    name: 'আইফোন ১৪ প্রো ম্যাক্স (রেপ্লিকা)',
    price: 15000,
    category: Category.Mobile,
    image: 'https://picsum.photos/seed/phone1/400/400',
    description: 'ফার্স্ট কপি, দেখতে হুবহু অরিজিনালের মতো।',
    stock: 10,
    rating: 3.9,
    reviews: 5
  },
  {
    id: '5',
    name: 'ওয়্যারলেস হেডফোন',
    price: 1200,
    category: Category.Electronics,
    image: 'https://picsum.photos/seed/headphone/400/400',
    description: 'নয়েজ ক্যান্সেলেশন সহ হাই কোয়ালিটি সাউন্ড।',
    stock: 30,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '6',
    name: 'ফেস সিরাম',
    price: 450,
    category: Category.Beauty,
    image: 'https://picsum.photos/seed/beauty/400/400',
    description: 'ত্বকের উজ্জ্বলতা বৃদ্ধির জন্য কার্যকরী।',
    stock: 60,
    rating: 4.7,
    reviews: 120
  }
];

export const CAROUSEL_IMAGES = [
  'https://picsum.photos/seed/banner1/1200/400',
  'https://picsum.photos/seed/banner2/1200/400',
  'https://picsum.photos/seed/banner3/1200/400',
];