'use strict'

const Schema = use('Schema')

class CurrenciesTableSchema extends Schema {

  up () {
    this.create('currencies', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('currencies')
  }

}

module.exports = CurrenciesTableSchema
