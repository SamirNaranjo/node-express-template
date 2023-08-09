const { response } = require('express');

const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) {

        return res.status(500).json ({
            msg: ' Se requiere verificar el role sin validar el token primero'
        });
    }

    const { role, name } = req.usuario;

    if ( role !== 'ADMIN_ROLE') {
        return res.status(401).json ({
            msg: ` ${ name } no es admin - no puede realizar esta accion`
        });
    }

    next();
}

const tieneRole = (...role) => {

    return (req, res = response, next) => {
        
        if ( !req.usuario ) {

            return res.status(500).json ({
                msg: ' Se requiere verificar el role sin validar el token primero'
            });
        }

        if (!role.includes (req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ role }`
            });
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}