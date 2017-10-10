'use strict';

/**
 * Module dependencies
 */
var myclassesPolicy = require('../policies/myclasses.server.policy'),
  myclasses = require('../controllers/myclasses.server.controller');

module.exports = function(app) {
  // Myclasses Routes
  app.route('/api/myclasses').all(myclassesPolicy.isAllowed)
    .get(myclasses.list)
    .post(myclasses.create);

  app.route('/api/myclasses/:myclassId').all(myclassesPolicy.isAllowed)
    .get(myclasses.read)
    .put(myclasses.update)
    .delete(myclasses.delete);

  // Finish by binding the Myclass middleware
  app.param('myclassId', myclasses.myclassByID);
};
