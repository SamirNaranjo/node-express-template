const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);

