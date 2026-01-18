import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NeuCard from '../ui/NeuCard';
import NeuButton from '../ui/NeuButton';
import RatingStars from '../ui/RatingStars';
import { useTheme } from '../../hooks/useTheme';
// import { useCart } from '../../hooks/useCart';
// import { useWishlist } from '../../hooks/useWishlist';
import { X, Heart, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

/**
 * A modal for a quick view of a product.
 * @param {object} props - Component props.
 * @param {object} props.product - The product to display.
 * @param {function} props.onClose - Function to close the modal.
 */
const QuickView = ({ product, onClose }) => {
  const { t } = useTheme();
  const { addToCart } = { addToCart: (p, options) => console.log('Added to cart:', p.name, options) };
  const { isInWishlist, toggleWishlist } = { isInWishlist: (id) => id % 2 === 0, toggleWishlist: (p) => console.log('Toggled wishlist for:', p.name) };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
      if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!product) return null;

  const images = product.images || [product.image];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Default', value: 'default', color: t.accent },
    { name: 'Black', value: 'black', color: '#000000' },
    { name: 'White', value: 'white', color: '#FFFFFF' },
    { name: 'Gray', value: 'gray', color: '#6B7280' }
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      addToCart(product, { quantity, size: selectedSize, color: selectedColor });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-[200] animate-fade-in"
        style={{ backgroundColor: t.overlay }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      />
      {/* Modal Content */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
        <NeuCard className="max-w-5xl w-full max-h-[95vh] overflow-y-auto relative animate-scale-in pointer-events-auto" t={t} hover={false}>
          <div className="p-4 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg"
              style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall, color: t.textMuted }}
              aria-label="Close Quick View"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div
                  className="relative aspect-square p-8 flex items-center justify-center rounded-2xl overflow-hidden group"
                  style={{ background: t.surface, boxShadow: t.shadowIn }}
                >
                  <span className="text-8xl sm:text-9xl image-transition group-hover:scale-110">
                    {images[currentImageIndex]}
                  </span>
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        style={{ backgroundColor: t.bg, boxShadow: t.shadowOutSmall, color: t.text }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        style={{ backgroundColor: t.bg, boxShadow: t.shadowOutSmall, color: t.text }}
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div 
                      className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: t.bg, boxShadow: t.shadowOutSmall, color: t.textMuted }}
                    >
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl thumbnail-hover focus-ring ${
                          index === currentImageIndex ? 'ring-2' : ''
                        }`}
                        style={{ 
                          backgroundColor: t.surface, 
                          boxShadow: index === currentImageIndex ? t.shadowIn : t.shadowOutSmall,
                          ringColor: index === currentImageIndex ? t.accent : 'transparent'
                        }}
                      >
                        {img}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="animate-slide-up">
                <h2 id="quickview-title" className="text-3xl font-bold mb-4" style={{ color: t.text }}>
                  {product.name}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <RatingStars rating={product.rating} size="md" />
                  <span style={{ color: t.textMuted }}>({product.reviews} reviews)</span>
                </div>
                <p style={{ color: t.textMuted }} className="mb-6">
                  {product.description}
                </p>
                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" style={{ color: t.text }}>Key Features</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm" style={{ color: t.textMuted }}>
                          <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: t.accent }}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-3" style={{ color: t.text }}>Size</h4>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          selectedSize === size ? 'ring-2' : ''
                        }`}
                        style={{ 
                          backgroundColor: selectedSize === size ? t.accent : t.surface,
                          color: selectedSize === size ? t.bg : t.text,
                          boxShadow: selectedSize === size ? t.shadowIn : t.shadowOutSmall,
                          ringColor: selectedSize === size ? t.accent : 'transparent'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-3" style={{ color: t.text }}>Color</h4>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                          selectedColor === color.value ? 'ring-2 ring-offset-2' : ''
                        }`}
                        style={{ 
                          backgroundColor: color.color,
                          borderColor: color.color === '#FFFFFF' ? t.textMuted : color.color,
                          ringColor: selectedColor === color.value ? t.accent : 'transparent'
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3" style={{ color: t.text }}>Quantity</h4>
                  <div className="flex items-center rounded-xl overflow-hidden w-fit" style={{ backgroundColor: t.surface, boxShadow: t.shadowOut }}>
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                      className="px-4 py-3 hover:opacity-80 transition-opacity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)} 
                      className="px-4 py-3 hover:opacity-80 transition-opacity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: t.accent }}>
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl line-through ml-3" style={{ color: t.textMuted }}>
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <div className="mt-1">
                      <span 
                        className="inline-block px-2 py-1 rounded text-sm font-medium"
                        style={{ backgroundColor: t.success + '20', color: t.success }}
                      >
                        Save ${product.originalPrice - product.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <NeuButton 
                    onClick={handleAddToCart} 
                    variant="primary" 
                    size="lg" 
                    className="flex-1 transition-smooth" 
                    disabled={isLoading}
                    t={t}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Adding...
                      </div>
                    ) : (
                      `Add ${quantity} to Cart`
                    )}
                  </NeuButton>
                  <NeuButton onClick={() => toggleWishlist(product)} size="lg" className="transition-smooth" t={t}>
                    <Heart
                      className="w-5 h-5"
                      fill={isInWishlist(product.id) ? t.danger : 'none'}
                      style={{ color: isInWishlist(product.id) ? t.danger : t.text }}
                    />
                  </NeuButton>
                </div>
                 <Link to={`/product/${product.id}`} onClick={onClose} className="block mt-4">
                    <NeuButton className="w-full" t={t}>
                        View Full Details
                    </NeuButton>
                </Link>
              </div>
            </div>
          </div>
        </NeuCard>
      </div>
    </>
  );
};

export default QuickView;