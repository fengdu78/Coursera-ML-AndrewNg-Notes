/*************************************************************
 *
 *  MathJax/extensions/TeX/noErrors.js
 *  
 *  Prevents the TeX error messages from being displayed and shows the
 *  original TeX code instead.  You can configure whether the dollar signs
 *  are shown or not for in-line math, and whether to put all the TeX on
 *  one line or use multiple-lines.
 *  
 *  To configure this extension, use
 *  
 *      MathJax.Hub.Config({
 *        TeX: {
 *          noErrors: {
 *            inlineDelimiters: ["",""],   // or ["$","$"] or ["\\(","\\)"]
 *            multiLine: true,             // false for TeX on all one line
 *            style: {
 *              "font-size":   "90%",
 *              "text-align":  "left",
 *              "color":       "black",
 *              "padding":     "1px 3px",
 *              "border":      "1px solid"
 *                // add any additional CSS styles that you want
 *                //  (be sure there is no extra comma at the end of the last item)
 *            }
 *          }
 *        }
 *      });
 *  
 *  Display-style math is always shown in multi-line format, and without
 *  delimiters, as it will already be set off in its own centered
 *  paragraph, like standard display mathematics.
 *  
 *  The default settings place the invalid TeX in a multi-line box with a
 *  black border.  If you want it to look as though the TeX is just part of
 *  the paragraph, use
 *
 *      MathJax.Hub.Config({
 *        TeX: {
 *          noErrors: {
 *            inlineDelimiters: ["$","$"],   // or ["",""] or ["\\(","\\)"]
 *            multiLine: false,
 *            style: {
 *              "font-size": "normal",
 *              "border": ""
 *            }
 *          }
 *        }
 *      });
 *  
 *  You may also wish to set the font family, as the default is "serif"
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2009-2012 Design Science, Inc.
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
  
  var CONFIG = HUB.CombineConfig("TeX.noErrors",{
    disabled: false,               // set to true to return to original error messages
    multiLine: true,
    inlineDelimiters: ["",""],     // or use ["$","$"] or ["\\(","\\)"]
    style: {
      "font-size":   "90%",
      "text-align":  "left",
      "color":       "black",
      "padding":     "1px 3px",
      "border":      "1px solid"
    }
  });
  
  var NBSP = "\u00A0";

  //
  //  The configuration defaults, augmented by the user settings
  //  
  MathJax.Extension["TeX/noErrors"] = {
    version: VERSION,
    config: CONFIG
  };
  
  HUB.Register.StartupHook("TeX Jax Ready",function () {
    var FORMAT = MathJax.InputJax.TeX.formatError;
    
    MathJax.InputJax.TeX.Augment({
      //
      //  Make error messages be the original TeX code
      //  Mark them as errors and multi-line or not, and for
      //  multi-line TeX, make spaces non-breakable (to get formatting right)
      //
      formatError: function (err,math,displaystyle,script) {
        if (CONFIG.disabled) {return FORMAT.apply(this,arguments)}
        var message = err.message.replace(/\n.*/,"");
        HUB.signal.Post(["TeX Jax - parse error",message,math,displaystyle,script]);
        var delim = CONFIG.inlineDelimiters;
        var multiLine = (displaystyle || CONFIG.multiLine);
        if (!displaystyle) {math = delim[0] + math + delim[1]}
        if (multiLine) {math = math.replace(/ /g,NBSP)} else {math = math.replace(/\n/g," ")}
        return MathJax.ElementJax.mml.merror(math).With({isError:true, multiLine: multiLine});
      }
    });
  });
  
  /*******************************************************************
   *
   *   Fix HTML-CSS output
   */

  HUB.Register.StartupHook("HTML-CSS Jax Config",function () {
    HUB.Config({
      "HTML-CSS": {
        styles: {
          ".MathJax .noError": HUB.Insert({
            "vertical-align": (HUB.Browser.isMSIE && CONFIG.multiLine ? "-2px" : "")
          },CONFIG.style)
        }
      }
    });
  });
    
  HUB.Register.StartupHook("HTML-CSS Jax Ready",function () {
    var MML = MathJax.ElementJax.mml;
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"];
    
    var MATH   = MML.math.prototype.toHTML,
        MERROR = MML.merror.prototype.toHTML;
        
    //
    // Override math toHTML routine so that error messages
    //   don't have the clipping and other unneeded overhead
    //
    MML.math.Augment({
      toHTML: function (span,node) {
        var data = this.data[0];
        if (data && data.data[0] && data.data[0].isError) {
          span.style.fontSize = "";
          span = this.HTMLcreateSpan(span);
          span.bbox = data.data[0].toHTML(span).bbox;
        } else {
          span = MATH.call(this,span,node);
        }
        return span;
      }
    });
    
    //
    //  Override merror toHTML routine so that it puts out the
    //    TeX code in an inline-block with line breaks as in the original
    //
    MML.merror.Augment({
      toHTML: function (span) {
        if (!this.isError) {return MERROR.call(this,span)}
        span = this.HTMLcreateSpan(span); span.className = "noError"
        if (this.multiLine) {span.style.display = "inline-block"}
        var text = this.data[0].data[0].data.join("").split(/\n/);
        for (var i = 0, m = text.length; i < m; i++) {
          HTMLCSS.addText(span,text[i]);
          if (i !== m-1) {HTMLCSS.addElement(span,"br",{isMathJax:true})}
        }
        var HD = HTMLCSS.getHD(span.parentNode), W = HTMLCSS.getW(span.parentNode);
        if (m > 1) {
          var H = (HD.h + HD.d)/2, x = HTMLCSS.TeX.x_height/2;
          span.parentNode.style.verticalAlign = HTMLCSS.Em(HD.d+(x-H));
          HD.h = x + H; HD.d = H - x;
        }
        span.bbox = {h: HD.h, d: HD.d, w: W, lw: 0, rw: W};
        return span;
      }
    });

  });
  
  /*******************************************************************
   *
   *   Fix SVG output
   */

  HUB.Register.StartupHook("SVG Jax Config",function () {
    HUB.Config({
      "SVG": {
        styles: {
          ".MathJax_SVG .noError": HUB.Insert({
            "vertical-align": (HUB.Browser.isMSIE && CONFIG.multiLine ? "-2px" : "")
          },CONFIG.style)
        }
      }
    });
  });

  HUB.Register.StartupHook("SVG Jax Ready",function () {
    var MML = MathJax.ElementJax.mml;
    
    var MATH   = MML.math.prototype.toSVG,
        MERROR = MML.merror.prototype.toSVG;
        
    //
    // Override math toSVG routine so that error messages
    //   don't have the clipping and other unneeded overhead
    //
    MML.math.Augment({
      toSVG: function (span,node) {
        var data = this.data[0];
        if (data && data.data[0] && data.data[0].isError)
          {span = data.data[0].toSVG(span)} else {span = MATH.call(this,span,node)}
        return span;
      }
    });
    
    //
    //  Override merror toSVG routine so that it puts out the
    //    TeX code in an inline-block with line breaks as in the original
    //
    MML.merror.Augment({
      toSVG: function (span) {
        if (!this.isError || this.Parent().type !== "math") {return MERROR.call(this,span)}
        span = HTML.addElement(span,"span",{className: "noError", isMathJax:true});
        if (this.multiLine) {span.style.display = "inline-block"}
        var text = this.data[0].data[0].data.join("").split(/\n/);
        for (var i = 0, m = text.length; i < m; i++) {
          HTML.addText(span,text[i]);
          if (i !== m-1) {HTML.addElement(span,"br",{isMathJax:true})}
        }
        if (m > 1) {
          var H = span.offsetHeight/2;
          span.style.verticalAlign = (-H+(H/m))+"px";
        }
        return span;
      }
    });

  });
  
  /*******************************************************************
   *
   *   Fix NativeMML output
   */

  HUB.Register.StartupHook("NativeMML Jax Ready",function () {
    var MML = MathJax.ElementJax.mml;
    var CONFIG = MathJax.Extension["TeX/noErrors"].config;
    
    var MATH   = MML.math.prototype.toNativeMML,
        MERROR = MML.merror.prototype.toNativeMML;

    //
    // Override math toNativeMML routine so that error messages
    //   don't get placed inside math tags.
    //
    MML.math.Augment({
      toNativeMML: function (span) {
        var data = this.data[0];
        if (data && data.data[0] && data.data[0].isError)
          {span = data.data[0].toNativeMML(span)} else {span = MATH.call(this,span)}
        return span;
      }
    });
    
    //
    //  Override merror toNativeMML routine so that it puts out the
    //    TeX code in an inline-block with line breaks as in the original
    //
    MML.merror.Augment({
      toNativeMML: function (span) {
        if (!this.isError) {return MERROR.call(this,span)}
        span = span.appendChild(document.createElement("span"));
        var text = this.data[0].data[0].data.join("").split(/\n/);
        for (var i = 0, m = text.length; i < m; i++) {
          span.appendChild(document.createTextNode(text[i]));
          if (i !== m-1) {span.appendChild(document.createElement("br"))}
        }
        if (this.multiLine) {
          span.style.display = "inline-block";
          if (m > 1) {span.style.verticalAlign = "middle"}
        }
        for (var id in CONFIG.style) {if (CONFIG.style.hasOwnProperty(id)) {
          var ID = id.replace(/-./g,function (c) {return c.charAt(1).toUpperCase()});
          span.style[ID] = CONFIG.style[id];
        }}
        return span;
      }
    });
    
  });

  /*******************************************************************/
  
  HUB.Startup.signal.Post("TeX noErrors Ready");

})(MathJax.Hub,MathJax.HTML);
  

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/noErrors.js");
