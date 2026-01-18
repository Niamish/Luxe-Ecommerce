import React from 'react';
import { useTheme } from '../../hooks/useTheme';
// import { useCart } from '../../hooks/useCart';
import NeuCard from '../ui/NeuCard';
import { Plus, Minus, Trash2 } from 'lucide-react';

/**
 * Renders a single item in the shopping cart sidebar.
 * @param {object} props - Component props.
 * @param {object} props.item - The cart item object (product data + quantity).
 */
const CartItem = ({ item }) => {
  const { t } = useTheme();
  
  // This would come from your actual useCart hook
  const { updateCart } = {
    updateCart: (id, qty) => console.log(`Updating ${id} to quantity ${qty}`)
  };

  const handleQuantityChange = (newQuantity) => {
    // Prevent quantity from going below 0
    // The parent function should handle removal if quantity is 0
    updateCart(item.id, Math.max(0, newQuantity));
  };

  return (
    <NeuCard className="p-3 sm:p-4 animate-fade-in" t={t}>
      <div className="flex gap-4">
        {/* Image */}
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: t.bg, boxShadow: t.shadowIn }}
        >
          <span className="text-3xl sm:text-4xl">{item.image}</span>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-base" style={{ color: t.text }}>
              {item.name}
            </h4>
            <p className="text-sm font-bold" style={{ color: t.accent }}>
              ${item.price.toFixed(2)}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
             {/* Quantity Controls */}
            <div className="flex items-center rounded-lg overflow-hidden" style={{ backgroundColor: t.bg, boxShadow: t.shadowIn }}>
              <button onClick={() => handleQuantityChange(item.quantity - 1)} className="px-3 py-1 hover:opacity-80" aria-label="Decrease quantity">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-1 font-semibold text-sm">{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.quantity + 1)} className="px-3 py-1 hover:opacity-80" aria-label="Increase quantity">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
             {/* Remove Button */}
            <button onClick={() => handleQuantityChange(0)} className="p-2 text-red-500 hover:text-red-400" aria-label="Remove item">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </NeuCard>
  );
};

export default CartItem;