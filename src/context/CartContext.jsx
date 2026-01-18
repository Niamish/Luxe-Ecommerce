import React, { createContext, useState, useMemo } from 'react';
// import { useNotifications } from '../hooks/useNotifications'; // For showing notifications

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const { addNotification } = useNotifications();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, options = { quantity: 1 }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // If item exists, update its quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + options.quantity }
            : item
        );
      } else {
        // If item is new, add it to the cart
        return [...prevCart, { ...product, quantity: options.quantity }];
      }
    });
    // addNotification(`${product.name} added to cart!`, 'success');
    openCart();
  };

  const updateCart = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCart([]);
  }

  // useMemo ensures these values are only recalculated when the cart changes
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const value = {
    cart,
    isCartOpen,
    cartCount,
    cartTotal,
    addToCart,
    updateCart,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};