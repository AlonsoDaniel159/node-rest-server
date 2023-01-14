import { response } from "express"
import { modelUser } from "../models/usuario.js";
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.js";

export const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await modelUser.findOne({email});
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos -correo'
            })
        } 

        //Verificar si el usuario está activo
        if( !usuario.status ) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos -estado:false'
            })
        } 

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password , usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos -password'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }

}