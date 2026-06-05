import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'w-ethnic-01',
    name: 'Luxury Velvet Embroidered Kurti Set',
    price: 4950,
    originalPrice: 6200,
    rating: 4.8,
    category: 'ethnic',
    gender: 'women',
    description: 'Elevate your festive look with this premium royal velvet Kurti set. Richly embroidered neck and cuffs with beautiful handcrafting. Comes with matching silk trousers and a printed organza dupatta. Perfect for festivals like Dashain, Tihar, and wedding receptions.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Royal Maroon', class: 'bg-red-900' },
      { name: 'Deep Teal', class: 'bg-teal-900' },
      { name: 'Midnight Black', class: 'bg-neutral-950' }
    ],
    countInStock: 12,
    tags: ['Luxe', 'Ethnic', 'Festive', 'Kurti'],
    isBestSeller: true,
    isNewArrival: false,
    collection: 'Festive'
  },
  {
    id: 'm-street-01',
    name: 'Urban Tweed Trench Coat',
    price: 7850,
    originalPrice: 9500,
    rating: 4.9,
    category: 'outerwear',
    gender: 'men',
    description: 'Crafted from premium heavy-weight wool blend fleece lined with satin, this outerwear piece provides unmatched warmth and style for Butwal winters. Impeccable structural tailoring with dynamic button layouts.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Classic Grey', class: 'bg-gray-500' },
      { name: 'Tweed Navy', class: 'bg-blue-950' },
      { name: 'Camel Tan', class: 'bg-amber-600' }
    ],
    countInStock: 8,
    tags: ['Premium', 'Winter', 'Coat', 'Tailored'],
    isBestSeller: true,
    isNewArrival: true,
    collection: 'Winter'
  },
  {
    id: 'w-casual-01',
    name: 'Aesthetic Linen Flowy Dress',
    price: 3400,
    originalPrice: 4200,
    rating: 4.6,
    category: 'dresses',
    gender: 'women',
    description: 'Designed for summer comfort, this premium breathable linen dress features a relaxed fit with a flared hemline and elegant micro-pleats. Extremely comfortable for daytime outings, cafes, and hot weather in Butwal.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage Green', class: 'bg-emerald-800' },
      { name: 'Blush Pink', class: 'bg-pink-300' },
      { name: 'Classic Mustard', class: 'bg-amber-500' }
    ],
    countInStock: 15,
    tags: ['Linen', 'Summer', 'Flowy', 'Comfortable'],
    isBestSeller: false,
    isNewArrival: true,
    collection: 'Summer'
  },
  {
    id: 'm-casual-02',
    name: 'Premium Breathable Linen Shirt',
    price: 2550,
    rating: 4.5,
    category: 'tops',
    gender: 'men',
    description: 'Tailored for everyday sophistication, made with 100% natural organic linen fiber. Features a clean regular collar, premium pearl buttons, and a perfect fitted silhouette suitable for business casual and holiday wear.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pure White', class: 'bg-white border border-gray-300' },
      { name: 'Olive Drab', class: 'bg-emerald-900' },
      { name: 'Ice Blue', class: 'bg-blue-300' }
    ],
    countInStock: 20,
    tags: ['Linen', 'Shirt', 'Casual', 'Cool'],
    isBestSeller: false,
    isNewArrival: true,
    collection: 'Summer'
  },
  {
    id: 'w-party-01',
    name: 'Elegant Chiffon Evening Gown',
    price: 6800,
    originalPrice: 8500,
    rating: 4.9,
    category: 'dresses',
    gender: 'women',
    description: 'Turn heads at your next social gathering or formal event in Nepal. This premium heavy-chiffon gown comes featuring a stunning draped neckline, detailed waist belt, and an exquisite floor-length pleated design.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Burgundy Spark', class: 'bg-red-850' },
      { name: 'Navy Spark', class: 'bg-blue-900' },
      { name: 'Emerald Glow', class: 'bg-emerald-950' }
    ],
    countInStock: 7,
    tags: ['Party Wear', 'Gown', 'Chiffon', 'Glam'],
    isBestSeller: true,
    isNewArrival: false,
    collection: 'Party Wear'
  },
  {
    id: 'm-ethnic-02',
    name: 'Royalty Silk Sherwani Kurta Set',
    price: 8900,
    originalPrice: 11000,
    rating: 4.9,
    category: 'ethnic',
    gender: 'men',
    description: 'Designed premium silk Sherwani set with clean self-design and customized designer buttons. Comes along with comfortable organic cotton pajama trousers. Perfect for grooms, family weddings, and major festivals.',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Royal Cream', class: 'bg-amber-100' },
      { name: 'Golden Champagne', class: 'bg-yellow-250' }
    ],
    countInStock: 5,
    tags: ['Traditional', 'Royal', 'Sherwani', 'Festive'],
    isBestSeller: true,
    isNewArrival: false,
    collection: 'Festive'
  },
  {
    id: 'acc-01',
    name: 'Premium Leather Double-Stitch Messenger Bag',
    price: 4500,
    originalPrice: 5500,
    rating: 4.7,
    category: 'accessories',
    gender: 'unisex',
    description: 'Handcrafted genuine buffalo leather messenger bag with multiple compartments, robust brass zippers, and heavy-duty adjustable shoulder strap. Fits up to a 15-inch laptop securely with class.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Tan Brown', class: 'bg-amber-800' },
      { name: 'Rich Charcoal', class: 'bg-neutral-800' }
    ],
    countInStock: 10,
    tags: ['Leather', 'Accessories', 'Sleek'],
    isBestSeller: true,
    isNewArrival: true,
    collection: 'Casual'
  },
  {
    id: 'acc-02',
    name: 'Butwal Street Aviator Sunglasses',
    price: 1850,
    rating: 4.4,
    category: 'accessories',
    gender: 'unisex',
    description: 'Dynamic polarized aviator sunglasses with high-quality UV400 protective steel frame. Lightweight ear grips and impact-resistant lenses. Highly durable and fashionable for biking in Butwal city.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Onyx Black', class: 'bg-black' },
      { name: 'Golden Amber', class: 'bg-yellow-600' }
    ],
    countInStock: 25,
    tags: ['Lifestyle', 'Shades', 'UV400', 'Biking'],
    isBestSeller: false,
    isNewArrival: true,
    collection: 'Casual'
  },
  {
    id: 'k-casual-01',
    name: 'Kids Indigo Cotton Suspender Overalls Set',
    price: 2200,
    originalPrice: 2805,
    rating: 4.5,
    category: 'tops',
    gender: 'kids',
    description: 'Perfect blend of comfort and style. Made from 100% skin-safe organic knit cotton overalls paired with a breathable textured striped tee. Snap closures at legs allow for easy changes.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['2T', '3T', '4T', '5-6Y'],
    colors: [
      { name: 'Indigo Denim', class: 'bg-blue-800' },
      { name: 'Mustard Brown', class: 'bg-yellow-700' }
    ],
    countInStock: 14,
    tags: ['Kids Pack', 'Overall', 'Cotton', 'Adorable'],
    isBestSeller: false,
    isNewArrival: true,
    collection: 'Casual'
  },
  {
    id: 'k-winter-02',
    name: 'Kids Teddy-Bear Thermal Fleece Hoodie Set',
    price: 2850,
    rating: 4.8,
    category: 'outerwear',
    gender: 'kids',
    description: 'Keep your little ones cozy during standard cold breezes with this ultra-soft high-loft teddy fleece hoodie and matching pants. Double-layered neck insulation with cute bear ears details.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['3T', '4T', '5-6Y', '7-8Y'],
    colors: [
      { name: 'Beige Bear', class: 'bg-amber-100' },
      { name: 'Dusty Pink Bear', class: 'bg-rose-200' },
      { name: 'Slate Blue Bear', class: 'bg-slate-400' }
    ],
    countInStock: 9,
    tags: ['Cozy', 'Warm', 'Winter', 'Plush'],
    isBestSeller: true,
    isNewArrival: false,
    collection: 'Winter'
  },
  {
    id: 'w-casual-03',
    name: 'Streetwear Oversized Sherpa Jacket',
    price: 3600,
    originalPrice: 4500,
    rating: 4.7,
    category: 'outerwear',
    gender: 'women',
    description: 'Cozy and chic streetwear Sherpa jacket. Intentionally oversized structure with drop-shoulder styling, heavy metal zipper, and insulated windproof inner lining. A top favorite for youth around Nepal.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Vanilla Cream', class: 'bg-orange-50' },
      { name: 'Midnight Charcoal', class: 'bg-slate-800' }
    ],
    countInStock: 11,
    tags: ['Streetwear', 'Oversized', 'Sherpa', 'Warm'],
    isBestSeller: false,
    isNewArrival: true,
    collection: 'Winter'
  },
  {
    id: 'w-ethnic-03',
    name: 'Vintage Banarasi Silk Saree',
    price: 9500,
    originalPrice: 12000,
    rating: 4.9,
    category: 'ethnic',
    gender: 'women',
    description: 'An elegant work of pure traditional craftsmanship. Exquisite Banarasi pure silk saree with heavy Zari weave, artistic golden motifs over a rich lustrous pallu. Comes with customizable matching unstitched blouse piece. A staple of grace and luxury.',
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['Free Size'],
    colors: [
      { name: 'Vermilion Red', class: 'bg-red-600' },
      { name: 'Royal Magenta', class: 'bg-pink-800' },
      { name: 'Emerald Banaras', class: 'bg-emerald-900' }
    ],
    countInStock: 4,
    tags: ['Pure Silk', 'Saree', 'Banarasi', 'Bride'],
    isBestSeller: true,
    isNewArrival: true,
    collection: 'Festive'
  }
];

export const formatPrice = (price: number): string => {
  return `Rs. ${price.toLocaleString('en-NP')}`;
};
