'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const City = use('App/Models/City')
/**
 * Resourceful controller for interacting with cities
 */
class CityController {
  /**
   * Show a list of all cities.
   * GET cities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const cities = await City.all()

    return cities
  }

  /**
   * Create/save a new city.
   * POST cities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.post()

    const city = await City.create(data)

    return city
  }

  /**
   * Display a single city.
   * GET cities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id } = params

    const city = await City.findOrFail(id)

    return city
  }

  /**
   * Update city details.
   * PUT or PATCH cities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const { id } = params
    const data = request.post()

    const city = await City.findOrFail(id)

    await city.merge(data)

    return city
  }

  /**
   * Delete a city with id.
   * DELETE cities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id } = params

    const city = await City.findOrFail(id)

    await city.delete()

    return response.status(204).json(null)
  }
}

module.exports = CityController
