import { modelRole } from '../models/role.js';
import { modelUser } from '../models/usuario.js';
import mongoose from 'mongoose';
import { modelCategory as Categoria } from '../models/category.js';
import { modelProduct as Producto } from '../models/producto.js';

export const esRoleValido = async (role = '') => {
    const existeRole = await modelRole.findOne({ role });
    if (!existeRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

//Verificar si el correo existe
export const emailExiste = async (email = '') => {
    const existeEmail = await modelUser.findOne({ email });
    if (existeEmail) {
        throw new Error('Ese correo ya está registrado')
    }
}

//Verificar si el usuario con id existe
export const exiteUsuarioPorId = async (id) => {

    if (mongoose.Types.ObjectId.isValid(id)) {
        const existeUsuario = await modelUser.findById(id);

        if (!existeUsuario) {
            throw new Error('No existe usuario con el id ingresado')
        }
    }
}

//Verificar la categoría con id existe
export const existeCategoriaPorId = async (id) => {

    if (mongoose.Types.ObjectId.isValid(id)) {
        const existeCategoria = await Categoria.findById(id);

        if (!existeCategoria) {
            throw new Error('No existe categoría con el id ingresado')
        }
    }
}

//Verificar la categoría con nombre existe
export const existeCategoriaPorNombre = async (name) => {

    if( name.length>0 ){
        name = name.toUpperCase();
        const existeCategoria = await Categoria.findOne({name});
    
        if (!existeCategoria) {
            throw new Error('No existe categoría con el nombre ingresado')
        }
    }

}


//Verificar la categoría con id existe
export const existeProductoPorId = async (id) => {

    if (mongoose.Types.ObjectId.isValid(id)) {
        const existeProducto = await Producto.findById(id);

        if (!existeProducto) {
            throw new Error('No existe producto con el id ingresado')
        }
    }
}

//Verificar producto con nombre existe
export const existeProductoPorNombre = async (name) => {

    if(name) {
        name = name.toUpperCase();
        const existeProducto = await Producto.findOne({name});

        if (existeProducto) {
            throw new Error('Ya existe producto con el nombre ingresado')
        }
    }
    
}