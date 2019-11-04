'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Franchise extends Model {
  company () {
    return this.belongsTo('App/Models/Company')
  }

  offers () {
    return this.hasMany('App/Models/Offer')
  }
}

module.exports = Franchise
