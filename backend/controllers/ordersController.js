const connection = require('../db/boolshop_db.js')

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
        generatePurchaseOrder()
    ], (err, orderResult) => {
        if (err) {
            return res.status(500).json({
                message: "Errore durante la creazione dell'ordine",
                error: err.message
            })
        }

        const orderId = orderResult.insertId

        if (!items || items.length === 0) {
            return res.status(201).json({
                message: "Ordine creato con successo",
                order_id: orderId
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

            res.status(201).json({
                message: "Ordine creato con successo",
                order_id: orderId
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

    const id = Number(req.params.id)

    const sql = `
SELECT *
FROM orders
JOIN order_items ON orders.id = order_items.order_id
JOIN variants ON variants.id = order_items.variant_id
WHERE orders.id = ?
    `

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ error: 'order not found' })
        const order = results[0]
        res.json(order)
    })

}

module.exports = {
    store, show
}