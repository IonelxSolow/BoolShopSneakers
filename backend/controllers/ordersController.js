// backend/controllers/ordersController.js (complete version)

const connection = require('../db/boolshop_db.js')
const emailService = require('../services/emailService')
const emailTemplates = require('../services/emailTemplates')
const shippingService = require('../services/shippingService')

function store(req, res) {
    const {
        name,
        email,
        address,
        phone,
        total_price,
        status,
        discount_id,
        delivery_fee,
        items,
        payment_type,
        shipping_method
    } = req.body

    // Generate purchase_order first to be able to use it in multiple places
    const purchaseOrder = generatePurchaseOrder()

    // Calculate the subtotal from items
    const subtotal = items && items.length > 0 
        ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        : 0
    
    // Calculate shipping cost based on subtotal and shipping method
    const calculatedDeliveryFee = shippingService.calculateShippingCost(
        subtotal, 
        shipping_method || 'standard'
    )
    
    // Use calculated delivery fee if not explicitly provided
    const finalDeliveryFee = delivery_fee !== undefined ? delivery_fee : calculatedDeliveryFee
    
    // Recalculate total price if needed
    const finalTotalPrice = total_price !== undefined ? total_price : (subtotal + finalDeliveryFee)

    const orderSql = `
            INSERT INTO orders (name, email, address, phone, total_price, status, discount_id, delivery_fee, payment_type, purchase_order) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

    connection.query(orderSql, [
        name,
        email,
        address,
        phone,
        finalTotalPrice,
        status || 'pending',
        discount_id || null,
        finalDeliveryFee,
        payment_type,
        purchaseOrder
    ], (err, orderResult) => {
        if (err) {
            return res.status(500).json({
                message: "Error while creating the order",
                error: err.message
            })
        }

        const orderId = orderResult.insertId

        if (!items || items.length === 0) {
            // Send confirmation email even if there are no items
            // Pass purchaseOrder instead of orderId
            sendConfirmationEmails(name, email, purchaseOrder, finalTotalPrice, [], address)

            return res.status(201).json({
                message: "Order created successfully",
                order_id: orderId,
                purchase_order: purchaseOrder
            })
        }

        // Insert order products
        const orderItemsSql = `
                INSERT INTO order_items (order_id, variant_id, quantity, price)
                VALUES ?
            `

        const orderItemsValues = items.map(item => [
            orderId,
            item.variant_id,
            item.quantity,
            item.price
        ])

        connection.query(orderItemsSql, [orderItemsValues], (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Error while inserting order items",
                    error: err.message
                })
            }

            // Now retrieve item details to include in the email
            const getItemsDetailsSql = `
                SELECT v.sku, s.name, s.brand, oi.quantity, oi.price
                FROM order_items oi
                JOIN variants v ON oi.variant_id = v.id
                JOIN shoes s ON v.shoe_id = s.id
                WHERE oi.order_id = ?
            `

            connection.query(getItemsDetailsSql, [orderId], (err, itemDetails) => {
                if (err) {
                    console.error("Error retrieving item details:", err)
                    itemDetails = []
                }

                // Send confirmation emails passing purchaseOrder instead of orderId
                sendConfirmationEmails(name, email, purchaseOrder, finalTotalPrice, itemDetails, address)

                res.status(201).json({
                    message: "Order created successfully",
                    order_id: orderId,
                    purchase_order: purchaseOrder,
                    delivery_fee: finalDeliveryFee,
                    total_price: finalTotalPrice,
                    free_shipping: finalDeliveryFee === 0
                })
            })
        })
    })
}

function generatePurchaseOrder() {
    const timestamp = Date.now().toString()
    const randomDigit = Math.floor(Math.random() * 10)
    return timestamp + randomDigit
}

function show(req, res) {
    // Get the order identifier from the URL parameter
    const orderIdentifier = req.params.id

    // Check if it's a numeric ID or a purchase_order string
    const isNumeric = /^\d+$/.test(orderIdentifier) && orderIdentifier.length < 10

    // Build the appropriate SQL query based on the identifier type
    // Use aliases to avoid conflicts between fields with the same name
    let sql

    if (isNumeric) {
        // If it's a numeric ID, search by order ID
        sql = `
            SELECT 
                orders.id as order_id,
                orders.name as customer_name,
                orders.email as customer_email,
                orders.phone as customer_phone,
                orders.address as shipping_address,
                orders.total_price,
                orders.status,
                orders.discount_id,
                orders.delivery_fee,
                orders.payment_type,
                orders.purchase_order,
                orders.created_at,
                order_items.id as item_id,
                order_items.variant_id,
                order_items.quantity,
                order_items.price as item_price,
                variants.sku,
                variants.color,
                variants.size,
                shoes.name as product_name,
                shoes.brand as product_brand
            FROM orders
            JOIN order_items ON orders.id = order_items.order_id
            JOIN variants ON variants.id = order_items.variant_id
            JOIN shoes ON variants.shoe_id = shoes.id
            WHERE orders.id = ?
        `
    } else {
        // If it's a purchase_order string, search by purchase_order
        sql = `
            SELECT 
                orders.id as order_id,
                orders.name as customer_name,
                orders.email as customer_email,
                orders.phone as customer_phone,
                orders.address as shipping_address,
                orders.total_price,
                orders.status,
                orders.discount_id,
                orders.delivery_fee,
                orders.payment_type,
                orders.purchase_order,
                orders.created_at,
                order_items.id as item_id,
                order_items.variant_id,
                order_items.quantity,
                order_items.price as item_price,
                variants.sku,
                variants.color,
                variants.size,
                shoes.name as product_name,
                shoes.brand as product_brand
            FROM orders
            JOIN order_items ON orders.id = order_items.order_id
            JOIN variants ON variants.id = order_items.variant_id
            JOIN shoes ON variants.shoe_id = shoes.id
            WHERE orders.purchase_order = ?
        `
    }

    connection.query(sql, [orderIdentifier], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ error: 'order not found' })

        // Return all results to get all order items
        res.json(results)
    })
}

// Function to send confirmation emails
// Modified to use purchaseOrder instead of orderId
function sendConfirmationEmails(customerName, customerEmail, purchaseOrder, totalPrice, items, shippingAddress) {
    // Email for the customer
    const customerSubject = `Order Confirmation #${purchaseOrder} - KickSociety`

    // Generate plain text email content for the customer (as fallback)
    let customerTextContent = `
Dear ${customerName},

Thank you for your order at KickSociety (Order Number: ${purchaseOrder})!

Order Details:
---------------------------------
`

    if (items.length > 0) {
        items.forEach(item => {
            customerTextContent += `
Product: ${item.brand} ${item.name}
SKU: ${item.sku}
Quantity: ${item.quantity}
Price: €${parseFloat(item.price).toFixed(2)}
---------------------------------`
        })
    }

    customerTextContent += `
Order Total: €${parseFloat(totalPrice).toFixed(2)}

Shipping Address:
${shippingAddress}

Your order has been received and will be processed as soon as possible. You will receive an update email when your order has been shipped.

For any questions regarding your order, please reply to this email or contact us at support@kicksociety.com.

Thank you for choosing KickSociety!

Best regards,
The KickSociety Team
`

    // Generate HTML content for the customer email
    const customerHtmlContent = emailTemplates.generateCustomerOrderConfirmationTemplate(
        customerName,
        purchaseOrder, // Use purchaseOrder instead of orderId
        items,
        totalPrice,
        shippingAddress
    )

    // Email for the seller/admin
    const adminEmail = process.env.ADMIN_EMAIL || 'kickssocietycs@gmail.com' // Admin email configured as environment variable
    const adminSubject = `New Order #${purchaseOrder} Received`

    // Generate plain text email content for the admin (as fallback)
    let adminTextContent = `
New order received!

Order Number: ${purchaseOrder}
Customer: ${customerName}
Customer Email: ${customerEmail}
Shipping Address: ${shippingAddress}

Order Details:
---------------------------------
`

    if (items.length > 0) {
        items.forEach(item => {
            adminTextContent += `
Product: ${item.brand} ${item.name}
SKU: ${item.sku}
Quantity: ${item.quantity}
Price: €${parseFloat(item.price).toFixed(2)}
---------------------------------`
        })
    }

    adminTextContent += `
Order Total: €${parseFloat(totalPrice).toFixed(2)}

Access the admin panel to manage this order.
`

    // Generate HTML content for the admin email
    const adminHtmlContent = emailTemplates.generateAdminOrderNotificationTemplate(
        customerName,
        customerEmail,
        purchaseOrder, // Use purchaseOrder instead of orderId
        items,
        totalPrice,
        shippingAddress
    )

    // Send email to the customer with HTML template
    emailService.sendTemplatedEmail(
        customerEmail,
        customerSubject,
        customerHtmlContent,
        customerTextContent
    ).catch(err => console.error('Error sending email to customer:', err))

    // Send email to the admin with HTML template
    emailService.sendTemplatedEmail(
        adminEmail,
        adminSubject,
        adminHtmlContent,
        adminTextContent
    ).catch(err => console.error('Error sending email to admin:', err))
}

module.exports = {
    store, show
}