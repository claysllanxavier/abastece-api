'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferSchema extends Schema {
  up () {
    this.create('offers', table => {
      table.increments()
      table.text('regulation').nullable()
      table.string('image', 255).nullable()
      table.integer('franchise_id').unsigned().index().notNullable()
      table.foreign('franchise_id').references('id').inTable('franchises').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OfferSchema
