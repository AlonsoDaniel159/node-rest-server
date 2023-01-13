import { request, response } from "express"

//GET
export const usuariosGet = (req = request, res = response) => {

    const { q, nombre, apikey, page = 10, limit } = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

//PUT
export const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    })
}

//POST
export const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

//DELETE
export const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    })
}

//PATCH
export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}


