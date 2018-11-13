'use strict'

const State = use('App/Models/State')

class StateSeeder {
  async run () {
    await State.create({ id: 27, name: 'Tocantins', uf: 'TO' })
  }
}

module.exports = StateSeeder
