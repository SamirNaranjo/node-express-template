const { response } = require("express");
const { Usuario } = require("../models");
const { ObjectId } = require('mongoose').Types;


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino='', res=response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [usuario] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{state:true}]
    });

    res.json({
        results: usuarios
    })

}

const buscar = async (req, res=response) =>{

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas}`
        })

    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
        
        break;
        case 'productos':

        break;

        default: 
            res.status(500).json({
                msg: 'Error en la bsuqueda'
            })

    }


}

module.exports = {
    buscar,
}