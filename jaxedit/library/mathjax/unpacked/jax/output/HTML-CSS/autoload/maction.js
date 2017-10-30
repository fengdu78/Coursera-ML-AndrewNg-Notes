/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/maction.js
 *  
 *  Implements the HTML-CSS output for <maction> elements.
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var VERSION = "2.1";
  var MML = MathJax.ElementJax.mml,
      HTMLCSS = MathJax.OutputJax["HTML-CSS"];
  
  var currentTip, hover, clear;

  //
  //  Add configuration for tooltips
  //
  var CONFIG = HTMLCSS.config.tooltip = MathJax.Hub.Insert({
    delayPost: 600, delayClear: 600,
    offsetX: 10, offsetY: 5
  },HTMLCSS.config.tooltip||{});
  
  
  MML.maction.Augment({
    HTMLtooltip: HTMLCSS.addElement(document.body,"div",{id:"MathJax_Tooltip"}),
    
    toHTML: function (span,HW,D) {
      span = this.HTMLhandleSize(this.HTMLcreateSpan(span)); span.bbox = null;
      var selected = this.selected();
      if (selected) {
        var box = selected.toHTML(span);
        if (D != null) {HTMLCSS.Remeasured(selected.HTMLstretchV(span,HW,D),span)}
        else if (HW != null) {HTMLCSS.Remeasured(selected.HTMLstretchH(span,HW),span)}
	else {HTMLCSS.Measured(box,span)}
        this.HTMLhandleHitBox(span);
      }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    HTMLhandleHitBox: function (span,postfix) {
      var frame;
      if (HTMLCSS.msieHitBoxBug) {
        // margin-left doesn't work on inline-block elements in IE, so put it in a SPAN
	  var box = HTMLCSS.addElement(span,"span",{isMathJax:true});
        frame = HTMLCSS.createFrame(box,span.bbox.h,span.bbox.d,span.bbox.w,0,"none");
        span.insertBefore(box,span.firstChild); // move below the content
        box.style.marginRight = HTMLCSS.Em(-span.bbox.w);
        if (HTMLCSS.msieInlineBlockAlignBug)
          {frame.style.verticalAlign = HTMLCSS.Em(HTMLCSS.getHD(span).d-span.bbox.d)}
      } else {
        frame = HTMLCSS.createFrame(span,span.bbox.h,span.bbox.d,span.bbox.w,0,"none");
        span.insertBefore(frame,span.firstChild); // move below the content
        frame.style.marginRight = HTMLCSS.Em(-span.bbox.w);
      }
      frame.className = "MathJax_HitBox";
      frame.id = "MathJax-HitBox-" + this.spanID + (postfix||"") + HTMLCSS.idPostfix;
      
      var type = this.Get("actiontype");
      if (this.HTMLaction[type]) {this.HTMLaction[type].call(this,span,frame,this.Get("selection"))}
    },
    HTMLstretchH: MML.mbase.HTMLstretchH,
    HTMLstretchV: MML.mbase.HTMLstretchV,
    
    //
    //  Implementations for the various actions
    //
    HTMLaction: {
      toggle: function (span,frame,selection) {
        this.selection = selection;
        frame.onclick = span.childNodes[1].onclick = MathJax.Callback(["HTMLclick",this]);
        frame.style.cursor = span.childNodes[1].style.cursor="pointer";
      },
      
      statusline: function (span,frame,selection) {
        frame.onmouseover = span.childNodes[1].onmouseover = MathJax.Callback(["HTMLsetStatus",this]);
        frame.onmouseout  = span.childNodes[1].onmouseout  = MathJax.Callback(["HTMLclearStatus",this]);
        frame.onmouseover.autoReset = frame.onmouseout.autoReset = true;
      },
      
      tooltip: function(span,frame,selection) {
        if (this.data[1] && this.data[1].isToken) {
          frame.title = frame.alt = span.childNodes[1].title =
            span.childNodes[1].alt = this.data[1].data.join("");
        } else {
          frame.onmouseover = span.childNodes[1].onmouseover = MathJax.Callback(["HTMLtooltipOver",this]);
          frame.onmouseout  = span.childNodes[1].onmouseout  = MathJax.Callback(["HTMLtooltipOut",this]);
          frame.onmouseover.autoReset = frame.onmouseout.autoReset = true;
        }
      }
    },
    
    //
    //  Handle a click on the maction element
    //    (remove the original rendering and rerender)
    //
    HTMLclick: function (event) {
      this.selection++;
      if (this.selection > this.data.length) {this.selection = 1}
      var math = this; while (math.type !== "math") {math = math.inherit}
      var jax = MathJax.Hub.getJaxFor(math.inputID), hover = !!jax.hover;
      jax.Update();
      if (hover) {
        var span = document.getElementById(jax.inputID+"-Span");
        MathJax.Extension.MathEvents.Hover.Hover(jax,span);
      }
      return MathJax.Extension.MathEvents.Event.False(event);
    },
    
    //
    //  Set/Clear the window status message
    //
    HTMLsetStatus: function (event) {
      // FIXME:  Do something better with non-token elements
      this.messageID = MathJax.Message.Set
        ((this.data[1] && this.data[1].isToken) ?
             this.data[1].data.join("") : this.data[1].toString());
    },
    HTMLclearStatus: function (event) {
      if (this.messageID) {MathJax.Message.Clear(this.messageID,0)}
      delete this.messageID;
    },
    
    //
    //  Handle tooltips
    //
    HTMLtooltipOver: function (event) {
      if (!event) {event = window.event}
      if (clear) {clearTimeout(clear); clear = null}
      if (hover) {clearTimeout(hover)}
      var x = event.pageX; var y = event.pageY;
      if (x == null) {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      var callback = MathJax.Callback(["HTMLtooltipPost",this,x+CONFIG.offsetX,y+CONFIG.offsetY])
      hover = setTimeout(callback,CONFIG.delayPost);
    },
    HTMLtooltipOut: function (event) {
      if (hover) {clearTimeout(hover); hover = null}
      if (clear) {clearTimeout(clear)}
      var callback = MathJax.Callback(["HTMLtooltipClear",this,80]);
      clear = setTimeout(callback,CONFIG.delayClear);
    },
    HTMLtooltipPost: function (x,y) {
      hover = null; if (clear) {clearTimeout(clear); clear = null}
      var tip = this.HTMLtooltip;
      tip.style.display = "block"; tip.style.opacity = "";
      tip.style.filter = HTMLCSS.config.styles["#MathJax_Tooltip"].filter;
      if (this === currentTip) return;
      tip.style.left = x+"px"; tip.style.top = y+"px";
      tip.innerHTML = '<span class="MathJax"><nobr></nobr></span>';
      //
      //  get em sizes (taken from HTMLCSS.preTranslate)
      //
      var emex = tip.insertBefore(HTMLCSS.EmExSpan.cloneNode(true),tip.firstChild);
      var ex = emex.firstChild.offsetHeight/60,
          em = emex.lastChild.firstChild.offsetHeight/60;
      HTMLCSS.em = HTMLCSS.outerEm = MML.mbase.prototype.em = em;
      var scale = Math.floor(Math.max(HTMLCSS.config.minScaleAdjust/100,(ex/HTMLCSS.TeX.x_height)/em) * HTMLCSS.config.scale);
      tip.firstChild.style.fontSize = scale+"%";
      emex.parentNode.removeChild(emex);

      var stack = HTMLCSS.createStack(tip.firstChild.firstChild);
      var box = HTMLCSS.createBox(stack);
      try {HTMLCSS.Measured(this.data[1].toHTML(box),box)} catch(err) {
        if (!err.restart) {throw err}
        tip.style.display = "none";
        MathJax.Callback.After(["HTMLtooltipPost",this,x,y],err.restart);
        return;
      }
      HTMLCSS.placeBox(box,0,0);
      HTMLCSS.createRule(tip.firstChild.firstChild,box.bbox.h,box.bbox.d,0);
      currentTip = this;
    },
    HTMLtooltipClear: function (n) {
      var tip = this.HTMLtooltip;
      if (n <= 0) {
        tip.style.display = "none";
        tip.style.opacity = tip.style.filter = "";
        clear = null;
      } else {
        tip.style.opacity = n/100;
        tip.style.filter = "alpha(opacity="+n+")";
        clear = setTimeout(MathJax.Callback(["HTMLtooltipClear",this,n-20]),50);
      }
    }
  });

  //
  //  Do browser-specific setup
  //
  MathJax.Hub.Browser.Select({
    MSIE: function (browser) {
      HTMLCSS.msieHitBoxBug = true;
    }
  });


  MathJax.Hub.Startup.signal.Post("HTML-CSS maction Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/maction.js");
  
});

