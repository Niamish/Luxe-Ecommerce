/**
 * A collection of generic helper functions.
 */

/**
 * Formats a number into a US dollar currency string.
 * e.g., formatPrice(299) => "$299.00"
 * @param {number} price - The price to format.
 * @returns {string} The formatted price string.
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};


/**
 * Calculates the discount percentage between two prices.
 * @param {number} originalPrice - The original price.
 * @param {number} salePrice - The discounted price.
 * @returns {number} The discount percentage (e.g., 25 for 25%).
 */
export const calculateDiscountPercentage = (originalPrice, salePrice) => {
  if (!originalPrice || originalPrice <= salePrice) {
    return 0;
  }
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};


/**
 * Conditionally joins CSS class names together.
 * Filters out any falsy values.
 * e.g., cn('btn', isActive && 'btn-active') => "btn btn-active" or "btn"
 * @param {...string} classes - A list of class names.
 * @returns {string} The combined class name string.
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};