'use strict'

const Schema = use('Schema')

class CurrenciesTableSchema extends Schema {

  up () {
    this.create('currencies', (table) => {
      table.increments()
      table.string('source')
      table.string('rate')
      table.timestamps()
    })
  }

  down () {
    this.drop('currencies')
  }

}

module.exports = CurrenciesTableSchema
