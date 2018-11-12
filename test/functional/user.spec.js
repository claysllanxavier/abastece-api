'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')
const User = use('App/Models/User')
const City = use('App/Models/City')

trait('Test/ApiClient')

test('test get list of users', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get('/api/v1/users').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  }])
})
test('test save user', async ({ client }) => {
  const city = Factory.model('App/Models/City').create()
  const data = {
    first_name: 'Colton',
    last_name: 'Renner',
    email: 'Chyna13@hotmail.com',
    password: '1XO4dSIuokNi1zH',
    city_id: city.id
  }
  const response = await client.post('/api/v1/users/').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: 'Colton',
    last_name: 'Renner',
    email: 'Chyna13@hotmail.com',
    city_id: city.id
  })
})
test('test show user', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create()
  const { id } = user
  const response = await client.get(`/api/v1/users/${id}`).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  })
  assert.notExists(response.body.password);
})
test('test error show user no exist', async ({ client }) => {

  const response = await client.get('/api/v1/users/1000').end()

  response.assertStatus(404)
})
test('test error edit user no exist', async ({ client }) => {

  const data = {}

  const response = await client.put('/api/v1/users/1000').send(data).end()

  response.assertStatus(404)
})
test('test edit user', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const { id } = user
  const data = {
    first_name: 'Helmer',
    last_name: 'Rempel',
    email: 'Cordelia13@yahoo.com',
  }
  const response = await client.put(`/api/v1/users/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: 'Helmer',
    last_name: 'Rempel',
    email: 'Cordelia13@yahoo.com',
    city_id: user.city_id
  })
})
test('test edit city field city', async ({ client, assert }) => {
  const city = await Factory.model('App/Models/City').create()
  const user = await Factory.model('App/Models/User').create()
  const {id} = user
  const data = {
   city_id: city.id
  }
  const response = await client.put(`/api/v1/users/${id}`).send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  })
  assert.equal(city.id, response.body.city_id)
  assert.notEqual(user.city_id, response.body.city_id)
})
test('test error delete user no exist', async ({ client }) => {

  const response = await client.delete('/api/v1/users/1000').end()

  response.assertStatus(404)
})
test('test delete user', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.delete(`/api/v1/users/${user.id}`).end()
  response.assertStatus(204)
})
