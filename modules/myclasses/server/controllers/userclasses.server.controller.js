'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Userclasses = require(path.resolve('./modules/myclasses/server/models/userclasses.server.model')),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Update the user's classes
 */
 exports.updateclasses = function (req, res) {
   // Create a new model
   var newUserclasses = new Userclasses();
   var thisuserId = req.user._id;

   console.log("Request Body: " + req.body);

   // Set userId to the given userId
   newUserclasses.userId = req.body.userId; 
   
    // Create a new variable for the course and set its fields to the given values
    var newClass = {
      "classId": req.body._id,
      "courseCode": req.body.courseCode,
      "name": req.body.name
    };

    // Find the user. If user has no classes then save a new entry, else update their courses array
    Userclasses.findOneAndUpdate({userId: thisuserId}, {$push:{courses: newClass}}, {upsert: true}, function(err){
      if(err){
        console.log(err);
      } 
      else {
        console.log("Course added to user's classes: ");
        console.log(newClass);
      }
    });
 }

/**
 * Get user's classes
 */
 exports.getclasses = function(req, res) {
    console.log(req.user);
    var thisuserId = req.user._id;
    
    Userclasses.findOne({ userId: thisuserId }).exec(function (err, object) {
      console.log(object);
      res.json(object);
    });
 }


/**
 * Delete user's class
 */
 exports.deleteclass = function(req, res) {
    console.log(req.user);
    var thisuserId = req.user._id;

    // Search for the user, then remove the class from the user's courses array
    Userclasses.findOneAndUpdate({userId: thisuserId}, {$pull:{courses: req.body}}, function(err, object) {
      if(err){
        console.log(err);
      }
      else{
        res.json(object);
      }
    });
 }