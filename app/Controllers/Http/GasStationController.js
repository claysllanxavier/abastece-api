"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const GasStation = use("App/Models/GasStation");
const Database = use("Database");
/**
 * Resourceful controller for interacting with gasstations
 */
class GasStationController {
  /**
   * Show a list of all gasstations.
   * GET gasstations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { latitude, longitude } = request.get();
    const page = request.input("page", 1);
    const fuel = request.input("fuel", 1);
    const limit = request.input("limit", 10);
    const distance = request.input("distance", 10);
    const type = request.input("type", null);
    const full = request.input("full", false);
    const [sort, direction] = request.input("sort", "distance:asc").split(":");

    let query = null;

    if (full) {
      query = GasStation.query()
        .select([
          "gas_stations.id",
          "gas_stations.name",
          "gas_stations.latitude",
          "gas_stations.longitude",
        ])
        .nearBy(latitude, longitude, distance)
        .with('fuels', builder => {
          builder.select(['id', 'color'])
        })
    } else {
      query = GasStation.query()
        .select([
          "gas_stations.id",
          "gas_stations.name",
          "gas_stations.address",
          "fuels.color",
          "gas_fuels.price",
          "gas_fuels.dt_updated",
          "types.id as type_id",
          "types.image"
        ])
        .nearBy(latitude, longitude, distance)
        .innerJoin("types", "types.id", "gas_stations.type_id")
        .innerJoin("gas_fuels", "gas_stations.id", "gas_fuels.gas_id")
        .innerJoin("fuels", "fuels.id", "gas_fuels.fuel_id")
        .where("fuels.id", fuel)
        if(type){
          query = query.where('gas_stations.type_id', type)
        }
    }

    const gasStations = await query
      .orderBy(sort, direction)
      .paginate(page, limit);

    return gasStations;
  }

  /**
   * Create/save a new gasstation.
   * POST gasstations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const data = request.except(["fuels"]);

    const gas = await GasStation.create(data);

    const fuels = request.input("fuels");
    fuels.map(async fuel => {
      await gas.fuels().attach(fuel.id, row => {
        row.price = fuel.price;
      });
    });

    return gas;
  }

  /**
   * Display a single gasstation.
   * GET gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request }) {
    const { id } = params;
    const { latitude, longitude } = request.all();

    const haversine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`;

    const gas = await GasStation.query()
      .select("*", Database.raw(`${haversine} as distance`))
      .where("id", id)
      .firstOrFail(id);

    await gas.loadMany({
      type: builder => builder.select(["id", "name", "image"]),
      fuels: builder => builder.select(["id", "name", "color"])
    });

    return gas;
  }

  /**
   * Update gasstation details.
   * PUT or PATCH gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const { id } = params;

    const data = request.post();

    const gas = await GasStation.findOrFail(id);

    await gas.merge(data);

    return gas;
  }

  /**
   * Delete a gasstation with id.
   * DELETE gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params;

    const gas = await GasStation.findOrFail(id);

    await gas.delete();

    return response.status(204).json(null);
  }
}

module.exports = GasStationController;
