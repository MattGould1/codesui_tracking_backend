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

const Database = use('Database')

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

Factory.blueprint('activity', (fake) => {

  var activity_type = [
    'website',
    'mobile'
  ];

  var opportunity_type = [
    '1a',
    '1b',
    '1c',
    '2a',
    '2b',
    '2c'
  ];
  const Session = use('App/Model/Session')

  const session_id = Session.ids()

  return {
    activity_type: fake.pickone(activity_type),
    opportunity_type: fake.pickone(opportunity_type),
    session_id: fake.pickone(session_id),
    user_id: fake.first(),
    activity_id: fake.fbid(),
    call_id: fake.fbid()
  }
});

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
    id: fake.guid(),
    utm_source: fake.pickone(utm_source),
    utm_medium: fake.string(20),
    utm_name: fake.pickone(utm_name),
    utm_term: fake.pickone(utm_term),
    utm_content: fake.string(20),
    host_name: fake.pickone(utm_host_name),
    iso_week: fake.pickone(iso_weeks),
  }
})