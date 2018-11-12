'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class City extends Model {

  /**
   *
   *
   * @returns
   * @memberof City
   */
  state () {
    return this.belongsTo('App/Models/State')
  }

  users(){
    return this.hasMany('App/Model/User')
  }
}

module.exports = City
