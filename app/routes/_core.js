const express        = require('express');
const router         = express.Router();
const coreController = require('../controllers/core.controller');

router.all('*', coreController.isUserAuthenticated);

module.exports = router;