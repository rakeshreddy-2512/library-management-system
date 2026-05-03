const express = require('express');
const { issueBook, returnBook, listIssues, dashboardStats } = require('../controllers/issueController');
const { protect, permit } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listIssues);
router.get('/dashboard/stats', protect, permit('admin', 'librarian'), dashboardStats);
router.post('/', protect, permit('admin', 'librarian'), issueBook);
router.put('/:id/return', protect, permit('admin', 'librarian'), returnBook);

module.exports = router;
