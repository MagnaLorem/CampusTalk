'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * News Schema
 */
var NewsSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill News title',
    trim: true
  },
  content: {
      type: String,
      default: '',
      required: 'Please fill News content body',
      trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('News', NewsSchema);
