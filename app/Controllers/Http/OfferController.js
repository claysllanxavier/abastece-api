'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
// const { validateAll } = use('Validator')
const Helpers = use('Helpers')
const fs = Helpers.promisify(require('fs'))
const uniqid = require('uniqid')

const Offer = use('App/Models/Offer')
/**
 * Resourceful controller for interacting with offers
 */
class OfferController {
  /**
   * Show a list of all offers.
   * GET offers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const data = await Offer.all()

    return data
  }

  /**
   * Create/save a new offer.
   * POST offers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    // const rules = { regulation: 'required|max:40' }

    // const validation = await validateAll(request.all(), rules)

    // if (validation.fails()) {
    //   return response.status(400).json(validation.messages())
    // }
    const data = request.post()

    const item = new Offer()
    item.regulation = data.regulation
    item.franchise_id = data.franchise_id

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (image) {
      await image.move(Helpers.tmpPath('uploads/offers'), { name: `${uniqid()}.${image.subtype}` })

      if (!image.moved()) {
        return image.error()
      }

      item.image = `offers/${image.fileName}`
    }

    await item.save()

    return item
  }

  /**
   * Display a single offer.
   * GET offers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id } = params

    const item = await Offer.findOrFail(id)

    return item
  }

  /**
   * Update offer details.
   * PUT or PATCH offers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    // const rules = { name: 'required|max:40' }

    // const validation = await validateAll(request.all(), rules)

    // if (validation.fails()) {
    //   return response.status(400).json(validation.messages())
    // }

    const data = request.post()

    const { id } = params

    const item = await Offer.findOrFail(id)

    await item.merge(data)

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (image) {
      await fs.unlink(Helpers.tmpPath(`uploads/offers/${item.image}`))
      await image.move(Helpers.tmpPath('uploads/offers'), { name: `${uniqid()}.${image.subtype}` })

      if (!image.moved()) {
        return image.error()
      }

      item.image = `offers/${image.fileName}`
    }

    await item.save()

    return item
  }

  /**
   * Delete a offer with id.
   * DELETE offers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id } = params

    const item = await Offer.findOrFail(id)
    if (item.image) {
      await fs.unlink(Helpers.tmpPath(`uploads/offers/${item.image}`))
    }
    await item.delete()

    return response.status(204).json(null)
  }
}

module.exports = OfferController
