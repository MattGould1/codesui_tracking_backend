// Cookie setter and getter library
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
}(function () {
  function extend () {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init (converter) {
    function api (key, value, attributes) {
      var result;
      if (typeof document === 'undefined') {
        return;
      }

      // Write

      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        return (document.cookie = [
          key, '=', value,
          attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
          attributes.path    && '; path=' + attributes.path,
          attributes.domain  && '; domain=' + attributes.domain,
          attributes.secure ? '; secure' : ''
        ].join(''));
      }

      // Read

      if (!key) {
        result = {};
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all. Also prevents odd result when
      // calling "get()"
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var name = parts[0].replace(rdecode, decodeURIComponent);
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          cookie = converter.read ?
            converter.read(cookie, name) : converter(cookie, name) ||
            cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;
    api.get = function (key) {
      return api(key);
    };
    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init(function () {});
}));

//helper function for creating merged json objects
function extend(){
  for(var i=1; i<arguments.length; i++)
    for(var key in arguments[i])
      if(arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

(function () {

  //public methods
  this.Tracking = function () {
    var options = getOptionsFromURL.call(this)

    //push the variable to ctm for tracking
    if (options.uuid) {
      var __ctm_cvars = __ctm_cvars || []
      __ctm_cvars.push({session_id: options.uuid})
    }

    //extend the default options with the custom supplied ones
    if ( arguments[0] && typeof arguments[0] === "object" ) {
      this.options = extendDefaults(options, arguments[0]);
    }
  }

  Tracking.prototype.createSession = function () {
    var o = this.options
    var renew = getCookie('sessionID')

    if (renew) {
      Cookies.set('sessionID', renew, { expires: 20 })
    }

    var xhttp = new XMLHttpRequest

    if (!o.oldUTMTags) { // we're dealing with some new utm tags here!
      setSessionInCookies(o.uuid)

      xhttp.open("POST", o.tracking_url + '/session/initiate', true)
      xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      xhttp.send(JSON.stringify(o.sessionJSON))

      Cookies.set('utmInfo', o.newUTMTags, { expires: 20 })
    } else if (
      (o.utmCampaign !== null && o.utmCampaign.indexOf('email') !== -1) && //check to see if the new utmcampaign param has an email
      (o.oldUTMTags.indexOf('email') == -1) //but don't overwrite the utm params if the old email param still exists
    ) {
      xhttp.open("POST", o.tracking_url + '/session/initiate', true)
      xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      xhttp.send(JSON.stringify(o.sessionJSON))

      Cookies.set('utmInfo', o.newUTMTags, { expires: 20 })
    }

  }


  Tracking.prototype.saveOpportunity = function (booking_id) {
    saveOpportunity.call(this, booking_id)
  }

  Tracking.prototype.setOpportunityInCookies = function (email, type, booking_id) {
    setOpportunityInCookies.call(this, email, type, booking_id)
  }

  Tracking.prototype.saveFormEmail = function () {
    saveFormEmail.call(this)
  }

  //does what it says, parses url and gets the data ready for all other functions
  function getOptionsFromURL () {
    var options = {}

    // Set some variables for parsing first
    var href = window.location.href

    // Let's get our domain/hostname
    var parser = document.createElement('a')
    parser.href = href
    var protocol = parser.protocol
    var hostname = parser.hostname
    var pathname = parser.pathname
    hostname = hostname.replace('www.','')

    options.hostname = hostname
    options.href = href;

    options.utmSource = getUtm('utm_source', href)
    options.utmMedium = getUtm('utm_medium', href)
    options.utmTerm = getUtm('utm_term', href)
    options.utmContent = getUtm('utm_content', href)
    options.utmCampaign = getUtm('utm_campaign', href)

    //get the sessionID if it exists already in cookies
    options.sessionID = getCookie('sessionID')

    //if the campaign is null attribute it to dd or md w/o any other tracking params
    if (options.utmCampaign === null) {
      if (hostname === 'www.dentaldepartures.com' || hostname === 'dentaldepartures.com') {
        options.utmCampaign = '0^dd^0^0^0^0^0^0';
      } else if (hostname === 'www.medicaldepartures.com' || hostname === 'medicaldepartures.com') {
        options.utmCampaign = '0^md^0^0^0^0^0^0';
      }
    }

    //now the source, check if its null and if it is, try to figure out where the user came from
    if (options.utmSource === null) {
      var searchEngines = ["google","bing","yahoo","aol","yandex","ask","baidu","sogou","startsiden","avg","msn"];
      var socialNetworks = ["facebook","pinterest","linkedin","twitter","livejournal","reddit","youtube","yelp","naver","weibo","sina","stumbleupon"];
      var searchFound = false;
      var socialFound = false;
      var a = 0;
      var b = 0;
      var i;
      var ref = document.referrer;
      for (i = 0; i < searchEngines.length; i++) {
        var pattSearch = new RegExp("(http(s)?:\/\/.)?(www\\.)?(" + searchEngines[i] + ")\.[a-z]{2,6}");
        if (pattSearch.test(ref)) {
          searchFound = true;
          break;
        }
        a++;
      }
      for (i = 0; i < socialNetworks.length; i++) {
        var pattSocial = new RegExp("(http(s)?:\/\/.)?(www\\.)?(" + socialNetworks[i] + ")\.[a-z]{2,6}");
        if (pattSocial.test(ref)) {
          socialFound = true;
          break;
        }
        b++;
      }
      if (searchFound) {
        options.utmSource = searchEngines[a];
        options.utmMedium = "organic";
      } else if (socialFound) {
        options.utmSource = socialNetworks[b];
        options.utmMedium = "social";
      } else if (document.referrer === "") {
        options.utmSource = "(none)";
        options.utmMedium = "direct";
      } else {
        var otherRef = document.createElement('a');
        otherRef.href = document.referrer;
        var urlStr = otherRef.hostname;
        urlStr = urlStr.replace('www.','');
        options.utmSource = urlStr;
        options.utmMedium = "referral";
      }
    }

    options.oriLink = '';

    if (options.utmSource === '(none)') {
      options.oriLink = protocol + '//' + hostname + pathname + '?utm_source=&utm_medium=' +
                options.utmMedium + '&utm_campaign=' + options.utmCampaign + '&utm_term=' + options.utmTerm +
                '&utm_content=' + options.utmContent + '&ccare=true'
    } else {
      options.oriLink = protocol + '//' + hostname + pathname + '?utm_source=' + options.utmSource +
            '&utm_medium=' + options.utmMedium + '&utm_campaign=' + options.utmCampaign +
            '&utm_term=' + options.utmTerm + '&utm_content=' + options.utmContent + '&ccare=true'
    }

    //set the customer care link in cookies, this is used server side for emails predominantly.
    if (!getCookie('customerLink')) {
      setCustomerLinkInCookies(options.oriLink)
    }

    //sets ccare in cookies if query string has ccare=true in it
    if (window.location.search.indexOf('ccare=true') > -1) {
      setCcareInCookies()
      ccare = getCookie('ccare')
      options.ccareJSON = JSON.parse(ccare)
    }

    //try to get the current session_id, if not generate a new one
    if (options.sessionID) {
      options.uuidJSON = JSON.parse(options.sessionID)
      options.uuid = options.uuidJSON.session_id
      options.sessionID = options.uuid
    } else {
      options.sessionID = generateUUID()
      options.uuid = options.sessionID
      options.uuidJSON = JSON.parse('{"session_id" : "' + options.uuid + '"}')
    }

    options.sessionCheck = checkCookie('sessionID')

    options.newUTMTags = JSON.parse('{"utmTags": {"source": "' + options.utmSource + '", "medium": "' + options.utmMedium +
          '", "term": "' + options.utmTerm + '", "content": "' + options.utmContent +
          '", "campaign": "' + options.utmCampaign + '"}, "domain" : "' + options.hostname + '"}')

    options.oldUTMTags = getCookie('utmInfo')

    options.sessionJSON = extend({}, options.newUTMTags, options.uuidJSON, options.ccareJSON)

    return options;
  }

  //private methods
  function extendDefaults(source, properties) {
    var property
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property]
      }
    }
    return source
  }

  /*
  Function to get UTM tags from the url

  Params:
  tag = String, UTM tag parameter name | eg. 'utm_source'
  url (optional) = String, the URL to be parsed. If left blank,
                   will get from browser current URL.
  */
  function getUtm(tag, url) {
    if (!url) url = window.location.href;
    tag = tag.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + tag + "(=([^&#]*)|&|#|$)", "i"), // note this is only for query strings that are encoded properly
        results = regex.exec(url);

    // utm_campaign%3D(.*?)($|%26) regex that would work for BING!!!
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /*
  Function to save session ID in cookie

  Params:
  sessionID = String, Session ID is set in here | eg. '145'
  */
  function setSessionInCookies(sessionID, ccare) {
    var str = '{"session_id": "' + sessionID + '"}';
    var json = JSON.parse(str);

    Cookies.set('sessionID', json, { expires: 20 });
  }

  /*
  Function to set CCare
  */
  function setCcareInCookies() {
    var str = '{"ccare": "true"}';
    var json = JSON.parse(str);

    Cookies.set('ccare', json, { expires: 365 });
  }

  /*
  Function to save email in cookie

  Params:
  email = String, Email is set in here | eg. 'johndoe@gmail.com'
  type = Integer, 3 valid types are accepted. 1=Contact, 2=Newsletter, 3=Booking
  bookingID = String
  */
  function setOpportunityInCookies(email,type,bookingID) {
    var str1 = '{"email": "' + email + '","type": "' + type + '"}';
    var json1 = JSON.parse(str1);
    var str2 = '{"booking_id": "' + bookingID + '"}';
    var json2 = JSON.parse(str2);
    Cookies.set('email', json1, { expires: 0.375 });
    Cookies.set('bookingID', json2, { expires: 0.375 });
  }

  /*
  Function to save customer url in cookies, cookie is used in the zend common library

  Params:
  Full URL = String
  */
  function setCustomerLinkInCookies(url) {
    var str = '{"customer_link": "' + url + '"}';
    var json = JSON.parse(str);

    Cookies.set('customerLink', json, { expires: 0.375 });
  }

  /*
  Function to get cookie from cookie store

  Params:
  cname = String, Cookie name to fetch | eg. 'sessionID'
  */
  function getCookie(cname) {
    var data = Cookies.get(cname);
    return data;
  }

  function checkCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
    }
    else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    return unescape(dc.substring(begin + prefix.length, end));
  }

  // Function to save opportunity information to DB
  function saveOpportunity(bookingID) {
    var xhttp = new XMLHttpRequest();
    var bookingJSON;
    if (bookingID) {
      var email;
      if (document.getElementById('original_email') !== null) {
        email = document.getElementById('original_email').value;
      } else if (document.getElementById('email_address') !== null) {
        email = document.getElementById('email_address').value;
      } else if (document.getElementById('result_email') !== null) {
        email = document.getElementById('result_email').innerText;
      }
      setOpportunityInCookies(email,3,bookingID);
      bookingJSON = JSON.parse(getCookie('bookingID'));
    }

    if (checkCookie('sessionID') && checkCookie('email')) {
      var sessionJSON = JSON.parse(getCookie('sessionID'));
      var emailJSON = JSON.parse(getCookie('email'));
      var finalJSON = extend({}, sessionJSON, emailJSON, bookingJSON);
      xhttp.open("POST", '//tracking.medicaldepartures.com/opportunity/create', true);
      xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhttp.send(JSON.stringify(finalJSON));
    } else {
      xhttp.open("POST", '//tracking.medicaldepartures.com/opportunity/failed', true);
      xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhttp.send(JSON.stringify(finalJSON));
      console.log('Session ID cookie and Email cookie don\'t exist');
    }
  }

  // Function if there is a form submit (any), to save opportunity in DB
  function saveFormEmail() {
    var email;
    var cEmail = document.getElementsByClassName('c_email');
    var nEmail = document.getElementsByClassName('n_email');
    var i;
    for(i = 0; i < cEmail.length; i++) {
      email = document.getElementsByClassName('c_email')[i].value;
      if (email.indexOf('@') > 0) {
        setOpportunityInCookies(email,1,null);
        saveOpportunity();
      }
    }
    for(i = 0; i < nEmail.length; i++) {
      email = document.getElementsByClassName('n_email')[i].value;
      if (email.indexOf('@') > 0) {
        setOpportunityInCookies(email,2,null);
        saveOpportunity();
      }
    }
  }

  //generates a unique id (pretty unique anyway)
  function generateUUID() {
    var d = Date.now();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    uuid = uuid.replace(/-/g, "");

    uuid = uuid.split("");

    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    text = text.split("");

    var randomNumber1 = "";
    var randomNumber2 = "";
    var newUUID = "";

    for(var a=0; a < 5; a++) {
      randomNumber1 = Math.floor(Math.random()*text.length);
      randomNumber2 = Math.floor(Math.random()*uuid.length);
      textSnippet = text[randomNumber1];
      uuid.splice(randomNumber2, 0, textSnippet);
    }

    uuid = uuid.toString();
    uuid = uuid.replace(/,/g, "");

    return uuid;
  }

})();

//custom options
var options = {
  tracking_url: '//tracking.medicaldepartures.com'
}

var tracking = new Tracking(options)

tracking.createSession()

//capture all submit events
window.onload = function() {
    var form = document.getElementsByTagName("form");

    for (var i = 0; i < form.length; i++) {
      form[i].onsubmit = submitted.bind(form);
    }
}

function submitted(event, form) {
    event.preventDefault();

    var activity = null;
    var purchaseid = null
    if (event.srcElement.getElementsByClassName('cs_activity').length != 0) {
      activity = event.srcElement.getElementsByClassName('cs_activity')[0].value;
    }

    if (event.srcElement.getElementsByClassName('cs_purchaseid').length != 0) {
      purchaseid = event.srcElement.getElementsByClassName('cs_purchaseid')[0].value;
    }
    CStracking.saveEmail(activity, purchaseid);
}