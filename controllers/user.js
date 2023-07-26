const { response } = require('express');

const getUser = (req, res = response) => {

    res.json({
        msg: 'Get Api -- Controller'
    });
}

const postUser = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'Post Api -- Controller',
        body
    });
}

const putUser = (req, res = response) => {

    res.json({
        msg: 'Put Api -- Controller'
    });
}

const patchUser = (req, res = response) => {

    res.json({
        msg: 'Patch Api -- Controller'
    });
}

const deleteUser = (req, res = response) => {

    res.json({
        msg: 'Delete Api -- Controller'
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}