/*************************************************************
 *
 *  MathJax/jax/output/SVG/jax.js
 *
 *  Implements the SVG OutputJax that displays mathematics using
 *  SVG (or VML in IE) to position the characters from math fonts
 *  in their proper locations.
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


(function (AJAX,HUB,HTML,SVG) {
  var MML;

  var SVGNS   = "http://www.w3.org/2000/svg";
  var XLINKNS = "http://www.w3.org/1999/xlink";

  SVG.Augment({
    config: {
      styles: {
        ".MathJax_SVG": {
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

        ".MathJax_SVG_Display": {
          position: "relative",
          display: "block",
          width: "100%"
        },
        
        ".MathJax_SVG svg a > g, .MathJax_SVG_Display svg a > g": {
          fill: "blue", stroke: "blue"
        },

        ".MathJax_SVG_Processing": {
          visibility: "hidden", position:"absolute", top:0, left:0,
          width:0, height: 0, overflow:"hidden", display:"block"
        },
        ".MathJax_SVG_Processed": {display:"none!important"},
        
        ".MathJax_SVG_ExBox": {
          display:"block", overflow:"hidden",
          width:"1px", height:"60ex"
        },
        
        "#MathJax_SVG_Tooltip": {
          position: "absolute", left: 0, top: 0,
          width: "auto", height: "auto",
          display: "none"
        }
      }
    },

    hideProcessedMath: true,           // use display:none until all math is processed

    Config: function () {
      var settings = HUB.config.menuSettings;
      if (settings.scale) {this.config.scale = settings.scale}
      this.SUPER(arguments).Config.apply(this,arguments);
      this.fontInUse = this.config.font; this.fontDir += "/" + this.config.font;
      if (!this.require) {this.require = []}
      this.require.push(this.fontDir+"/fontdata.js");
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

      // Make hidden div for doing tests and storing global SVG <defs>
      this.hiddenDiv = HTML.Element("div",{
        style:{visibility:"hidden", overflow:"hidden", position:"absolute", top:0,
               height:"1px", width: "auto", padding:0, border:0, margin:0,
               textAlign:"left", textIndent:0, textTransform:"none",
               lineHeight:"normal", letterSpacing:"normal", wordSpacing:"normal"}
      });
      if (!document.body.firstChild) {document.body.appendChild(this.hiddenDiv)}
        else {document.body.insertBefore(this.hiddenDiv,document.body.firstChild)}
      this.hiddenDiv = HTML.addElement(this.hiddenDiv,"div",{id:"MathJax_SVG_Hidden"});

      // Determine pixels-per-inch and em-size
      var div = HTML.addElement(this.hiddenDiv,"div",{style:{width:"5in"}});
      this.pxPerInch = div.offsetWidth/5; this.hiddenDiv.removeChild(div);
      
      // Used for measuring text sizes
      this.textSVG = this.Element("svg");
      
      // Global defs for font glyphs
      DEFS = this.addElement(this.addElement(this.hiddenDiv.parentNode,"svg"),"defs",{id:"MathJax_SVG_glyphs"});
      GLYPHS = {};

       // Used in preTranslate to get scaling factors
      this.ExSpan = HTML.Element("span",
        {style:{position:"absolute","font-size-adjust":"none"}},
        [["span",{className:"MathJax_SVG_ExBox"}]]
      );

      // Used in preTranslate to get linebreak width
      this.linebreakSpan = HTML.Element("span",null,
        [["hr",{style: {width:"auto", size:1, padding:0, border:0, margin:0}}]]);

     // Set up styles
      return AJAX.Styles(this.config.styles,["InitializeSVG",this]);
    },
    
    //
    //  Handle initialization that requires styles to be set up
    //
    InitializeSVG: function () {
      //
      //  Get the default sizes (need styles in place to do this)
      //
      document.body.appendChild(this.ExSpan);
      document.body.appendChild(this.linebreakSpan);
      this.defaultEx    = this.ExSpan.firstChild.offsetHeight/60;
      this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
      document.body.removeChild(this.linebreakSpan);
      document.body.removeChild(this.ExSpan);
    },

    preTranslate: function (state) {
      var scripts = state.jax[this.id], i, m = scripts.length,
          script, prev, span, div, test, jax, ex, em, maxwidth, relwidth = false, cwidth,
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
        if (prev && String(prev.className).match(/^MathJax(_SVG)?(_Display)?( MathJax(_SVG)?_Processing)?$/))
          {prev.parentNode.removeChild(prev)}
        //
        //  Add the span, and a div if in display mode,
        //  then set the role and mark it as being processed
        //
        jax = script.MathJax.elementJax; if (!jax) continue;
        jax.SVG = {display: (jax.root.Get("display") === "block")}
        span = div = HTML.Element("span",{
          style: {"font-size": this.config.scale+"%", display:"inline-block"},
 	  className:"MathJax_SVG", id:jax.inputID+"-Frame", isMathJax:true, jaxID:this.id,
          oncontextmenu:EVENT.Menu, onmousedown: EVENT.Mousedown,
          onmouseover:EVENT.Mouseover, onmouseout:EVENT.Mouseout, onmousemove:EVENT.Mousemove,
	  onclick:EVENT.Click, ondblclick:EVENT.DblClick
        });
	if (HUB.Browser.noContextMenu) {
	  span.ontouchstart = TOUCH.start;
	  span.ontouchend = TOUCH.end;
	}
        if (jax.SVG.display) {
          div = HTML.Element("div",{className:"MathJax_SVG_Display"});
          div.appendChild(span);
        }
        //
        //  Mark math for screen readers
        //    (screen readers don't know about role="math" yet, so use "textbox" instead)
        //
        div.setAttribute("role","textbox"); div.setAttribute("aria-readonly","true");
        div.className += " MathJax_SVG_Processing";
        script.parentNode.insertBefore(div,script);
        //
        //  Add the test span for determining scales and linebreak widths
        //
        script.parentNode.insertBefore(this.ExSpan.cloneNode(true),script);
        div.parentNode.insertBefore(this.linebreakSpan.cloneNode(true),div);
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
        cwidth = div.previousSibling.firstChild.offsetWidth;
        if (relwidth) {maxwidth = cwidth}
        if (ex === 0 || ex === "NaN") {
          // can't read width, so move to hidden div for processing
          // (this will cause a reflow for each math element that is hidden)
          this.hiddenDiv.appendChild(div);
          jax.SVG.isHidden = true;
          ex = this.defaultEx; cwidth = this.defaultWidth;
          if (relwidth) {maxwidth = this.defaultWidth}
        }
        jax.SVG.ex = ex; jax.SVG.cwidth = cwidth;
        jax.SVG.em = em = ex / SVG.TeX.x_height * 1000; // scale ex to x_height
        jax.SVG.lineWidth = (linebreak ? this.length2em(width,1,maxwidth/em) : 1000000);
      }
      //
      //  Remove the test spans used for determining scales and linebreak widths
      //
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        test = scripts[i].previousSibling; span = test.previousSibling;
        jax = scripts[i].MathJax.elementJax; if (!jax) continue;
        if (!jax.SVG.isHidden) {span = span.previousSibling}
        span.parentNode.removeChild(span);
        test.parentNode.removeChild(test);
      }
      //
      //  Set state variables used for displaying equations in chunks
      //
      state.SVGeqn = state.SVGlast = 0; state.SVGi = -1;
      state.SVGchunk = this.config.EqnChunk;
      state.SVGdelay = false;
    },

    Translate: function (script,state) {
      if (!script.parentNode) return;

      //
      //  If we are supposed to do a chunk delay, do it
      //  
      if (state.SVGdelay) {
        state.SVGdelay = false;
        HUB.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
      }

      //
      //  Get the data about the math
      //
      var jax = script.MathJax.elementJax, math = jax.root,
          span = document.getElementById(jax.inputID+"-Frame"),
          div = (jax.SVG.display ? span.parentNode : span);
      //
      //  Set the font metrics
      //
      this.em = MML.mbase.prototype.em = jax.SVG.em; this.ex = jax.SVG.ex;
      this.linebreakWidth = jax.SVG.lineWidth * 1000; this.cwidth = jax.SVG.cwidth;
      //
      //  Typeset the math
      //
      this.mathDiv = div;
      span.appendChild(this.textSVG);
      this.initSVG(math,span);
      math.setTeXclass();
      try {math.toSVG(span,div)} catch (err) {
        if (err.restart) {while (span.firstChild) {span.removeChild(span.firstChild)}}
        throw err;
      }
      span.removeChild(this.textSVG);
      //
      //  Put it in place, and remove the processing marker
      //
      if (jax.SVG.isHidden) {script.parentNode.insertBefore(div,script)}
      div.className = div.className.split(/ /)[0];
      //
      //  Check if we are hiding the math until more is processed
      //
      if (this.hideProcessedMath) {
        //
        //  Hide the math and don't let its preview be removed
        //
        div.className += " MathJax_SVG_Processed";
        if (script.MathJax.preview) {
          jax.SVG.preview = script.MathJax.preview;
          delete script.MathJax.preview;
        }
        //
        //  Check if we should show this chunk of equations
        //
        state.SVGeqn += (state.i - state.SVGi); state.SVGi = state.i;
        if (state.SVGeqn >= state.SVGlast + state.SVGchunk) {
          this.postTranslate(state);
          state.SVGchunk = Math.floor(state.SVGchunk*this.config.EqnChunkFactor);
          state.SVGdelay = true;  // delay if there are more scripts
        }
      }
    },

    postTranslate: function (state) {
      var scripts = state.jax[this.id];
      if (!this.hideProcessedMath) return;
      //
      //  Reveal this chunk of math
      //
      for (var i = state.SVGlast, m = state.SVGeqn; i < m; i++) {
        var script = scripts[i];
        if (script && script.MathJax.elementJax) {
          //
          //  Remove the processed marker
          //
          script.previousSibling.className = script.previousSibling.className.split(/ /)[0];
          var data = script.MathJax.elementJax.SVG;
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
      //
      //  Save our place so we know what is revealed
      //
      state.SVGlast = state.SVGeqn;
    },

    //
    //  Return the containing HTML element rather than the SVG element, since
    //  most browsers can't position to an SVG element properly.
    //
    hashCheck: function (target) {
      if (target && target.nodeName === "g")
        {do {target = target.parentNode} while (target && target.firstChild.nodeName !== "svg")}
      return target;
    },

    getJaxFromMath: function (math) {
      if (math.parentNode.className === "MathJax_SVG_Display") {math = math.parentNode}
      do {math = math.nextSibling} while (math && math.nodeName.toLowerCase() !== "script");
      return HUB.getJaxFor(math);
    },
    getHoverSpan: function (jax,math) {
      math.style.position = "relative"; // make sure inline containers have position set
      return math.firstChild;
    },
    getHoverBBox: function (jax,span,math) {
      var bbox = EVENT.getBBox(span.parentNode);
      bbox.h += 2; bbox.d -= 2; // bbox seems to be a bit off, so compensate (FIXME)
      return bbox;
    },
    
    Zoom: function (jax,span,math,Mw,Mh) {
      //
      //  Re-render at larger size
      //
      span.className = "MathJax_SVG";

      //
      //  get em size (taken from this.preTranslate)
      //
      var emex = span.appendChild(this.ExSpan.cloneNode(true));
      var ex = emex.firstChild.offsetHeight/60;
      this.em = MML.mbase.prototype.em = ex / SVG.TeX.x_height * 1000;
      this.cwidth = .85*SVG.defaultWidth;
      emex.parentNode.removeChild(emex);

      this.idPostfix = "-zoom"; jax.root.toSVG(span,span); this.idPostfix = "";
      if (this.operaZoomRefresh)
        {setTimeout(function () {span.firstChild.style.border="1px solid transparent"},1)}
      //
      //  Get height and width of zoomed math and original math
      //
      span.style.position = math.style.position = "absolute";
      var zW = span.offsetWidth, zH = span.offsetHeight,
          mH = math.offsetHeight, mW = math.offsetWidth;
      span.style.position = math.style.position = "";
      //
      return {Y:-EVENT.getBBox(span).h, mW:mW, mH:mH, zW:zW, zH:zH};
    },

    initSVG: function (math,span) {},
    
    Remove: function (jax) {
      var span = document.getElementById(jax.inputID+"-Frame");
      if (span) {
        if (jax.SVG.display) {span = span.parentNode}
        span.parentNode.removeChild(span);
      }
      delete jax.SVG;
    },
    
    Em: function (m) {
      if (Math.abs(m) < .0006) {return "0em"}
      return m.toFixed(3).replace(/\.?0+$/,"") + "em";
    },
    Ex: function (m) {
      m = m / this.TeX.x_height;
      if (Math.abs(m) < .0006) {return "0ex"}
      return m.toFixed(3).replace(/\.?0+$/,"") + "ex";
    },
    Percent: function (m) {
      return (100*m).toFixed(1).replace(/\.?0+$/,"") + "%";
    },
    length2em: function (length,mu,size) {
      if (typeof(length) !== "string") {length = length.toString()}
      if (length === "") {return ""}
      if (length === MML.SIZE.NORMAL) {return 1000}
      if (length === MML.SIZE.BIG)    {return 2000}
      if (length === MML.SIZE.SMALL)  {return  710}
      if (length === "infinity")      {return SVG.BIGDIMEN}
      if (length.match(/mathspace$/)) {return 1000*SVG.MATHSPACE[length]}
      var match = length.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
      var m = parseFloat(match[1]||"1") * 1000, unit = match[2];
      if (size == null) {size = 1000};  if (mu == null) {mu = 1}
      if (unit === "em") {return m}
      if (unit === "ex") {return m * SVG.TeX.x_height/1000}
      if (unit === "%")  {return m / 100 * size / 1000}
      if (unit === "px") {return m / SVG.em}
      if (unit === "pt") {return m / 10}                             // 10 pt to an em
      if (unit === "pc") {return m * 1.2}                            // 12 pt to a pc
      if (unit === "in") {return m * this.pxPerInch / SVG.em}
      if (unit === "cm") {return m * this.pxPerInch / SVG.em / 2.54} // 2.54 cm to an inch
      if (unit === "mm") {return m * this.pxPerInch / SVG.em / 25.4} // 10 mm to a cm
      if (unit === "mu") {return m / 18 * mu}
      return m*size / 1000;  // relative to given size (or 1em as default)
    },
    thickness2em: function (length,mu) {
      var thick = SVG.TeX.rule_thickness;
      if (length === MML.LINETHICKNESS.MEDIUM) {return thick}
      if (length === MML.LINETHICKNESS.THIN)   {return .67*thick}
      if (length === MML.LINETHICKNESS.THICK)  {return 1.67*thick}
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
      var border = {top:0, right:0, bottom:0, left:0}, has = false;
      for (var id in border) {if (border.hasOwnProperty(id)) {
        var ID = "border"+id.charAt(0).toUpperCase()+id.substr(1);
        var style = span.style[ID+"Style"];
        if (style) {
          has = true;
          border[id] = this.length2em(span.style[ID+"Width"]);
          border[id+"Style"] = span.style[ID+"Style"];
          border[id+"Color"] = span.style[ID+"Color"];
          if (border[id+"Color"] === "initial") {border[id+"Color"] = ""}
        }
      }}
      return (has ? border : false);
    },

    Element: function (type,def) {
      var obj = (typeof(type) === "string" ? document.createElementNS(SVGNS,type) : type);
      obj.isMathJax = true;
      if (def) {for (var id in def) {if (def.hasOwnProperty(id)) {obj.setAttribute(id,def[id].toString())}}}
      return obj;
    },
    addElement: function (parent,type,def) {return parent.appendChild(this.Element(type,def))},
    TextNode: HTML.TextNode,
    addText: HTML.addText,
    ucMatch: HTML.ucMatch,

    HandleVariant: function (variant,scale,text) {
      var svg = BBOX.G();
      var n, N, c, font, VARIANT, i, m, id, M, RANGES;
      if (!variant) {variant = this.FONTDATA.VARIANT[MML.VARIANT.NORMAL]}
      if (variant.forceFamily) {
        text = BBOX.TEXT(scale,text,variant.font);
        if (variant.h != null) {text.h = variant.h}; if (variant.d != null) {text.d = variant.d}
        svg.Add(text); text = "";
      }
      VARIANT = variant;
      for (i = 0, m = text.length; i < m; i++) {
        variant = VARIANT;
        n = text.charCodeAt(i); c = text.charAt(i);
        if (n >= 0xD800 && n < 0xDBFF) {
          i++; n = (((n-0xD800)<<10)+(text.charCodeAt(i)-0xDC00))+0x10000;
          if (this.FONTDATA.RemapPlane1) {
            var nv = this.FONTDATA.RemapPlane1(n,variant);
            n = nv.n; variant = nv.variant;
          }
        } else {
          RANGES = this.FONTDATA.RANGES;
          for (id = 0, M = RANGES.length; id < M; id++) {
            if (RANGES[id].name === "alpha" && variant.noLowerCase) continue;
            N = variant["offset"+RANGES[id].offset];
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
            i = 0; m = text.length;
            n = n.charCodeAt(0);
          }
        }
        font = this.lookupChar(variant,n); c = font[n];
        if (c) {
          if (c[5] && c[5].space) {svg.w += c[2]} else {
            c = [scale,font.id+"-"+n.toString(16).toUpperCase()].concat(c);
            svg.Add(BBOX.GLYPH.apply(BBOX,c),svg.w,0);
          }
        } else if (this.FONTDATA.DELIMITERS[n]) {
          c = this.createDelimiter(n,0,1,font);
          svg.Add(c,svg.w,(this.FONTDATA.DELIMITERS[n].dir === "V" ? c.d: 0));
        } else {
          if (n <= 0xFFFF) {c = String.fromCharCode(n)} else {
            N = n - 0x10000;
            c = String.fromCharCode((N>>10)+0xD800)
              + String.fromCharCode((N&0x3FF)+0xDC00);
          }
          var box = BBOX.TEXT(scale,c,{
            "font-family":variant.defaultFamily||SVG.config.undefinedFamily,
            "font-style":(variant.italic?"italic":""),
            "font-weight":(variant.bold?"bold":"")
          })
          if (variant.h != null) {box.h = variant.h}; if (variant.d != null) {box.d = variant.d}
          c = BBOX.G(); c.Add(box); svg.Add(c,svg.w,0);
          HUB.signal.Post(["SVG Jax - unknown char",n,variant]);
        }
      }
      if (text.length == 1 && font.skew && font.skew[n]) {svg.skew = font.skew[n]*1000}
      if (svg.element.childNodes.length === 1) {
        svg.element = svg.element.firstChild;
        svg.removeable = false; svg.scale = scale;
      }
      return svg;
    },
        
    lookupChar: function (variant,n) {
      var i, m;
      if (!variant.FONTS) {
        var FONTS = this.FONTDATA.FONTS;
        var fonts = (variant.fonts || this.FONTDATA.VARIANT.normal.fonts);
        if (!(fonts instanceof Array)) {fonts = [fonts]}
        if (variant.fonts != fonts) {variant.fonts = fonts}
        variant.FONTS = [];
        for (i = 0, m = fonts.length; i < m; i++) {
          if (FONTS[fonts[i]]) {variant.FONTS.push(FONTS[fonts[i]])}
        }
      }
      for (i = 0, m = variant.FONTS.length; i < m; i++) {
        var font = variant.FONTS[i];
        if (typeof(font) === "string") {delete variant.FONTS; this.loadFont(font)}
        if (font[n]) {return font} else {this.findBlock(font,n)}
      }
      return {id:"unknown"};
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
      HUB.RestartAfter(AJAX.Require(this.fontDir+"/"+file));
    },

    createDelimiter: function (code,HW,scale,font) {
      if (!scale) {scale = 1};
      var svg = BBOX.G();
      if (!code) {
        svg.Clean(); delete svg.element;
        svg.w = svg.r = this.TeX.nulldelimiterspace * scale;
        return svg;
      }
      if (!(HW instanceof Array)) {HW = [HW,HW]}
      var hw = HW[1]; HW = HW[0];
      var delim = {alias: code};
      while (delim.alias) {
        code = delim.alias; delim = this.FONTDATA.DELIMITERS[code];
        if (!delim) {delim = {HW: [0,this.FONTDATA.VARIANT[MML.VARIANT.NORMAL]]}}
      }
      if (delim.load) {HUB.RestartAfter(AJAX.Require(this.fontDir+"/fontdata-"+delim.load+".js"))}
      for (var i = 0, m = delim.HW.length; i < m; i++) {
        if (delim.HW[i][0]*scale >= HW-10-SVG.config.blacker || (i == m-1 && !delim.stretch)) {
          if (delim.HW[i][2]) {scale *= delim.HW[i][2]}
          if (delim.HW[i][3]) {code = delim.HW[i][3]}
          return this.createChar(scale,[code,delim.HW[i][1]],font).With({stretched: true});
        }
      }
      if (delim.stretch) {this["extendDelimiter"+delim.dir](svg,hw,delim.stretch,scale,font)}
      return svg;
    },
    createChar: function (scale,data,font) {
      var text = "", variant = {fonts: [data[1]], noRemap:true};
      if (font && font === MML.VARIANT.BOLD) {variant.fonts = [data[1]+"-bold",data[1]]}
      if (typeof(data[1]) !== "string") {variant = data[1]}
      if (data[0] instanceof Array) {
        for (var i = 0, m = data[0].length; i < m; i++) {text += String.fromCharCode(data[0][i])}
      } else {text = String.fromCharCode(data[0])}
      if (data[4]) {scale = scale*data[4]}
      var svg = this.HandleVariant(variant,scale,text);
      if (data[2]) {svg.x = data[2]*1000}
      if (data[3]) {svg.y = data[3]*1000}
      if (data[5]) {svg.h += data[5]*1000}
      if (data[6]) {svg.d += data[6]*1000}
      return svg;
    },
    extendDelimiterV: function (svg,H,delim,scale,font) {
      var top = this.createChar(scale,(delim.top||delim.ext),font);
      var bot = this.createChar(scale,(delim.bot||delim.ext),font);
      var h = top.h + top.d + bot.h + bot.d;
      var y = -top.h; svg.Add(top,0,y); y -= top.d;
      if (delim.mid) {var mid = this.createChar(scale,delim.mid,font); h += mid.h + mid.d}
      if (delim.min && H < h*delim.min) {H = h*delim.min}
      if (H > h) {
        var ext = this.createChar(scale,delim.ext,font);
        var k = (delim.mid ? 2 : 1), eH = (H-h) / k, s = (eH+100) / (ext.h+ext.d);
        while (k-- > 0) {
          var g = SVG.Element("g",{transform:"translate("+ext.y+","+(y-s*ext.h+50+ext.y)+") scale(1,"+s+")"});
          g.appendChild(ext.element.cloneNode(false)); svg.element.appendChild(g); y -= eH;
          if (delim.mid && k) {svg.Add(mid,0,y-mid.h); y -= (mid.h+mid.d)}
        }
      } else if (delim.mid) {
        y += (h - H)/2; svg.Add(mid,0,y-mid.h); y += -(mid.h + mid.d) + (h - H)/2;
      } else {
        y += (h - H);
      }
      svg.Add(bot,0,y-bot.h); svg.Clean();
      svg.scale = scale;
      svg.isMultiChar = true;
    },
    extendDelimiterH: function (svg,W,delim,scale,font) {
      var left  = this.createChar(scale,(delim.left||delim.rep),font);
      var right = this.createChar(scale,(delim.right||delim.rep),font);
      svg.Add(left,-left.l,0);
      var w = (left.r - left.l) + (right.r - right.l), x = left.r - left.l;
      if (delim.mid) {var mid = this.createChar(scale,delim.mid,font); w += mid.w}
      if (delim.min && W < w*delim.min) {W = w*delim.min}
      if (W > w) {
        var rep = this.createChar(scale,delim.rep,font), fuzz = delim.fuzz || 0;
        var k = (delim.mid ? 2 : 1), rW = (W-w) / k, s = (rW+fuzz) / (rep.r-rep.l);
        while (k-- > 0) {
          var g = SVG.Element("g",{transform:"translate("+(x-fuzz/2-s*rep.l+rep.x)+","+rep.y+") scale("+s+",1)"});
          g.appendChild(rep.element.cloneNode(false)); svg.element.appendChild(g); x += rW;
          if (delim.mid && k) {svg.Add(mid,x,0); x += mid.w}
        }
      } else if (delim.mid) {
        x -= (w - W)/2; svg.Add(mid,x,0); x += mid.w - (w - W)/2;
      } else {
        x -= (w - W);
      }
      svg.Add(right,x-right.l,0); svg.Clean();
      svg.scale = scale;
      svg.isMultiChar = true;
    },


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

    //
    //  Units are em/1000 so quad is 1em
    //
    TeX: {
      x_height:         430.554,
      quad:            1000,
      num1:             676.508,
      num2:             393.732,
      num3:             443.73,
      denom1:           685.951,
      denom2:           344.841,
      sup1:             412.892,
      sup2:             362.892,
      sup3:             288.888,
      sub1:             150,
      sub2:             247.217,
      sup_drop:         386.108,
      sub_drop:          50,
      delim1:          2390,
      delim2:          1000,
      axis_height:      250,
      rule_thickness:    60,
      big_op_spacing1:  111.111,
      big_op_spacing2:  166.666,
      big_op_spacing3:  200,
      big_op_spacing4:  600,
      big_op_spacing5:  100,

      scriptspace:         100,
      nulldelimiterspace:  120,
      delimiterfactor:     901,
      delimitershortfall:  100,    // originally 300,

      min_rule_thickness:  1.25,   // in pixels
      min_root_space:      1.5     // in pixels
    },

    BIGDIMEN: 10000000,
    NBSP:   "\u00A0"
  });
  
  var BBOX = SVG.BBOX = MathJax.Object.Subclass({
    type: "g", removeable: true,
    Init: function (def) {
      this.h = this.d = -SVG.BIGDIMEN; this.H = this.D = 0;
      this.w = this.r = 0; this.l = SVG.BIGDIMEN;
      this.x = this.y = 0; this.scale = 1; this.n = 0;
      if (this.type) {this.element = SVG.Element(this.type,def)}
    },
    With: function (def) {return HUB.Insert(this,def)},
    Add: function (svg,dx,dy,forcew,infront) {
      if (dx) {svg.x += dx}; if (dy) {svg.y += dy};
      if (svg.element) {
        if (svg.removeable && svg.element.childNodes.length === 1 && svg.n === 1) {
          var child = svg.element.firstChild;
          if (child.nodeName === "use" || child.nodeName === "rect") {
            svg.element = child; svg.scale = svg.childScale;
            var x = svg.childX, y = svg.childY;
            svg.x += x; svg.y += y;
            svg.h -= y; svg.d += y; svg.H -= y; svg.D +=y;
            svg.w -= x; svg.r -= x; svg.l += x;
            svg.removeable = false;
          }
        }
        if (Math.abs(svg.x) < 1 && Math.abs(svg.y) < 1) {
          svg.remove = svg.removeable;
        } else {
          if (svg.element.nodeName === "g") {
            if (!svg.element.firstChild) {svg.remove = svg.removeable}
              else {svg.element.setAttribute("transform","translate("+Math.floor(svg.x)+","+Math.floor(svg.y)+")")}
          } else if (svg.element.nodeName === "line" ||
                     svg.element.nodeName === "polygon" ||
                     svg.element.nodeName === "path" ||
                     svg.element.nodeName === "a") {
            svg.element.setAttribute("transform","translate("+Math.floor(svg.x)+","+Math.floor(svg.y)+")");
          } else {
            svg.element.setAttribute("x",Math.floor(svg.x/svg.scale));
            svg.element.setAttribute("y",Math.floor(svg.y/svg.scale));
          }
        }
        if (svg.remove) {
          this.n += svg.n;
          while (svg.element.firstChild) {
            if (infront && this.element.firstChild) {
              this.element.insertBefore(svg.element.firstChild,this.element.firstChild);
            } else {
              this.element.appendChild(svg.element.firstChild);
            }
          }
        } else {
          if (infront) {this.element.insertBefore(svg.element,this.element.firstChild)}
                  else {this.element.appendChild(svg.element)}
        }
        delete svg.element;
      }
      if (svg.hasIndent) {this.hasIndent = svg.hasIndent}
      if (svg.d - svg.y > this.d) {this.d = svg.d - svg.y; if (this.d > this.D) {this.D = this.d}}
      if (svg.y + svg.h > this.h) {this.h = svg.y + svg.h; if (this.h > this.H) {this.H = this.h}}
      if (svg.D - svg.y > this.D) {this.D = svg.D - svg.y}
      if (svg.y + svg.H > this.H) {this.H = svg.y + svg.H}
      if (svg.x + svg.l < this.l) {this.l = svg.x + svg.l}
      if (svg.x + svg.r > this.r) {this.r = svg.x + svg.r}
      if (forcew || svg.x + svg.w + (svg.X||0) > this.w) {this.w = svg.x + svg.w + (svg.X||0)}
      this.childScale = svg.scale; this.childX = svg.x; this.childY = svg.y; this.n++;
      return svg;
    },
    Align: function (svg,align,dx,dy) {
      dx = ({left: dx, center: (this.w - svg.w)/2, right: this.w - svg.w - dx})[align] || 0;
      this.Add(svg,dx,dy);
    },
    Clean: function () {
      if (this.h === -SVG.BIGDIMEN) {this.h = this.d = this.l = 0}
      return this;
    }
  });
  
  BBOX.ROW = BBOX.Subclass({
    Init: function () {
      this.SUPER(arguments).Init.call(this);
      this.svg = []; this.sh = this.sd = 0;
    },
    Check: function (data) {
      var svg = data.toSVG(); this.svg.push(svg);
      if (data.SVGcanStretch("Vertical")) {svg.mml = data}
      if (svg.h > this.sh) {this.sh = svg.h}
      if (svg.d > this.sd) {this.sd = svg.d}
    },
    Stretch: function () {
      for (var i = 0, m = this.svg.length; i < m; i++)
      {
        var svg = this.svg[i], mml = svg.mml;
        if (mml) {
          svg = mml.SVGstretchV(this.sh,this.sd);
          mml.SVGdata.HW = this.sh; mml.SVGdata.D = this.sd;
        }
        if (svg.ic) {this.ic = svg.ic} else {delete this.ic}
        this.Add(svg,this.w,0,true);
      }
      delete this.svg;
    }
  });
  
  BBOX.RECT = BBOX.Subclass({
    type: "rect", removeable: false,
    Init: function (h,d,w,def) {
      if (def == null) {def = {stroke:"none"}}
      def.width = Math.floor(w); def.height = Math.floor(h+d);
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = w; this.h = this.H = h+d; this.d = this.D = this.l = 0; this.y = -d;
    }
  });
  
  BBOX.FRAME = BBOX.Subclass({
    type: "rect", removeable: false,
    Init: function (h,d,w,t,dash,color,def) {
      if (def == null) {def = {}}; def.fill = "none";
      def["stroke-width"] = t.toFixed(2).replace(/\.?0+$/,"");
      def.width = Math.floor(w-t); def.height = Math.floor(h+d-t);
      def.transform = "translate("+Math.floor(t/2)+","+Math.floor(-d+t/2)+")";
      if (dash === "dashed")
        {def["stroke-dasharray"] = [Math.floor(6*SVG.em),Math.floor(6*SVG.em)].join(" ")}
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = w; this.h = this.H = h;
      this.d = this.D = d; this.l = 0;
    }
  });
  
  BBOX.HLINE = BBOX.Subclass({
    type: "line", removeable: false,
    Init: function (w,t,dash,color,def) {
      if (def == null) {def = {}}
      if (color && color !== "") {def.stroke = color}
      def["stroke-width"] = t.toFixed(2).replace(/\.?0+$/,"");
      def.x1 = 0; def.y1 = def.y2 = t/2; def.x2 = Math.floor(w);
      if (dash === "dashed") {
        var n = Math.floor(w/(6*t)), m = Math.floor(w/(2*n+1));
        def["stroke-dasharray"] = m+" "+m;
      }
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = w; this.l = 0; this.h = this.H = t; this.d = this.D = 0;
    }
  });

  BBOX.VLINE = BBOX.Subclass({
    type: "line", removeable: false,
    Init: function (h,t,dash,color,def) {
      if (def == null) {def = {}}
      if (color && color !== "") {def.stroke = color}
      def["stroke-width"] = t.toFixed(2).replace(/\.?0+$/,"");
      def.x1 = def.x2 = t/2; def.y1 = 0; def.y2 = Math.floor(h);
      if (dash === "dashed") {
        var n = Math.floor(h/(6*t)), m = Math.floor(h/(2*n+1));
        def["stroke-dasharray"] = m+" "+m;
      }
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = t; this.l = 0; this.h = this.H = h; this.d = this.D = 0;
    }
  });

  BBOX.TEXT = BBOX.Subclass({
    type: "text", removeable: false,
    Init: function (scale,text,def) {
      if (!def) {def = {}}; def.stroke = "none";
      this.SUPER(arguments).Init.call(this,def);
      SVG.addText(this.element,text);
      SVG.textSVG.appendChild(this.element);
      var bbox = this.element.getBBox();
      SVG.textSVG.removeChild(this.element);
      scale *= 1000/SVG.em;
      this.element.setAttribute("transform","scale("+scale+") matrix(1 0 0 -1 0 0)");
      this.w = this.r = bbox.width*scale; this.l = 0;
      this.h = this.H = -bbox.y*scale;
      this.d = this.D = (bbox.height + bbox.y)*scale;
    }
  });
  
  BBOX.G = BBOX;
  
  BBOX.NULL = BBOX.Subclass({
    Init: function () {
      this.SUPER(arguments).Init.apply(this,arguments);
      this.Clean();
    }
  });
  
  var GLYPHS, DEFS; // data for which glyphs are used

  BBOX.GLYPH = BBOX.Subclass({
    type: "path", removeable: false,
    Init: function (scale,id,h,d,w,l,r,p) {
      var def, t = SVG.config.blacker;
      if (!GLYPHS[id]) {
        def = {id:id, "stroke-width":t};
        if (p !== "") {def.d = "M"+p+"Z"}
        this.SUPER(arguments).Init.call(this,def);
        DEFS.appendChild(this.element); GLYPHS[id] = true;
      }
      def = {}; if (scale !== 1) {def.transform = "scale("+scale+")"}
      this.element = SVG.Element("use",def);
      this.element.setAttributeNS(XLINKNS,"href","#"+id);
      this.h = (h+t) * scale; this.d = (d+t) * scale; this.w = (w+t/2) *scale;
      this.l = (l+t/2) * scale; this.r = (r+t/2) * scale;
      this.H = Math.max(0,this.h); this.D = Math.max(0,this.d);
      this.x = this.y = 0; this.scale = scale;
    }
  });
  
  HUB.Register.StartupHook("mml Jax Ready",function () {

    MML = MathJax.ElementJax.mml;

    MML.mbase.Augment({
      SVG: BBOX,
      toSVG: function () {
        this.SVGgetStyles();
	var variant = this.SVGgetVariant();
        var svg = this.SVG();
        svg.scale = this.SVGgetScale(); this.SVGhandleSpace(svg);
	for (var i = 0, m = this.data.length; i < m; i++) {
          if (this.data[i]) {
            var child = svg.Add(this.data[i].toSVG(variant,svg.scale),svg.w,0,true);
            if (child.skew) {svg.skew = child.skew}
          }
        }
        svg.Clean(); var text = this.data.join("");
	if (svg.skew && text.length !== 1) {delete svg.skew}
        if (svg.r > svg.w && text.length === 1 && !variant.noIC)
          {svg.ic = svg.r - svg.w; svg.w = svg.r}
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      
      SVGdataStretched: function (i,HW,D) {
        this.SVGdata = {HW:HW, D:D};
        if (D  != null) {return this.data[i].SVGstretchV(HW,D)}
        if (HW != null) {return this.data[i].SVGstretchH(HW)}
        return this.data[i].toSVG();
      },
      
      SVGsaveData: function (svg) {
        if (!this.SVGdata) {this.SVGdata = {}}
        this.SVGdata.w = svg.w, this.SVGdata.x = svg.x;
        this.SVGdata.h = svg.h, this.SVGdata.d = svg.d;
        if (svg.X != null) {this.SVGdata.X = svg.X}
        if (this["class"]) {svg.removeable = false; SVG.Element(svg.element,{"class":this["class"]})}
        // FIXME:  if an element is split by linebreaking, the ID will be the same on both parts
        // FIXME:  if an element has an id, its zoomed copy will have the same ID
        if (this.id) {svg.removeable = false; SVG.Element(svg.element,{"id":this.id})}
        if (this.href) {
	  var a = SVG.Element("a");
	  a.setAttributeNS(XLINKNS,"href",this.href);
          a.onclick = this.SVGlink;
          SVG.addElement(a,"rect",{width:svg.w, height:svg.h+svg.d, y:-svg.d,
                                   fill:"none", stroke:"none", "pointer-events":"all"});
          if (svg.type === "svg") {
            // for svg element, put <a> inside the main <g> element
            var g = svg.element.firstChild;
            while (g.firstChild) {a.appendChild(g.firstChild)}
            g.appendChild(a);
          } else {
            // if removeable, move contents of <g> to <a>, otherise move element to <a>
            if (svg.removeable && svg.element.nodeName === "g") {
              while (svg.element.firstChild) {a.appendChild(svg.element.firstChild)}
            } else {a.appendChild(svg.element)}
            svg.element = a;
          }
          svg.removeable = false;
        }
        if (SVG.config.addMMLclasses) {
          svg.removeable = false;
          svg.element.setAttribute("className","mjx-svg-"+this.type);
        }
        var style = this.style;
        if (style && svg.element) {
          svg.element.style.cssText = style;
          if (svg.element.style.fontSize) {svg.element.style.fontSize = ""} // handled by scale
          svg.element.style.border = svg.element.style.padding = "";
          if (svg.removeable) {svg.removeable = svg.element.style.cssText === ""}
        }
      },
      //
      //  WebKit currently scrolls to the BOTTOM of an svg element if it contains the
      //  target of the link, so implement link by hand, to the containing span element.
      //  
      SVGlink: function () {
        var href = this.href.animVal;
        if (href.charAt(0) === "#") {
          var target = SVG.hashCheck(document.getElementById(href.substr(1)));
          if (target && target.scrollIntoView) 
            {setTimeout(function () {target.parentNode.scrollIntoView(true)},1)}
        }
        document.location = href;
      },
      
      SVGgetStyles: function () {
        if (this.style) {
          var span = HTML.Element("span");
          span.style.cssText = this.style;
          this.styles = {border:SVG.getBorders(span), padding:SVG.getPadding(span)}
          if (span.style.fontSize) {this.styles.fontSize = span.style.fontSize}
          if (span.style.color) {this.styles.color = span.style.color}
          if (span.style.backgroundColor) {this.styles.background = span.style.backgroundColor}
          if (span.style.fontStyle)  {this.styles.fontStyle = span.style.fontStyle}
          if (span.style.fontWeight) {this.styles.fontWeight = span.style.fontWeight}
          if (span.style.fontFamily) {this.styles.fontFamily = span.style.fontFamily}
          if (this.styles.fontWeight && this.styles.fontWeight.match(/^\d+$/))
            {this.styles.fontWeight = (parseInt(this.styles.fontWeight) > 600 ? "bold" : "normal")}
        }
      },
            
      SVGhandleSpace: function (svg) {
	if (this.useMMLspacing) {
	  if (this.type !== "mo") return;
	  var values = this.getValues("scriptlevel","lspace","rspace");
	  if (values.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace")) {
            var mu = this.SVGgetMu(svg);
	    values.lspace = Math.max(0,SVG.length2em(values.lspace,mu));
	    values.rspace = Math.max(0,SVG.length2em(values.rspace,mu));
	    var core = this, parent = this.Parent();
	    while (parent && parent.isEmbellished() && parent.Core() === core)
	      {core = parent; parent = parent.Parent()}
	    if (values.lspace) {svg.x += values.lspace}
	    if (values.rspace) {svg.X = values.rspace}
	  }
	} else {
	  var space = this.texSpacing();
	  if (space !== "") {svg.x += SVG.length2em(space,this.SVGgetScale())/svg.scale}
        }
      },

      SVGhandleColor: function (svg) {
        var values = this.getValues("mathcolor","color");
        if (this.styles && this.styles.color && !values.color) {values.color = this.styles.color}
        if (values.color && !this.mathcolor) {values.mathcolor = values.color}
        if (values.mathcolor) {
          SVG.Element(svg.element,{fill:values.mathcolor,stroke:values.mathcolor})
          svg.removeable = false;
        }
        var borders = (this.styles||{}).border, padding = (this.styles||{}).padding,
            bleft = ((borders||{}).left||0), pleft = ((padding||{}).left||0), id;
	values.background = (this.mathbackground || this.background ||
                             (this.styles||{}).background || MML.COLOR.TRANSPARENT);
        if (bleft + pleft) {
          //
          //  Make a box and move the contents of svg to it,
          //    then add it back into svg, but offset by the left amount
          //
          var dup = BBOX(); for (id in svg) {if (svg.hasOwnProperty(id)) {dup[id] = svg[id]}}
          dup.x = 0; dup.y = 0;
          svg.element = SVG.Element("g"); svg.removeable = true;
          svg.Add(dup,bleft+pleft,0);
        }
        //
        //  Adjust size by padding and dashed borders (left is taken care of above)
        //
        if (padding) {svg.w += padding.right; svg.h += padding.top; svg.d += padding.bottom}
        if (borders) {svg.w += borders.right; svg.h += borders.top; svg.d += borders.bottom}
        //
        //  Add background color
        //
	if (values.background !== MML.COLOR.TRANSPARENT) {
          if (svg.element.nodeName !== "g" && svg.element.nodeName !== "svg") {
            var g = SVG.Element("g"); g.appendChild(svg.element);
            svg.element = g; svg.removeable = true;
          }
          svg.Add(BBOX.RECT(svg.h,svg.d,svg.w,{fill:values.background,stroke:"none"}),0,0,false,true)
        }
        //
        //  Add borders
        //
        if (borders) {
          var dd = 5; // fuzz factor to avoid anti-alias problems at edges
          var sides = {
            left:  ["V",svg.h+svg.d,-dd,-svg.d],
            right: ["V",svg.h+svg.d,svg.w-borders.right+dd,-svg.d],
            top:   ["H",svg.w,0,svg.h-borders.top+dd],
            bottom:["H",svg.w,0,-svg.d-dd]
          }
          for (id in sides) {if (sides.hasOwnProperty(id)) {
            if (borders[id]) {
              var side = sides[id], box = BBOX[side[0]+"LINE"];
              svg.Add(box(side[1],borders[id],borders[id+"Style"],borders[id+"Color"]),side[2],side[3]);
            }
          }}
        }
      },
      
      SVGhandleVariant: function (variant,scale,text) {
        return SVG.HandleVariant(variant,scale,text);
      },

      SVGgetVariant: function () {
	var values = this.getValues("mathvariant","fontfamily","fontweight","fontstyle");
	var variant = values.mathvariant; if (this.variantForm) {variant = "-TeX-variant"}
        values.hasVariant = this.Get("mathvariant",true);  // null if not explicitly specified
        if (!values.hasVariant) {
          values.family = values.fontfamily;
          values.weight = values.fontweight;
          values.style  = values.fontstyle;
        }
        if (this.styles) {
          if (!values.style  && this.styles.fontStyle)  {values.style = this.styles.fontStyle}
          if (!values.weight && this.styles.fontWeight) {values.weight = this.styles.fontWeight}
          if (!values.family && this.styles.fontFamily) {values.family = this.styles.fontFamily}
        }
        if (values.family && !values.hasVariant) {
	  if (!values.weight && values.mathvariant.match(/bold/)) {values.weight = "bold"}
          if (!values.style && values.mathvariant.match(/italic/)) {values.style = "italic"}
          variant = {forceFamily: true, font: {"font-family":values.family}};
          if (values.style) {variant.font["font-style"] = values.style}
          if (values.weight) {variant.font["font-weight"] = values.weight}
	  return variant;
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
	return SVG.FONTDATA.VARIANT[variant];
      },
      
      SVGgetScale: function () {
	var scale = 1,
            values = this.getValues("mathsize","scriptlevel","fontsize");
        if ((this.styles||{}).fontSize && !values.fontsize) {values.fontsize = this.styles.fontSize}
	if (values.fontsize && !this.mathsize) {values.mathsize = values.fontsize}
	if (values.scriptlevel !== 0) {
	  if (values.scriptlevel > 2) {values.scriptlevel = 2}
	  scale = Math.pow(this.Get("scriptsizemultiplier"),values.scriptlevel);
	  values.scriptminsize = SVG.length2em(this.Get("scriptminsize"))/1000;
	  if (scale < values.scriptminsize) {scale = values.scriptminsize}
	}
	if (this.isToken) {scale *= SVG.length2em(values.mathsize)/1000}
	return scale;
      },
      SVGgetMu: function (svg) {
	var mu = 1, values = this.getValues("scriptlevel","scriptsizemultiplier");
        if (svg.scale && svg.scale !== 1) {mu = 1/svg.scale}
	if (values.scriptlevel !== 0) {
	  if (values.scriptlevel > 2) {values.scriptlevel = 2}
	  mu = Math.sqrt(Math.pow(values.scriptsizemultiplier,values.scriptlevel));
	}
	return mu;
      },

      SVGnotEmpty: function (data) {
	while (data) {
	  if ((data.type !== "mrow" && data.type !== "texatom") ||
	       data.data.length > 1) {return true}
	  data = data.data[0];
	}
	return false;
      },
      
      SVGcanStretch: function (direction) {
	if (this.isEmbellished()) {return this.Core().SVGcanStretch(direction)}
	return false;
      },
      SVGstretchV: function (h,d) {return this.toSVG(h,d)},
      SVGstretchH: function (w) {return this.toSVG(w)},
      
      SVGlineBreaks: function () {return false}
      
    },{
      SVGautoload: function () {
	var file = SVG.autoloadDir+"/"+this.type+".js";
	HUB.RestartAfter(AJAX.Require(file));
      },
      SVGautoloadFile: function (name) {
	var file = SVG.autoloadDir+"/"+name+".js";
	HUB.RestartAfter(AJAX.Require(file));
      }
    });

    MML.chars.Augment({
      toSVG: function (variant,scale,remap,chars) {
        var text = this.data.join("").replace(/[\u2061-\u2064]/g,""); // remove invisibles
        if (remap) {text = remap(text,chars)}
	return this.SVGhandleVariant(variant,scale,text);
      }
    });
    MML.entity.Augment({
      toSVG: function (variant,scale,remap,chars) {
        var text = this.toString().replace(/[\u2061-\u2064]/g,""); // remove invisibles
        if (remap) {text = remap(text,chars)}
	return this.SVGhandleVariant(variant,scale,text);
      }
    });

    MML.mo.Augment({
      toSVG: function (HW,D) {
        this.SVGgetStyles();
        var svg = this.svg = this.SVG(); this.SVGhandleSpace(svg);
        if (this.data.length == 0) {svg.Clean(); this.SVGsaveData(svg); return svg}
        //
        //  Stretch the operator, if that is requested
        //
        if (D != null) {return this.SVGstretchV(HW,D)}
        else if (HW != null) {return this.SVG.strechH(HW)}
        //
        //  Get the variant, and check for operator size
        //
        var scale = this.SVGgetScale(), variant = this.SVGgetVariant();
	var values = this.getValues("largeop","displaystyle");
	if (values.largeop)
	  {variant = SVG.FONTDATA.VARIANT[values.displaystyle ? "-largeOp" : "-smallOp"]}
        //
        //  Get character translation for superscript and accents
        //
        var parent = this.CoreParent(),
            isScript = (parent && parent.isa(MML.msubsup) && this !== parent.data[0]),
            mapchars = (isScript?this.SVGremapChars:null);
        if (this.data.join("").length === 1 && parent && parent.isa(MML.munderover) &&
            this.CoreText(parent.data[parent.base]).length === 1) {
          var over = parent.data[parent.over], under = parent.data[parent.under];
          if (over && this === over.CoreMO() && parent.Get("accent")) {mapchars = SVG.FONTDATA.REMAPACCENT}
          else if (under && this === under.CoreMO() && parent.Get("accentunder")) {mapchars = SVG.FONTDATA.REMAPACCENTUNDER}
        }
        //
        //  Primes must come from another font
        //
        if (isScript && this.data.join("").match(/['`"\u00B4\u2032-\u2037\u2057]/))
          {variant = SVG.FONTDATA.VARIANT["-TeX-variant"]}
        //
        //  Typeset contents
        //
	for (var i = 0, m = this.data.length; i < m; i++) {
          if (this.data[i]) {
            var text = this.data[i].toSVG(variant,scale,this.SVGremap,mapchars), x = svg.w;
            if (x === 0 && -text.l > 10*text.w) {x += -text.l} // initial combining character doesn't combine
            svg.Add(text,x,0,true);
            if (text.skew) {svg.skew = text.skew}
          }
        }
        svg.Clean();
	if (this.data.join("").length !== 1) {delete svg.skew}
        //
        //  Handle large operator centering
        //
	if (values.largeop) {
	  svg.y = (svg.h - svg.d)/2/scale - SVG.TeX.axis_height;
	  if (svg.r > svg.w) {svg.ic = svg.r - svg.w; svg.w = svg.r}
	}
        //
        //  Finish up
        //
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      CoreParent: function () {
        var parent = this;
        while (parent && parent.isEmbellished() &&
               parent.CoreMO() === this && !parent.isa(MML.math))  {parent = parent.Parent()}
        return parent;
      },
      CoreText: function (parent) {
        if (!parent) {return ""}
        if (parent.isEmbellished()) {return parent.CoreMO().data.join("")}
        while (parent.isa(MML.mrow) && parent.data.length === 1 && parent.data[0])
          {parent = parent.data[0]}
        if (!parent.isToken) {return ""} else {return parent.data.join("")}
      },
      SVGremapChars: {
        '*':"\u2217",
        '"':"\u2033",
        "\u00B0":"\u2218",
        "\u00B2":"2",
        "\u00B3":"3",
        "\u00B4":"\u2032",
        "\u00B9":"1"
      },
      SVGremap: function (text,map) {
        text = text.replace(/-/g,"\u2212");
        if (map) {
          text = text.replace(/'/g,"\u2032").replace(/`/g,"\u2035");
          if (text.length === 1) {text = map[text]||text}
        }
        return text;
      },
      SVGcanStretch: function (direction) {
	if (!this.Get("stretchy")) {return false}
	var c = this.data.join("");
	if (c.length > 1) {return false}
        var parent = this.CoreParent();
        if (parent && parent.isa(MML.munderover) && 
            this.CoreText(parent.data[parent.base]).length === 1) {
          var over = parent.data[parent.over], under = parent.data[parent.under];
          if (over && this === over.CoreMO() && parent.Get("accent")) {c = SVG.FONTDATA.REMAPACCENT[c]||c}
          else if (under && this === under.CoreMO() && parent.Get("accentunder")) {c = SVG.FONTDATA.REMAPACCENTUNDER[c]||c}
        }
	c = SVG.FONTDATA.DELIMITERS[c.charCodeAt(0)];
        var can = (c && c.dir == direction.substr(0,1));
        if (!can) {delete this.svg}
        return can;
      },
      SVGstretchV: function (h,d) {
        var svg = this.svg || this.toSVG();
	var values = this.getValues("symmetric","maxsize","minsize");
	var axis = SVG.TeX.axis_height, mu = this.SVGgetMu(svg), H;
	if (values.symmetric) {H = 2*Math.max(h-axis,d+axis)} else {H = h + d}
	values.maxsize = SVG.length2em(values.maxsize,mu,svg.h+svg.d);
	values.minsize = SVG.length2em(values.minsize,mu,svg.h+svg.d);
	H = Math.max(values.minsize,Math.min(values.maxsize,H));
	svg = SVG.createDelimiter(this.data.join("").charCodeAt(0),H,svg.scale);
	if (values.symmetric) {H = (svg.h + svg.d)/2 + axis}
	  else {H = (svg.h + svg.d) * h/(h + d)}
        svg.y = H - svg.h;
	this.SVGhandleSpace(svg);
	this.SVGhandleColor(svg);
        delete this.svg.element;
        this.SVGsaveData(svg);
	return svg;
      },
      SVGstretchH: function (w) {
        var svg = this.svg || this.toSVG(), mu = this.SVGgetMu(svg);
	var values = this.getValues("maxsize","minsize","mathvariant","fontweight");
        // FIXME:  should take style="font-weight:bold" into account as well
	if ((values.fontweight === "bold" || parseInt(values.fontweight) >= 600) &&
            !this.Get("mathvariant",true)) {values.mathvariant = MML.VARIANT.BOLD}
	values.maxsize = SVG.length2em(values.maxsize,mu,svg.w);
	values.minsize = SVG.length2em(values.minsize,mu,svg.w);
	w = Math.max(values.minsize,Math.min(values.maxsize,w));
        svg = SVG.createDelimiter(this.data.join("").charCodeAt(0),w,svg.scale,values.mathvariant);
	this.SVGhandleSpace(svg);
	this.SVGhandleColor(svg);
        delete this.svg.element;
        this.SVGsaveData(svg);
	return svg;
      }
    });

    MML.mtext.Augment({
      toSVG: function () {
        this.SVGgetStyles();
        var svg, text, scale = this.SVGgetScale();
        if (this.Parent().type === "merror") {
	  //  *** FIXME:  Make color, style, scale configurable
          svg = this.SVG(); this.SVGhandleSpace(svg);
          text = BBOX.G(); text.Add(BBOX.TEXT(.9*scale,this.data.join(""),{fill:"#C00"}));
          svg.Add(BBOX.RECT(text.h+100,text.d+100,text.w+200,{fill:"#FF8",stroke:"#C00","stroke-width":50}),0,0);
          svg.Add(text,150,0); svg.H += 150; svg.D += 50;
          svg.Clean();
          this.SVGsaveData(svg);
          return svg;
	} else if (SVG.config.mtextFontInherit) {
          svg = this.SVG(); this.SVGhandleSpace(svg);
          var variant = this.SVGgetVariant(), def = {};
          if (variant.bold)   {def["font-weight"] = "bold"}
          if (variant.italic) {def["font-style"] = "italic"}
          svg.Add(BBOX.TEXT(scale,this.data.join(""),def)); svg.Clean();
          this.SVGhandleColor(svg);
          this.SVGsaveData(svg);
          return svg;
        } else {
          return this.SUPER(arguments).toSVG.call(this);
        }
      }
    });

    MML.ms.Augment({toSVG: MML.mbase.SVGautoload});

    MML.mglyph.Augment({toSVG: MML.mbase.SVGautoload});

    MML.mspace.Augment({
      toSVG: function () {
        this.SVGgetStyles();
	var values = this.getValues("height","depth","width");
	values.mathbackground = this.mathbackground;
	if (this.background && !this.mathbackground) {values.mathbackground = this.background}
        var svg = this.SVG(), mu = this.SVGgetMu(svg);
	svg.h = SVG.length2em(values.height,mu) / svg.scale;
        svg.d = SVG.length2em(values.depth,mu)  / svg.scale;
	svg.w = svg.r = SVG.length2em(values.width,mu) / svg.scale;
        if (svg.w < 0) {svg.x = svg.w; svg.w = svg.r = 0}
        if (svg.h < -svg.d) {svg.d = -svg.h}
        svg.l = 0; svg.Clean();
        this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
        return svg;
      }
    });

    MML.mphantom.Augment({
      toSVG: function (HW,D) {
        this.SVGgetStyles();
        var svg = this.SVG();
	if (this.data[0] != null) {
          this.SVGhandleSpace(svg); svg.Add(this.SVGdataStretched(0,HW,D)); svg.Clean();
          while (svg.element.firstChild) {svg.element.removeChild(svg.element.firstChild)}
	}
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
        if (svg.removeable && !svg.element.firstChild) {delete svg.element}
	return svg;
      }
    });

    MML.mpadded.Augment({
      toSVG: function (HW,D) {
        this.SVGgetStyles();
        var svg = this.SVG();
	if (this.data[0] != null) {
          this.SVGhandleSpace(svg);
          var pad = this.SVGdataStretched(0,HW,D), mu = this.SVGgetMu(svg);
	  var values = this.getValues("height","depth","width","lspace","voffset"), x = 0, y = 0;
	  if (values.lspace)  {x = this.SVGlength2em(pad,values.lspace,mu)}
	  if (values.voffset) {y = this.SVGlength2em(pad,values.voffset,mu)}
          var h = pad.h, d = pad.d, w = pad.w; // these can change durring the Add() 
          svg.Add(pad,x,y); svg.Clean();
          svg.h = h; svg.d = d; svg.w = w; svg.removeable = false;
	  if (values.height !== "") {svg.h = this.SVGlength2em(svg,values.height,mu,"h",0)}
	  if (values.depth  !== "") {svg.d = this.SVGlength2em(svg,values.depth,mu,"d",0)}
	  if (values.width  !== "") {svg.w = this.SVGlength2em(svg,values.width,mu,"w",0)}
	  if (svg.h > svg.H) {svg.H = svg.h}; if (svg.d > svg.D) {svg.D = svg.d}
	}
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      SVGlength2em: function (svg,length,mu,d,m) {
	if (m == null) {m = -SVG.BIGDIMEN}
	var match = String(length).match(/width|height|depth/);
	var size = (match ? svg[match[0].charAt(0)] : (d ? svg[d] : 0));
	var v = SVG.length2em(length,mu,size);
	if (d && String(length).match(/^\s*[-+]/))
	  {return Math.max(m,svg[d]+v)} else {return v}
      }
    });

    MML.mrow.Augment({
      SVG: BBOX.ROW,
      toSVG: function () {
        this.SVGgetStyles();
	var svg = this.SVG();
        this.SVGhandleSpace(svg);
	for (var i = 0, m = this.data.length; i < m; i++)
          {if (this.data[i]) {svg.Check(this.data[i])}}
        svg.Stretch(); svg.Clean();
        if (this.SVGlineBreaks(svg)) {svg = this.SVGmultiline(svg)}
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      SVGlineBreaks: function (svg) {
        if (!this.parent.linebreakContainer) {return false}
        return (SVG.config.linebreaks.automatic &&
                svg.w > SVG.linebreakWidth) || this.hasNewline();
      },
      SVGmultiline: function (span) {MML.mbase.SVGautoloadFile("multiline")},
      SVGstretchH: function (w) {
	var svg = this.data[this.core].SVGstretchH(w);
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      SVGstretchV: function (h,d) {
	var svg = this.data[this.core].SVGstretchV(h,d);
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      }
    });

    MML.mstyle.Augment({
      toSVG: function () {
        this.SVGgetStyles();
        var svg = this.SVG();
	if (this.data[0] != null) {
          this.SVGhandleSpace(svg);
          var math = svg.Add(this.data[0].toSVG()); svg.Clean();
          if (math.ic) {svg.ic = math.ic}
	  this.SVGhandleColor(svg);
	}
        this.SVGsaveData(svg);
	return svg;
      },
      SVGstretchH: function (w) {
	return (this.data[0] != null ? this.data[0].SVGstretchH(w) : BBOX.NULL());
      },
      SVGstretchV: function (h,d) {
	return (this.data[0] != null ? this.data[0].SVGstretchV(h,d) : BBOX.NULL());
      }
    });

    MML.mfrac.Augment({
      toSVG: function () {
        this.SVGgetStyles();
        var svg = this.SVG(); this.SVGhandleSpace(svg);
        var num = this.data[0].toSVG(), den = this.data[1].toSVG();
	var values = this.getValues("displaystyle","linethickness","numalign","denomalign","bevelled");
	var scale = svg.scale = this.SVGgetScale(), isDisplay = values.displaystyle;
	var a = SVG.TeX.axis_height * scale;
	if (values.bevelled) {
	  var delta = (isDisplay ? 400 : 150);
	  var H = Math.max(num.h+num.d,den.h+den.d)+2*delta;
          var bevel = SVG.createDelimiter(0x2F,H);
          svg.Add(num,0,(num.d-num.h)/2+a+delta);
          svg.Add(bevel,num.w-delta/2,(bevel.d-bevel.h)/2+a);
	  svg.Add(den,num.w+bevel.w-delta,(den.d-den.h)/2+a-delta);
	} else {
	  var W = Math.max(num.w,den.w);
	  var t = SVG.thickness2em(values.linethickness,scale), p,q, u,v;
	  var mt = SVG.TeX.min_rule_thickness/SVG.em * 1000;
	  if (isDisplay) {u = SVG.TeX.num1; v = SVG.TeX.denom1}
	    else {u = (t === 0 ? SVG.TeX.num3 : SVG.TeX.num2); v = SVG.TeX.denom2}
	  u *= scale; v *= scale;
	  if (t === 0) {// \atop
	    p = Math.max((isDisplay ? 7 : 3) * SVG.TeX.rule_thickness, 2*mt); // force to at least 2 px
	    q = (u - num.d) - (den.h - v);
	    if (q < p) {u += (p - q)/2; v += (p - q)/2}
            svg.w = W; t = 0;
	  } else {// \over
	    p = Math.max((isDisplay ? 2 : 0) * mt + t, t/2 + 1.5*mt);  // force to be at least 1.5px
	    q = (u - num.d) - (a + t/2); if (q < p) {u += p - q}
	    q = (a - t/2) - (den.h - v); if (q < p) {v += p - q}
	    svg.Add(BBOX.RECT(t/2,t/2,W+2*t),0,a);
	  }
          svg.Align(num,values.numalign,t,u);
          svg.Align(den,values.denomalign,t,-v);
	}
        svg.Clean();
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      SVGcanStretch: function (direction) {return false},
      SVGhandleSpace: function (svg) {
	if (!this.texWithDelims) {
	  svg.x = (this.useMMLspacing ? 0 : SVG.length2em(this.texSpacing()||0)) + 120;
          svg.X = 120;
	}
      }
    });

    MML.msqrt.Augment({
      toSVG: function () {
        this.SVGgetStyles();
        var svg = this.SVG(); this.SVGhandleSpace(svg);
	var base = this.data[0].toSVG(), rule, surd;
	var scale = this.SVGgetScale();
	var t = SVG.TeX.rule_thickness * scale, p,q, H, x = 0;
	if (this.Get("displaystyle")) {p = SVG.TeX.x_height * scale} else {p = t}
	q = Math.max(t + p/4,1000*SVG.TeX.min_root_space/SVG.em);
        H = base.h + base.d + q + t;
	surd = SVG.createDelimiter(0x221A,H,scale);
	if (surd.h + surd.d > H) {q = ((surd.h+surd.d) - (H-t)) / 2}
        rule = BBOX.RECT(t,0,base.w);
	H = base.h + q + t;
	x = this.SVGaddRoot(svg,surd,x,surd.h+surd.d-H,scale);
        svg.Add(surd,x,H-surd.h);
        svg.Add(rule,x+surd.w,H-rule.h);
	svg.Add(base,x+surd.w,0);
        svg.Clean();
        svg.h += t; svg.H += t;
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      },
      SVGaddRoot: function (svg,surd,x,d,scale) {return x}
    });

    MML.mroot.Augment({
      toSVG: MML.msqrt.prototype.toSVG,
      SVGaddRoot: function (svg,surd,x,d,scale) {
        var dx = (surd.isMultiChar ? .55 : .65) * surd.w;
	if (this.data[1]) {
          var root = this.data[1].toSVG(); root.x = 0;
          var h = this.SVGrootHeight(surd.h+surd.d,scale,root)-d;
          var w = Math.min(root.w,root.r); // remove extra right-hand padding, if any
          x = Math.max(w,dx);
          svg.Add(root,x-w,h);
        } else {dx = x}
	return x - dx;
      },
      SVGrootHeight: function (d,scale,root) {
	return .45*(d-900*scale) + 600*scale + Math.max(0,root.d-75);
      }
    });

    MML.mfenced.Augment({
      SVG: BBOX.ROW,
      toSVG: function () {
        this.SVGgetStyles();
        var svg = this.SVG();
	this.SVGhandleSpace(svg);
	if (this.data.open) {svg.Check(this.data.open)}
	if (this.data[0] != null) {svg.Check(this.data[0])}
	for (var i = 1, m = this.data.length; i < m; i++) {
	  if (this.data[i]) {
	    if (this.data["sep"+i]) {svg.Check(this.data["sep"+i])}
	    svg.Check(this.data[i]);
	  }
	}
	if (this.data.close) {svg.Check(this.data.close)}
        svg.Stretch(); svg.Clean();
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      }
    });

    MML.menclose.Augment({toSVG: MML.mbase.SVGautoload});
    MML.maction.Augment({toSVG: MML.mbase.SVGautoload});

    MML.semantics.Augment({
      toSVG: function () {
        this.SVGgetStyles();
        var svg = this.SVG();
	if (this.data[0] != null) {
          this.SVGhandleSpace(svg);
	  svg.Add(this.data[0].toSVG()); svg.Clean();
	} else {svg.Clean()}
        this.SVGsaveData(svg);
	return svg;
      },
      SVGstretchH: function (w) {
	return (this.data[0] != null ? this.data[0].SVGstretchH(w) : BBOX.NULL());
      },
      SVGstretchV: function (h,d) {
	return (this.data[0] != null ? this.data[0].SVGstretchV(h,d) : BBOX.NULL());
      }
    });

    MML.munderover.Augment({
      toSVG: function (HW,D) {
        this.SVGgetStyles();
	var values = this.getValues("displaystyle","accent","accentunder","align");
	if (!values.displaystyle && this.data[this.base] != null &&
	    this.data[this.base].CoreMO().Get("movablelimits"))
	      {return MML.msubsup.prototype.toSVG.call(this)}
        var svg = this.SVG();
        this.SVGhandleSpace(svg);
        var scale = svg.scale = this.SVGgetScale();
	var boxes = [], stretch = [], box, i, m, W = -SVG.BIGDIMEN, WW = W;
	for (i = 0, m = this.data.length; i < m; i++) {
	  if (this.data[i] != null) {
	    if (i == this.base) {
              boxes[i] = this.SVGdataStretched(i,HW,D);
	      stretch[i] = (D != null || HW == null) && this.data[i].SVGcanStretch("Horizontal");
	    } else {
              boxes[i] = this.data[i].toSVG();
	      stretch[i] = this.data[i].SVGcanStretch("Horizontal");
	    }
	    if (boxes[i].w > WW) {WW = boxes[i].w}
	    if (!stretch[i] && WW > W) {W = WW}
	  }
	}
	if (D == null && HW != null) {W = HW} else if (W == -SVG.BIGDIMEN) {W = WW}
        for (i = WW = 0, m = this.data.length; i < m; i++) {if (this.data[i]) {
          if (stretch[i]) {boxes[i] = this.data[i].SVGstretchH(W)}
          if (boxes[i].w > WW) {WW = boxes[i].w}
        }}
        var t = SVG.TeX.rule_thickness;
	var base = boxes[this.base] || {w:0, h:0, d:0, H:0, D:0, l:0, r:0, scale:scale};
	var x, y, z1, z2, z3, dw, k, delta = 0;
        if (base.ic) {delta = 1.3*base.ic + .05} // adjust faked IC to be more in line with expeted results
	for (i = 0, m = this.data.length; i < m; i++) {
	  if (this.data[i] != null) {
	    box = boxes[i];
	    z3 = SVG.TeX.big_op_spacing5 * scale;
	    var accent = (i != this.base && values[this.ACCENTS[i]]);
	    if (accent && box.w <= 1) {
              box.x = -box.l;
              boxes[i] = BBOX.G().With({removeable: false});
              boxes[i].Add(box); boxes[i].Clean();
              boxes[i].w = -box.l; box = boxes[i];
            }
	    dw = {left:0, center:(WW-box.w)/2, right:WW-box.w}[values.align];
	    x = dw; y = 0;
	    if (i == this.over) {
	      if (accent) {
		k = t * scale; z3 = 0;
		if (base.skew) {x += base.skew}
	      } else {
		z1 = SVG.TeX.big_op_spacing1 * scale;
		z2 = SVG.TeX.big_op_spacing3 * scale;
		k = Math.max(z1,z2-Math.max(0,box.d));
	      }
	      k = Math.max(k,1500/SVG.em);
	      x += delta/2; y = base.h + box.d + k;
	      box.h += z3; if (box.h > box.H) {box.H = box.h}
	    } else if (i == this.under) {
	      if (accent) {
		k = 3*t * scale; z3 = 0;
	      } else {
		z1 = SVG.TeX.big_op_spacing2 * scale;
		z2 = SVG.TeX.big_op_spacing4 * scale;
		k = Math.max(z1,z2-box.h);
	      }
	      k = Math.max(k,1500/SVG.em);
	      x -= delta/2; y = -(base.d + box.h + k);
	      box.d += z3; if (box.d > box.D) {box.D = box.d}
	    }
	    svg.Add(box,x,y);
	  }
	}
        svg.Clean();
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      }
    });

    MML.msubsup.Augment({
      toSVG: function (HW,D) {
        this.SVGgetStyles();
        var svg = this.SVG();
        this.SVGhandleSpace(svg);
	var scale = svg.scale = this.SVGgetScale(), mu = this.SVGgetMu(svg);
        var base = svg.Add(this.SVGdataStretched(this.base,HW,D));
	var sscale = (this.data[this.sup] || this.data[this.sub] || this).SVGgetScale();
	var x_height = SVG.TeX.x_height * scale, s = SVG.TeX.scriptspace * scale;
	var sup, sub;
	if (this.SVGnotEmpty(this.data[this.sup])) {
	  sup = this.data[this.sup].toSVG();
	  sup.w += s; sup.r = Math.max(sup.w,sup.r);
	}
	if (this.SVGnotEmpty(this.data[this.sub])) {
	  sub = this.data[this.sub].toSVG();
	  sub.w += s; sub.r = Math.max(sub.w,sub.r);
	}
	var q = SVG.TeX.sup_drop * sscale, r = SVG.TeX.sub_drop * sscale;
	var u = base.h+(base.y||0) - q, v = base.d-(base.y||0) + r, delta = 0, p;
	if (base.ic) {
          base.w -= base.ic;       // remove IC (added by mo and mi)
          delta = 1.3*base.ic+.05; // adjust faked IC to be more in line with expeted results
        }
	if (this.data[this.base] &&
	   (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
	  if (this.data[this.base].data.join("").length === 1 && base.scale === 1 &&
	      !base.stretched && !this.data[this.base].Get("largeop")) {u = v = 0}
	}
	var min = this.getValues("subscriptshift","superscriptshift");
	min.subscriptshift   = (min.subscriptshift === ""   ? 0 : SVG.length2em(min.subscriptshift,mu));
	min.superscriptshift = (min.superscriptshift === "" ? 0 : SVG.length2em(min.superscriptshift,mu));
	if (!sup) {
	  if (sub) {
	    v = Math.max(v,SVG.TeX.sub1*scale,sub.h-(4/5)*x_height,min.subscriptshift);
            svg.Add(sub,base.w,-v); this.data[this.sub].SVGdata.dy = -v;
	  }
	} else {
	  if (!sub) {
	    values = this.getValues("displaystyle","texprimestyle");
	    p = SVG.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
	    u = Math.max(u,p*scale,sup.d+(1/4)*x_height,min.superscriptshift);
            svg.Add(sup,base.w+delta,u);
            this.data[this.sup].SVGdata.dx = delta; 
            this.data[this.sup].SVGdata.dy = u;
	  } else {
	    v = Math.max(v,SVG.TeX.sub2*scale);
	    var t = SVG.TeX.rule_thickness * scale;
	    if ((u - sup.d) - (sub.h - v) < 3*t) {
	      v = 3*t - u + sup.d + sub.h;
	      q = (4/5)*x_height - (u - sup.d);
	      if (q > 0) {u += q; v -= q}
	    }
            svg.Add(sup,base.w+delta,Math.max(u,min.superscriptshift));
	    svg.Add(sub,base.w,-Math.max(v,min.subscriptshift));
            this.data[this.sup].SVGdata.dx = delta; 
            this.data[this.sup].SVGdata.dy = Math.max(u,min.superscriptshift);
            this.data[this.sub].SVGdata.dy = -Math.max(v,min.subscriptshift);
	  }
	}
        svg.Clean();
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      }
    });

    MML.mmultiscripts.Augment({toSVG: MML.mbase.SVGautoload});
    MML.mtable.Augment({toSVG: MML.mbase.SVGautoload});
    MML["annotation-xml"].Augment({toSVG: MML.mbase.SVGautoload});

    MML.math.Augment({
      SVG: BBOX.Subclass({type:"svg", removeable: false}),
      toSVG: function (span,div) {
        if (this.data[0]) {
          this.SVGgetStyles();
	  MML.mbase.prototype.displayAlign = HUB.config.displayAlign;
	  MML.mbase.prototype.displayIndent = HUB.config.displayIndent;
          //
          //  Put content in a <g> with defaults and matrix that flips y axis.
          //  Put that in an <svg> with xlink defined.
          //
          var box = BBOX.G({
            stroke:"black", fill:"black", "stroke-thickness":0,
            transform: "matrix(1 0 0 -1 0 0)"
          }).With({removeable: false});
          box.Add(this.data[0].toSVG(),0,0,true); box.Clean();
          this.SVGhandleColor(box);
          var svg = this.SVG(); svg.element.setAttribute("xmlns:xlink",XLINKNS);
          svg.Add(box); svg.Clean();
          this.SVGsaveData(svg);
          //
          //  Style the <svg> to get the right size and placement
          //
          var l = Math.max(-svg.l,0), r = Math.max(svg.r-svg.w,0);
          var style = svg.element.style;
          style.width = SVG.Ex(l+svg.w+r);
          style.height = SVG.Ex(svg.H+svg.D);
          style.verticalAlign = SVG.Ex(-svg.D-2*SVG.em); // remove 2 extra pixels added below
          style.marginLeft = SVG.Ex(-l); style.marginRight = SVG.Ex(-r);
          svg.element.setAttribute("viewBox",(-l)+" "+(-svg.H)+" "+(l+svg.w+r)+" "+(svg.H+svg.D));
          svg.element.style.margin="1px 0px"; // 1px above and below to prevent lines from touching
          //
          //  If there is extra height or depth, hide that
          //
          if (svg.H > svg.h || svg.D > svg.d) {
            var frame = HTML.Element(
              "span",{style: {display:"inline-block", "white-space":"nowrap", padding:"1px 0px"}, isMathJax:true},[[
              "span",{style: {display:"inline-block", position:"relative", isMathJax:true,
                              width:SVG.Ex(svg.w), height:SVG.Ex(svg.h+svg.d),
                              "vertical-align":SVG.Ex(-svg.d)}}]]);
            frame.firstChild.appendChild(svg.element); svg.element = frame;
            style.verticalAlign = ""; style.position = "absolute";
            style.bottom = SVG.Ex(svg.d-svg.D); style.left = 0;
          }
          //
          //  Add it to the MathJax span
          //
          span.appendChild(svg.element); svg.element = null;
          //
          //  Handle indentalign and indentshift for single-line displays
          //
          if (!this.isMultiline && this.Get("display") === "block") {
            var values = this.getValues("indentalignfirst","indentshiftfirst","indentalign","indentshift");
            if (values.indentalignfirst !== MML.INDENTALIGN.INDENTALIGN) {values.indentalign = values.indentalignfirst}
            if (values.indentalign === MML.INDENTALIGN.AUTO) {values.indentalign = this.displayAlign}
            div.style.textAlign = values.indentalign;
            if (values.indentshiftfirst !== MML.INDENTSHIFT.INDENTSHIFT) {values.indentshift = values.indentshiftfirst}
            if (values.indentshift === "auto") {values.indentshift = this.displayIndent}
            if (values.indentshift && values.indentalign !== MML.INDENTALIGN.CENTER && !svg.hasIndent) {
              span.style[{left:"marginLeft",right:"marginRight"}[values.indentalign]] =
                SVG.Ex(SVG.length2em(values.indentshift));
	    }
          }
        }
	return span;
      }
    });

    MML.TeXAtom.Augment({
      toSVG: function () {
        this.SVGgetStyles();
        var svg = this.SVG();
        this.SVGhandleSpace(svg);
	if (this.data[0] != null) {
          var box = this.data[0].toSVG(), y = 0;
          if (this.texClass === MML.TEXCLASS.VCENTER) {
	    // FIXME: should the axis height be scaled?
	    y = SVG.TeX.axis_height - (box.h+box.d)/2 + box.d;
	  }
          svg.Add(box,0,y);
          svg.ic = box.ic;
	}
	this.SVGhandleColor(svg);
        this.SVGsaveData(svg);
	return svg;
      }
    });

    //
    //  Loading isn't complete until the element jax is modified,
    //  but can't call loadComplete within the callback for "mml Jax Ready"
    //  (it would call SVG's Require routine, asking for the mml jax again)
    //  so wait until after the mml jax has finished processing.
    //  
    //  We also need to wait for the onload handler to run, since the loadComplete
    //  will call Config and Startup, which need to modify the body.
    //
    HUB.Register.StartupHook("onLoad",function () {
      setTimeout(MathJax.Callback(["loadComplete",SVG,"jax.js"]),0);
    });
  });

  HUB.Browser.Select({
    Opera: function (browser) {
      SVG.Augment({
        operaZoomRefresh: true          // Opera needs a kick to redraw zoomed equations
      });
    }
  });
    
  HUB.Register.StartupHook("End Cookie", function () {
    if (HUB.config.menuSettings.zoom !== "None")
      {AJAX.Require("[MathJax]/extensions/MathZoom.js")}
  });
  
  if (!document.createElementNS) {
    //
    //  Try to handle SVG in IE8 and below, but fail
    //  (but don't crash on loading the file, so no delay for loadComplete)
    //
    if (!document.namespaces.svg) {document.namespaces.add("svg",SVGNS)}
    SVG.Augment({
      Element: function (type,def) {
        var obj = (typeof(type) === "string" ? document.createElement("svg:"+type) : type);
        obj.isMathJax = true;
        if (def) {for (var id in def) {if (def.hasOwnProperty(id)) {obj.setAttribute(id,def[id].toString())}}}
        return obj;
      }
    });
  }
  
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.SVG);
