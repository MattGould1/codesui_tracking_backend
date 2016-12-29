'use strict'

const Schema = use('Schema')

class OpportunityTableSchema extends Schema {

  up () {
    this.create('opportunity', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('opportunity')
  }

}

module.exports = OpportunityTableSchema
