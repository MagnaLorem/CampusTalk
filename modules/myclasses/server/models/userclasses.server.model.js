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
  /* Schema which holds the user's id and the course's info */
  	userId: {type: String},
    courses: [{
    	classId: {type: Schema.Types.ObjectId},
    	classCode: {type: String},
    	className: {type: String}
	}]
});

var Userclasses = mongoose.model('Userclasses', UserclassesSchema);
module.exports = Userclasses;
