import React, { createContext, useState, useEffect } from 'react';
import { products as staticProducts, categories as staticCategories } from '../data/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for the Quick View modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // State for recently viewed items
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Simulate fetching data on initial load
  useEffect(() => {
    // In a real application, you would fetch data from an API here.
    // e.g., fetch('https://api.luxe.com/products').then(...)
    setTimeout(() => {
      setProducts(staticProducts);
      setCategories(staticCategories);
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, []);

  // Functions to control the Quick View modal
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Function to add a product to the recently viewed list
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prevItems) => {
      // Remove the product if it already exists to move it to the front
      const filtered = prevItems.filter(p => p.id !== product.id);
      // Add the new product to the beginning and limit the list to 4 items
      const newItems = [product, ...filtered];
      return newItems.slice(0, 4);
    });
  };

  const value = {
    products,
    categories,
    isLoading,
    quickViewProduct,
    openQuickView,
    closeQuickView,
    recentlyViewed,
    addToRecentlyViewed,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};