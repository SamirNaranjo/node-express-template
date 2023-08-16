const { response }= require('express');
const { Producto } = require('../models');


// Obtener Producto - paginado - total - populate

const obtenerProductos = async (req, res=response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true};

    const [ total, productos ] = await Promise.all ([

        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'name')
            .populate('categoria', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    })


}

const obtenerProducto = async(req, res=response) => {

    const {id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'name')
        .populate('categoria', 'name');

        res.json(producto);

}

const crearProducto = async(req, res=response) => {

    const{ state, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ name: body.name });

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${ productoDB.name } ya existe`
        })
    }

    // Generacion de la data a guardar

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = await new Producto( data )

    await producto.save()
    res.status(201).json(producto);

}

const actualizarProducto = async (req, res=response) => {

    const { id } = req.params;
    const { state, usuario,...data }= req.body;

    if(data.name){
        data.name = data.name.toUpperCase();
    }

    data.usuario = req.usuario._id;
    

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});
    res.status(201).json(producto);

}

const borrarProducto = async (req, res=response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {state: false}, {new:true});

    res.status(200).json(productoBorrado);


}

module.exports ={
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}