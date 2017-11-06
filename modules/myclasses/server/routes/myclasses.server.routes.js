'use strict';

/**
 * Module dependencies
 */
var myclassesPolicy = require('../policies/myclasses.server.policy'),
  path = require('path'),
  myclasses = require('../controllers/myclasses.server.controller'),
  userclasses = require('../controllers/userclasses.server.controller'),
  users = require(path.resolve('./modules/users/server/controllers/users.server.controller'));

module.exports = function(app) {
  // Myclasses Routes
  app.route('/api/myclasses').all(myclassesPolicy.isAllowed)
    .get(myclasses.list)
    .post(myclasses.create);

  app.route('/api/myclasses/:myclassId').all(myclassesPolicy.isAllowed)
    .get(myclasses.read)
    .put(myclasses.update)
    .delete(myclasses.delete);

  // Routing for requests with the user's classes
  app.route('/api/userclasses').put(userclasses.updateclasses);
  app.route('/api/userclasses').get(userclasses.getclasses);
  app.route('/api/userclasses/deleteclass').put(userclasses.deleteclass);

  // Finish by binding the Myclass middleware
  app.param('myclassId', myclasses.myclassByID);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
