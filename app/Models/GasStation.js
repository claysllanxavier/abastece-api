'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GasStation extends Model {
  type () {
    return this.belongsTo('App/Models/Type')
  }
}

module.exports = GasStation
