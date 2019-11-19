'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('image', 255).notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(1)
      table.string('address').nullable()
      table.string('phone', 15).nullable()
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.integer('city_id').unsigned().index().notNullable()
      table.foreign('city_id').references('id').inTable('cities').onDelete('RESTRICT')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
