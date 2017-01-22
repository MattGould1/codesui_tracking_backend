'use strict'

const User = use('App/Model/User')
const Activity = use('App/Model/Activity')

class ActivityController {
  /*
    Create a user, update activity

    request.all()
    { 
      session_id: 'b38bm9b5fo13114o363b109e956a96e2fo193',
      email: 'wer@wrewer',
      opportunity_type: '3',
      activity_id: 'null',
      purchase_id: 'default'
    }
  */
  * store (request, response) {
    const body = request.all()

    // const user = new User()

    // user.email = body.email
    // user.session_id = body.session_id
    // user.location = ''
    // user.age = ''
    // user.gender = ''
    // user.purchase_made = body.purchase_id
    // user.activity_id = ''

    // yield user.save()

    // const activity = new Activity()

    // activity.session_id = body.session_id
    // activity.user_id = user.id
    // activity.activity = body.activity_id //this is the cs_activity (used for filtering)
    // activity.activity_type = body.opportunity_id //fix this later ** this will be the type of activity (further filters)

    // yield user.activity().save(activity)

    return response.send(true)
  }

}

module.exports = ActivityController
