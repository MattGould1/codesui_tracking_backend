'use strict'

const Schema = use('Schema')

class InvoicesTableSchema extends Schema {

  up () {
    this.create('invoices', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('invoices')
  }

}

module.exports = InvoicesTableSchema
