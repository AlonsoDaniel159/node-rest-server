import { response } from "express";
import  mongoose from "mongoose";
import { modelUser as Usuario } from "../models/usuario.js";
import { modelCategory as Categoria } from "../models/category.js";
import { modelProduct as Producto } from "../models/producto.js";

const collecionesPermitidas = [
    'categories',
    'products',
    'roles',
    'users'
];

const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoId = mongoose.Types.ObjectId.isValid( termino );

    if( esMongoId ) {
        const usuario = await Usuario.findById( termino );
    
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: usuarios 
    })
}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoId = mongoose.Types.ObjectId.isValid( termino );

    if( esMongoId ) {
        const categoria = await Categoria.findById( termino );
    
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find( {name: regex, status: true} );
    console.log(categorias);

    res.json({
        results: categorias 
    })
}

const buscarProducto = async( termino = '', res = response ) => {


    const esMongoId = mongoose.Types.ObjectId.isValid( termino );

    if( esMongoId ) {
        const producto = await Producto.findById( termino ).populate('category', 'name');
    
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find( {name: regex, status: true} ).populate('category', 'name');;
    // const productos = await Producto.find( {category: ObjectId(id_categoria)} );;
    

    res.json({
        results: productos 
    })
}

export const buscar = (req, res = response) => {

    const { collecion, termino } = req.params;

    if (!collecionesPermitidas.includes(collecion)) {
        return res.status(400).json({
            msg: `Las colleciones permitidas son: ${collecionesPermitidas}`
        })
    }

    switch (collecion) {
        case 'users':
            buscarUsuarios(termino, res)
            break;
        case 'categories':
            buscarCategorias(termino, res)
            break;
        case 'products':
            buscarProducto(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta búsqueda'
            })
    }
}