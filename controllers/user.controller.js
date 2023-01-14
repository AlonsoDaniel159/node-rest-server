import { request, response } from "express"
import { modelUser } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';

//GET
export const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre, apikey, page = 10, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    // const usuarios = await modelUser.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));;

    // const total = await modelUser.countDocuments(query);


    //Desestructuración de arreglos
    const [ total, usuarios ] = await Promise.all([
        modelUser.countDocuments(query),
        modelUser.find(query)
            .skip(Number(desde))
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
    const usuario = modelUser({ name, email, password, role });

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

    const usuario = await modelUser.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

//DELETE
export const usuariosDelete = async(req, res = response) => {

    const id = req.params.id
    const usuario = await modelUser.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json(usuario)
}

//PATCH
export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}


