'use strict'

const _ = use('lodash')
const AdSpend = use('App/Model/AdSpend')

class AdspendController {

  readCSV(filePath) {
    var line_count = 0
    var csv_json = []
    var headers = []

    var fs = require('fs')
    var lines = fs.readFileSync(filePath, 'UTF8').toString().split('\n')

    _.forEach(lines, (line) => {
      var values = line.split(',')

      if (line_count === 0) {

      } else {
        if (values.length === 8) {
          var json = {}

          json.utm_source =   values[0].replace('\r', '')
          json.utm_name =     values[1].replace('\r', '')
          json.utm_medium =   values[2].replace('\r', '')
          json.utm_term =     values[3].replace('\r', '')
          json.utm_content =  values[4].replace('\r', '')
          json.iso_week =     values[5].replace('\r', '')
          json.amount =       values[6].replace('\r', '')
          json.currency =     values[7].replace('\r', '')

          csv_json.push(json)
        }
      }
      line_count++
    })
    return csv_json
  }

  * store(request, response) {
    console.log(request.files())

    const files = request.files()
    const adspend_json = this.readCSV(files[0].file.path)
    var ads = []

    for (var i = 0; i < adspend_json.length; i++) {
      const single_ad = adspend_json[i]

      const ad = yield AdSpend.query()
        .where('utm_source', single_ad.utm_source)
        .where('utm_name', single_ad.utm_name)
        .where('utm_medium', single_ad.utm_medium)
        .where('utm_term', single_ad.utm_term)
        .where('utm_content', single_ad.utm_content)
        .where('iso_week', single_ad.iso_week)

      if (ad.length == 0) {
        yield AdSpend.create(single_ad)
      } else {
        const ad_lucid = yield AdSpend.findBy('id', ad[0].id)

        ad_lucid.fill(single_ad)
        yield ad_lucid.save()
      }
    }

    response.send(true)
  }
}

module.exports = AdspendController
