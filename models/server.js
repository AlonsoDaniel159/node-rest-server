import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config.js';
import { router as routerUser } from '../routes/user.js';
import { router as routerAuth } from '../routes/auth.js';
import { router as routerCategory } from '../routes/category.js';
import { router as routerProduct } from '../routes/product.js';
import { router } from '../routes/buscar.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            buscar: '/api/buscar'
        }
 

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
        this.app.use( this.paths.auth , routerAuth);
        this.app.use( this.paths.users , routerUser);
        this.app.use( this.paths.categories , routerCategory);
        this.app.use( this.paths.products , routerProduct );
        this.app.use( this.paths.buscar , router );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


