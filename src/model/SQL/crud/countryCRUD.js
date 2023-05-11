const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *      Pais:
 *         type: object
 *         properties:
 *              country_name:
 *                  type: string
 *                  description: el nombre del país
 *         required:
 *          - country_name
 *         example: 
 *          country_name: Alaska
 */

/**
 * @swagger
 * /paises:
 *   get:
 *    summary: retorna todos los registros de pais
 *    tags: [Pais]
 *    responses:
 *       200:
 *         description: Todos los países
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Pais'
 *       400:
 *         description: Error de petición
 *     
 */

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

/**
 * @swagger
 * /paises:
 *    post:
 *      summary: crear un nuevo registro de país
 *      tags: [Pais]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Pais'
 *      responses:
 *        200:
 *          description: País agregado correctamente
 *        400:
 *          description: Error de petición
 */

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

/**
 * @swagger
 * /paises/{id}:
 *  put:
 *    summary: Actualizar un registro de país
 *    tags: [Pais]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id de país
 *    requestBody:
 *      description: Campos para actualizar un registro de país
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Pais'
 *    responses:
 *       200:
 *         description: País actualizado correctamente
 *       400:
 *         description: Error de actualización
 */
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