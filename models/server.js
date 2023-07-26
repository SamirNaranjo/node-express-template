const express = require('express');
const cors = require('cors');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        // middleware
        this.middleware();

        // Rutas de la aplicacion
        this.routes();
    }

    middleware(){
        
        // CORS
        this.app.use( cors());
        
        // lectura y Parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));
        
    }


    routes() {
        this.app.use(this.userPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('servidor corriedo en puerto', this.port);
        })
    }
}

module.exports = Server;