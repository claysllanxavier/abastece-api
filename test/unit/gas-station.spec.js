'use strict'

const { test, trait } = use('Test/Suite')('Gas Station')
const Factory = use('Factory')

trait('Test/ApiClient')

test('test get list of gas stations', async ({ client }) => {
  await Factory.model('App/Models/GasStation').create()
  const response = await client.get('/api/v1/gas-stations').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    total: 1,
    perPage: 10,
    page: 1,
    lastPage: 1
  })
})
test('test save gas station', async ({ client }) => {
  const type = await Factory.model('App/Models/Type').create()
  const data = {
    name: 'MacGyver - Howe',
    address: '86881 Quitzon Square',
    latitude: '85.1499',
    longitude: '86.9464',
    phone: '(533) 061-5785',
    type_id: type.id
  }
  const response = await client.post('/api/v1/gas-stations/').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'MacGyver - Howe',
    address: '86881 Quitzon Square',
    latitude: '85.1499',
    longitude: '86.9464',
    phone: '(533) 061-5785',
    type_id: type.id
  })
})
test('test error show gas station no exist', async ({ client }) => {
  const response = await client.get('/api/v1/gas-stations/1000').end()
  response.assertStatus(404)
})
test('test show gas station', async ({ client }) => {
  const gas = await Factory.model('App/Models/GasStation').create()
  const { id } = gas

  const response = await client.get(`/api/v1/gas-stations/${id}`).end()
  response.assertStatus(200)
  response.assertJSONSubset({ name: gas.name })
})
test('test error edit gas station no exist', async ({ client }) => {
  const data = {}

  const response = await client.put('/api/v1/gas-stations/1000').send(data).end()
  response.assertStatus(404)
})
test('test edit gas station', async ({ client }) => {
  const gas = await Factory.model('App/Models/GasStation').create()
  const { id } = gas

  const data = { name: 'Stokes Inc' }

  const response = await client.put(`/api/v1/gas-stations/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({ name: 'Stokes Inc' })
})
test('test error delete gas station no exist', async ({ client }) => {
  const response = await client.delete('/api/v1/gas-stations/10000').end()
  response.assertStatus(404)
})
test('test delete gas station', async ({ client }) => {
  const gas = await Factory.model('App/Models/GasStation').create()

  const { id } = gas

  const response = await client.delete(`/api/v1/gas-stations/${id}`).end()
  response.assertStatus(204)
})
