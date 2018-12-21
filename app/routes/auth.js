const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/auth.controller');

const vkRoutes = require('../routes/social/vk');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.use('/vk', vkRoutes);

module.exports = router;