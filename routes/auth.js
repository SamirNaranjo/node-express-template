const { check } = require('express-validator');

const { Router } = require('express');


const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'El Correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'Es necesarion un ID_TOKEN').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;