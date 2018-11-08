'use strict'

const { before, test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')

before(async () => {
  await User.create({
    first_name: 'Ward',
    last_name: 'Abbott',
    email: 'Cecelia.Senger88@gmail.com',
    phone: '891-365-8679',
    password: 'vmt7PVYaoVf5x21'
  })
})

test('test get list of users', async ({ client }) => {

  const response = await client.get('/api/v1/users').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    first_name: 'Ward',
    last_name: 'Abbott',
    email: 'Cecelia.Senger88@gmail.com',
    phone: '891-365-8679'
  }])
})
test('test save user', async ({ client }) => {

  const data = {
    first_name: 'Colton',
    last_name: 'Renner',
    email: 'Chyna13@hotmail.com',
    phone: '601-647-6500',
    password: '1XO4dSIuokNi1zH'
  }
  const response = await client.post('/api/v1/users/').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: 'Colton',
    last_name: 'Renner',
    email: 'Chyna13@hotmail.com',
    phone: '601-647-6500'
  })
})
test('test show user', async ({ client }) => {

  const response = await client.get('/api/v1/users/1').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: 'Ward',
    last_name: 'Abbott',
    email: 'Cecelia.Senger88@gmail.com',
    phone: '891-365-8679',
  })
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

  const data = {
    first_name: 'Helmer',
    last_name: 'Rempel',
    email: 'Cordelia13@yahoo.com',
  }
  const response = await client.put('/api/v1/users/1').send(data).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    first_name: 'Helmer',
    last_name: 'Rempel',
    email: 'Cordelia13@yahoo.com',
    phone: '891-365-8679',
  })
})
test('test error delete user no exist', async ({ client }) => {

  const response = await client.delete('/api/v1/users/1000').end()

  response.assertStatus(404)
})
test('test delete user', async ({ client }) => {

  const response = await client.delete('/api/v1/users/1').end()
  response.assertStatus(204)
})
