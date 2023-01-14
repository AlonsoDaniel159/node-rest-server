import { Router } from 'express';
import { body, check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerAuth = new Router();

routerAuth.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

routerAuth.post('/google', [
    body('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);
