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

    // Prima creiamo il guest
    const guestSql = `
        INSERT INTO guests (name, email, address, phone)
        VALUES (?, ?, ?, ?)
    `

    connection.query(guestSql, [name, email, address, phone], (err, guestResult) => {
        if (err) {
            return res.status(500).json({
                message: "Errore durante la creazione del guest",
                error: err.message
            })
        }

        const guest_id = guestResult.insertId

        // Poi creiamo l'ordine collegato al guest appena creato
        const orderSql = `
            INSERT INTO orders (guest_id, total_price, status, discount_id, delivery_fee, payment_type, purchase_order) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        connection.query(orderSql, [
            guest_id,
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

            // Se non ci sono prodotti, restituiamo subito la risposta
            if (!items || items.length === 0) {
                return res.status(201).json({
                    message: "Ordine creato con successo",
                    order_id: orderId,
                    guest_id: guest_id
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
                    message: "Ordine e guest creati con successo",
                    order_id: orderId,
                    guest_id: guest_id
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