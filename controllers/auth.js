const { response } = require('express');
const Usuario = require('../models/usuario');
const  bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne ({ email });
        if ( !usuario ){
            return res.status(400).json ({
                msg: 'Usuario / Password is not correct - email'
            })
        }


        // Si el usuario esta activo
        if ( !usuario.state ){
            return res.status(400).json ({
                msg: 'Usuario / Password is not correct - state: False'
            })
        }

        
        // verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password is not correct - Password is incorrect'
            });
        }
        // generar JWT 
        const token = await generarJWT( usuario.id )

        res.json ({
           usuario,
           token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json ({
            msg: 'Comuniquese con el admin'
        })
    }


}

module.exports = {
    login
}