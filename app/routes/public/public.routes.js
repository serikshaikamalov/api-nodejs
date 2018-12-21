const express           = require('express');
const router            = express.Router();

/**
 * PUBLIC ROUTES
 */
const publicUsersRoutes = require('../../routes/public/user');

router.use('/users', publicUsersRoutes);

module.exports = router;