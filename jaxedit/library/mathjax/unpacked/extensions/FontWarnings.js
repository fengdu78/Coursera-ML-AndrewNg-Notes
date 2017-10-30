/*************************************************************
 *
 *  MathJax/extensions/FontWarnings.js
 *  
 *  Implements a font warning message window that appears when
 *  the image fonts, no fonts, or web fonts are used, informing
 *  the user where to download the fonts, or to update to a more
 *  modern browser.  The window will fade out automatically after
 *  a time, and the user can dismiss it by a close box.
 *  
 *  To include font warning messages, add "FontWarnings.js" to the
 *  extensions array in your MathJax configuration.
 *  
 *  You can customize the warning messages in a number of ways.  Use the
 *  FontWarnings section of the configuration to specify any of the items
 *  shown in the CONFIG variable below.  These include
 *  
 *    messageStyle       the style to apply to the warning box that is
 *                       displayed when MathJax uses one of its fallback
 *                       methods.
 *                       
 *    removeAfter        the amount of time to show the warning message (in ms)
 *    fadeoutTime        how long the message should take to fade out
 *    fadeoutSteps       how many separate steps to use during the fade out
 *                       (set to 0 to use no fadeout and simply remove the window)
 *    
 *    Messages           stores the descriptions of the messages to use for the
 *                       various warnings (webFonts, imageFonts, and noFonts).
 *                       These are arrays of strings to be inserted into the window,
 *                       or identifiers within brackets, which refer to the HTML
 *                       snippets in the HTML section described below.  To disable a
 *                       specific message, set its value to null (see example below).
 *    
 *    HTML               stores snippets of HTML descriptions for various
 *                       common parts of the error messages.  These include
 *                       the closeBox, the message about web fonts being available
 *                       in modern browser, and messages about downloadable fonts.
 *                       The STIX and TeX font messages are used when only one
 *                       of these is in the availableFonts list.  The data for these
 *                       are arrays of either strings to include or a description of
 *                       an HTML item enclosed in square brackets.  That description
 *                       has (up to) three parts: the name of the tag to be included,
 *                       a list (enclosed in braces) of attributes and their values 
 *                       to be set on the tag (optional), and an array of the contents
 *                       of the tag (optional).  See the definitions below for examples.
 *   
 *   For example,
 *   
 *       MathJax.Hub.Config({
 *         ...
 *         extensions: ["FontWarnings.js"],
 *         FontWarnings: {
 *           removeAfter: 20*1000,    // 20 seconds
 *           messageStyle: {
 *             border: "2px solid black",
 *             padding: "2em"
 *           },
 *           Message: {
 *             webFont: null    // no webfont messages (only image and no fonts)
 *           }
 *         }
 *       });
 *       
 *   would extend the time the message is displayed from 12 seconds to 20,
 *   and changes the border to a solid black one, with 2em of padding
 *   rather than the default of 1em.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010-2012 Design Science, Inc.
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
  
  var CONFIG = HUB.CombineConfig("FontWarnings",{
    //
    // The CSS for the message window
    //
    messageStyle: {
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
    },
    
    //
    //  The messages for the various situations
    //
    Message: {
      webFont: [
        ["closeBox"],
        "MathJax is using web-based fonts to display the mathematics ",
        "on this page.  These take time to download, so the page would ",
        "render faster if you installed math fonts directly in your ",
        "system's font folder.",
        ["fonts"]
      ],

      imageFonts: [
        ["closeBox"],
        "MathJax is using its image fonts rather than local or web-based fonts. ",
        "This will render slower than usual, and the mathematics may not print ",
        "at the full resolution of your printer.",
        ["fonts"],
        ["webfonts"]
      ],
      
      noFonts: [
        ["closeBox"],
        "MathJax is unable to locate a font to use to display ",
        "its mathematics, and image fonts are not available, so it ",
        "is falling back on generic unicode characters in hopes that ",
        "your browser will be able to display them.  Some characters ",
        "may not show up properly, or possibly not at all.",
        ["fonts"],
        ["webfonts"]
      ]
    },
    
    //
    //  HTML objects that can be referred to in the message definitions
    //
    HTML: {
      //
      //  The definition of the close box
      //
      closeBox: [[
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
          onclick: function () {
            if (DATA.div && DATA.fade === 0)
              {if (DATA.timer) {clearTimeout(DATA.timer)}; DATA.div.style.display = "none"}
          }
        },
        [["span",{style:{position:"relative", bottom:".2em"}},["x"]]]
      ]],
      
      webfonts: [
        ["p"],
        "Most modern browsers allow for fonts to be downloaded over the web. ",
        "Updating to a more recent version of your browser (or changing browsers) ",
        "could improve the quality of the mathematics on this page."
      ],
      
      fonts: [
        ["p"],
        "MathJax can use either the ",
        ["a",{href:"http://www.stixfonts.org/",target:"_blank"},"STIX fonts"],
        " or the ",
        ["a",{href:"http://www.mathjax.org/help-v2/fonts/",target:"_blank"},["MathJax TeX fonts"]],
        ".  Download and install either one to improve your MathJax experience."
      ],
      
      STIXfonts: [
        ["p"],
        "This page is designed to use the ",
        ["a",{href:"http://www.stixfonts.org/",target:"_blank"},"STIX fonts"],
        ".  Download and install those fonts to improve your MathJax experience."
      ],
      
      TeXfonts: [
        ["p"],
        "This page is designed to use the ",
        ["a",{href:"http://www.mathjax.org/help-v2/fonts/",target:"_blank"},["MathJax TeX fonts"]],
        ".  Download and install those fonts to improve your MathJax experience."
      ]
      
    },
    
    removeAfter: 12*1000,  // time to show message (in ms)
    fadeoutSteps: 10,      // fade-out steps
    fadeoutTime: 1.5*1000  // fadeout over this amount of time (in ms)

  });
  if (MathJax.Hub.Browser.isIE9 && document.documentMode >= 9)
    {delete CONFIG.messageStyle.filter}

  //
  //  Data for the window
  //
  var DATA = {
    div: null,  // the message window, when displayed
    fade: 0     // number of fade-out steps so far
  };
  
  //
  //  Create the message window and start the fade-out timer
  //
  var CREATEMESSAGE = function (data) {
    if (DATA.div) return;
    var HTMLCSS = MathJax.OutputJax["HTML-CSS"], frame = document.body;
    if (HUB.Browser.isMSIE) {
      if (CONFIG.messageStyle.position === "fixed") {
        MathJax.Message.Init();  // make sure MathJax_MSIE_frame exists
        frame = document.getElementById("MathJax_MSIE_Frame");
        CONFIG.messageStyle.position = "absolute";
      }
    } else {delete CONFIG.messageStyle.filter}
    CONFIG.messageStyle.maxWidth = (document.body.clientWidth-75) + "px";
    var i = 0; while (i < data.length) {
      if (data[i] instanceof Array && CONFIG.HTML[data[i][0]])
        {data.splice.apply(data,[i,1].concat(CONFIG.HTML[data[i][0]]))} else {i++}
    }
    DATA.div = HTMLCSS.addElement(frame,"div",{id:"MathJax_FontWarning",style:CONFIG.messageStyle},data);
    if (CONFIG.removeAfter) {
      HUB.Register.StartupHook("End",function () 
         {DATA.timer = setTimeout(FADEOUT,CONFIG.removeAfter)});
    }
    HTML.Cookie.Set("fontWarn",{warned:true});
  };
  
  //
  //  Set the opacity based on the number of steps taken so far
  //  and remove the window when it gets to 0
  //
  var FADEOUT = function () {
    DATA.fade++; if (DATA.timer) {delete DATA.timer}
    if (DATA.fade < CONFIG.fadeoutSteps) {
      var opacity = 1 - DATA.fade/CONFIG.fadeoutSteps;
      DATA.div.style.opacity = opacity;
      DATA.div.style.filter = "alpha(opacity="+Math.floor(100*opacity)+")";
      setTimeout(FADEOUT,CONFIG.fadeoutTime/CONFIG.fadeoutSteps);
    } else {
      DATA.div.style.display = "none";
    }
  };
  
  //
  //  Check that we haven't already issued a warning
  //
  if (!HTML.Cookie.Get("fontWarn").warned) {
    //
    //  Hook into the Startup signal and look for font warning messages.
    //  When one comes, issue the correct message.
    //
    HUB.Startup.signal.Interest(function (message) {
      if (message.match(/HTML-CSS Jax - /) && !DATA.div) {
        var HTMLCSS = MathJax.OutputJax["HTML-CSS"], FONTS = HTMLCSS.config.availableFonts, MSG;
        var localFonts = (FONTS && FONTS.length);
	if (!localFonts) {CONFIG.HTML.fonts = [""]}
	else if (FONTS.length === 1) {CONFIG.HTML.fonts = CONFIG.HTML[FONTS[0]+"fonts"]}
        if (HTMLCSS.allowWebFonts) {CONFIG.HTML.webfonts = [""]}
        if (message.match(/- Web-Font/)) {if (localFonts) {MSG = "webFont"}}
        else if (message.match(/- using image fonts/)) {MSG = "imageFonts"}
        else if (message.match(/- no valid font/)) {MSG = "noFonts"}
        if (MSG && CONFIG.Message[MSG]) {CREATEMESSAGE(CONFIG.Message[MSG])}
      }
    });
  }

})(MathJax.Hub,MathJax.HTML);

MathJax.Ajax.loadComplete("[MathJax]/extensions/FontWarnings.js");
