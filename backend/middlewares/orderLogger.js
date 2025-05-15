/**
 * Order logger middleware
 * Logs important order operations for monitoring and debugging
 */

function orderLogger(req, res, next) {
  // Only log for order-related operations
  if (req.originalUrl.includes('/orders')) {
    const timestamp = new Date().toISOString();
    
    // Create a safe copy of the request body for logging
    // Exclude any sensitive information
    const safeBody = { ...req.body };
    
    // Delete sensitive information
    delete safeBody.cardNumber;
    delete safeBody.expiryDate;
    delete safeBody.cvv;
    delete safeBody.cardName;
    
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    console.log('Order details:', JSON.stringify({
      name: safeBody.name,
      email: safeBody.email,
      items_count: safeBody.items ? safeBody.items.length : 0,
      total_price: safeBody.total_price,
      shipping_method: safeBody.shipping_method
    }));
  }

  // Capture the original send method
  const originalSend = res.send;
  
  // Override the send method to log responses
  res.send = function(body) {
    if (req.originalUrl.includes('/orders')) {
      const timestamp = new Date().toISOString();
      
      try {
        // Try to parse the response body if it's JSON
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
        
        console.log(`[${timestamp}] Response ${res.statusCode}`);
        
        // Log error messages if present
        if (res.statusCode >= 400 && parsedBody.message) {
          console.error(`Error: ${parsedBody.message}`);
          if (parsedBody.errors) {
            console.error('Validation errors:', JSON.stringify(parsedBody.errors));
          }
        } else if (res.statusCode === 201) {
          // Log successful order creation
          console.log(`Order created successfully. ID: ${parsedBody.order_id || 'N/A'}, Reference: ${parsedBody.purchase_order || 'N/A'}`);
        }
      } catch (error) {
        // If parsing fails, just log the status code
        console.log(`[${timestamp}] Response ${res.statusCode} (Body not parsed)`);
      }
    }
    
    // Call the original send method
    return originalSend.call(this, body);
  };
  
  next();
}

module.exports = orderLogger; 