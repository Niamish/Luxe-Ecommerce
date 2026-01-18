import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// import { useCart } from '../../hooks/useCart';
import NeuButton from '../ui/NeuButton';
import { Lock, CreditCard } from 'lucide-react';

/**
 * Displays the summary of the cart total and the checkout button.
 */
const CartSummary = () => {
  const { t } = useTheme();
  const navigate = useNavigate();

  // This data would come from your actual useCart hook
  const { cart, cartTotal, closeCart } = {
    cart: [{ price: 299, originalPrice: 399, quantity: 1 }],
    cartTotal: 299,
    closeCart: () => console.log('Closing cart')
  };
  
  const savings = cart.reduce((sum, item) =>
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="p-4 sm:p-6 border-t" style={{ borderColor: `${t.textMuted}20` }}>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-lg" style={{ color: t.textMuted }}>
          <span>Subtotal</span>
          <span>${(cartTotal + savings).toFixed(2)}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-lg" style={{ color: t.success }}>
            <span>Savings</span>
            <span>-${savings.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold pt-3 border-t" style={{ color: t.text, borderColor: `${t.textMuted}20` }}>
          <span>Total</span>
          <span style={{ color: t.accent }}>${cartTotal.toFixed(2)}</span>
        </div>
      </div>
      <NeuButton
        onClick={handleCheckout}
        variant="primary"
        size="lg"
        className="w-full flex items-center justify-center gap-2"
        t={t}
      >
        <Lock className="w-5 h-5" />
        Secure Checkout
      </NeuButton>
      <p className="text-center text-xs mt-4" style={{ color: t.textMuted }}>
        <CreditCard className="w-4 h-4 inline mr-1" />
        Secure payment powered by Stripe
      </p>
    </div>
  );
};

export default CartSummary;