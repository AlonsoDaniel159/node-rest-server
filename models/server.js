import express from 'express';
import cors from 'cors';
import { router } from '../routes/user.js';
import { dbConnection } from '../database/config.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middelwares();

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middelwares() {

        //CORS
        this.app.use(cors());

        //Parseo y lecutar del body (JSON)
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use( this.usersPath , router);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


