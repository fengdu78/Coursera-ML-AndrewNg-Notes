/*************************************************************
 *
 *  MathJax/jax/output/NativeMML/jax.js
 *
 *  Implements the NativeMML OutputJax that displays mathematics
 *  using a browser's native MathML capabilities (if any).
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

(function (nMML,HUB,AJAX,HTML) {
  var MML, isMSIE = HUB.Browser.isMSIE;
  
  var EVENT, TOUCH, HOVER, ZOOM; // filled in later

  HUB.Register.StartupHook("MathZoom Ready",function () {ZOOM = MathJax.Extension.MathZoom});
  
  nMML.Augment({
    //
    //  User can configure styles
    //
    config: {
      styles: {
        ".MathJax_MathML": {
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
        
        "span.MathJax_MathML": {
          display: "inline"
        },
        
        "div.MathJax_MathML": {
          display: "block"
        },
        
        ".MathJax_mmlExBox": {
          display:"block", overflow:"hidden",
          height:"1px", width:"60ex",
          padding:0, border: 0, margin: 0
        }
      }
    },
    settings: HUB.config.menuSettings,
    
    Config: function () {
      this.SUPER(arguments).Config.call(this);
      if (this.settings.scale) {this.config.scale = this.settings.scale}
      //
      //  Insert styling to take account of displayAlign and displayIndent
      //
      if (HUB.config.displayAlign !== "center") {
        var align = HUB.config.displayAlign, indent = HUB.config.displayIndent;
        var def = {"text-align": align+"!important"}; def["margin-"+align] = indent+"!important";
        MathJax.Hub.Insert(this.config.styles,{
          "div.MathJax_MathML": def,
          "div.MathJax_MathML math": {"text-align": align},
          "div.MathJax_MathContainer > span": {"text-align": align+"!important"}
        });
      }
      if (!this.require) {this.require = []}
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

      if (!isMSIE) {
        // Used in preTranslate to get scaling factors
        this.EmExSpan = HTML.Element("span",
          {style:{position:"absolute","font-size-adjust":"none"}},
          [
            ["div",{className:"MathJax_mmlExBox"}],
            ["span",{className:"MathJax_MathML"}]
          ]
        );
        MML.math(MML.mspace().With({width:"60ex"})).toNativeMML(this.EmExSpan.lastChild);
      }

      //  Set up styles
      return AJAX.Styles(this.config.styles);
    },
    //
    //  Set up MathPlayer for IE on the first time through.
    //
    InitializeMML: function () {
      this.initialized = true;
      if (isMSIE) {
        try {
          //
          //  Insert data needed to use MathPlayer for MathML output
          //
          if (!HUB.Browser.mpNamespace) {
            var mathplayer = document.createElement("object");
            mathplayer.id = "mathplayer"; mathplayer.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987";
            document.getElementsByTagName("head")[0].appendChild(mathplayer);
            document.namespaces.add("m","http://www.w3.org/1998/Math/MathML");
            HUB.Browser.mpNamespace = true;
          }
          if (!HUB.Browser.mpImported) {
            document.namespaces.m.doImport("#mathplayer");
            HUB.Browser.mpImported = true;
          }
        } catch (err) {
          //
          //  If that fails, give an alert about security settings
          //
          alert("MathJax was not able to set up MathPlayer.\n\n"+
                "If MathPlayer is not installed, you need to install it first.\n"+
                "Otherwise, your security settings may be preventing ActiveX     \n"+
                "controls from running.  Use the Internet Options item under\n"+
                "the Tools menu and select the Security tab, then press the\n"+
                "Custom Level button. Check that the settings for\n"+
                "'Run ActiveX Controls', and 'Binary and script behaviors'\n"+
                "are enabled.\n\n"+
                "Currently you will see error messages rather than\n"+
                "typeset mathematics.");
        }
      } else {
        //
        //  Get the default sizes (need styles in place to do this)
        //
        document.body.appendChild(this.EmExSpan);
        this.defaultEx  = this.EmExSpan.firstChild.offsetWidth/60;
        this.defaultMEx = this.EmExSpan.lastChild.offsetWidth/60;
        document.body.removeChild(this.EmExSpan);
      }
    },
    
    preTranslate: function (state) {
      var scripts = state.jax[this.id], i, m = scripts.length,
          script, prev, span, test, math, jax, ex, mex, scale;
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
	if (!this.initialized) {this.InitializeMML()}
        //
        //  Remove any existing output
        //
        prev = script.previousSibling;
        if (prev && prev.className === "MathJax_MathML") {prev.parentNode.removeChild(prev)}
        //
        //  Add the MathJax span
        //
        jax = script.MathJax.elementJax; if (!jax) continue;
        math = jax.root; jax.NativeMML = {};
        var type = (math.Get("display") === "block" ? "div" : "span");
	span = HTML.Element(type,{
	  className: "MathJax_MathML", id:jax.inputID+"-Frame"
	},[["span",{
            className:"MathJax_MathContainer", isMathJax: true, jaxID:this.id,
            style:{position:"relative", display:"inline-block", "white-space":"nowrap"}
          }, [["span",{isMathJax:true, style:{display:"inline-block"}}]] // for Firefox hover and zoom
	]]);
        script.parentNode.insertBefore(span,script);
        //
        //  Add the test span for determining scales
        //
        if (!isMSIE) {script.parentNode.insertBefore(this.EmExSpan.cloneNode(true),script)}
      }
      //
      //  Determine the scaling factors for each script
      //  (this only requires one reflow rather than a reflow for each equation)
      //
      for (i = 0; i < m; i++) {
        script = scripts[i]; if (!script.parentNode) continue;
        jax = script.MathJax.elementJax; if (!jax) continue;
        if (!isMSIE) {
          test = script.previousSibling; span = test.previousSibling;
          ex = test.firstChild.offsetWidth/60;
          mex = test.lastChild.offsetWidth/60;
          if (ex === 0 || ex === "NaN") {ex = this.defaultEx; mex = this.defaultMEx}
          scale = (mex > 1 ? ex/mex : 1) * this.config.scale;
          scale = Math.floor(Math.max(this.config.minScaleAdjust/100,scale));
        } else {scale = 100}
        jax.NativeMML.fontSize = scale+"%";
      }
      //
      //  Remove the test spans used for determining scales
      //
      if (!isMSIE) {
        for (i = 0; i < m; i++) {
          script = scripts[i]; if (!script.parentNode || !script.MathJax.elementJax) continue;
          test = scripts[i].previousSibling;
          test.parentNode.removeChild(test);
        }
      }
    },

    //
    //  Add a SPAN to use as a container, and render the math into it
    //  
    Translate: function (script) {
      if (!script.parentNode) return;
      //
      //  Get the jax and the container and set the size
      //
      var jax = script.MathJax.elementJax, math = jax.root;
      var span = document.getElementById(jax.inputID+"-Frame"),
	  container = span.firstChild, mspan = container.firstChild;
      span.style.fontSize = jax.NativeMML.fontSize;
      //
      //  Convert to MathML (if restarted, remove any partial math)
      //
      try {math.toNativeMML(mspan)} catch (err) {
        if (err.restart) {while (mspan.firstChild) {mspan.removeChild(mspan.firstChild)}}
        throw err;
      }
      //
      //  Add event handlers
      //
      if (isMSIE) {
        if (container.addEventListener) {
          for (var id in this.MSIE9events) {if (this.MSIE9events.hasOwnProperty(id)) {
            container.addEventListener(id,this.MSIE9event,true);
          }}
        } else {
          var config = (this.config.showMathMenuMSIE != null ? this : HUB).config;
          if (config.showMathMenuMSIE && !this.settings.mpContext && !this.settings.mpMouse)
                {this.MSIEoverlay(container)} else
                {container.style.position = ""; mspan.firstChild.onmousedown = this.MSIEaltMenu}
        }
      } else {
        container.oncontextmenu = EVENT.Menu;
        container.onmouseover   = EVENT.Mouseover;
        container.onmouseout    = EVENT.Mouseout;
        container.onmousedown   = EVENT.Mousedown;
        container.onclick       = EVENT.Click;
        container.ondblclick    = EVENT.DblClick;
	if (HUB.Browser.noContextMenu) {
	  container.ontouchstart = TOUCH.start;
	  container.ontouchend   = TOUCH.end;
	}
      }
    },

    postTranslate: function (state) {
      if (this.forceReflow) {
        //  Firefox messes up some mtable's when they are dynamically created
        //  but gets them right on a reflow, so force reflow by toggling a stylesheet
        var sheet = (document.styleSheets||[])[0]||{};
        sheet.disabled = true; sheet.disabled = false;
      }
    },
    
    //
    //  Remove MathML preceeding the script
    //
    Remove: function (jax) {
      var span = jax.SourceElement(); if (!span) return;
      span = span.previousSibling; if (!span) return;
      if (span.className.match(/MathJax_MathML/)) {span.parentNode.removeChild(span)}
    },
    //
    //  The namespace to use for MML
    //
    MMLnamespace: "http://www.w3.org/1998/Math/MathML",

    //
    //  For MSIE, we must overlay the MathPlayer object to trap the events
    //  (since they can't be cancelled when the events are on the <math> tag
    //  itself).  The events we DON'T want are transferred to the math element,
    //  and the others are handled directly.
    //
    MSIEoverlay: function (span) {
      var math = span.firstChild;
      if (math.nodeName.toLowerCase() === "span") {math = math.firstChild}
      var bbox = this.getHoverBBox(null,math,{});
      HTML.addElement(span,"span",{
        style:{display:"inline-block", width:0, height:0, position:"relative"}
      },[["span",{isMathJax: true, className: "MathJax_MathPlayer_Overlay",
        style:{
          display:"inline-block", position:"absolute",
          left:HOVER.Px(-bbox.w), top:HOVER.Px(-bbox.h-(bbox.y||0)-1),
          width:HOVER.Px(bbox.w), height:HOVER.Px(bbox.h+bbox.d), cursor:"pointer",
          "background-color":"white", filter:"alpha(opacity=0)"
        }
      }]]);
      HUB.Insert(span,{
        msieMath: math,
        onmousedown: this.MSIEevent, oncontextmenu: this.MSIEevent, onclick: this.MSIEevent,
        onmouseup: this.MSIEevent, onmousemove: this.MSIEevent, ondblclick: this.MSIEevent,
        onmouseover: this.MSIEevent, onmouseout: this.MSIEevent
      });
    },
    MSIEevents: {
      mousedown:"Mousedown", contextmenu:"ContextMenu", click:"Click",
      mouseup:"Mouseup", mousemove:"Mousemove", dblclick: "DblClick",
      mouseover:"Mouseover", mouseout:"Mouseout"
    },
    MSIEevent: function () {
      var event = window.event;
      var type = nMML.MSIEevents[event.type];
      if (nMML[type] && nMML[type](event,this) === false) {return false}
      if (ZOOM && ZOOM.HandleEvent(event,type,this) === false) {return false}
      if (event.srcElement.className === "MathJax_MathPlayer_Overlay" && this.msieMath.fireEvent) {
        // for now, ignore all other events.  This will disable MathPlayer's zoom
        // feature, but also its <maction> support.
        if (type === "ContextMenu" || type === "Mouseover" || type === "Mouseout")
          {this.msieMath.fireEvent("on"+event.type,event)}
      }
      return EVENT.False(event);
    },
    MSIEaltMenu: function () {
      var container = this.parentNode.parentNode;
      while (!container.jaxID) {container = container.parentNode}
      EVENT.AltContextMenu(window.event,container);
    },

    MSIE9events: {
      contextmenu:"Menu", click:"Click", dblclick: "DblClick",
      mouseup:"False", mouseover:"Mouseover", mouseout:"Mouseout"
    },
    MSIE9event: function (event) {
      if (event.type === "contextmenu" && nMML.settings.mpContext) {return true}
      if (event.type === "mouseup" && nMML.settings.mpMouse) {return true}
      if (event.type === "click" && nMML.settings.mpContext)
        {return EVENT.AltContextMenu(event,this)}
      var type = nMML.MSIE9events[event.type];
      return EVENT[type].call(this,event);
    },

    getJaxFromMath: function (math) {
      math = math.parentNode;
      do {math = math.nextSibling} while (math && math.nodeName.toLowerCase() !== "script");
      return HUB.getJaxFor(math);
    },
    getHoverSpan: function (jax,math) {return math.firstChild},
    getHoverBBox: function (jax,span,math) {return EVENT.getBBox(span.parentNode)},

    Zoom: function (jax,span,math,Mw,Mh) {
      jax.root.toNativeMML(span);
      if (this.msieIE8HeightBug) {span.style.position = "absolute"}
      var mW = math.offsetWidth  || math.scrollWidth,
          mH = math.offsetHeight || math.scrollHeight;
      var zW = span.offsetWidth, zH = span.offsetHeight;
      if (this.msieIE8HeightBug) {span.style.position = ""}
      return {Y:-EVENT.getBBox(span.parentNode).h, mW:mW, mH:mH, zW:zW, zH:zH}
    },

    NAMEDSPACE: {
      negativeveryverythinmathspace:  "-.0556em",
      negativeverythinmathspace:      "-.1111em",
      negativethinmathspace:          "-.1667em",
      negativemediummathspace:        "-.2222em",
      negativethickmathspace:         "-.2778em",
      negativeverythickmathspace:     "-.3333em",
      negativeveryverythickmathspace: "-.3889em"
    }
  });

  HUB.Register.StartupHook("mml Jax Ready",function () {

    MML = MathJax.ElementJax.mml;

    MML.mbase.Augment({
      //
      //  Add a MathML tag of the correct type, and set its attributes
      //    then populate it with its children and append it to the parent
      //
      toNativeMML: function (parent) {
	var tag = this.NativeMMLelement(this.type);
	this.NativeMMLattributes(tag);
	for (var i = 0, m = this.data.length; i < m; i++) {
	  if (this.data[i]) {this.data[i].toNativeMML(tag)}
	    else {tag.appendChild(this.NativeMMLelement("mrow"))}
	}
	parent.appendChild(tag);
      },
      //
      //  Look for attributes that are different from the defaults
      //    and set those in the tag's attribute list
      //
      NativeMMLattributes: function (tag) {
	var defaults = this.defaults;
	var copy = (this.attrNames||MML.copyAttributeNames), skip = MML.skipAttributes;
        if (!this.attrNames) {
          if (this.type === "mstyle") {defaults = MML.math.prototype.defaults}
          for (var id in defaults) {if (!skip[id] && defaults.hasOwnProperty(id)) {
	    if (this[id] != null) {tag.setAttribute(id,this.NativeMMLattribute(this[id]))}
          }}
        }
	for (var i = 0, m = copy.length; i < m; i++) {
          var value = (this.attr||{})[copy[i]]; if (value == null) {value = this[copy[i]]}
	  if (value != null) {tag.setAttribute(copy[i],this.NativeMMLattribute(value))}
	}
        this.NativeMMLclass(tag);
      },
      NativeMMLclass: function (tag) {
        var CLASS = []; if (this["class"]) {CLASS.push(this["class"])}
        if (this.isa(MML.TeXAtom)) {
          var TEXCLASS = ["ORD","OP","BIN","REL","OPEN","CLOSE","PUNCT","INNER","VCENTER"][this.texClass];
          if (TEXCLASS) {CLASS.push("MJX-TeXAtom-"+TEXCLASS)}
        }
        if (this.mathvariant && this.NativeMMLvariants[this.mathvariant])
          {CLASS.push("MJX"+this.mathvariant)}
        if (this.arrow) {CLASS.push("MJX-arrow")}
        if (this.variantForm) {CLASS.push("MJX-variant")}
        if (CLASS.length) {tag.setAttribute("class",CLASS.join(" "))}
      },
      NativeMMLattribute: function (value) {
	value = String(value);
	if (nMML.NAMEDSPACE[value]) {value = nMML.NAMEDSPACE[value]} // MP doesn't do negative spaces
	else if (value.match(/^\s*(([-+])?(\d+(\.\d*)?|\.\d+))\s*mu\s*$/))
          {value = RegExp.$2+((1/18)*RegExp.$3).toFixed(3).replace(/\.?0+$/,"")+"em"} // FIXME:  should take scriptlevel into account
	else if (this.NativeMMLvariants[value]) {value = this.NativeMMLvariants[value]}
	return value;
      },
      NativeMMLvariants: {
        "-tex-caligraphic":      MML.VARIANT.SCRIPT,
        "-tex-caligraphic-bold": MML.VARIANT.BOLDSCRIPT,
        "-tex-oldstyle":         MML.VARIANT.NORMAL,
        "-tex-oldstyle-bold":    MML.VARIANT.BOLD,
        "-tex-mathit":           MML.VARIANT.ITALIC
      },
      //
      //  Create a MathML element
      //
      NativeMMLelement: function (type) {
        var math = (isMSIE ? document.createElement("m:"+type) :
	                     document.createElementNS(nMML.MMLnamespace,type));
        math.isMathJax = true;
        return math;
      }
    });
    
    MML.mrow.Augment({
      //
      //  Make inferred rows not include an mrow tag
      //
      toNativeMML: function (parent) {
	if (this.inferred  && this.parent.inferRow) {
	  for (var i = 0, m = this.data.length; i < m; i++) {
	    if (this.data[i]) {this.data[i].toNativeMML(parent)}
	      else {parent.appendChild(this.NativeMMLelement("mrow"))}
	  }
	} else {
	  this.SUPER(arguments).toNativeMML.call(this,parent);
	}
      }
    });

    MML.msubsup.Augment({
      //
      //  Use proper version of msub, msup, or msubsup, depending on
      //  which items are present
      //
      toNativeMML: function (parent) {
	var type = this.type;
	if (this.data[this.sup] == null) {type = "msub"}
	if (this.data[this.sub] == null) {type = "msup"}
	var tag = this.NativeMMLelement(type);
	this.NativeMMLattributes(tag);
	delete this.data[0].inferred;
	for (var i = 0, m = this.data.length; i < m; i++)
	  {if (this.data[i]) {this.data[i].toNativeMML(tag)}}
	parent.appendChild(tag);
      }
    });

    MML.munderover.Augment({
      //
      //  Use proper version of munder, mover, or munderover, depending on
      //  which items are present
      //
      toNativeMML: function (parent) {
	var type = this.type;
	if (this.data[this.under] == null) {type = "mover"}
	if (this.data[this.over] == null)  {type = "munder"}
	var tag = this.NativeMMLelement(type);
	this.NativeMMLattributes(tag);
	delete this.data[0].inferred;
	for (var i = 0, m = this.data.length; i < m; i++)
	  {if (this.data[i]) {this.data[i].toNativeMML(tag)}}
	parent.appendChild(tag);
      }
    });

    if (HUB.Browser.isFirefox) {
      if (!HUB.Browser.versionAtLeast("13.0")) {
        MML.mtable.Augment({
          toNativeMML: function (parent) {
            //
            //  Firefox < 13 doesn't handle width, so put it in styles instead
            //
            if (this.width) {
              var styles = (this.style||"").replace(/;\s*$/,"").split(";");
              if (styles[0] === "") {styles.shift()}
              styles.push("width:"+this.width);
              this.style = styles.join(";");
            }
            this.SUPER(arguments).toNativeMML.call(this,parent);
          }
        });
      }
      if (!HUB.Browser.versionAtLeast("9.0")) {
        MML.mlabeledtr.Augment({
	  toNativeMML: function (parent) {
            //
            //  FF doesn't handle mlabeledtr, so remove the label
            //
            var tag = this.NativeMMLelement("mtr");
            this.NativeMMLattributes(tag);
            for (var i = 1, m = this.data.length; i < m; i++) {
              if (this.data[i]) {this.data[i].toNativeMML(tag)}
              else {tag.appendChild(this.NativeMMLelement("mrow"))}
            }
            parent.appendChild(tag);
          }
        });
      }

      var fontDir = MathJax.Ajax.fileURL(MathJax.OutputJax.fontDir+"/HTML-CSS/TeX/otf");

      /*
       *  Add fix for mathvariant issues in FF
       */
      nMML.Augment({
	config: {
	  styles: {
	    '[mathvariant="double-struck"]':          {"font-family":"MathJax_AMS, MathJax_AMS-WEB"},
	    '[mathvariant="script"]':                 {"font-family":"MathJax_Script, MathJax_Script-WEB"},
	    '[mathvariant="fraktur"]':                {"font-family":"MathJax_Fraktur, MathJax_Fraktur-WEB"},
	    '[mathvariant="bold-script"]':            {"font-family":"MathJax_Script, MathJax_Caligraphic-WEB", "font-weight":"bold"},
	    '[mathvariant="bold-fraktur"]':           {"font-family":"MathJax_Fraktur, MathJax_Fraktur-WEB", "font-weight":"bold"},
	    '[mathvariant="monospace"]':              {"font-family":"monospace"},
	    '[mathvariant="sans-serif"]':             {"font-family":"sans-serif"},
	    '[mathvariant="bold-sans-serif"]':        {"font-family":"sans-serif", "font-weight":"bold"},
	    '[mathvariant="sans-serif-italic"]':      {"font-family":"sans-serif", "font-style":"italic"},
	    '[mathvariant="sans-serif-bold-italic"]': {"font-family":"sans-serif", "font-style":"italic", "font-weight":"bold"},
	    '[class="MJX-tex-oldstyle"]':             {"font-family":"MathJax_Caligraphic, MathJax_Caligraphic-WEB"},
	    '[class="MJX-tex-oldstyle-bold"]':        {"font-family":"MathJax_Caligraphic, MathJax_Caligraphic-WEB", "font-weight":"bold"},
	    '[class="MJX-tex-caligraphic"]':          {"font-family":"MathJax_Caligraphic, MathJax_Caligraphic-WEB"},
	    '[class="MJX-tex-caligraphic-bold"]':     {"font-family":"MathJax_Caligraphic, MathJax_Caligraphic-WEB", "font-weight":"bold"},

	    '@font-face /*1*/': {
	      "font-family": "MathJax_AMS-WEB",
	      "src": "url('"+fontDir+"/MathJax_AMS-Regular.otf')"
	    },
	    '@font-face /*2*/': {
	      "font-family": "MathJax_Script-WEB",
	      "src": "url('"+fontDir+"/MathJax_Script-Regular.otf')"
	    },
	    '@font-face /*3*/': {
	      "font-family": "MathJax_Fraktur-WEB",
	      "src": "url('"+fontDir+"/MathJax_Fraktur-Regular.otf')"
	    },
	    '@font-face /*4*/': {
	      "font-family": "MathJax_Caligraphic-WEB",
	      "src": "url('"+fontDir+"/MathJax_Caligraphic-Regular.otf')"
	    },
	    '@font-face /*5*/': {
	      "font-family": "MathJax_Fraktur-WEB", "font-weight":"bold",
	      "src": "url('"+fontDir+"/MathJax_Fraktur-Bold.otf')"
	    },
	    '@font-face /*6*/': {
	      "font-family": "MathJax_Caligraphic-WEB", "font-weight":"bold",
	      "src": "url('"+fontDir+"/MathJax_Caligraphic-Bold.otf')"
	    }
	  }
	}
      });
    }
    
    MML.math.Augment({
      //
      //  Some browsers don't seem to add the xmlns attribute, so do it by hand.
      //
      toNativeMML: function (parent) {
        var tag = this.NativeMMLelement(this.type), math = tag;
        tag.setAttribute("xmlns",nMML.MMLnamespace);
        this.NativeMMLattributes(tag);
        if (nMML.widthBug) {tag = tag.appendChild(this.NativeMMLelement("mrow"))}
        for (var i = 0, m = this.data.length; i < m; i++) {
          if (this.data[i]) {this.data[i].toNativeMML(tag)}
            else {tag.appendChild(this.NativeMMLelement("mrow"))}
        }
        parent.appendChild(math);
        //
        //  Firefox can't seem to get the width of <math> elements right, so
        //  use an <mrow> to get the actual width and set the style on the 
        //  parent element to match.  Even if we set the <math> width properly,
        //  it doesn't seem to propagate up to the <span> correctly.
        //
        if (nMML.widthBug) {parent.style.width = math.firstChild.scrollWidth+"px"}
      }
    });

    MML.TeXAtom.Augment({
      //
      //  Convert TeXatom to an mrow
      //
      toNativeMML: function (parent) {
	// FIXME:  Handle spacing using mpadded?
	var tag = this.NativeMMLelement("mrow");
	this.NativeMMLattributes(tag);
	this.data[0].toNativeMML(tag);
	parent.appendChild(tag);
      }
    });

    MML.chars.Augment({
      //
      //  Add a text node
      //
      toNativeMML: function (parent) {
	parent.appendChild(document.createTextNode(this.toString()));
      }
    });

    MML.entity.Augment({
      //
      //  Add a text node
      //
      toNativeMML: function (parent) {
	parent.appendChild(document.createTextNode(this.toString()));
      }
    });
    
    MML.xml.Augment({
      //
      //  Insert the XML verbatim
      //
      toNativeMML: function (parent) {
        for (var i = 0, m = this.data.length; i < m; i++)
          {parent.appendChild(this.data[i].cloneNode(true))}
      }
    });

    HUB.Register.StartupHook("TeX mathchoice Ready",function () {
      MML.TeXmathchoice.Augment({
	//
	//  Get the MathML for the selected choice
	//
	toNativeMML: function (parent) {this.Core().toNativeMML(parent)}
      });
    });

    //
    //  Loading isn't complete until the element jax is modified,
    //  but can't call loadComplete within the callback for "mml Jax Ready"
    //  (it would call NativeMML's Require routine, asking for the mml jax again)
    //  so wait until after the mml jax has finished processing.
    //
    setTimeout(MathJax.Callback(["loadComplete",nMML,"jax.js"]),0);
  });
  

  //
  //  Determine browser characteristics
  //
  HUB.Browser.Select({
    MSIE: function (browser) {
      var mode = (document.documentMode || 0);
      nMML.msieIE8HeightBug = (mode === 8);
    },
    Opera: function (browser) {
      nMML.operaPositionBug = true;
    },
    Firefox: function (browser) {
      nMML.forceReflow = true;
      nMML.widthBug = true;
    }
  });
  

  HUB.Register.StartupHook("End Cookie",function () {
    if (HUB.config.menuSettings.zoom !== "None")
      {AJAX.Require("[MathJax]/extensions/MathZoom.js")}
  });

})(MathJax.OutputJax.NativeMML, MathJax.Hub, MathJax.Ajax, MathJax.HTML);
