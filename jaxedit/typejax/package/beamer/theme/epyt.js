
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};

  var renderers = {
    envTheorem: function(node) {
      this.makeTheorem(node);
    }
  };

  var styles = {
    "div.frame, div.maketitle": {
      "color": "white",
      "background-image": "linear-gradient(top, #000 0%, #323232 50%, #646464 100%)",
      "background-image": "-moz-linear-gradient(top, #000 0%, #323232 50%, #646464 100%)",
      "background-image": "-webkit-linear-gradient(top, #000 0%, #323232 50%, #646464 100%)",
      "background-image": "-ms-linear-gradient(top, #000 0%, #323232 50%, #646464 100%)",
      "background-image": "-o-linear-gradient(top, #000 0%, #323232 50%, #646464 100%)",
      "background-color": "#323232"
    },

    "div.frametitle": {
      "background": "transparent",
      "color": "#E2D560"
    },

    "div.framesubtitle": {
      "background": "transparent",
      "color": "#E2D560"
    },

    "div.center": {
      "border-width": "0"
    },

    "div.verbatim": {
      "border-width": "0"
    },

    "div.frame div.proof, div.frame div.theorem": {
      "background": "transparent",
      "color": "white",
      "box-shadow": "none",
      "margin": "0",
      "border-width": "0"
    },

    ".thmhead": {
      "color": "#D7CB70",
      "padding-right": "0.5em"
    },

    "div.tableofcontents": {
      "border-width": "0"
    },

    "h1": {
      "background": "transparent",
      "color": "#F6E72A"
    },

    "ol, ul": {
      "margin-left": "1em"
    }
  };

  typejax.parser.extend("beamer/theme/epyt", definitions, renderers, styles);
})();
