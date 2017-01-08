'use strict'

const Schema = use('Schema')

class ActivityTableSchema extends Schema {

  up () {
    this.table('activity', (table) => {
      // alter activity table
      table.index(['activity_type', 'opportunity_type', 'session_id', 'user_id', 'activity_id', 'call_id'], 'activity_index')
    })
  }
  
  down () {
    this.table('activity', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ActivityTableSchema
