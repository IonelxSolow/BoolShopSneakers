// backend/services/emailTemplates.js

/**
 * Modulo per la gestione dei template delle email
 * Contiene funzioni per generare il contenuto HTML delle email inviate dal sistema
 */

/**
 * Genera il template HTML per le email di conferma ordine inviate ai clienti
 * @param {string} customerName - Nome del cliente
 * @param {number} orderId - ID dell'ordine
 * @param {Array} items - Array degli articoli ordinati
 * @param {number} totalPrice - Prezzo totale dell'ordine
 * @param {string} shippingAddress - Indirizzo di spedizione
 * @returns {string} - Template HTML dell'email
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
        <td colspan="5" style="padding: 12px 15px; text-align: center;">Nessun articolo</td>
      </tr>
      `;
    }

    return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Conferma Ordine - KickSociety</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; color: #232321; margin-bottom: 10px;">KICKSOCIETY</h1>
        <p style="font-size: 16px; color: #666;">Le migliori sneakers, sempre</p>
      </div>
      
      <div style="background-color: #cfef1b; padding: 20px; margin-bottom: 25px;">
        <h2 style="margin-top: 0; color: #232321;">Grazie per il tuo ordine, ${firstName}!</h2>
        <p>Il tuo ordine #${orderId} è stato ricevuto e sarà elaborato al più presto.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 10px; color: #232321;">Dettagli dell'ordine</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f7f7f7;">
              <th style="padding: 12px 15px; text-align: left; border-bottom: 2px solid #ddd;">Prodotto</th>
              <th style="padding: 12px 15px; text-align: center; border-bottom: 2px solid #ddd;">SKU</th>
              <th style="padding: 12px 15px; text-align: center; border-bottom: 2px solid #ddd;">Qtà</th>
              <th style="padding: 12px 15px; text-align: right; border-bottom: 2px solid #ddd;">Prezzo</th>
              <th style="padding: 12px 15px; text-align: right; border-bottom: 2px solid #ddd;">Totale</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 12px 15px; text-align: right; font-weight: bold;">Totale ordine:</td>
              <td style="padding: 12px 15px; text-align: right; font-weight: bold;">€${parseFloat(totalPrice).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 10px; color: #232321;">Indirizzo di spedizione</h3>
        <p style="margin-bottom: 20px;">${shippingAddress}</p>
      </div>
      
      <div style="background-color: #f7f7f7; padding: 20px; margin-bottom: 25px;">
        <p style="margin-top: 0;">Riceverai un'email di aggiornamento quando il tuo ordine verrà spedito.</p>
        <p style="margin-bottom: 0;">Per qualsiasi domanda riguardante il tuo ordine, rispondi a questa email o contattaci all'indirizzo <a href="mailto:support@kicksociety.com" style="color: #232321;">support@kicksociety.com</a>.</p>
      </div>
      
      <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p>Grazie per aver scelto KickSociety!</p>
        <p>&copy; ${new Date().getFullYear()} KickSociety. Tutti i diritti riservati.</p>
        <p>
          <a href="https://www.kicksociety.com/privacy" style="color: #666; text-decoration: none; margin: 0 10px;">Privacy Policy</a> |
          <a href="https://www.kicksociety.com/terms" style="color: #666; text-decoration: none; margin: 0 10px;">Termini e Condizioni</a>
        </p>
      </div>
    </body>
    </html>
    `;
};

/**
 * Genera il template HTML per le email di conferma ordine inviate all'amministratore
 * @param {string} customerName - Nome del cliente
 * @param {string} customerEmail - Email del cliente
 * @param {number} orderId - ID dell'ordine
 * @param {Array} items - Array degli articoli ordinati
 * @param {number} totalPrice - Prezzo totale dell'ordine
 * @param {string} shippingAddress - Indirizzo di spedizione
 * @returns {string} - Template HTML dell'email
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
        <td colspan="5" style="padding: 10px; text-align: center;">Nessun articolo</td>
      </tr>
      `;
    }

    return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuovo Ordine - KickSociety</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 24px; color: #232321; margin-bottom: 5px;">KICKSOCIETY ADMIN</h1>
      </div>
      
      <div style="background-color: #232321; color: white; padding: 15px; margin-bottom: 20px;">
        <h2 style="margin-top: 0; color: #cfef1b;">Nuovo Ordine Ricevuto!</h2>
        <p style="margin-bottom: 0;">È stato ricevuto un nuovo ordine che richiede la tua attenzione.</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 8px; color: #232321;">Informazioni Cliente</h3>
        <p><strong>Ordine #:</strong> ${orderId}</p>
        <p><strong>Cliente:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Indirizzo:</strong> ${shippingAddress}</p>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h3 style="border-bottom: 2px solid #cfef1b; padding-bottom: 8px; color: #232321;">Dettagli Ordine</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Prodotto</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">SKU</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qtà</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Prezzo</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Totale</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 10px; text-align: right; font-weight: bold;">Totale ordine:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">€${parseFloat(totalPrice).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="text-align: center; margin-top: 25px;">
        <a href="https://admin.kicksociety.com/orders/${orderId}" style="display: inline-block; padding: 10px 20px; background-color: #cfef1b; color: #232321; text-decoration: none; font-weight: bold; border-radius: 4px;">Gestisci Ordine</a>
      </div>
      
      <div style="text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd;">
        <p>Questa è una email automatica, si prega di non rispondere.</p>
        <p>&copy; ${new Date().getFullYear()} KickSociety. Tutti i diritti riservati.</p>
      </div>
    </body>
    </html>
    `;
  };