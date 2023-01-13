import { modelRole } from '../models/role.js';
import { modelUser } from '../models/usuario.js';
import mongoose from 'mongoose';

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

    if(mongoose.Types.ObjectId.isValid(id)) {
        const existeUsuario = await modelUser.findById( id );
        
        if (!existeUsuario) {
            throw new Error('No existe usuario con el id ingresado')
        }
    }
}