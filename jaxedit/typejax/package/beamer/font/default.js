
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};
  var renderers = {};

  var styles = {
    "div.frame": {
      "font-family": "Arial, Helvetica, sans-serif"
    },

    "div.frametitle": {
      "font-size": "1.1em"
    },

    "div.framesubtitle": {
      "font-size": "1em"
    }
  };

  typejax.parser.extend("beamer/font/default", definitions, renderers, styles);
})();
