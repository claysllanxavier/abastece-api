'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Fuel extends Model {
  gas(){
    return this.belongsToMany('App/Model/GasStation').pivotTable('gas_fuels')
  }
}

module.exports = Fuel
