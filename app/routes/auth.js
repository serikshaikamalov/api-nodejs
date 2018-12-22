const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/auth.controller');

const passport       = require('passport');
const passportConfig = require('../../passport');
const passportLogin  = passport.authenticate('local', {session: false});
const passportGoogle = passport.authenticate('googleToken',{ session: false });
const passportFacebook = passport.authenticate('facebookToken',{ session: false });

router.post('/login', passportLogin, authController.localLogin);
router.post('/register', authController.register);
router.post('/google', passportGoogle, authController.googleOAuth)
router.post('/facebook', passportFacebook, authController.facebookOAuth)

module.exports = router;