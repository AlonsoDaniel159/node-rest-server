import { Router } from "express";
import { buscar } from "../controllers/buscar.controller.js";


export const router = new Router();


router.get('/:collecion/:termino', buscar)

