
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};
  var renderers = {};

  var styles = {
    "h1, div.frametitle, div.framesubtitle, .thmhead": {
      "font-weight": "bold"
    }
  };

  typejax.parser.extend("beamer/font/structurebold", definitions, renderers, styles);
})();
