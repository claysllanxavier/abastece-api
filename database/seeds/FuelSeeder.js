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
    await Fuel.createMany([
      { name: 'Gasolina Comum', color: '#ff4444' },
      { name: 'Àlcool', color: '#00C851' },
      { name: 'Diesel Comum', color: '#ffbb33' },
      { name: 'Diesel S10', color: '#4B515D' },
      { name: 'Gasolina Aditivada', color: '#4285F4' }
    ])
  }
}

module.exports = FuelSeeder
