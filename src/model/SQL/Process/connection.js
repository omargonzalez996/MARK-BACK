const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    /*
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT
    */
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'MARK',
})

mysqlConnection.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Conectado a DB MARK');
    }
})

module.exports = mysqlConnection;