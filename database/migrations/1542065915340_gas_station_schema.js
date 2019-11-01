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
      table.string('phone', 15).notNullable()
      table.integer('type_id').unsigned().index().notNullable()
      table.foreign('type_id').references('id').inTable('types').onDelete('RESTRICT')
      table.integer('city_id').unsigned().index().notNullable()
      table.foreign('city_id').references('id').inTable('cities').onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down () {
    this.drop('gas_stations')
  }
}

module.exports = GasStationSchema
