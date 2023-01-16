import { response } from "express";
import { modelCategory as Categoria} from "../models/category.js";


//Obtener Categorías - paginado - total - populate
export const findAll = async(req, res = response) => {

    const { limite = 5, desde = 1 } = req.query;

    //Condición de que liste las categorías con estado true
    const query = { status: true };

    //Paginado
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('user', 'name')
            .skip(Number(desde)-1)
            .limit(Number(limite))
    ]);

    //Respuesta
    res.json({
        total,
        categorias
    })
}

//Obtener Categoría - populate {}
export const findById = async(req, res = response) => {

    const id = req.params.id;

    //Condición de que liste las categorías con estado true

    const categoria = await Categoria.findById(id).populate('user','name');
    

    res.json(categoria)
}

//Crear Categoría 
export const create = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({name});

    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.name} ya existe`
        })
    }

    //Generar data a guardar
    const data = {
        name,
        user: req.usuario._id
    }

    const categoria = new Categoria( data );

    //Guardar db
    await categoria.save();

    res.status(201).json(categoria);

}

//Actualizar Categoría
export const update = async (req, res = response) => {

    const id = req.params.id;
    const { status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.usuario._id;
    
    const categoriaDB = await Categoria.findOne({name: data.name});

    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.name} ya existe`
        })
    }
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria);
}

//Borrar Categoría (borrado lógico)
export const remove = async (req, res = response) => {

    const id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json(categoria);
}
