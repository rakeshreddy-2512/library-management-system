const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    totalCopies: { type: Number, required: true, min: 1 },
    availableCopies: { type: Number, required: true, min: 0 },
    shelfLocation: { type: String, trim: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
