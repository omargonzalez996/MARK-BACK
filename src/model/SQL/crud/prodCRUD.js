const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

router.get('/productos', (req, res) => {
    connection.query('SELECT * FROM Productos', (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log('0K');
            console.log(err);
        }
    });

});

router.post('/productos', (req, res) => {
    const { cat_id, brand_id, product_name, product_desc, product_price } = req.body;
    const query = 'INSERT INTO Productos(cat_id, brand_id, product_name, product_desc, product_price) VALUES(?,?,?,?,?);'
    connection.query(query, [cat_id, brand_id, product_name, product_desc, product_price], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: '0K' });
        } else {
            console.log(err);
        }
    })
})

router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { cat_id, brand_id, product_name, product_desc, product_price } = req.body;
    const query = `UPDATE Productos SET cat_id=?, brand_id=?, product_name=?, product_desc=?, product_price=?  WHERE product_id=${id};`
    connection.query(query, [cat_id, brand_id, product_name, product_desc, product_price], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: '0K' });
        } else {
            console.log(err);
        }
    })
})

module.exports = router;

