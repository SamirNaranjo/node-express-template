const { response } = require("express")
const { Categoria } = require('../models')



const crearCategoria =  async ( req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({ name });

    if (categoriaDB) {
        return res.status(400).json ({
            msg: ` La Categoria ${ categoriaDB.name }, ya existe`
        })
    }

    // Generar la data a guardar 
    
    const data = {
        name,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria( data );

    await categoria.save()

    res.status(201).json(categoria);

}

module.exports = {
    crearCategoria
}