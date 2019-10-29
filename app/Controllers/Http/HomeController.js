'use strict'

const Helpers = use('Helpers')

class HomeController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = HomeController
