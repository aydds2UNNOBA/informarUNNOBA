'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Denuncia = mongoose.model('Denuncia'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  denuncia;

/**
 * Denuncia routes tests
 */
describe('Denuncia CRUD tests', function () {

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

    // Save a user to the test db and create new Denuncia
    user.save(function () {
      denuncia = {
        name: 'Denuncia name'
      };

      done();
    });
  });

  it('should be able to save a Denuncia if logged in', function (done) {
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

        // Save a new Denuncia
        agent.post('/api/denuncias')
          .send(denuncia)
          .expect(200)
          .end(function (denunciaSaveErr, denunciaSaveRes) {
            // Handle Denuncia save error
            if (denunciaSaveErr) {
              return done(denunciaSaveErr);
            }

            // Get a list of Denuncias
            agent.get('/api/denuncias')
              .end(function (denunciasGetErr, denunciasGetRes) {
                // Handle Denuncias save error
                if (denunciasGetErr) {
                  return done(denunciasGetErr);
                }

                // Get Denuncias list
                var denuncias = denunciasGetRes.body;

                // Set assertions
                (denuncias[0].user._id).should.equal(userId);
                (denuncias[0].name).should.match('Denuncia name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Denuncia if not logged in', function (done) {
    agent.post('/api/denuncias')
      .send(denuncia)
      .expect(403)
      .end(function (denunciaSaveErr, denunciaSaveRes) {
        // Call the assertion callback
        done(denunciaSaveErr);
      });
  });

  it('should not be able to save an Denuncia if no name is provided', function (done) {
    // Invalidate name field
    denuncia.name = '';

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

        // Save a new Denuncia
        agent.post('/api/denuncias')
          .send(denuncia)
          .expect(400)
          .end(function (denunciaSaveErr, denunciaSaveRes) {
            // Set message assertion
            (denunciaSaveRes.body.message).should.match('Please fill Denuncia name');

            // Handle Denuncia save error
            done(denunciaSaveErr);
          });
      });
  });

  it('should be able to update an Denuncia if signed in', function (done) {
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

        // Save a new Denuncia
        agent.post('/api/denuncias')
          .send(denuncia)
          .expect(200)
          .end(function (denunciaSaveErr, denunciaSaveRes) {
            // Handle Denuncia save error
            if (denunciaSaveErr) {
              return done(denunciaSaveErr);
            }

            // Update Denuncia name
            denuncia.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Denuncia
            agent.put('/api/denuncias/' + denunciaSaveRes.body._id)
              .send(denuncia)
              .expect(200)
              .end(function (denunciaUpdateErr, denunciaUpdateRes) {
                // Handle Denuncia update error
                if (denunciaUpdateErr) {
                  return done(denunciaUpdateErr);
                }

                // Set assertions
                (denunciaUpdateRes.body._id).should.equal(denunciaSaveRes.body._id);
                (denunciaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Denuncias if not signed in', function (done) {
    // Create new Denuncia model instance
    var denunciaObj = new Denuncia(denuncia);

    // Save the denuncia
    denunciaObj.save(function () {
      // Request Denuncias
      request(app).get('/api/denuncias')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Denuncia if not signed in', function (done) {
    // Create new Denuncia model instance
    var denunciaObj = new Denuncia(denuncia);

    // Save the Denuncia
    denunciaObj.save(function () {
      request(app).get('/api/denuncias/' + denunciaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', denuncia.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Denuncia with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/denuncias/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Denuncia is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Denuncia which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Denuncia
    request(app).get('/api/denuncias/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Denuncia with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Denuncia if signed in', function (done) {
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

        // Save a new Denuncia
        agent.post('/api/denuncias')
          .send(denuncia)
          .expect(200)
          .end(function (denunciaSaveErr, denunciaSaveRes) {
            // Handle Denuncia save error
            if (denunciaSaveErr) {
              return done(denunciaSaveErr);
            }

            // Delete an existing Denuncia
            agent.delete('/api/denuncias/' + denunciaSaveRes.body._id)
              .send(denuncia)
              .expect(200)
              .end(function (denunciaDeleteErr, denunciaDeleteRes) {
                // Handle denuncia error error
                if (denunciaDeleteErr) {
                  return done(denunciaDeleteErr);
                }

                // Set assertions
                (denunciaDeleteRes.body._id).should.equal(denunciaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Denuncia if not signed in', function (done) {
    // Set Denuncia user
    denuncia.user = user;

    // Create new Denuncia model instance
    var denunciaObj = new Denuncia(denuncia);

    // Save the Denuncia
    denunciaObj.save(function () {
      // Try deleting Denuncia
      request(app).delete('/api/denuncias/' + denunciaObj._id)
        .expect(403)
        .end(function (denunciaDeleteErr, denunciaDeleteRes) {
          // Set message assertion
          (denunciaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Denuncia error error
          done(denunciaDeleteErr);
        });

    });
  });

  it('should be able to get a single Denuncia that has an orphaned user reference', function (done) {
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

          // Save a new Denuncia
          agent.post('/api/denuncias')
            .send(denuncia)
            .expect(200)
            .end(function (denunciaSaveErr, denunciaSaveRes) {
              // Handle Denuncia save error
              if (denunciaSaveErr) {
                return done(denunciaSaveErr);
              }

              // Set assertions on new Denuncia
              (denunciaSaveRes.body.name).should.equal(denuncia.name);
              should.exist(denunciaSaveRes.body.user);
              should.equal(denunciaSaveRes.body.user._id, orphanId);

              // force the Denuncia to have an orphaned user reference
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

                    // Get the Denuncia
                    agent.get('/api/denuncias/' + denunciaSaveRes.body._id)
                      .expect(200)
                      .end(function (denunciaInfoErr, denunciaInfoRes) {
                        // Handle Denuncia error
                        if (denunciaInfoErr) {
                          return done(denunciaInfoErr);
                        }

                        // Set assertions
                        (denunciaInfoRes.body._id).should.equal(denunciaSaveRes.body._id);
                        (denunciaInfoRes.body.name).should.equal(denuncia.name);
                        should.equal(denunciaInfoRes.body.user, undefined);

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
      Denuncia.remove().exec(done);
    });
  });
});
