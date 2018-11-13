'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GasStationSchema extends Schema {
  up () {
    this.create('gas_stations', table => {
      table.increments()
      table.string('name', 140).notNullable()
      table.string('address').notNullable()
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.string('phone', 15)
      table.integer('type_id').unsigned().index()
      table.foreign('type_id').references('id').inTable('types').onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('gas_stations')
  }
}

module.exports = GasStationSchema
