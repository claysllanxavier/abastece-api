'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route
  .group(() => {
    /**
     * Routes Resources
    */
    Route.resource('states', 'StateController').apiOnly()
    Route.resource('cities', 'CityController').apiOnly()
    Route.resource('users', 'UserController').apiOnly()
    /**
     * Others Routes
     */
    Route.get('states/cities/:id', 'StateController.showCities')
  })
  .prefix('api/v1')
