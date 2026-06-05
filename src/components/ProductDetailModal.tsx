import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Ruler, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/products';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  isWishlisted: boolean;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: { name: string; class: string }) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  isWishlisted,
  onWishlistToggle,
  onAddToCart
}: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Free Size');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', class: 'bg-neutral-500' });
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Sync state if product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || 'Free Size');
    setSelectedColor(product.colors[0] || { name: 'Default', class: 'bg-neutral-500' });
    setQuantity(1);
  }, [product]);

  const handleIncrement = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCommitToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl animate-scaleUp flex flex-col lg:flex-row">
        
        {/* Left Side: Images Arena */}
        <div className="lg:w-1/2 p-6 bg-neutral-50 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Primary Main Image Frame */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200/60 bg-white relative">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[9px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                  Top Favorite
                </span>
              )}
            </div>

            {/* Sub-images Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 bg-white transition-all cursor-pointer shrink-0 ${
                      activeImage === img ? 'border-neutral-900 scale-95' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick trust stamps */}
          <div className="mt-6 pt-4 border-t border-gray-200/65 hidden lg:grid grid-cols-3 gap-2 text-[10px] text-gray-500 text-center">
            <div className="flex flex-col items-center gap-1 p-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-gray-800">100% Premium Fabric</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-1">
              <Truck className="w-4 h-4 text-amber-700" />
              <span className="font-semibold text-gray-800">Cash on Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-1">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-800">7-Day Easy Exchange</span>
            </div>
          </div>
        </div>

        {/* Right Side: Options & Actions Detail */}
        <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between relative max-h-[50vh] lg:max-h-none">
          
          {/* Close corner cross */}
          <button
            onClick={onClose}
            id="close-detail-modal"
            className="absolute top-4 right-4 w-9 h-9 border border-gray-200 bg-white hover:bg-neutral-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer z-10"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          <div className="space-y-6">
            {/* Header info */}
            <div>
              <span className="text-xs font-bold text-[#9A3412] uppercase tracking-widest block mb-1">
                {product.gender}'s {product.category}
              </span>
              <h2 id="detail-product-title" className="text-xl sm:text-2xl font-serif font-bold text-gray-900 leading-snug pr-8">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-600">{product.rating} Rating</span>
                <span className="text-gray-300">|</span>
                <span className={`text-xs font-semibold ${product.countInStock > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {product.countInStock > 5
                    ? 'In Stock & Ready'
                    : product.countInStock > 0
                    ? `Only ${product.countInStock} items remaining!`
                    : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price Line */}
            <div className="bg-neutral-50 rounded-2xl p-4 flex items-center justify-between border border-neutral-100">
              <div>
                <span className="text-xs text-gray-400 font-medium block">Price inclusive of Nepal sales taxes</span>
                <span className="text-xl sm:text-2xl font-black text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.originalPrice && (
                <span className="text-xs font-semibold text-[#9A3412] bg-orange-50 border border-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description Text */}
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5">Overview</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* COLOR SELECTION */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span>Selected Color: <strong className="text-[#9A3412]">{selectedColor.name}</strong></span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border transition-all ${
                        selectedColor.name === color.name
                          ? 'border-neutral-900 scale-108 shadow-md'
                          : 'border-transparent hover:scale-103'
                      }`}
                      title={color.name}
                    >
                      <span className={`w-6.5 h-6.5 rounded-full block border border-black/10 ${color.class}`}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZING SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  Selected Size: <strong className="text-[#9A3412]">{selectedSize}</strong>
                </h4>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  id="size-guide-toggle"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-800 hover:text-[#9A3412] hover:underline cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-neutral-500" />
                  Boutique Size Chart
                </button>
              </div>

              {/* Collapsible Size Guide Table */}
              {showSizeGuide && (
                <div className="mb-3.5 bg-neutral-900 text-white rounded-xl p-3 text-xs space-y-2.5 border border-neutral-750 animate-fadeIn">
                  <h5 className="font-bold border-b border-neutral-800 pb-1 text-[#FDBA74]">Nepal Sizing Chart (Inches)</h5>
                  <div className="grid grid-cols-4 gap-1 font-mono text-[10px] text-gray-300">
                    <span className="font-bold text-white">Size</span>
                    <span>Chest</span>
                    <span>Shoulder</span>
                    <span>Length</span>

                    <span className="font-bold text-white">S</span>
                    <span>36" - 38"</span>
                    <span>16.5"</span>
                    <span>26.5"</span>

                    <span className="font-bold text-white">M</span>
                    <span>38" - 40"</span>
                    <span>17.5"</span>
                    <span>27.5"</span>

                    <span className="font-bold text-white">L</span>
                    <span>40" - 42"</span>
                    <span>18.5"</span>
                    <span>28.5"</span>

                    <span className="font-bold text-white">XL</span>
                    <span>42" - 44"</span>
                    <span>19.5"</span>
                    <span>29.5"</span>

                    <span className="font-bold text-white">XXL</span>
                    <span>44" - 46"</span>
                    <span>20.5"</span>
                    <span>30.5"</span>
                  </div>
                  <p className="text-[9px] text-[#9CA3AF] italic leading-tight">
                    * Loose regular fits. For ethnic clothing, select normal customized fitting. Sizing is designed according to Nepal bodily proportions.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-10 h-10 px-3 cursor-pointer rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-neutral-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY CONTROL & WISHLIST TOGGLE ROW */}
            <div className="flex items-center gap-4 pt-1">
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1.5">Qty</h4>
                <div className="flex items-center border border-gray-200 rounded-lg bg-neutral-50 h-10">
                  <button
                    onClick={handleDecrement}
                    className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 font-bold cursor-pointer hover:bg-gray-100 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 font-bold cursor-pointer hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grow pt-5">
                <button
                  onClick={(e) => onWishlistToggle(product.id, e)}
                  id="modal-wishlist-btn"
                  className={`w-full border h-10 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold px-4 transition-all cursor-pointer ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-neutral-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}
                </button>
              </div>
            </div>
          </div>

          {/* ADD TO BAG ACTION FRAME */}
          <div className="mt-8 pt-5 border-t border-gray-100">
            <button
              onClick={handleCommitToCart}
              disabled={product.countInStock === 0 || justAdded}
              id="modal-add-to-cart-btn"
              className={`w-full text-xs font-bold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : product.countInStock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-neutral-950 hover:bg-neutral-850 text-white hover:shadow-lg hover:scale-[1.01]'
              }`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {justAdded ? 'Successfully Added to Bag!' : 'Add to Bag'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
