'use strict'

const Session = use('App/Model/Session')
const Database = use('Database')

const _ = use('lodash')

class ReportController {

  query(start_iso, end_iso) {
    const results = Database.table('sessions')
                            .select(
                              'sessions.iso_week',
                              'activity.activity_type',
                              'sessions.id as sid',
                              'user_id',
                              'activity_type',
                              'activity_id')
                            //.countDistinct('sessions.id as sid')
                            .leftJoin('activity', 'sessions.id', 'activity.session_id')
                            .whereNotNull('sessions.id')
                            .whereBetween('sessions.iso_week', [start_iso, end_iso])
                            //.groupBy('sessions.iso_week');

    return results;
  }

  * index(request, response) {

    /*
      unique users
      total sessions
      total opportunities
      total opportunities per type
      total forms submitted
      forms submitted per form


      commission earnt
      revenue


     */

    const results = yield this.query('2016 | 01', '2016 | 53');


    var pruned_results = {
      activity: {
        types: [],
        total: 0,
        opportunity_type: []
      },
      sessions: {
        unique: 0,
        unique_list: []
      },
      users: {
        unique: 0,
        unique_list: []
      },

    };


    //get the length of unique users
    pruned_results.users.unique = _.uniq(_.map(results, 'user_id')).length;
    pruned_results.users.unique_list = _.uniq(_.map(results, 'user_id'));

    pruned_results.sessions.unique = _.uniq(_.map(results, 'sid')).length;
    pruned_results.sessions.unique_list = _.uniq(_.map(results, 'sid'));

    pruned_results.activity.types = _.uniq(_.map(results, 'activity_type'));
    pruned_results.activity.total = _.uniq(_.map(results, 'activity_id')).length;

    _.forEach(results, function (value) {
      //sessions
      //pruned_results.sessions.unique = pruned_results.sessions.unique + value.sid;

    });

    return response.json(pruned_results)
  }

  // * weekly (request, response) {
  //   const results = yield Database
  //                         .table('sessions')
  //                         .leftJoin('')
  // }

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
