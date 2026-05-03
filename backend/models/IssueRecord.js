const mongoose = require('mongoose');

const issueRecordSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: Date,
    fineAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['issued', 'returned'], default: 'issued' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('IssueRecord', issueRecordSchema);
