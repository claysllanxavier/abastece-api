'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env')
const Model = use('Model')

class Company extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ image }) {
    return `${Env.get('APP_URL')}/images/${image}`
  }

  franchises () {
    return this.hasMany('App/Models/Franchise')
  }
}

module.exports = Company
