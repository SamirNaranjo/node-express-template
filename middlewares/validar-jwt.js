const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async (req, res = response, next) => {

    const  token = req.header('x-token');

    if (!token) {
        return res.status(401).json ({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        // Leer usuario que corresponde al uid
        const usuario = await Usuario.findById (uid);

        //verificar si el user existe en la DB
        if (!usuario) {
            return res.status(401).json({
                msg: 'Invalid token - User not exist in database'
            })
        }
        // Verificar si el uid tiene estado true
        if ( !usuario.state ) {
            return res.status(401).json ({
                msg: 'Invalid token - User with state false'
            });
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json ({
            msg:'Token invalido'
        })
        
    }

    console.log(token);

    


}

module.exports = {
    validarJWT
}