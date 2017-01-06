'use strict'

const Session = use('App/Model/Session')
const Database = use('Database')

const _ = use('lodash')

class ReportController {

  query(start_iso, end_iso) {
    const results = Database.raw(`
      SELECT
          S.id AS session_id,
          S.iso_week AS iso_week,
          S.utm_term AS utm_term,
          S.utm_source AS utm_source,
          S.utm_name AS utm_name,
          S.utm_content AS utm_content,
          COUNT(A.id) AS activity_id,
          COUNT(DISTINCT S.session_id) AS unique_sessions,
          COUNT(CASE
              WHEN A.opportunity_type = 1 THEN 1
              ELSE NULL
          END) AS sum_leads_soi,
          COUNT(CASE
              WHEN A.opportunity_type = 2 THEN 1
              ELSE NULL
          END) AS sum_leads_active,
          COUNT(CASE
              WHEN A.opportunity_type = 3 THEN 1
              ELSE NULL
          END) AS sum_leads_direct,
          COUNT(CASE
              WHEN A.opportunity_type = 4 THEN 1
              ELSE NULL
          END) AS sum_leads_assisted,
          COUNT(CASE
              WHEN A.opportunity_type = 5 THEN 1
              ELSE NULL
          END) AS sum_leads_active_direct
      FROM
          sessions AS S
              LEFT JOIN
          activity AS A ON S.session_id = A.session_id
      -- WHERE S.iso_week BETWEEN '2016 | 22' AND '2016 | 23'
      GROUP BY S.iso_week , S.utm_term , S.utm_source , S.utm_name , S.utm_content
    `);

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
      utm_params: {
        utm_term: [],
        utm_source: [],
        utm_name: [],
        utm_content: []
      },
      activity: {
        id: [],
      },
      sessions: {
        total_unique: 0,
        total_unique_ids: []
      },
      users: {
        unique: 0,
        unique_list: []
      }
    };

    var iso_week_copy = pruned_results;
    _.forEach(results[0], function (value) {

      //format for the iso_week (copy of pruned_results basically) all iso_weeks added together should equal 
      var iso_week = {
        utm_params: {
          utm_term: [],
          utm_source: [],
          utm_name: [],
          utm_content: []
        },
        activity: {
          id: [],
        },
        sessions: {
          total_unique: 0,
          total_unique_ids: []
        },
        users: {
          unique: 0,
          unique_list: []
        }
      };

      //sessions
      pruned_results.sessions.total_unique = pruned_results.sessions.total_unique + value.unique_sessions;
      pruned_results.sessions.total_unique_ids.push(value.session_id);

      //utm params
      pruned_results.utm_params.utm_term.push(value.utm_term);
      pruned_results.utm_params.utm_source.push(value.utm_source);
      pruned_results.utm_params.utm_name.push(value.utm_name);
      pruned_results.utm_params.utm_content.push(value.utm_content);

      //activity info 
      pruned_results.activity.id.push(value.activity_id);
      pruned_results.

      if (pruned_results[value.iso_week]) { // if the week already exists, append data to it
        //sessions

        var s = pruned_results[value.iso_week];

        iso_week.sessions.total_unique = s.sessions.total_unique + value.unique_sessions;
        //session_ids
        s.sessions.total_unique_ids.push(value.session_id);
        iso_week.sessions.total_unique_ids = s.sessions.total_unique_ids;

        //utm params
        s.utm_params.utm_term.push(value.utm_term);
        iso_week.utm_params.utm_term = s.utm_params.utm_term;

        s.utm_params.utm_source.push(value.utm_source);
        iso_week.utm_params.utm_source = s.utm_params.utm_source;

        s.utm_params.utm_name.push(value.utm_name);
        iso_week.utm_params.utm_name = s.utm_params.utm_name;

        s.utm_params.utm_content.push(value.utm_content);
        iso_week.utm_params.utm_content = s.utm_params.utm_content;

        //activity info
        s.activity.id.push(value.activity_id);
        iso_week.activity.id = s.activity.id;

      } else { //new week, do this

        //sessions
        iso_week.sessions.total_unique = value.unique_sessions;
        iso_week.sessions.total_unique_ids.push(value.session_id);

        //utm params
        iso_week.utm_params.utm_term.push(value.utm_term);
        iso_week.utm_params.utm_source.push(value.utm_source);
        iso_week.utm_params.utm_name.push(value.utm_name);
        iso_week.utm_params.utm_content.push(value.utm_content);

        //activity info
        iso_week.activity.id.push(value.activity_id);
      }

      pruned_results[value.iso_week] = iso_week;
    });

    return response.send('<pre>' + JSON.stringify(pruned_results, null, 4) + '</pre>');
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
