'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuelSchema extends Schema {
  up () {
    this.create('fuels', table => {
      table.increments()
      table.string('name', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('fuels')
  }
}

module.exports = FuelSchema
