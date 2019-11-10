'use strict'

/*
|--------------------------------------------------------------------------
| GasStationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Drive = use('Drive')
const Helpers = use('Helpers')
const Database = use('Database')
const GasStation = use('App/Models/GasStation')

class GasStationSeeder {
  async run () {
    const file = await Drive.get(Helpers.publicPath('data/gas.json'))
    const items = JSON.parse(file.toString())
    await Database.raw('TRUNCATE gas_stations CASCADE')
    // await Database.raw('ALTER TABLE gas_stations AUTO_INCREMENT = 1')

    const insertData = async () => Promise.all(items.map(async item => {
      const [lat, long] = item.LOCALIZACAO.split(' ')
      const gas = await GasStation.create(
        {
          name: item.POSTO,
          phone: item.CONTATO,
          address: item.ENDERECO,
          latitude: lat,
          longitude: long,
          type_id: item.TIPO_ID,
          city_id: 5514
        }
      )

      if (item.COMUM !== '*') {
        await gas.fuels().attach(1, row => {
          row.price = item.COMUM
          row.dt_updated = item.ATUALIZACAO
        })
      }
      if (item.ADTIVADA !== '*') {
        await gas.fuels().attach(5, row => {
          row.price = item.ADTIVADA
          row.dt_updated = item.ATUALIZACAO
        })
      }
      if (item.ETANOL !== '*') {
        await gas.fuels().attach(2, row => {
          row.price = item.ETANOL
          row.dt_updated = item.ATUALIZACAO
        })
      }
      if (item.DIESEL !== '*') {
        await gas.fuels().attach(3, row => {
          row.price = item.DIESEL
          row.dt_updated = item.ATUALIZACAO
        })
      }
      if (item.S10 !== '*') {
        await gas.fuels().attach(4, row => {
          row.price = item.S10
          row.dt_updated = item.ATUALIZACAO
        })
      }
    }))

    await insertData()
  }
}

module.exports = GasStationSeeder
