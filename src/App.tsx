import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  MapPin,
  Phone,
  MessageSquare,
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronLeft,
  Instagram,
  Send,
  Info,
  Star,
  ShieldCheck,
  Mail,
  ArrowRight,
  Gift
} from 'lucide-react';

// Data Imports
import { products, formatPrice } from './data/products';
import { blogs } from './data/blogs';

// Component Imports
import MapMockup from './components/MapMockup';
import ReviewsSection from './components/ReviewsSection';
import BlogSection from './components/BlogSection';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import AccountPanel from './components/AccountPanel';
import PoliciesSection from './components/PoliciesSection';

// Types Import
import { Product, CartItem, Order } from './types';

// Prepopulated sample order for testing out the Tracker immediately!
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-1049',
    date: 'June 03, 2026',
    status: 'Arrived at Butwal Hub',
    items: [
      {
        productName: 'Luxury Velvet Embroidered Kurti Set',
        quantity: 1,
        price: 4950,
        size: 'L',
        color: 'Deep Teal'
      }
    ],
    total: 4950,
    customerName: 'Bhagirathi Lodh',
    phone: '9801234567',
    address: 'Devinagar near Highway, Butwal-09, Nepal',
    paymentMethod: 'Cash on Delivery'
  }
];

// Carousel items for Home landing hero banner
const HERO_SLIDES = [
  {
    title: 'Festive Luxury Collection 2026',
    tagline: 'Experience pure traditional craftsmanship tailored beautifully for spectacular Nepalese festivals.',
    badge: 'Dashain & Tihar Arrivals',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80',
    btnText: 'Shop Ethnic Wear'
  },
  {
    title: 'Urban Tailored Casuals',
    tagline: 'Premium organic linen and light textures crafted with minimalist modern accents for ultimate summer ease.',
    badge: 'New Season Launch',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1600&auto=format&fit=crop&q=80',
    btnText: 'Shop New Arrivals'
  },
  {
    title: 'Warm Thermal Comfortwear',
    tagline: 'Cozy Sherpa blazers, tweed coats, and child teddy linings protecting you through cool mountain breezes.',
    badge: 'Winter Wardrobe Base',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1600&auto=format&fit=crop&q=80',
    btnText: 'Shop Winter Essentials'
  }
];

