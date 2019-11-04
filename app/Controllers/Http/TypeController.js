'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { validateAll } = use('Validator')
const Helpers = use('Helpers')
const fs = Helpers.promisify(require('fs'))
const uniqid = require('uniqid')

const Type = use('App/Models/Type')
/**
 * Resourceful controller for interacting with types
 */
class TypeController {
  /**
   * Show a list of all types.
   * GET types
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const types = await Type.all()

    return types
  }

  /**
   * Create/save a new type.
   * POST types
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
    const data = request.post()

    const type = await Type.create(data)

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (image) {
      await image.move(Helpers.tmpPath('uploads/types'), { name: `${uniqid()}.${image.subtype}` })

      if (!image.moved()) {
        return image.error()
      }

      type.image = `types/${image.fileName}`
    }

    await type.save()

    return type
  }

  /**
   * Display a single type.
   * GET types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const { id } = params

    const type = await Type.findOrFail(id)

    return type
  }

  /**
   * Update type details.
   * PUT or PATCH types/:id
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

    const type = await Type.findOrFail(id)

    await type.merge(data)

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    if (image) {
      await fs.unlink(Helpers.tmpPath(`uploads/types/${type.image}`))
      await image.move(Helpers.tmpPath('uploads/types'), { name: `${uniqid()}.${image.subtype}` })

      if (!image.moved()) {
        return image.error()
      }

      type.image = `types/${image.fileName}`
    }

    await type.save()


    return type
  }

  /**
   * Delete a type with id.
   * DELETE types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id } = params

    const type = await Type.findOrFail(id)
    if (type.image) {
      await fs.unlink(Helpers.tmpPath(`uploads/types/${type.image}`))
    }
    await type.delete()

    return response.status(204).json(null)
  }
}

module.exports = TypeController
