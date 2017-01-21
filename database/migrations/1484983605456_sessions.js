'use strict'

const Schema = use('Schema')

class SessionsTableSchema extends Schema {

  up () {
    this.table('sessions', (table) => {
      table.string('id')
      table.unique('id')
    })
  }

  down () {
    this.table('sessions', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = SessionsTableSchema
