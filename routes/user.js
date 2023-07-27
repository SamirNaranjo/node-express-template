const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { getUser, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/', getUser);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 caracteres').isLength({min:6}),
    check('email', 'El email no es valido').isEmail(),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(async(role = '') => {
        const existeRol = await Role.findOne({role});
        if ( !existeRol ){
            throw new Error(`El rol ${role} no esta registrado en la BD`);
        }
    }),
    validarCampos
] ,postUser);
router.put('/', putUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);



module.exports = router;
