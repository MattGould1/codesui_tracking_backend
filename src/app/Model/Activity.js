'use strict'

const Lucid = use('Lucid')

class Activity extends Lucid {
	
  session () {
    return this.belongsTo('App/Model/Session')
  }

  // item () {
  // 	return this.hasOne('App/Model/Item')
  // }
}

module.exports = Activity
