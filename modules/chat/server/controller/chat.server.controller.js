var path = require('path'),
    mongoose = require('mongoose'),
    chatData = require('../models/chat.server.model.js'),
    path = require('path'),
    config = require(path.resolve('./config/config')), /** not being used for now**/
    User = mongoose.model('User'),
    request = require('request'),
    connect = require('connect');
/*object for chat data */
var newChatData;

exports.savechat = function(req, res) {

  newChatData = new chatData();
  newChatData.classID = req.body.classID;
  var newMessage = {
    username: req.body.username, 
    message: req.body.message,
    profileImageURL: req.body.profileImageURL,
    created: req.body.created
  }

  //upsert cretes new class if the classID does not exist.
  //if classID is found, then update it based on the given condition which is $push:{messages:newMessage} 
  chatData.findOneAndUpdate({'classID':req.body.classID},{$push:{messages:newMessage}},{upsert:true},
    function(err,req){
      if (err) {
        console.log(err);
        res.status(400).send(err);  
      } else {
        console.log("Successfully created chat updated!\n " + newChatData);
        res.json(newChatData);
      }
    });
};

//displays all info to /api/chatHistory
exports.read = function(req,res){

 chatData.find({}, function(err,docs){
    if(err){
      res.status(400).send(err);
    }else{
      res.send(docs);
    }
  });
};

//obtain chat data when the class is selected
//sort by the created date
exports.getAllchatData = function(req,res){

    console.log("chat data");
    console.log(req.ChatData);

    res.json(req.ChatData);
  };

  //middleware. this will be excecuted when GET method is called
  exports.getChatDataByCurrentClassID = function(req, res, next, currentlySelectedClassID){

    chatData.findOne({'classID':currentlySelectedClassID}).sort('created').exec(function(err,docs){
      if(err){
        res.status(400).send(err);
      }else{
        req.ChatData = docs;
        next();
      }
    });

  }

  /**
 * Update profile picture
 */
exports.savePicture = function (req, res) {

  var user = req.user;
  var message = null;

  console.log("changeProfilePicture in users.profile.server.controller.js");
  console.log(req.user);
  if (user) {
    fs.writeFile('./modules/users/client/img/profile/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        user.profileImageURL = 'modules/users/img/profile/uploads/' + req.files.file.name;

        user.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            req.login(user, function (err) {
              if (err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};