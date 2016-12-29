'use strict'

const Schema = use('Schema')

class ItemTableSchema extends Schema {

  up () {
    this.create('item', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('item')
  }

}

module.exports = ItemTableSchema
