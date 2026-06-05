export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string; // e.g., 'tops', 'dresses', 'outerwear', 'accessories', 'ethnic'
  gender: 'men' | 'women' | 'unisex' | 'kids';
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: { name: string; class: string }[];
  countInStock: number;
  tags: string[];
  isBestSeller: boolean;
  isNewArrival: boolean;
  collection: 'Summer' | 'Winter' | 'Festive' | 'Party Wear' | 'Casual';
}

export interface CartItem {
  id: string; // product_id + size + color
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; class: string };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  verifiedPurchase: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Arrived at Butwal Hub' | 'Out for Delivery' | 'Delivered';
  items: {
    productName: string;
    quantity: number;
    price: number;
    size: string;
    color: string;
  }[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
}
