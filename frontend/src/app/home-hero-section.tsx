import React from 'react';
import Image from 'next/image';

export default function HomeHeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Fruits_and_Vegetables.png"
          alt="Fresh vegetables"
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-2xl px-8 md:px-16">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
                Direct From Source
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Freshness delivered
              <br />
              <span className="text-green-500">to your doorstep.</span>
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              Join the largest marketplace for organic farmers and quality-conscious consumers. Supporting local agriculture since 2025.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Shop Now
              </button>
              <button className="bg-slate-700/80 hover:bg-slate-600/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 border border-slate-600">
                View Vendors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
