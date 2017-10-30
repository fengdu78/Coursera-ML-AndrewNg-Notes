
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
      "font-family": "Georgia, 'Times New Roman', Times, serif",
      "font-style": "italic"
    }
  };

  typejax.parser.extend("beamer/font/structureitalicserif", definitions, renderers, styles);
})();
