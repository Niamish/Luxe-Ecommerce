import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { ProductContext } from '../../context/ProductContext';
import { useCart } from '../../hooks/useCart';
// import { useWishlist } from '../../hooks/useWishlist';

import NeuCard from '../ui/NeuCard';
import NeuButton from '../ui/NeuButton';
import RatingStars from '../ui/RatingStars';

import { ShoppingCart, Heart, Eye } from 'lucide-react';

/**
 * Displays a single product in a card format.
 * @param {object} props - Component props.
 * @param {object} props.product - The product object to display.
 */
const ProductCard = ({ product }) => {
  const { t } = useTheme();
  const { openQuickView } = useContext(ProductContext);
  const { addToCart } = useCart();
  
  // These would be replaced with your actual hooks
  const { isInWishlist, toggleWishlist } = { isInWishlist: (id) => id % 2 === 0, toggleWishlist: (p) => console.log('Toggled wishlist for:', p.name) }; // from useWishlist()

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent link navigation
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
  };

  const handleOpenQuickView = (e) => {
    e.stopPropagation();
    e.preventDefault();
    openQuickView(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <NeuCard className="overflow-hidden h-full group flex flex-col hover-lift animate-fade-in-up hover-3d transform-3d shadow-premium" t={t}>
        <div
          className="relative aspect-[4/3] p-6 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${t.bg}, ${t.surface})` }}
        >
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-full z-10"
            style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}
            aria-label="Toggle Wishlist"
          >
            <Heart
              className="w-4 h-4"
              fill={isInWishlist(product.id) ? t.danger : 'none'}
              style={{ color: isInWishlist(product.id) ? t.danger : t.text }}
            />
          </button>

          <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300 animate-float-up-down">
            {product.image}
          </span>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 glass-premium opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
            <NeuButton size="sm" onClick={handleOpenQuickView} aria-label="Quick View" t={t}>
              <Eye className="w-4 h-4" />
            </NeuButton>
            <NeuButton size="sm" variant="primary" onClick={handleAddToCart} aria-label="Add to Cart" t={t}>
              <ShoppingCart className="w-4 h-4" />
            </NeuButton>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 flex-grow flex flex-col">
          <h3 className="font-semibold mb-2 text-base sm:text-lg" style={{ color: t.text }}>
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm mb-3 line-clamp-2" style={{ color: t.textMuted }}>
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <RatingStars rating={product.rating} />
            <span className="text-xs" style={{ color: t.textMuted }}>({product.reviews})</span>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xl sm:text-2xl font-bold" style={{ color: t.accent }}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="line-through ml-2 text-sm" style={{ color: t.textMuted }}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <Link 
              to={`/product/${product.id}`} 
              onClick={(e) => e.stopPropagation()}
              className="block"
            >
              <NeuButton variant="outline" size="sm" className="w-full" t={t}>
                View Details
              </NeuButton>
            </Link>
          </div>
        </div>
      </NeuCard>
    </Link>
  );
};

export default ProductCard;