const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

router.get('/marcas', (req, res) => {
    connection.query('SELECT * FROM Marcas', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('no errors');
            console.log(err);
        }
    });

});

router.post('/marcas', (req, res) => {
    const { brand_name, brand_desc, country_id } = req.body;
    const query = 'INSERT INTO Marcas (brand_name, brand_desc, country_id) VALUES(?,?,?);'
    connection.query(query, [brand_name, brand_desc, country_id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Marca Agregada' });
        } else {
            console.log(err);
        }
    })
})

router.put('/marcas/:id', (req, res) => {
    const { id } = req.params;
    const { brand_name, brand_desc, country_id } = req.body;
    const query = `UPDATE Marcas SET brand_name=?, brand_desc=?, country_id=? WHERE brand_id=${id};`
    connection.query(query, [brand_name, brand_desc, country_id], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Marca Agregada' });
        } else {
            console.log(err);
        }
    })
})

module.exports = router;