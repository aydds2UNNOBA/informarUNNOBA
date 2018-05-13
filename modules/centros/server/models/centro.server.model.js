'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Centro Schema
 */
var CentroSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Centro name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  municipio_centro: {
    type: String,
    default: '',
    required: 'Por favor ingrese el municipio del centro',
    trim: true
  },
  localidad_centro: {
    type: String,
    default: '',
    required: 'Por favor ingrese la localidad del centro',
    trim: true
  },
  barrio: {
    type: String,
    default: '',
    required: 'Por favor ingrese el barrio al que pertenece el centro',
    trim: true
  },
  calle: {
    type: String,
    default: '',
    required: 'Por favor ingrese la calle del centro',
    trim: true
  },
  altura: {
    type: Number,
    default: 0,
    required: 'Por favor ingrese la altura a la que se encuentra el centro',
    trim: true
  },
  numero: {
    type: Number,
    default: 0,
    required: 'Por favor ingrese el numero identificatorio del centro',
    trim: true
  },
  telefono_primario: {
    type: Number,
    default: 0,
    required: 'Por favor ingrese el numero de telefono primario del centro',
    trim: true
  },
  mail: {
    type: String,
    default: '',
    required: 'Por favor ingrese el correo electronico del centro',
    trim: true
  },
  responsable: {
    type: String,
    default: '',
    required: 'Por favor ingrese el nombre del responsable del centro',
    trim: true
  },
  observaciones: {
    type: String,
    default: '',
    required: 'Por favor ingrese las observaciones necesarias',
    trim: true
  }
});

mongoose.model('Centro', CentroSchema);
