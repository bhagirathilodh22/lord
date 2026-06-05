import React, { useState } from 'react';
import { Truck, ShieldCheck, RefreshCw, FileText } from 'lucide-react';

export default function PoliciesSection() {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>('shipping');

  return (
    <div id="policies-panel" className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Column */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-[#9A3412] tracking-widest uppercase block mb-1">CUSTOMER TRUST</span>
          <h3 className="font-serif font-bold text-xl text-gray-900 mb-4">Our Store Policies</h3>
          
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab('shipping')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'shipping'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-gray-700'
              }`}
            >
              <Truck className="w-4 h-4 shrink-0" />
              Shipping & Delivery
            </button>

            <button
              onClick={() => setActiveTab('returns')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'returns'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-gray-700'
              }`}
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              Returns & Exchanges
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-gray-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Privacy Policy
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'terms'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              Terms & Conditions
            </button>
          </div>
        </div>

        {/* Contents Column */}
        <div className="lg:col-span-8 bg-neutral-50/55 rounded-2xl border border-gray-150 p-5 sm:p-6 text-sm text-gray-600 leading-relaxed font-light space-y-4">
          
          {activeTab === 'shipping' && (
            <div className="space-y-4 animate-scaleUp">
              <h4 className="font-serif font-bold text-gray-900 text-base">Nepal Shipping Information</h4>
              <p>
                We strive to fulfill and dispatch wardrobes to customer doorsteps in pristine condition across Nepal. We work with leading dispatch express agencies to ensure safety.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-500">
                <li>
                  <strong className="text-gray-700">Delivery in Butwal City:</strong> Inside Butwal (Devinagar, Kalikanagar, Traffic Chowk, Milan Chowk, Golpark, Devinagar etc.), we deliver within 1 - 2 business days. Delivery is free on all orders!
                </li>
                <li>
                  <strong className="text-gray-700">Outer Cities (Kathmandu, Pokhara, Bhairahawa, Biratnagar, etc.):</strong> Dispatched within 24 hours. Usually arrives at major city hubs in 3 - 5 days.
                </li>
                <li>
                  <strong className="text-gray-700">Free Shipping:</strong> Automatically triggered for aggregate purchases exceeding <strong className="text-gray-800">Rs. 3,000</strong>. Below this, a standard Rs. 150 shipping fee is applied at checkout.
                </li>
                <li>
                  <strong className="text-gray-700">Cash on Delivery (COD):</strong> Fully supported in over 50 cities across Nepal.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4 animate-scaleUp">
              <h4 className="font-serif font-bold text-gray-900 text-base">7-Day Easy Exchanges Policy</h4>
              <p>
                Your satisfaction is absolute. If a piece does not fit your body perfectly, we of course offer hassle-free size exchanges.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-500">
                <li>
                  <strong className="text-gray-700">7-Day Window:</strong> File exchange requests on our hotline or visit our Milan Chowk store physical location within 7 days of package delivery.
                </li>
                <li>
                  <strong className="text-gray-700">Original Condition:</strong> Apparel must be unused, unwashed, with all original tags intact.
                </li>
                <li>
                  <strong className="text-gray-700">Store Credit:</strong> If alternative sizes are out of inventory state, we issue equivalent boutique credit valid for 1 year.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-scaleUp">
              <h4 className="font-serif font-bold text-gray-900 text-base">Data Privacy & Security Directive</h4>
              <p>
                We highly respect you. We only collect the minimal contact points necessary to carry out successful processing and localized Nepal delivery routing.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-500">
                <li>
                  <strong className="text-gray-700">Collected Fields:</strong> We request full name, active cell number, and physical physical address markers at checkout.
                </li>
                <li>
                  <strong className="text-gray-700">No Selling:</strong> Your details are never compiled, leased, or sold to third-party advertising companies.
                </li>
                <li>
                  <strong className="text-gray-700">Zero Payment Cache:</strong> We do not record or request any private credit cards or PIN numbers. Our Fonepay QR relies entirely on your secure mobile bank application environment.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 animate-scaleUp">
              <h4 className="font-serif font-bold text-gray-900 text-base">Boutique Terms of Use</h4>
              <p>
                By interacting with Butwal Fashion Boutique's physical store or online SPA applet, you agree to these fair terms.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-gray-500">
                <li>
                  <strong className="text-gray-700">Product Authenticity:</strong> All pieces of high-end clothing are verified and quality checked. Minor fabric shade differences may happen depending on photoshoot screen lighting displays.
                </li>
                <li>
                  <strong className="text-gray-700">Pricing:</strong> Catalog price points are listed transparently in Nepalese Rupees (Rs.). Items reflect current production and tailoring costs.
                </li>
                <li>
                  <strong className="text-gray-700">Order Cancellation:</strong> We maintain the right to cancel orders if item stock runs out before our manual dispatch register settles.
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
