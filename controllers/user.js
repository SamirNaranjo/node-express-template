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


    // encriptacion del password 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save()

    res.json({
        usuario
    });
}

const putUser = async (req, res = response) => {

    const { id } =  req.params;
    const { _id, password, google, email, ...resto} = req.body;

    // TODO validar contra bbdd

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario =  await Usuario.findByIdAndUpdate( id, resto );


    res.json(usuario);
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