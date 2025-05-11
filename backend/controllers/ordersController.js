const connection = require('../db/boolshop_db.js')

function store(req, res) {
    const { guest_id, total_price, status, discount_id, delivery_fee, items, payment_type } = req.body

    // Prima inserisci l'ordine principale
    const orderSql = `
        INSERT INTO orders (guest_id, total_price, status, discount_id, delivery_fee, payment_type, purchase_order) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    function generatePurchaseOrder() {
        const timestamp = Date.now().toString();
        const randomDigit = Math.floor(Math.random() * 10);
        return timestamp + randomDigit;
    }

    connection.query(orderSql, [
        guest_id || null,
        total_price,
        status || 'pending',
        discount_id || null,
        delivery_fee || 0.00,
        payment_type,
        generatePurchaseOrder()

    ], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Errore durante la creazione dell'ordine",
                error: err.message
            })
        }

        const orderId = result.insertId

        // Se non ci sono items, restituisci subito la risposta
        if (!items || items.length === 0) {
            return res.status(201).json({
                message: "Ordine creato con successo",
                order_id: orderId
            })
        }

        // Poi inserisci gli items dell'ordine
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

function show(req, res) {

    const id = Number(req.params.id)

    const sql = 'SELECT * FROM ORDERS WHERE id = ?'

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