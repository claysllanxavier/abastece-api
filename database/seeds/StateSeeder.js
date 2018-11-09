'use strict'

/*
|--------------------------------------------------------------------------
| StateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const State = use('App/Models/State')

class StateSeeder {
  async run () {
    await State.create({"id": 27, "name": "Tocantins", "uf": "TO"})
  }
}

module.exports = StateSeeder
