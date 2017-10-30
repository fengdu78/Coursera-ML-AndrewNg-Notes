
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {
    environment: {
    },
    command: {
      "href":              {mode: "inline", args: ["[]", "{}", "{}"]},
      "url":               {mode: "inline", args: ["{}"]}
    }
  };

  var renderers = {
    cmdHref: function(node) {
      // \href[options]{URL}{text}
      var argarray = node.argarray;
      var url = argarray[1].childs[0].value, text = argarray[2].childs[0].value;
      node.childs = [];
      node.value = "<a href='" + url + "'>" + text + "</a>";
    },

    cmdUrl: function(node) {
      // \url{URL}
      var argarray = node.argarray;
      var url = argarray[0].childs[0].value;
      node.childs = [];
      node.value = "<a href='" + url + "'>" + url + "</a>";
    }
  };

  var styles = {
    "span.href": {
      "border": ".1em solid #007F7F"
    },

    "span.url": {
      "border": ".1em solid #00FFFF"
    }
  };

  typejax.parser.extend("hyperref/hyperref", definitions, renderers, styles);
})();
