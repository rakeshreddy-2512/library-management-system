const IssueRecord = require('../models/IssueRecord');
const Book = require('../models/Book');
const calculateFine = require('../utils/fineCalculator');

const issueBook = async (req, res) => {
  const { bookId, memberId, dueDate } = req.body;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.availableCopies < 1) return res.status(400).json({ message: 'No copies available' });

  book.availableCopies -= 1;
  await book.save();

  const record = await IssueRecord.create({
    book: bookId,
    member: memberId,
    issuedBy: req.user.id,
    dueDate
  });

  res.status(201).json(record);
};

const returnBook = async (req, res) => {
  const record = await IssueRecord.findById(req.params.id);
  if (!record || record.status === 'returned') {
    return res.status(404).json({ message: 'Issue record not found or already returned' });
  }

  const returnedOn = new Date();
  const finePerDay = Number(process.env.FINE_PER_DAY || 2);
  const fineAmount = calculateFine(record.dueDate, returnedOn, finePerDay);

  record.status = 'returned';
  record.returnDate = returnedOn;
  record.fineAmount = fineAmount;
  await record.save();

  const book = await Book.findById(record.book);
  if (book) {
    book.availableCopies += 1;
    await book.save();
  }

  res.json(record);
};

const listIssues = async (_req, res) => {
  const records = await IssueRecord.find()
    .populate('book', 'title author isbn')
    .populate('member', 'name email')
    .populate('issuedBy', 'name')
    .sort({ createdAt: -1 });

  res.json(records);
};

const dashboardStats = async (_req, res) => {
  const [totalBooks, totalIssued, overdue, totalFines] = await Promise.all([
    Book.countDocuments(),
    IssueRecord.countDocuments({ status: 'issued' }),
    IssueRecord.countDocuments({ status: 'issued', dueDate: { $lt: new Date() } }),
    IssueRecord.aggregate([{ $group: { _id: null, total: { $sum: '$fineAmount' } } }])
  ]);

  res.json({
    totalBooks,
    totalIssued,
    overdue,
    totalFines: totalFines[0]?.total || 0
  });
};

module.exports = { issueBook, returnBook, listIssues, dashboardStats };
