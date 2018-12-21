const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/auth.controller');
const vkRoutes       = require('../routes/social/vk');

const passport       = require('passport');
const passportConfig = require('../../passport');
const passportLogin  = passport.authenticate('local', {session: false});
const passportGoogle = passport.authenticate('googleToken',{ session: false });

router.post('/login', passportLogin, authController.localLogin);
router.post('/register', authController.register);
router.post('/google', passportGoogle, authController.googleOAuth)
// router.use('/vk', vkRoutes);

module.exports = router;