'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const State = use('App/Models/State')
/**
 * Resourceful controller for interacting with states
 */
class StateController {
  /**
   * Show a list of all states.
   * GET states
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response}) {
    const states = State.all()

    return states
  }

  /**
   * Create/save a new state.
   * POST states
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.post()

    const state = await State.create(data)

    return state
  }

  /**
   * Display a single state.
   * GET states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    const id = params.id

    const state = await State.findOrFail(id)

    return state
  }

  /**
   * Update state details.
   * PUT or PATCH states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {id} = params

    const state = await State.findOrFail(id)

    const data = request.post()

    await state.merge(data)

    return state
  }

  /**
   * Delete a state with id.
   * DELETE states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const {id} = params

    const state = await State.findOrFail(id)

    await state.delete()
  }


  /**
   * Display the specified resource.
   */
   async showCities({request, response, params}) {
    const {id} = params

    const state = await State.findOrFail(id)
    const cities = await state.cities().fetch()

    return cities
  }

}

module.exports = StateController
