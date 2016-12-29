'use strict'

const Schema = use('Schema')

class SessionTableSchema extends Schema {

  up () {
    this.create('session', (table) => {
      table.increments()
      table.timestamps()
      table.string('id')
      table.string('utm_source')
      table.string('utm_name')
      table.string('utm_term')
      table.string('utm_content')
      table.string('host_name')
      table.string('iso_week', 20)
      table.index(['id', 'utm_source', 'utm_medium', 'utm_name', 'utm_term', 'utm_content', 'created_at'], 'session_index')
    })
  }

  down () {
    this.drop('session')
  }

}

module.exports = SessionTableSchema
