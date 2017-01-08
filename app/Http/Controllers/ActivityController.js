'use strict'

const User = use('App/Model/User')

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
  * create (request, response) {
    const body = request.all();
    const user = yield User.query()
                           .insert({
                             email: body.email,
                             session_id: body.session_id,
                             location: null, //add this to the form later?
                             age: null,
                             gender: null,
                             purchase_made: body.purchase_id,
                             activity_id: body.activity_id
                           });

    response.send(true);
  }

}

module.exports = ActivityController
