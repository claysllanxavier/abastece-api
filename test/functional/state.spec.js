'use strict'

const { test, trait } = use('Test/Suite')('State')
const Factory = use('Factory')

trait('Test/ApiClient')

test('test get list of states', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const response = await client.get('/api/v1/states').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: state.name,
    uf: state.uf
  }])
})
test('test save state', async ({ client }) => {
  const data = {
    name: 'New York',
    uf: 'IA'
  }
  const response = await client.post('/api/v1/states/').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'New York',
    uf: 'IA'
  })
})
test('test error show state no exist', async ({ client }) => {
  const response = await client.get('/api/v1/states/1000').end()
  response.assertStatus(404)
})
test('test show state', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const { id, name, uf } = state
  const response = await client.get(`/api/v1/states/${id}`).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name,
    uf
  })
})
test('test error edit state no exist', async ({ client }) => {
  const data = {}

  const response = await client.put('/api/v1/states/1000').send(data).end()
  response.assertStatus(404)
})
test('test edit state', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const { id } = state
  const data = {
    name: 'Utah',
    uf: 'AR'
  }
  const response = await client.put(`/api/v1/states/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Utah',
    uf: 'AR'
  })
})
test('test error delete state no exist', async ({ client }) => {
  const response = await client.delete('/api/v1/states/10000').end()
  response.assertStatus(404)
})
test('test delete user', async ({ client }) => {
  const state = await Factory.model('App/Models/State').create()
  const { id } = state
  const response = await client.delete(`/api/v1/states/${id}`).end()
  response.assertStatus(204)
})
test('test error show cities of state no exist', async ({ client }) => {
  const response = await client.get('/api/v1/states/1000/cities').end()
  response.assertStatus(404)
})
test('test show cities of state', async ({ client }) => {
  const cities = await Factory.model('App/Models/City').createMany(5)
  const id = cities[0].state_id

  const response = await client.get(`/api/v1/states/${id}/cities`).end()
  response.assertStatus(200)
  response.assertJSONSubset([{
    name: cities[0].name,
    state_id: cities[0].state_id
  }])
})
