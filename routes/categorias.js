const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, esAdminRole } = require('../middlewares');
const { crearCategoria,
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();


/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categoria por Id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo Vàlido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,obtenerCategoria);

// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],borrarCategoria);



module.exports = router;