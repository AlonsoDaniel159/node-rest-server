import { request, response } from "express"
import JWT from "jsonwebtoken"
import { modelUser } from "../models/usuario.js";


export const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = JWT.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await modelUser.findById(uid);

        //Verificar que usuario existe
        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            })        
        }


        //Verificar si uid tiene estado en true
        if ( !usuario.status ) {
            return res.status(401).json({
                msg: 'Token no válido - status - false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}