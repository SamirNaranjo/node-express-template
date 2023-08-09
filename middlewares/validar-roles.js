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

module.exports = {
    esAdminRole
}