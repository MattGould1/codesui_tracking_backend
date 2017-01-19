'use strict'

const Schema = use('Schema')

class SessionsTableSchema extends Schema {

  up () {
    this.table('sessions', (table) => {
      table.integer('user_id')
      table.dropColumn('session_id')
    })
  }

  down () {
    this.table('sessions', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = SessionsTableSchema
