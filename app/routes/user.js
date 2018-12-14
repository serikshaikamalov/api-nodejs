const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers);
router.get('/:id', userController.getSingleUser);
router.post('/add', userController.AddUser );
router.post('/update/:id', userController.UpdateUser);
router.post('/delete/:id', userController.DeleteUser)

module.exports = router;