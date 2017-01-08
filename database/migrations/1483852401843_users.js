'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('session_id')
      table.string('location')
      table.string('age')
      table.string('gender')
      table.string('purchase_made')
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = UsersTableSchema
