const Role = require('../models/role');
const { Categoria, Usuario, Producto} = require('../models/');


const esRoleValido = async (role = '') => {

    const existeRol = await Role.findOne({role});
    if ( !existeRol ){
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
    
}

const emailExiste = async (email = '') => {

    const existEmail = await Usuario.findOne({ email });
    if ( existEmail ) {
        throw new Error(`El Email : ${email}, ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUser = await Usuario.findById(id);
    if (!existeUser) {
        throw new Error (`El id no exite: ${id}`);
    }
}

const existeCategoriaPorId = async (id) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error (`El id no existe: ${id}`);
    }

}

const existeProductoPorId = async (id) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error (`El id no existe: ${id}`);
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId, 
    existeCategoriaPorId,
    existeProductoPorId
}