'use strict'

const Schema = use('Schema')

class ActivityTableSchema extends Schema {

  up () {
    this.table('activity', (table) => {
      table.dropColumn('user_id')
      table.renameColumn('activity_id', 'activity')
    })
  }

  down () {
    this.table('activity', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ActivityTableSchema
