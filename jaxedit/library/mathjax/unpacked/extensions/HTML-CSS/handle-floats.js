/*************************************************************
 *
 *  MathJax/extensions/HTML-CSS/handle-floats.js
 *
 *  This extension allows HTML-CSS output to deal with floating elements
 *  better.  In particular, when there are tags or equation numbers, these
 *  would overlap floating elements, but with this extension, the width of
 *  the line should properly correspond to the amount of space remaining.
 *  
 *  To load it, include
 *  
 *      "HTML-CSS": {
 *        extensions: ["handle-floats.js"]
 *      }
 *  
 *  in your configuration.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2012 Design Science, Inc.
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


MathJax.Extension["HTML-CSS/handle-floats"] = {
  version: "2.1"
};

//
//  Make the display DIV be a table-cell
//  Use padding to get the separation, since table cells don't do margin
//  Make the width large (it will shrink to fit the remaining room)
//
MathJax.Hub.Config({
  "HTML-CSS": {
    styles: {
      ".MathJax_Display": {
        display: "table-cell",
        padding: "1em 0 ! important",
        width: (MathJax.Hub.Browser.isMSIE && (document.documentMode||0) < 8 ? "100%" : "1000em")
      }
    }
  }
});

//
//  Two consecutive equations would end up side-by-side, so force a separator
//  (Needed by IE8, IE9, and Firefox, at least).
//  
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var HTMLCSS = MathJax.OutputJax["HTML-CSS"],
      TRANSLATE = HTMLCSS.Translate;
  HTMLCSS.Augment({
    Translate: function (script,state) {
      TRANSLATE.call(this,script,state);
      if (script.MathJax.elementJax.HTMLCSS.display) {
        var next = script.nextSibling;
        if (!next || next.className !== "MathJax_MSIE_Separator") {
          var span = HTMLCSS.Element("span",{className:"MathJax_MSIE_Separator"});
          script.parentNode.insertBefore(span,next);
        }
      }
    }
  });
  MathJax.Hub.Startup.signal.Post("HTML-CSS handle-floats Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/HTML-CSS/handle-floats.js");
