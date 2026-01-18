import { products, categories } from '../data/products';

/**
 * A collection of functions for making API calls related to products.
 */

const _apiCall = (data, delay = 300) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

/**
 * Simulates fetching a list of all products.
 * Can include query parameters for filtering in a real app.
 * @param {object} [filters] - Optional filters for the query.
 * @returns {Promise<Array<object>>} A promise resolving to an array of products.
 */
export const apiFetchAllProducts = async (filters = {}) => {
  console.log('[API] Fetching all products with filters:', filters);
  // In a real app, filters would be converted to URL query params.
  // e.g., /products?category=audio&maxPrice=300
  // For now, we return the full static list.
  return _apiCall(products);
};

/**
 * Simulates fetching a single product by its ID.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<object|null>} A promise resolving to the product object or null if not found.
 */
export const apiFetchProductById = async (productId) => {
  console.log(`[API] Fetching product with ID: ${productId}`);
  const product = products.find(p => p.id === parseInt(productId));
  return _apiCall(product || null);
};

/**
 * Simulates fetching the list of product categories.
 * @returns {Promise<Array<object>>} A promise resolving to an array of categories.
 */
export const apiFetchCategories = async () => {
    console.log('[API] Fetching categories.');
    return _apiCall(categories);
};