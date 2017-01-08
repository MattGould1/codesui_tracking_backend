'use strict'

class ActivityController {

  /*
    Create a user, update the activity_id and 
  */
  * create (request, response) {
    console.log(request.all());
    response.send(true);
  }

}

module.exports = ActivityController
