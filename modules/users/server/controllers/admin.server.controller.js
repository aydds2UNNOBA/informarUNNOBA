'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var nodemailer = require('nodemailer');
/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Activar usuario
 */
 exports.activar = function(req, res) {
  var user = req.model;
  if(user.isActive){
    user.isActive = false;
  }else{
    user.isActive = true;
  }
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if(user.isActive) {
      // Definimos el transporter
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'informar.pergamino@gmail.com',
          pass: '123654aa'
        }
      });

      // Definimos el email
      let mailOptions = {
          from: 'informar.pergamino@gmail.com',
          to: user.email,
          subject: 'Activacion de cuenta inform.AR:   ' + user.firstName,
          html: '<!DOCTYPE html><html><head><title></title></head><body><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding: 10px 0 30px 0;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;"><tr><td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;"><img class="img-responsive text-center" src="https://thumb.lovemondays.com.br/image/a679af55d173478c92898ac251b853c6/logos/b588bc/ministerio-de-salud.jpg" alt="Ministerio de salud de la nacion"  style="display: block; height: 250px;width: 250px;"/></td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;" align="center"><b>Bienvenido a inform<strong style="color: blue">.AR</strong> para prevenir!</b></td></tr><tr><td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">Su cuenta fue activada por un administrador, a partir de ahora tiene acceso completo al sistema. Por favor, haga un uso responsable del mismo.</td></tr><tr><td style="padding: 0 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">Guias generales para el buen uso del sistema:</td></tr><tr><td style="padding: 0 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;"><li style="margin-left: 4em">Nunca revele su contraseña a nadie, recuerde que este sistema maneja información sensible</li></td></tr><tr><td style="padding: 0 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;"><li style="margin-left: 4em">Preste especial atencion a la carga de las denuncias, es una tarea importante</li></td></tr><tr><td style="padding: 0 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;"><li style="margin-left: 4em"><strong>NUNCA </strong>altere y/u omita datos, es un delito grave</li></td></tr><tr><td><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td><img align="center" src="http://www.arecociudad.com.ar/data/fotos2/838345197_Junin_UNNOBA_escudo.jpg" alt="" width="200px" height="280px" style="display: block;" /></td></tr><tr><td align="center" style="padding: 25px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">Desarrollado por la UNNOBA sede Pergamino</td></tr></table></td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td  style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" width="75%">&reg; UNNOBA, Pergamino 2018<br/><a href="https://www.argentina.gob.ar/salud" style="color: #ffffff;"><font color="#ffffff">Ministerio de salud</font></a></td><td align="right" width="25%"></td></tr></table></td></tr></table></td></tr></table></body></html>'
      }

      // Enviamos el email
      transporter.sendMail(mailOptions, function(err, info){
          if (err){
              console.log(err);
          } else {
              res.json(user);
          }
      });
    } else {
      res.json(user);
    }
    
  });
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;
  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;
  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;
  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};
