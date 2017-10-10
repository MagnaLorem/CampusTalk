'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Myclass = mongoose.model('Myclass'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  myclass;

/**
 * Myclass routes tests
 */
describe('Myclass CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Myclass
    user.save(function () {
      myclass = {
        name: 'Myclass name'
      };

      done();
    });
  });

  it('should be able to save a Myclass if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Myclass
        agent.post('/api/myclasses')
          .send(myclass)
          .expect(200)
          .end(function (myclassSaveErr, myclassSaveRes) {
            // Handle Myclass save error
            if (myclassSaveErr) {
              return done(myclassSaveErr);
            }

            // Get a list of Myclasses
            agent.get('/api/myclasses')
              .end(function (myclassesGetErr, myclassesGetRes) {
                // Handle Myclasses save error
                if (myclassesGetErr) {
                  return done(myclassesGetErr);
                }

                // Get Myclasses list
                var myclasses = myclassesGetRes.body;

                // Set assertions
                (myclasses[0].user._id).should.equal(userId);
                (myclasses[0].name).should.match('Myclass name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Myclass if not logged in', function (done) {
    agent.post('/api/myclasses')
      .send(myclass)
      .expect(403)
      .end(function (myclassSaveErr, myclassSaveRes) {
        // Call the assertion callback
        done(myclassSaveErr);
      });
  });

  it('should not be able to save an Myclass if no name is provided', function (done) {
    // Invalidate name field
    myclass.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Myclass
        agent.post('/api/myclasses')
          .send(myclass)
          .expect(400)
          .end(function (myclassSaveErr, myclassSaveRes) {
            // Set message assertion
            (myclassSaveRes.body.message).should.match('Please fill Myclass name');

            // Handle Myclass save error
            done(myclassSaveErr);
          });
      });
  });

  it('should be able to update an Myclass if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Myclass
        agent.post('/api/myclasses')
          .send(myclass)
          .expect(200)
          .end(function (myclassSaveErr, myclassSaveRes) {
            // Handle Myclass save error
            if (myclassSaveErr) {
              return done(myclassSaveErr);
            }

            // Update Myclass name
            myclass.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Myclass
            agent.put('/api/myclasses/' + myclassSaveRes.body._id)
              .send(myclass)
              .expect(200)
              .end(function (myclassUpdateErr, myclassUpdateRes) {
                // Handle Myclass update error
                if (myclassUpdateErr) {
                  return done(myclassUpdateErr);
                }

                // Set assertions
                (myclassUpdateRes.body._id).should.equal(myclassSaveRes.body._id);
                (myclassUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Myclasses if not signed in', function (done) {
    // Create new Myclass model instance
    var myclassObj = new Myclass(myclass);

    // Save the myclass
    myclassObj.save(function () {
      // Request Myclasses
      request(app).get('/api/myclasses')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Myclass if not signed in', function (done) {
    // Create new Myclass model instance
    var myclassObj = new Myclass(myclass);

    // Save the Myclass
    myclassObj.save(function () {
      request(app).get('/api/myclasses/' + myclassObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', myclass.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Myclass with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/myclasses/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Myclass is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Myclass which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Myclass
    request(app).get('/api/myclasses/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Myclass with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Myclass if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Myclass
        agent.post('/api/myclasses')
          .send(myclass)
          .expect(200)
          .end(function (myclassSaveErr, myclassSaveRes) {
            // Handle Myclass save error
            if (myclassSaveErr) {
              return done(myclassSaveErr);
            }

            // Delete an existing Myclass
            agent.delete('/api/myclasses/' + myclassSaveRes.body._id)
              .send(myclass)
              .expect(200)
              .end(function (myclassDeleteErr, myclassDeleteRes) {
                // Handle myclass error error
                if (myclassDeleteErr) {
                  return done(myclassDeleteErr);
                }

                // Set assertions
                (myclassDeleteRes.body._id).should.equal(myclassSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Myclass if not signed in', function (done) {
    // Set Myclass user
    myclass.user = user;

    // Create new Myclass model instance
    var myclassObj = new Myclass(myclass);

    // Save the Myclass
    myclassObj.save(function () {
      // Try deleting Myclass
      request(app).delete('/api/myclasses/' + myclassObj._id)
        .expect(403)
        .end(function (myclassDeleteErr, myclassDeleteRes) {
          // Set message assertion
          (myclassDeleteRes.body.message).should.match('User is not authorized');

          // Handle Myclass error error
          done(myclassDeleteErr);
        });

    });
  });

  it('should be able to get a single Myclass that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Myclass
          agent.post('/api/myclasses')
            .send(myclass)
            .expect(200)
            .end(function (myclassSaveErr, myclassSaveRes) {
              // Handle Myclass save error
              if (myclassSaveErr) {
                return done(myclassSaveErr);
              }

              // Set assertions on new Myclass
              (myclassSaveRes.body.name).should.equal(myclass.name);
              should.exist(myclassSaveRes.body.user);
              should.equal(myclassSaveRes.body.user._id, orphanId);

              // force the Myclass to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Myclass
                    agent.get('/api/myclasses/' + myclassSaveRes.body._id)
                      .expect(200)
                      .end(function (myclassInfoErr, myclassInfoRes) {
                        // Handle Myclass error
                        if (myclassInfoErr) {
                          return done(myclassInfoErr);
                        }

                        // Set assertions
                        (myclassInfoRes.body._id).should.equal(myclassSaveRes.body._id);
                        (myclassInfoRes.body.name).should.equal(myclass.name);
                        should.equal(myclassInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Myclass.remove().exec(done);
    });
  });
});
