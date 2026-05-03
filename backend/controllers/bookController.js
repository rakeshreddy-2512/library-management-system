const Book = require('../models/Book');

const listBooks = async (req, res) => {
  const { q, category } = req.query;
  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { author: { $regex: q, $options: 'i' } },
      { isbn: { $regex: q, $options: 'i' } }
    ];
  }

  if (category) filter.category = category;

  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json(books);
};

const createBook = async (req, res) => {
  const payload = req.body;
  payload.availableCopies = payload.totalCopies;
  const book = await Book.create(payload);
  res.status(201).json(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const next = req.body;
  const issuedCount = book.totalCopies - book.availableCopies;
  Object.assign(book, next);

  if (next.totalCopies !== undefined) {
    book.availableCopies = Math.max(0, next.totalCopies - issuedCount);
  }

  const updated = await book.save();
  res.json(updated);
};

const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};

module.exports = { listBooks, createBook, updateBook, deleteBook };
