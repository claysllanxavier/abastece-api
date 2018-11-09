'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StateSchema extends Schema {
  up () {
    this.create('states', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('uf', 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('states')
  }
}

module.exports = StateSchema
