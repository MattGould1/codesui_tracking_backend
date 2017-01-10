'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      // alter users table
    })
  }

  down () {
    this.table('users', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = UsersTableSchema
