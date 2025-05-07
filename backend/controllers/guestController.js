const connection = require('../db/boolshop_db.js')

function store(req, res) {
    const { name, email, address, phone } = req.body

    const sql = `
        INSERT INTO guests (name, email, address, phone)
        VALUES (?, ?, ?, ?)
    `

    connection.query(sql, [name, email, address, phone], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Errore durante la creazione del guest",
                error: err.message
            })
        }

        res.status(201).json({
            message: "Guest creato con successo",
            guest_id: result.insertId
        })
    })
}

module.exports = {
    store
}