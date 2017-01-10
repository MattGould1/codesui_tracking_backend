'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      // alter users table
      table.string('activity_id')
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = UsersTableSchema
