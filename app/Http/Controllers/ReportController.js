'use strict'

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
          activities AS A ON S.session_id = A.session_id
      -- WHERE S.iso_week BETWEEN '2016 | 22' AND '2016 | 23'
      GROUP BY S.iso_week , S.utm_term , S.utm_source , S.utm_name , S.utm_content
    `);

    return results;
  }

  cohortQuery(iso_start, iso_end) {
    const results = Database.select(
                              'sessions.session_id AS session_id', 
                              'sessions.utm_source AS utm_source',
                              'sessions.utm_medium AS utm_medium',
                              'sessions.utm_name  AS utm_name',
                              'activities.activity_id AS activity_id',
                              'activities.opportunity_type AS activity_type',
                              'users.created_at AS user_creation',
                              'users.email AS user_id'
                            )
                            .from('sessions')
                            .leftJoin('users', 'users.session_id', 'sessions.session_id')
                            .leftJoin('activities', 'activities.session_id', 'sessions.session_id')
                            .where('users.email', '<>', '')
                            .groupBy('users.email')
                            .limit(10);

    return results;
  }

  * index(request, response) {

    //get the results for a certain period
    const results = yield this.query('2016 | 01', '2016 | 53');

    //structure of the json
    var pruned_results = {
        utm_params: {
          utm_term: [],
          utm_source: [],
          utm_name: [],
          utm_content: []
        },
        activity: {
          id: [],
          sum_leads_soi: 0,
          sum_leads_active: 0,
          sum_leads_direct: 0,
          sum_leads_assisted: 0,
          sum_leads_active_direct: 0
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
          sum_leads_soi: 0,
          sum_leads_active: 0,
          sum_leads_direct: 0,
          sum_leads_assisted: 0,
          sum_leads_active_direct: 0
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
      pruned_results.activity.sum_leads_soi = pruned_results.activity.sum_leads_soi + value.sum_leads_soi;
      pruned_results.activity.sum_leads_active = pruned_results.activity.sum_leads_active + value.sum_leads_active;
      pruned_results.activity.sum_leads_direct = pruned_results.activity.sum_leads_direct + value.sum_leads_direct;
      pruned_results.activity.sum_leads_assisted = pruned_results.activity.sum_leads_assisted + value.sum_leads_assisted;
      pruned_results.activity.sum_leads_active_direct = pruned_results.activity.sum_leads_active_direct + value.sum_leads_active_direct;

      // if the week already exists, append data to it
      if (pruned_results[value.iso_week]) {
        
        //access to the iso_week
        var s = pruned_results[value.iso_week];

        //sessions
        iso_week.sessions.total_unique = s.sessions.total_unique + value.unique_sessions;
        
        //session_ids
        s.sessions.total_unique_ids.push(value.session_id);
        iso_week.sessions.total_unique_ids = s.sessions.total_unique_ids;

        //utm params
        //utm term
        s.utm_params.utm_term.push(value.utm_term);
        iso_week.utm_params.utm_term = s.utm_params.utm_term;

        //utm source
        s.utm_params.utm_source.push(value.utm_source);
        iso_week.utm_params.utm_source = s.utm_params.utm_source;

        //utm name
        s.utm_params.utm_name.push(value.utm_name);
        iso_week.utm_params.utm_name = s.utm_params.utm_name;

        //utm content
        s.utm_params.utm_content.push(value.utm_content);
        iso_week.utm_params.utm_content = s.utm_params.utm_content;

        //activity info
        s.activity.id.push(value.activity_id);
        iso_week.activity.id = s.activity.id;

        //sum of leads by type (opportunity_type)
        iso_week.activity.sum_leads_soi = s.activity.sum_leads_soi + value.sum_leads_soi;
        iso_week.activity.sum_leads_active = s.activity.sum_leads_active + value.sum_leads_active;
        iso_week.activity.sum_leads_direct = s.activity.sum_leads_direct + value.sum_leads_direct;
        iso_week.activity.sum_leads_assisted = s.activity.sum_leads_assisted + value.sum_leads_assisted;
        iso_week.activity.sum_leads_active_direct = s.activity.sum_leads_active_direct + value.sum_leads_active_direct;

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

        iso_week.activity.sum_leads_soi = value.sum_leads_soi;
        iso_week.activity.sum_leads_active = value.sum_leads_active;
        iso_week.activity.sum_leads_direct = value.sum_leads_direct;
        iso_week.activity.sum_leads_assisted = value.sum_leads_assisted;
        iso_week.activity.sum_leads_active_direct = value.sum_leads_active_direct;
      }

      pruned_results[value.iso_week] = iso_week;
    });

    return response.send('<pre>' + JSON.stringify(pruned_results, null, 4) + '</pre>');
  }

  * cohortReport (request, response) {
    const results = yield this.cohortQuery('2016 | 01', '2016 | 53');

    return response.json(results);
  }
}

module.exports = ReportController
