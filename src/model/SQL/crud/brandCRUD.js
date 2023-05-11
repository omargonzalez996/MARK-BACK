const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *      Marca:
 *         type: object
 *         properties:
 *              brand_name:
 *                  type: string
 *                  description: el nombre de la marca
 *              brand_desc:
 *                  type: string
 *                  description: breve descripcion de la marca
 *              country_id:
 *                  type: int
 *                  description: id del pais al que pertenece la marca
 *         required:
 *          - brand_name
 *         example: 
 *          brand_name: "Steren"
 *          brand_desc: "Electrónica Steren, S.A. de C.V. es una empresa multinacional mexicana fundada en el año 1956 en la Ciudad de México, dedicada a comercializar productos electrónicos y tecnología."
 *          country_id: 1
 */

/**
 * @swagger
 * /marcas:
 *   get:
 *    summary: retorna todos los registros de marcas
 *    tags: [Marca]
 *    responses:
 *       200:
 *         description: Todas las marcas
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Marca'
 *       400:
 *         description: Error de petición
 *     
 */
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

/**
 * @swagger
 * /marcas:
 *    post:
 *      summary: crear un nuevo registro de marca
 *      tags: [Marca]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Marca'
 *      responses:
 *        200:
 *          description: Marca agregada correctamente
 *        400:
 *          description: Error de petición
 */
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

/**
 * @swagger
 * /marcas/{id}:
 *  put:
 *    summary: Actualizar un registro de marca
 *    tags: [Marca]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id de marca
 *    requestBody:
 *      description: Campos para actualizar un registro de marca
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Marca'
 *    responses:
 *       200:
 *         description: Marca actualizada correctamente
 *       400:
 *         description: Error de actualización
 */
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