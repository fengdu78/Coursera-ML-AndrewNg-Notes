
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
      "border": "1px solid #000000",
    },

    "div.frame div.frametitle": {
      "margin": "0",
      "padding": ".5em .1em .3em .5em"
    },

    "div.frame div.framesubtitle": {
      "margin": "-.6em 0 0 0",
      "padding": "0 .1em .3em .5em"
    },

    "div.proof, div.theorem": {
      "border": "0",
      "margin": "0 1.5em",
      "padding-bottom": ".1em"
    },

    "div.proof > div, div.theorem > div": {
      "padding": "0 .5em"
    },

    "div.institute": {
      "text-align": "center",
      "margin": "0.8em 0"
    },

    "div.center": {
      "border": "1px dashed #C1C1C1"
    },

    "div.verbatim": {
      "border": "1px dashed #C1C1C1"
    },

    ".thmhead": {
      "font-weight": "bold",
      "height": "2em",
      "line-height": "2em"
    },

    "div.tableofcontents": {
      "border": "1px dashed #C1C1C1"
    },

    "ol, ul": {
      "margin-left": "1em"
    }
  };

  typejax.parser.extend("beamer/inner/default", definitions, renderers, styles);
})();
