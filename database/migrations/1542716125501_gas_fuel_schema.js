'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GasFuelSchema extends Schema {
  up () {
    this.create('gas_fuels', (table) => {
      table.increments()
      table.integer('gas_id').unsigned().index().notNullable()
      table.foreign('gas_id').references('id').inTable('gas_stations').onDelete('CASCADE')
      table.integer('fuel_id').unsigned().index().notNullable()
      table.foreign('fuel_id').references('id').inTable('fuels').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('gas_fuels')
  }
}

module.exports = GasFuelSchema