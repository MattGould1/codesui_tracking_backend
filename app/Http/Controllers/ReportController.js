'use strict'

const Session = use('App/Model/Session')

class ReportController {

  * index(request, response) {
    //
    const sessions = yield Session.ids()
    yield response.json(sessions)
  }

  * create(request, response) {
    //
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

module.exports = ReportController
