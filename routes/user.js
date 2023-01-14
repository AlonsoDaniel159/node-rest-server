import { Router } from 'express';
import { body, param } from 'express-validator';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/user.controller.js';
import { emailExiste, esRoleValido, exiteUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole, tieneRole } from '../middlewares/validar-roles.js';

export const router = new Router();

router.get('/', usuariosGet);

router.put('/:id', [
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(exiteUsuarioPorId),
    body('role').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/', [
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password debe tener más de 6 letras').isLength({min: 6}),
    body('email', 'El correo no es válido').isEmail(),
    body('email').custom(emailExiste),
    body('role').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(exiteUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

