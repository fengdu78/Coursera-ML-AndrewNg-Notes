
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};
  var renderers = {};

  var styles = {
    "div.frame > div": {
      "margin": ".6em 1.5em",
    }
  };

  typejax.parser.extend("beamer/outer/default", definitions, renderers, styles);
})();
