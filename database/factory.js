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

  var location = [
    'thailand',
    'england'
  ];

  return {
    location: fake.pickone(location),
    age: fake.age(),
    gender: fake.gender(),
    purchase_made: fake.bool(),
    email: fake.email(),
  }
})

Factory.blueprint('App/Model/Activity', (fake) => {

  var activity_id = [
    'website',
    'mobile'
  ];

  var opportunity_type = [
    1,
    2,
    3,
  ];

  return {
    activity_type: fake.pickone(opportunity_type),
    opportunity_type: fake.pickone(opportunity_type),
    session_id: fake.string(),
    user_id: fake.string(),
    activity_id: fake.pickone(activity_id),
    call_id: fake.fbid()
  }
});

Factory.blueprint('App/Model/Session', (fake) => {

  var iso_weeks = [
    '2016 | 46',
    '2016 | 47',
    '2016 | 48',
    '2016 | 49',
    '2016 | 50',
    '2016 | 51',
    '2016 | 52',
    '2017 | 1',
    '2017 | 2',
    '2017 | 3'
  ];

  var utm_source = [
    'google',
    'facebook',
    'twitter',
    'direct'
  ];

  var utm_name = [
    'email*awesome*thailand*bangkok',
    'google*vuejs*england*london',
    'bing*gscs*france*paris',
    'facebook*codesui*usa*washington'
  ];

  var utm_term = [
    'javascript',
    'php',
    'c++',
    'java'
  ];

  var utm_medium = [
    'newsletter',
    'email',
    'website',
    'cpc'
  ];

  var utm_content = [
    'email',
    'telephone',
    'organic',
    'newspaper'
  ];

  var utm_host_name = [
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.bbc.com',
    'www.github.com',
    'www.github.com',
    'www.github.com',
    'www.facebook.com',
    'www.google.com', //just coz
  ];

  return {
    session_id: fake.fbid(),
    utm_source: fake.pickone(utm_source),
    utm_medium: fake.string(utm_medium),
    utm_name: fake.pickone(utm_name),
    utm_term: fake.pickone(utm_term),
    utm_content: fake.string(utm_content),
    host_name: fake.pickone(utm_host_name),
    iso_week: fake.pickone(iso_weeks),
  }
})