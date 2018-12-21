const express        = require('express');
const router         = express.Router();
const userController = require('../../controllers/user.controller');
const fileController = require('../../controllers/file.controller');
const passport       = require('passport');
const passportConfig = require('../../../passport');

const passportJWT    = passport.authenticate('jwt', { session: false });

router.get('/', passportJWT  ,userController.getUsers);
router.get('/:id', userController.getSingleUser);
router.post('/add', fileController.any(), userController.AddUser );
router.post('/update/:id', fileController.any(), userController.UpdateUser);
router.post('/delete/:id', userController.DeleteUser)

module.exports = router;