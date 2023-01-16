import { request, response } from "express"
import { modelUser as Usuario } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';

//GET
export const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre, apikey, page = 10, limit } = req.query;
    const { limite = 5, desde = 1 } = req.query;

    //Condición de que liste loss usuarios con estado true
    const query = { status: true };

 

    //Desestructuración de arreglos
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde)-1)
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

//POST
export const usuariosPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = Usuario({ name, email, password, role });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en la DB
    await usuario.save();

    res.json(usuario);
}

//PUT
export const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body;

    //Validar con la base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json(usuario);
}

//DELETE
export const usuariosDelete = async(req, res = response) => {

    const id = req.params.id
    const usuario = await Usuario.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json(usuario)
}

//PATCH
export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}


