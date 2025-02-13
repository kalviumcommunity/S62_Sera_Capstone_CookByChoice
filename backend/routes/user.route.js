const express = require('express');
const router = express.Router();
const {createUser,GetAllUsers,GetUserById,UpdateUser,signup,login} =require('../controllers/user.controller');



router.put('/:id',UpdateUser)
router.post('/register', createUser);
router.get('/', GetAllUsers);
router.get('/:id', GetUserById);
router.post("/login", login);
router.post("/signup", signup);



module.exports = router;