// Mock Instagram Feed images
const INSTA_FEED = [
  { id: 'feed-1', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&fit=crop&q=80', likes: '1.2K', model: '@poonam_magar' },
  { id: 'feed-2', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&fit=crop&q=80', likes: '900', model: '@siddharth_lodh' },
  { id: 'feed-3', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&fit=crop&q=80', likes: '2.5K', model: '@shristi_kc' },
  { id: 'feed-4', img: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=400&fit=crop&q=80', likes: '1.8K', model: '@ravi_sharma' }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart & Wishlist & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Core filter parameters
  const [searchTerm, setSearchTerm] = useState('');
  const [shopGender, setShopGender] = useState<'all' | 'men' | 'women' | 'kids' | 'accessories'>('all');
  const [shopCollection, setShopCollection] = useState<'all' | 'Summer' | 'Winter' | 'Festive' | 'Party Wear' | 'Casual'>('all');

  // Interactive Product quick modal details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Contact Form feedback simulator
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Home Hero slider index
  const [activeSlide, setActiveSlide] = useState(0);

  // Handle slide interval ticking safely
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Update navbar metadata name on first load! (Crucial first-turn guideline)
  useEffect(() => {
    // Update head html title dynamically to look high polish
    document.title = 'Butwal Fashion Store - Premium Traditional & Modern Clothing';
  }, []);

  // Wishlist addition toggle
  const handleWishlistToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // halt trigger card view
    const alreadySaved = wishlist.some((item) => item.id === id);
    if (alreadySaved) {
      setWishlist(wishlist.filter((item) => item.id !== id));
    } else {
      const match = products.find((item) => item.id === id);
      if (match) {
        setWishlist([...wishlist, match]);
      }
    }
  };

  // Add item into Cart list with size option & color mapping
  const handleAddToCart = (product: Product, quantity: number, size: string, color: { name: string; class: string }) => {
    const itemUniqueId = `${product.id}-${size}-${color.name}`;
    const alreadyInCart = cartItems.find((item) => item.id === itemUniqueId);

    if (alreadyInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.id === itemUniqueId
            ? { ...item, quantity: Math.min(product.countInStock, item.quantity + quantity) }
            : item
        )
      );
    } else {
      const newCartItem: CartItem = {
        id: itemUniqueId,
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  // Fast single click checkout item adding (defaults to first size/color)
  const handleInstantAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const sizeVal = product.sizes[0] || 'Free Size';
    const colorVal = product.colors[0] || { name: 'Default', class: 'bg-neutral-500' };
    handleAddToCart(product, 1, sizeVal, colorVal);
    
    // Quick toast alert inside layout
    setIsCartOpen(true);
  };

  // Cart modifications
  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems(cartItems.filter((i) => i.id !== id));
    } else {
      setCartItems(cartItems.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  };

  const handleRegisterOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  // Contact form execution
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMsg) return;
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
    setTimeout(() => setContactSuccess(false), 5000);
  };

  // Filter lists based on states
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = shopGender === 'all' || item.gender === shopGender || (shopGender === 'accessories' && item.category === 'accessories');
    const matchesCollection = shopCollection === 'all' || item.collection === shopCollection;

    return matchesSearch && matchesGender && matchesCollection;
  });

  return (
    <div id="app-root-frame" className="min-h-screen bg-[#FDFCFB] text-neutral-800 font-sans antialiased selection:bg-[#9A3412]/15 flex flex-col justify-between">
      
      {/* EXQUISITE NOTIFICATION HERO TOP RAIL */}
      <div className="bg-neutral-950 text-white text-[11px] font-medium tracking-wide py-2.5 px-4 text-center flex items-center justify-center gap-1.5 shrink-0 select-none">
        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
        <span>Special Launch Offer: Free Delivery inside Butwal and all locations in Nepal for orders above Rs. 3,000!</span>
        <span className="hidden sm:inline bg-[#9A3412] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ml-2">HOT DEAL</span>
      </div>

      {/* 2. HEADER NAVIGATION BAR */}
      <header className="bg-white/85 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18.5 flex items-center justify-between">
          
          {/* Brand Logo visual */}
          <button
            onClick={() => {
              setActiveTab('Home');
              setSearchTerm('');
              setShopGender('all');
            }}
            id="brand-logo-trigger"
            className="flex items-center gap-2 cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center shadow-md">
              <span className="font-serif font-black text-white text-lg tracking-wider">B</span>
            </div>
            <div>
              <h1 className="font-serif font-black text-gray-950 text-base leading-none tracking-tight">
                BUTWAL FASHION
              </h1>
              <p className="text-[10px] uppercase font-bold text-[#9A3412] tracking-widest mt-0.5">
                Boutique Nepal
              </p>
            </div>
          </button>

          {/* Core Wide screens directory */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {['Home', 'Shop', 'New Arrivals', 'Collections', 'About Us', 'Blog', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'text-white bg-neutral-950'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-neutral-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Interactive User triggers bag, wishlist */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Wishlist item counter */}
            <button
              onClick={() => setActiveTab('Account')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-gray-600 relative transition-colors cursor-pointer"
              title="View saved elements"
            >
              <Heart className="w-4.5 h-4.5 text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 outline-2 outline-white text-white font-mono font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center animate-scaleUp">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart button trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="cart-trigger-btn"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-950 hover:bg-neutral-850 flex items-center justify-center text-white relative transition-colors cursor-pointer shadow-sm"
              title="Your Shopping Bag"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-white" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#9A3412] text-white font-mono font-extrabold text-[9px] w-5.5 h-5.5 rounded-full flex items-center justify-center outline-3 outline-white shadow-md animate-scaleUp">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Account Dashboard button */}
            <button
              onClick={() => {
                setActiveTab('Account');
                setMobileMenuOpen(false);
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              title="Customer Account"
            >
              <User className="w-4.5 h-4.5 text-gray-700" />
            </button>

            {/* Mobile Drawer trigger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 bg-neutral-100 text-gray-700 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile menu collapsible */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white p-4 space-y-2 animate-slideDown">
            {['Home', 'Shop', 'New Arrivals', 'Collections', 'About Us', 'Blog', 'Contact', 'Policies'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                  activeTab === tab
                    ? 'bg-neutral-950 text-white'
                    : 'text-gray-600 hover:bg-neutral-50 hover:text-gray-950'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 3. MAIN CONTENTS CONTAINER FRAME */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* A. HOME LANDING TAB VIEW */}
        {activeTab === 'Home' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* HERO CAROUSEL INTERACTIVE */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm h-[400px] sm:h-[500px] bg-neutral-950">
              {/* Active Image background representation */}
              <div className="absolute inset-0 z-0">
                <img
                  src={HERO_SLIDES[activeSlide].image}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 scale-102 transition-transform duration-[6000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/45 to-transparent"></div>
              </div>

              {/* Slider Meta details overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-12 max-w-2xl text-white">
                <div className="inline-block bg-[#9A3412] text-white text-[10px] font-black uppercase px-3.5 py-1.5 rounded-md tracking-widest self-start shadow-sm animate-pulse">
                  {HERO_SLIDES[activeSlide].badge}
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-none text-white drop-shadow-md">
                    {HERO_SLIDES[activeSlide].title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 font-light max-w-lg leading-relaxed">
                    {HERO_SLIDES[activeSlide].tagline}
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('Shop');
                      setShopCollection('all');
                      setShopGender('all');
                    }}
                    id="hero-shop-cta"
                    className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-950 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-lg hover:scale-103 cursor-pointer mt-2"
                  >
                    <span>Shop Latest Arrivals</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                </div>

                {/* Dot markers indicators */}
                <div className="flex gap-2.5 mt-4">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlide === idx ? 'w-8 bg-[#D97706]' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTIONS B: EXQUISITE CATEGORIES ROUND */}
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">DESIGNER SELECTIONS</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-gray-950 font-black">Shop By Categories</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { title: "Women's Collection", id: 'women', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80' },
                  { title: "Men's Collection", id: 'men', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80' },
                  { title: "Kids' Collection", id: 'kids', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80' },
                  { title: "Boutique Accessories", id: 'accessories', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80' }
                ].map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setShopGender(cat.id as any);
                      setActiveTab('Shop');
                    }}
                    id={`category-tile-${cat.id}`}
                    className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xs border border-gray-150/50 cursor-pointer text-left"
                  >
                    <img
                      src={cat.img}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/15 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-serif font-black text-sm sm:text-base leading-snug group-hover:text-amber-300 transition-colors">
                        {cat.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-gray-300 font-medium tracking-wider uppercase mt-1">
                        Explore Collection
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTIONS C: BEST SELLERS */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">PROVEN FAVORITES</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-black">Best Sellers</h3>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('Shop');
                    setShopGender('all');
                    setShopCollection('all');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#9A3412] cursor-pointer"
                >
                  View All Products
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.filter(p => p.isBestSeller).slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isWishlisted={wishlist.some((w) => w.id === p.id)}
                    onWishlistToggle={handleWishlistToggle}
                    onProductSelect={setSelectedProduct}
                    onInstantAdd={handleInstantAdd}
                  />
                ))}
              </div>
            </div>

            {/* SECTION D: SEASONAL PROMOTION (SUMMER / WINTER SPLIT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-gray-150">
              <div className="space-y-4 p-4 self-center text-left">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                  SEASONAL RADAR
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-gray-950 font-black leading-tight">
                  Discover Our Premium Nepal Festive Wear
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  Celebrate Dashain, Tihar, wedding seasons, and rituals clad in Banarasi royal silks, heavy embroidered Kurtis, and customized pure silk Sherwanis. Each piece undergoes intensive stitch tailoring right at our hubs.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShopCollection('Festive');
                      setActiveTab('Shop');
                    }}
                    id="shop-festive"
                    className="bg-neutral-950 hover:bg-neutral-850 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all cursor-pointer"
                  >
                    View Festive Wear
                  </button>
                  <button
                    onClick={() => {
                      setShopCollection('Winter');
                      setActiveTab('Shop');
                    }}
                    id="shop-winter"
                    className="border border-gray-300 hover:bg-neutral-100 text-gray-700 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all cursor-pointer"
                  >
                    Winter Outerwear
                  </button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video sm:aspect-auto h-64 sm:h-80 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=800&auto=format&fit=crop&q=80"
                  alt="Traditional Saree photoshoot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* SECTION E: CUSTOMER REVIEWS */}
            <div className="pt-6">
              <ReviewsSection />
            </div>

            {/* SECTION F: INSTAGRAM / TIKTOK FEED */}
            <div className="space-y-6 pt-6">
              <div className="text-center max-w-md mx-auto">
                <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">
                  @BUTWAl_BOUTIQUE_NEPAL
                </span>
                <h3 className="text-2xl font-serif font-black text-gray-950">Look Book on Socials</h3>
                <p className="text-gray-500 text-xs mt-1">
                  Tag us wearing our designs in Rupandehi and across Nepal to get featured on our feed!
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {INSTA_FEED.map((feed) => (
                  <div key={feed.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 bg-neutral-50 shadow-xs">
                    <img src={feed.img} alt="" className="w-full h-full object-cover group-hover:scale-103 duration-300 transition-all" />
                    <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-between p-4.5 text-white">
                      <span className="text-xs font-semibold text-[#FDBA74]">{feed.model}</span>
                      <div className="flex items-center gap-1 text-xs">
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                        <span>{feed.likes} Love</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LAST ACTION BANNER (CTA) */}
            <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 relative overflow-hidden shadow-md">
              {/* background design */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-800/10 pointer-events-none"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-red-800/10 pointer-events-none"></div>
              
              <div className="max-w-xl mx-auto space-y-4">
                <span className="text-xs tracking-widest font-black uppercase text-[#FDBA74] block">LTD OPPORTUNITY</span>
                <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white leading-none">
                  Tailor-Fit Your Festive Aesthetics
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-light max-w-sm mx-auto leading-relaxed">
                  Join hundreds of families styling themselves from our Butwal Fashion catalogue. Create account to monitor deliveries seamlessly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('Shop');
                      setShopGender('all');
                      setShopCollection('all');
                    }}
                    id="cta-shop-now-bottom"
                    className="bg-white hover:bg-neutral-100 text-neutral-950 font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* B. SHOP TAB VIEW */}
        {activeTab === 'Shop' && (
          <div className="space-y-8 animate-fadeIn text-left">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">BOUTIQUE COLLECTION</span>
              <h2 id="catalog-title" className="text-2xl sm:text-3xl font-serif text-gray-950 font-black">Wardrobe Catalog</h2>
              <p className="text-gray-500 text-xs mt-1">
                Refine our catalog of premium garments. Tap quick view to examine color variables and exact size charts.
              </p>
            </div>

            {/* SECTIONS FILTERS AND CONTROLS */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-gray-150 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Search query box */}
                <div className="md:col-span-4 relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search e.g. Silk, Trench, Saree, Luxe..."
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs focus:outline-hidden focus:border-neutral-900 text-gray-900"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-950 text-xs font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Filter Categorization Buttons */}
                <div className="md:col-span-8 flex flex-wrap gap-2 items-center justify-start py-0.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mr-1">Section:</span>
                  {[
                    { label: 'All Garments', val: 'all' },
                    { label: 'Women', val: 'women' },
                    { label: 'Men', val: 'men' },
                    { label: 'Kids Wear', val: 'kids' },
                    { label: 'Accessories & Sizing', val: 'accessories' }
                  ].map((sub) => (
                    <button
                      key={sub.val}
                      onClick={() => setShopGender(sub.val as any)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        shopGender === sub.val
                          ? 'bg-neutral-950 text-white shadow-xs'
                          : 'bg-white hover:bg-neutral-100 border border-gray-200 text-gray-600'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Collections Segment Category filter */}
              <div className="border-t border-gray-200/75 pt-3.5 flex flex-wrap gap-2 items-center justify-start">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mr-1">Theme Filter:</span>
                {[
                  { label: 'All Themes', val: 'all' },
                  { label: 'Summer Outfits', val: 'Summer' },
                  { label: 'Winter Layers', val: 'Winter' },
                  { label: 'Festive Wear', val: 'Festive' },
                  { label: 'Party Attires', val: 'Party Wear' },
                  { label: 'Casual Essentials', val: 'Casual' }
                ].map((col) => (
                  <button
                    key={col.val}
                    onClick={() => setShopCollection(col.val as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      shopCollection === col.val
                        ? 'bg-orange-100 text-[#9A3412] border border-orange-200 font-bold'
                        : 'bg-white hover:bg-neutral-100 border border-gray-150 text-gray-600'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCTS LISTING STAGE GRID */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-200 bg-white rounded-3xl space-y-3.5 max-w-md mx-auto">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-950">No garments matched criteria</h4>
                  <p className="text-xs text-gray-500 font-light max-w-xs mx-auto">
                    Try adjusting your filters, clearing your search query input, or switching sections.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShopGender('all');
                    setShopCollection('all');
                  }}
                  className="bg-neutral-950 text-white text-xs font-bold px-5 py-2 rounded-lg cursor-pointer hover:bg-neutral-850 transition-colors"
                >
                  Reset Filtration
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isWishlisted={wishlist.some((w) => w.id === p.id)}
                    onWishlistToggle={handleWishlistToggle}
                    onProductSelect={setSelectedProduct}
                    onInstantAdd={handleInstantAdd}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* C. NEW ARRIVALS VIEW */}
        {activeTab === 'New Arrivals' && (
          <div className="space-y-8 animate-fadeIn text-left">
            <div className="text-center max-w-lg mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">FRESHLY LAUNCHED</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-950 font-black">Latest Products & Trends</h2>
              <p className="text-gray-500 text-xs mt-1">
                Stay updated with modern creations. This block features designs crafted and launched within the last few weeks in our Butwal store.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.filter(item => item.isNewArrival).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={wishlist.some((w) => w.id === p.id)}
                  onWishlistToggle={handleWishlistToggle}
                  onProductSelect={setSelectedProduct}
                  onInstantAdd={handleInstantAdd}
                />
              ))}
            </div>
          </div>
        )}

        {/* D. COLLECTIONS VIEW */}
        {activeTab === 'Collections' && (
          <div className="space-y-12 animate-fadeIn text-left">
            <div className="text-center max-w-lg mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">DESIGN ANTHOLOGY</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-gray-950 font-black font-serif">Curated Collections</h2>
              <p className="text-gray-500 text-xs mt-1">
                Explore garments tailored according to the unique functional requirements of climatic changes and Nepali festivals.
              </p>
            </div>

            {/* Theme sections breakdown list */}
            {[
              { id: 'Festive', name: 'Festive Collection', desc: 'Indulge in royal velvet kurta sets, heavy zari Banarasi sarees, and custom luxury silk Sherwanis optimized for Dashain, Tihar, and marriage rituals.', count: products.filter(p => p.collection === 'Festive').length, bg: 'bg-[#FEF3C7]' },
              { id: 'Winter', name: 'Winter Collection', desc: 'Stylish street outerwear featuring wool tweed trench coats, fuzzy fleece cozy hoodies, and windproof heavy insulated layers.', count: products.filter(p => p.collection === 'Winter').length, bg: 'bg-[#E0F2FE]' },
              { id: 'Summer', name: 'Summer Collection', desc: 'Airy, hyper-breathable linen short sleeve tees, flowy flared maxi dresses, and soft light-tone organics keeping heat away.', count: products.filter(p => p.collection === 'Summer').length, bg: 'bg-[#ECFDF5]' },
              { id: 'Casual', name: 'Casual Wardrobe', desc: 'Premium lifestyle sunglasses, robust buffalo double-stitch leather wallets, everyday regular button-down shirts, and lifestyle accessories.', count: products.filter(p => p.collection === 'Casual').length, bg: 'bg-neutral-100' }
            ].map((col) => (
              <div key={col.id} className="border border-gray-150 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:border-gray-300 transition-colors bg-white">
                <div className="md:col-span-4 space-y-3">
                  <div className={`inline-block px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${col.bg} text-neutral-800 border. border-black/5`}>
                    {col.name} ({col.count} Products)
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-gray-900 leading-tight">{col.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">{col.desc}</p>
                  <button
                    onClick={() => {
                      setShopCollection(col.id as any);
                      setActiveTab('Shop');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#9A3412] hover:underline underline-offset-4 cursor-pointer pt-1"
                  >
                    Browse and Refine Catalogue
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subgrid of 3 top products belonging to collection */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {products.filter(p => p.collection === col.id).slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="border border-gray-100 p-2.5 rounded-xl cursor-pointer hover:border-neutral-900 transition-all flex flex-col justify-between h-56 bg-neutral-50/50"
                    >
                      <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-md mb-2 shrink-0" />
                      <div className="text-left space-y-1">
                        <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">{p.name}</h4>
                        <span className="text-xs font-bold text-gray-700 font-mono">{formatPrice(p.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* E. ABOUT US VIEW */}
        {activeTab === 'About Us' && (
          <div className="space-y-16 animate-fadeIn text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 inline-block uppercase">
                  OUR CHRONICLE
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-950 leading-tight">
                  We Bring World-Class Fashion to Butwal City
                </h2>
                
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  Founded with a clear vision to redefine fashion trends in Nepal, <strong className="font-semibold text-gray-900">Butwal Fashion Boutique</strong> started as a modest design boutique. Over years of hard work, continuous quality upgrades, and listening closely to our customers, we have grown into one of Nepal's most respected names.
                </p>

                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  Our collections stand out because we choose fabrics with great care—organic linen from trusted producers, pure handwoven Banarasi silks, and plush winter yarns. We tailor each collection to fit Nepalese body shapes correctly, ensuring that our clothes are both beautiful and comfortable to wear.
                </p>

                <div className="grid grid-cols-3 gap-4 border-t border-gray-150 pt-6">
                  <div>
                    <h5 className="font-black text-2xl text-[#9A3412] font-serif">10K+</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">HAPPY CLIENTS IN NEPAL</p>
                  </div>
                  <div>
                    <h5 className="font-black text-2xl text-[#9A3412] font-serif">100%</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">HAND-CHECKED FABRIC</p>
                  </div>
                  <div>
                    <h5 className="font-black text-2xl text-[#9A3412] font-serif">Butwal</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">CENTRAL PHYSICAL HUB</p>
                  </div>
                </div>
              </div>

              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=80"
                  alt="Fashion Boutique physical store layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* BRAND VALUES STATEMENT */}
            <div className="bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-gray-150 space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-gray-905">Why Customers Trust Our Store</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Every thread in our boutique is handled with care and respect for traditional craft and modern styling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-[#9A3412] flex items-center justify-center font-bold mx-auto text-base">✓</div>
                  <h4 className="font-bold text-sm text-gray-900">Custom Alterations</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Visit Milan Chowk locations for complementary custom adjustments. We trim lengths, adjust sleeves, and alter fittings until it feels like a second skin.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-[#9A3412] flex items-center justify-center font-bold mx-auto text-base">✓</div>
                  <h4 className="font-bold text-sm text-gray-900">Ethical Sourcing</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    We select raw fibers ethically from verified cottage weaves. Supporting local weavers allows us to safeguard heritage while manufacturing premium wardrobes.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-[#9A3412] flex items-center justify-center font-bold mx-auto text-base">✓</div>
                  <h4 className="font-bold text-sm text-gray-900">Transparency Over Profit</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    No deceptive pricing. Listed prices comprehensively detail the raw luxury yarn values and fair tailoring salaries without arbitrary padding.
                  </p>
                </div>
              </div>
            </div>

            {/* PHYSICAL MAP DETAILS */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-black">Our Central Boutique Location</h3>
              <MapMockup />
            </div>
          </div>
        )}

        {/* F. BLOGS VIEW */}
        {activeTab === 'Blog' && (
          <div className="animate-fadeIn">
            <BlogSection />
          </div>
        )}

        {/* G. CONTACT VIEW */}
        {activeTab === 'Contact' && (
          <div className="space-y-12 animate-fadeIn text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct contact info */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">GET IN TOUCH</span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-gray-950 font-black">We Would Love to Hear From You</h2>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed font-light">
                    Have inquiries regarding custom sizing, wedding orders, or bulk shipments across Nepal? Pop us a message!
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* Address */}
                  <div className="flex gap-4 border border-gray-100 p-4 rounded-2xl bg-white hover:border-gray-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-neutral-50 flex items-center justify-center text-[#9A3412] shrink-0 mt-0.5">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-gray-900">Boutique Address</h4>
                      <p className="text-gray-500 leading-normal mt-0.5">Milan Chowk (Opposite Everest Bank), Butwal-09, Rupandehi, Nepal</p>
                    </div>
                  </div>

                  {/* Telephone calls */}
                  <div className="flex gap-4 border border-gray-100 p-4 rounded-2xl bg-white hover:border-gray-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-neutral-50 flex items-center justify-center text-[#9A3412] shrink-0 mt-0.5">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-gray-900">Phone Calls & Queries</h4>
                      <p className="font-mono text-gray-800 leading-normal mt-0.5">+977-71-550123 / +977-9801234567</p>
                    </div>
                  </div>

                  {/* Messaging Whatsapp */}
                  <div className="flex gap-4 border border-gray-100 p-4 rounded-2xl bg-white hover:border-gray-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-neutral-50 flex items-center justify-center text-[#9A3412] shrink-0 mt-0.5">
                      <MessageSquare className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-gray-900">WhatsApp & Messenger</h4>
                      <p className="font-mono text-gray-800 leading-normal mt-0.5">Send messages directly at +977-9801234567 to sync details</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Contact submission Form */}
              <div className="lg:col-span-7 bg-white border border-gray-150 p-6 sm:p-8 rounded-3xl space-y-4">
                <h3 className="font-serif font-black text-lg text-gray-950">Send Instant Inquiry</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="E.g. Priyanka Karki"
                        className="w-full bg-neutral-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:bg-white focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Email / Phone *</label>
                      <input
                        type="text"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="E.g. priyanka@gmail.com"
                        className="w-full bg-neutral-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:bg-white focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Message Detail *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Explain your queries or custom design adjustments requirements clearly..."
                      className="w-full bg-neutral-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:bg-white focus:border-neutral-900 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full bg-neutral-950 hover:bg-neutral-850 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>

                  {/* Feedback on successfully sending message */}
                  {contactSuccess && (
                    <div className="bg-emerald-50 text-emerald-800 text-xs px-3.5 py-2.5 rounded-lg border border-emerald-100 flex items-center gap-2 animate-scaleUp">
                      <Gift className="w-4 h-4 text-emerald-600" />
                      Inquiry delivered! Our support representative in Butwal store will call or email you shortly. Dhanyabaad!
                    </div>
                  )}
                </form>
              </div>

            </div>

            {/* NEAT INLINE MAP */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-black">Find Us in Milan Chowk</h3>
              <MapMockup />
            </div>
          </div>
        )}

        {/* H. ACCOUNT VIEW */}
        {activeTab === 'Account' && (
          <div className="animate-fadeIn">
            <AccountPanel
              wishlist={wishlist}
              orders={orders}
              onRemoveFromWishlist={(id, e) => {
                e.stopPropagation();
                setWishlist(wishlist.filter((item) => item.id !== id));
              }}
              onProductSelect={setSelectedProduct}
              onInstantAdd={handleInstantAdd}
            />
          </div>
        )}

        {/* I. POLICIES VIEW */}
        {activeTab === 'Policies' && (
          <div className="animate-fadeIn">
            <PoliciesSection />
          </div>
        )}

      </main>

      {/* 4. FOOTER FOOTING */}
      <footer className="bg-neutral-950 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-850 mt-16 text-left shrink-0 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Store Brief info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="font-serif font-black text-neutral-950 text-base">B</span>
              </div>
              <h3 className="font-serif font-bold text-white text-base">BUTWAL FASHION</h3>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Premium tailored garments, festive kurtis, and modern daily wear situated at Milan Chowk, Butwal, Nepal. We protect style heritage with natural yarn comfort.
            </p>
            <div className="flex gap-2 text-white">
              <a href="https://instagram.com" className="w-7 h-7 bg-neutral-850 hover:bg-neutral-800 rounded-full flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="https://facebook.com" className="w-7 h-7 bg-neutral-850 hover:bg-neutral-800 rounded-full flex items-center justify-center transition-colors"><MessageSquare className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3.5 text-xs text-gray-400">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">SHOP DISCOVERIES</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setActiveTab('Shop'); setShopGender('women'); }} className="text-left hover:text-white transition-colors cursor-pointer">Women's Wear精品</button>
              <button onClick={() => { setActiveTab('Shop'); setShopGender('men'); }} className="text-left hover:text-white transition-colors cursor-pointer">Men's Tailoring</button>
              <button onClick={() => { setActiveTab('Shop'); setShopGender('kids'); }} className="text-left hover:text-white transition-colors cursor-pointer">Kids Cozy Packs</button>
              <button onClick={() => { setActiveTab('Shop'); setShopGender('accessories'); }} className="text-left hover:text-white transition-colors cursor-pointer">Boutique Accent Accessories</button>
            </div>
          </div>

          {/* Column 3: Information & story */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">THE BOUTIQUE</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => setActiveTab('About Us')} className="text-left hover:text-white transition-colors cursor-pointer">Our Story Chronicle</button>
              <button onClick={() => setActiveTab('Blog')} className="text-left hover:text-white transition-colors cursor-pointer">Style Blogs & Tips for Nepal</button>
              <button onClick={() => setActiveTab('Contact')} className="text-left hover:text-white transition-colors cursor-pointer">Visit Milan Chowk Store</button>
              <button onClick={() => setActiveTab('Policies')} className="text-left hover:text-white transition-colors cursor-pointer">View Store Policies</button>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">NEWSLETTER RELEASES</h4>
            <p className="text-gray-400 font-light leading-relaxed">Join active wardrobe members to get updates on seasonal festive discount rollouts in Butwal.</p>
            <div className="flex gap-1.5 h-9">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-neutral-900 border border-neutral-800 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-hidden w-full"
              />
              <button
                onClick={() => alert("Thank you! You've successfully subscribed to our Butwal Fashion newsletter.")}
                className="bg-white hover:bg-gray-100 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3.5 rounded-lg cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>

        </div>

        {/* footer legal stamp lines */}
        <div className="max-w-7xl mx-auto border-t border-neutral-905 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© 2026 Butwal Fashion Boutique. All Rights Reserved. Tailored lovingly inside Rupandehi District, Nepal.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <button onClick={() => setActiveTab('Policies')} className="hover:text-white transition-colors cursor-pointer">Shipping Policy</button>
            <button onClick={() => setActiveTab('Policies')} className="hover:text-white transition-colors cursor-pointer">T&C</button>
            <button onClick={() => setActiveTab('Policies')} className="hover:text-white transition-colors cursor-pointer">Privacy Guarantee</button>
          </div>
        </div>
      </footer>

      {/* 5. SIDEWAYS SHOPPING CART DRAWER PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={(id) => setCartItems(cartItems.filter((i) => i.id !== id))}
        onClearCart={() => setCartItems([])}
        onNewOrder={handleRegisterOrder}
        onSetActiveTab={setActiveTab}
      />

      {/* 6. PRODUCT QUICK DETAILED OVERLAY MODAL */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onWishlistToggle={handleWishlistToggle}
          onAddToCart={handleAddToCart}
        />
      )}

    </div>
  );
}
