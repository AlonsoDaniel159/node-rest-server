import { response } from "express";
import { modelCategory as Categoria } from "../models/category.js";
import { modelProduct as Producto } from "../models/producto.js";


//Obtener Categorías - paginado - total - populate
export const findAll = async (req, res = response) => {

    const { limite = 5, desde = 1 } = req.query;

    //Condición de que liste los productos con estado true
    const query = { status: true };

    //Paginado
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(desde) - 1)
            .limit(Number(limite))
    ]);

    //Respuesta
    res.json({
        total,
        productos
    })
}

//Obtener Categoría - populate {}
export const findById = async (req, res = response) => {

    const id = req.params.id;

    //Condición de que liste los productos con estado true
    // const query = { status: true };

    const producto = await Producto.findById(id)
                        .populate('user', 'name')
                        .populate('category', 'name');

    res.json(producto)
}

//Crear Producto 
export const create = async (req, res = response) => {

    const { status, user, ...body } = req.body;

    //Generar data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.usuario._id
    }

    const producto = new Producto(data);

    //Guardar db
    await producto.save();

    res.status(201).json(producto);

}

//Actualizar Categoría
export const update = async (req, res = response) => {

    const id = req.params.id;
    const { status, user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//Borrar Categoría (borrado lógico)
export const remove = async (req, res = response) => {

    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json(producto);
}
