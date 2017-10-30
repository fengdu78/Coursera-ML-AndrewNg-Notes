
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};
  var renderers = {};

  var styles = {
    "div.frame ol": {
      "list-style-type": "decimal"
    },

    "div.frame ul": {
      "list-style-type": "circle"
    }
  };

  typejax.parser.extend("beamer/inner/circles", definitions, renderers, styles);
})();
