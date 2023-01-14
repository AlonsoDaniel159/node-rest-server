import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller.js';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/user.controller.js';
import { emailExiste, esRoleValido, exiteUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerAuth = new Router();

routerAuth.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);
