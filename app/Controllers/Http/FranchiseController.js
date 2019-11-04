'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Franchise = use('App/Models/Franchise')
const Company = use('App/Models/Company')
/**
 * Resourceful controller for interacting with franchises
 */
class FranchiseController {
  /**
   * Show a list of all franchises.
   * GET franchises
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const item = await Company.query()
      .where('id', '=', params.company)
      .with('franchises')
      .firstOrFail()

    return item
  }

  /**
   * Create/save a new franchise.
   * POST franchises
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params }) {
    const aux = await Company.findOrFail(params.company)

    const data = request.post()

    const item = await Franchise.create({ ...data, company: aux.company })

    await item.load('company')

    return item
  }

  /**
   * Display a single franchise.
   * GET franchises/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id, company } = params

    await Company.findOrFail(company)

    const item = await Franchise.findOrFail(id)

    await item.load('company')

    return item
  }

  /**
   * Update franchise details.
   * PUT or PATCH franchises/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const { id, company } = params

    const data = request.post()

    await Company.findOrFail(company)

    const item = await Franchise.findOrFail(id)

    await item.merge(data)

    await item.load('company')

    return item
  }

  /**
   * Delete a franchise with id.
   * DELETE franchises/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id, company } = params

    await Company.findOrFail(company)

    const item = await Franchise.findOrFail(id)

    await item.delete()

    return response.status(204).json(null)
  }
}

module.exports = FranchiseController
