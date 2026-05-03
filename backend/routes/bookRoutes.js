const express = require('express');
const { listBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, permit } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listBooks);
router.post('/', protect, permit('admin', 'librarian'), createBook);
router.put('/:id', protect, permit('admin', 'librarian'), updateBook);
router.delete('/:id', protect, permit('admin'), deleteBook);

module.exports = router;
