'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Myclass Schema
 */
var MyclassSchema = new Schema({
  /* your code here */
    courseCode: {type: String, required: true},
    name: {type: String, required: true}
});

mongoose.model('Myclass', MyclassSchema);
