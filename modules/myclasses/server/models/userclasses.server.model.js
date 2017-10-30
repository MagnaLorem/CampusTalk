'use strict';

//import {MyclassSchema} from './myclass.server.model';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var Myclass = mongoose.model('Myclass');

/**
 * Myclass Schema
 */
var UserclassesSchema = new Schema({
  /* your code here */
  	userId: {type: String},
    courses: [{"type": Schema.Types.ObjectId, "ref": "Myclass"}]
});

var Userclasses = mongoose.model('Userclasses', UserclassesSchema);
module.exports = Userclasses;
