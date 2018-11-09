'use strict'

const { test, trait  } = use('Test/Suite')('City')
const Factory = use('Factory')
const City = use('App/Models/City')

trait('Test/ApiClient')

test('test get list of cities', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const city = await Factory.model('App/Models/City').make()
  await city.state().associate(state)

  const response = await client.get('/api/v1/cities').end()
  response.assertStatus(200)
  response.assertJSONSubset([{
    name: city.name,
    state_id: state.id
  }])
})

test('test save city', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const data = {
    name: 'North Augustabury',
    state_id: state.id
  }
  const response = await client.post('/api/v1/cities/').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'North Augustabury',
    state_id: state.id
  })
})

test('test error show city no exist', async ({ client }) => {

  const response = await client.get('/api/v1/cities/1000').end()
  response.assertStatus(404)
})

test('test show city', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const city = await Factory.model('App/Models/City').make()
  await city.state().associate(state)
  const {id, name } = city

  const response = await client.get(`/api/v1/cities/${id}`).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: name,
    state_id: state.id
  })
})
test('test error edit city no exist', async ({ client }) => {

  const data = {}

  const response = await client.put('/api/v1/cities/1000').send(data).end()
  response.assertStatus(404)
})
test('test edit city', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const city = await Factory.model('App/Models/City').make()
  await city.state().associate(state)
  const {id, name } = city

  const data = {
    name: 'Roelfurt'
  }
  const response = await client.put(`/api/v1/cities/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Roelfurt'
  })
})
test('test edit city field state', async ({ client, assert }) => {
  const state = await Factory.model('App/Models/State').create()
  const city = await Factory.model('App/Models/City').make()
  await city.state().associate(state)
  const {id, name } = city
  const auxState = await Factory.model('App/Models/State').create()
  const data = {
   state_id: auxState.id
  }
  const response = await client.put(`/api/v1/cities/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: name,
    state_id: auxState.id
  })
  assert.equal(auxState.id, response.body.state_id)
  assert.notEqual(state.id, response.body.state_id)
})
test('test error delete city no exist', async ({ client }) => {
  const response = await client.delete(`/api/v1/cities/10000`).end()
  response.assertStatus(404)
})
test('test delete city', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const city = await Factory.model('App/Models/City').make()
  await city.state().associate(state)

  const {id} = city

  const response = await client.delete(`/api/v1/cities/${id}`).end()
  response.assertStatus(204)
})
