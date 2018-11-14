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

Factory.blueprint('App/Models/User', async faker => ({
  first_name: faker.first(),
  last_name: faker.last(),
  email: faker.email(),
  password: await Hash.make(faker.password()),
  city_id: async () => (await Factory.model('App/Models/City').create()).id
}))

Factory.blueprint('App/Models/State', faker => ({
  name: faker.state({ full: true }),
  uf: faker.state()
}))

Factory.blueprint('App/Models/City', faker => ({
  name: faker.city(),
  state_id: async () => (await Factory.model('App/Models/State').create()).id
}))

Factory.blueprint('App/Models/Type', faker => ({ name: faker.word() }))

Factory.blueprint('App/Models/GasStation', faker => ({
  name: faker.name(),
  address: faker.address(),
  latitude: faker.integer(),
  longitude: faker.integer(),
  phone: faker.phone(),
  type_id: async () => (await Factory.model('App/Models/Type').create()).id
}))
