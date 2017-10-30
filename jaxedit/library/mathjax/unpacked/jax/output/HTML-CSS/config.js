/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/config.js
 *  
 *  Initializes the HTML-CCS OutputJax  (the main definition is in
 *  MathJax/jax/input/HTML-CSS/jax.js, which is loaded when needed).
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

MathJax.OutputJax["HTML-CSS"] = MathJax.OutputJax({
  id: "HTML-CSS",
  version: "2.1",
  directory: MathJax.OutputJax.directory + "/HTML-CSS",
  extensionDir: MathJax.OutputJax.extensionDir + "/HTML-CSS",
  autoloadDir: MathJax.OutputJax.directory + "/HTML-CSS/autoload",
  fontDir: MathJax.OutputJax.directory + "/HTML-CSS/fonts", // font name added later
  webfontDir: MathJax.OutputJax.fontDir + "/HTML-CSS",      // font name added later
  
  config: {
    scale: 100, minScaleAdjust: 50, // global math scaling factor, and minimum adjusted scale factor
    availableFonts: ["STIX","TeX"], // list of local fonts to check for
    preferredFont: "TeX",           // preferred local font (TeX or STIX)
    webFont: "TeX",                 // web-based font to use when no local fonts found (TeX is only choice)
    imageFont: "TeX",               // font to use for image fallback mode (TeX is only choice)
    undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif", // fonts to use for unknown unicode characters
    mtextFontInherit: false,        // to make <mtext> be in page font rather than MathJax font

    EqnChunk: (MathJax.Hub.Browser.isMobile ? 10: 50),
                                    // number of equations to process before showing them
    EqnChunkFactor: 1.5,            // chunk size is multiplied by this after each chunk
    EqnChunkDelay: 100,             // milliseconds to delay between chunks (to let browser
                                    //   respond to other events)

    linebreaks: {
      automatic: false,   // when false, only process linebreak="newline",
                          // when true, insert line breaks automatically in long expressions.

      width: "container" // maximum width of a line for automatic line breaks (e.g. "30em").
                         // use "container" to compute size from containing element,
                         // use "nn% container" for a portion of the container,
                         // use "nn%" for a portion of the window size
    },
    
    styles: {
      ".MathJax_Display": {
        "text-align": "center",
        margin:       "1em 0em"
      },
      
      ".MathJax .merror": {
        "background-color": "#FFFF88",
        color:   "#CC0000",
        border:  "1px solid #CC0000",
        padding: "1px 3px",
        "font-style": "normal",
        "font-size":  "90%"
      },
      
      "#MathJax_Tooltip": {
        "background-color": "InfoBackground", color: "InfoText",
        border: "1px solid black",
        "box-shadow": "2px 2px 5px #AAAAAA",         // Opera 10.5
        "-webkit-box-shadow": "2px 2px 5px #AAAAAA", // Safari 3 and Chrome
        "-moz-box-shadow": "2px 2px 5px #AAAAAA",    // Forefox 3.5
        "-khtml-box-shadow": "2px 2px 5px #AAAAAA",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')", // IE
        padding: "3px 4px"
      }
    }
    
  }
});
if (MathJax.Hub.Browser.isMSIE && document.documentMode >= 9)
  {delete MathJax.OutputJax["HTML-CSS"].config.styles["#MathJax_Tooltip"].filter}

if (!MathJax.Hub.config.delayJaxRegistration)
  {MathJax.OutputJax["HTML-CSS"].Register("jax/mml")}

MathJax.Hub.Register.StartupHook("End Config",[function (HUB,HTMLCSS) {
  var CONFIG = HUB.Insert({

    //
    //  The minimum versions that HTML-CSS supports
    //
    minBrowserVersion: {
      Firefox: 3.0,
      Opera: 9.52,
      MSIE: 6.0,
      Chrome: 0.3,
      Safari: 2.0,
      Konqueror: 4.0
    },
    
    //
    //  For unsupported browsers, put back these delimiters for the preview
    //
    inlineMathDelimiters:  ['$','$'],    // or ["",""] or ["\\(","\\)"]
    displayMathDelimiters: ['$$','$$'],  // or ["",""] or ["\\[","\\]"]
    //
    //  For displayed math, insert <BR> for \n?
    //
    multilineDisplay: true,

    //
    //  The function to call to display the math for unsupported browsers
    //
    minBrowserTranslate: function (script) {
      var MJ = HUB.getJaxFor(script), text = ["[Math]"], delim;
      var span = document.createElement("span",{className: "MathJax_Preview"});
      if (MJ.inputJax === "TeX") {
        if (MJ.root.Get("displaystyle")) {
          delim = CONFIG.displayMathDelimiters;
          text = [delim[0]+MJ.originalText+delim[1]];
          if (CONFIG.multilineDisplay) text = text[0].split(/\n/);
        } else {
          delim = CONFIG.inlineMathDelimiters;
          text = [delim[0]+MJ.originalText.replace(/^\s+/,"").replace(/\s+$/,"")+delim[1]];
        }
      }
      for (var i = 0, m = text.length; i < m; i++) {
        span.appendChild(document.createTextNode(text[i]));
        if (i < m-1) {span.appendChild(document.createElement("br"))}
      }
      script.parentNode.insertBefore(span,script);
    }

  },(HUB.config["HTML-CSS"]||{}));

  if (HUB.Browser.version !== "0.0" &&
     !HUB.Browser.versionAtLeast(CONFIG.minBrowserVersion[HUB.Browser]||0.0)) {
       HTMLCSS.Translate = CONFIG.minBrowserTranslate;
       HUB.Config({showProcessingMessages: false});
       MathJax.Message.Set("Your browser does not support MathJax",null,4000);
       HUB.Startup.signal.Post("MathJax not supported");
  }

},MathJax.Hub,MathJax.OutputJax["HTML-CSS"]]);


MathJax.OutputJax["HTML-CSS"].loadComplete("config.js");
