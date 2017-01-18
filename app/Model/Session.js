'use strict'

const Lucid = use('Lucid')

class Session extends Lucid {
  user () {
    return this.hasOne('App/Model/User')
  }

  activity() {
  	return this.hasMany('App/Model/Activity')
  }
}

module.exports = Session
