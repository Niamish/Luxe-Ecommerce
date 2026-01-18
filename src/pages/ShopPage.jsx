import React, { useState, useMemo, useEffect } from 'react';
import { products, categories } from '../data/products.js'; // In a real app, useProducts() hook
import { useTheme } from '../hooks/useTheme';

// Components
import ProductFilters from '../components/product/ProductFilters';
import ProductGrid from '../components/product/ProductGrid';
import { List, Grid, Filter, X, TrendingUp, Star, DollarSign } from 'lucide-react';

const ShopPage = () => {
  const { theme, t } = useTheme();
  
  // All filter state is managed here in the parent page component
  const [filters, setFilters] = useState({
    searchQuery: '', // This would be populated from URL params in a real app
    category: 'all',
    priceMax: 500,
    ratings: [],
  });

  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false); // For controlling skeleton loaders
  const [isFiltering, setIsFiltering] = useState(false);

  // Add filter animation effect
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // useMemo will re-calculate the filtered products only when the products or filters change.
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    // Price filter
    filtered = filtered.filter(p => p.price <= filters.priceMax);
    // Rating filter
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(p => filters.ratings.includes(Math.floor(p.rating)));
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered; // 'featured' or default
    }
  }, [products, filters, sortBy]);
  
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      {/* Enhanced Page Header */}
      <div className="py-8 text-center animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Collection
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: t.textMuted }}>
            Discover cutting-edge technology accessories crafted for the modern lifestyle
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full animate-fade-in-up" 
              style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall, animationDelay: '0.1s' }}>
              <TrendingUp className="w-4 h-4" style={{ color: t.accent }} />
              <span className="text-sm font-medium">{products.length} Products</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full animate-fade-in-up" 
              style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall, animationDelay: '0.2s' }}>
              <Star className="w-4 h-4" style={{ color: '#FFA500' }} />
              <span className="text-sm font-medium">4.8 Avg Rating</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full animate-fade-in-up" 
              style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall, animationDelay: '0.3s' }}>
              <DollarSign className="w-4 h-4" style={{ color: t.success }} />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
          </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3">
            {/* The filter component is "controlled" by the page's state */}
            <ProductFilters
                categories={categories}
                filters={filters}
                setFilters={setFilters}
            />
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9">
            {/* Active Filters Pills */}
            {(filters.category !== 'all' || filters.priceMax < 500 || filters.ratings.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2 animate-fade-in">
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm animate-scale-in"
                    style={{ backgroundColor: t.accent + '20', color: t.accent }}>
                    {categories.find(c => c.id === filters.category)?.name}
                    <button onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                      className="hover:scale-110 transition-transform">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.priceMax < 500 && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm animate-scale-in"
                    style={{ backgroundColor: t.accent + '20', color: t.accent }}>
                    Under ${filters.priceMax}
                    <button onClick={() => setFilters(prev => ({ ...prev, priceMax: 500 }))}
                      className="hover:scale-110 transition-transform">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.ratings.map(rating => (
                  <span key={rating} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm animate-scale-in"
                    style={{ backgroundColor: t.accent + '20', color: t.accent }}>
                    {rating}+ Stars
                    <button onClick={() => setFilters(prev => ({
                        ...prev,
                        ratings: prev.ratings.filter(r => r !== rating)
                    }))}
                      className="hover:scale-110 transition-transform">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button onClick={() => setFilters({ searchQuery: '', category: 'all', priceMax: 500, ratings: [] })}
                  className="px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all"
                  style={{ backgroundColor: t.surface, color: t.text }}>
                  Clear All
                </button>
              </div>
            )}
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <p className="font-medium" style={{ color: t.text }}>
                    <span className="animate-fade-in">{filteredAndSortedProducts.length}</span>
                    <span style={{ color: t.textMuted }}> of {products.length} products</span>
                </p>
                <div className="flex items-center gap-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-xl outline-none backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                        style={{ 
                            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : t.surface, 
                            boxShadow: t.shadowOutSmall, 
                            color: t.text,
                            border: theme === 'light' ? '1px solid rgba(255, 255, 255, 0.6)' : 'none'
                        }}
                    >
                        <option value="featured">⭐ Featured</option>
                        <option value="price-low">💰 Price: Low to High</option>
                        <option value="price-high">💎 Price: High to Low</option>
                        <option value="rating">🌟 Best Rating</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                            style={{ 
                                backgroundColor: viewMode === 'grid' ? t.accent : t.surface, 
                                color: viewMode === 'grid' ? 'white' : t.textMuted,
                                boxShadow: t.shadowOutSmall 
                            }}
                            aria-label="Grid view"
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                            style={{ 
                                backgroundColor: viewMode === 'list' ? t.accent : t.surface, 
                                color: viewMode === 'list' ? 'white' : t.textMuted,
                                boxShadow: t.shadowOutSmall 
                            }}
                            aria-label="List view"
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid with Animation */}
            <div className={`transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
              <ProductGrid 
                  products={filteredAndSortedProducts} 
                  isLoading={isLoading || isFiltering}
                  viewMode={viewMode}
              />
            </div>
            
            {/* No Results State */}
            {filteredAndSortedProducts.length === 0 && !isLoading && (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                  style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}>
                  <Filter className="w-12 h-12" style={{ color: t.textMuted }} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p style={{ color: t.textMuted }} className="mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button 
                  onClick={() => setFilters({ searchQuery: '', category: 'all', priceMax: 500, ratings: [] })}
                  className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: t.accent, color: 'white' }}>
                  Clear All Filters
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;