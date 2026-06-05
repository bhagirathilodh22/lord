import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ArrowLeft, Truck, CheckCircle2, QrCode } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNewOrder: (order: any) => void;
  onSetActiveTab: (tab: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNewOrder,
  onSetActiveTab
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Fonepay'>('COD');
  const [createdOrderId, setCreatedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 3000 ? 0 : 150; // free delivery above Rs 3,000 across Nepal!
  const total = subtotal + deliveryFee;

  const handleNextStep = () => {
    if (checkoutStep === 1 && cartItems.length > 0) {
      setCheckoutStep(2);
    } else if (checkoutStep === 2) {
      if (!fullName.trim() || !phone.trim() || !address.trim()) {
        alert('Please fill out all delivery and contact fields.');
        return;
      }
      // Basic check for Nepal phone length
      if (phone.replace(/[\s-]/g, '').length < 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
      setCheckoutStep(3);
    }
  };

  const handlePrevStep = () => {
    if (checkoutStep === 2) setCheckoutStep(1);
    if (checkoutStep === 3) setCheckoutStep(2);
  };

  const handlePlaceOrder = () => {
    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedOrderId(orderId);

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: 'Processing' as const,
      items: cartItems.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        size: item.selectedSize,
        color: item.selectedColor.name
      })),
      total,
      customerName: fullName,
      phone,
      address,
      paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Fonepay QR Scan'
    };

    onNewOrder(newOrder); // Register in global state
    setCheckoutStep(4);
    onClearCart(); // Reset cart state
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Background shadow overlay */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Drawer Stage */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideLeft">
        
        {/* Draw Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h3 id="checkout-drawer-title" className="font-serif font-bold text-gray-950 text-base">
              {checkoutStep === 1 && `Your Bag (${cartItems.length})`}
              {checkoutStep === 2 && 'Shipping & Details'}
              {checkoutStep === 3 && 'Payment Method'}
              {checkoutStep === 4 && 'Order Completed!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-5 py-4 overflow-y-auto grow space-y-4">
          
          {/* STEP 1: CART LIST VIEW */}
          {checkoutStep === 1 && (
            <>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-900">Your bag is empty</h4>
                    <p className="text-xs text-gray-400 max-w-[200px]">
                      Discover items we selected for your wardrobe.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onSetActiveTab('Shop');
                      onClose();
                    }}
                    className="bg-neutral-950 text-white font-bold text-[11px] uppercase tracking-wider py-2.5 px-6 rounded-lg hover:bg-neutral-850 cursor-pointer"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-4.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gray-100 pb-4.5 group"
                    >
                      {/* Image thumbnail */}
                      <div className="w-16 h-20 rounded-lg overflow-hidden border border-gray-100 bg-neutral-50 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content details description */}
                      <div className="grow space-y-1.5 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-semibold text-xs text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-0.5 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Options badge row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-500 bg-neutral-100 px-2 py-0.5 rounded-sm">
                            {item.selectedSize}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-neutral-100 px-2 py-0.5 rounded-sm">
                            <span className={`w-2 h-2 rounded-full inline-block border border-black/10 ${item.selectedColor.class}`}></span>
                            {item.selectedColor.name}
                          </span>
                        </div>

                        {/* Counters line */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center border border-gray-200 rounded-md bg-neutral-50 h-7.5">
                            <button
                              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                              className="w-6.5 h-full flex items-center justify-center text-gray-500 hover:text-neutral-900 font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                if (item.quantity < item.product.countInStock) {
                                  onUpdateQty(item.id, item.quantity + 1);
                                }
                              }}
                              className="w-6.5 h-full flex items-center justify-center text-gray-500 hover:text-neutral-900 font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          
                          <span className="text-xs font-bold text-gray-950 font-mono">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING DETAILS */}
          {checkoutStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1 bg-neutral-50 p-3 rounded-xl border border-gray-150">
                <h4 className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  Free Delivery Eligibility
                </h4>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Enjoy free delivery to Devinagar, Kalikanagar, Milan Chowk, & all regions across Nepal on orders above Rs. 3,000!
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Bhagirathi Lodh"
                    className="w-full bg-neutral-50 border border-gray-200 focus:bg-white focus:border-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Nepali Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="E.g. 9801234567"
                    className="w-full bg-neutral-50 border border-gray-200 focus:bg-white focus:border-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-hidden"
                  />
                  <span className="text-[9px] text-gray-400 italic">Expected to start with 98 or 97. Used for delivery sync.</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                    Full Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="E.g. Milan Chowk, Opposite Everest Bank, house no. 14, Butwal-09"
                    className="w-full bg-neutral-50 border border-gray-200 focus:bg-white focus:border-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-hidden resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {checkoutStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <span className="text-xs text-gray-400 block">Please select your preferred payment mode below.</span>

              <div className="grid grid-cols-2 gap-3 pb-3">
                {/* Cash on Delivery Selection */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`border rounded-xl p-4.5 text-center flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-neutral-950 bg-neutral-950/5 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Truck className={`w-6 h-6 ${paymentMethod === 'COD' ? 'text-neutral-900' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-800">Cash on Delivery</span>
                  <span className="text-[9px] text-[#9A3412] font-semibold uppercase">Pay at your Door</span>
                </button>

                {/* Fonepay QR Code Selection */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Fonepay')}
                  className={`border rounded-xl p-4.5 text-center flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'Fonepay'
                      ? 'border-neutral-950 bg-neutral-950/5 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <QrCode className={`w-6 h-6 ${paymentMethod === 'Fonepay' ? 'text-neutral-900' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-800">Fonepay / QR Pay</span>
                  <span className="text-[9px] text-[#9A3412] font-semibold uppercase">Instant Scan code</span>
                </button>
              </div>

              {/* Fonepay Dynamic Area */}
              {paymentMethod === 'Fonepay' && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 text-center space-y-4 animate-scaleUp">
                  <div className="inline-block bg-red-650 text-white rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-1">
                    fonepay business QR
                  </div>
                  
                  {/* Generated QR Graphics */}
                  <div className="mx-auto w-36 h-36 bg-white border-4 border-red-600 rounded-xl p-2.5 relative shadow-sm flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-md text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wide z-10 border border-white">
                      fonepay
                    </div>
                    {/* Simulated vector lines resembling a real QR */}
                    <div className="w-full h-full opacity-75 border-2 border-dashed border-gray-400 bg-[repeating-linear-gradient(45deg,#ccc,#ccc_10px,#fff_10px,#fff_20px)] rounded"></div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400">Merchant Account Name</p>
                    <h5 className="text-xs font-bold text-gray-900">BUTWAL FASHION BOUTIQUE</h5>
                    <p className="text-xs font-semibold text-red-600 font-mono">{formatPrice(total)}</p>
                  </div>

                  <p className="text-[9px] text-gray-500 leading-relaxed font-light">
                    Scan using your Mobile Banking App (e-Sewa, Khalti, or any Nepal bank application). Once successfully scanned, you can complete and confirm your payment delivery.
                  </p>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div className="bg-neutral-50 border border-gray-200 rounded-2xl p-4.5 text-center text-xs space-y-1 text-gray-600">
                  <p className="font-semibold text-gray-900">COD Shipping Policy</p>
                  <p className="font-light text-[11px]">
                    We will give you a call at <strong className="text-gray-900">{phone}</strong> shortly before delivery to verify your availability. No prepayments are required.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS */}
          {checkoutStep === 4 && (
            <div className="text-center py-10 space-y-5 animate-scaleUp flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-black text-lg text-gray-950">Dhanyabaad! Order Placed!</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed font-light">
                  Thank you <strong className="font-semibold text-gray-800">{fullName}</strong>, your purchase has been logged successfully into our Butwal Store dispatch book.
                </p>
              </div>

              {/* tracking ID frame */}
              <div className="bg-neutral-50 rounded-2xl border border-gray-150 p-4 max-w-xs w-full text-center space-y-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">Order Tracking Identifier</span>
                <span className="text-base font-mono font-black text-[#9A3412] tracking-wider select-all">
                  {createdOrderId}
                </span>
                <span className="text-[9px] text-gray-400 block italic">Hint: Double click to copy and paste on the tracking page.</span>
              </div>

              <div className="space-y-2 max-w-xs w-full">
                <button
                  onClick={() => {
                    onSetActiveTab('Account');
                    onClose();
                  }}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Track Order
                </button>
                <button
                  onClick={() => {
                    setCheckoutStep(1);
                    onSetActiveTab('Home');
                    onClose();
                  }}
                  className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-neutral-50 text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Draw Footer summaries and navigation controls (ONLY IF NOT COMPLETED STEP 4) */}
        {checkoutStep !== 4 && (
          <div className="p-5 border-t border-gray-100 bg-neutral-50 space-y-4 shrink-0">
            {cartItems.length > 0 && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Cart Subtotal</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-light">
                  <span>Delivery Charge</span>
                  <span className="font-mono">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold border-t border-gray-200/80 pt-2 text-sm">
                  <span>Grand Total</span>
                  <span className="font-mono text-[#9A3412]">{formatPrice(total)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {checkoutStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="border border-gray-300 hover:bg-white text-gray-700 w-12 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                  title="Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              
              {cartItems.length > 0 && (
                <button
                  onClick={checkoutStep === 3 ? handlePlaceOrder : handleNextStep}
                  id="checkout-action-btn"
                  className="grow bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {checkoutStep === 1 && 'Proceed to Shipping'}
                  {checkoutStep === 2 && 'Proceed to Payment'}
                  {checkoutStep === 3 && `Confirm Purchase - ${formatPrice(total)}`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
