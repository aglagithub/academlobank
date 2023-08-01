const express = require('express');


const userController = require('./../controllers/user.controller');


const router = express.Router();

router.get('/', userController.findAllUsers);//To implement
router.post('/signup', userController.SignUpUser); 
router.post('/login', userController.logInUser); // To implement


router.route('/:id')
    .get(userController.findOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;