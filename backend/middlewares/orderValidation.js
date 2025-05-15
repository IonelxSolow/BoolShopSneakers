// Backend validation middleware for checkout form submissions
const shippingService = require('../services/shippingService');

function validateOrder(req, res, next) {
  const {
    name,
    email,
    phone,
    address,
    total_price,
    status,
    payment_type,
    delivery_fee,
    shipping_method,
    items,
    // Card details for validation only - will not be stored
    cardName,
    cardNumber,
    expiryDate,
    cvv
  } = req.body;

  // Array to collect all validation errors
  const errors = {};

  // Validate customer information
  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    errors.name = 'Name should only contain letters and spaces';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (!phone || phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (!/^\d+$/.test(phone)) {
    errors.phone = 'Phone number should only contain digits';
  } else if (phone.length < 8 || phone.length > 15) {
    errors.phone = 'Phone number must be between 8 and 15 digits';
  }

  if (!address || address.trim() === '') {
    errors.address = 'Address is required';
  }

  // Validate shipping method
  if (shipping_method && !['standard', 'express'].includes(shipping_method)) {
    errors.shipping_method = 'Invalid shipping method';
  }

  // Validate payment information
  if (!payment_type || payment_type.trim() === '') {
    errors.payment_type = 'Payment type is required';
  }

  // Validate card details if payment_type is 'card'
  if (payment_type === 'card') {
    // Validate card name
    if (!cardName || cardName.trim() === '') {
      errors.cardName = 'Card name is required';
    } else if (!/^[A-Za-z\s]+$/.test(cardName)) {
      errors.cardName = 'Card name should only contain letters and spaces';
    }

    // Validate card number
    if (!cardNumber || cardNumber.trim() === '') {
      errors.cardNumber = 'Card number is required';
    } else {
      // Remove spaces for validation
      const cardNumberClean = cardNumber.replace(/\s/g, '');
      
      if (!/^\d{16}$/.test(cardNumberClean)) {
        errors.cardNumber = 'Card number must be 16 digits';
      } else if (!validateLuhn(cardNumberClean)) {
        errors.cardNumber = 'Invalid card number';
      }
    }

    // Validate expiry date
    if (!expiryDate || expiryDate.trim() === '') {
      errors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = 'Expiry date must be in MM/YY format';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if ((parseInt(year) < currentYear) || 
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        errors.expiryDate = 'Card has expired';
      }
    }

    // Validate CVV
    if (!cvv || cvv.trim() === '') {
      errors.cvv = 'CVV is required';
    } else if (!/^\d+$/.test(cvv)) {
      errors.cvv = 'CVV should only contain digits';
    } else if (cvv.length < 3 || cvv.length > 4) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
  }

  // Validate order items
  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.items = 'Order must contain at least one item';
  } else {
    const itemErrors = [];
    
    items.forEach((item, index) => {
      const itemError = {};
      
      if (!item.variant_id) {
        itemError.variant_id = 'Product variant ID is required';
      }
      
      if (!item.quantity || item.quantity < 1) {
        itemError.quantity = 'Quantity must be at least 1';
      }
      
      if (item.price === undefined || item.price <= 0) {
        itemError.price = 'Price must be greater than 0';
      }
      
      if (Object.keys(itemError).length > 0) {
        itemErrors.push({ index, errors: itemError });
      }
    });
    
    if (itemErrors.length > 0) {
      errors.items = itemErrors;
    }
  }

  // Validate pricing
  if (total_price !== undefined && (isNaN(total_price) || total_price < 0)) {
    errors.total_price = 'Total price must be a non-negative number';
  }

  // Calculate expected delivery fee based on items and shipping method
  if (items && items.length > 0) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const expectedDeliveryFee = shippingService.calculateShippingCost(
      subtotal,
      shipping_method || 'standard'
    );
    
    // If delivery_fee is specified, verify it matches the expected value
    if (delivery_fee !== undefined && delivery_fee !== expectedDeliveryFee) {
      errors.delivery_fee = 'Invalid delivery fee for the order amount and shipping method';
    }
  }

  // If there are any validation errors, return a 400 Bad Request response
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  // Clean up any sensitive data before passing to the next middleware
  delete req.body.cardNumber;
  delete req.body.expiryDate;
  delete req.body.cvv;

  // If validation passes, proceed to the next middleware or controller
  next();
}

/**
 * Implements the Luhn algorithm for credit card validation
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - True if the card number passes the Luhn check
 */
function validateLuhn(cardNumber) {
  let sum = 0;
  let doubleUp = false;
  
  // Process from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    
    // Double every second digit
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    doubleUp = !doubleUp;
  }
  
  // If the sum is a multiple of 10, the number is valid
  return (sum % 10) === 0;
}

module.exports = validateOrder; 