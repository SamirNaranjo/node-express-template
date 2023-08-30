const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");


const cargarArchivo = async (req, res=response) => {

    try {

        const nombre = await subirArchivo(req.files);
        res.json({nombre});

    } catch (msg) {
        res.status(400).json({msg});
    }
}

const actualizarImagen = async (req, res=response) => {
    
    const {id , coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }    
        break;

        case 'productos':
            modelo =  await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe el producto con el id ${ id }`
                });
            }
        break;

        default:
            return res.status(500).json({ msg: 'No se encuentra validado'});
    }

    const nombre = await subirArchivo ( req.files, undefined , coleccion);
    modelo.img = nombre;
    //console.log(req.files);
    await modelo.save();


    res.json(modelo);


}

module.exports = {
    cargarArchivo,
    actualizarImagen
}