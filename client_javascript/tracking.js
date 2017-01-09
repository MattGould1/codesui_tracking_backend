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


function extend() {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key];
            }
        }
    }

    return arguments[0];
}

//tracking class
(function () {
  this.CStracking = function () {

    //no options yet:)
    var options = {
    };

    if ( arguments[0] && typeof arguments[0] === "object" ) {
      this.options = extendDefaults(options, arguments[0]);
    }

  };

  //public methods
  CStracking.prototype.getUtm = function (tag, url) {
    //check that a url was passed, if not just use the current location
    if (!url) url = window.location.href;

    tag = tag.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + tag + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  //save emails to the tracking db
  CStracking.prototype.saveEmail = function (activity, purchaseid) {
    var email;
    //for contact based emails
    var contactEmail = document.getElementsByClassName('c_email');
    //for subscription based emails
    var subscribeEmail = document.getElementsByClassName('s_email');

    // var activity = document.getElementsByClassName('cs_activity').value;

    // if (activity == undefined) {
    //   activity = null;
    // }

    var i;

    for (i = 0; i < contactEmail.length; i++) {
      email = document.getElementsByClassName('c_email')[i].value;

      /*
        A little bit of validation, make sure the email contains an @ symbol... 
        We won't actually get this far if the forms validation fails as well - so it's just a precaution!     
      */
      if (email.indexOf('@') > 0) {
        setOpportunityInCookies(email, 1, null, activity);
        saveOpportunity(email, purchaseid, activity);
      }
    }

    for(i = 0; i < subscribeEmail.length; i++) {
      email = document.getElementsByClassName('s_email')[i].value;
      if (email.indexOf('@') > 0) {
        setOpportunityInCookies(email, 2, null, activity);
        saveOpportunity(email, purchaseid, activity);
      }
    }
  }

  function saveOpportunity(email, purchaseid, activity) {
    var xhttp = new XMLHttpRequest();

    var eventJSON;

    //save the purchaseid, this user might go onto do something different
    if (purchaseid) {
      //save opportunity as type 3 + the id (if applicaable) with the email
      setOpportunityInCookies(email, 3, purchaseid, activity);
      var eventJSON = JSON.parse(getCookie('purchaseID'));
    }

    //send the data off
    if (checkCookie('sessionID') && checkCookie('email')) {
      var sessionJSON = JSON.parse(getCookie('sessionID'));
      var emailJSON = JSON.parse(getCookie('email'));
      var finalJSON = extend({}, sessionJSON, emailJSON, eventJSON);
      xhttp.open("POST", tracking_url + '/activity/create', true);
      xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhttp.send(JSON.stringify(finalJSON));
    } else {
      //failed, do this later
    }
  }

  CStracking.prototype.checkCookie = function(name) {
    return checkCookie(name);

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

  /*
    Set the session ID in cookies. The cookies last for roughly 8 hours. 
    If a user comes back after this period, we will generate a new cookie for them and count it as a new session!
  */
  CStracking.prototype.setSessionInCookies = function (sessionID, ccare) {
    var str = '{"session_id": "' + sessionID + '"}';
    var json = JSON.parse(str);

    Cookies.set('sessionID', json, { expires: 0.375 });
  }

  //generate a random unique ID for every session
  CStracking.prototype.generateUUID = function () {
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

  CStracking.prototype.extend = function () {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key];
            }
        }
    }

    return arguments[0];
  }

  CStracking.prototype.getCookie = function (cname) {
    return getCookie(cname);
  }
  function getCookie(cname) {
    var data = Cookies.get(cname);
    return data;
  }
  //private methods
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property]; 
      }
    }
    return source;
  }

  function extend() {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key];
            }
        }
    }

    return arguments[0];
  }

  function setOpportunityInCookies(email,type,purchaseID, activity) {
    var str1 = '{"email": "' + email + '","opportunity_type": "' + type + '","activity_id": "' + activity + '"}';
    var json1 = JSON.parse(str1);
    var str2 = '{"purchase_id": "' + purchaseID + '"}';
    var json2 = JSON.parse(str2);
    Cookies.set('email', json1, { expires: 0.375 });
    Cookies.set('purchaseID', json2, { expires: 0.375 });
  }

})();

var CStracking = new CStracking();

