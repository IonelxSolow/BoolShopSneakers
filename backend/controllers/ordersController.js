// Modified ordersController.js to support fetching by purchase_order

const connection = require('../db/boolshop_db.js')
const emailService = require('../services/emailService')
const emailTemplates = require('../services/emailTemplates')

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
        payment_type
    } = req.body

    // Genera il purchase_order prima per poterlo usare in più punti
    const purchaseOrder = generatePurchaseOrder()

    const orderSql = `
            INSERT INTO orders (name, email, address, phone, total_price, status, discount_id, delivery_fee, payment_type, purchase_order) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

    connection.query(orderSql, [
        name,
        email,
        address,
        phone,
        total_price,
        status || 'pending',
        discount_id || null,
        delivery_fee || 0.00,
        payment_type,
        purchaseOrder
    ], (err, orderResult) => {
        if (err) {
            return res.status(500).json({
                message: "Errore durante la creazione dell'ordine",
                error: err.message
            })
        }

        const orderId = orderResult.insertId

        if (!items || items.length === 0) {
            // Invia la mail di conferma anche se non ci sono items
            // Passiamo purchaseOrder invece di orderId
            sendConfirmationEmails(name, email, purchaseOrder, total_price, [], address)

            return res.status(201).json({
                message: "Ordine creato con successo",
                order_id: orderId,
                purchase_order: purchaseOrder
            })
        }

        // Inseriamo i prodotti dell'ordine
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
                    message: "Errore durante l'inserimento degli items dell'ordine",
                    error: err.message
                })
            }

            // Ora recuperiamo i dettagli degli items per includerli nell'email
            const getItemsDetailsSql = `
                SELECT v.sku, s.name, s.brand, oi.quantity, oi.price
                FROM order_items oi
                JOIN variants v ON oi.variant_id = v.id
                JOIN shoes s ON v.shoe_id = s.id
                WHERE oi.order_id = ?
            `

            connection.query(getItemsDetailsSql, [orderId], (err, itemDetails) => {
                if (err) {
                    console.error("Errore nel recupero dei dettagli degli articoli:", err)
                    itemDetails = []
                }

                // Invia le email di conferma passando purchaseOrder invece di orderId
                sendConfirmationEmails(name, email, purchaseOrder, total_price, itemDetails, address)

                res.status(201).json({
                    message: "Ordine creato con successo",
                    order_id: orderId,
                    purchase_order: purchaseOrder
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
    let sql

    if (isNumeric) {
        // If it's a numeric ID, search by order ID
        sql = `
            SELECT orders.*, order_items.*, variants.sku, variants.color, 
                   variants.size, shoes.name, shoes.brand
            FROM orders
            JOIN order_items ON orders.id = order_items.order_id
            JOIN variants ON variants.id = order_items.variant_id
            JOIN shoes ON variants.shoe_id = shoes.id
            WHERE orders.id = ?
        `
    } else {
        // If it's a purchase_order string, search by purchase_order
        sql = `
            SELECT orders.*, order_items.*, variants.sku, variants.color, 
                   variants.size, shoes.name, shoes.brand
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

        // Return all the results to get all order items
        res.json(results)
    })
}

// Funzione per inviare email di conferma
// Modificata per usare purchaseOrder invece di orderId
function sendConfirmationEmails(customerName, customerEmail, purchaseOrder, totalPrice, items, shippingAddress) {
    // Email per il cliente
    const customerSubject = `Conferma Ordine #${purchaseOrder} - KickSociety`

    // Genera il testo semplice dell'email per il cliente (come fallback)
    let customerTextContent = `
Caro/a ${customerName},

Grazie per il tuo ordine su KickSociety (Numero d'ordine: ${purchaseOrder})!

Dettagli dell'ordine:
---------------------------------
`

    if (items.length > 0) {
        items.forEach(item => {
            customerTextContent += `
Prodotto: ${item.brand} ${item.name}
SKU: ${item.sku}
Quantità: ${item.quantity}
Prezzo: €${parseFloat(item.price).toFixed(2)}
---------------------------------`
        })
    }

    customerTextContent += `
Totale ordine: €${parseFloat(totalPrice).toFixed(2)}

Indirizzo di spedizione:
${shippingAddress}

Il tuo ordine è stato ricevuto e sarà elaborato al più presto. Riceverai un'email di aggiornamento quando il tuo ordine verrà spedito.

Per qualsiasi domanda riguardante il tuo ordine, rispondi a questa email o contattaci all'indirizzo support@kicksociety.com.

Grazie per aver scelto KickSociety!

Cordiali saluti,
Il Team KickSociety
`

    // Genera il contenuto HTML dell'email per il cliente
    const customerHtmlContent = emailTemplates.generateCustomerOrderConfirmationTemplate(
        customerName,
        purchaseOrder, // Usa purchaseOrder al posto di orderId
        items,
        totalPrice,
        shippingAddress
    )

    // Email per il venditore/admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kicksociety.com' // Email dell'admin configurata come variabile d'ambiente
    const adminSubject = `Nuovo Ordine #${purchaseOrder} Ricevuto`

    // Genera il testo semplice dell'email per l'admin (come fallback)
    let adminTextContent = `
Nuovo ordine ricevuto!

Numero d'ordine: ${purchaseOrder}
Cliente: ${customerName}
Email cliente: ${customerEmail}
Indirizzo di spedizione: ${shippingAddress}

Dettagli dell'ordine:
---------------------------------
`

    if (items.length > 0) {
        items.forEach(item => {
            adminTextContent += `
Prodotto: ${item.brand} ${item.name}
SKU: ${item.sku}
Quantità: ${item.quantity}
Prezzo: €${parseFloat(item.price).toFixed(2)}
---------------------------------`
        })
    }

    adminTextContent += `
Totale ordine: €${parseFloat(totalPrice).toFixed(2)}

Accedi al pannello di amministrazione per gestire questo ordine.
`

    // Genera il contenuto HTML dell'email per l'admin
    const adminHtmlContent = emailTemplates.generateAdminOrderNotificationTemplate(
        customerName,
        customerEmail,
        purchaseOrder, // Usa purchaseOrder al posto di orderId
        items,
        totalPrice,
        shippingAddress
    )

    // Invio email al cliente con template HTML
    emailService.sendTemplatedEmail(
        customerEmail,
        customerSubject,
        customerHtmlContent,
        customerTextContent
    ).catch(err => console.error('Errore nell\'invio dell\'email al cliente:', err))

    // Invio email all'admin con template HTML
    emailService.sendTemplatedEmail(
        adminEmail,
        adminSubject,
        adminHtmlContent,
        adminTextContent
    ).catch(err => console.error('Errore nell\'invio dell\'email all\'admin:', err))
}

module.exports = {
    store, show
}