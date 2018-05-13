'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator');

var ValidatePassword = require('validate-password');
var options = {
        enforce: {
            lowercase: true,
            uppercase: true,
            specialCharacters: false,
            numbers: true
        }
    };
var validatorPW = new ValidatePassword(options);

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function (password) {
  return (this.provider !== 'local' || validator.isLength(password, 6));
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};



/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String,
    maxlength: [30, 'El nombre es demasiado largo'],
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Por favor ingrese su nombre']
  },
  lastName: {
    type: String,
    maxlength: [30, 'El apellido es demasiado largo'],
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Por favor ingrese su apellido']
  },
  displayName: {
    type: String,
    trim: true
  },
  dni: {
    type: Number,
    trim: true,
    required: 'Por favor ingrese su número de DNI'
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Formato de mail inválido']
  },
  ciudad: {
    type: String,
    trim: true,
    required: 'Por favor ingrese la ciudad'
  },
  telefono: {
    type: String,
    trim: true,
    default: '',
    required: 'Por favor ingrese su número de telefono'
  },
  username: {
    type: String,
    maxlength: [20, 'El nombre de usuario es demasiado largo'],
    minlength: [5, 'El nombre de usuario es demasiado corto'],
    unique: 'El nombre de usuario ya existe',
    required: 'Por favor ingrese un nombre de usuario',
    trim: true
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'La contraseña debe ser mas larga'],
    validate: { 
      validator: function(p) {
        return this.pwCheck === p; // valida las dos PW, la que guarda en la bd 'password' y la que no 'pwCheck'
      },
      message: 'Las contraseñas no coinciden'
    }
  },
  salt: {
    type: String
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/img/profile/default.png'
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
    }],
    default: ['user']
  },
  isActive: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password') && this.password.length >= 6) { // Se modificó a ' >= ', porque estaba puesto solo ' = '
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

// VALIDAR LA PASSWORD REPETIDA
UserSchema.virtual('pwCheck').get(function(){
  return this.p_c;
}).set(function(password){
  this.p_c = password;
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('User', UserSchema);
