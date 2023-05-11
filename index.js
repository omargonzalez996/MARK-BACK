const express = require('express');
const app = express();
const swaggerSpec = require('./src/swagger')
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))

//Routes
app.use(require('./src/model/SQL/crud/brandCRUD'));
app.use(require('./src/model/SQL/crud/catCRUD'));
app.use(require('./src/model/SQL/crud/countryCRUD'));
app.use(require('./src/model/SQL/crud/prodCRUD'));
//Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})