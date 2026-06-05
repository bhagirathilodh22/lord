import React from 'react';
import { Star, Heart, ArrowRight, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/products';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (id: string, e: React.MouseEvent) => void;
  onProductSelect: (product: Product) => void;
  onInstantAdd: (product: Product, e: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  onProductSelect,
  onInstantAdd
}: ProductCardProps) {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onProductSelect(product)}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-neutral-150 overflow-hidden">
        {/* Dynamic Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="bg-neutral-900 border border-neutral-750 text-white text-[9px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#9A3412] text-white text-[9px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs">
              NEW ARRIVAL
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase border border-gray-200 shadow-xs">
            {product.collection}
          </span>
        </div>

        {/* Wishlist Button Overlay */}
        <button
          onClick={(e) => onWishlistToggle(product.id, e)}
          id={`wishlist-toggle-${product.id}`}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-md border border-gray-150 flex items-center justify-center text-gray-500 hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
        >
          <Heart
            className={`w-4.5 h-4.5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'
            }`}
          />
        </button>

        {/* Primary Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
        />

        {/* Quick View Button Hover Layer */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 backdrop-blur-xs text-gray-950 px-4.5 py-2.5 rounded-xl text-xs font-semibold shadow-xl border border-gray-100 flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4 text-gray-700" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Info Block */}
      <div className="p-4.5 space-y-2.5">
        <div className="space-y-1">
          {/* Gender & Category Info row */}
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {product.gender}'s {product.category}
          </span>
          {/* Star line */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3 h-3 ${
                    idx < Math.floor(product.rating)
                      ? 'fill-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-gray-500">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Title and price lines */}
        <div>
          <h4 className="font-serif font-bold text-gray-900 text-sm leading-tight line-clamp-1 group-hover:text-[#9A3412] transition-colors">
            {product.name}
          </h4>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] line-through text-gray-400">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => onInstantAdd(product, e)}
            id={`instant-add-to-cart-${product.id}`}
            className="text-[10px] font-bold text-neutral-900 hover:text-[#9A3412] tracking-wider uppercase flex items-center gap-1 cursor-pointer hover:underline underline-offset-4"
          >
            Add
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
