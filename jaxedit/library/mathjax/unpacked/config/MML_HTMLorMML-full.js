/*
 *  /MathJax/unpacked/config/MML_HTMLorMML-full.js
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
  extensions: ["mml2jax.js","MathEvents.js","MathZoom.js","MathMenu.js","toMathML.js"],
  jax: ["input/MathML","output/HTML-CSS","output/NativeMML"]
});

MathJax.Ajax.loadComplete("[MathJax]/config/MML_HTMLorMML-full.js");
