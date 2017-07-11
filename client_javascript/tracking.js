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

          if (key === name)
            result = cookie;
            break;
          
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

(function () {

  this.cstracking = function () {
    var options = getOptions.call(this)

    //extend the default options with the custom supplied ones
    if ( arguments[0] && typeof arguments[0] === "object" ) {
      this.options = extendDefaults(options, arguments[0]);
    }
  }

  //public methods
  cstracking.prototype.session = function () {
    checkSession.call(this)
  }

  cstracking.prototype.saveOpportunity = function (opportunity_id) {
    saveOpportunity.call(this, opportunity_id)
  }

  // Function to save opportunity information to DB
  function saveOpportunity(activity_type, activity_id, opportunity_type, email) {
    var xhttp = new XMLHttpRequest()

    var activityJSON

    if (email) {
      activityJSON = JSON.parse('{ "email" : "' + email + '", "opportunity_type" : "' + opportunity_type + '", "activity_id" : "' + activity_id + '", "activity_type" : "' + activity_type + '"}')
      Cookies.set('activity', activityJSON, { expires: 365 })
    }

    var completeJSON = extend({}, this.options.sessionJSON, activityJSON)

    xhttp.open("POST", this.options.url + '/activity/store', true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(completeJSON));

  }

  Tracking.prototype.saveOpportunity = function (activity_type, activity_id, opportunity_type, email) {
    saveOpportunity.call(this, activity_type, activity_id, opportunity_type, email);
  }

  //private methods
  
  // sends data off to the session/create
  function generateSession(options, create_new) {
    var o = options
    var xhttp = new XMLHttpRequest

    if (create_new === true) {
      setSessionInCookies(o.uuidUNIQUE)
      o.sessionJSON.session_id = o.uuidUNIQUE

      xhttp.open("POST", o.url + '/session/initiate', true)
      xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      xhttp.send(JSON.stringify(o.sessionJSON))

    } else {
      setSessionInCookies(o.sessionID)
    }

    Cookies.set('utmInfo', o.utmTags, { expires: 20 });
  }

  // sends data off to the session/check
  function checkSession() {
    var o = this.options;
    var check = false;
    var xhttp = new XMLHttpRequest;
    var $this = this;

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText != 'true') {
          generateSession(o, true);

          $this.options.sessionID = o.uuidUNIQUE;
          $this.options.sessionJSON.session_id = o.uuidUNIQUE;
        }
        //update cookies every 5 seconds
        setInterval(renewSessionCookie, 60000, [o, this.responseText]);       
      }
      
      return check;
    }

    xhttp.open("POST", o.url + '/session/check', true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset="UTF-8');
    xhttp.send(JSON.stringify(o.sessionJSON));
  }

  // renews the session cookie data
  function renewSessionCookie() {
    var options = arguments[0][0];
    var check = arguments[0][1];

    setSessionInCookies((check === true) ? options.uuidUNIQUE : options.sessionID);
    Cookies.set('utmInfo', options.utmTags, { expires: 20 });
  }

  //does what it says, parses url and gets the data ready for all other functions
  function getOptions () {
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

    //if the campaign is null attribute it to dd or md w/o any other tracking params
    if (options.utmCampaign === null) {
      options.utmCampaign = 'null*null*null*null'
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

    //get the sessionID if it exists already in cookies
    options.session = getCookie('session')

    //try to get the current session_id, if not generate a new one
    if (options.session) {
      options.sessionJSON = JSON.parse(options.session)
      options.sessionID = options.sessionJSON.session_id
      options.created_session = false
    } else {
      options.sessionID = generateUUID()
      options.sessionJSON = JSON.parse('{"session_id" : "' + options.sessionID + '"}')
      options.created_session = true
    }

    options.updatedUTM = '{"utmTags": {"source": "' + options.utmSource + '", "medium": "' + options.utmMedium +
          '", "term": "' + options.utmTerm + '", "content": "' + options.utmContent +
          '", "campaign": "' + options.utmCampaign + '"}, "domain" : "' + options.hostname + '"}'

    options.oldUTM = getCookie('utm_tags')

    options.tags = JSON.parse((options.oldUTM) ? options.oldUTM : options.updatedUTM)

    options.sessionCreate = extend({}, options.newUTMTags, options.sessionJSON)

    return options;
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

  function setSessionInCookies(sessionID, ccare) {
    var str = '{"session_id": "' + sessionID + '"}';
    var json = JSON.parse(str);

    Cookies.set('sessionID', json, { expires: 20 });
  }
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

  //helper function for creating merged json objects
  function extend(){
    for(var i=1; i<arguments.length; i++)
      for(var key in arguments[i])
        if(arguments[i].hasOwnProperty(key))
          arguments[0][key] = arguments[i][key];
    return arguments[0];
  }

})()

var options = {
  url: 'http://localhost:3333'
}

var tracking = new cstracking(options)

//capture all submit events
window.onload = function () {
  var form = document.getElementByTagName('form')

  for (var i = 0; i < form.length; i++) {
    form[i].onsubmit = submitted.bind(form)
  }
}

function submitted(event) {
  event.preventDefault()

  var activity_type = false
  var activity_id = false
  var opportunity_type = false
  var email = false

  if (event.srcElement.getElementByClassName('cs_activity_type').length != 0) {
    activity_type = event.srcElement.getElementsByClassName('cs_activity')[0].value
  }

  if (event.srcElement.getElementByClassName('cs_opportunity_type').length != 0) {
    opportunity_type = event.srcElement.getElementByClassName('cs_opportunity_type')[0].value
  }

  if (event.srcElement.getElementByClassName('cs_activity_id').length != 0) {
    activity_id = event.srcElement.getElementByClassName('cs_activity_id')[0].value
  }

  if (event.srcElement.getElementByClassName('cs_email').length != 0) {
    email = event.srcElement.getElementByClassName('cs_email')[0].value
  }

  tracking.saveOpportunity(activity_type, activity_id, opportunity_type, email)
}