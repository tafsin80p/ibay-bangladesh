export type ProductCategory = 'iphone' | 'ipad' | 'macbook' | 'watch' | 'airpods' | 'accessories';

export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: ProductCategory;
  condition: ProductCondition;
  description: string;
  images: string[];
  location: string;
  division: string;
  sellerName: string;
  sellerAvatar?: string;
  postedAt: Date;
  isFeatured?: boolean;
}

export interface Division {
  id: string;
  name: string;
  nameBn: string;
}

export const DIVISIONS: Division[] = [
  { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
  { id: 'chittagong', name: 'Chittagong', nameBn: 'চট্টগ্রাম' },
  { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
  { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা' },
  { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
  { id: 'barisal', name: 'Barisal', nameBn: 'বরিশাল' },
  { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর' },
  { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
];

export const CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'iphone', label: 'iPhone', icon: '📱' },
  { id: 'ipad', label: 'iPad', icon: '📲' },
  { id: 'macbook', label: 'MacBook', icon: '💻' },
  { id: 'watch', label: 'Apple Watch', icon: '⌚' },
  { id: 'airpods', label: 'AirPods', icon: '🎧' },
  { id: 'accessories', label: 'Accessories', icon: '🔌' },
];
