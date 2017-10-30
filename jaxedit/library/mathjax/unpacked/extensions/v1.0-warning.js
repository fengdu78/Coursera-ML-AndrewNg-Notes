/*************************************************************
 *
 *  MathJax/extensions/v1.0-warning.js
 *
 *  This extension file is loaded when no jax are configured
 *  as a backward-compatible measure to help people convert to the
 *  new configuration process.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2012 Design Science, Inc.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (HUB,HTML) {
  var VERSION = "2.1";
  
  var CONFIG = {
    style: {
      position:"fixed", bottom:"4em", left:"3em", width:"40em",
      border: "3px solid #880000", "background-color": "#E0E0E0", color: "black",
      padding: "1em", "font-size":"small", "white-space":"normal",
      
      "border-radius": ".75em",                     // Opera 10.5 and IE9
      "-webkit-border-radius": ".75em",             // Safari and Chrome
      "-moz-border-radius": ".75em",                // Firefox
      "-khtml-border-radius": ".75em",              // Konqueror

      "box-shadow": "4px 4px 10px #AAAAAA",         // Opera 10.5 and IE9
      "-webkit-box-shadow": "4px 4px 10px #AAAAAA", // Safari 3 and Chrome
      "-moz-box-shadow": "4px 4px 10px #AAAAAA",    // Forefox 3.5
      "-khtml-box-shadow": "4px 4px 10px #AAAAAA",  // Konqueror
      filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=3, OffY=3, Color='gray', Positive='true')" // IE
    }
  };
  if (HUB.Browser.isIE9 && document.documentMode >= 9) {delete CONFIG.style.filter}
  
  var DIV;

  HUB.Register.StartupHook("onLoad",function () {
    var frame = document.body;
    if (HUB.Browser.isMSIE) {
      MathJax.Message.Init();  // make sure MathJax_MSIE_frame exists
      frame = document.getElementById("MathJax_MSIE_frame") || frame; // in IE8 and 9 it may not anyway
      CONFIG.style.position = "absolute";
    } else {delete CONFIG.style.filter}
    CONFIG.style.maxWidth = (document.body.clientWidth-75) + "px";
    DIV = HTML.addElement(frame,"div",{id:"MathJax_ConfigWarning",style:CONFIG.style},[
      [
        "div",{
          style: {
            position:"absolute", overflow:"hidden", top:".1em", right:".1em",
            border: "1px outset", width:"1em", height:"1em",
            "text-align": "center", cursor: "pointer",
            "background-color": "#EEEEEE", color:"#606060",

            "border-radius": ".5em",           // Opera 10.5
            "-webkit-border-radius": ".5em",   // Safari and Chrome
            "-moz-border-radius": ".5em",      // Firefox
            "-khtml-border-radius": ".5em"     // Konqueror
          },
          onclick: function () {DIV.style.display = "none"}
        },
        [["span",{style:{position:"relative", bottom:".2em"}},["x"]]]
      ],
      "MathJax no longer loads a default configuration file; " +
      "you must specify such files explicitly. " +
      "This page seems to use the older default ",["code",{},["config/MathJax.js"]],
      " file, and so needs to be updated.  This is explained further at",
      ["p",{style:{"text-align":"center"}},[
        ["a",
          {href:"http://www.mathjax.org/help/configuration"},
          ["http://www.mathjax.org/help/configuration"]
        ]
      ]]
    ]);
  });

})(MathJax.Hub,MathJax.HTML);

MathJax.Ajax.loadComplete("[MathJax]/extensions/v1.0-warning.js");
