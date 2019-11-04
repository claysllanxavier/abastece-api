'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FranchiseSchema extends Schema {
  up () {
    this.create('franchises', table => {
      table.increments()
      table.string('name', 140).notNullable()
      table.string('address').notNullable()
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.string('phone', 15).notNullable()
      table.integer('company_id').unsigned().index().notNullable()
      table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE')
      table.integer('city_id').unsigned().index().notNullable()
      table.foreign('city_id').references('id').inTable('cities').onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down () {
    this.drop('franchises')
  }
}

module.exports = FranchiseSchema
