const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  pid: {
    type: Number,
    required: true,
  },
  pName: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: false,
  },
  sampleOutput: {
    type: String,
    required: false,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  tags: {
    type: [String],
    required: false,
  },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = { Question };
