import React, { createContext, useState } from 'react';
// import { useNotifications } from '../hooks/useNotifications';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  // const { addNotification } = useNotifications();

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);

      if (isInWishlist) {
        // addNotification(`${product.name} removed from wishlist.`, 'info');
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        // addNotification(`${product.name} added to wishlist!`, 'success');
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const value = {
    wishlist,
    toggleWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};