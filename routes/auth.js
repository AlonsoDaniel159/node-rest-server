import { Router } from 'express';
import { body } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const router = new Router();

router.post('/login', [
    body('email', 'El correo es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    body('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);
