const { check } = require('express-validator');

const { Router } = require('express');


const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users','productos'])),
    validarCampos
], actualizarImagen);

module.exports = router;