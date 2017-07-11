'use strict'

const Schema = use('Schema')

class AdSpendsTableSchema extends Schema {

  up () {
    this.table('ad_spends', (table) => {
      // alter ad_spends table
      table.string('utm_medium')
      table.string('utm_name')
      table.string('utm_term')
      table.string('utm_content')
    })
  }

  down () {
    this.table('ad_spends', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = AdSpendsTableSchema
