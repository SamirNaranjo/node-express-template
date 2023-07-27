const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const getUser = (req, res = response) => {

    res.json({
        msg: 'Get Api -- Controller'
    });
}

const postUser = async(req, res = response) => {

    const { name, email, password, role} = req.body;
    const usuario = new Usuario({name, email, password, role});

    // Verificar si el correo existe
    const existEmail = await Usuario.findOne({ email });
    if ( existEmail ) {
        return res.status(400).json({
            msg: 'El Email ya existe'
        })
    }


    // encriptacion del password 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save()

    res.json({
        usuario
    });
}

const putUser = (req, res = response) => {

    res.json({
        msg: 'Put Api -- Controller'
    });
}

const patchUser = (req, res = response) => {

    res.json({
        msg: 'Patch Api -- Controller'
    });
}

const deleteUser = (req, res = response) => {

    res.json({
        msg: 'Delete Api -- Controller'
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}