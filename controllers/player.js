const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Player = require('../models/player');

const getPlayer = (req, res = responde) => {

    res.json ({
        msg: 'Get Api -- Controller: '
    });

}

const postPLayer = async (req, res = respond )=> {

    const {name, email, position, password} = req.body; 
    const player = new Player({name, email, position,password});

    // Verificacion de Email
    // TODO:
}   