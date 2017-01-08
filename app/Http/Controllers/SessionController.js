'use strict'

const Session = use('App/Model/Session')
const moment = use('moment')

class SessionController {

  * index(request, response) {
    //
  }
  /*
    Creates an initial session.

    Request.all() = {
      session_id,
      utmTags {
        source,
        medium,
        campaign,
        term,
        content
      },
      domain
    }
  */
  * initiate(request, response) {
    const body = request.all();

    const iso_week = moment().year() + ' | ' + moment().isoWeek();

    const session = yield Session.findOrCreate({
      session_id: body.session_id
    },
      {
      session_id: body.session_id,
      utm_source: body.utmTags.source,
      utm_medium: body.utmTags.medium,
      utm_name: body.utmTags.campaign,
      utm_term: body.utmTags.term,
      utm_content: body.utmTags.content,
      host_name: body.domain,
      iso_week: iso_week
    });

    return response.send(true);
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
