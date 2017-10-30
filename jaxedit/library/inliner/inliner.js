
// Inliner: Simple Library for Modern Browsers
// Release: Version 0.10 on 2013-11-29
// License: The MIT license
// Source: https://github.com/zohooo/inliner

if (!window.console) console = {log : function() {}};

(function(){
  function inliner() {
    return new init(arguments[0]);
  }

  function init() {
    var elems, arg = arguments[0];
    if (typeof arg == "string") {
      if (/^#[\w\-]+$/.test(arg)) {
        elems = [document.getElementById(arg.slice(1))];
      } else if (/^[\w]+$/.test(arg)){
        elems = document.getElementsByTagName(arg);
      } else if (document.getElementsByClassName && /^\.[\w\-]+$/.test(arg)) {
        elems = document.getElementsByClassName(arg.slice(1));
      } else if (document.querySelectorAll) {
        elems = document.querySelectorAll(arg);
      } else {
        elems = [];
      }
    } else if (arg instanceof Array) {
      elems = arg;
    } else if (arg.nodeType) {
      elems = [arg];
    }
    for (var i = 0; i < elems.length; i++) {
      this[i] = elems[i];
    }
    this.length = elems.length;
  };

  init.prototype = inliner.prototype;

  inliner.prototype.each = function(callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this[i], i);
    }
  };

  inliner.each = function(collection, callback) {
    var i, arr = [];
    if (Object.prototype.toString.call(collection) !== "[object Array]") {
      if (Object.getOwnPropertyNames) {
        arr = Object.getOwnPropertyNames(collection);
      } else {
        for (var key in collection) {
          if (collection.hasOwnProperty(key)) arr.push(key);
        }
      }
      for (i = 0; i < arr.length; i++) {
        callback(arr[i], collection[arr[i]]);
      }
    } else {
      for (i = 0; i < collection.length; i++) {
        callback(i, collection[i]);
      }
    }
  };

  inliner.prototype.extend = inliner.extend = function(obj) {
    var that = this;
    inliner.each(obj, function(key, value) {
      that[key] = value;
    });
  };

  var features = {
    "touch": function(){
      return ("ontouchstart" in window);
    },
    "file-open": function(){
      return (typeof(window.FileReader) == "function");
    },
    "file-save": function(){
      return !!(window.URL || window.webkitURL);
  }};

  inliner.has = function(name) {
    var r = features[name];
    return features[name] = ((typeof(r) == "function") ? r() : r);
  };

  inliner.extend({
    agent: (function() {
      var ua = navigator.userAgent;
      var sniffs = [   [/Firefox\/(\S+)/, "firefox", "gecko"]
      /* IE 10- */    ,[/MSIE ([^;]+)/, "msie", "trident"]
      /* IE 11+ */    ,[/Trident\/[^;]+; rv:([^\)]+)/, "msie", "trident"]
      /* Opera 12- */ ,[/Opera.+ Version\/(\S+)/, "opera", "presto"]
      /* Opera 14+ */ ,[/OPR\/(\S+)/, "opera", "webkit"]
                      ,[/Chrome\/(\S+)/, "chrome", "webkit"]
                      ,[/Version\/(\S+) .*Safari/, "safari", "webkit"]
      ];
      for (var i = 0; i < sniffs.length; i++) {
        if (sniffs[i][0].test(ua)) {
          return {browser: sniffs[i][1], engine: sniffs[i][2], version: parseFloat(RegExp["$1"])};
        }
      }
      return { browser: "unknown", engine: "unknown", version: 0};
    })(),

    addStyles: function(css, id) {
      var style;
      if (id && (style = document.getElementById(id))) {
        style.parentNode.removeChild(style);
      }
      style = document.createElement("style");
      style.type = "text/css";
      if (id) style.id = id;
      document.getElementsByTagName("head")[0].appendChild(style);
      if (style.styleSheet) { // IE8
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    },

    loadStyles: function(url, id) {
      if (id) {
        var link = document.getElementById(id);
        if (link) {
          link.href = url;
          return;
        }
      }
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      if (id) link.id = id;
      link.href = url;
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(link);
    },

    removeStyles: function(id) {
      var link = document.getElementById(id);
      var head = document.getElementsByTagName("head")[0];
      if (link) head.removeChild(link);
    },

    loadScript: function(url, callback, scope) {
      var script = document.createElement("script");
      var that = scope || window;
      script.type = "text/javascript";
      script.src = url;
      if (script.readyState) {
        script.onreadystatechange = function() {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback.call(that);
          }
        };
      } else {
        script.onload = function() { callback.call(that); };
      }
      document.body.appendChild(script);
    },

    findScript: function(name) {
      var scripts= document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        var src = scripts[i].src.split("?")[0], path = src.split("/");
          if (path.slice(-1, path.length) == name) {
            return src.slice(0, -name.length);
          }
      }
      return null;
    },

    escapeText: function(text) {
      return text.replace(/[<>\&\"\']/g, function(c) {
        return '&#' + c.charCodeAt(0) + ';';
      });
    },

    inArray: function(value, array) {
      if (Array.prototype.indexOf) {
        return array.indexOf(value);
      } else {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === value) return i;
        }
        return -1;
      }
    },

    ajax: function(settings) {
      var xhr = (window.XMLHttpRequest) ?
                new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          settings.success(xhr.responseText, xhr.status, xhr);
        }
      };
      xhr.open(settings.type, settings.url, true);
      if (settings.contentType) {
        xhr.setRequestHeader("Content-Type", settings.contentType);
      }
      xhr.send(settings.data);
    }
  });

  inliner.prototype.extend({
    css: function(property, value) {
      if (arguments.length >= 2) {
        this.each(function() {
          this.style[property] = value;
        });
        return this;
      } else {
        var style = window.getComputedStyle ? window.getComputedStyle(this[0], null) : this[0].currentStyle;
        return style[property];
      }
    }
  });

  inliner.fn = inliner.prototype;
  window.inliner = inliner;
  if (!('$' in window)) window.$ = inliner;
})();
