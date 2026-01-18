import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products.js'; // In a real app, this would use a hook to fetch a single product
import { useTheme } from '../hooks/useTheme';
// import { useCart } from '../hooks/useCart';
// import { useWishlist } from '../hooks/useWishlist';

// UI Components
import NeuButton from '../components/ui/NeuButton';
import NeuCard from '../components/ui/NeuCard';
import RatingStars from '../components/ui/RatingStars';

// Icons
import { ChevronRight, ShoppingCart, Heart, Minus, Plus, Shield, Truck, Package, CheckCircle, ThumbsUp } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTheme();

  // Placeholder hooks
  const { addToCart } = { addToCart: (p, options) => console.log('Added to cart:', p.name, options) };
  const { isInWishlist, toggleWishlist } = { isInWishlist: (id) => id % 2 === 0, toggleWishlist: (p) => console.log('Toggled wishlist for:', p.name) };

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // Find the product from our data file based on the URL parameter
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // In a real app, you would also add this to a 'recentlyViewed' list in a context
    } else {
      // Handle product not found, e.g., navigate to a 404 page
      navigate('/404');
    }
    // Scroll to top on product change
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) {
    // You can return a full-page skeleton loader here
    return <div>Loading product...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, { quantity, size: selectedSize });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: t.textMuted }}>
        <Link to="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop" className="hover:text-accent">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="truncate" style={{ color: t.text }}>{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Product Images (Left Column) */}
        <div className="lg:col-span-7">
          <NeuCard className="p-8" t={t}>
            <div className="aspect-square flex items-center justify-center">
              <span className="text-9xl">{product.image}</span>
            </div>
          </NeuCard>
          {/* Thumbnail images would be mapped here */}
        </div>

        {/* Product Details (Right Column) */}
        <div className="lg:col-span-5">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <RatingStars rating={product.rating} size="md" />
            <span style={{ color: t.textMuted }}>({product.reviews} reviews)</span>
          </div>
          <p className="text-lg mb-6" style={{ color: t.textMuted }}>{product.description}</p>
          
          <div className="mb-6">
            <span className="text-4xl font-bold" style={{ color: t.accent }}>${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl line-through ml-3" style={{ color: t.textMuted }}>${product.originalPrice}</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center rounded-xl overflow-hidden w-fit" style={{ backgroundColor: t.surface, boxShadow: t.shadowOut }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 hover:opacity-80"><Minus className="w-4 h-4" /></button>
              <span className="px-6 py-3 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 hover:opacity-80"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <NeuButton onClick={handleAddToCart} variant="primary" size="lg" className="flex-1" t={t}>
              <ShoppingCart className="w-5 h-5 mr-2" />Add to Cart
            </NeuButton>
            <NeuButton onClick={() => toggleWishlist(product)} size="lg" className="px-6" t={t}>
              <Heart className="w-6 h-6" fill={isInWishlist(product.id) ? t.danger : 'none'} style={{ color: isInWishlist(product.id) ? t.danger : t.text }} />
            </NeuButton>
          </div>
        </div>
      </div>
      
      {/* Description/Reviews Tabs Section */}
      <div className="mt-16">
          {/* A simplified tab implementation */}
          <NeuCard className="p-8" t={t}>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <ul className="list-disc list-inside space-y-2" style={{color: t.textMuted}}>
                {product.features.map((feature, i) => <li key={i}>{feature}</li>)}
            </ul>
          </NeuCard>
      </div>
    </div>
  );
};

export default ProductPage;