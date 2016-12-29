'use strict'

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory')
/*
|--------------------------------------------------------------------------
| User Model Blueprint
|--------------------------------------------------------------------------
| Below is an example of blueprint for User Model. You can make use of
| this blueprint inside your seeds to generate dummy data.
|
*/
Factory.blueprint('App/Model/User', (fake) => {
  return {
    username: fake.username(),
    email: fake.email(),
    password: fake.password()
  }
})

Factory.blueprint('sessions', (fake) => {

  var iso_weeks = [
    '2016 | 21',
    '2016 | 22',
    '2016 | 23',
    '2016 | 24',
    '2016 | 25',
  ];

  var utm_source = [
    'google',
    'facebook',
    '',
    'direct'
  ];

  var utm_name = [
    'awesome',
    'vuejs'
  ];

  var utm_term = [
    'javascript',
    'php'
  ];

  var utm_host_name = [
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.gitlab.com', //just coz
  ];

  var utm_content = [
    'website',
    'email'
  ];
  return {
    id: fake.huid(),
    utm_source: fake.pickone(utm_source),
    utm_medium: fake.string(20),
    utm_name: fake.pickone(utm_name),
    utm_term: fake.pickone(utm_term),
    utm_content: fake.string(20),
    host_name: fake.pickone(utm_host_name),
    iso_week: fake.pickone(iso_weeks),

  }
})