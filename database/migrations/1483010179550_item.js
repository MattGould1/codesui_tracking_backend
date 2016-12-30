'use strict'

const Schema = use('Schema')

class ItemTableSchema extends Schema {

  up () {
    this.create('item', (table) => {
      table.increments()
      table.string('activity_id')
      table.string('confirm_code')
      table.string('gross_value')
      table.string('commission_rate')
      table.string('invoice_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('item')
  }

}

module.exports = ItemTableSchema
