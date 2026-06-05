import { MapPin, Phone, MessageSquare, Clock, Navigation } from 'lucide-react';

export default function MapMockup() {
  const handleDirections = () => {
    // Open real Google Maps pointing to Milan Chowk, Butwal, Nepal
    window.open('https://maps.google.com/?q=Milan+Chowk,+Butwal,+Nepal', '_blank');
  };

  const handleWhatsApp = () => {
    // Open real WhatsApp conversation thread
    window.open('https://wa.me/9779800000000?text=Hi%20Butwal%20Fashion%20Boutique,%20I%20would%20like%20to%20inquire%20about%20your%20latest%20collection.', '_blank');
  };

  return (
    <div id="map-mockup-section" className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Map Visual */}
        <div className="lg:col-span-7 h-80 lg:h-auto min-h-[320px] bg-sky-50 relative overflow-hidden flex flex-col justify-between p-6">
          {/* Decorative Map Pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Simulated Streets for Aesthetic Maps Styling */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute top-1/3 left-0 w-full h-8 bg-gray-400 rotate-12"></div>
            <div className="absolute top-0 left-1/2 w-8 h-full bg-gray-400 -rotate-12"></div>
            <div className="absolute bottom-1/4 left-0 w-full h-12 bg-gray-400 -rotate-6"></div>
            <div className="absolute top-1/4 left-1/4 w-full h-4 bg-gray-450 rotate-45"></div>
          </div>
          
          {/* Landmark Overlays */}
          <div className="absolute top-4 left-6 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono text-gray-500 shadow-xs border border-gray-200">
            Siddhartha Highway
          </div>
          <div className="absolute bottom-6 left-12 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono text-gray-500 shadow-xs border border-gray-200">
            Milan Chowk Intersection
          </div>
          <div className="absolute top-1/2 right-12 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono text-gray-500 shadow-xs border border-gray-200">
            Tinau River Road
          </div>

          <div className="z-10 bg-white/90 backdrop-blur-md self-start border border-sky-100 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2 max-w-sm">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-ping"></div>
            <span className="text-xs font-semibold text-gray-800">Physical Store in Butwal City</span>
          </div>

          {/* Map Pin Locator Spark */}
          <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-8 w-8 bg-red-600 border-2 border-white shadow-md flex items-center justify-center">
                <MapPin className="text-white w-4.5 h-4.5" />
              </span>
            </span>
            <div className="mt-1.5 bg-neutral-900 text-white rounded-lg px-2.5 py-1 text-[11px] font-medium shadow-lg whitespace-nowrap">
              Butwal Fashion Boutique
            </div>
          </div>

          <div className="z-10 self-end w-full">
            <button
              onClick={handleDirections}
              id="directions-btn"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium px-4 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 duration-250 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              Get Directions on Google Maps
            </button>
          </div>
        </div>

        {/* Info detail Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-50/50">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">
              PHYSICAL STORE
            </span>
            <h3 id="store-title" className="text-xl sm:text-2xl font-serif text-gray-900 font-bold mb-4">
              Visit Us in Butwal
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Come try on collections, examine luxurious fabrics, and get tailored adjustments. Our welcoming boutique is situated right at the prime commercial center of Butwal.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">ADDRESS</h4>
                  <p className="text-sm text-gray-600">
                    Milan Chowk (Opposite Everest Bank),<br />
                    Butwal-09, Rupandehi, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">STORE HOURS</h4>
                  <p className="text-sm text-gray-600">
                    Sunday - Friday: 10:00 AM - 8:00 PM<br />
                    Saturday: 11:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">PHONE & RESERVATIONS</h4>
                  <p className="text-sm text-gray-600">
                    +977-71-550123, +977-9801234567
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              id="whatsapp-btn"
              className="flex items-center justify-center gap-2 border border-emerald-200 hover:border-emerald-300 bg-emerald-50 hover:bg-emerald-100/50 text-emerald-800 text-xs font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Chat on WhatsApp
            </button>
            <a
              href="tel:+9779801234567"
              id="call-now-btn"
              className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium py-2.5 px-4 rounded-lg transition-colors text-center"
            >
              <Phone className="w-4 h-4 text-neutral-500" />
              Call Boutique
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
