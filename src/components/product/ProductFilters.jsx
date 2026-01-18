import React, { useState } from 'react';
import NeuCard from '../ui/NeuCard';
import NeuButton from '../ui/NeuButton';
import RatingStars from '../ui/RatingStars';
import { useTheme } from '../../hooks/useTheme';
import { Search, Filter, X, ChevronDown, Star } from 'lucide-react';

/**
 * A sidebar component for filtering products.
 * All state and state-setting functions are passed in as props from the parent page.
 * @param {object} props - Component props
 */
const ProductFilters = ({
  categories,
  filters,
  setFilters
}) => {
  const { t } = useTheme();

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }));
  };
  
  const handleRatingChange = (rating) => {
    setFilters(prev => ({
        ...prev,
        ratings: prev.ratings.includes(rating)
            ? prev.ratings.filter(r => r !== rating)
            : [...prev.ratings, rating]
    }));
  };

  const clearFilters = () => {
    setFilters({
        searchQuery: '',
        category: 'all',
        priceMax: 500,
        ratings: []
    })
  }

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.priceMax < 500 ? 1 : 0) +
    filters.ratings.length;

  return (
    <NeuCard className="p-6 sticky top-24 animate-fade-in-up" t={t}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: t.text }}>
          <Filter className="w-5 h-5" style={{ color: t.accent }} />
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-medium animate-scale-in" 
            style={{ backgroundColor: t.accent + '20', color: t.accent }}>
            {activeFiltersCount} Active
          </span>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4" style={{ color: t.text }}>Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className="w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between"
              style={{
                backgroundColor: filters.category === cat.id ? t.bg : 'transparent',
                boxShadow: filters.category === cat.id ? t.shadowIn : 'none',
                color: filters.category === cat.id ? t.accent : t.textMuted,
              }}
            >
              <span>{cat.name}</span>
              <span className="text-sm">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range - Enhanced */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4 flex items-center justify-between" style={{ color: t.text }}>
          Price Range
          <span className="text-sm font-normal px-3 py-1 rounded-full" 
            style={{ backgroundColor: t.surface, color: t.accent }}>
            ${filters.priceMax}
          </span>
        </h4>
        <div className="px-2">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span style={{ color: t.textMuted }}>$0</span>
            <span style={{ color: t.textMuted }}>$500+</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceMax}
              onChange={handlePriceChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ 
                background: `linear-gradient(to right, ${t.accent} 0%, ${t.accent} ${(filters.priceMax/500)*100}%, ${t.surface} ${(filters.priceMax/500)*100}%, ${t.surface} 100%)`,
              }}
            />
            <div 
              className="absolute top-8 px-2 py-1 rounded text-xs font-medium pointer-events-none transition-all"
              style={{ 
                left: `${(filters.priceMax/500)*100}%`,
                transform: 'translateX(-50%)',
                backgroundColor: t.accent,
                color: 'white'
              }}
            >
              ${filters.priceMax}
            </div>
          </div>
        </div>
      </div>

      {/* Rating - Enhanced */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4" style={{ color: t.text }}>Customer Rating</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full p-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                filters.ratings.includes(rating) ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: filters.ratings.includes(rating) ? t.surface : 'transparent',
                boxShadow: filters.ratings.includes(rating) ? t.shadowOutSmall : 'none',
                borderColor: filters.ratings.includes(rating) ? t.accent : 'transparent',
                ringColor: t.accent,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
                        style={{ color: i < rating ? '#FFA500' : t.textMuted }}
                      />
                    ))}
                  </div>
                  {rating === 5 && <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: t.accent + '20', color: t.accent }}>Top Rated</span>}
                </div>
                <span className="text-sm" style={{ color: t.textMuted }}>
                  {rating === 5 ? 'Only' : '& up'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <NeuButton className="w-full mt-6" onClick={clearFilters} t={t}>
        Clear Filters
      </NeuButton>
    </NeuCard>
  );
};

export default ProductFilters;