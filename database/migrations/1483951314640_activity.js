'use strict'

const Schema = use('Schema')

class ActivityTableSchema extends Schema {

  up () {
    this.rename('activity', 'activities')
  }

  down () {
    this.table('activity', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ActivityTableSchema
