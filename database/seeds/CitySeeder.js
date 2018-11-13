'use strict'

const City = use('App/Models/City')

class CitySeeder {
  async run () {
    await City.create({ name: 'Palmas', state_id: 27 })
  }
}

module.exports = CitySeeder
