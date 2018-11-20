'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GasStation extends Model {
  type () {
    return this.belongsTo('App/Models/Type')
  }

  fuels(){
    return this.belongsToMany('App/Model/Fuel').pivotTable('gas_fuels')
  }
}

module.exports = GasStation
