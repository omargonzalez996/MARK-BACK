const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *      Producto:
 *         type: object
 *         properties:
 *              cat_id:
 *                  type: int 
 *                  description: id de la categoria del producto
 *              brand_id:
 *                  type: int
 *                  description: id de la marca del producto
 *              product_name:
 *                  type: string
 *                  description: nombre del producto
 *              product_desc:
 *                  type: string
 *                  description: descripcion del producto
 *              product_price:
 *                  type: int
 *                  description: precio del producto
 *         required:
 *          - cat_id
 *          - brand_id
 *          - product_name
 *         example: 
 *          cat_id: 1
 *          brand_id: 2
 *          product_name: "SRS-XP500"
 *          product_desc: "Bocina que suena mucho muy fuerte"
 *          product_price: 7500
 */

/**
 * @swagger
 * /productos:
 *   get:
 *    summary: retorna todos los registros de producto
 *    tags: [Producto]
 *    responses:
 *       200:
 *         description: Todos los productos
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Error de petición
 *     
 */
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

/**
 * @swagger
 * /productos:
 *    post:
 *      summary: crear un nuevo registro de producto
 *      tags: [Producto]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Producto'
 *      responses:
 *        200:
 *          description: Producto agregada correctamente
 *        400:
 *          description: Error de petición
 */
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

/**
 * @swagger
 * /productos/{id}:
 *  put:
 *    summary: Actualizar un registro de producto
 *    tags: [Producto]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id de producto
 *    requestBody:
 *      description: Campos para actualizar un registro de producto
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Producto'
 *    responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Error de actualización
 */
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

