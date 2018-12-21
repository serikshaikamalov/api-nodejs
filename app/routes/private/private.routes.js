const express           = require('express');
const router            = express.Router();

/**
 * Private ROUTES
 */
const privateUserRoutes = require('../../routes/private/user');

router.use('/users', privateUserRoutes);

module.exports = router;