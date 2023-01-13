import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/user.controller.js';

export const router = new Router();

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

