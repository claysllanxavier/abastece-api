'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  gasStations () {
    return this.hasMany('App/Models/GasStation')
  }
}

module.exports = Type
