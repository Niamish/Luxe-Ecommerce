/**
 * A collection of functions for making API calls related to authentication.
 * These are mock functions that simulate network requests.
 */

// Helper to simulate network delay
const _apiCall = (data, delay = 500) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

/**
 * Simulates logging in a user.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} A promise that resolves with user data and a token.
 */
export const apiLogin = async ({ email, password }) => {
  console.log(`[API] Attempting login for: ${email}`);
  // In a real app, this would be a POST request to your '/auth/login' endpoint.
  if (email === 'test@luxe.com' && password === 'password123') {
    const mockUserData = {
      id: 'user-123',
      name: 'John Doe',
      email: 'test@luxe.com',
      token: 'fake-jwt-token-string',
    };
    return _apiCall(mockUserData);
  } else {
    throw new Error('Invalid email or password');
  }
};

/**
 * Simulates registering a new user.
 * @param {object} userData - { name, email, password }
 * @returns {Promise<object>} A promise that resolves with the new user's data.
 */
export const apiRegister = async ({ name, email, password }) => {
  console.log(`[API] Attempting to register: ${email}`);
  // This would be a POST request to your '/auth/register' endpoint.
  const mockNewUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    token: 'new-fake-jwt-token-string',
  };
  return _apiCall(mockNewUser, 1000);
};

/**
 * Simulates logging out a user.
 * @returns {Promise<object>} A promise that resolves with a success message.
 */
export const apiLogout = async () => {
    console.log('[API] Logging out user.');
    // This would POST to '/auth/logout' to invalidate a token on the server.
    return _apiCall({ success: true });
};