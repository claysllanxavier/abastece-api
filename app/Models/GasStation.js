'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GasStation extends Model {
  type () {
    return this.belongsTo('App/Models/Type')
  }

  fuels () {
    return this.belongsToMany('App/Model/Fuel', 'gas_id', 'fuel_id')
      .pivotTable('gas_fuels')
      .withTimestamps()
      .withPivot(['price'])
  }
}

module.exports = GasStation
