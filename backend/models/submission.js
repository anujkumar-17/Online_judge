// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  email: { type: String, required: true }, // Store user email instead of user ID
  code: { type: String, required: true },
  status: { type: String, required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', submissionSchema);
