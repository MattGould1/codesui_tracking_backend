'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

//all of the public api routes - mainly used for saving data from user sessions
Route.group('public', function () {

	// store, create and handle sessions
	Route.post('session/store', 'SessionController.store')
	Route.post('session/check', 'SessionController.check')

	// store, create and handle activity
	Route.post('activity/store', 'ActivityController.store')

	// store, create and handle ads
	Route.post('adspend/store', 'AdspendController.store')

	// queries for reports
	Route.any('report', 'ReportController.index')
	Route.get('cohortReport', 'ReportController.cohortReport')

	// some testing
	Route.get('test', 'TestController.test')

});

//all of the logged in stuff
Route.group('authenticated', function () {

}).middleware('auth');