'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env')
const Model = use('Model')

class Offer extends Model {
  static get computed () {
    return ['url']
  }

  getUrl ({ image }) {
    return `${Env.get('APP_URL')}/images/${image}`
  }
}

module.exports = Offer