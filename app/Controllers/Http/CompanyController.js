'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use('Validator')
const Helpers = use('Helpers')
const fs = Helpers.promisify(require('fs'))
const uniqid = require('uniqid')

const Company = use('App/Models/Company')
/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const data = await Company.query()
      .orderBy('order')
      .fetch()

    return data
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = { name: 'required|max:40' }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(400).json(validation.messages())
    }
    const { name } = request.post()

    const item = new Company()
    item.name = name

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (image) {
      await image.move(Helpers.tmpPath('uploads/companies'), { name: `${uniqid()}.${image.subtype}` })

      if (!image.moved()) {
        return image.error()
      }

      item.image = `companies/${image.fileName}`
    }

    await item.save()

    return item
  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id } = params

    const item = await Company.findOrFail(id)

    return item
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const rules = { name: 'required|max:40' }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(400).json(validation.messages())
    }

    const data = request.post()

    const { id } = params

    const item = await Company.findOrFail(id)

    await item.merge(data)

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (image) {
      await fs.unlink(Helpers.tmpPath(`uploads/${item.image}`))
      await image.move(Helpers.tmpPath('uploads/companies'), { name: `${uniqid()}.${image.subtype}` })

      if (!image.moved()) {
        return image.error()
      }

      item.image = `companies/${image.fileName}`
    }

    await item.save()

    return item
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id } = params

    const item = await Company.findOrFail(id)
    if (item.image) {
      await fs.unlink(Helpers.tmpPath(`uploads/${item.image}`))
    }
    await item.delete()

    return response.status(204).json(null)
  }
}

module.exports = CompanyController
