'use strict'

const Schema = use('Schema')

class ActivityTableSchema extends Schema {

  up () {
    this.create('activity', (table) => {
      table.increments()
      table.string('activity_type')
      table.string('opportunity_type')
      table.string('session_id')
      table.string('user_id')
      table.string('activity_id')
      table.string('call_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('activity')
  }

}

module.exports = ActivityTableSchema
