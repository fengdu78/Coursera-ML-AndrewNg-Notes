/*
 *  /MathJax/unpacked/config/Accessible.js
 *  
 *  Copyright (c) 2010-11 Design Science, Inc.
 *
 *  Part of the MathJax library.
 *  See http://www.mathjax.org for details.
 * 
 *  Licensed under the Apache License, Version 2.0;
 *  you may not use this file except in compliance with the License.
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */

MathJax.Hub.Config({
  config: ["MMLorHTML.js"],
  extensions: ["tex2jax.js","mml2jax.js","MathEvents.js","MathZoom.js","MathMenu.js","toMathML.js","TeX/noErrors.js","TeX/noUndefined.js","TeX/AMSmath.js","TeX/AMSsymbols.js"],
  jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],
  menuSettings: {
    zoom: "Double-Click",
    mpContext: true,
    mpMouse: true
  },
  errorSettings: {
    message: ["[Math Error]"]
  }
});

MathJax.Ajax.loadComplete("[MathJax]/config/Accessible.js");
