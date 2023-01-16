import { Router } from 'express';
import { body, param } from 'express-validator';
import { create, findAll, findById, remove, update } from '../controllers/category.controller.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole, tieneRole } from '../middlewares/validar-roles.js';

export const router = new Router();

//{{url}}/api/categories


//Obtener todas las categorias - público
router.get('/', findAll)

//Obtener una categoría por id - público
router.get('/:id', [
    param('id', 'No es un ID válido').isMongoId(),
    validarCampos
], findById)

//Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], create)

//Actualizar categoría - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    // tieneRole('ADMIN_ROLE'),
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('name', 'id').custom(exitesCategoriaNombre),
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeCategoriaPorId),
    validarCampos
], update)

//Borrar categoría - privado - Solo admin puede realizar la acción
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeCategoriaPorId),
    validarCampos                      
], remove) 


