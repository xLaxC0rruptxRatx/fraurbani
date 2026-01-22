// models/Comment.js
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', commentSchema)