//get the current UUID or generate a new one
var currentUUID = CStracking.getCookie('sessionID');

if (currentUUID) {
  var uuid = JSON.parse(currentUUID);
} else {
  var uuid = CStracking.generateUUID();
}

//application url
var tracking_url = 'http://localhost:3333';

// Set some variables for parsing first
var href = window.location.href;

// Let's get our domain/hostname
var parser = document.createElement('a');
parser.href = href;
var protocol = parser.protocol;

var hostname = parser.hostname;
var pathname = parser.pathname;

hostname = hostname.replace('www.','');

// Extract all UTM tags from the current page
var utmSource = CStracking.getUtm('utm_source',href);
var utmMedium = CStracking.getUtm('utm_medium',href);
var utmTerm = CStracking.getUtm('utm_term',href);
var utmContent = CStracking.getUtm('utm_content',href);
var utmCampaign = CStracking.getUtm('utm_campaign', href);

//TODO perhaps a new way of creating and tracking campaigns - per website?

//if no source, then find the referrer
if (!utmSource) {
  var searchEngines = [
      "google",
      "bing",
      "yahoo",
      "aol",
      "yandex",
      "ask",
      "baidu",
      "sogou",
      "startsiden",
      "avg",
      "msn"
  ];

  var socialNetworks = [
      "facebook",
      "pinterest",
      "linkedin",
      "twitter",
      "livejournal",
      "reddit",
      "youtube",
      "yelp",
      "naver",
      "weibo",
      "sina",
      "stumbleupon"
  ];

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
    utmSource = searchEngines[a];
    utmMedium = "organic";
  } else if (socialFound) {
    utmSource = socialNetworks[b];
    utmMedium = "social";
  } else if (document.referrer === "") {
    utmSource = "";
    utmMedium = "direct";
  } else {
    var otherRef = document.createElement('a');
    otherRef.href = document.referrer;
    var urlStr = otherRef.hostname;
    urlStr = urlStr.replace('www.','');
    utmSource = urlStr;
    utmMedium = "referral";
  }
}

/*
  We mainly care about the first load of the visitor, where they came from. 
  Save the original link in the cookies, we'll track what the user did when they came from this link.
*/

// Function to save UTM information to DB
var originalLink;
if (utmSource === '') {
  originalLink = protocol + '//' + hostname + pathname 
    + '?utm_source=&utm_medium=' + utmMedium //source empty
    + '&utm_campaign=' + utmCampaign 
    + '&utm_term=' + utmTerm 
    + '&utm_content=' + utmContent;
}
else {
  originalLink = protocol + '//' + hostname + pathname 
    + '?utm_source=' + utmSource 
    + '&utm_medium=' + utmMedium 
    + '&utm_campaign=' + utmCampaign 
    + '&utm_term=' + utmTerm 
    + '&utm_content=' + utmContent;
}

var xhttp = new XMLHttpRequest();
var str = JSON.parse('{"utmTags": {"source": "' + utmSource + '", "medium": "' + utmMedium +
          '", "term": "' + utmTerm + '", "content": "' + utmContent +
          '", "campaign": "' + utmCampaign + '"}, "domain" : "' + hostname + '"}');

//use the current uuid object from the cookie (if exists)
if (currentUUID) {
  var uuidJSON = uuid;
} else {
  var uuidJSON = JSON.parse('{"session_id" : "' + uuid + '"}');
}

//json object rdy for the tracking db
var finalJSON = CStracking.extend({}, str, uuidJSON);

/*
  Create a new session in the tracking db, use the info we've got so far (utm)
*/

if (CStracking.checkCookie('utmInfo')) {
  var cookieJSON = CStracking.getCookie('utmInfo');

  if ( (JSON.stringify(str) !== cookieJSON && document.referrer.indexOf(hostname) == -1) || (str.utmTags.medium === "direct") ) {
    if ( (!CStracking.checkCookie('sessionID') && document.referrer === "") || (str.utmTags.medium === "referral" || str.utmTags.medium === "social" || str.utmTags.medium === "organic") ) {
      CStracking.setSessionInCookies(uuid);
    }
    xhttp.open("POST", tracking_url + '/session/initiate', true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(finalJSON));
    Cookies.set('utmInfo', str, { expires: 365 });
  }
}

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