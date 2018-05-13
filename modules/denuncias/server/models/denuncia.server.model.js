'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Hijos = new Schema({ 
  sexo: {
    type: String,
  },
  edad: {
    type: Number,
  },
});

/**
 * Denuncia Schema
 */
var DenunciaSchema = new Schema({
  hospital: {
    type: String,
    default: '',
    trim: true
  },
  centro_de_salud: {
    type: Number,
    default: '',
    trim: true
  },
  dni_victima: {
    type: String,
    default: '',
    trim: true
  },
  sexo_victima: {
    type: String,
    default: '',
    trim: true
  },
  edad_victima: {
    type: Number,
    default: 0,
    trim: true
  },
  estado_civil_victima: {
    type: String,
    default: '',
    trim: true
  },
  municipio_victima: {
    type: String,
    default: '',
    trim: true
  },
  localidad_victima: {
    type: String,
    default: '',
    trim: true
  },
  ocupacion_victima: {
    type: String,
    default: '',
    trim: true
  },
  dni_consultante: {
    type: String,
    default: '',
    trim: true
  },
  municipio_consultante: {
    type: String,
    default: '',
    trim: true
  },
  localidad_consultante: {
    type: String,
    default: '',
    trim: true
  },
  victima_internada_en: {
    type: String,
    default: '',
    trim: true
  },
  victima_con_equipo_atencion: {
    type: String,
    default: '',
    trim: true
  },
  victima_orientada_a: {
    type: String,
    default: '',
    trim: true
  },
  otros_sectores: {
    type: String,
    default: '',
    trim: true
  },
  observaciones: {
    type: String,
    default: '',
    trim: true
  },
  area_receptora: {
    type: String,
    default: '',
    trim: true
  },
  area_receptora_otros: {
    type: String,
    default: '',
    trim: true
  },
  motivo_consulta: {
    type: [String],
    default: ['']
  },
  motivo_consulta_otros: {
    type: String,
    default: '',
    trim: true
  },
  vinculo_agresor: {
    type: String,
    default: '',
    trim: true
  },
  vinculo_agresor_familia_especificar: {
    type: String,
    default: '',
    trim: true
  },
  vinculo_agresor_otros: {
    type: String,
    default: '',
    trim: true
  },
  convive_agresor: {
    type: Boolean,
    default: false,
  },
  hijos: {
    type: [Hijos],
    default: ['']
  },         //[Hijos],
  consultas_previas: {
    type: Boolean,
    default: false
  },
  consultas_cantidad: {
    type: Number,
    default: 0,
    trim: true
  },
  otras_denuncias: {
    type: Boolean,
    default: false
  },
  cuantas_denuncias: {
    type: Number,
    default: 0,
    trim: true
  },
  organismos_de_denuncias: {
    type: String,
    default: '',
    trim: true
  },
  nombre_profesional: {
    type: [String],
    default: ['']
  },
  matricula_profesional: {
    type: [Number],
    default: ['']
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Denuncia', DenunciaSchema);
