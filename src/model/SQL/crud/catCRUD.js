const express = require('express');
const router = express.Router();

const connection = require('../Process/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *      Categoria:
 *         type: object
 *         properties:
 *              cat_name:
 *                  type: string
 *                  description: el nombre de la categoria
 *         required:
 *          - cat_name
 *         example: 
 *          cat_name: Herramientas
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *    summary: retorna todos los registros de categorias
 *    tags: [Categoria]
 *    responses:
 *       200:
 *         description: Todas las categorias
 *         content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Error de petición
 *     
 */
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


/**
 * @swagger
 * /categorias:
 *    post:
 *      summary: crear un nuevo registro de categoria
 *      tags: [Categoria]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Categoria'
 *      responses:
 *        200:
 *          description: Categoria agregada correctamente
 *        400:
 *          description: Error de petición
 */

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

/**
 * @swagger
 * /categorias/{id}:
 *  put:
 *    summary: Actualizar un registro de categoria
 *    tags: [Categoria]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: el id de categoria
 *    requestBody:
 *      description: Campos para actualizar un registro de categoria
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Categoria'
 *    responses:
 *       200:
 *         description: Categoria actualizada correctamente
 *       400:
 *         description: Error de actualización
 */
router.put('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = `UPDATE Categorias SET cat_name=? WHERE cat_id=${id}`
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