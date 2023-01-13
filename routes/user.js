import { Router } from 'express';
import { check } from 'express-validator';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/user.controller.js';
import { emailExiste, esRoleValido, exiteUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const router = new Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

