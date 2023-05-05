const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

router.get('/categorias', (req, res) => {
    connection.query('SELECT * FROM Categorias;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('0K');
            console.log(err);
        }
    })
})

router.post('/categorias', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO Categorias (cat_name) VALUES(?);'
    connection.query(query, [name], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('0K');
            console.log(err);
        }
    })
})

router.put('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = `UPDATE Categoria SET cat_name=? WHERE cat_id=${id}`
    connection.query(query, [name], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('no errors');
            console.log(err);
        }
    })
})

module.exports = router;