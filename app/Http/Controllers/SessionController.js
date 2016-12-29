'use strict'

class SessionController {

  * index(request, response) {
    //
  }

  * create(request, response) {
    //creates a session - this saves where a user comes from
    var session = {};

    session.id = response.session_id;

    //
    if (response.utm_medium != '') {
      session.utm_source = "{{none}}";
      session.utm_medium = "{{direct}}";
    } else {
      session.utm_source = response.utm_source;
      session.utm_medium = response.utm_medium;
    }

   if (response.utm_content != '') {
     sesson.utm_content = response.utm_content;
   }

  }

  * store(request, response) {
    //
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = SessionController
