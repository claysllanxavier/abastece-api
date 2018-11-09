'use strict'

/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const City = use('App/Models/City')

class CitySeeder {
  async run () {
    await City.create({'name': 'Palmas', 'state_id': 27})
  }
}

module.exports = CitySeeder
