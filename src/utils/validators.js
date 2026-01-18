/**
 * A collection of validation functions.
 */

/**
 * A simple validator for credit card numbers (checks for length).
 * A real implementation would use the Luhn algorithm.
 * @param {string} cardNumber - The credit card number string.
 * @returns {boolean} True if the card number is potentially valid.
 */
export const isValidCreditCard = (cardNumber) => {
  const sanitized = cardNumber.replace(/[\s-]/g, '');
  return /^\d{13,19}$/.test(sanitized);
};


/**
 * Validates a credit card expiry date in "MM/YY" format.
 * Checks if the date is in the future.
 * @param {string} expiryDate - The expiry date string (e.g., "12/28").
 * @returns {boolean} True if the expiry date is valid and not in the past.
 */
export const isValidExpiryDate = (expiryDate) => {
  const match = expiryDate.match(/^(\d{2})\/?(\d{2})$/);
  if (!match) {
    return false;
  }

  const [, month, year] = match.map(Number);
  if (month < 1 || month > 12) {
    return false;
  }

  const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false; // Card has expired
  }

  return true;
};


/**
 * A simple validator for CVV/CVC codes.
 * @param {string} cvv - The CVV string.
 * @returns {boolean} True if the CVV is 3 or 4 digits.
 */
export const isValidCvv = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};