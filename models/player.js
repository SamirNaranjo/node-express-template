const { Schema, model} = require("mongoose");

const PlayerSchema = Schema ({
    name: {
        type: String,
        require: [true, 'is required'],
    },
    password: {
        type: String,
        require: [true, 'the password is required'],
    },
    email: {
        type: String,
        require: [true, 'the email is required'],
        unique: true
    },
    position: {
        type: String,
        required: [true, 'Es requerida la posición']
    },
    img: {
        type: String,
    },
    attrs: {
        type: Array,
    },
    state: {
        type: Boolean,
        default: true,
    }
});