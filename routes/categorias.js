const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias');

const router = Router();


/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/')

// Obtener una categoria por Id - publico
router.get('/:id');

// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id');

// Borrar una categoria - Admin
router.delete('/:id');



module.exports = router;