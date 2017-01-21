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

    var fake = new Fake()
    const sessions = yield Factory.model('App/Model/Session').create(300)

    // sessions.each(function * (session) {
    //   console.log(session.id)
    //   if (fake.bool() === true) {
    //     var location = [
    //       'thailand',
    //       'england',
    //       'usa',
    //       'france'
    //     ];

    //     const user = new User()

    //     user.email = fake.email()
    //     user.session_id = session.id
    //     user.location = fake.pickone(location)
    //     user.age = fake.age()
    //     user.gender = fake.gender()
    //     user.purchase_made = fake.bool()

    //     yield user.save()

    //     var activity_id = [
    //       'website',
    //       'mobile'
    //     ];

    //     var opportunity_type = [
    //       1,
    //       2,
    //       3,
    //     ];

    //     const activity = new Activity()

    //     activity.activity_type = fake.pickone(opportunity_type)
    //     activity.opportunity_type = fake.pickone(opportunity_type)
    //     activity.session_id = session.id
    //     activity.user_id = user.id
    //     activity.activity_id = fake.pickone(activity_id)
    //     activity.call_id = fake.fbid()

    //     yield activity.save(activity)
    //   }
    // })

    return
  }

}

module.exports = DatabaseSeeder
