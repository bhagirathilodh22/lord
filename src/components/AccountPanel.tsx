import React, { useState } from 'react';
import { User, LogIn, Heart, Truck, Package, ShieldCheck, MapPin, Search, Clipboard, Copy, Check, Eye } from 'lucide-react';
import { Product, Order } from '../types';
import { formatPrice } from '../data/products';

interface AccountPanelProps {
  wishlist: Product[];
  orders: Order[];
  onRemoveFromWishlist: (id: string, e: React.MouseEvent) => void;
  onProductSelect: (product: Product) => void;
  onInstantAdd: (product: Product, e: React.MouseEvent) => void;
}

export default function AccountPanel({
  wishlist,
  orders,
  onRemoveFromWishlist,
  onProductSelect,
  onInstantAdd
}: AccountPanelProps) {
  // Login Profile State
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default true for high personalization
  const [phoneNumber, setPhoneNumber] = useState('9801234567');
  const [customerName, setCustomerName] = useState('Bhagirathi Lodh');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Order Tracker State
  const [searchOrderId, setSearchOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackError, setTrackError] = useState(false);
  const [copiedId, setCopiedId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && customerName) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Tracking Lookup
  const handleTrackLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;

    // Search active orders state
    const cleanId = searchOrderId.trim().toUpperCase();
    const foundOrder = orders.find((o) => o.id === cleanId);

    if (foundOrder) {
      setTrackedOrder(foundOrder);
      setTrackError(false);
    } else {
      // Setup a smart fallback mock tracking for demo purposes if ID doesn't exist
      if (cleanId.startsWith('ORD-')) {
        const fallbackOrder: Order = {
          id: cleanId,
          date: 'June 03, 2026',
          status: 'Arrived at Butwal Hub',
          items: [{ productName: 'Classic Tweed Dress Set', quantity: 1, price: 3400, size: 'M', color: 'Midnight Gold' }],
          total: 3550,
          customerName: customerName || 'Valued Customer',
          phone: phoneNumber || '9871112222',
          address: 'Main St Traffic Chowk, Butwal, Nepal',
          paymentMethod: 'Cash on Delivery'
        };
        setTrackedOrder(fallbackOrder);
        setTrackError(false);
      } else {
        setTrackedOrder(null);
        setTrackError(true);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(''), 2000);
  };

  return (
    <div id="account-central-panel" className="space-y-8 animate-fadeIn">
      
      {/* 1. LOGIN / LOGOUT COMPONENT */}
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-gray-700 mx-auto">
              <LogIn className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-black text-xl text-gray-900">Sign In to Your Account</h3>
            <p className="text-xs text-gray-400">Save wishlist, track order updates, and view exclusive boutique styles in Nepal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="E.g. Bhagirathi Lodh"
                className="w-full bg-neutral-50 border border-gray-200 focus:bg-white focus:border-neutral-900 rounded-lg px-3.5 py-2.5 text-xs focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="E.g. 9801234567"
                className="w-full bg-neutral-50 border border-gray-200 focus:bg-white focus:border-neutral-900 rounded-lg px-3.5 py-2.5 text-xs focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Email (Optional)</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="bhagirathilodh73@gmail.com"
                className="w-full bg-neutral-50 border border-gray-200 focus:bg-white focus:border-neutral-900 rounded-lg px-3.5 py-2.5 text-xs focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-950 hover:bg-neutral-850 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-md transition-colors cursor-pointer"
            >
              Sign In / Register
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* USER CARD BRIEF */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 space-y-6 self-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold font-serif text-lg">
                {customerName.charAt(0)}
              </div>
              <div>
                <h4 className="font-serif font-bold text-gray-900 text-base">{customerName}</h4>
                <p className="text-xs text-gray-400 font-mono">{phoneNumber}</p>
              </div>
            </div>

            <div className="border-t border-gray-150 pt-5 space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-gray-500">
                <span>Account Status:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px] uppercase border border-emerald-100/30">
                  Active Member
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Wishlist Count:</span>
                <span className="font-bold text-gray-800">{wishlist.length} Items</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Past Orders:</span>
                <span className="font-bold text-gray-800">{orders.length} Placed</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs py-2 rounded-lg transition-colors cursor-pointer"
            >
              Log Out From Account
            </button>
          </div>

          {/* ORDER TRACKING & WISHLIST AREA */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* A. Live Order tracking lookup */}
            <div className="bg-neutral-50 rounded-2xl border border-gray-200/80 p-5 sm:p-6 space-y-5">
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900">Nepal Delivery Tracker</h3>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Enter your order tracking identification code (e.g. from the checkout success box) to retrieve live delivery logs.
                </p>
              </div>

              <form onSubmit={handleTrackLookup} className="flex gap-2">
                <div className="relative grow">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="E.g. ORD-2026-3195"
                    className="w-full bg-white border border-gray-200 rounded-lg pl-9.5 pr-3 py-2.5 text-xs focus:outline-hidden focus:border-neutral-900 text-gray-900 font-mono tracking-wider uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-950 hover:bg-neutral-850 text-white font-bold text-xs uppercase tracking-wider px-5 rounded-lg shrink-0 transition-colors cursor-pointer"
                >
                  Lookup
                </button>
              </form>

              {/* Sample available orders to click tracking fast (UX Booster!) */}
              {orders.length > 0 && !trackedOrder && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-gray-500">
                  <span>Your active orders:</span>
                  {orders.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => {
                        setSearchOrderId(o.id);
                        setTrackedOrder(o);
                        setTrackError(false);
                      }}
                      className="bg-white border border-gray-200 px-2.5 py-1 rounded-sm text-neutral-800 font-mono hover:border-neutral-950 cursor-pointer"
                    >
                      {o.id}
                    </button>
                  ))}
                </div>
              )}

              {/* Track Error display */}
              {trackError && (
                <div className="bg-red-50 text-red-800 border border-red-100 rounded-lg p-3 text-xs">
                  We couldn't locate any order with ID "{searchOrderId}". Please review the characters or use standard order formats like 'ORD-2026-1049'.
                </div>
              )}

              {/* Track Success Timeline output */}
              {trackedOrder && (
                <div className="bg-white border border-gray-200/50 rounded-xl p-5 space-y-5 animate-scaleUp">
                  {/* Order Details box */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-3.5 mb-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold tracking-widest block uppercase">ORDER DETAIL</span>
                      <h4 className="font-mono text-sm font-bold text-gray-900 flex items-center gap-1.5">
                        {trackedOrder.id}
                        <button
                          onClick={() => copyToClipboard(trackedOrder.id)}
                          className="text-gray-400 hover:text-gray-900 cursor-pointer"
                          title="Copy Code"
                        >
                          {copiedId === trackedOrder.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-bold block">TOTAL AMOUNT</span>
                      <span className="text-sm font-bold text-[#9A3412] font-mono">{formatPrice(trackedOrder.total)}</span>
                    </div>
                  </div>

                  {/* TIMELINE TIMESHIP CHART */}
                  <div className="space-y-6 pt-1 max-w-md">
                    {/* Status 1: Order Logged */}
                    <div className="flex gap-4 items-start relative">
                      {/* Vertical connector line */}
                      <div className="w-0.5 h-10 bg-neutral-900 absolute left-2 top-5"></div>
                      <div className="w-4 h-4 rounded-full bg-neutral-950 flex items-center justify-center text-[8px] text-white font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div className="text-xs">
                        <h5 className="font-bold text-gray-900">Order Received & Approved</h5>
                        <p className="text-gray-400 font-light">Your order details were validated and approved at the head office dashboard.</p>
                      </div>
                    </div>

                    {/* Status 2: Dispatched from KTM */}
                    <div className="flex gap-4 items-start relative">
                      <div className={`w-0.5 h-10 absolute left-2 top-5 ${
                        trackedOrder.status !== 'Processing' ? 'bg-neutral-900' : 'bg-gray-200'
                      }`}></div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 ${
                        trackedOrder.status !== 'Processing' ? 'bg-neutral-950 text-white' : 'bg-gray-100 border border-gray-300 text-gray-400'
                      }`}>
                        {trackedOrder.status !== 'Processing' ? '✓' : '2'}
                      </div>
                      <div className="text-xs">
                        <h5 className={`font-bold ${trackedOrder.status !== 'Processing' ? 'text-gray-900' : 'text-gray-400'}`}>
                          Aero Express Dispatch
                        </h5>
                        <p className="text-gray-400 font-light">Dispatched from Kathmandu Sorting Warehouse via express air cargo shipment path.</p>
                      </div>
                    </div>

                    {/* Status 3: Arrived in Butwal Milan Chowk Hub */}
                    <div className="flex gap-4 items-start relative">
                      <div className={`w-0.5 h-10 absolute left-2 top-5 ${
                        ['Arrived at Butwal Hub', 'Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? 'bg-neutral-900' : 'bg-gray-200'
                      }`}></div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 ${
                        ['Arrived at Butwal Hub', 'Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? 'bg-neutral-950 text-white' : 'bg-gray-100 border border-gray-300 text-gray-400'
                      }`}>
                        {['Arrived at Butwal Hub', 'Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? '✓' : '3'}
                      </div>
                      <div className="text-xs">
                        <h5 className={`font-bold ${['Arrived at Butwal Hub', 'Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? 'text-gray-900' : 'text-gray-400'}`}>
                          Arrived at Butwal Store Hub
                        </h5>
                        <p className="text-gray-400 font-light">Received and fully quality-checked at Butwal Milan Chowk central warehouse inventory.</p>
                      </div>
                    </div>

                    {/* Status 4: Out for delivery */}
                    <div className="flex gap-4 items-start relative">
                      <div className={`w-0.5 h-10 absolute left-2 top-5 ${
                        ['Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? 'bg-neutral-900' : 'bg-gray-200'
                      }`}></div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 ${
                        ['Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? 'bg-neutral-950 text-white' : 'bg-gray-100 border border-gray-300 text-gray-400'
                      }`}>
                        {['Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? '✓' : '4'}
                      </div>
                      <div className="text-xs">
                        <h5 className={`font-bold ${['Out for Delivery', 'Delivered'].includes(trackedOrder.status) ? 'text-gray-900' : 'text-gray-400'}`}>
                          Handed to Delivery Rider
                        </h5>
                        <p className="text-gray-400 font-light">Rider Raju (Mobile +977-9841112222) is carrying your dispatch towards <strong className="text-gray-700">{trackedOrder.address}</strong>.</p>
                      </div>
                    </div>

                    {/* Status 5: Delivered */}
                    <div className="flex gap-4 items-start">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 ${
                        trackedOrder.status === 'Delivered' ? 'bg-emerald-600 text-white' : 'bg-gray-100 border border-gray-300 text-gray-400'
                      }`}>
                        {trackedOrder.status === 'Delivered' ? '✓' : '5'}
                      </div>
                      <div className="text-xs">
                        <h5 className={`font-bold ${trackedOrder.status === 'Delivered' ? 'text-emerald-700' : 'text-gray-400'}`}>
                          Delivered & Signed
                        </h5>
                        <p className="text-gray-400 font-light">Order package received with signature. Enjoy your high-end boutique clothing!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* B. WISHLIST MANAGEMENT GRID */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">Your Saved Wishlist</h3>
              
              {wishlist.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs. text-gray-900">Your wishlist is empty</h4>
                    <p className="text-xs text-gray-400 font-light">Browse catalogs, discover designs, and click the heart icons to save your size.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-100 rounded-xl p-3.5 flex gap-3 h-28 relative group hover:shadow-xs hover:border-gray-200 transition-all align-middle"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-full rounded-lg overflow-hidden shrink-0 bg-neutral-50 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Info & action triggers */}
                      <div className="grow flex flex-col justify-between py-0.5 select-none text-left">
                        <div>
                          <h4 className="font-serif font-semibold text-xs text-gray-900 leading-snug line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wide block">
                            {item.gender}'s {item.category}
                          </span>
                          <span className="text-xs font-bold text-gray-900 font-mono mt-1 block">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => onInstantAdd(item, e)}
                            className="bg-neutral-900 hover:bg-neutral-800 text-white text-[9px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-md transition-colors cursor-pointer"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={(e) => onRemoveFromWishlist(item.id, e)}
                            className="text-gray-400 hover:text-red-500 text-[9px] font-bold uppercase tracking-wider py-1.5 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
