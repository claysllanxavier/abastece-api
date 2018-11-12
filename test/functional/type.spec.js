'use strict'

const { test, trait  } = use('Test/Suite')('Type')
const Factory = use('Factory')
const Type = use('App/Models/Type')

trait('Test/ApiClient')

test('test get list of types', async ({ client }) => {
  const type = await Factory.model('App/Models/Type').create()
  const response = await client.get('/api/v1/types').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: type.name
  }])
})
test('test save type', async ({ client }) => {

  const data = {
    name: 'harum'
  }
  const response = await client.post('/api/v1/types/').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'harum'
  })
})
test('test error show type no exist', async ({ client }) => {

  const response = await client.get('/api/v1/types/1000').end()
  response.assertStatus(404)
})
test('test show type', async ({ client }) => {
  const type = await Factory.model('App/Models/Type').create()
  const {id, name} = type
  const response = await client.get(`/api/v1/types/${id}`).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: name
  })
})
test('test error edit type no exist', async ({ client }) => {

  const data = {}

  const response = await client.put('/api/v1/types/1000').send(data).end()
  response.assertStatus(404)
})
test('test edit type', async ({ client }) => {
  const type = await Factory.model('App/Models/Type').create()
  const {id} = type
  const data = {
    name: 'Utah'
  }
  const response = await client.put(`/api/v1/types/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Utah'
  })
})
test('test error delete type no exist', async ({ client }) => {
  const response = await client.delete(`/api/v1/types/10000`).end()
  response.assertStatus(404)
})
test('test delete user', async ({ client }) => {
  const type = await Factory.model('App/Models/Type').create()
  const {id} = type
  const response = await client.delete(`/api/v1/types/${id}`).end()
  response.assertStatus(204)
})
