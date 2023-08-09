const { Router } = require('express');
const { check } = require('express-validator');


const { getUser, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')


const { esRoleValido, 
        emailExiste, 
        existeUsuarioPorId } = require('../helpers/db-validators');




const router = Router();

router.get('/', getUser);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 caracteres').isLength({min:6}),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailExiste),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
] ,postUser);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos

], putUser);

router.patch('/', patchUser);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
    
] ,deleteUser);



module.exports = router;
