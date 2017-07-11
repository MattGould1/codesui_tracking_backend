'use strict'

const User = use('App/Model/User')
const Activity = use('App/Model/Activity')
const Session = use('App/Model/Session')

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

    const where = {
      email: body.email
    }

    const values = {
      email: body.email,
      location: '',
      age: '',
      gender: '',
      purchase_made: (body.purchase_id) ? 1 : 0
    }

    const user = yield User.findOrCreate(where, values)

    const session = yield Session.findBy('session_id', body.session_id)
    session.user_id = user.id

    yield session.save()

    const activity = new Activity()

    activity.activity_type = body.activity_type
    activity.opportunity_type = body.opportunity_type
    activity.activity_id = body.activity

    yield session.activity().save(activity)

    return response.send(true)
  }

}

module.exports = ActivityController
