/**
 * Shipping service for BoolShop
 * Calculates shipping costs based on order subtotal and selected shipping method
 */

// Configuration constants
const FREE_SHIPPING_THRESHOLD = 100; // Free shipping for orders over 100€
const SHIPPING_COSTS = {
  standard: 5,  // Standard shipping: 5€
  express: 15   // Express shipping: 15€
};

/**
 * Calculate shipping cost based on subtotal and shipping method
 * @param {number} subtotal - The order subtotal in euros
 * @param {string} shippingMethod - The shipping method ('standard' or 'express')
 * @returns {number} - The calculated shipping cost
 */
function calculateShippingCost(subtotal, shippingMethod = 'standard') {
  // If subtotal is over the threshold, shipping is free
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  
  // Otherwise, return the cost based on the selected shipping method
  return SHIPPING_COSTS[shippingMethod] || SHIPPING_COSTS.standard;
}

module.exports = {
  calculateShippingCost,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COSTS
}; 