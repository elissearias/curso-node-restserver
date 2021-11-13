const express = require('express')
const cors = require('cors');

class Server {

    constructor () {
        this.app = express ();
        this.port = process.env.PORT;

        //rutas que dispone mi server
        this.usuariosPath = '/api/usuarios';


        //Funciones que añaden otra funcionalidad a mi webserver
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares () {

        //cors
        this.app.use(cors());

        //Directorio público
        this.app.use(express.static('public'));
    
        //Lectura y parseo del body 
        this.app.use(express.json ());
    }

    routes () {
        //configuración del path
        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}

module.exports = Server;