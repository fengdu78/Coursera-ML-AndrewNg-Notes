
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
      "font-family": "Georgia, 'Times New Roman', Times, serif"
    }
  };

  typejax.parser.extend("beamer/font/serif", definitions, renderers, styles);
})();
