'use strict'

const _ = use('lodash')

const data = [{"session_id":"three","utm_source":"","utm_medium":"e","utm_name":"awesome","activity_id":"1000010164462053","activity_type":"5","user_creation":"2017-01-08T05:25:35.000Z","user_id":"asibile@ecufupar.tz"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer11"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer1111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:22:59.000Z","user_id":"me@12"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:23:58.000Z","user_id":"me@121"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:24:20.000Z","user_id":"me@1211"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:29:26.000Z","user_id":"me@12111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:31:40.000Z","user_id":"me@121111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:34:29.000Z","user_id":"me@1211111"},{"session_id":"three","utm_source":"","utm_medium":"e","utm_name":"awesome","activity_id":"1000010164462053","activity_type":"5","user_creation":"2017-01-08T05:25:35.000Z","user_id":"asibile@ecufupar.tz"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer11"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer1111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:22:59.000Z","user_id":"me@12"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:23:58.000Z","user_id":"me@121"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:24:20.000Z","user_id":"me@1211"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:29:26.000Z","user_id":"me@12111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:31:40.000Z","user_id":"me@121111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:34:29.000Z","user_id":"me@1211111"},{"session_id":"three","utm_source":"","utm_medium":"e","utm_name":"awesome","activity_id":"1000010164462053","activity_type":"5","user_creation":"2017-01-08T05:25:35.000Z","user_id":"asibile@ecufupar.tz"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer11"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer1111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:22:59.000Z","user_id":"me@12"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:23:58.000Z","user_id":"me@121"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:24:20.000Z","user_id":"me@1211"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:29:26.000Z","user_id":"me@12111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:31:40.000Z","user_id":"me@121111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:34:29.000Z","user_id":"me@1211111"},{"session_id":"three","utm_source":"","utm_medium":"e","utm_name":"awesome","activity_id":"1000010164462053","activity_type":"5","user_creation":"2017-01-08T05:25:35.000Z","user_id":"asibile@ecufupar.tz"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer11"},{"session_id":"b38bm9b5fo13114o363b109e956a96e2fo193","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":null,"activity_type":null,"user_creation":null,"user_id":"ewr@werwer1111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:22:59.000Z","user_id":"me@12"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:23:58.000Z","user_id":"me@121"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:24:20.000Z","user_id":"me@1211"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:29:26.000Z","user_id":"me@12111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:31:40.000Z","user_id":"me@121111"},{"session_id":"1c0bfbec8t97bc4t184bd6912etf5520k2117","utm_source":"","utm_medium":"direct","utm_name":"null","activity_id":"null","activity_type":null,"user_creation":"2017-01-09T08:34:29.000Z","user_id":"me@1211111"}];

class TestController {
  /*
    get the necessary data to create graphs
   */
  filters() {
    var activity = 0;
    var noActivity = 0;

    var results = {};

    results.dateTo = _.maxBy(data, function (o) {
      return o.user_creation;
    });

    results.dateTo = results.dateTo.user_creation;

    results.dateFrom = _.minBy(data, function (o) {
      return o.user_creation;
    });

    results.dateFrom = results.dateFrom.user_creation;

    results.max = data.length + Math.round(data.length * 0.15, 0);

    results.rows = [];

    _.forEach(data, function (value, key) {
      if (value.activity_id !== null) {
        activity++
      } else {
        noActivity++
      }

      var addRow = [
        value.user_creation,
        activity,
        noActivity
      ]

      results.rows.push(addRow);
    });

    //copy the data here
    results.data = data;

    return results;
  }

  * test (request, response) {
    return response.json(this.filters());
  }
}

module.exports = TestController
