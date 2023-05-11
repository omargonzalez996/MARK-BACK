const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MARK-CRUD",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [
        'src/model/SQL/crud/brandCRUD.js',
        'src/model/SQL/crud/catCRUD.js',
        'src/model/SQL/crud/countryCRUD.js',
        'src/model/SQL/crud/prodCRUD.js'
    ]

}
module.exports = swaggerSpec;
