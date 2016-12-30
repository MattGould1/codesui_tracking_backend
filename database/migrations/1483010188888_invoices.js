'use strict'

const Schema = use('Schema')

class InvoicesTableSchema extends Schema {

  up () {
    this.create('invoices', (table) => {
      table.increments()
      table.string('currency_code')
      table.string('website')
      table.string('invoice_id')
      table.string('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('invoices')
  }

}

module.exports = InvoicesTableSchema
