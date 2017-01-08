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
	Route.post('session/create', 'SessionController.create');
	Route.post('session/initiate', 'SessionController.initiate');
	Route.get('report', 'ReportController.index');
	Route.get('cohortReport', 'ReportController.cohortReport');


	Route.post('activity/create', 'ActivityController.create');
});

//all of the logged in stuff
Route.group('authenticated', function () {

}).middleware('auth');