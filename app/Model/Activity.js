'use strict'

const Lucid = use('Lucid')

class Activity extends Lucid {
	
  session () {
    return this.belongsToMany('App/Model/Session')
  }

  user () {
    return this.belongsToMany('App/Model/User')
  }
}

module.exports = Activity
