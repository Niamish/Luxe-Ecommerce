import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { ProductContext } from '../../context/ProductContext';
import { useCart } from '../../hooks/useCart';

import NeuCard from '../ui/NeuCard';
import NeuButton from '../ui/NeuButton';
import RatingStars from '../ui/RatingStars';

import { ShoppingCart, Heart, Eye } from 'lucide-react';

const ProductListItem = ({ product }) => {
  const { t } = useTheme();
  const { openQuickView } = useContext(ProductContext);
  const { addToCart } = useCart();
  
  const { isInWishlist, toggleWishlist } = { isInWishlist: (id) => id % 2 === 0, toggleWishlist: (p) => console.log('Toggled wishlist for:', p.name) };

  const handleAddToCart = (e) => {
    e.stopPropagation();
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
    <Link to={`/product/${product.id}`} className="block">
      <NeuCard className="overflow-hidden hover:scale-[1.01] transition-transform" t={t}>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Product Image */}
          <div
            className="relative w-full sm:w-32 h-32 flex items-center justify-center rounded-xl"
            style={{ background: `linear-gradient(135deg, ${t.bg}, ${t.surface})` }}
          >
            <span className="text-5xl sm:text-6xl">{product.image}</span>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg" style={{ color: t.text }}>
                {product.name}
              </h3>
              <button
                onClick={handleToggleWishlist}
                className="p-2 rounded-full"
                style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className="w-4 h-4"
                  fill={isInWishlist(product.id) ? t.danger : 'none'}
                  style={{ color: isInWishlist(product.id) ? t.danger : t.text }}
                />
              </button>
            </div>
            
            <p className="text-sm mb-3 line-clamp-2" style={{ color: t.textMuted }}>
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <RatingStars rating={product.rating} />
              <span className="text-xs" style={{ color: t.textMuted }}>({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold" style={{ color: t.accent }}>
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="line-through ml-2 text-sm" style={{ color: t.textMuted }}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <NeuButton size="sm" onClick={handleOpenQuickView} aria-label="Quick View" t={t}>
                  <Eye className="w-4 h-4" />
                </NeuButton>
                <NeuButton size="sm" variant="primary" onClick={handleAddToCart} aria-label="Add to Cart" t={t}>
                  <ShoppingCart className="w-4 h-4" />
                </NeuButton>
              </div>
            </div>
          </div>
        </div>
      </NeuCard>
    </Link>
  );
};

export default ProductListItem;