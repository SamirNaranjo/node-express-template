const Role = require('../models/role');
const Usuario = require('../models/usuario');


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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId, 
}