
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
      "background": "#F2F2F2",
      "color": "#C00"
    },

    "div.framesubtitle": {
      "background": "#F2F2F2",
      "color": "#C00"
    },

    "thmhead": {
      "color": "blue"
    },

    "h1": {
      "background": "#D8D8D8",
      "color": "#CD1A1A"
    }
  };

  typejax.parser.extend("beamer/color/beaver", definitions, renderers, styles);
})();
