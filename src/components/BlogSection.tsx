import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, ChevronRight } from 'lucide-react';
import { blogs } from '../data/blogs';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <div id="blog-section-container" className="space-y-8">
      {/* Blog titles */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-[#9A3412] uppercase block mb-1">
          FASHION TIPS & INSIGHTS
        </span>
        <h3 id="blog-heading" className="text-2xl sm:text-3xl font-serif text-gray-900 font-bold mb-3">
          Butwal Style Journal
        </h3>
        <p className="text-gray-500 text-sm">
          Get the latest fashion cues, seasonal trends, and fusion styling inspirations customized for your lifestyle in Nepal.
        </p>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <article
            key={post.id}
            id={`blog-card-${post.id}`}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image with Zoom */}
              <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-[#9A3412] tracking-wider uppercase">
                  {post.category}
                </div>
              </div>

              {/* Contents briefing */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-gray-900 text-base leading-snug group-hover:text-[#9A3412] transition-colors line-clamp-2">
                  {post.title}
                </h4>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedBlog(post)}
                id={`read-blog-${post.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 group-hover:text-[#9A3412] transition-colors cursor-pointer"
              >
                Read Article
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-scaleUp">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-neutral-50 shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                <span>The Journal</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-900 font-semibold">{selectedBlog.category}</span>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                id="close-blog-modal"
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <span className="inline-block bg-[#9A3412]/10 text-[#9A3412] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedBlog.category}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 leading-tight">
                  {selectedBlog.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-b border-gray-100 pb-4">
                  <span className="font-semibold text-gray-800">{selectedBlog.author}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedBlog.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedBlog.readTime}
                  </span>
                </div>
              </div>

              {/* Banner Image */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog body markdown-like rendering */}
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4 whitespace-pre-line font-light">
                {selectedBlog.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4.5 border-t border-gray-100 bg-neutral-50 shrink-0 text-center">
              <button
                onClick={() => setSelectedBlog(null)}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Close Journal Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
