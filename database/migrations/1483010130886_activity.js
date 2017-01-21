'use strict'

const Schema = use('Schema')

class ActivityTableSchema extends Schema {

  up () {
    this.create('activities', (table) => {
      table.increments()
      table.string('activity_type')
      table.string('opportunity_type')
      table.string('session_id')
      table.string('activity_id')
      table.string('call_id')
      table.timestamps()
      table.index('id', 'activity_type', 'session_id', 'opportunity_type')
    })
  }

  down () {
    this.drop('activities')
  }

}

module.exports = ActivityTableSchema
