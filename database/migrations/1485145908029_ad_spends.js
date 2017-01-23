'use strict'

const Schema = use('Schema')

class AdSpendsTableSchema extends Schema {

  up () {
    this.create('ad_spends', (table) => {
      table.increments()
      table.string('utm_source')
      table.string('iso_week')
      table.string('amount')
      table.string('currency')
      table.timestamps()
    })
  }

  down () {
    this.drop('ad_spends')
  }

}

module.exports = AdSpendsTableSchema
