const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');


const getUser = async (req, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { state: true}
    // const usuarios = await Usuario.find()
    //     .skip(Number (desde) )
    //     .limit(Number (limite) );

    // const total = await Usuario.countDocuments(query)

    const [ total, usuarios ] = await Promise.all ([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number (desde) )
            .limit(Number (limite) )
    ]);
    
    res.json({
        total,
        usuarios
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



const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    //Borrado Fisico de la bbdd
    // const usuario = await Usuario.findbyIdAndDelete(id);
    
    
    // Se elimina el usuario por state y no directamente de la bbdd
    const usuario = await Usuario.findByIdAndUpdate(id, { state: false});


    res.json({
        usuario,

    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}