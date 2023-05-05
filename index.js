const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());
//Routes
app.use(require('./src/model/SQL/crud/brandCRUD'));
app.use(require('./src/model/SQL/crud/catCRUD'));
app.use(require('./src/model/SQL/crud/countryCRUD'));
app.use(require('./src/model/SQL/crud/prodCRUD'));
//Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})