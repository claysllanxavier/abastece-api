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
  async index () {
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
  async store ({ request }) {
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
  async show ({ params }) {
    const { id } = params

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
  async update ({ params, request }) {
    const { id } = params

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
  async destroy ({ params, response }) {
    const { id } = params

    const state = await State.findOrFail(id)

    await state.delete()

    return response.status(204).json(null)
  }
}

module.exports = StateController
