'use strict'

const Session = use('App/Model/Session')
const moment = use('moment')

class SessionController {

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
  * store(request, response) {
    const body = request.all()
    console.log(body)
    const iso_week = moment().year() + ' | ' + moment().isoWeek()

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
    })

    return response.send(true)
  }
  /*
    Checks that a session exists, if it doesn't frontend will trigger "store" with new session_id

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
  * check (request, response) {
    const body = request.all()
    const session = yield Session.findBy('session_id', 'gaerer')

    return response.send((session) ? 'true' : 'false')
  }
}

module.exports = SessionController
