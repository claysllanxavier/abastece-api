'use strict'

/*
|--------------------------------------------------------------------------
| FuelSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Fuel = use('App/Models/Fuel')

class FuelSeeder {
  async run () {
    await Fuel.createMany([{ name: 'Gasolina Comum' },
      { name: 'Gasolina Aditivada' },
      { name: 'Àlcool' },
      { name: 'Diesel Comum' },
      { name: 'Diesel S10' }
    ])
  }
}

module.exports = FuelSeeder
