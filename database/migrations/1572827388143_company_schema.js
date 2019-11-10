'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('image', 255).notNullable()
      table.integer('order').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
