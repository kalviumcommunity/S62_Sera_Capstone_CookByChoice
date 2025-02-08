const express = require('express');
const router = express.Router();
const {createUser,GetAllUsers,GetUserById} =require('../controllers/user.controller');



router.post('/register', createUser);
router.get('/', GetAllUsers);
router.get('/:id', GetUserById);

module.exports = router;
