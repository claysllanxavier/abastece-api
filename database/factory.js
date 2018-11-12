'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
 const Factory = use('Factory')
 const Hash = use('Hash')

 Factory.blueprint('App/Models/User', async (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    city_id: async () => {
      return (await Factory.model('App/Models/City').create()).id
    }
  }
})

Factory.blueprint('App/Models/State', (faker) => {
  return {
    name: faker.state({ full: true }),
    uf: faker.state()
  }
})

Factory.blueprint('App/Models/City', (faker) => {
  return {
    name: faker.city(),
    state_id: async () => {
      return (await Factory.model('App/Models/State').create()).id
    }
  }
})

Factory.blueprint('App/Models/Type', (faker) => {
  return {
    name: faker.word()
  }
})
