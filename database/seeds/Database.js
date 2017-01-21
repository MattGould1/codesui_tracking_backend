'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')
const Fake = use('chance')

const User = use('App/Model/User')
const Activity = use('App/Model/Activity')

class DatabaseSeeder {

  * run () {
    //reset
    // yield Factory.model('App/Model/Session').reset()
    // yield Factory.model('App/Model/User').reset()
    // yield Factory.model('App/Model/Activity').reset()

    var user_ids = [],
        count = 0;

    var fake = new Fake()
    var session_count = 10
    var user_count = 5

    const sessions = yield Factory.model('App/Model/Session').create(session_count)

    const users = yield Factory.model('App/Model/User').create(user_count)

    users.each(function * (user) {
      user_ids.push(user.id)
      yield user.save()
    })

    sessions.each(function * (session) {
        session.user_id = user_ids[count]

        if (count + 1 == user_count)
          count = 0;

        count++
        var bool = fake.bool()

        if (false) { // just save the session
          yield session.save()
        } else { // save the session with the activity yay!

          var activity_id = [
            'website',
            'mobile'
          ];

          var opportunity_type = [
            1,
            2,
            3,
          ];

          const activity = new Activity()

          activity.activity_type = fake.pickone(opportunity_type)
          activity.opportunity_type = fake.pickone(opportunity_type)
          activity.activity_id = fake.pickone(activity_id)
          activity.call_id = fake.fbid()
          
          yield session.activity().save(activity)
        }

    })

  }

}

module.exports = DatabaseSeeder
