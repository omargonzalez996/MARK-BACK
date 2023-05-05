const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

router.get('/paises', (req, res) => {
    connection.query('SELECT * FROM Paises;', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('0K');
            console.log(err);
        }
    })
})

router.post('/Paises', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO Paises (country_name) VALUES(?);'
    connection.query(query, [name], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('0K');
            console.log(err);
        }
    })
})

router.put('/Paises/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = `UPDATE Paises SET country_name=? WHERE cat_id=${id}`
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