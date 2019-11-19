'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferSchema extends Schema {
  up () {
    this.create('offers', table => {
      table.increments()
      table.string('image', 255).notNullable()
      table.integer('company_id').unsigned().index().notNullable()
      table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OfferSchema
