const express = require('express');
const router = express.Router();
const vkController = require('../../controllers/vk.controller')

router.get('/', vkController.getCode);
router.get('/token', vkController.getToken);

module.exports = router;