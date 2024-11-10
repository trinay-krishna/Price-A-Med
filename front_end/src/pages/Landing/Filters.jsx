import React from 'react';
import { Sliders, Star, Clock, Truck } from 'lucide-react';

export default function Filters({ onFilterChange, activeFilter }) {
  const filters = [
    { id: 'all', label: 'All Medicines', icon: Sliders },
    { id: 'popular', label: 'Most Popular', icon: Star },
    { id: 'recent', label: 'Recently Viewed', icon: Clock },
    { id: 'delivery', label: 'Fast Delivery', icon: Truck },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      <div className="space-y-4">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#E8F5E9] text-[#34A853]'
                : 'hover:bg-gray-50'
            }`}
          >
            <filter.icon className="w-5 h-5" />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#34A853]"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹0</span>
          <span>₹1000</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {['Pain Relief', 'Antibiotics', 'Vitamins', 'First Aid'].map(category => (
            <label key={category} className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#34A853]" />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
