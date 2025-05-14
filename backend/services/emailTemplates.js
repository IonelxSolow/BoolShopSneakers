// backend/services/emailTemplates.js

/**
 * Module for managing email templates
 * Contains functions to generate HTML content for emails sent by the system
 */

/**
 * Generates the HTML template for order confirmation emails sent to customers
 * @param {string} customerName - Customer's name
 * @param {number} orderId - Order ID
 * @param {Array} items - Array of ordered items
 * @param {number} totalPrice - Total price of the order
 * @param {string} shippingAddress - Shipping address
 * @returns {string} - HTML template of the email
 */
exports.generateCustomerOrderConfirmationTemplate = (customerName, orderId, items, totalPrice, shippingAddress) => {
  const firstName = customerName.split(' ')[0];

  let itemsHtml = '';

  if (items && items.length > 0) {
    items.forEach(item => {
      itemsHtml += `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid #ddd;">${item.brand} ${item.name}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #ddd; text-align: center;">${item.sku}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #ddd; text-align: right;">€${parseFloat(item.price).toFixed(2)}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #ddd; text-align: right;">€${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
      </tr>
      `;
    });
  } else {
    itemsHtml = `
    <tr>
      <td colspan="5" style="padding: 12px 15px; text-align: center;">No items</td>
    </tr>
    `;
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - KickSociety</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="font-size: 24px; color: #232321; margin-bottom: 10px;">KICKSOCIETY</h1>
      <p style="font-size: 16px; color: #666;">The best sneakers, always</p>
    </div>
    
    <div style="background-color: #cfef1b; padding: 20px; margin-bottom: 25px;">
      <h2 style="margin-top: 0; color: #232321;">Thank you for your order, ${firstName}!</h2>
      <p>Your order #${orderId} has been received and will be processed as soon as possible.</p>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 10px; color: #232321;">Order details</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f7f7f7;">
            <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
            <th style="padding: 12px 15px; text-align: center; border-bottom: 2px solid #ddd;">SKU</th>
            <th style="padding: 12px 15px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
            <th style="padding: 12px 15px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
            <th style="padding: 12px 15px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="padding: 12px 15px; text-align: right; font-weight: bold;">Order total:</td>
            <td style="padding: 12px 15px; text-align: right; font-weight: bold;">€${parseFloat(totalPrice).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 10px; color: #232321;">Shipping address</h3>
      <p style="margin-bottom: 20px;">${shippingAddress}</p>
    </div>
    
    <div style="background-color: #f7f7f7; padding: 20px; margin-bottom: 25px;">
      <p style="margin-top: 0;">You will receive an update email when your order has been shipped.</p>
      <p style="margin-bottom: 0;">For any questions regarding your order, reply to this email or contact us at <a href="mailto:support@kicksociety.com" style="color: #232321;">support@kicksociety.com</a>.</p>
    </div>
    
    <div style="text-align: center; margin-top: 25px;">
      <a href="http://localhost:5173/account/orders/${orderId}" style="display: inline-block; padding: 10px 20px; background-color: #cfef1b; color: #232321; text-decoration: none; font-weight: bold; border-radius: 4px;">Check order status</a>
    </div>

    <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      <p>Thank you for choosing KickSociety!</p>
      <p>&copy; ${new Date().getFullYear()} KickSociety. All rights reserved.</p>
      <p>
        <a href="https://www.kicksociety.com/privacy" style="color: #666; text-decoration: none; margin: 0 10px;">Privacy Policy</a> |
        <a href="https://www.kicksociety.com/terms" style="color: #666; text-decoration: none; margin: 0 10px;">Terms and Conditions</a>
      </p>
    </div>
  </body>
  </html>
  `;
};

/**
* Generates the HTML template for order confirmation emails sent to the administrator
* @param {string} customerName - Customer's name
* @param {string} customerEmail - Customer's email
* @param {number} orderId - Order ID
* @param {Array} items - Array of ordered items
* @param {number} totalPrice - Total price of the order
* @param {string} shippingAddress - Shipping address
* @returns {string} - HTML template of the email
*/
exports.generateAdminOrderNotificationTemplate = (customerName, customerEmail, orderId, items, totalPrice, shippingAddress) => {
  let itemsHtml = '';

  if (items && items.length > 0) {
    items.forEach(item => {
      itemsHtml += `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.brand} ${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.sku}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">€${parseFloat(item.price).toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">€${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
      </tr>
      `;
    });
  } else {
    itemsHtml = `
    <tr>
      <td colspan="5" style="padding: 10px; text-align: center;">No items</td>
    </tr>
    `;
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order - KickSociety</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="font-size: 24px; color: #232321; margin-bottom: 5px;">KICKSOCIETY ADMIN</h1>
    </div>
    
    <div style="background-color: #232321; color: white; padding: 15px; margin-bottom: 20px;">
      <h2 style="margin-top: 0; color: #cfef1b;">New Order Received!</h2>
      <p style="margin-bottom: 0;">A new order has been received that requires your attention.</p>
    </div>
    
    <div style="margin-bottom: 25px;">
      <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 8px; color: #232321;">Customer Information</h3>
      <p><strong>Order #:</strong> ${orderId}</p>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Address:</strong> ${shippingAddress}</p>
    </div>
    
    <div style="margin-bottom: 25px;">
      <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 8px; color: #232321;">Order Details</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">SKU</th>
            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" style="padding: 10px; text-align: right; font-weight: bold;">Order total:</td>
            <td style="padding: 10px; text-align: right; font-weight: bold;">€${parseFloat(totalPrice).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    
    <div style="text-align: center; margin-top: 25px;">
      <a href="http://localhost:5173/account/orders/${orderId}" style="display: inline-block; padding: 10px 20px; background-color: #cfef1b; color: #232321; text-decoration: none; font-weight: bold; border-radius: 4px;">Manage Order</a>
    </div>
    
    <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd;">
      <p>This is an automated email, please do not reply.</p>
      <p>&copy; ${new Date().getFullYear()} KickSociety. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;
};