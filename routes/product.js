import { Router } from 'express';
import { body, param } from 'express-validator';
import { create, findAll, findById, remove, update } from '../controllers/product.controller.js';
import { existeCategoriaPorId, existeProductoPorId, existeProductoPorNombre } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRole } from '../middlewares/validar-roles.js';

export const router = new Router();

//{{url}}/api/products


//Obtener todos los productos - público
router.get('/', findAll)

//Obtener un producto por id - público
router.get('/:id', [
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeProductoPorId),
    validarCampos
], findById)

//Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('category','El id de la categoría es obligatorio').not().isEmpty(),
    body('category', 'No es un ID válido').isMongoId(),
    body('name',).custom(existeProductoPorNombre),
    body('category').custom(existeCategoriaPorId),
    validarCampos
], create)

//Actualizar producto - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    // tieneRole('ADMIN_ROLE'),
    param('id', 'No es un ID válido').isMongoId(),
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    // body('category', 'No es un ID de categoría válido').isMongoId(),
    param('id').custom(existeProductoPorId),
    body('name',).custom(existeProductoPorNombre),
    // body('category').custom(existeCategoriaPorId),
    validarCampos
], update)

//Borrar producto - privado - Solo admin puede realizar la acción
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeProductoPorId),
    validarCampos                      
], remove) 


