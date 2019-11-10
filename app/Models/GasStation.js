'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class GasStation extends Model {
  static scopeNearBy (query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`

    return query
      .select('*', Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  }

  type () {
    return this.belongsTo('App/Models/Type')
  }

  fuels () {
    return this.belongsToMany('App/Models/Fuel', 'gas_id', 'fuel_id')
      .pivotTable('gas_fuels')
      .withTimestamps()
      .withPivot(['price', 'dt_updated'])
  }
}

module.exports = GasStation
