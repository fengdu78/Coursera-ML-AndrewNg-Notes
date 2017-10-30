
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};
  var renderers = {};

  var styles = {
    "div.frame, div.maketitle": {
      "color": "black",
      "background": "white"
    },

    "div.frametitle": {
      "color": "blue"
    },

    "div.framesubtitle": {
      "color": "blue"
    },

    ".thmhead": {
      "color": "blue"
    },

    "h1": {
      "color": "blue"
    },

    "span.pause": {
      "color": "blue"
    }
  };

  typejax.parser.extend("beamer/color/default", definitions, renderers, styles);
})();
