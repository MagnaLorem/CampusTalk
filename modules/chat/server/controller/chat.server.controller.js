var path = require('path'),
mongoose = require('mongoose'),
chatschema = mongoose.model('chatschema'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
_ = require('lodash');


exports.create = function(req, res) {
  var newMessage = new chatschema(req.body);
  //myclass.user = req.user;

  newMessage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newMessage);
    }
  });
};