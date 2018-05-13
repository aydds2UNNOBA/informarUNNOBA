'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Centro = mongoose.model('Centro'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  centro;

/**
 * Centro routes tests
 */
describe('Centro CRUD tests', function () {

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

    // Save a user to the test db and create new Centro
    user.save(function () {
      centro = {
        name: 'Centro name'
      };

      done();
    });
  });

  it('should be able to save a Centro if logged in', function (done) {
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

        // Save a new Centro
        agent.post('/api/centros')
          .send(centro)
          .expect(200)
          .end(function (centroSaveErr, centroSaveRes) {
            // Handle Centro save error
            if (centroSaveErr) {
              return done(centroSaveErr);
            }

            // Get a list of Centros
            agent.get('/api/centros')
              .end(function (centrosGetErr, centrosGetRes) {
                // Handle Centros save error
                if (centrosGetErr) {
                  return done(centrosGetErr);
                }

                // Get Centros list
                var centros = centrosGetRes.body;

                // Set assertions
                (centros[0].user._id).should.equal(userId);
                (centros[0].name).should.match('Centro name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Centro if not logged in', function (done) {
    agent.post('/api/centros')
      .send(centro)
      .expect(403)
      .end(function (centroSaveErr, centroSaveRes) {
        // Call the assertion callback
        done(centroSaveErr);
      });
  });

  it('should not be able to save an Centro if no name is provided', function (done) {
    // Invalidate name field
    centro.name = '';

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

        // Save a new Centro
        agent.post('/api/centros')
          .send(centro)
          .expect(400)
          .end(function (centroSaveErr, centroSaveRes) {
            // Set message assertion
            (centroSaveRes.body.message).should.match('Please fill Centro name');

            // Handle Centro save error
            done(centroSaveErr);
          });
      });
  });

  it('should be able to update an Centro if signed in', function (done) {
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

        // Save a new Centro
        agent.post('/api/centros')
          .send(centro)
          .expect(200)
          .end(function (centroSaveErr, centroSaveRes) {
            // Handle Centro save error
            if (centroSaveErr) {
              return done(centroSaveErr);
            }

            // Update Centro name
            centro.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Centro
            agent.put('/api/centros/' + centroSaveRes.body._id)
              .send(centro)
              .expect(200)
              .end(function (centroUpdateErr, centroUpdateRes) {
                // Handle Centro update error
                if (centroUpdateErr) {
                  return done(centroUpdateErr);
                }

                // Set assertions
                (centroUpdateRes.body._id).should.equal(centroSaveRes.body._id);
                (centroUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Centros if not signed in', function (done) {
    // Create new Centro model instance
    var centroObj = new Centro(centro);

    // Save the centro
    centroObj.save(function () {
      // Request Centros
      request(app).get('/api/centros')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Centro if not signed in', function (done) {
    // Create new Centro model instance
    var centroObj = new Centro(centro);

    // Save the Centro
    centroObj.save(function () {
      request(app).get('/api/centros/' + centroObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', centro.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Centro with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/centros/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Centro is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Centro which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Centro
    request(app).get('/api/centros/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Centro with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Centro if signed in', function (done) {
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

        // Save a new Centro
        agent.post('/api/centros')
          .send(centro)
          .expect(200)
          .end(function (centroSaveErr, centroSaveRes) {
            // Handle Centro save error
            if (centroSaveErr) {
              return done(centroSaveErr);
            }

            // Delete an existing Centro
            agent.delete('/api/centros/' + centroSaveRes.body._id)
              .send(centro)
              .expect(200)
              .end(function (centroDeleteErr, centroDeleteRes) {
                // Handle centro error error
                if (centroDeleteErr) {
                  return done(centroDeleteErr);
                }

                // Set assertions
                (centroDeleteRes.body._id).should.equal(centroSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Centro if not signed in', function (done) {
    // Set Centro user
    centro.user = user;

    // Create new Centro model instance
    var centroObj = new Centro(centro);

    // Save the Centro
    centroObj.save(function () {
      // Try deleting Centro
      request(app).delete('/api/centros/' + centroObj._id)
        .expect(403)
        .end(function (centroDeleteErr, centroDeleteRes) {
          // Set message assertion
          (centroDeleteRes.body.message).should.match('User is not authorized');

          // Handle Centro error error
          done(centroDeleteErr);
        });

    });
  });

  it('should be able to get a single Centro that has an orphaned user reference', function (done) {
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

          // Save a new Centro
          agent.post('/api/centros')
            .send(centro)
            .expect(200)
            .end(function (centroSaveErr, centroSaveRes) {
              // Handle Centro save error
              if (centroSaveErr) {
                return done(centroSaveErr);
              }

              // Set assertions on new Centro
              (centroSaveRes.body.name).should.equal(centro.name);
              should.exist(centroSaveRes.body.user);
              should.equal(centroSaveRes.body.user._id, orphanId);

              // force the Centro to have an orphaned user reference
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

                    // Get the Centro
                    agent.get('/api/centros/' + centroSaveRes.body._id)
                      .expect(200)
                      .end(function (centroInfoErr, centroInfoRes) {
                        // Handle Centro error
                        if (centroInfoErr) {
                          return done(centroInfoErr);
                        }

                        // Set assertions
                        (centroInfoRes.body._id).should.equal(centroSaveRes.body._id);
                        (centroInfoRes.body.name).should.equal(centro.name);
                        should.equal(centroInfoRes.body.user, undefined);

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
      Centro.remove().exec(done);
    });
  });
});
