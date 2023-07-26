const { Router } = require('express');
const { getUser, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');


const router = Router();

router.get('/', getUser);
router.post('/', postUser);
router.put('/', putUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);



module.exports = router;
