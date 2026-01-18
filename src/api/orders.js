/**
 * A collection of functions for making API calls related to orders.
 */

const _apiCall = (data, delay = 1500) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

/**
 * Simulates submitting a new order to the backend.
 * @param {object} orderData - The complete order details (cart, shipping, etc.).
 * @param {string} authToken - The user's authentication token.
 * @returns {Promise<object>} A promise resolving to the order confirmation.
 */
export const apiSubmitOrder = async (orderData, authToken) => {
  console.log('[API] Submitting new order.');
  if (!authToken) {
    throw new Error('Authentication token is required to submit an order.');
  }
  // This would be a POST request to a protected '/orders' endpoint.
  // The authToken would be sent in the 'Authorization' header.
  const mockConfirmation = {
    success: true,
    orderId: `LUXE-${Date.now()}`,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    ...orderData,
  };
  return _apiCall(mockConfirmation);
};

/**
 * Simulates fetching a user's past orders.
 * @param {string} authToken - The user's authentication token.
 * @returns {Promise<Array<object>>} A promise resolving to an array of past orders.
 */
export const apiFetchUserOrders = async (authToken) => {
    console.log('[API] Fetching user order history.');
    if (!authToken) {
        throw new Error('Authentication token is required to fetch orders.');
    }
    // This would be a GET request to a protected '/orders/me' endpoint.
    const mockOrders = [
        { orderId: 'LUXE-12345', date: '2025-06-15', total: 299.00, items: 1 },
        { orderId: 'LUXE-67890', date: '2025-05-20', total: 89.00, items: 1 },
    ];
    return _apiCall(mockOrders);
}