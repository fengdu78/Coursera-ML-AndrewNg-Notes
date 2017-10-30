/*************************************************************
 *
 *  MathJax/extensions/MathZoom.js
 *  
 *  Implements the zoom feature for enlarging math expressions.  It is
 *  loaded automatically when the Zoom menu selection changes from "None".
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

(function (HUB,HTML,AJAX,HTMLCSS,nMML) {
  var VERSION = "2.1";
  
  var CONFIG = HUB.CombineConfig("MathZoom",{
    styles: {
      //
      //  The styles for the MathZoom display box
      //
      "#MathJax_Zoom": {
        position:"absolute", "background-color":"#F0F0F0", overflow:"auto",
        display:"block", "z-index":301, padding:".5em", border:"1px solid black", margin:0,
        "font-weight":"normal", "font-style":"normal",
        "text-align":"left", "text-indent":0, "text-transform":"none",
        "line-height":"normal", "letter-spacing":"normal", "word-spacing":"normal",
        "word-wrap":"normal", "white-space":"nowrap", "float":"none",
        "box-shadow":"5px 5px 15px #AAAAAA",         // Opera 10.5 and IE9
        "-webkit-box-shadow":"5px 5px 15px #AAAAAA", // Safari 3 and Chrome
        "-moz-box-shadow":"5px 5px 15px #AAAAAA",    // Forefox 3.5
        "-khtml-box-shadow":"5px 5px 15px #AAAAAA",  // Konqueror
        filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')" // IE
      },
      
      //
      //  The styles for the hidden overlay (should not need to be adjusted by the page author)
      //
      "#MathJax_ZoomOverlay": {
        position:"absolute", left:0, top:0, "z-index":300, display:"inline-block",
        width:"100%", height:"100%", border:0, padding:0, margin:0,
        "background-color":"white", opacity:0, filter:"alpha(opacity=0)"
      },
      
      "#MathJax_ZoomEventTrap": {
        position:"absolute", left:0, top:0, "z-index":302,
        display:"inline-block", border:0, padding:0, margin:0,
        "background-color":"white", opacity:0, filter:"alpha(opacity=0)"
      }
    }
  });
  
  var FALSE, HOVER, EVENT;
  MathJax.Hub.Register.StartupHook("MathEvents Ready",function () {
    EVENT = MathJax.Extension.MathEvents.Event;
    FALSE = MathJax.Extension.MathEvents.Event.False;
    HOVER = MathJax.Extension.MathEvents.Hover;
  });

  /*************************************************************/

  var ZOOM = MathJax.Extension.MathZoom = {
    version: VERSION,
    settings: HUB.config.menuSettings,
    scrollSize: 18,    // width of scrool bars

    //
    //  Process events passed from output jax
    //
    HandleEvent: function (event,type,math) {
      if (ZOOM.settings.CTRL  && !event.ctrlKey)  return true;
      if (ZOOM.settings.ALT   && !event.altKey)   return true;
      if (ZOOM.settings.CMD   && !event.metaKey)  return true;
      if (ZOOM.settings.Shift && !event.shiftKey) return true;
      if (!ZOOM[type]) return true;
      return ZOOM[type](event,math);
    },
    
    //
    //  Zoom on click
    //
    Click: function (event,math) {
      if (this.settings.zoom === "Click") {return this.Zoom(event,math)}
    },
    
    //
    //  Zoom on double click
    //
    DblClick: function (event,math) {
      if (this.settings.zoom === "Double-Click") {return this.Zoom(event,math)}
    },
    
    //
    //  Zoom on hover (called by MathEvents.Hover)
    //
    Hover: function (event,math) {
      if (this.settings.zoom === "Hover") {this.Zoom(event,math); return true}
      return false;
    },
    
    
    //
    //  Handle the actual zooming
    //
    Zoom: function (event,math) {
      //
      //  Remove any other zoom and clear timers
      //
      this.Remove(); HOVER.ClearHoverTimer(); EVENT.ClearSelection();

      //
      //  Find the jax
      //
      var JAX = MathJax.OutputJax[math.jaxID];
      var jax = JAX.getJaxFromMath(math);
      if (jax.hover) {HOVER.UnHover(jax)}

      //
      //  Create the DOM elements for the zoom box
      //
      var Mw = Math.floor(.85*document.body.clientWidth),
          Mh = Math.floor(.85*Math.max(document.body.clientHeight,document.documentElement.clientHeight));
      var div = HTML.Element(
        "span",{
            style: {position:"relative", display:"inline-block", height:0, width:0},
            id:"MathJax_ZoomFrame"
        },[
          ["span",{id:"MathJax_ZoomOverlay", onmousedown:this.Remove}],
          ["span",{
            id:"MathJax_Zoom", onclick:this.Remove,
            style:{
              visibility:"hidden", fontSize:this.settings.zscale,
              "max-width":Mw+"px", "max-height":Mh+"px"
            }
          },[["span",{style:{display:"inline-block", "white-space":"nowrap"}}]]
        ]]
      );
      var zoom = div.lastChild, span = zoom.firstChild, overlay = div.firstChild;
      math.parentNode.insertBefore(div,math); math.parentNode.insertBefore(math,div); // put div after math
      if (span.addEventListener) {span.addEventListener("mousedown",this.Remove,true)}
      
      if (this.msieTrapEventBug) {
        var trap = HTML.Element("span",{id:"MathJax_ZoomEventTrap", onmousedown:this.Remove});
        div.insertBefore(trap,zoom);
      }

      //
      //  Display the zoomed math
      //
      if (this.msieZIndexBug) {
        //  MSIE doesn't do z-index properly, so move the div to the document.body,
        //  and use an image as a tracker for the usual position
        var tracker = HTML.addElement(document.body,"img",{
          src:"about:blank", id:"MathJax_ZoomTracker", width:0, height:0,
          style:{width:0, height:0, position:"relative"}
        });
        div.style.position = "relative";
        div.style.zIndex = CONFIG.styles["#MathJax_ZoomOverlay"]["z-index"];
        div = tracker;
      }

      var bbox = JAX.Zoom(jax,span,math,Mw,Mh);
      
      //
      //  Fix up size and position for browsers with bugs (IE)
      //
      if (this.msiePositionBug) {
        if (this.msieSizeBug) 
          {zoom.style.height = bbox.zH+"px"; zoom.style.width = bbox.zW+"px"} // IE8 gets the dimensions completely wrong
        if (zoom.offsetHeight > Mh) {zoom.style.height = Mh+"px"; zoom.style.width = (bbox.zW+this.scrollSize)+"px"}  // IE doesn't do max-height?
        if (zoom.offsetWidth  > Mw) {zoom.style.width  = Mw+"px"; zoom.style.height = (bbox.zH+this.scrollSize)+"px"}
      }
      if (this.operaPositionBug) {zoom.style.width = Math.min(Mw,bbox.zW)+"px"}  // Opera gets width as 0?
      if (zoom.offsetWidth < Mw && zoom.offsetHeight < Mh) {zoom.style.overflow = "visible"}
      this.Position(zoom,bbox);
      if (this.msieTrapEventBug) {
        trap.style.height = zoom.clientHeight+"px"; trap.style.width = zoom.clientWidth+"px";
        trap.style.left = (parseFloat(zoom.style.left)+zoom.clientLeft)+"px";
        trap.style.top = (parseFloat(zoom.style.top)+zoom.clientTop)+"px";
      }
      zoom.style.visibility = "";

      //
      //  Add event handlers
      //
      if (this.settings.zoom === "Hover") {overlay.onmouseover = this.Remove}
      if (window.addEventListener) {addEventListener("resize",this.Resize,false)}
      else if (window.attachEvent) {attachEvent("onresize",this.Resize)}
      else {this.onresize = window.onresize; window.onresize = this.Resize}
      
      //
      //  Let others know about the zoomed math
      //
      HUB.signal.Post(["math zoomed",jax]);
      
      //
      //  Canel further actions
      //
      return FALSE(event);
    },
    
    //
    //  Set the position of the zoom box and overlay
    //
    Position: function (zoom,bbox) {
      var XY = this.Resize(), x = XY.x, y = XY.y, W = bbox.mW;
      var dx = -W-Math.floor((zoom.offsetWidth-W)/2), dy = bbox.Y;
      zoom.style.left = Math.max(dx,10-x)+"px"; zoom.style.top = Math.max(dy,10-y)+"px";
      if (!ZOOM.msiePositionBug) {ZOOM.SetWH()} // refigure overlay width/height
    },
    
    //
    //  Handle resizing of overlay while zoom is displayed
    //
    Resize: function (event) {
      if (ZOOM.onresize) {ZOOM.onresize(event)}
      var x = 0, y = 0, obj,
          div = document.getElementById("MathJax_ZoomFrame"),
          overlay = document.getElementById("MathJax_ZoomOverlay");
      obj = div; while (obj.offsetParent) {x += obj.offsetLeft; obj = obj.offsetParent}
      if (ZOOM.operaPositionBug) {div.style.border = "1px solid"}  // to get vertical position right
      obj = div; while (obj.offsetParent) {y += obj.offsetTop; obj = obj.offsetParent}
      if (ZOOM.operaPositionBug) {div.style.border = ""}
      overlay.style.left = (-x)+"px"; overlay.style.top = (-y)+"px";
      if (ZOOM.msiePositionBug) {setTimeout(ZOOM.SetWH,0)} else {ZOOM.SetWH()}
      return {x:x, y:y};
    },
    SetWH: function () {
      var overlay = document.getElementById("MathJax_ZoomOverlay");
      overlay.style.width = overlay.style.height = "1px"; // so scrollWidth/Height will be right below
      var doc = document.documentElement || document.body;
      overlay.style.width = doc.scrollWidth + "px";
      overlay.style.height = Math.max(doc.clientHeight,doc.scrollHeight) + "px";
    },
    
    //
    //  Remove zoom display and event handlers
    //
    Remove: function (event) {
      var div = document.getElementById("MathJax_ZoomFrame");
      if (div) {
        var JAX = MathJax.OutputJax[div.previousSibling.jaxID];
        var jax = JAX.getJaxFromMath(div.previousSibling);
        HUB.signal.Post(["math unzoomed",jax]);
        div.parentNode.removeChild(div);
        div = document.getElementById("MathJax_ZoomTracker");
        if (div) {div.parentNode.removeChild(div)}
        if (ZOOM.operaRefreshBug) {
	  // force a redisplay of the page
	  // (Opera doesn't refresh properly after the zoom is removed)
          var overlay = HTML.addElement(document.body,"div",{
            style:{position:"fixed", left:0, top:0, width:"100%", height:"100%",
                   backgroundColor:"white", opacity:0},
            id: "MathJax_OperaDiv"
          });
          document.body.removeChild(overlay);
        }
        if (window.removeEventListener) {removeEventListener("resize",ZOOM.Resize,false)}
        else if (window.detachEvent) {detachEvent("onresize",ZOOM.Resize)}
        else {window.onresize = ZOOM.onresize; delete ZOOM.onresize}
      }
      return FALSE(event);
    }
    
  };
  
  
  /*************************************************************/

  HUB.Browser.Select({
    MSIE: function (browser) {
      var mode  = (document.documentMode || 0);
      var isIE9 = (mode >= 9);
      ZOOM.msiePositionBug = !isIE9;
      ZOOM.msieSizeBug = browser.versionAtLeast("7.0") &&
        (!document.documentMode || mode === 7 || mode === 8);
      ZOOM.msieZIndexBug = (mode <= 7);
      ZOOM.msieInlineBlockAlignBug = (mode <= 7);
      ZOOM.msieTrapEventBug = !window.addEventListener;
      if (document.compatMode === "BackCompat") {ZOOM.scrollSize = 52} // don't know why this is so far off
      if (isIE9) {delete CONFIG.styles["#MathJax_Zoom"].filter}
    },
    
    Opera: function (browser) {
      ZOOM.operaPositionBug = true;
      ZOOM.operaRefreshBug = true;
    }
  });
  
  ZOOM.topImg = (ZOOM.msieInlineBlockAlignBug ?
    HTML.Element("img",{style:{width:0,height:0,position:"relative"},src:"about:blank"}) :
    HTML.Element("span",{style:{width:0,height:0,display:"inline-block"}})
  );
  if (ZOOM.operaPositionBug || ZOOM.msieTopBug) {ZOOM.topImg.style.border="1px solid"}

  /*************************************************************/

  MathJax.Callback.Queue(
    ["StartupHook",MathJax.Hub.Register,"Begin Styles",{}],
    ["Styles",AJAX,CONFIG.styles],
    ["Post",HUB.Startup.signal,"MathZoom Ready"],
    ["loadComplete",AJAX,"[MathJax]/extensions/MathZoom.js"]
  );

})(MathJax.Hub,MathJax.HTML,MathJax.Ajax,MathJax.OutputJax["HTML-CSS"],MathJax.OutputJax.NativeMML);
