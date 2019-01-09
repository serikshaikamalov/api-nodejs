const express           = require('express');
const router            = express.Router();

/**
 * PUBLIC ROUTES
 */
const publicUsersRoutes = require('../../routes/public/user');
const publicBooksRoutes = require('../../routes/public/book');


router.use('/users', publicUsersRoutes);
router.use('/books', publicBooksRoutes);

module.exports = router;