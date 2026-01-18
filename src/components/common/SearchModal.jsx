import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// import { useUI } from '../../hooks/useUI';
// import { useProducts } from '../../hooks/useProducts';
import NeuCard from '../ui/NeuCard';
import { Search, X } from 'lucide-react';
import { products } from '../../data/products'; // Using static data for now

/**
 * A full-screen modal for searching products.
 */
const SearchModal = () => {
  const { t } = useTheme();
  const navigate = useNavigate();

  // State would come from a global UI hook
  const { isSearchOpen, closeSearch } = {
      isSearchOpen: false, // For demonstration, set to true to see it
      closeSearch: () => console.log("Closing search")
  };
  // const { products } = useProducts(); // Get all products
  
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Auto-focus the input when the modal opens
  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  // Generate suggestions as the user types
  useEffect(() => {
    if (query.length > 1) {
      const filteredSuggestions = products
        .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, products]);

  const handleSuggestionClick = (product) => {
    closeSearch();
    navigate(`/product/${product.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
        closeSearch();
        navigate(`/shop?search=${query.trim()}`);
    }
  }

  if (!isSearchOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeSearch} />
      <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6" style={{ backgroundColor: `${t.bg}cc`, backdropFilter: 'blur(8px)' }}>
        <div className="max-w-2xl mx-auto">
          <NeuCard className="p-2" t={t}>
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <Search className="w-5 h-5 ml-4 flex-shrink-0" style={{ color: t.accent }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full text-lg outline-none bg-transparent py-3"
                style={{ color: t.text }}
              />
              <button type="button" onClick={closeSearch} className="p-2 mr-2 rounded-lg" style={{ color: t.textMuted }}>
                <X className="w-5 h-5" />
              </button>
            </form>
          </NeuCard>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <NeuCard className="mt-4 p-2" t={t}>
              <ul className="space-y-1">
                {suggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 rounded-xl transition-colors hover:bg-white/10"
                      style={{ color: t.text }}
                    >
                      {suggestion.name}
                    </button>
                  </li>
                ))}
              </ul>
            </NeuCard>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;