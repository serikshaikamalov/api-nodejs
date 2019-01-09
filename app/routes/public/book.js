const express        = require('express');
const router         = express.Router();
const bookController = require('../../controllers/book.controller');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getSingleBook);

module.exports = router;