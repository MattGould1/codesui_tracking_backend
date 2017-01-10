'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      // alter users table
      table.dropColumn('username')
      table.dropColumn('password')
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = UsersTableSchema
