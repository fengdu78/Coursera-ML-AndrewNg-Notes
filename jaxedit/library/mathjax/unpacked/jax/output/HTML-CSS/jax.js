/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/jax.js
 *
 *  Implements the HTML-CSS OutputJax that displays mathematics
 *  using HTML and CSS to position the characters from math fonts
 *  in their proper locations.
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


(function (AJAX,HUB,HTMLCSS) {
  var MML, isMobile = HUB.Browser.isMobile;
   
  var FONTTEST = MathJax.Object.Subclass({
    timeout:  (isMobile? 15:8)*1000,   // timeout for loading web fonts

    FontInfo: {
      STIX: {family: "STIXSizeOneSym", testString: "() {} []"},
      TeX:  {family: "MathJax_Size1",  testString: "() {} []"}
    },
    comparisonFont: ["sans-serif","monospace","script","Times","Courier","Arial","Helvetica"],
    testSize: ["40px","50px","60px","30px","20px"],

    Init: function () {
      this.div = MathJax.HTML.addElement(document.body,"div",{
        id: "MathJax_Font_Test",
        style: {position:"absolute", visibility:"hidden", top:0, left:0, width: "auto",
                padding:0, border:0, margin:0, whiteSpace:"nowrap",
                textAlign:"left", textIndent:0, textTransform:"none",
                lineHeight:"normal", letterSpacing:"normal", wordSpacing:"normal",
                fontSize:this.testSize[0], fontWeight:"normal", fontStyle:"normal",
                fontSizeAdjust:"none"}
      },[""]);
      this.text = this.div.firstChild;
    },

    findFont: function (fonts,pref) {
      if (pref && this.testCollection(pref)) {return pref}
      for (var i = 0, m = fonts.length; i < m; i++) {
        if (fonts[i] === pref) continue;
        if (this.testCollection(fonts[i])) {return fonts[i]}
      }
      return null;
    },

    testCollection: function (name) {return this.testFont(this.FontInfo[name])},

    testFont: function (font) {
      if (font.isWebFont && HTMLCSS.FontFaceBug) {
        this.div.style.fontWeight = this.div.style.fontStyle = "normal";
      } else {
        this.div.style.fontWeight = (font.weight||"normal");
        this.div.style.fontStyle  = (font.style||"normal");
      }
      var W = this.getComparisonWidths(font.testString,font.noStyleChar);
      if (W) {
        this.div.style.fontFamily = "'"+font.family+"',"+this.comparisonFont[0];
        if (this.div.offsetWidth == W[0]) {
          this.div.style.fontFamily = "'"+font.family+"',"+this.comparisonFont[W[2]];
          if (this.div.offsetWidth == W[1]) {return false}
        }
        if (this.div.offsetWidth != W[3] || this.div.offsetHeight != W[4]) {
          if (font.noStyleChar || !HTMLCSS.FONTDATA || !HTMLCSS.FONTDATA.hasStyleChar) {return true}
          for (var i = 0, m = this.testSize.length; i < m; i++)
            {if (this.testStyleChar(font,this.testSize[i])) {return true}}
        }
      }
      return false;
    },

    styleChar:   "\uEFFD", // width encodes style
    versionChar: "\uEFFE", // width encodes version
    compChar:    "\uEFFF", // "standard" width to compare to

    testStyleChar: function (font,size) {
      var n = 3 + (font.weight ? 2 : 0) + (font.style ? 4 : 0);
      var extra = "", dw = 0;
      var SIZE = this.div.style.fontSize; this.div.style.fontSize = size;
      if (HTMLCSS.msieItalicWidthBug && font.style === "italic") {
        this.text.nodeValue = extra = this.compChar;
        dw = this.div.offsetWidth;
      }
      if (HTMLCSS.safariTextNodeBug) {this.div.innerHTML = this.compChar+extra}
        else {this.text.nodeValue = this.compChar+extra}
      var W = this.div.offsetWidth-dw;
      if (HTMLCSS.safariTextNodeBug) {this.div.innerHTML = this.styleChar+extra}
        else {this.text.nodeValue = this.styleChar+extra}
      var N = Math.floor((this.div.offsetWidth-dw)/W+.5);
      if (N === n) {
        if (HTMLCSS.safariTextNodeBug) {this.div.innerHTML = this.versionChar+extra}
          else {this.text.nodeValue = this.versionChar+extra}
        font.version = Math.floor((this.div.offsetWidth-dw)/W+1.5)/2;
      }
      this.div.style.fontSize = SIZE;
      return (N === n);
    },

    getComparisonWidths: function (string,noStyleChar) {
      if (HTMLCSS.FONTDATA && HTMLCSS.FONTDATA.hasStyleChar && !noStyleChar)
        {string += this.styleChar + " " + this.compChar}
      if (HTMLCSS.safariTextNodeBug) {this.div.innerHTML = string}
        else {this.text.nodeValue = string}
      this.div.style.fontFamily = this.comparisonFont[0];
      var W = this.div.offsetWidth;
      this.div.style.fontFamily = HTMLCSS.webFontDefault;
      var sW = this.div.offsetWidth, sH = this.div.offsetHeight;
      for (var i = 1, m = this.comparisonFont.length; i < m; i++) {
        this.div.style.fontFamily = this.comparisonFont[i];
        if (this.div.offsetWidth != W) {return [W,this.div.offsetWidth,i,sW,sH]}
      }
      return null;
    },

    loadWebFont: function (font) {
      HUB.Startup.signal.Post("HTML-CSS Jax - Web-Font "+HTMLCSS.fontInUse+"/"+font.directory);
      var n = MathJax.Message.File("Web-Font "+HTMLCSS.fontInUse+"/"+font.directory);
      var done = MathJax.Callback({}); // called when font is loaded
      var callback = MathJax.Callback(["loadComplete",this,font,n,done]);
      AJAX.timer.start(AJAX,[this.checkWebFont,font,callback],0,this.timeout);
      return done;
    },
    loadComplete: function (font,n,done,status) {
      MathJax.Message.Clear(n);
      if (status === AJAX.STATUS.OK) {this.webFontLoaded = true; done(); return}
      this.loadError(font);
      if (HUB.Browser.isFirefox && HTMLCSS.allowWebFonts) {
        var host = document.location.protocol + "//" + document.location.hostname;
        if (document.location.port != "") {host += ":" + document.location.port}
        host += "/";
        if (AJAX.fileURL(HTMLCSS.webfontDir).substr(0,host.length) !== host)
          {this.firefoxFontError(font)}
      }
      if (!this.webFontLoaded) {HTMLCSS.loadWebFontError(font,done)} else {done()}
    },
    loadError: function (font) {
      MathJax.Message.Set("Can't load web font "+HTMLCSS.fontInUse+"/"+font.directory,null,2000);
      HUB.Startup.signal.Post(["HTML-CSS Jax - web font error",HTMLCSS.fontInUse+"/"+font.directory,font]);
    },
    firefoxFontError: function (font) {
      MathJax.Message.Set("Firefox can't load web fonts from a remote host",null,3000);
      HUB.Startup.signal.Post("HTML-CSS Jax - Firefox web fonts on remote host error");
    },

    checkWebFont: function (check,font,callback) {
      if (check.time(callback)) return;
      if (HTMLCSS.Font.testFont(font)) {callback(check.STATUS.OK)}
        else {setTimeout(check,check.delay)}
    },

    fontFace: function (name) {
      var type = HTMLCSS.allowWebFonts;
      var FONT = HTMLCSS.FONTDATA.FONTS[name];
      if (HTMLCSS.msieFontCSSBug && !FONT.family.match(/-Web$/)) {FONT.family += "-Web"}
      var dir = AJAX.fileURL(HTMLCSS.webfontDir+"/"+type);
      var fullname = name.replace(/-b/,"-B").replace(/-i/,"-I").replace(/-Bold-/,"-Bold");
      if (!fullname.match(/-/)) {fullname += "-Regular"}
      if (type === "svg") {fullname += ".svg#"+fullname} else {fullname += "."+type}
      var def = {
        "font-family": FONT.family,
        src: "url('"+dir+"/"+fullname+"')"
      };
      if (type === "otf") {
        def.src += " format('opentype')";
        dir = AJAX.fileURL(HTMLCSS.webfontDir+"/woff");  // add woff fonts as well
        def.src = "url('"+dir+"/"+fullname.replace(/otf$/,"woff")+"') format('woff'), "+def.src;
      } else if (type !== "eot") {def.src += " format('"+type+"')"}
      if (!(HTMLCSS.FontFaceBug && FONT.isWebFont)) {
        if (name.match(/-bold/)) {def["font-weight"] = "bold"}
        if (name.match(/-italic/)) {def["font-style"] = "italic"}
      }
      return def;
    }
  });
  
  var EVENT, TOUCH, HOVER; // filled in later
  
  HTMLCSS.Augment({
    config: {
      styles: {
        ".MathJax": {
          "display":         "inline",
          "font-style":      "normal",
          "font-weight":     "normal",
          "line-height":     "normal",
          "font-size":       "100%",
          "font-size-adjust":"none",
          "text-indent":     0,
          "text-align":      "left",
          "text-transform":  "none",
          "letter-spacing":  "normal",
          "word-spacing":    "normal",
          "word-wrap":       "normal",
          "white-space":     "nowrap",
          "float":           "none",
          "direction":       "ltr",
          border: 0, padding: 0, margin: 0
        },

        ".MathJax_Display": {
          position: "relative",
          display: "block",
          width: "100%"
        },

        ".MathJax img, .MathJax nobr, .MathJax a": {
          border: 0, padding: 0, margin: 0, "max-width": "none", "max-height": "none",
          "vertical-align": 0, "line-height": "normal",
          "text-decoration": "none"
        },
        "img.MathJax_strut": {
          border:"0 !important", padding:"0 !important", margin: "0 !important",
          "vertical-align": "0 !important"
        },
        
	".MathJax span": {
	  display: "inline", position: "static",
	  border: 0, padding: 0, margin: 0,
	  "vertical-align": 0, "line-height": "normal",
	  "text-decoration": "none"
	},

        ".MathJax nobr": {
          "white-space": "nowrap ! important"
        },
        
        ".MathJax img": {
          display: "inline ! important",
          "float": "none ! important"
        },

        ".MathJax_Processing": {
          visibility: "hidden", position:"fixed",
          width: 0, height: 0, overflow:"hidden"
        },
        ".MathJax_Processed": {display:"none!important"},
        
        ".MathJax_ExBox": {
          display:"block", overflow:"hidden",
          width:"1px", height:"60ex"
        },
        ".MathJax .MathJax_EmBox": {
          display:"block", overflow:"hidden",
          width:"1px", height:"60em"
        },
        
        ".MathJax .MathJax_HitBox": {
          cursor: "text",
          background: "white",
          opacity:0, filter:"alpha(opacity=0)"
        },
        ".MathJax .MathJax_HitBox *": {
          filter: "none", opacity:1, background:"transparent" // for IE
        },
        
        "#MathJax_Tooltip": {
          position: "absolute", left: 0, top: 0,
          width: "auto", height: "auto",
          display: "none"
        },
        "#MathJax_Tooltip *": {
          filter: "none", opacity:1, background:"transparent" // for IE
        },
        
        //
        //  Used for testing web fonts against the default font used while
        //  web fonts are loading
        //
        "@font-face": {
          "font-family": "MathJax_Blank",
          "src": "url('about:blank')"
        }

      }
    },
    settings: HUB.config.menuSettings,

    hideProcessedMath: true,           // use display:none until all math is processed

    Font: null,                        // created by Config() below
    webFontDefault: "MathJax_Blank",
    allowWebFonts: "otf",              // assume browser can use OTF web fonts

    Config: function () {
      if (!this.require) {this.require = []}
      this.Font = FONTTEST();
      this.SUPER(arguments).Config.call(this); var settings = this.settings;
      if (this.adjustAvailableFonts) {this.adjustAvailableFonts(this.config.availableFonts)}
      if (settings.scale) {this.config.scale = settings.scale}
      if (settings.font && settings.font !== "Auto") {
        if (settings.font === "TeX (local)")
          {this.config.availableFonts = ["TeX"]; this.config.preferredFont = "TeX"; this.config.webFont = "TeX"}
        else if (settings.font === "STIX (local)")
          {this.config.availableFonts = ["STIX"]; this.config.preferredFont = "STIX"; this.config.webFont = "TeX"}
        else if (settings.font === "TeX (web)") {this.config.availableFonts = []; this.config.preferredFont = ""; this.config.webFont = "TeX"}
        else if (settings.font === "TeX (image)") {this.config.availableFonts = []; this.config.preferredFont = ""; this.config.webFont = ""}
      }
      var font = this.Font.findFont(this.config.availableFonts,this.config.preferredFont);
      if (!font && this.allowWebFonts) {font = this.config.webFont; if (font) {this.webFonts = true}}
      if (!font && this.config.imageFont) {font = this.config.imageFont; this.imgFonts = true}
      if (font) {
        this.fontInUse = font; this.fontDir += "/" + font; this.webfontDir += "/" + font;
        this.require.push(this.fontDir+"/fontdata.js");
        if (this.imgFonts) {
          this.require.push(this.directory+"/imageFonts.js");
          HUB.Startup.signal.Post("HTML-CSS Jax - using image fonts");
        }
      } else {
        MathJax.Message.Set("Can't find a valid font using ["+this.config.availableFonts.join(", ")+"]",null,3000);
        this.FONTDATA = {
          TeX_factor: 1, baselineskip: 1.2, lineH: .8, lineD: .2, ffLineH: .8,
          FONTS: {}, VARIANT: {normal: {fonts:[]}}, RANGES: [],
          DELIMITERS: {}, RULECHAR: 0x2D, REMAP: {}
        };
        if (MathJax.InputJax.TeX && MathJax.InputJax.TeX.Definitions) {
          MathJax.InputJax.TeX.Definitions.macros.overline[1]  = "002D";
          MathJax.InputJax.TeX.Definitions.macros.underline[1] = "002D";
        }
        HUB.Startup.signal.Post("HTML-CSS Jax - no valid font");
      }
      this.require.push(MathJax.OutputJax.extensionDir+"/MathEvents.js");
    },

    Startup: function () {
      //  Set up event handling
      EVENT = MathJax.Extension.MathEvents.Event;
      TOUCH = MathJax.Extension.MathEvents.Touch;
      HOVER = MathJax.Extension.MathEvents.Hover;
      this.ContextMenu = EVENT.ContextMenu;
      this.Mousedown   = EVENT.AltContextMenu;
      this.Mouseover   = HOVER.Mouseover;
      this.Mouseout    = HOVER.Mouseout;
      this.Mousemove   = HOVER.Mousemove;

      // Make hidden div for when math is in a display:none block
      this.hiddenDiv = this.Element("div",{
        style:{visibility:"hidden", overflow:"hidden", position:"absolute", top:0,
               height:"1px", width: "auto", padding:0, border:0, margin:0,
               textAlign:"left", textIndent:0, textTransform:"none",
               lineHeight:"normal", letterSpacing:"normal", wordSpacing:"normal"}
      });
      if (!document.body.firstChild) {document.body.appendChild(this.hiddenDiv)}
        else {document.body.insertBefore(this.hiddenDiv,document.body.firstChild)}
      this.hiddenDiv = this.addElement(this.hiddenDiv,"div",{id:"MathJax_Hidden"});

      // Determine pixels per inch
      var div = this.addElement(this.hiddenDiv,"div",{style:{width:"5in"}});
      this.pxPerInch = div.offsetWidth/5; this.hiddenDiv.removeChild(div);

      // Markers used by getW
      this.startMarker = this.createStrut(this.Element("span"),10,true);
      this.endMarker = this.addText(this.Element("span"),"x").parentNode;

      // Used in getHD
      this.HDspan = this.Element("span");
      if (this.operaHeightBug) {this.createStrut(this.HDspan,0)}
      if (this.msieInlineBlockAlignBug) {
        this.HDimg = this.addElement(this.HDspan,"img",{style:{height:"0px", width:"1px"}});
        try {this.HDimg.src = "about:blank"} catch(err) {}
      } else {
        this.HDimg = this.createStrut(this.HDspan,0);
      }

      // Used in preTranslate to get scaling factors
      this.EmExSpan = this.Element("span",
        {style:{position:"absolute","font-size-adjust":"none"}},
        [
          ["span",{className:"MathJax_ExBox"}],
          ["span",{className:"MathJax"},
            [["span",{className:"MathJax_EmBox"}]]
          ]
        ]
      );

      // Used in preTranslate to get linebreak width
      this.linebreakSpan = this.Element("span",null,
        [["hr",{style: {width:"100%", size:1, padding:0, border:0, margin:0}}]]);

      // Set up styles and preload web fonts
      return AJAX.Styles(this.config.styles,["InitializeHTML",this]);
    },
    
    removeSTIXfonts: function (fonts) {
      //
      //  Opera doesn't display large chunks of the STIX fonts, and
      //  Safari/Windows doesn't display Plane1,
      //  so disable STIX for these browsers.
      //
      for (var i = 0, m = fonts.length; i < m; i++)
        {if (fonts[i] === "STIX") {fonts.splice(i,1); m--; i--;}}
      if (this.config.preferredFont === "STIX") {this.config.preferredFont = fonts[0]}
    },

    PreloadWebFonts: function () {
      if (!HTMLCSS.allowWebFonts || !HTMLCSS.config.preloadWebFonts) return;
      for (var i = 0, m = HTMLCSS.config.preloadWebFonts.length; i < m; i++) {
        var FONT = HTMLCSS.FONTDATA.FONTS[HTMLCSS.config.preloadWebFonts[i]];
        if (!FONT.available) {HTMLCSS.Font.testFont(FONT)}
      }
    },
    
    //
    //  Handle initialization that requires styles to be set up
    //
    InitializeHTML: function () {
      this.PreloadWebFonts();
      //
      //  Get the default sizes (need styles in place to do this)
      //
      document.body.appendChild(this.EmExSpan);
      document.body.appendChild(this.linebreakSpan);
      this.defaultEx    = this.EmExSpan.firstChild.offsetHeight/60;
      this.defaultEm    = this.EmExSpan.lastChild.firstChild.offsetHeight/60;
      this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
      document.body.removeChild(this.linebreakSpan);
      document.body.removeChild(this.EmExSpan);
    },
    
    preTranslate: function (state) {
      var scripts = state.jax[this.id], i, m = scripts.length,
          script, prev, span, div, test, jax, ex, em, scale, maxwidth, relwidth = false,
          linebreak = this.config.linebreaks.automatic, width = this.config.linebreaks.width;
      if (linebreak) {
        relwidth = (width.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null);
        if (relwidth) {width = width.replace(/\s*container\s*/,"")}
          else {maxwidth = this.defaultWidth}
        if (width === "") {width = "100%"}
      } else {maxwidth = 100000} // a big width, so no implicit line breaks
      //
      //  Loop through the scripts
      //
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        //
        //  Remove any existing output
        //
        prev = script.previousSibling;
        if (prev && String(prev.className).match(/^MathJax(_Display)?( MathJax_Processing)?$/))
          {prev.parentNode.removeChild(prev)}
        //
        //  Add the span, and a div if in display mode,
        //  then set the role and mark it as being processed
        //
        jax = script.MathJax.elementJax; if (!jax) continue;
        jax.HTMLCSS = {display: (jax.root.Get("display") === "block")}
        span = div = this.Element("span",{
	  className:"MathJax", id:jax.inputID+"-Frame", isMathJax:true, jaxID:this.id,
          oncontextmenu:EVENT.Menu, onmousedown: EVENT.Mousedown,
          onmouseover:EVENT.Mouseover, onmouseout:EVENT.Mouseout, onmousemove:EVENT.Mousemove,
	  onclick:EVENT.Click, ondblclick:EVENT.DblClick
        });
	if (HUB.Browser.noContextMenu) {
	  span.ontouchstart = TOUCH.start;
	  span.ontouchend = TOUCH.end;
	}
        if (jax.HTMLCSS.display) {
          div = this.Element("div",{className:"MathJax_Display"});
          div.appendChild(span);
        } else if (this.msieDisappearingBug) {span.style.display = "inline-block"}
        //
        //  Mark math for screen readers
        //    (screen readers don't know about role="math" yet, so use "textbox" instead)
        //
        div.setAttribute("role","textbox"); div.setAttribute("aria-readonly","true");
        div.className += " MathJax_Processing";
        script.parentNode.insertBefore(div,script);
        //
        //  Add the test span for determining scales and linebreak widths
        //
        script.parentNode.insertBefore(this.EmExSpan.cloneNode(true),script);
        if (relwidth) {div.parentNode.insertBefore(this.linebreakSpan.cloneNode(true),div)}
      }
      //
      //  Determine the scaling factors for each script
      //  (this only requires one reflow rather than a reflow for each equation)
      //
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        test = script.previousSibling; div = test.previousSibling;
        jax = script.MathJax.elementJax; if (!jax) continue;
        ex = test.firstChild.offsetHeight/60;
        em = test.lastChild.firstChild.offsetHeight/60;
        if (relwidth) {maxwidth = div.previousSibling.firstChild.offsetWidth}
        if (ex === 0 || ex === "NaN") {
          // can't read width, so move to hidden div for processing
          // (this will cause a reflow for each math element that is hidden)
          this.hiddenDiv.appendChild(div);
          jax.HTMLCSS.isHidden = true;
          ex = this.defaultEx; em = this.defaultEm;
          if (relwidth) {maxwidth = this.defaultWidth}
        }
        scale = Math.floor(Math.max(this.config.minScaleAdjust/100,(ex/this.TeX.x_height)/em) * this.config.scale);
        jax.HTMLCSS.scale = scale/100; jax.HTMLCSS.fontSize = scale+"%";
        jax.HTMLCSS.em = jax.HTMLCSS.outerEm = em; this.em = em * scale/100; jax.HTMLCSS.ex = ex;
        jax.HTMLCSS.lineWidth = (linebreak ? this.length2em(width,1,maxwidth/this.em) : 1000000);
      }
      //
      //  Remove the test spans used for determining scales and linebreak widths
      //
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        test = scripts[i].previousSibling;
        jax = scripts[i].MathJax.elementJax; if (!jax) continue;
        if (relwidth) {
          span = test.previousSibling;
          if (!jax.HTMLCSS.isHidden) {span = span.previousSibling}
          span.parentNode.removeChild(span);
        }
        test.parentNode.removeChild(test);
      }
      //
      //  Set state variables used for displaying equations in chunks
      //
      state.HTMLCSSeqn = state.HTMLCSSlast = 0; state.HTMLCSSi = -1;
      state.HTMLCSSchunk = this.config.EqnChunk;
      state.HTMLCSSdelay = false;
    },

    Translate: function (script,state) {
      if (!script.parentNode) return;

      //
      //  If we are supposed to do a chunk delay, do it
      //  
      if (state.HTMLCSSdelay) {
        state.HTMLCSSdelay = false;
        HUB.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
      }

      //
      //  Get the data about the math
      //
      var jax = script.MathJax.elementJax, math = jax.root,
          span = document.getElementById(jax.inputID+"-Frame"),
          div = (jax.HTMLCSS.display ? span.parentNode : span);
      //
      //  Set the font metrics
      //
      this.em = MML.mbase.prototype.em = jax.HTMLCSS.em * jax.HTMLCSS.scale; 
      this.outerEm = jax.HTMLCSS.em; this.scale = jax.HTMLCSS.scale;
      this.linebreakWidth = jax.HTMLCSS.lineWidth;
      span.style.fontSize = jax.HTMLCSS.fontSize;
      //
      //  Typeset the math
      //
      this.initImg(span);
      this.initHTML(math,span);
      math.setTeXclass();
      try {math.toHTML(span,div)} catch (err) {
        if (err.restart) {while (span.firstChild) {span.removeChild(span.firstChild)}}
        throw err;
      }
      //
      //  Put it in place, and remove the processing marker
      //
      if (jax.HTMLCSS.isHidden) {script.parentNode.insertBefore(div,script)}
      div.className = div.className.split(/ /)[0];
      //
      //  Check if we are hiding the math until more is processed
      //
      if (this.hideProcessedMath) {
        //
        //  Hide the math and don't let its preview be removed
        //
        div.className += " MathJax_Processed";
        if (script.MathJax.preview) {
          jax.HTMLCSS.preview = script.MathJax.preview;
          delete script.MathJax.preview;
        }
        //
        //  Check if we should show this chunk of equations
        //
        state.HTMLCSSeqn += (state.i - state.HTMLCSSi); state.HTMLCSSi = state.i;
        if (state.HTMLCSSeqn >= state.HTMLCSSlast + state.HTMLCSSchunk) {
          this.postTranslate(state);
          state.HTMLCSSchunk = Math.floor(state.HTMLCSSchunk*this.config.EqnChunkFactor);
          state.HTMLCSSdelay = true;  // delay if there are more scripts
        }
      }
    },

    postTranslate: function (state) {
      var scripts = state.jax[this.id];
      if (!this.hideProcessedMath) return;
      //
      //  Reveal this chunk of math
      //
      for (var i = state.HTMLCSSlast, m = state.HTMLCSSeqn; i < m; i++) {
        var script = scripts[i];
        if (script && script.MathJax.elementJax) {
          //
          //  Remove the processed marker
          //
          script.previousSibling.className = script.previousSibling.className.split(/ /)[0];
          var data = script.MathJax.elementJax.HTMLCSS;
          //
          //  Remove the preview, if any
          //
          if (data.preview) {
            data.preview.innerHTML = "";
            script.MathJax.preview = data.preview;
            delete data.preview;
          }
        }
      }
      if (this.forceReflow) {
        //  WebKit can misplace some elements that should wrap to the next line
        //  but gets them right ona reflow, so force reflow by toggling a stylesheet
        var sheet = (document.styleSheets||[])[0]||{};
        sheet.disabled = true; sheet.disabled = false;
      }
      //
      //  Save our place so we know what is revealed
      //
      state.HTMLCSSlast = state.HTMLCSSeqn;
    },

    getJaxFromMath: function (math) {
      if (math.parentNode.className === "MathJax_Display") {math = math.parentNode}
      do {math = math.nextSibling} while (math && math.nodeName.toLowerCase() !== "script");
      return HUB.getJaxFor(math);
    },
    getHoverSpan: function (jax,math) {return jax.root.HTMLspanElement()},
    getHoverBBox: function (jax,span,math) {
      var bbox = span.bbox, em = jax.HTMLCSS.outerEm;
      var BBOX = {w:bbox.w*em, h:bbox.h*em, d:bbox.d*em};
      if (bbox.width) {BBOX.width = bbox.width}
      return BBOX;
    },
    
    Zoom: function (jax,span,math,Mw,Mh) {
      //
      //  Re-render at larger size
      //
      span.className = "MathJax";
      span.style.fontSize = jax.HTMLCSS.fontSize;

      //
      //  get em sizes (taken from HTMLCSS.preTranslate)
      //
      var emex = span.appendChild(this.EmExSpan.cloneNode(true));
      var em = emex.lastChild.firstChild.offsetHeight/60;
      this.em = MML.mbase.prototype.em = em;
      this.outerEm = em / jax.HTMLCSS.scale;
      emex.parentNode.removeChild(emex);

      this.idPostfix = "-zoom"; jax.root.toHTML(span,span); this.idPostfix = "";
      var width = jax.root.HTMLspanElement().bbox.width;
      if (width) {
        //  Handle full-width displayed equations
        //  FIXME: this is a hack for now
        span.style.width = Math.floor(Mw-1.5*HTMLCSS.em)+"px"; span.style.display="inline-block";
        var id = (jax.root.id||"MathJax-Span-"+jax.root.spanID)+"-zoom";
        var child = document.getElementById(id).firstChild;
        while (child && child.style.width !== width) {child = child.nextSibling}
        if (child) {child.style.width = "100%"}
      }
      //
      //  Get height and width of zoomed math and original math
      //
      span.style.position = math.style.position = "absolute";
      var zW = span.offsetWidth, zH = span.offsetHeight,
          mH = math.offsetHeight, mW = math.offsetWidth;
      if (mW === 0) {mW = math.parentNode.offsetWidth}; // IE7 gets mW == 0?
      span.style.position = math.style.position = "";
      //
      return {Y:-EVENT.getBBox(span).h, mW:mW, mH:mH, zW:zW, zH:zH};
    },

    initImg: function (span) {},
    initHTML: function (math,span) {},
    initFont: function (name) {
      var FONTS = HTMLCSS.FONTDATA.FONTS, AVAIL = HTMLCSS.config.availableFonts;
      if (AVAIL && AVAIL.length && HTMLCSS.Font.testFont(FONTS[name]))
        {FONTS[name].available = true; return null}
      if (!this.allowWebFonts) {return null}
      FONTS[name].isWebFont = true;
      if (HTMLCSS.FontFaceBug) {
        FONTS[name].family = name;
        if (HTMLCSS.msieFontCSSBug) {FONTS[name].family += "-Web"}
      }
      return AJAX.Styles({"@font-face":this.Font.fontFace(name)});
    },

    Remove: function (jax) {
      var span = document.getElementById(jax.inputID+"-Frame");
      if (span) {
        if (jax.HTMLCSS.display) {span = span.parentNode}
        span.parentNode.removeChild(span);
      }
      delete jax.HTMLCSS;
    },
    
    getHD: function (span) {
      var position = span.style.position;
      span.style.position = "absolute";
      this.HDimg.style.height = "0px";
      span.appendChild(this.HDspan);
      var HD = {h:span.offsetHeight};
      this.HDimg.style.height = HD.h+"px";
      HD.d = span.offsetHeight - HD.h; HD.h -= HD.d;
      HD.h /= this.em; HD.d /= this.em;
      span.removeChild(this.HDspan);
      span.style.position = position;
      return HD;
    },
    getW: function (span) {
      var W, H, w = (span.bbox||{}).w, start = span;
      if (span.bbox && span.bbox.exactW) {return w}
      if ((span.bbox && w >= 0 && !this.initialSkipBug) || this.negativeBBoxes || !span.firstChild) {
        W = span.offsetWidth; H = span.parentNode.offsetHeight;
      } else if (span.bbox && w < 0 && this.msieNegativeBBoxBug) {
        W = -span.offsetWidth, H = span.parentNode.offsetHeight;
      } else {
        // IE can't deal with a space at the beginning, so put something else first
        if (this.initialSkipBug) {
          var position = span.style.position; span.style.position = "absolute";
          start = this.startMarker; span.insertBefore(start,span.firstChild)
        }
        span.appendChild(this.endMarker);
        W = this.endMarker.offsetLeft - start.offsetLeft;
        span.removeChild(this.endMarker);
        if (this.initialSkipBug) {span.removeChild(start); span.style.position = position}
      }
      if (H != null) {span.parentNode.HH = H/this.em}
      return W/this.em;
    },
    Measured: function (span,parent) {
      var bbox = span.bbox;
      if (bbox.width == null && bbox.w && !bbox.isMultiline) {
        var w = this.getW(span);
        bbox.rw += w - bbox.w;
        bbox.w = w; bbox.exactW = true;
      }
      if (!parent) {parent = span.parentNode}
      if (!parent.bbox) {parent.bbox = bbox}
      return span;
    },
    Remeasured: function (span,parent) {
      parent.bbox = this.Measured(span,parent).bbox;
    },
    MeasureSpans: function (SPANS) {
      var spans = [], span, i, m, bbox, start, end, W;
      //
      //  Insert the needed markers
      // 
      for (i = 0, m = SPANS.length; i < m; i++) {
        span = SPANS[i]; if (!span) continue;
        bbox = span.bbox;
        if (bbox.exactW || bbox.width || bbox.w === 0 || bbox.isMultiline) {
          if (!span.parentNode.bbox) {span.parentNode.bbox = bbox}
          continue;
        }
        if (this.negativeBBoxes || !span.firstChild || (bbox.w >= 0 && !this.initialSkipBug) ||
            (bbox.w < 0 && this.msieNegativeBBoxBug)) {
          spans.push([span]);
        } else if (this.initialSkipBug) {
          start = this.startMarker.cloneNode(true); end = this.endMarker.cloneNode(true);
          span.insertBefore(start,span.firstChild); span.appendChild(end);
          spans.push([span,start,end,span.style.position]); span.style.position = "absolute";
        } else {
          end = this.endMarker.cloneNode(true);
          span.appendChild(end); spans.push([span,null,end]);
        }
      }
      //
      //  Read the widths and heights
      //
      for (i = 0, m = spans.length; i < m; i++) {
        span = spans[i][0]; bbox = span.bbox; var parent = span.parentNode;
        if ((bbox.w >= 0 && !this.initialSkipBug) || this.negativeBBoxes || !span.firstChild) {
          W = span.offsetWidth; parent.HH = span.parentNode.offsetHeight/this.em;
        } else if (bbox.w < 0 && this.msieNegativeBBoxBug) {
          W = -span.offsetWidth, parent.HH = span.parentNode.offsetHeight/this.em;
        } else {
          W = spans[i][2].offsetLeft - ((spans[i][1]||{}).offsetLeft||0);
        }
        W /= this.em;
        bbox.rw += W - bbox.w;
        bbox.w = W; bbox.exactW = true;
        if (!parent.bbox) {parent.bbox = bbox}
      }
      //
      //  Remove markers
      //
      for (i = 0, m = spans.length; i < m; i++) {
        span = spans[i];
        if (span[1]) {span[1].parentNode.removeChild(span[1]), span[0].style.position = span[3]}
        if (span[2]) {span[2].parentNode.removeChild(span[2])}
      }
    },

    Em: function (m) {
      if (Math.abs(m) < .0006) {return "0em"}
      return m.toFixed(3).replace(/\.?0+$/,"") + "em";
    },
    unEm: function (m) {
      return parseFloat(m);
    },
    Px: function (m) {
      m *= this.em; var s = (m < 0? "-" : "");
      return s+Math.abs(m).toFixed(1).replace(/\.?0+$/,"") + "px";
    },
    unPx: function (m) {
      return parseFloat(m)/this.em;
    },
    Percent: function (m) {
      return (100*m).toFixed(1).replace(/\.?0+$/,"") + "%";
    },
    length2em: function (length,mu,size) {
      if (typeof(length) !== "string") {length = length.toString()}
      if (length === "") {return ""}
      if (length === MML.SIZE.NORMAL) {return 1}
      if (length === MML.SIZE.BIG)    {return 2}
      if (length === MML.SIZE.SMALL)  {return .71}
      if (length === "infinity")      {return HTMLCSS.BIGDIMEN}
      var factor = this.FONTDATA.TeX_factor;
      if (length.match(/mathspace$/)) {return HTMLCSS.MATHSPACE[length]*factor}
      var match = length.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
      var m = parseFloat(match[1]||"1"), unit = match[2];
      if (size == null) {size = 1}; if (mu == null) {mu = 1}
      if (unit === "em") {return m * factor}
      if (unit === "ex") {return m * HTMLCSS.TeX.x_height * factor}
      if (unit === "%")  {return m / 100 * size}
      if (unit === "px") {return m / HTMLCSS.em}
      if (unit === "pt") {return m / 10 * factor}                        // 10 pt to an em
      if (unit === "pc") {return m * 1.2 * factor}                       // 12 pt to a pc
      if (unit === "in") {return m * this.pxPerInch / HTMLCSS.em}
      if (unit === "cm") {return m * this.pxPerInch / HTMLCSS.em / 2.54} // 2.54 cm to an inch
      if (unit === "mm") {return m * this.pxPerInch / HTMLCSS.em / 25.4} // 10 mm to a cm
      if (unit === "mu") {return m / 18 * factor * mu} // 18mu to an em for the scriptlevel
      return m*factor*size;  // relative to given size (or 1em as default)
    },
    thickness2em: function (length,mu) {
      var thick = HTMLCSS.TeX.rule_thickness;
      if (length === MML.LINETHICKNESS.MEDIUM) {return thick}
      if (length === MML.LINETHICKNESS.THIN) {return .67*thick}
      if (length === MML.LINETHICKNESS.THICK) {return 1.67*thick}
      return this.length2em(length,mu,thick);
    },
    
    getPadding: function (span) {
      var padding = {top:0, right:0, bottom:0, left:0}, has = false;
      for (var id in padding) {if (padding.hasOwnProperty(id)) {
        var pad = span.style["padding"+id.charAt(0).toUpperCase()+id.substr(1)];
        if (pad) {padding[id] = this.length2em(pad); has = true;}
      }}
      return (has ? padding : false);
    },
    getBorders: function (span) {
      var border = {top:0, right:0, bottom:0, left:0}, css = {}, has = false;
      for (var id in border) {if (border.hasOwnProperty(id)) {
        var ID = "border"+id.charAt(0).toUpperCase()+id.substr(1);
        var style = span.style[ID+"Style"];
        if (style) {
          has = true;
          border[id] = this.length2em(span.style[ID+"Width"]);
          css[ID] = [span.style[ID+"Width"],span.style[ID+"Style"],span.style[ID+"Color"]].join(" ");
        }
      }}
      border.css = css;
      return (has ? border : false);
    },
    setBorders: function (span,borders) {
      if (borders) {
        for (var id in borders.css) {if (borders.css.hasOwnProperty(id)) {
          span.style[id] = borders.css[id];
        }}
      }
    },

    createStrut: function (span,h,before) {
      var strut = this.Element("span",{
        isMathJax: true,
        style:{display:"inline-block", overflow:"hidden", height:h+"px",
               width:"1px", marginRight:"-1px"}
      });
      if (before) {span.insertBefore(strut,span.firstChild)} else {span.appendChild(strut)}
      return strut;
    },
    createBlank: function (span,w,before) {
      var blank = this.Element("span",{
        isMathJax: true,
        style: {display:"inline-block", overflow:"hidden", height:"1px", width:this.Em(w)}
      });
      if (before) {span.insertBefore(blank,span.firstChild)} else {span.appendChild(blank)}
      return blank;
    },
    createShift: function (span,w,before) {
      var space = this.Element("span",{style:{marginLeft:this.Em(w)}, isMathJax:true});
      if (before) {span.insertBefore(space,span.firstChild)} else {span.appendChild(space)}
      return space;
    },
    createSpace: function (span,h,d,w,color,isSpace) {
      if (h < -d) {d = -h} // make sure h is above d
      var H = this.Em(h+d), D = this.Em(-d);
      if (this.msieInlineBlockAlignBug) {D = this.Em(HTMLCSS.getHD(span.parentNode).d-d)}
      if (span.isBox || isSpace) {
	var scale = (span.scale == null ? 1 : span.scale);
	span.bbox = {exactW: true, h: h*scale, d: d*scale, w: w*scale, rw: w*scale, lw: 0};
        span.style.height = H; span.style.verticalAlign = D;
        span.HH = (h+d)*scale;
      } else {
        span = this.addElement(span,"span",{style: {height:H, verticalAlign:D}, isMathJax:true});
      }
      if (w >= 0) {
        span.style.width = this.Em(w);
        span.style.display = "inline-block";
        span.style.overflow = "hidden";       // for IE in quirks mode
      } else {
        if (this.msieNegativeSpaceBug) {span.style.height = ""}
        span.style.marginLeft = this.Em(w);
        if (HTMLCSS.safariNegativeSpaceBug && span.parentNode.firstChild == span)
          {this.createBlank(span,0,true)}
      }
      if (color && color !== MML.COLOR.TRANSPARENT) {
        span.style.backgroundColor = color;
        span.style.position = "relative"; // make sure it covers earlier items
      }
      return span;
    },
    createRule: function (span,h,d,w,color) {
      if (h < -d) {d = -h} // make sure h is above d
      var min = HTMLCSS.TeX.min_rule_thickness, f = 1;
      // If rule is very thin, make it at least min_rule_thickness so it doesn't disappear
      if (w > 0 && w*this.em < min) {w = min/this.em}
      if (h+d > 0 && (h+d)*this.em < min) {f = 1/(h+d)*(min/this.em); h *= f; d *= f}
      if (!color) {color = "solid"} else {color = "solid "+color}
      color = this.Em(w)+" "+color;
      var H = (f === 1 ? this.Em(h+d) : min+"px"), D = this.Em(-d);
      var rule = this.addElement(span,"span",{
        style: {borderLeft: color, display: "inline-block", overflow:"hidden",
                width:0, height:H, verticalAlign:D},
        bbox: {h:h, d:d, w:w, rw:w, lw:0, exactW:true}, noAdjust:true, HH:h+d, isMathJax:true
      });
      if (w > 0 && rule.offsetWidth == 0) {rule.style.width = this.Em(w)}
      if (span.isBox || span.className == "mspace") {span.bbox = rule.bbox, span.HH = h+d}
      return rule;
    },
    createFrame: function (span,h,d,w,t,style) {
      if (h < -d) {d = -h} // make sure h is above d
      var T = 2*t;
      if (this.msieFrameSizeBug) {if (w < T) {w = T}; if (h+d < T) {h = T-d}}
      if (this.msieBorderWidthBug) {T = 0}
      var H = this.Em(h+d-T), D = this.Em(-d-t), W = this.Em(w-T);
      var B = this.Em(t)+" "+style;
      var frame = this.addElement(span,"span",{
        style: {border: B, display:"inline-block", overflow:"hidden", width:W, height:H},
        bbox: {h:h, d:d, w:w, rw:w, lw:0, exactW:true}, noAdjust: true, HH:h+d, isMathJax:true
      });
      if (D) {frame.style.verticalAlign = D}
      return frame;
    },

    createStack: function (span,nobbox,w) {
      if (this.msiePaddingWidthBug) {this.createStrut(span,0)}
      var relativeW = String(w).match(/%$/);
      var W = (!relativeW && w != null ? w : 0);
      span = this.addElement(span,"span",{
        noAdjust: true, HH: 0, isMathJax: true,
        style: {display:"inline-block", position:"relative",
                width:(relativeW ? "100%" : this.Em(W)), height:0}
      });
      if (!nobbox) {
        span.parentNode.bbox = span.bbox = {
          exactW: true,
          h: -this.BIGDIMEN, d: -this.BIGDIMEN,
          w:W, lw: this.BIGDIMEN, rw: (!relativeW && w != null ? w : -this.BIGDIMEN)
        };
        if (relativeW) {span.bbox.width = w}
      }
      return span;
    },
    createBox: function (span,w) {
      var box = this.addElement(span,"span",{style:{position:"absolute"}, isBox: true, isMathJax:true});
      if (w != null) {box.style.width = w}
      return box;
    },
    addBox: function (span,box) {
      box.style.position = "absolute"; box.isBox = box.isMathJax = true;
      return span.appendChild(box);
    },
    placeBox: function (span,x,y,noclip) {
      span.isMathJax = true;
      var parent = span.parentNode, bbox = span.bbox, BBOX = parent.bbox;
      if (this.msiePlaceBoxBug) {this.addText(span,this.NBSP)}
      if (this.imgSpaceBug) {this.addText(span,this.imgSpace)}
      // Place the box
      var HH, dx = 0;
      if (span.HH != null) {HH = span.HH}
        else if (bbox) {HH = Math.max(3,bbox.h+bbox.d)}
        else {HH = span.offsetHeight/this.em}
      if (!span.noAdjust) {
        HH += 1;
        HH = Math.round(HH*this.em)/this.em; // make this an integer number of pixels (for Chrome)
        if (this.msieInlineBlockAlignBug) {
          this.addElement(span,"img",{
            className:"MathJax_strut", border:0, src:"about:blank", isMathJax:true,
            style:{width:0,height:this.Em(HH)}
          });
        } else {
          this.addElement(span,"span",{
            isMathJax: true, style:{display:"inline-block",width:0,height:this.Em(HH)}
          });
          if (HTMLCSS.chromeHeightBug) 
            {HH -= (span.lastChild.offsetHeight - Math.round(HH*this.em))/this.em}
        }
      }
      // Clip so that bbox doesn't include extra height and depth
      if (bbox) {
        if (this.initialSkipBug) {
          if (bbox.lw < 0) {dx = bbox.lw; HTMLCSS.createBlank(span,-dx,true)}
          if (bbox.rw > bbox.w) {HTMLCSS.createBlank(span,bbox.rw-bbox.w+.1)}
        }
        if (!this.msieClipRectBug && !bbox.noclip && !noclip) {
          var dd = 3/this.em;
          var H = (bbox.H == null ? bbox.h : bbox.H), D = (bbox.D == null ? bbox.d : bbox.D);
          var t = HH - H - dd, b = HH + D + dd, l = bbox.lw - 3*dd, r = 1000;
          if (this.initialSkipBug && bbox.lw < 0) {l = -3*dd}
          if (bbox.isFixed) {r = bbox.width-l}
          span.style.clip = "rect("+this.Em(t)+" "+this.Em(r)+" "+this.Em(b)+" "+this.Em(l)+")";
        }
      }
      // Place the box
      span.style.top = this.Em(-y-HH);
      span.style.left = this.Em(x+dx);
      // Update the bounding box
      if (bbox && BBOX) {
        if (bbox.H != null && (BBOX.H == null || bbox.H + y > BBOX.H)) {BBOX.H = bbox.H + y}
        if (bbox.D != null && (BBOX.D == null || bbox.D - y > BBOX.D)) {BBOX.D = bbox.D - y}
        if (bbox.h + y > BBOX.h) {BBOX.h = bbox.h + y}
        if (bbox.d - y > BBOX.d) {BBOX.d = bbox.d - y}
        if (BBOX.H != null && BBOX.H <= BBOX.h) {delete BBOX.H}
        if (BBOX.D != null && BBOX.D <= BBOX.d) {delete BBOX.D}
        if (bbox.w + x > BBOX.w) {
          BBOX.w = bbox.w + x;
          if (BBOX.width == null) {parent.style.width = this.Em(BBOX.w)}
        }
        if (bbox.rw + x > BBOX.rw) {BBOX.rw = bbox.rw + x}
        if (bbox.lw + x < BBOX.lw) {BBOX.lw = bbox.lw + x}
        if (bbox.width != null && !bbox.isFixed) {
          if (BBOX.width == null) {parent.style.width = BBOX.width = "100%"}
          span.style.width = bbox.width;
        }
      }
    },
    alignBox: function (span,align,y) {
      this.placeBox(span,0,y); // set y position (and left aligned)
      var bbox = span.bbox; if (bbox.isMultiline) return;
      var isRelative = bbox.width != null && !bbox.isFixed;
      var r = 0, c = -bbox.w/2, l = "50%";
      if (this.initialSkipBug) {r = bbox.w-bbox.rw-.1; c += bbox.lw}
      if (this.msieMarginScaleBug) {c = (c*this.em) + "px"} else {c = this.Em(c)}
      if (isRelative) {c = ""; l = (50 - parseFloat(bbox.width)/2) + "%"}
      HUB.Insert(span.style,({
        right:  {left:"", right: this.Em(r)},
        center: {left:l, marginLeft: c}
      })[align]);
    },
    setStackWidth: function (span,w) {
      if (typeof(w) === "number") {
        span.style.width = this.Em(Math.max(0,w));
        var bbox = span.bbox; if (bbox) {bbox.w = w; bbox.exactW = true};
        bbox = span.parentNode.bbox; if (bbox) {bbox.w = w; bbox.exactW = true};
      } else {
        span.style.width = span.parentNode.style.width = "100%";
        if (span.bbox) {span.bbox.width = w}
        if (span.parentNode.bbox) {span.parentNode.bbox.width = w}
      }
    },

    createDelimiter: function (span,code,HW,scale,font) {
      if (!code) {
        span.bbox = {h:0, d:0, w:this.TeX.nulldelimiterspace, lw: 0};
        span.bbox.rw = span.bbox.w;
        this.createSpace(span,span.bbox.h,span.bbox.d,span.bbox.w);
        return;
      }
      if (!scale) {scale = 1};
      if (!(HW instanceof Array)) {HW = [HW,HW]}
      var hw = HW[1]; HW = HW[0];
      var delim = {alias: code};
      while (delim.alias) {
        code = delim.alias; delim = this.FONTDATA.DELIMITERS[code];
        if (!delim) {delim = {HW: [0,this.FONTDATA.VARIANT[MML.VARIANT.NORMAL]]}}
      }
      if (delim.load) {HUB.RestartAfter(AJAX.Require(this.fontDir+"/fontdata-"+delim.load+".js"))}
      for (var i = 0, m = delim.HW.length; i < m; i++) {
        if (delim.HW[i][0]*scale >= HW-.01 || (i == m-1 && !delim.stretch)) {
          if (delim.HW[i][2]) {scale *= delim.HW[i][2]}
          if (delim.HW[i][3]) {code = delim.HW[i][3]}
          var chr = this.addElement(span,"span");
          this.createChar(chr,[code,delim.HW[i][1]],scale,font);
          span.bbox = chr.bbox;
          span.offset = .65 * span.bbox.w;
          span.scale = scale;
          return;
        }
      }
      if (delim.stretch) {this["extendDelimiter"+delim.dir](span,hw,delim.stretch,scale,font)}
    },
    extendDelimiterV: function (span,H,delim,scale,font) {
      var stack = this.createStack(span,true);
      var top = this.createBox(stack), bot = this.createBox(stack);
      this.createChar(top,(delim.top||delim.ext),scale,font);
      this.createChar(bot,(delim.bot||delim.ext),scale,font);
      var ext = {bbox:{w:0,lw:0,rw:0}}, mid = ext, EXT;
      var h = top.bbox.h + top.bbox.d + bot.bbox.h + bot.bbox.d;
      var y = -top.bbox.h; this.placeBox(top,0,y,true); y -= top.bbox.d;
      if (delim.mid) {
        mid = this.createBox(stack); this.createChar(mid,delim.mid,scale,font);
        h += mid.bbox.h + mid.bbox.d;
      }
      if (delim.min && H < h*delim.min) {H = h*delim.min}
      if (H > h) {
        ext = this.Element("span"); this.createChar(ext,delim.ext,scale,font);
        var eH = ext.bbox.h + ext.bbox.d, eh = eH - .05, n, N, k = (delim.mid ? 2 : 1);
        N = n = Math.ceil((H-h)/(k*eh));
        if (!delim.fullExtenders) {eh = (H-h)/(k*n)}
        var dy = (n/(n+1))*(eH - eh); eh = eH - dy; y += dy + eh - ext.bbox.h;
        while (k-- > 0) {
          while (n-- > 0) {
            if (!this.msieCloneNodeBug) {EXT = ext.cloneNode(true)}
              else {EXT = this.Element("span"); this.createChar(EXT,delim.ext,scale,font)}
            EXT.bbox = ext.bbox;
            y -= eh; this.placeBox(this.addBox(stack,EXT),0,y,true);
          }
          y += dy - ext.bbox.d;
          if (delim.mid && k) {
            this.placeBox(mid,0,y-mid.bbox.h,true); n = N;
            y += -(mid.bbox.h + mid.bbox.d) + dy + eh - ext.bbox.h;
          }
        }
      } else {
        y += (h - H)/2;
        if (delim.mid) {this.placeBox(mid,0,y-mid.bbox.h,true); y += -(mid.bbox.h + mid.bbox.d)}
        y += (h - H)/2;
      }
      this.placeBox(bot,0,y-bot.bbox.h,true); y -= bot.bbox.h + bot.bbox.d;
      span.bbox = {
        w:  Math.max(top.bbox.w,ext.bbox.w,bot.bbox.w,mid.bbox.w),
        lw: Math.min(top.bbox.lw,ext.bbox.lw,bot.bbox.lw,mid.bbox.lw),
        rw: Math.max(top.bbox.rw,ext.bbox.rw,bot.bbox.rw,mid.bbox.rw),
        h: 0, d: -y, exactW: true
      }
      span.scale = scale;
      span.offset = .55 * span.bbox.w;
      span.isMultiChar = true;
      this.setStackWidth(stack,span.bbox.w);
    },
    extendDelimiterH: function (span,W,delim,scale,font) {
      var stack = this.createStack(span,true);
      var left = this.createBox(stack), right = this.createBox(stack);
      this.createChar(left,(delim.left||delim.rep),scale,font);
      this.createChar(right,(delim.right||delim.rep),scale,font);
      var rep = this.Element("span"); this.createChar(rep,delim.rep,scale,font);
      var mid = {bbox: {h:-this.BIGDIMEN, d:-this.BIGDIMEN}}, REP;
      this.placeBox(left,-left.bbox.lw,0,true);
      var w = (left.bbox.rw - left.bbox.lw) + (right.bbox.rw - right.bbox.lw) - .05,
          x = left.bbox.rw - left.bbox.lw - .025, dx;
      if (delim.mid) {
        mid = this.createBox(stack); this.createChar(mid,delim.mid,scale,font);
        w += mid.bbox.w;
      }
      if (delim.min && W < w*delim.min) {W = w*delim.min}
      if (W > w) {
        var rW = rep.bbox.rw-rep.bbox.lw, rw = rW - .05, n, N, k = (delim.mid ? 2 : 1);
        N = n = Math.ceil((W-w)/(k*rw));
        if (!delim.fillExtenders) {rw = (W-w)/(k*n)}
        dx = (n/(n+1))*(rW - rw); rw = rW - dx; x -= rep.bbox.lw + dx;
        while (k-- > 0) {
          while (n-- > 0) {
            if (!this.cloneNodeBug) {REP = rep.cloneNode(true)}
              else {REP = this.Element("span"); this.createChar(REP,delim.rep,scale,font)}
            REP.bbox = rep.bbox;
            this.placeBox(this.addBox(stack,REP),x,0,true); x += rw;
          }
          if (delim.mid && k) {this.placeBox(mid,x,0,true); x += mid.bbox.w - dx; n = N}
        }
      } else {
        x -= (w - W)/2;
        if (delim.mid) {this.placeBox(mid,x,0,true); x += mid.bbox.w};
        x -= (w - W)/2;
      }
      this.placeBox(right,x,0,true);
      span.bbox = {
        w: x+right.bbox.rw, lw: 0, rw: x+right.bbox.rw,
        H: Math.max(left.bbox.h,rep.bbox.h,right.bbox.h,mid.bbox.h),
        D: Math.max(left.bbox.d,rep.bbox.d,right.bbox.d,mid.bbox.d),
        h: rep.bbox.h, d: rep.bbox.d, exactW: true
      }
      span.scale = scale;
      span.isMultiChar = true;
      this.setStackWidth(stack,span.bbox.w);
    },
    createChar: function (span,data,scale,font) {
      span.isMathJax = true;
      var SPAN = span, text = "", variant = {fonts: [data[1]], noRemap:true};
      if (font && font === MML.VARIANT.BOLD) {variant.fonts = [data[1]+"-bold",data[1]]}
      if (typeof(data[1]) !== "string") {variant = data[1]}
      if (data[0] instanceof Array) {
        for (var i = 0, m = data[0].length; i < m; i++) {text += String.fromCharCode(data[0][i])}
      } else {text = String.fromCharCode(data[0])}
      if (data[4]) {scale *= data[4]}
      if (scale !== 1 || data[3]) {
	SPAN = this.addElement(span,"span",{style:{fontSize: this.Percent(scale)}, scale:scale, isMathJax:true});
        this.handleVariant(SPAN,variant,text);
        span.bbox = SPAN.bbox;
      } else {this.handleVariant(span,variant,text)}
      if (data[2]) {span.style.marginLeft = this.Em(data[2])}     // x offset
      if (data[3]) {                                              // y offset
        span.firstChild.style.verticalAlign = this.Em(data[3]);
        span.bbox.h += data[3]; if (span.bbox.h < 0) {span.bbox.h = 0}
      }
      if (data[5]) {span.bbox.h += data[5]}  // extra height
      if (data[6]) {span.bbox.d += data[6]}  // extra depth
      //  Handle combining characters by adding a non-breaking space so it shows up
      if (this.AccentBug && span.bbox.w === 0) {SPAN.firstChild.nodeValue += this.NBSP}
    },
    positionDelimiter: function (span,h) {
      h -= span.bbox.h; span.bbox.d -= h; span.bbox.h += h;
      if (h) {
        if (this.safariVerticalAlignBug || this.konquerorVerticalAlignBug ||
           (this.operaVerticalAlignBug && span.isMultiChar)) {
          if (span.firstChild.style.display === "" && span.style.top !== "")
            {span = span.firstChild; h -= HTMLCSS.unEm(span.style.top)}
          span.style.position = "relative";
          span.style.top = this.Em(-h);
        } else {
          span.style.verticalAlign = this.Em(h);
          if (HTMLCSS.ffVerticalAlignBug) {HTMLCSS.createRule(span.parentNode,span.bbox.h,0,0)}
        }
      }
    },

    handleVariant: function (span,variant,text) {
      var newtext = "", n, c, font, VARIANT, SPAN = span, force = !!span.style.fontFamily;
      if (text.length === 0) return;
      if (!span.bbox) {
        span.bbox = {
          w: 0, h: -this.BIGDIMEN, d: -this.BIGDIMEN,
          rw: -this.BIGDIMEN, lw: this.BIGDIMEN
        };
      }
      if (!variant) {variant = this.FONTDATA.VARIANT[MML.VARIANT.NORMAL]}
      VARIANT = variant;
      for (var i = 0, m = text.length; i < m; i++) {
        variant = VARIANT;
        n = text.charCodeAt(i); c = text.charAt(i);
        if (n >= 0xD800 && n < 0xDBFF) {
          i++; n = (((n-0xD800)<<10)+(text.charCodeAt(i)-0xDC00))+0x10000;
          if (this.FONTDATA.RemapPlane1) {
            var nv = this.FONTDATA.RemapPlane1(n,variant);
            n = nv.n; variant = nv.variant;
          }
        } else {
          var id, M, RANGES = this.FONTDATA.RANGES;
          for (id = 0, M = RANGES.length; id < M; id++) {
            if (RANGES[id].name === "alpha" && variant.noLowerCase) continue;
            var N = variant["offset"+RANGES[id].offset];
            if (N && n >= RANGES[id].low && n <= RANGES[id].high) {
              if (RANGES[id].remap && RANGES[id].remap[n]) {
                n = N + RANGES[id].remap[n];
              } else {
                n = n - RANGES[id].low + N;
                if (RANGES[id].add) {n += RANGES[id].add}
              }
              if (variant["variant"+RANGES[id].offset])
                {variant = this.FONTDATA.VARIANT[variant["variant"+RANGES[id].offset]]}
              break;
            }
          }
        }
        if (variant.remap && variant.remap[n]) {
          if (variant.remap[n] instanceof Array) {
            var remap = variant.remap[n];
            n = remap[0]; variant = this.FONTDATA.VARIANT[remap[1]];
          } else if (typeof(variant.remap[n]) === "string") {
            text = variant.remap[n]+text.substr(i+1);
            i = 0; m = text.length; n = text.charCodeAt(0);
          } else {
            n = variant.remap[n];
            if (variant.remap.variant) {variant = this.FONTDATA.VARIANT[variant.remap.variant]}
          }
        }
        if (this.FONTDATA.REMAP[n] && !variant.noRemap) {
          n = this.FONTDATA.REMAP[n];
          if (n instanceof Array) {variant = this.FONTDATA.VARIANT[n[1]]; n = n[0]}
          if (typeof(n) === "string") {
            text = n+text.substr(i+1);
            i = 0; m = text.length; n = n.charCodeAt(0);
          }
        }
        font = this.lookupChar(variant,n); c = font[n];
        if (force || (!this.checkFont(font,SPAN.style) && !c[5].img)) {
          if (newtext.length) {this.addText(SPAN,newtext); newtext = ""};
          var addSpan = !!SPAN.style.fontFamily || !!span.style.fontStyle ||
                        !!span.style.fontWeight || !font.directory || force; force = false;
          if (SPAN !== span) {addSpan = !this.checkFont(font,span.style); SPAN = span}
          if (addSpan) {SPAN = this.addElement(span,"span",{isMathJax:true, subSpan:true})}
          this.handleFont(SPAN,font,SPAN !== span);
        }
        newtext = this.handleChar(SPAN,font,c,n,newtext);
        if (!(c[5]||{}).space) {
          if (c[0]/1000 > span.bbox.h) {span.bbox.h = c[0]/1000}
          if (c[1]/1000 > span.bbox.d) {span.bbox.d = c[1]/1000}
        }
        if (span.bbox.w + c[3]/1000 < span.bbox.lw) {span.bbox.lw = span.bbox.w + c[3]/1000}
        if (span.bbox.w + c[4]/1000 > span.bbox.rw) {span.bbox.rw = span.bbox.w + c[4]/1000}
        span.bbox.w += c[2]/1000;
      }
      if (newtext.length) {this.addText(SPAN,newtext)}
      if (span.scale && span.scale !== 1) {
        span.bbox.h *= span.scale; span.bbox.d *= span.scale;
        span.bbox.w *= span.scale; span.bbox.lw *= span.scale; span.bbox.rw *= span.scale;
      }
      if (text.length == 1 && font.skew && font.skew[n]) {span.bbox.skew = font.skew[n]}
    },
    checkFont: function (font,style) {
      var weight = (style.fontWeight||"normal");
      if (weight.match(/^\d+$/)) {weight = (parseInt(weight) >= 600 ? "bold" : "normal")}
      return (font.family.replace(/'/g,"") === style.fontFamily.replace(/'/g,"") &&
             (font.style||"normal") === (style.fontStyle||"normal") &&
             (font.weight||"normal") === weight);
    },

    handleFont: function (span,font,force) {
      span.style.fontFamily = font.family;
      if (!font.directory) {span.style.fontSize = Math.floor(100/HTMLCSS.scale+.5) + "%"}
      if (!(HTMLCSS.FontFaceBug && font.isWebFont)) {
        var style  = font.style  || "normal", weight = font.weight || "normal";
        if (style !== "normal"  || force) {span.style.fontStyle  = style}
        if (weight !== "normal" || force) {span.style.fontWeight = weight}
      }
    },

    handleChar: function (span,font,c,n,text) {
      var C = c[5];
      if (C.space) {
        if (text.length) {this.addText(span,text)}
        HTMLCSS.createShift(span,c[2]/1000);
        return "";
      }
      if (C.img) {return this.handleImg(span,font,c,n,text)}
      if (C.isUnknown && this.FONTDATA.DELIMITERS[n]) {
        if (text.length) {this.addText(span,text)}
        var scale = span.scale;
        HTMLCSS.createDelimiter(span,n,0,1,font);
        if (this.FONTDATA.DELIMITERS[n].dir === "V") {
          span.style.verticalAlign = this.Em(span.bbox.d);
          span.bbox.h += span.bbox.d; span.bbox.d = 0;
        }
        span.scale = scale;
        c[0] = span.bbox.h*1000; c[1] = span.bbox.d*1000;
        c[2] = span.bbox.w*1000; c[3] = span.bbox.lw*1000; c[4] = span.bbox.rw*1000;
        return "";
      }
      if (C.c == null) {
        if (n <= 0xFFFF) {C.c = String.fromCharCode(n)} else {
          var N = n - 0x10000;
          C.c = String.fromCharCode((N>>10)+0xD800)
              + String.fromCharCode((N&0x3FF)+0xDC00);
        }
      }
      if (C.rfix) {this.addText(span,text+C.c); HTMLCSS.createShift(span,C.rfix/1000); return ""}
      if (c[2] || !this.msieAccentBug || text.length) {return text + C.c}
      //  Handle IE accent clipping bug
      HTMLCSS.createShift(span,c[3]/1000);
      HTMLCSS.createShift(span,(c[4]-c[3])/1000);
      this.addText(span,C.c);
      HTMLCSS.createShift(span,-c[4]/1000);
      return "";
    },
    handleImg: function (span,font,c,n,text) {return text}, // replaced by imageFont extension

    lookupChar: function (variant,n) {
      var i, m;
      if (!variant.FONTS) {
        var FONTS = this.FONTDATA.FONTS;
        var fonts = (variant.fonts || this.FONTDATA.VARIANT.normal.fonts);
        if (!(fonts instanceof Array)) {fonts = [fonts]}
        if (variant.fonts != fonts) {variant.fonts = fonts}
        variant.FONTS = [];
        for (i = 0, m = fonts.length; i < m; i++) {
          if (FONTS[fonts[i]]) {
            variant.FONTS.push(FONTS[fonts[i]]);
            FONTS[fonts[i]].name = fonts[i]; // FIXME: should really be in the font files
          }
        }
      }
      for (i = 0, m = variant.FONTS.length; i < m; i++) {
        var font = variant.FONTS[i];
        if (typeof(font) === "string") {
          delete variant.FONTS; this.loadFont(font);
        }
        if (font[n]) {
          if (font[n].length === 5) {font[n][5] = {}}
          if (HTMLCSS.allowWebFonts && !font.available)
            {this.loadWebFont(font)} else {return font}
        } else {this.findBlock(font,n)}
      }
      return this.unknownChar(variant,n);
    },
    
    unknownChar: function (variant,n) {
      var unknown = (variant.defaultFont || {family:HTMLCSS.config.undefinedFamily});
      if (variant.bold) {unknown.weight = "bold"}; if (variant.italic) {unknown.style = "italic"}
      if (!unknown[n]) {unknown[n] = [800,200,500,0,500,{isUnknown:true}]} // [h,d,w,lw,rw,{data}]
      HUB.signal.Post(["HTML-CSS Jax - unknown char",n,variant]);
      return unknown;
    },

    findBlock: function (font,c) {
      if (font.Ranges) {
        // FIXME:  do binary search?
        for (var i = 0, m = font.Ranges.length; i < m; i++) {
          if (c <  font.Ranges[i][0]) return;
          if (c <= font.Ranges[i][1]) {
            var file = font.Ranges[i][2];
            for (var j = font.Ranges.length-1; j >= 0; j--)
              {if (font.Ranges[j][2] == file) {font.Ranges.splice(j,1)}}
            this.loadFont(font.directory+"/"+file+".js");
          }
        }
      }
    },

    loadFont: function (file) {
      var queue = MathJax.Callback.Queue();
      queue.Push(["Require",AJAX,this.fontDir+"/"+file]);
      if (this.imgFonts) {
        if (!MathJax.isPacked) {file = file.replace(/\/([^\/]*)$/,HTMLCSS.imgPacked+"/$1")}
        queue.Push(["Require",AJAX,this.webfontDir+"/png/"+file]);
      }
      HUB.RestartAfter(queue.Push({}));
    },

    loadWebFont: function (font) {
      font.available = font.isWebFont = true;
      if (HTMLCSS.FontFaceBug) {
        font.family = font.name;
        if (HTMLCSS.msieFontCSSBug) {font.family += "-Web"}
      }
      HUB.RestartAfter(this.Font.loadWebFont(font));
    },
    loadWebFontError: function (font,done) {
      //
      //  After the first web font fails to load, switch to image fonts, if possible
      //  otherwise, give up on web fonts all together
      // 
      HUB.Startup.signal.Post("HTML-CSS Jax - disable web fonts");
      font.isWebFont = false;
      if (this.config.imageFont && this.config.imageFont === this.fontInUse) {
        this.imgFonts = true;
        HUB.Startup.signal.Post("HTML-CSS Jax - switch to image fonts");
        HUB.Startup.signal.Post("HTML-CSS Jax - using image fonts");
        MathJax.Message.Set("Web-Fonts not available -- using image fonts instead",null,3000);
        AJAX.Require(this.directory+"/imageFonts.js",done);
      } else {
        this.allowWebFonts = false;
        done();
      }
    },

    Element: MathJax.HTML.Element,
    addElement: MathJax.HTML.addElement,
    TextNode: MathJax.HTML.TextNode,
    addText: MathJax.HTML.addText,
    ucMatch: MathJax.HTML.ucMatch,

    BIGDIMEN: 10000000,
    ID: 0, idPostfix: "",
    GetID: function () {this.ID++; return this.ID},

    MATHSPACE: {
      veryverythinmathspace:  1/18,
      verythinmathspace:      2/18,
      thinmathspace:          3/18,
      mediummathspace:        4/18,
      thickmathspace:         5/18,
      verythickmathspace:     6/18,
      veryverythickmathspace: 7/18,
      negativeveryverythinmathspace:  -1/18,
      negativeverythinmathspace:      -2/18,
      negativethinmathspace:          -3/18,
      negativemediummathspace:        -4/18,
      negativethickmathspace:         -5/18,
      negativeverythickmathspace:     -6/18,
      negativeveryverythickmathspace: -7/18
    },

    TeX: {
      x_height:         .430554,
      quad:             1,
      num1:             .676508,
      num2:             .393732,
      num3:             .44373,
      denom1:           .685951,
      denom2:           .344841,
      sup1:             .412892,
      sup2:             .362892,
      sup3:             .288888,
      sub1:             .15,
      sub2:             .247217,
      sup_drop:         .386108,
      sub_drop:         .05,
      delim1:          2.39,
      delim2:          1.0,
      axis_height:      .25,
      rule_thickness:   .06,
      big_op_spacing1:  .111111,
      big_op_spacing2:  .166666,
      big_op_spacing3:  .2,
      big_op_spacing4:  .6,
      big_op_spacing5:  .1,

      scriptspace:         .1,
      nulldelimiterspace:  .12,
      delimiterfactor:     901,
      delimitershortfall:   .1,    // originally .3,

      min_rule_thickness:  1.25     // in pixels
    },

    NBSP: "\u00A0",

    rfuzz: 0         // adjustment to rule placements in roots
  });

  MathJax.Hub.Register.StartupHook("mml Jax Ready",function () {

    MML = MathJax.ElementJax.mml;

    MML.mbase.Augment({
      toHTML: function (span) {
	span = this.HTMLcreateSpan(span); if (this.type != "mrow") {span = this.HTMLhandleSize(span)}
	for (var i = 0, m = this.data.length; i < m; i++)
	  {if (this.data[i]) {this.data[i].toHTML(span)}}
	var stretchy = this.HTMLcomputeBBox(span);
	var h = span.bbox.h, d = span.bbox.d;
	for (i = 0, m = stretchy.length; i < m; i++) {stretchy[i].HTMLstretchV(span,h,d)}
	if (stretchy.length) {this.HTMLcomputeBBox(span,true)}
        if (this.HTMLlineBreaks(span)) {span = this.HTMLmultiline(span)}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLlineBreaks: function () {return false},
      HTMLmultiline: function () {MML.mbase.HTMLautoloadFile("multiline")},
      HTMLcomputeBBox: function (span,full,i,m) {
	if (i == null) {i = 0}; if (m == null) {m = this.data.length}
	var BBOX = span.bbox = {exactW: true}, stretchy = [];
	while (i < m) {
	  var core = this.data[i]; if (!core) continue;
	  if (!full && core.HTMLcanStretch("Vertical"))
	    {stretchy.push(core); core = (core.CoreMO()||core)}
	  this.HTMLcombineBBoxes(core,BBOX); i++;
	}
	this.HTMLcleanBBox(BBOX);
	return stretchy;
      },
      HTMLcombineBBoxes: function (core,BBOX) {
	if (BBOX.w == null) {this.HTMLemptyBBox(BBOX)}
	var child = (core.bbox ? core : core.HTMLspanElement());
        if (!child || !child.bbox) return;
	var bbox = child.bbox;
	if (bbox.d > BBOX.d) {BBOX.d = bbox.d}
	if (bbox.h > BBOX.h) {BBOX.h = bbox.h}
	if (bbox.D != null && bbox.D > BBOX.D) {BBOX.D = bbox.D}
	if (bbox.H != null && bbox.H > BBOX.H) {BBOX.H = bbox.H}
	if (child.style.paddingLeft) {BBOX.w += HTMLCSS.unEm(child.style.paddingLeft)*(child.scale||1)}
	if (BBOX.w + bbox.lw < BBOX.lw) {BBOX.lw = BBOX.w + bbox.lw}
	if (BBOX.w + bbox.rw > BBOX.rw) {BBOX.rw = BBOX.w + bbox.rw}
	BBOX.w += bbox.w;
	if (child.style.paddingRight) {BBOX.w += HTMLCSS.unEm(child.style.paddingRight)*(child.scale||1)}
	if (bbox.width) {BBOX.width = bbox.width}
        if (bbox.ic) {BBOX.ic = bbox.ic} else {delete BBOX.ic}
        if (BBOX.exactW && !bbox.exactW) {delete BBOX.exactW}
      },
      HTMLemptyBBox: function (BBOX) {
	BBOX.h = BBOX.d = BBOX.H = BBOX.D = BBOX.rw = -HTMLCSS.BIGDIMEN;
	BBOX.w = 0; BBOX.lw = HTMLCSS.BIGDIMEN;
	return BBOX;
      },
      HTMLcleanBBox: function (BBOX) {
	if (BBOX.h === this.BIGDIMEN)
	  {BBOX.h = BBOX.d = BBOX.H = BBOX.D = BBOX.w = BBOX.rw = BBOX.lw = 0}
	if (BBOX.D <= BBOX.d) {delete BBOX.D}; if (BBOX.H <= BBOX.h) {delete BBOX.H}
      },
      HTMLzeroBBox: function () {return {h:0, d:0, w:0, lw: 0, rw:0}},
      HTMLcanStretch: function (direction) {
	if (this.isEmbellished()) {
          var core = this.Core();
          if (core && core !== this) {return core.HTMLcanStretch(direction)}
        }
	return false;
      },
      HTMLstretchH: function (box,W) {return this.HTMLspanElement()},
      HTMLstretchV: function (box,h,d) {return this.HTMLspanElement()},
      HTMLnotEmpty: function (data) {
	while (data) {
	  if ((data.type !== "mrow" && data.type !== "texatom") ||
	       data.data.length > 1) {return true}
	  data = data.data[0];
	}
	return false;
      },

      HTMLmeasureChild: function (n,box) {
	if (this.data[n]) {HTMLCSS.Measured(this.data[n].toHTML(box),box)}
	  else {box.bbox = this.HTMLzeroBBox()}
      },
      HTMLboxChild: function (n,box) {
	if (this.data[n]) {return this.data[n].toHTML(box)}
        if (!box.bbox) {box.bbox = this.HTMLzeroBBox()}
        return null;
      },

      HTMLcreateSpan: function (span) {
	if (this.spanID) {
	  var SPAN = this.HTMLspanElement();
	  if (SPAN && (SPAN.parentNode === span || (SPAN.parentNode||{}).parentNode === span)) {
	    while (SPAN.firstChild) {SPAN.removeChild(SPAN.firstChild)}
	    SPAN.bbox = {w:0, h:0, d:0, lw:0, rw:0};
	    SPAN.scale = 1; SPAN.isMultChar = SPAN.HH = null;
	    SPAN.style.cssText = "";
	    return SPAN;
	  }
	}
	if (this.href) {span = HTMLCSS.addElement(span,"a",{href:this.href, isMathJax:true})}
	span = HTMLCSS.addElement(span,"span",{className: this.type, isMathJax:true});
	if (HTMLCSS.imgHeightBug) {span.style.display = "inline-block"}
	if (this["class"]) {span.className += " "+this["class"]}
	if (!this.spanID) {this.spanID = HTMLCSS.GetID()}
	span.id = (this.id || "MathJax-Span-"+this.spanID) + HTMLCSS.idPostfix;
	span.bbox = {w:0, h:0, d:0, lw:0, rw:0}; this.styles = {};
	if (this.style) {
	  span.style.cssText = this.style;
	  if (span.style.fontSize) {this.mathsize = span.style.fontSize; span.style.fontSize = ""}
          this.styles = {border:HTMLCSS.getBorders(span), padding:HTMLCSS.getPadding(span)}
          if (this.styles.border) {span.style.border = ""} // IE needs "0px none"?
          if (this.styles.padding) {span.style.padding = ""}
	}
	if (this.href) {span.parentNode.bbox = span.bbox}
	return span;
      },
      HTMLspanElement: function () {
	if (!this.spanID) {return null}
	return document.getElementById((this.id||"MathJax-Span-"+this.spanID)+HTMLCSS.idPostfix);
      },

      HTMLhandleVariant: function (span,variant,text) {HTMLCSS.handleVariant(span,variant,text)},

      HTMLhandleSize: function (span) {
	if (!span.scale) {
	  span.scale = this.HTMLgetScale();
	  if (span.scale !== 1) {span.style.fontSize = HTMLCSS.Percent(span.scale)}
	}
	return span;
      },

      HTMLhandleColor: function (span) {
	var values = this.getValues("mathcolor","color");
	if (this.mathbackground) {values.mathbackground = this.mathbackground}
	if (this.background) {values.background = this.background}
        if (this.style && span.style.backgroundColor) {
          values.mathbackground = span.style.backgroundColor;
          span.style.backgroundColor = "transparent";
        }
        var borders = (this.styles||{}).border, padding = (this.styles||{}).padding;
	if (values.color && !this.mathcolor) {values.mathcolor = values.color}
	if (values.background && !this.mathbackground) {values.mathbackground = values.background}
	if (values.mathcolor) {span.style.color = values.mathcolor}
	if ((values.mathbackground && values.mathbackground !== MML.COLOR.TRANSPARENT) || 
             borders || padding) {
	  var bbox = span.bbox, dd = (bbox.exact ? 0 : 1/HTMLCSS.em), lW = 0, rW = 0,
              lpad = span.style.paddingLeft, rpad = span.style.paddingRight;
	  if (this.isToken) {lW = bbox.lw; rW = bbox.rw - bbox.w}
	  if (lpad !== "") {lW += HTMLCSS.unEm(lpad)*(span.scale||1)}
	  if (rpad !== "") {rW -= HTMLCSS.unEm(rpad)*(span.scale||1)}
          var dw = (HTMLCSS.PaddingWidthBug || bbox.keepPadding || bbox.exactW ? 0 : rW - lW);
	  var W = Math.max(0,HTMLCSS.getW(span) + dw);
	  var H = bbox.h + bbox.d, D = -bbox.d, lp = 0, rp = 0;
	  if (W > 0) {W += 2*dd; lW -= dd}; if (H > 0) {H += 2*dd; D -= dd}; rW = -W-lW;
          if (borders) {
            rW -= borders.right; D -= borders.bottom; lp += borders.left; rp += borders.right;
            bbox.h += borders.top; bbox.d += borders.bottom;
            bbox.w += borders.left + borders.right;
            bbox.lw -= borders.left; bbox.rw += borders.right;
          }
          if (padding) {
            H += padding.top + padding.bottom; W += padding.left + padding.right;
            rW -= padding.right; D -= padding.bottom; lp += padding.left; rp += padding.right;
            bbox.h += padding.top; bbox.d += padding.bottom;
            bbox.w += padding.left + padding.right;
            bbox.lw -= padding.left; bbox.rw += padding.right;
          }
          if (rp) {span.style.paddingRight = HTMLCSS.Em(rp)}
	  var frame = HTMLCSS.Element("span",{
            id:"MathJax-Color-"+this.spanID+HTMLCSS.idPostfix, isMathJax: true,
	    style:{display:"inline-block", backgroundColor:values.mathbackground,
		   width: HTMLCSS.Em(W), height:HTMLCSS.Em(H), verticalAlign: HTMLCSS.Em(D),
		   marginLeft: HTMLCSS.Em(lW), marginRight: HTMLCSS.Em(rW)}
	  });
          HTMLCSS.setBorders(frame,borders);
          if (bbox.width) {frame.style.width = bbox.width; frame.style.marginRight = "-"+bbox.width}
	  if (HTMLCSS.msieInlineBlockAlignBug) {
            // FIXME:  handle variable width background
	    frame.style.position = "relative"; frame.style.width = frame.style.height = 0;
	    frame.style.verticalAlign = frame.style.marginLeft = frame.style.marginRight = "";
            frame.style.border = frame.style.padding = "";
            if (borders && HTMLCSS.msieBorderWidthBug)
              {H += borders.top + borders.bottom; W += borders.left + borders.right}
            frame.style.width = HTMLCSS.Em(lp+dd);
	    HTMLCSS.placeBox(HTMLCSS.addElement(frame,"span",{
	      noAdjust: true, isMathJax: true,
	      style: {display:"inline-block", position:"absolute", overflow:"hidden",
		      background:(values.mathbackground||"transparent"), 
                      width: HTMLCSS.Em(W), height: HTMLCSS.Em(H)}
	    }),lW,bbox.h+dd);
            HTMLCSS.setBorders(frame.firstChild,borders);
	  }
	  span.parentNode.insertBefore(frame,span);
          if (HTMLCSS.msieColorPositionBug) {span.style.position = "relative"}
	  return frame;
	}
	return null;
      },
      HTMLremoveColor: function () {
	var color = document.getElementById("MathJax-Color-"+this.spanID+HTMLCSS.idPostfix);
	if (color) {color.parentNode.removeChild(color)}
      },

      HTMLhandleSpace: function (span) {
	if (this.useMMLspacing) {
	  if (this.type !== "mo") return;
	  var values = this.getValues("scriptlevel","lspace","rspace");
          if (values.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace")) {
            var mu = this.HTMLgetMu(span);
	    values.lspace = Math.max(0,HTMLCSS.length2em(values.lspace,mu));
	    values.rspace = Math.max(0,HTMLCSS.length2em(values.rspace,mu));
	    var core = this, parent = this.Parent();
	    while (parent && parent.isEmbellished() && parent.Core() === core)
	      {core = parent; parent = parent.Parent(); span = core.HTMLspanElement()}
	    if (values.lspace) {span.style.paddingLeft =  HTMLCSS.Em(values.lspace)}
	    if (values.rspace) {span.style.paddingRight = HTMLCSS.Em(values.rspace)}
	  }
	} else {
	  var space = this.texSpacing();
	  if (space !== "") {
	    space = HTMLCSS.length2em(space,this.HTMLgetScale())/(span.scale||1);
	    if (span.style.paddingLeft) {space += HTMLCSS.unEm(span.style.paddingLeft)}
	    span.style.paddingLeft = HTMLCSS.Em(space);
	  }
	}
      },

      HTMLgetScale: function () {
	var scale = 1, values = this.getValues("mathsize","scriptlevel","fontsize");
	if (this.style) {
	  var span = this.HTMLspanElement();
	  if (span.style.fontSize != "") {values.fontsize = span.style.fontSize}
	}
	if (values.fontsize && !this.mathsize) {values.mathsize = values.fontsize}
	if (values.scriptlevel !== 0) {
	  if (values.scriptlevel > 2) {values.scriptlevel = 2}
	  scale = Math.pow(this.Get("scriptsizemultiplier"),values.scriptlevel);
	  values.scriptminsize = HTMLCSS.length2em(this.Get("scriptminsize"));
	  if (scale < values.scriptminsize) {scale = values.scriptminsize}
	}
	if (this.isToken) {scale *= HTMLCSS.length2em(values.mathsize)}
	return scale;
      },
      HTMLgetMu: function (span) {
	var mu = 1, values = this.getValues("scriptlevel","scriptsizemultiplier");
        if (span.scale && span.scale !== 1) {mu = 1/span.scale}
	if (values.scriptlevel !== 0) {
	  if (values.scriptlevel > 2) {values.scriptlevel = 2}
	  mu = Math.sqrt(Math.pow(values.scriptsizemultiplier,values.scriptlevel));
	}
	return mu;
      },

      HTMLgetVariant: function () {
	var values = this.getValues("mathvariant","fontfamily","fontweight","fontstyle");
        values.hasVariant = this.Get("mathvariant",true);  // null if not explicitly specified
        if (!values.hasVariant) {
          values.family = values.fontfamily;
          values.weight = values.fontweight;
          values.style  = values.fontstyle;
        }
	if (this.style) {
          var span = this.HTMLspanElement();
	  if (!values.family && span.style.fontFamily) {values.family = span.style.fontFamily}
	  if (!values.weight && span.style.fontWeight) {values.weight = span.style.fontWeight}
	  if (!values.style  && span.style.fontStyle)  {values.style  = span.style.fontStyle}
	}
        if (values.weight && values.weight.match(/^\d+$/))
            {values.weight = (parseInt(values.weight) > 600 ? "bold" : "normal")}
	var variant = values.mathvariant; if (this.variantForm) {variant = "-"+HTMLCSS.fontInUse+"-variant"}
	if (values.family && !values.hasVariant) {
	  if (!values.weight && values.mathvariant.match(/bold/)) {values.weight = "bold"}
	  if (!values.style && values.mathvariant.match(/italic/)) {values.style = "italic"}
	  return {FONTS:[], fonts:[], noRemap:true,
		  defaultFont: {family:values.family, style:values.style, weight:values.weight}};
	}
        if (values.weight === "bold") {
          variant = {
            normal:MML.VARIANT.BOLD, italic:MML.VARIANT.BOLDITALIC,
            fraktur:MML.VARIANT.BOLDFRAKTUR, script:MML.VARIANT.BOLDSCRIPT,
            "sans-serif":MML.VARIANT.BOLDSANSSERIF,
            "sans-serif-italic":MML.VARIANT.SANSSERIFBOLDITALIC
          }[variant]||variant;
        } else if (values.weight === "normal") {
          variant = {
            bold:MML.VARIANT.normal, "bold-italic":MML.VARIANT.ITALIC,
            "bold-fraktur":MML.VARIANT.FRAKTUR, "bold-script":MML.VARIANT.SCRIPT,
            "bold-sans-serif":MML.VARIANT.SANSSERIF,
            "sans-serif-bold-italic":MML.VARIANT.SANSSERIFITALIC
          }[variant]||variant;
        }
        if (values.style === "italic") {
          variant = {
            normal:MML.VARIANT.ITALIC, bold:MML.VARIANT.BOLDITALIC,
            "sans-serif":MML.VARIANT.SANSSERIFITALIC,
            "bold-sans-serif":MML.VARIANT.SANSSERIFBOLDITALIC
          }[variant]||variant;
        } else if (values.style === "normal") {
          variant = {
            italic:MML.VARIANT.NORMAL, "bold-italic":MML.VARIANT.BOLD,
            "sans-serif-italic":MML.VARIANT.SANSSERIF,
            "sans-serif-bold-italic":MML.VARIANT.BOLDSANSSERIF
          }[variant]||variant;
        }
        return HTMLCSS.FONTDATA.VARIANT[variant];
      }
    },{
      HTMLautoload: function () {
	var file = HTMLCSS.autoloadDir+"/"+this.type+".js";
	HUB.RestartAfter(AJAX.Require(file));
      },
      HTMLautoloadFile: function (name) {
	var file = HTMLCSS.autoloadDir+"/"+name+".js";
	HUB.RestartAfter(AJAX.Require(file));
      },

      HTMLstretchH: function (box,w) {
	this.HTMLremoveColor();
	return this.toHTML(box,w);
      },

      HTMLstretchV: function (box,h,d) {
	this.HTMLremoveColor();
	return this.toHTML(box,h,d);
      }
    });

    MML.chars.Augment({
      toHTML: function (span,variant,remap,chars) {
        var text = this.data.join("").replace(/[\u2061-\u2064]/g,""); // remove invisibles
        if (remap) {text = remap(text,chars)}
        if (variant.fontInherit) {
          var scale = Math.floor(100/HTMLCSS.scale+.5) + "%";
          HTMLCSS.addElement(span,"span",{style:{"font-size":scale}},[text]);
          if (variant.bold)   {span.lastChild.style.fontWeight = "bold"}
          if (variant.italic) {span.lastChild.style.fontStyle = "italic"}
          var HD = HTMLCSS.getHD(span), W = HTMLCSS.getW(span);
          span.bbox = {h:HD.h, d:HD.d, w:W, lw:0, rw:W, exactW: true};
        } else {
          this.HTMLhandleVariant(span,variant,text);
        }
      }
    });
    MML.entity.Augment({
      toHTML: function (span,variant,remap,chars) {
        var text = this.toString().replace(/[\u2061-\u2064]/g,""); // remove invisibles
        if (remap) {text = remap(text,chars)}
        if (variant.fontInherit) {
          var scale = Math.floor(100/HTMLCSS.scale+.5) + "%";
          HTMLCSS.addElement(span,"span",{style:{"font-size":scale}},[text]);
          if (variant.bold)   {span.lastChild.style.fontWeight = "bold"}
          if (variant.italic) {span.lastChild.style.fontStyle = "italic"}
          var HD = HTMLCSS.getHD(span), W = HTMLCSS.getW(span);
          span.bbox = {h:HD.h, d:HD.d, w:W, lw:0, rw:W, exactW: true};
        } else {
          this.HTMLhandleVariant(span,variant,text);
        }
      }
    });

    MML.mi.Augment({
      toHTML: function (span) {
	span = this.HTMLhandleSize(this.HTMLcreateSpan(span)); span.bbox = null;
	var variant = this.HTMLgetVariant();
	for (var i = 0, m = this.data.length; i < m; i++)
	  {if (this.data[i]) {this.data[i].toHTML(span,variant)}}
	if (!span.bbox) {span.bbox = {w:0, h:0, d:0, rw:0, lw:0}}
        var text = this.data.join(""), bbox = span.bbox;
	if (bbox.skew && text.length !== 1) {delete bbox.skew}
        if (bbox.rw > bbox.w && text.length === 1 && !variant.noIC) {
          bbox.ic = bbox.rw - bbox.w;
          HTMLCSS.createBlank(span,bbox.ic);
          bbox.w = bbox.rw;
        }
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      }
    });

    MML.mn.Augment({
      toHTML: function (span) {
	span = this.HTMLhandleSize(this.HTMLcreateSpan(span)); span.bbox = null;
	var variant = this.HTMLgetVariant();
	for (var i = 0, m = this.data.length; i < m; i++)
	  {if (this.data[i]) {this.data[i].toHTML(span,variant)}}
	if (!span.bbox) {span.bbox = {w:0, h:0, d:0, rw:0, lw:0}}
	if (this.data.join("").length !== 1) {delete span.bbox.skew}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      }
    });

    MML.mo.Augment({
      toHTML: function (span) {
	span = this.HTMLhandleSize(this.HTMLcreateSpan(span));
	if (this.data.length == 0) {return span} else {span.bbox = null}
	var text = this.data.join("");
        //
        //  Get the variant, and check for operator size
        //
	var variant = this.HTMLgetVariant();
	var values = this.getValues("largeop","displaystyle");
	if (values.largeop)
	  {variant = HTMLCSS.FONTDATA.VARIANT[values.displaystyle ? "-largeOp" : "-smallOp"]}
        //
        //  Get character translation for superscript and accents
        //
        var parent = this.CoreParent(),
            isScript = (parent && parent.isa(MML.msubsup) && this !== parent.data[parent.base]),
            mapchars = (isScript?this.HTMLremapChars:null);
        if (text.length === 1 && parent && parent.isa(MML.munderover) &&
            this.CoreText(parent.data[parent.base]).length === 1) {
          var over = parent.data[parent.over], under = parent.data[parent.under];
          if (over && this === over.CoreMO() && parent.Get("accent")) {mapchars = HTMLCSS.FONTDATA.REMAPACCENT}
          else if (under && this === under.CoreMO() && parent.Get("accentunder")) {mapchars = HTMLCSS.FONTDATA.REMAPACCENTUNDER}
        }
        //
        //  STIX and TeX fonts need quotes from variant font
        //
        if (isScript && text.match(/['`"\u00B4\u2032-\u2037\u2057]/))
          {variant = HTMLCSS.FONTDATA.VARIANT["-"+HTMLCSS.fontInUse+"-variant"]}
        //
        //  Typeset contents
        //
	for (var i = 0, m = this.data.length; i < m; i++)
          {if (this.data[i]) {this.data[i].toHTML(span,variant,this.HTMLremap,mapchars)}}
	if (!span.bbox) {span.bbox = {w:0, h:0, d:0, rw:0, lw:0}}
	if (text.length !== 1) {delete span.bbox.skew}
        //
        //  Handle combining characters by adding a non-breaking space and removing that width
        //
	if (HTMLCSS.AccentBug && span.bbox.w === 0 && text.length === 1 && span.firstChild) {
	  span.firstChild.nodeValue += HTMLCSS.NBSP;
	  HTMLCSS.createSpace(span,0,0,-span.offsetWidth/HTMLCSS.em);
	}
        //
        //  Handle large operator centering
        //
	if (values.largeop) {
	  var p = (span.bbox.h - span.bbox.d)/2 - HTMLCSS.TeX.axis_height*span.scale;
	  if (HTMLCSS.safariVerticalAlignBug && span.lastChild.nodeName === "IMG") {
	    span.lastChild.style.verticalAlign =
	      HTMLCSS.Em(HTMLCSS.unEm(span.lastChild.style.verticalAlign||0)/HTMLCSS.em-p/span.scale);
	  } else if (HTMLCSS.konquerorVerticalAlignBug && span.lastChild.nodeName === "IMG") {
	    span.style.position = "relative";
	    span.lastChild.style.position="relative";
	    span.lastChild.style.top = HTMLCSS.Em(p/span.scale);
	  } else {
	    span.style.verticalAlign = HTMLCSS.Em(-p/span.scale);
	  }
	  span.bbox.h -= p; span.bbox.d += p;
	  if (span.bbox.rw > span.bbox.w) {
	    span.bbox.ic = span.bbox.rw-span.bbox.w;
	    HTMLCSS.createBlank(span,span.bbox.ic);
	    span.bbox.w = span.bbox.rw;
	  }
	}
        //
        //  Finish up
        //
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      CoreParent: function () {
        var parent = this;
        while (parent && parent.isEmbellished() &&
               parent.CoreMO() === this && !parent.isa(MML.math)) {parent = parent.Parent()}
        return parent;
      },
      CoreText: function (parent) {
        if (!parent) {return ""}
        if (parent.isEmbellished()) {return parent.CoreMO().data.join("")}
        while ((parent.isa(MML.mrow) || parent.isa(MML.TeXAtom)) &&
                parent.data.length === 1 && parent.data[0]) {parent = parent.data[0]}
        if (!parent.isToken) {return ""} else {return parent.data.join("")}
      },
      HTMLremapChars: {
        '*':"\u2217",
        '"':"\u2033",
        "\u00B0":"\u2218",
        "\u00B2":"2",
        "\u00B3":"3",
        "\u00B4":"\u2032",
        "\u00B9":"1"
      },
      HTMLremap: function (text,map) {
        text = text.replace(/-/g,"\u2212");
        if (map) {
          text = text.replace(/'/g,"\u2032").replace(/`/g,"\u2035");
          if (text.length === 1) {text = map[text]||text}
        }
        return text;
      },
      HTMLcanStretch: function (direction) {
	if (!this.Get("stretchy")) {return false}
	var c = this.data.join("");
	if (c.length > 1) {return false}
        var parent = this.CoreParent();
        if (parent && parent.isa(MML.munderover) && 
            this.CoreText(parent.data[parent.base]).length === 1) {
          var over = parent.data[parent.over], under = parent.data[parent.under];
          if (over && this === over.CoreMO() && parent.Get("accent")) {c = HTMLCSS.FONTDATA.REMAPACCENT[c]||c}
          else if (under && this === under.CoreMO() && parent.Get("accentunder")) {c = HTMLCSS.FONTDATA.REMAPACCENTUNDER[c]||c}
        }
	c = HTMLCSS.FONTDATA.DELIMITERS[c.charCodeAt(0)];
	return (c && c.dir == direction.substr(0,1));
      },
      HTMLstretchV: function (box,h,d) {
	this.HTMLremoveColor();
	var values = this.getValues("symmetric","maxsize","minsize");
	var span = this.HTMLspanElement(), mu = this.HTMLgetMu(span), H;
	var axis = HTMLCSS.TeX.axis_height, scale = span.scale;
	if (values.symmetric) {H = 2*Math.max(h-axis,d+axis)} else {H = h + d}
	values.maxsize = HTMLCSS.length2em(values.maxsize,mu,span.bbox.h+span.bbox.d);
	values.minsize = HTMLCSS.length2em(values.minsize,mu,span.bbox.h+span.bbox.d);
	H = Math.max(values.minsize,Math.min(values.maxsize,H));
	span = this.HTMLcreateSpan(box); // clear contents and attributes
	HTMLCSS.createDelimiter(span,this.data.join("").charCodeAt(0),H,scale);
	if (values.symmetric) {H = (span.bbox.h + span.bbox.d)/2 + axis}
	  else {H = (span.bbox.h + span.bbox.d) * h/(h + d)}
	HTMLCSS.positionDelimiter(span,H);
	this.HTMLhandleSpace(span); // add in lspace/rspace, if any
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLstretchH: function (box,W) {
	this.HTMLremoveColor();
	var values = this.getValues("maxsize","minsize","mathvariant","fontweight");
        // FIXME:  should take style="font-weight:bold" into account as well
	if ((values.fontweight === "bold" || parseInt(values.fontweight) >= 600) &&
            !this.Get("mathvariant",true)) {values.mathvariant = MML.VARIANT.BOLD}
	var span = this.HTMLspanElement(), mu = this.HTMLgetMu(span), scale = span.scale;
	values.maxsize = HTMLCSS.length2em(values.maxsize,mu,span.bbox.w);
	values.minsize = HTMLCSS.length2em(values.minsize,mu,span.bbox.w);
	W = Math.max(values.minsize,Math.min(values.maxsize,W));
	span = this.HTMLcreateSpan(box); // clear contents and attributes
	HTMLCSS.createDelimiter(span,this.data.join("").charCodeAt(0),W,scale,values.mathvariant);
	this.HTMLhandleSpace(span); // add in lspace/rspace, if any
	this.HTMLhandleColor(span);
	return span;
      }
    });

    MML.mtext.Augment({
      toHTML: function (span) {
        span = this.HTMLhandleSize(this.HTMLcreateSpan(span)); 
        var variant = this.HTMLgetVariant();
        //  Avoid setting the font style for error text or if mtextFontInherit is set
        if (HTMLCSS.config.mtextFontInherit || this.Parent().type === "merror")
          {variant = {bold:variant.bold, italic:variant.italic, fontInherit: true}}
        for (var i = 0, m = this.data.length; i < m; i++)
          {if (this.data[i]) {this.data[i].toHTML(span,variant)}}
        if (!span.bbox) {span.bbox = {w:0, h:0, d:0, rw:0, lw:0}}
        if (this.data.join("").length !== 1) {delete span.bbox.skew}
        this.HTMLhandleSpace(span);
        this.HTMLhandleColor(span);
        return span;
      }
    });
    MML.merror.Augment({
      toHTML: function (span) {
        //
        //  Width doesn't include padding and border, so use an extra inline block
        //  element to capture it.
        //  
        var SPAN = MathJax.HTML.addElement(span,"span",{style:{display:"inline-block"}});
        span = this.SUPER(arguments).toHTML.call(this,SPAN);
        var HD = HTMLCSS.getHD(SPAN), W = HTMLCSS.getW(SPAN);
        SPAN.bbox = {h:HD.h, d:HD.d, w:W, lw:0, rw:W, exactW: true};
        SPAN.id = span.id; span.id = null;
        return SPAN;
      }
    });

    MML.ms.Augment({toHTML: MML.mbase.HTMLautoload});

    MML.mglyph.Augment({toHTML: MML.mbase.HTMLautoload});

    MML.mspace.Augment({
      toHTML: function (span) {
	span = this.HTMLcreateSpan(span);
	var values = this.getValues("height","depth","width");
        var mu = this.HTMLgetMu(span);
	values.mathbackground = this.mathbackground;
	if (this.background && !this.mathbackground) {values.mathbackground = this.background}
	var h = HTMLCSS.length2em(values.height,mu),
            d = HTMLCSS.length2em(values.depth,mu),
	    w = HTMLCSS.length2em(values.width,mu);
       HTMLCSS.createSpace(span,h,d,w,values.mathbackground,true);
       return span;
      }
    });

    MML.mphantom.Augment({
      toHTML: function (span,HW,D) {
	span = this.HTMLcreateSpan(span);
	if (this.data[0] != null) {
	  var box = this.data[0].toHTML(span);
	  if (D != null) {HTMLCSS.Remeasured(this.data[0].HTMLstretchV(span,HW,D),span)}
	  else if (HW != null) {HTMLCSS.Remeasured(this.data[0].HTMLstretchH(span,HW),span)}
          else {box = HTMLCSS.Measured(box,span)}
	  span.bbox = {w: box.bbox.w, h: box.bbox.h, d: box.bbox.d, lw: 0, rw: 0, exactW: true};
	  for (var i = 0, m = span.childNodes.length; i < m; i++)
	    {span.childNodes[i].style.visibility = "hidden"}
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLstretchH: MML.mbase.HTMLstretchH,
      HTMLstretchV: MML.mbase.HTMLstretchV
    });

    MML.mpadded.Augment({
      toHTML: function (span,HW,D) {
	span = this.HTMLcreateSpan(span);
	if (this.data[0] != null) {
	  var stack = HTMLCSS.createStack(span,true);
	  var box = HTMLCSS.createBox(stack);
          var child = this.data[0].toHTML(box);
	  if (D != null) {HTMLCSS.Remeasured(this.data[0].HTMLstretchV(box,HW,D),box)}
	  else if (HW != null) {HTMLCSS.Remeasured(this.data[0].HTMLstretchH(box,HW),box)}
          else {HTMLCSS.Measured(child,box)}
	  var values = this.getValues("height","depth","width","lspace","voffset"),
              x = 0, y = 0, mu = this.HTMLgetMu(span);
	  if (values.lspace)  {x = this.HTMLlength2em(box,values.lspace,mu)}
	  if (values.voffset) {y = this.HTMLlength2em(box,values.voffset,mu)}
	  HTMLCSS.placeBox(box,x,y);
	  span.bbox = {
	    h: box.bbox.h, d: box.bbox.d, w: box.bbox.w, exactW: true,
	    lw: Math.min(0,box.bbox.lw+x), rw: Math.max(box.bbox.w,box.bbox.rw+x),
	    H: Math.max((box.bbox.H == null ? -HTMLCSS.BIGDIMEN : box.bbox.H),box.bbox.h+y),
	    D: Math.max((box.bbox.D == null ? -HTMLCSS.BIGDIMEN : box.bbox.D),box.bbox.d-y)
	  };
	  if (values.height !== "") {span.bbox.h = this.HTMLlength2em(box,values.height,mu,"h",0)}
	  if (values.depth  !== "") {span.bbox.d = this.HTMLlength2em(box,values.depth,mu,"d",0)}
	  if (values.width  !== "") {span.bbox.w = this.HTMLlength2em(box,values.width,mu,"w",0)}
	  if (span.bbox.H <= span.bbox.h) {delete span.bbox.H}
	  if (span.bbox.D <= span.bbox.d) {delete span.bbox.D}
          var dimen = /^\s*(\d+(\.\d*)?|\.\d+)\s*(pt|em|ex|mu|px|pc|in|mm|cm)\s*$/
          span.bbox.exact = !!((this.data[0] && this.data[0].data.length == 0) ||
             dimen.exec(values.height) || dimen.exec(values.width) || dimen.exec(values.depth));
	  HTMLCSS.setStackWidth(stack,span.bbox.w);
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLlength2em: function (span,length,mu,d,m) {
	if (m == null) {m = -HTMLCSS.BIGDIMEN}
	var match = String(length).match(/width|height|depth/);
	var size = (match ? span.bbox[match[0].charAt(0)] : (d ? span.bbox[d] : 0));
	var v = HTMLCSS.length2em(length,mu,size);
	if (d && String(length).match(/^\s*[-+]/))
	  {return Math.max(m,span.bbox[d]+v)} else {return v}
      },
      HTMLstretchH: MML.mbase.HTMLstretchH,
      HTMLstretchV: MML.mbase.HTMLstretchV
    });

    MML.mrow.Augment({
      HTMLlineBreaks: function (span) {
        if (!this.parent.linebreakContainer) {return false}
        return (HTMLCSS.config.linebreaks.automatic &&
                span.bbox.w > HTMLCSS.linebreakWidth) || this.hasNewline();
      },
      HTMLstretchH: function (box,w) {
	this.HTMLremoveColor();
	var span = this.HTMLspanElement();
	this.data[this.core].HTMLstretchH(span,w);
	this.HTMLcomputeBBox(span,true);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLstretchV: function (box,h,d) {
	this.HTMLremoveColor();
	var span = this.HTMLspanElement();
	this.data[this.core].HTMLstretchV(span,h,d);
	this.HTMLcomputeBBox(span,true);
	this.HTMLhandleColor(span);
	return span;
      }
    });

    MML.mstyle.Augment({
      toHTML: function (span,HW,D) {
	span = this.HTMLcreateSpan(span);
	if (this.data[0] != null) {
	  var SPAN = this.data[0].toHTML(span);
	  if (D != null) {this.data[0].HTMLstretchV(span,HW,D)}
	  else if (HW != null) {this.data[0].HTMLstretchH(span,HW)}
          span.bbox = SPAN.bbox;
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLstretchH: MML.mbase.HTMLstretchH,
      HTMLstretchV: MML.mbase.HTMLstretchV
    });

    MML.mfrac.Augment({
      toHTML: function (span) {
	span = this.HTMLcreateSpan(span);
	var frac = HTMLCSS.createStack(span);
	var num = HTMLCSS.createBox(frac), den = HTMLCSS.createBox(frac);
        HTMLCSS.MeasureSpans([this.HTMLboxChild(0,num),this.HTMLboxChild(1,den)]);
        var values = this.getValues("displaystyle","linethickness","numalign","denomalign","bevelled");
	var scale = this.HTMLgetScale(), isDisplay = values.displaystyle;
	var a = HTMLCSS.TeX.axis_height * scale;
	if (values.bevelled) {
	  var delta = (isDisplay ? .4 : .15);
	  var H = Math.max(num.bbox.h+num.bbox.d,den.bbox.h+den.bbox.d)+2*delta;
	  var bevel = HTMLCSS.createBox(frac);
	  HTMLCSS.createDelimiter(bevel,0x2F,H);
	  HTMLCSS.placeBox(num,0,(num.bbox.d-num.bbox.h)/2+a+delta);
	  HTMLCSS.placeBox(bevel,num.bbox.w-delta/2,(bevel.bbox.d-bevel.bbox.h)/2+a);
	  HTMLCSS.placeBox(den,num.bbox.w+bevel.bbox.w-delta,(den.bbox.d-den.bbox.h)/2+a-delta);
	} else {
	  var W = Math.max(num.bbox.w,den.bbox.w);
	  var t = HTMLCSS.thickness2em(values.linethickness,scale), p,q, u,v;
	  var mt = HTMLCSS.TeX.min_rule_thickness/this.em;
	  if (isDisplay) {u = HTMLCSS.TeX.num1; v = HTMLCSS.TeX.denom1}
	    else {u = (t === 0 ? HTMLCSS.TeX.num3 : HTMLCSS.TeX.num2); v = HTMLCSS.TeX.denom2}
	  u *= scale; v *= scale;
	  if (t === 0) {// \atop
	    p = Math.max((isDisplay ? 7 : 3) * HTMLCSS.TeX.rule_thickness, 2*mt); // force to at least 2 px
	    q = (u - num.bbox.d) - (den.bbox.h - v);
	    if (q < p) {u += (p - q)/2; v += (p - q)/2}
	  } else {// \over
	    p = Math.max((isDisplay ? 2 : 0) * mt + t, t/2 + 1.5*mt);  // force to be at least 1.5px
	    q = (u - num.bbox.d) - (a + t/2); if (q < p) {u += p - q}
	    q = (a - t/2) - (den.bbox.h - v); if (q < p) {v += p - q}
	    var rule = HTMLCSS.createBox(frac);
	    HTMLCSS.createRule(rule,t,0,W+2*t);
	    HTMLCSS.placeBox(rule,0,a-t/2);
	  }
	  HTMLCSS.alignBox(num,values.numalign,u);
	  HTMLCSS.alignBox(den,values.denomalign,-v);
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLcanStretch: function (direction) {return false},
      HTMLhandleSpace: function (span) {
	if (!this.texWithDelims) {
	  var space = (this.useMMLspacing ? 0 : HTMLCSS.length2em(this.texSpacing()||0)) + .12;
	  span.style.paddingLeft  = HTMLCSS.Em(space);
	  span.style.paddingRight = HTMLCSS.Em(.12);
	}
      }
    });

    MML.msqrt.Augment({
      toHTML: function (span) {
	span = this.HTMLcreateSpan(span);
	var sqrt = HTMLCSS.createStack(span);
	var base = HTMLCSS.createBox(sqrt),
	    rule = HTMLCSS.createBox(sqrt),
	    surd = HTMLCSS.createBox(sqrt);
	var scale = this.HTMLgetScale();
	var t = HTMLCSS.TeX.rule_thickness * scale, p,q, H, W;
	if (this.Get("displaystyle")) {p = HTMLCSS.TeX.x_height * scale} else {p = t}
	q = Math.max(t + p/4,1.5*HTMLCSS.TeX.min_rule_thickness/this.em); // force to be at least 1px
	var BASE = this.HTMLboxChild(0,base);
	H = BASE.bbox.h + BASE.bbox.d + q + t;
        HTMLCSS.createDelimiter(surd,0x221A,H,scale);
	HTMLCSS.MeasureSpans([BASE,surd]);
	W = BASE.bbox.w;
	var x = 0;
	if (surd.isMultiChar || (HTMLCSS.AdjustSurd && HTMLCSS.imgFonts)) {surd.bbox.w *= .95}
	if (surd.bbox.h + surd.bbox.d > H) {q = ((surd.bbox.h+surd.bbox.d) - (H-t))/2}
	var ruleC = HTMLCSS.FONTDATA.DELIMITERS[HTMLCSS.FONTDATA.RULECHAR];
	if (!ruleC || W < ruleC.HW[0][0]*scale || scale < .75) {
	  HTMLCSS.createRule(rule,0,t,W);
	} else {
	  HTMLCSS.createDelimiter(rule,HTMLCSS.FONTDATA.RULECHAR,W,scale);
	}
	H = BASE.bbox.h + q + t;
        q = H*HTMLCSS.rfuzz; if (surd.isMultiChar) {q = HTMLCSS.rfuzz}
	x = this.HTMLaddRoot(sqrt,surd,x,surd.bbox.h+surd.bbox.d-H,scale);
	HTMLCSS.placeBox(surd,x,H-surd.bbox.h);
	HTMLCSS.placeBox(rule,x+surd.bbox.w,H-rule.bbox.h+q);
	HTMLCSS.placeBox(base,x+surd.bbox.w,0);
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLaddRoot: function (sqrt,surd,x,d,scale) {return x}
    });

    MML.mroot.Augment({
      toHTML: MML.msqrt.prototype.toHTML,
      HTMLaddRoot: function (sqrt,surd,x,d,scale) {
	var box = HTMLCSS.createBox(sqrt);
	if (this.data[1]) {
	  var root = this.data[1].toHTML(box);
	  root.style.paddingRight = root.style.paddingLeft = ""; // remove extra padding, if any
	  HTMLCSS.Measured(root,box);
	} else {box.bbox = this.HTMLzeroBBox()}
	var h = this.HTMLrootHeight(surd.bbox.h+surd.bbox.d,scale,box)-d;
	var w = Math.min(box.bbox.w,box.bbox.rw); // remove extra right-hand padding, if any
	x = Math.max(w,surd.offset);
	HTMLCSS.placeBox(box,x-w,h);
	return x - surd.offset;
      },
      HTMLrootHeight: function (d,scale,root) {
	return .45*(d-.9*scale)+.6*scale + Math.max(0,root.bbox.d-.075);
      }
    });

    MML.mfenced.Augment({
      toHTML: function (span) {
	span = this.HTMLcreateSpan(span);
	if (this.data.open) {this.data.open.toHTML(span)}
	if (this.data[0] != null) {this.data[0].toHTML(span)}
	for (var i = 1, m = this.data.length; i < m; i++) {
	  if (this.data[i]) {
	    if (this.data["sep"+i]) {this.data["sep"+i].toHTML(span)}
	    this.data[i].toHTML(span);
	  }
	}
	if (this.data.close) {this.data.close.toHTML(span)}
	var stretchy = this.HTMLcomputeBBox(span);
	var h = span.bbox.h, d = span.bbox.d;
	for (i = 0, m = stretchy.length; i < m; i++) {stretchy[i].HTMLstretchV(span,h,d)}
	if (stretchy.length) {this.HTMLcomputeBBox(span,true)}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLcomputeBBox: function (span,full) {
	var BBOX = span.bbox = {}, stretchy = [];
	this.HTMLcheckStretchy(this.data.open,BBOX,stretchy,full);
	this.HTMLcheckStretchy(this.data[0],BBOX,stretchy,full);
	for (var i = 1, m = this.data.length; i < m; i++) {
	  if (this.data[i]) {
	    this.HTMLcheckStretchy(this.data["sep"+i],BBOX,stretchy,full);
	    this.HTMLcheckStretchy(this.data[i],BBOX,stretchy,full);
	  }
	}
	this.HTMLcheckStretchy(this.data.close,BBOX,stretchy,full);
	this.HTMLcleanBBox(BBOX);
	return stretchy;
      },
      HTMLcheckStretchy: function (core,BBOX,stretchy,full) {
	if (core) {
	  if (!full && core.HTMLcanStretch("Vertical"))
	    {stretchy.push(core); core = (core.CoreMO()||core)}
	  this.HTMLcombineBBoxes(core,BBOX);
	}
      }
    });

    MML.menclose.Augment({toHTML: MML.mbase.HTMLautoload});
    MML.maction.Augment({toHTML: MML.mbase.HTMLautoload});

    MML.semantics.Augment({
      toHTML: function (span,HW,D) {
	span = this.HTMLcreateSpan(span);
	if (this.data[0] != null) {
	  var SPAN = this.data[0].toHTML(span);
	  if (D != null) {this.data[0].HTMLstretchV(span,HW,D)}
	  else if (HW != null) {this.data[0].HTMLstretchH(span,HW)}
          span.bbox = SPAN.bbox;
	}
	this.HTMLhandleSpace(span);
	return span;
      },
      HTMLstretchH: MML.mbase.HTMLstretchH,
      HTMLstretchV: MML.mbase.HTMLstretchV
    });

    MML.munderover.Augment({
      toHTML: function (span,HW,D) {
	var values = this.getValues("displaystyle","accent","accentunder","align");
	if (!values.displaystyle && this.data[this.base] != null &&
	    this.data[this.base].CoreMO().Get("movablelimits"))
	      {return MML.msubsup.prototype.toHTML.call(this,span)}
	span = this.HTMLcreateSpan(span); var scale = this.HTMLgetScale();
	var stack = HTMLCSS.createStack(span);
	var boxes = [], children = [], stretch = [], box, i, m;
	for (i = 0, m = this.data.length; i < m; i++) {
	  if (this.data[i] != null) {
	    box = boxes[i] = HTMLCSS.createBox(stack);
	    children[i] = this.data[i].toHTML(box);
	    if (i == this.base) {
	      if (D != null) {this.data[this.base].HTMLstretchV(box,HW,D)}
	      else if (HW != null) {this.data[this.base].HTMLstretchH(box,HW)}
	      stretch[i] = (D == null && HW != null ? false :
			   this.data[i].HTMLcanStretch("Horizontal"));
	    } else {
	      stretch[i] = this.data[i].HTMLcanStretch("Horizontal");
	    }
          }
        }
        HTMLCSS.MeasureSpans(children);
        var W = -HTMLCSS.BIGDIMEN, WW = W;
	for (i = 0, m = this.data.length; i < m; i++) {
	  if (this.data[i]) {
	    if (boxes[i].bbox.w > WW) {WW = boxes[i].bbox.w}
	    if (!stretch[i] && WW > W) {W = WW}
	  }
	}
	if (D == null && HW != null) {W = HW} else if (W == -HTMLCSS.BIGDIMEN) {W = WW}
        for (i = WW = 0, m = this.data.length; i < m; i++) {if (this.data[i]) {
          box = boxes[i];
          if (stretch[i]) {box.bbox = this.data[i].HTMLstretchH(box,W).bbox}
          if (box.bbox.w > WW) {WW = box.bbox.w}
        }}
	var t = HTMLCSS.TeX.rule_thickness, factor = HTMLCSS.FONTDATA.TeX_factor;
	var base = boxes[this.base] || {bbox: this.HTMLzeroBBox()};
	var x, y, z1, z2, z3, dw, k, delta = 0;
        if (base.bbox.ic) {delta = 1.3*base.bbox.ic + .05} // adjust faked IC to be more in line with expeted results
	for (i = 0, m = this.data.length; i < m; i++) {
	  if (this.data[i] != null) {
	    box = boxes[i];
	    z3 = HTMLCSS.TeX.big_op_spacing5 * scale;
	    var accent = (i != this.base && values[this.ACCENTS[i]]);
	    if (accent && box.bbox.w <= 1/HTMLCSS.em+.0001) { // images can get the width off by 1px
	      box.bbox.w = box.bbox.rw - box.bbox.lw; box.bbox.noclip = true;
	      if (box.bbox.lw)
		{box.insertBefore(HTMLCSS.createSpace(box.parentNode,0,0,-box.bbox.lw),box.firstChild)}
	      HTMLCSS.createBlank(box,0,0,box.bbox.rw+.1);
	    }
	    dw = {left:0, center:(WW-box.bbox.w)/2, right:WW-box.bbox.w}[values.align];
	    x = dw; y = 0;
	    if (i == this.over) {
	      if (accent) {
		k = Math.max(t * scale * factor,2.5/this.em); z3 = 0;
		if (base.bbox.skew) {x += base.bbox.skew}
	      } else {
		z1 = HTMLCSS.TeX.big_op_spacing1 * scale * factor;
		z2 = HTMLCSS.TeX.big_op_spacing3 * scale * factor;
		k = Math.max(z1,z2-Math.max(0,box.bbox.d));
	      }
	      k = Math.max(k,1.5/this.em); // force to be at least 1.5px
	      x += delta/2; y = base.bbox.h + box.bbox.d + k;
	      box.bbox.h += z3;
	    } else if (i == this.under) {
	      if (accent) {
		k = 3*t * scale * factor; z3 = 0;
	      } else {
		z1 = HTMLCSS.TeX.big_op_spacing2 * scale * factor;
		z2 = HTMLCSS.TeX.big_op_spacing4 * scale * factor;
		k = Math.max(z1,z2-box.bbox.h);
	      }
	      k = Math.max(k,1.5/this.em); // force to be at least 1.5px
	      x -= delta/2; y = -(base.bbox.d + box.bbox.h + k);
	      box.bbox.d += z3;
	    }
	    HTMLCSS.placeBox(box,x,y);
	  }
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLstretchH: MML.mbase.HTMLstretchH,
      HTMLstretchV: MML.mbase.HTMLstretchV
    });

    MML.msubsup.Augment({
      toHTML: function (span,HW,D) {
	span = this.HTMLcreateSpan(span);
        var scale = this.HTMLgetScale(), mu = this.HTMLgetMu(span);
	var stack = HTMLCSS.createStack(span), values, children = [];
	var base = HTMLCSS.createBox(stack);
	if (this.data[this.base]) {
          children.push(this.data[this.base].toHTML(base));
	  if (D != null) {this.data[this.base].HTMLstretchV(base,HW,D)}
	  else if (HW != null) {this.data[this.base].HTMLstretchH(base,HW)}
	} else {base.bbox = this.HTMLzeroBBox()}
	var x_height = HTMLCSS.TeX.x_height * scale,
	    s = HTMLCSS.TeX.scriptspace * scale * .75;  // FIXME: .75 can be removed when IC is right?
	var sup, sub;
	if (this.HTMLnotEmpty(this.data[this.sup]))
          {sup = HTMLCSS.createBox(stack); children.push(this.data[this.sup].toHTML(sup))}
	if (this.HTMLnotEmpty(this.data[this.sub]))
          {sub = HTMLCSS.createBox(stack); children.push(this.data[this.sub].toHTML(sub))}
        HTMLCSS.MeasureSpans(children);
	if (sup) {sup.bbox.w += s; sup.bbox.rw = Math.max(sup.bbox.w,sup.bbox.rw)}
	if (sub) {sub.bbox.w += s; sub.bbox.rw = Math.max(sub.bbox.w,sub.bbox.rw)}
	HTMLCSS.placeBox(base,0,0);
	var sscale = (this.data[this.sup] || this.data[this.sub] || this).HTMLgetScale();
	var q = HTMLCSS.TeX.sup_drop * sscale, r = HTMLCSS.TeX.sub_drop * sscale;
	var u = base.bbox.h - q, v = base.bbox.d + r, delta = 0, p;
	if (base.bbox.ic) {
          base.bbox.w -= base.bbox.ic;    // remove IC (added by mo and mi)
          delta = 1.3*base.bbox.ic + .05; // adjust faked IC to be more in line with expected results
        }
	if (this.data[this.base] &&
	   (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
	  if (this.data[this.base].data.join("").length === 1 && base.bbox.scale === 1 &&
	      !this.data[this.base].Get("largeop")) {u = v = 0}
	}
	var min = this.getValues("subscriptshift","superscriptshift");
	min.subscriptshift   = (min.subscriptshift === ""   ? 0 : HTMLCSS.length2em(min.subscriptshift,mu));
	min.superscriptshift = (min.superscriptshift === "" ? 0 : HTMLCSS.length2em(min.superscriptshift,mu));
	if (!sup) {
	  if (sub) {
	    v = Math.max(v,HTMLCSS.TeX.sub1*scale,sub.bbox.h-(4/5)*x_height,min.subscriptshift);
	    HTMLCSS.placeBox(sub,base.bbox.w,-v,sub.bbox);
	  }
	} else {
	  if (!sub) {
	    values = this.getValues("displaystyle","texprimestyle");
	    p = HTMLCSS.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
	    u = Math.max(u,p*scale,sup.bbox.d+(1/4)*x_height,min.superscriptshift);
	    HTMLCSS.placeBox(sup,base.bbox.w+delta,u,sup.bbox);
	  } else {
	    v = Math.max(v,HTMLCSS.TeX.sub2*scale);
	    var t = HTMLCSS.TeX.rule_thickness * scale;
	    if ((u - sup.bbox.d) - (sub.bbox.h - v) < 3*t) {
	      v = 3*t - u + sup.bbox.d + sub.bbox.h;
	      q = (4/5)*x_height - (u - sup.bbox.d);
	      if (q > 0) {u += q; v -= q}
	    }
	    HTMLCSS.placeBox(sup,base.bbox.w+delta,Math.max(u,min.superscriptshift));
	    HTMLCSS.placeBox(sub,base.bbox.w,-Math.max(v,min.subscriptshift));
	  }
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      },
      HTMLstretchH: MML.mbase.HTMLstretchH,
      HTMLstretchV: MML.mbase.HTMLstretchV
    });

    MML.mmultiscripts.Augment({toHTML: MML.mbase.HTMLautoload});

    MML.mtable.Augment({toHTML: MML.mbase.HTMLautoload});
    
    MML["annotation-xml"].Augment({toHTML: MML.mbase.HTMLautoload});
    
    MML.math.Augment({
      toHTML: function (span,node) {
	var alttext = this.Get("alttext");
        if (alttext && alttext !== "") {node.setAttribute("aria-label",alttext)}
	var nobr = HTMLCSS.addElement(span,"nobr",{isMathJax: true});
	span = this.HTMLcreateSpan(nobr);
	var stack = HTMLCSS.createStack(span), box = HTMLCSS.createBox(stack), math;
	// Move font-size from outer span to stack to avoid line separation 
	// problem in strict HTML mode
	stack.style.fontSize = nobr.parentNode.style.fontSize; nobr.parentNode.style.fontSize = "";
	if (this.data[0] != null) {
	  if (HTMLCSS.msieColorBug) {
	    if (this.background) {this.data[0].background = this.background; delete this.background}
	    if (this.mathbackground) {this.data[0].mathbackground = this.mathbackground; delete this.mathbackground}
	  }
	  MML.mbase.prototype.displayAlign = HUB.config.displayAlign;
	  MML.mbase.prototype.displayIndent = HUB.config.displayIndent;
          var html = this.data[0].toHTML(box); html.bbox.exactW = false; // force remeasure just to be sure
	  math = HTMLCSS.Measured(html,box);
	}
	HTMLCSS.placeBox(box,0,0);
        stack.style.width = Math.round(HTMLCSS.unEm(stack.style.width)*this.em)+"px"; // get width right if minimum font size is set
	//
	//  Adjust bbox to match outer em-size
	// 
        var p = 1/HTMLCSS.em, f = HTMLCSS.em / HTMLCSS.outerEm; HTMLCSS.em /= f;
	span.bbox.h *= f; span.bbox.d *= f; span.bbox.w *= f;
	span.bbox.lw *= f; span.bbox.rw *= f;
	if (math && math.bbox.width != null) {
	  stack.style.width = math.bbox.width;
	  box.style.width = "100%";
	}
	//
	//  Add color (if any)
	//
	this.HTMLhandleColor(span);
	//
	//  Make math span be the correct height and depth
	//
	if (math) {HTMLCSS.createRule(span,(math.bbox.h+p)*f,(math.bbox.d+p)*f,0)}
	//
	//  Handle indentalign and indentshift for single-line display equations
	//
	if (!this.isMultiline && this.Get("display") === "block" && span.bbox.width == null) {
	  var values = this.getValues("indentalignfirst","indentshiftfirst","indentalign","indentshift");
	  if (values.indentalignfirst !== MML.INDENTALIGN.INDENTALIGN) {values.indentalign = values.indentalignfirst}
	  if (values.indentalign === MML.INDENTALIGN.AUTO) {values.indentalign = this.displayAlign}
	  node.style.textAlign = values.indentalign;
	  if (values.indentshiftfirst !== MML.INDENTSHIFT.INDENTSHIFT) {values.indentshift = values.indentshiftfirst}
	  if (values.indentshift === "auto") {values.indentshift = this.displayIndent}
	  if (values.indentshift && values.indentalign !== MML.INDENTALIGN.CENTER) {
	    span.style[{left:"marginLeft",right:"marginRight"}[values.indentalign]] =
	      HTMLCSS.Em(HTMLCSS.length2em(values.indentshift));
	  }
	}
	return span;
      },
      HTMLspanElement: MML.mbase.prototype.HTMLspanElement
    });

    MML.TeXAtom.Augment({
      toHTML: function (span) {
	span = this.HTMLcreateSpan(span);
	if (this.data[0] != null) {
	  if (this.texClass === MML.TEXCLASS.VCENTER) {
	    var stack = HTMLCSS.createStack(span);
	    var box = HTMLCSS.createBox(stack);
	    HTMLCSS.Measured(this.data[0].toHTML(box),box);
	    // FIXME: should the axis height be scaled?
	    HTMLCSS.placeBox(box,0,HTMLCSS.TeX.axis_height-(box.bbox.h+box.bbox.d)/2+box.bbox.d);
	  } else {
	    span.bbox = this.data[0].toHTML(span).bbox;
	  }
	}
	this.HTMLhandleSpace(span);
	this.HTMLhandleColor(span);
	return span;
      }
    });
    
    //
    //  Loading isn't complete until the element jax is modified,
    //  but can't call loadComplete within the callback for "mml Jax Ready"
    //  (it would call HTMLCSS's Require routine, asking for the mml jax again)
    //  so wait until after the mml jax has finished processing.
    //  
    //  We also need to wait for the onload handler to run, since the loadComplete
    //  will call Config and Startup, which need to modify the body.
    //
    MathJax.Hub.Register.StartupHook("onLoad",function () {
      setTimeout(MathJax.Callback(["loadComplete",HTMLCSS,"jax.js"]),0);
    });
  });

  HUB.Register.StartupHook("End Config",function () {
    
    //
    //  Handle browser-specific setup
    //
    HUB.Browser.Select({
      MSIE: function (browser) {
        var mode = (document.documentMode || 0);
        var isIE7 = browser.versionAtLeast("7.0");
        var isIE8 = browser.versionAtLeast("8.0") && mode > 7;
        var quirks = (document.compatMode === "BackCompat");
        if (mode < 9) {
          // IE doesn't do mouse events on trasparent objects,
          //   so give a background color, but opacity makes it transparent
          HTMLCSS.config.styles[".MathJax .MathJax_HitBox"]["background-color"] = "white";
          HTMLCSS.config.styles[".MathJax .MathJax_HitBox"].opacity = 0
          HTMLCSS.config.styles[".MathJax .MathJax_HitBox"].filter = "alpha(opacity=0)";
        }
        // FIXME:  work out tests for these?
        HTMLCSS.Augment({
          PaddingWidthBug: true,
          msieAccentBug: true,
          msieColorBug: true,
          msieColorPositionBug: true,    // needs position:relative to put color behind text
          msieRelativeWidthBug: quirks,
          msieDisappearingBug: (mode >= 8), // inline math disappears
          msieMarginScaleBug: (mode < 8),   // relative margins are not scaled properly by font-size
          msiePaddingWidthBug: true,
          msieBorderWidthBug: quirks,
          msieFrameSizeBug: (mode <= 8),    // crashes if size of box isn't big enough for border
          msieInlineBlockAlignBug: (!isIE8 || quirks),
          msiePlaceBoxBug: (isIE8 && !quirks),
          msieClipRectBug: !isIE8,
          msieNegativeSpaceBug: quirks,
          cloneNodeBug: (isIE8 && browser.version === "8.0"),
          initialSkipBug: (mode < 8),        // confused by initial left-margin values
          msieNegativeBBoxBug: (mode >= 8),  // negative bboxes have positive widths
          msieIE6: !isIE7,
          msieItalicWidthBug: true,
          FontFaceBug: true,
          msieFontCSSBug: browser.isIE9,
          allowWebFonts: (mode >= 9 ? "woff" : "eot")
        });
      },

      Firefox: function (browser) {
        var webFonts = false;
        if (browser.versionAtLeast("3.5")) {
          var root = String(document.location).replace(/[^\/]*$/,"");
          if (document.location.protocol !== "file:" || HUB.config.root.match(/^https?:\/\//) ||
              (HUB.config.root+"/").substr(0,root.length) === root) {webFonts = "otf"}
        }
        HTMLCSS.Augment({
          ffVerticalAlignBug: true,
          AccentBug: true,
          allowWebFonts: webFonts
        });
      },

      Safari: function (browser) {
        var v3p0 = browser.versionAtLeast("3.0");
        var v3p1 = browser.versionAtLeast("3.1");
        var trueSafari = navigator.appVersion.match(/ Safari\/\d/) &&
                         navigator.appVersion.match(/ Version\/\d/) &&
                         navigator.vendor.match(/Apple/);
        var android = (navigator.appVersion.match(/ Android (\d+)\.(\d+)/));
        var forceImages = (v3p1 && browser.isMobile && (
          (navigator.platform.match(/iPad|iPod|iPhone/) && !browser.versionAtLeast("5.0")) ||
          (android != null && (android[1] < 2 || (android[1] == 2 && android[2] < 2)))
        ));
        HTMLCSS.Augment({
          config: {
            styles: {
              ".MathJax img, .MathJax nobr, .MathJax a": {
                // "none" seems to work like "0px" when width is initially 0
                "max-width": "5000em", "max-height": "5000em"
              }
            }
          },
          rfuzz: .011,
          AccentBug: true,
          AdjustSurd: true,
          negativeBBoxes: true,
          safariNegativeSpaceBug: true,
          safariVerticalAlignBug: !v3p1,
          safariTextNodeBug: !v3p0,
          forceReflow: true,
          allowWebFonts: (v3p1 && !forceImages ? "otf" : false)
        });
        if (trueSafari) {
          HTMLCSS.Augment({
            webFontDefault: (browser.isMobile ? "sans-serif" : "serif")
          });
        }
        if (browser.isPC) {
          HTMLCSS.Augment({
            adjustAvailableFonts: HTMLCSS.removeSTIXfonts,  // can't access plane1
            checkWebFontsTwice: true  // bug in Safari/Win that doesn't update font test div properly
          });
        }
        if (forceImages) {
          //  Force image mode for iOS prior to 4.2 and Droid prior to 2.2
          var config = HUB.config["HTML-CSS"];
          if (config) {config.availableFonts = []; config.preferredFont = null}
            else {HUB.config["HTML-CSS"] = {availableFonts: [], preferredFont: null}}
        }
      },

      Chrome: function (browser) {
        HTMLCSS.Augment({
          Em: HTMLCSS.Px,       // vertical alignment is better in pixels (since around v20)
          unEm: HTMLCSS.unPx,
          chromeHeightBug: true, // heights can be 1px off from the explicitly set size
          cloneNodeBug: true,    // Chrome gets heights wrong with the cloned ones
          rfuzz: .011,
          AccentBug: true,
          AdjustSurd: true,
          negativeBBoxes: true,
          safariNegativeSpaceBug: true,
          safariWebFontSerif: [""],
          forceReflow: true,
          allowWebFonts: (browser.versionAtLeast("4.0") ? "otf" : "svg")
        });
      },

      Opera: function (browser) {
        browser.isMini = (navigator.appVersion.match("Opera Mini") != null);
        HTMLCSS.config.styles[".MathJax .merror"]["vertical-align"] = null;
        HTMLCSS.config.styles[".MathJax span"]["z-index"] = 0;
        HTMLCSS.Augment({
          operaHeightBug: true,
          operaVerticalAlignBug: true,
          operaFontSizeBug: browser.versionAtLeast("10.61"),
          initialSkipBug: true,
          FontFaceBug: true,
          PaddingWidthBug: true,
          allowWebFonts: (browser.versionAtLeast("10.0") && !browser.isMini ? "otf" : false),
          adjustAvailableFonts: HTMLCSS.removeSTIXfonts
        });
      },

      Konqueror: function (browser) {
        HTMLCSS.Augment({
          konquerorVerticalAlignBug: true
        });
      }
    });
  
  });

  MathJax.Hub.Register.StartupHook("End Cookie", function () {  
    if (HUB.config.menuSettings.zoom !== "None")
      {AJAX.Require("[MathJax]/extensions/MathZoom.js")}
  });
    
})(MathJax.Ajax, MathJax.Hub, MathJax.OutputJax["HTML-CSS"]);
