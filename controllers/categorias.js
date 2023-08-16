const { response } = require("express")
const { Categoria, Usuario } = require('../models')



// ObtenerCategorias - paginado - total - populate

const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [ total, categorias ] = await Promise.all ([

        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'name')
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        categorias
    })


}


const obtenerCategoria = async (req, res=response) => {


    const { id }= req.params;
    const categoria = await Categoria.findById( id )
        .populate('usuario', 'name');

    res.json( categoria );


}

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

const actualizarCategoria = async (req, res= response) => {


    const { id } = req.params;
    const { state, usuario, ...data } = req.body;
    
    data.name = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new:true});
    res.json(categoria);


}

const borrarCategoria = async (req, res=response) => {


    const  { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { state: false}, {new:true});

    res.json(categoriaBorrada);

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}