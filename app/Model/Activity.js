'use strict'

const Lucid = use('Lucid')

class Activity extends Lucid {
	
  session () {
    return this.belongsTo('App/Model/Session')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Activity
