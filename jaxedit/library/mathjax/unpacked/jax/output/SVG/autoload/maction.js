/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/maction.js
 *  
 *  Implements the SVG output for <maction> elements.
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

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  var VERSION = "2.1";
  var MML = MathJax.ElementJax.mml,
      SVG = MathJax.OutputJax["SVG"];
  
  var currentTip, hover, clear;

  //
  //  Add configuration for tooltips
  //
  var CONFIG = SVG.config.tooltip = MathJax.Hub.Insert({
    delayPost: 600, delayClear: 600,
    offsetX: 10, offsetY: 5
  },SVG.config.tooltip||{});
  
  
  MML.maction.Augment({
    SVGtooltip: MathJax.HTML.addElement(document.body,"div",{id:"MathJax_SVG_Tooltip"}),
    
    toSVG: function (HW,D) {
      this.SVGgetStyles();
      var svg = this.SVG();
      var selected = this.selected();
      if (selected) {
        svg.Add(this.SVGdataStretched(this.Get("selection")-1,HW,D));
        this.SVGhandleHitBox(svg);
      }
      this.SVGhandleSpace(svg);
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    },
    SVGhandleHitBox: function (svg) {
      var frame = SVG.addElement(svg.element,"rect",
        {width:svg.w, height:svg.h+svg.d, y:-svg.d, fill:"none", "pointer-events":"all"});
      var type = this.Get("actiontype");
      if (this.SVGaction[type]) {this.SVGaction[type].call(this,svg,frame,this.Get("selection"))}
    },
    SVGstretchH: MML.mbase.prototype.SVGstretchH,
    SVGstretchV: MML.mbase.prototype.SVGstretchV,
    
    //
    //  Implementations for the various actions
    //
    SVGaction: {
      toggle: function (svg,frame,selection) {
        this.selection = selection;
        SVG.Element(frame,{cursor:"pointer"});
        frame.onclick = MathJax.Callback(["SVGclick",this]);
      },
      
      statusline: function (svg,frame,selection) {
        frame.onmouseover = MathJax.Callback(["SVGsetStatus",this]),
        frame.onmouseout  = MathJax.Callback(["SVGclearStatus",this]);
        frame.onmouseover.autoReset = frame.onmouseout.autoReset = true;
      },
      
      tooltip: function(svg,frame,selection) {
        frame.onmouseover = MathJax.Callback(["SVGtooltipOver",this]),
        frame.onmouseout  = MathJax.Callback(["SVGtooltipOut",this]);
        frame.onmouseover.autoReset = frame.onmouseout.autoReset = true;
      }
    },
    
    //
    //  Handle a click on the maction element
    //    (remove the original rendering and rerender)
    //
    SVGclick: function (event) {
      this.selection++;
      if (this.selection > this.data.length) {this.selection = 1}
      var math = this; while (math.type !== "math") {math = math.inherit}
      var jax = MathJax.Hub.getJaxFor(math.inputID); //, hover = !!jax.hover;
      jax.Update();
      /* 
       * if (hover) {
       *   var span = document.getElementById(jax.inputID+"-Span");
       *   MathJax.Extension.MathEvents.Hover.Hover(jax,span);
       * }
       */
      return MathJax.Extension.MathEvents.Event.False(event);
    },
    
    //
    //  Set/Clear the window status message
    //
    SVGsetStatus: function (event) {
      // FIXME:  Do something better with non-token elements
      this.messageID = MathJax.Message.Set
        ((this.data[1] && this.data[1].isToken) ?
             this.data[1].data.join("") : this.data[1].toString());
    },
    SVGclearStatus: function (event) {
      if (this.messageID) {MathJax.Message.Clear(this.messageID,0)}
      delete this.messageID;
    },
    
    //
    //  Handle tooltips
    //
    SVGtooltipOver: function (event) {
      if (!event) {event = window.event}
      if (clear) {clearTimeout(clear); clear = null}
      if (hover) {clearTimeout(hover)}
      var x = event.pageX; var y = event.pageY;
      if (x == null) {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      var callback = MathJax.Callback(["SVGtooltipPost",this,x+CONFIG.offsetX,y+CONFIG.offsetY])
      hover = setTimeout(callback,CONFIG.delayPost);
    },
    SVGtooltipOut: function (event) {
      if (hover) {clearTimeout(hover); hover = null}
      if (clear) {clearTimeout(clear)}
      var callback = MathJax.Callback(["SVGtooltipClear",this,80]);
      clear = setTimeout(callback,CONFIG.delayClear);
    },
    SVGtooltipPost: function (x,y) {
      hover = null; if (clear) {clearTimeout(clear); clear = null}

      //
      //  Get the tip div and show it at the right location, then clear its contents
      //
      var tip = this.SVGtooltip;
      tip.style.display = "block"; tip.style.opacity = "";
      if (this === currentTip) return;
      tip.style.left = x+"px"; tip.style.top = y+"px";
      tip.innerHTML = ''; var span = MathJax.HTML.addElement(tip,"span");

      //
      //  Get the sizes from the jax (FIXME: should calculate again?)
      //
      var math = this; while (math.type !== "math") {math = math.inherit}
      var jax = MathJax.Hub.getJaxFor(math.inputID);
      this.em = MML.mbase.prototype.em = jax.SVG.em; this.ex = jax.SVG.ex;
      this.linebreakWidth = jax.SVG.lineWidth * 1000; this.cwidth = jax.SVG.cwidth;

      //
      //  Make a new math element and temporarily move the tooltip to it
      //  Display the math containing the tip, but check for errors
      //  Then put the tip back into the maction element
      //
      var mml = this.data[1];
      math = MML.math(mml);
      try {math.toSVG(span,tip)} catch(err) {
        this.SetData(1,mml); tip.style.display = "none";
        if (!err.restart) {throw err}
        MathJax.Callback.After(["SVGtooltipPost",this,x,y],err.restart);
        return;
      }
      this.SetData(1,mml);

      currentTip = this;
    },
    SVGtooltipClear: function (n) {
      var tip = this.SVGtooltip;
      if (n <= 0) {
        tip.style.display = "none";
        tip.style.opacity = "";
        clear = null;
      } else {
        tip.style.opacity = n/100;
        clear = setTimeout(MathJax.Callback(["SVGtooltipClear",this,n-20]),50);
      }
    }
  });

  MathJax.Hub.Startup.signal.Post("SVG maction Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/maction.js");
  
});

