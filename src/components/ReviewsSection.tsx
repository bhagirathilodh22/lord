import React, { useState } from 'react';
import { Star, User, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { Review } from '../types';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    name: 'Sadhana Bhandari',
    rating: 5,
    comment: 'Absolutely love the Luxury Velvet Kurti Set! The embroidery work is stunningly detailed, exactly like what you see in the premium designer stores of Kathmandu, but priced so reasonably. Fast shipping to my home in Devinagar, Butwal.',
    date: 'May 28, 2026',
    location: 'Devinagar, Butwal',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    name: 'Anish Shrestha',
    rating: 5,
    comment: 'The tweed trench coat is phenomenal. Highly fitted, keeps me completely warm when riding my motorcycle during the chilly morning winds of Butwal. Excellent customer service at the Milan Chowk store.',
    date: 'May 15, 2026',
    location: 'Kalikanagar, Butwal',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    name: 'Riya Sen',
    rating: 4,
    comment: 'Got the linen summer dress and they altered the size for me perfectly in the boutique. The fabric is extremely comfortable and light, very breathable for hot summer days here. Highly recommend checking them out!',
    date: 'April 30, 2026',
    location: 'Golpark, Butwal',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    name: 'Binay Lodh',
    rating: 5,
    comment: 'Very polite and helpful staff. Highly trusted fashion hub in Rupandehi. Got the Premium Silk Sherwani for Tihar and received countless compliments from my relatives. Solid five stars!',
    date: 'March 12, 2026',
    location: 'Bhairahawa, Nepal',
    verifiedPurchase: true
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      location: location || 'Butwal, Nepal',
      verifiedPurchase: false
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setComment('');
    setLocation('');
    setRating(5);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div id="reviews-section" className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">
            TESTIMONIALS
          </span>
          <h3 id="reviews-heading" className="text-2xl sm:text-3xl font-serif text-gray-900 font-bold">
            What Our Customers Say
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Read real feedback from our physical boutique visitors and online shoppers in Nepal.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          id="write-review-toggle"
          className="self-start md:self-auto border border-neutral-900 hover:bg-neutral-900 text-neutral-900 hover:text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all cursor-pointer"
        >
          {showForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {/* Review submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-50 border border-gray-200 rounded-2xl p-6 max-w-2xl animate-fadeIn space-y-4"
        >
          <h4 className="text-sm font-bold text-gray-900">Share your shopping experience</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g. Priyanka Karki"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Location / City</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="E.g. Milan Chowk, Butwal"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Rating</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-hidden cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 uppercase mb-1">Your Review *</label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the fabric quality, fitting, delivery, or staff comfort..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-neutral-900 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            id="submit-review-btn"
            className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Submit Review
          </button>

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-lg border border-emerald-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Thank you! Your feedback has been published below successfully.
            </div>
          )}
        </form>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            id={`review-card-${rev.id}`}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-gray-200 transition-colors"
          >
            <div>
              {/* Stars & Verification */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50">
                    <CheckCircle className="w-3 h-3" />
                    Verified Buyer
                  </span>
                )}
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Customer Stamp info */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-gray-600 font-semibold uppercase text-[10px]">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{rev.name}</h4>
                  <p className="text-[10px] text-gray-400">{rev.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Calendar className="w-3 h-3" />
                {rev.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
