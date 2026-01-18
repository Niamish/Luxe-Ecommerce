import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
// import { useWishlist } from '../hooks/useWishlist';
// import { useCart } from '../hooks/useCart';

// Components
import ProductCard from '../components/product/ProductCard';
import NeuButton from '../components/ui/NeuButton';
import NeuCard from '../components/ui/NeuCard';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const { t } = useTheme();

  // Placeholder hooks - replace with your actual context hooks
  const { wishlist } = {
    wishlist: [
      // Example: wishlist contains full product objects
      // { id: 2, name: 'MX Master Keyboard', ... },
      // { id: 4, name: 'Crystal 4K Webcam', ... },
    ]
  };
  // const { addToCart } = useCart();
  
  // This is just for demonstration since the ProductCard has its own logic
  // In a real app, the card might take an `onMoveToCart` prop.
  const handleMoveToCart = (product) => {
    // toggleWishlist(product); // from useWishlist
    // addToCart(product);
    console.log(`Moved ${product.name} to cart.`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">My Wishlist</h1>
        <p className="text-lg mt-2" style={{ color: t.textMuted }}>
          Your saved items for future purchases.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <NeuCard className="inline-flex p-12 mb-6" t={t}>
            <Heart className="w-16 h-16" style={{ color: t.textMuted }} />
          </NeuCard>
          <h3 className="text-2xl font-semibold mb-2">Your wishlist is empty</h3>
          <p style={{ color: t.textMuted }} className="mb-6">
            Save your favorite items here to purchase later.
          </p>
          <Link to="/shop">
            <NeuButton variant="primary" size="lg" t={t}>
              Start Shopping
            </NeuButton>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;