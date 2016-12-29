'use strict'

const Schema = use('Schema')

class ActivityTableSchema extends Schema {

  up () {
    this.create('activity', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('activity')
  }

}

module.exports = ActivityTableSchema
