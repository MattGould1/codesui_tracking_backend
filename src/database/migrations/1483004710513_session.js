'use strict'

const Schema = use('Schema')

class SessionTableSchema extends Schema {

  up () {
    this.create('sessions', (table) => {
      table.timestamps()
      table.increments()
      table.string('session_id').notNullable().unique()
      table.string('utm_source')
      table.string('utm_medium')
      table.string('utm_name')
      table.string('utm_term')
      table.string('utm_content')
      table.string('host_name')
      table.string('iso_week', 20)
      table.integer('user_id')
      table.index(['id', 'session_id', 'user_id', 'utm_source', 'utm_medium', 'utm_name', 'utm_term', 'utm_content', 'created_at'], 'session_index')
    })
  }

  down () {
    this.drop('sessions')
  }

}

module.exports = SessionTableSchema
