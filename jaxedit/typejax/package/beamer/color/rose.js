
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

    "div.theorem": {
      "background": "#EAEAF7",
      "color": "black"
    },

    ".thmhead": {
      "background": "#D6D6EF",
      "color": "#3333B2"
    },

    "h1": {
      "color": "blue"
    }
  };

  typejax.parser.extend("beamer/color/rose", definitions, renderers, styles);
})();
