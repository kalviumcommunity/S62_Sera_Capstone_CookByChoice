const express = require('express');
const router = express.Router();
const {createUser,GetAllUsers,GetUserById,UpdateUser} =require('../controllers/user.controller');



router.put('/:id',UpdateUser)
router.post('/register', createUser);
router.get('/', GetAllUsers);
router.get('/:id', GetUserById);

module.exports = router;
