import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import NeuButton from '../ui/NeuButton';
import { X, ShoppingCart } from 'lucide-react';

/**
 * The slide-out sidebar component for the shopping cart.
 */
const CartSidebar = () => {
  const { t } = useTheme();
  const { isCartOpen, closeCart, cart, cartCount } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />
      {/* Sidebar Panel */}
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-96 max-w-full z-50 shadow-2xl animate-slide-in-right flex flex-col"
        style={{ backgroundColor: t.bg }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b flex items-center justify-between" style={{ borderColor: `${t.textMuted}20` }}>
          <h2 id="cart-heading" className="text-xl sm:text-2xl font-semibold" style={{ color: t.text }}>
            Shopping Cart ({cartCount})
          </h2>
          <button onClick={closeCart} className="p-2 rounded-lg" style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall, color: t.textMuted }} aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: t.surface, boxShadow: t.shadowOut }}>
                <ShoppingCart className="w-12 h-12" style={{ color: t.textMuted }} />
              </div>
              <p className="text-lg mb-6" style={{ color: t.textMuted }}>
                Your cart is empty
              </p>
              <Link to="/shop" onClick={closeCart}>
                <NeuButton variant="primary" t={t}>Start Shopping</NeuButton>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary */}
        {cart.length > 0 && <CartSummary />}
      </aside>
    </>
  );
};

export default CartSidebar;