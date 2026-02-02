import { Smartphone, Tablet, Laptop, Watch, Headphones, Cable, LucideIcon, Apple } from 'lucide-react';

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

export const CATEGORIES: { id: ProductCategory; label: string; icon: LucideIcon }[] = [
  { id: 'iphone', label: 'iPhone', icon: Smartphone },
  { id: 'ipad', label: 'iPad', icon: Tablet },
  { id: 'macbook', label: 'MacBook', icon: Laptop },
  { id: 'watch', label: 'Apple Watch', icon: Watch },
  { id: 'airpods', label: 'AirPods', icon: Headphones },
  { id: 'accessories', label: 'Accessories', icon: Cable },
];
