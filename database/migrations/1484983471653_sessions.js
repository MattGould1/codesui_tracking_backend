'use strict'

const Schema = use('Schema')

class SessionsTableSchema extends Schema {

  up () {
    this.table('sessions', (table) => {
      // alter sessions table
      table.dropColumn('id')
    })
  }

  down () {
    this.table('sessions', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = SessionsTableSchema
