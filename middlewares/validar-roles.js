import { request, response } from "express";


export const esAdminRole = (req = request, res = response, next) => {
    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token primero'
        })
    }

    const { role, name } = req.usuario;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} no es administrador, no puede hacer esto`
        })
    }

    next();
}

export const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {

        if( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin verificar el token primero'
            })
        }

        if(!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio uno de estos roles ${roles}`
            })
        }

        next();
    }

}