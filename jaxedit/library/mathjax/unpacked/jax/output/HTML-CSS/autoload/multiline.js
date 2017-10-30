/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/multiline.js
 *  
 *  Implements the HTML-CSS output for <mrow>'s that contain line breaks.
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
      
  //
  //  Penalties for the various line breaks
  //
  var PENALTY = {
    newline:         0,
    nobreak:   1000000,
    goodbreak:   [-200],
    badbreak:    [+200],
    auto:           [0],
    
    toobig:        800,
    nestfactor:    400,
    spacefactor:  -100,
    spaceoffset:     2,
    spacelimit:      1,  // spaces larger than this get a penalty boost
    fence:         500,
    close:         500
  };
  
  var ENDVALUES = {linebreakstyle: "after"};

  
  /**************************************************************************/
  
  MML.mbase.Augment({
    HTMLlinebreakPenalty: PENALTY,
    
    /****************************************************************/
    //
    // Handle breaking an mrow into separate lines
    //
    HTMLmultiline: function (span) {

      //
      //  Find the parent element and mark it as multiline
      //
      var parent = this;
      while (parent.inferred || (parent.parent && parent.parent.type === "mrow" &&
             parent.parent.data.length === 1)) {parent = parent.parent}
      var isTop = ((parent.type === "math" && parent.Get("display") === "block") ||
                    parent.type === "mtd");
      parent.isMultiline = true;
      
      //
      //  Default values for the line-breaking parameters
      //
      var VALUES = this.getValues(
        "linebreak","linebreakstyle","lineleading","linebreakmultchar",
        "indentalign","indentshift",
        "indentalignfirst","indentshiftfirst",
        "indentalignlast","indentshiftlast"
      );
      if (VALUES.linebreakstyle === MML.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE) 
        {VALUES.linebreakstyle = this.Get("infixlinebreakstyle")}
      VALUES.lineleading = HTMLCSS.length2em(VALUES.lineleading,1,0.5);

      //
      //  Remove old color and break the span at its best line breaks
      //
      this.HTMLremoveColor(span);
      var stack = HTMLCSS.createStack(span);
      var state = {
            n: 0, Y: 0,
            scale: this.HTMLgetScale(),
            isTop: isTop,
            values: {},
            VALUES: VALUES
          },
          align = this.HTMLgetAlign(state,{}),
          shift = this.HTMLgetShift(state,{},align),
          start = [],
          end = {
            index:[], penalty:PENALTY.nobreak,
            w:0, W:shift, shift:shift, scanW:shift,
            nest: 0
          },
          broken = false;
          
      while (this.HTMLbetterBreak(end,state) && 
             (end.scanW >= HTMLCSS.linebreakWidth || end.penalty == PENALTY.newline)) {
        this.HTMLaddLine(stack,start,end.index,state,end.values,broken);
        start = end.index.slice(0); broken = true;
        align = this.HTMLgetAlign(state,end.values);
        shift = this.HTMLgetShift(state,end.values,align);
        if (align === MML.INDENTALIGN.CENTER) {shift = 0}
        end.W = end.shift = end.scanW = shift; end.penalty = PENALTY.nobreak;
      }
      state.isLast = true;
      this.HTMLaddLine(stack,start,[],state,ENDVALUES,broken);

      //
      //  Make top-level spans 100% wide.
      //  Finish up the space and add the color again
      //
      if (isTop) {
        stack.style.width = "100%";
        if (parent.type === "math") {span.bbox.width = "100%"}
      }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      span.bbox.isMultiline = true;

      return span;
    },

    /****************************************************************/
    //
    //  Locate the next linebreak that is better than the current one
    //
    HTMLbetterBreak: function (info,state) {
      if (this.isToken) {return false}  // FIXME: handle breaking of token elements
      if (this.isEmbellished()) {
        info.embellished = this;
        return this.CoreMO().HTMLbetterBreak(info,state);
      }
      if (this.linebreakContainer) {return false}
      //
      //  Get the current breakpoint position and other data
      //
      var index = info.index.slice(0), i = info.index.shift(),
          m = this.data.length, W, w, scanW, broken = (info.index.length > 0), better = false;
      if (i == null) {i = -1}; if (!broken) {i++; info.W += info.w; info.w = 0}
      scanW = info.scanW = info.W; info.nest++;
      //
      //  Look through the line for breakpoints,
      //    (as long as we are not too far past the breaking width)
      //
      while (i < m && info.scanW < 1.33*HTMLCSS.linebreakWidth) {
        if (this.data[i]) {
          if (this.data[i].HTMLbetterBreak(info,state)) {
            better = true; index = [i].concat(info.index); W = info.W; w = info.w;
            if (info.penalty === PENALTY.newline) {info.index = index; info.nest--; return true}
          }
          scanW = (broken ? info.scanW : this.HTMLaddWidth(i,info,scanW));
        }
        info.index = []; i++; broken = false;
      }
      info.nest--; info.index = index;
      if (better) {info.W = W; info.w = w}
      return better;
    },
    HTMLaddWidth: function (i,info,scanW) {
      if (this.data[i]) {
        var span = this.data[i].HTMLspanElement();
        scanW += span.bbox.w;
        if (span.style.paddingLeft)  {scanW += HTMLCSS.unEm(span.style.paddingLeft)}
        if (span.style.paddingRight) {scanW += HTMLCSS.unEm(span.style.paddingRight)}
        info.W = info.scanW = scanW; info.w = 0;
      }
      return scanW;
    },
    
    /****************************************************************/
    //
    //  Create a new line and move the required elements into it
    //  Position it using proper alignment and indenting
    //
    HTMLaddLine: function (stack,start,end,state,values,broken) {
      //
      //  Create a box for the line, with empty BBox
      //    fill it with the proper elements,
      //    and clean up the bbox
      //
      line = HTMLCSS.createBox(stack);
      line.bbox = this.HTMLemptyBBox({});
      state.first = broken; state.last = true;
      this.HTMLmoveLine(start,end,line,state,values);
      this.HTMLcleanBBox(line.bbox);
      //
      //  Get the alignment and shift values
      //
      var align = this.HTMLgetAlign(state,values),
          shift = this.HTMLgetShift(state,values,align);
      //
      //  Add in space for the shift
      //
      if (shift) {
        HTMLCSS.createBlank(line,shift,(align !== MML.INDENTALIGN.RIGHT));
        line.bbox.w += shift; line.bbox.rw += shift;
      }
      //
      //  Set the Y offset based on previous depth, leading, and current height
      //
      if (state.n > 0) {
        var LHD = HTMLCSS.FONTDATA.baselineskip * state.scale;
        var leading = (state.values.lineleading == null ? state.VALUES : state.values).lineleading;
        state.Y -= Math.max(LHD,state.d + line.bbox.h + leading);
      }
      //
      //  Place the new line
      //
      HTMLCSS.alignBox(line,align,state.Y);
      //
      //  Save the values needed for the future
      //
      state.d = line.bbox.d; state.values = values; state.n++;
    },
    
    /****************************************************************/
    //
    //  Get alignment and shift values from the given data
    //
    HTMLgetAlign: function (state,values) {
      var cur = values, prev = state.values, def = state.VALUES, align;
      if (state.n === 0)     {align = cur.indentalignfirst || prev.indentalignfirst || def.indentalignfirst}
      else if (state.isLast) {align = prev.indentalignlast || def.indentalignlast}
      else                   {align = prev.indentalign || def.indentalign}
      if (align === MML.INDENTALIGN.INDENTALIGN) {align = prev.indentalign || def.indentalign}
      if (align === MML.INDENTALIGN.AUTO) {align = (state.isTop ? this.displayAlign : MML.INDENTALIGN.LEFT)}
      return align;
    },
    HTMLgetShift: function (state,values,align) {
      if (align === MML.INDENTALIGN.CENTER) {return 0}
      var cur = values, prev = state.values, def = state.VALUES, shift;
      if (state.n === 0)     {shift = cur.indentshiftfirst || prev.indentshiftfirst || def.indentshiftfirst}
      else if (state.isLast) {shift = prev.indentshiftlast || def.indentshiftlast}
      else                   {shift = prev.indentshift || def.indentshift}
      if (shift === MML.INDENTSHIFT.INDENTSHIFT) {shift = prev.indentshift || def.indentshift}
      if (shift === "auto" || shift === "") {shift = (state.isTSop ? this.displayIndent : "0")}
      return HTMLCSS.length2em(shift,0);
    },
    
    /****************************************************************/
    //
    //  Move the selected elements into the new line's span,
    //    moving whole items when possible, and parts of ones
    //    that are split by a line break.
    //  
    HTMLmoveLine: function (start,end,span,state,values) {
      var i = start[0], j = end[0];
      if (i == null) {i = -1}; if (j == null) {j = this.data.length-1}
      if (i === j && start.length > 1) {
        //
        //  If starting and ending in the same element move the subpiece to the new line
        //
        this.data[i].HTMLmoveSlice(start.slice(1),end.slice(1),span,state,values,"paddingLeft");
      } else {
        //
        //  Otherwise, move the remainder of the initial item
        //  and any others up to the last one
        //
        var last = state.last; state.last = false;
        while (i < j) {
          if (this.data[i]) {
            if (start.length <= 1) {this.data[i].HTMLmoveSpan(span,state,values)}
              else {this.data[i].HTMLmoveSlice(start.slice(1),[],span,state,values,"paddingLeft")}
          }
          i++; state.first = false; start = [];
        }
        //
        //  If the last item is complete, move it,
        //    otherwise move the first part of it up to the split
        //
        state.last = last;
        if (this.data[i]) {
          if (end.length <= 1) {this.data[i].HTMLmoveSpan(span,state,values)}
            else {this.data[i].HTMLmoveSlice([],end.slice(1),span,state,values,"paddingRight")}
        }
      }
    },
    
    /****************************************************************/
    //
    //  Split an element and copy the selected items into the new part
    //
    HTMLmoveSlice: function (start,end,span,state,values,padding) {
      //
      //  Get rid of color, if any (added back in later)
      //  Create a new span for the slice of the element
      //  Move the selected portion into the slice
      //  If it is the last slice
      //    Remove the original (now empty) span
      //    Rename the Continue-0 span with the original name (for HTMLspanElement)
      //    Add back the color
      //
      this.HTMLremoveColor();
      var slice = this.HTMLcreateSliceSpan(span);
      this.HTMLmoveLine(start,end,slice,state,values);
      slice.style[padding] = "";
      this.HTMLcombineBBoxes(slice,span.bbox);
      this.HTMLcleanBBox(slice.bbox);
      if (end.length === 0) {
        span = this.HTMLspanElement();
        span.parentNode.removeChild(span);
        span.nextMathJaxSpan.id = span.id; var n = 0;
        while (span = span.nextMathJaxSpan) {
          var color = this.HTMLhandleColor(span);
          if (color) {color.id += "-MathJax-Continue-"+n; n++}
        }
      }
      return slice;
    },

    /****************************************************************/
    //
    //  Create a new span for an element that is split in two
    //    Clone the original and update its ID.
    //    Link the old span to the new one so we can find it later
    //
    HTMLcreateSliceSpan: function (span) {
      var SPAN = this.HTMLspanElement(), n = 0;
      var LAST = SPAN; while (LAST.nextMathJaxSpan) {LAST = LAST.nextMathJaxSpan; n++}
      var SLICE = SPAN.cloneNode(false); LAST.nextMathJaxSpan = SLICE; SLICE.nextMathJaxSpan = null;
      SLICE.id += "-MathJax-Continue-"+n;
      SLICE.bbox = this.HTMLemptyBBox({});
      return span.appendChild(SLICE);
    },
    
    /****************************************************************/
    //
    //  Move an element from its original span to its new location in
    //    a split element or the new line's span
    //
    HTMLmoveSpan: function (line,state,values) {
      // FIXME:  handle linebreakstyle === "duplicate"
      // FIXME:  handle linebreakmultchar
      if (!(state.first || state.last) ||
           (state.first && state.values.linebreakstyle === MML.LINEBREAKSTYLE.BEFORE) ||
           (state.last && values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER)) {
        //
        //  Move color and span
        //
	var color = document.getElementById("MathJax-Color-"+this.spanID+HTMLCSS.idPostfix);
        if (color) {line.appendChild(color)}
        var span = this.HTMLspanElement();
        line.appendChild(span);
        //
        //  If it is last, remove right padding
        //  If it is first, remove left padding and recolor
        //
        if (state.last) {span.style.paddingRight = ""}
        if (state.first || state.nextIsFirst) {
          delete state.nextIsFirst;
          span.style.paddingLeft = "";
          if (color) {this.HTMLremoveColor(span); this.HTMLhandleColor(span)}
        }
        //
        //  Update bounding box
        //
        this.HTMLcombineBBoxes(this,line.bbox);
      } else if (state.first) {state.nextIsFirst = true} else {delete state.nextIsFirst}
    }
  });

  /**************************************************************************/

  MML.mfenced.Augment({
    HTMLbetterBreak: function (info,state) {
      //
      //  Get the current breakpoint position and other data
      //
      var index = info.index.slice(0), i = info.index.shift(),
          m = this.data.length, W, w, scanW, broken = (info.index.length > 0), better = false;
      if (i == null) {i = -1}; if (!broken) {i++; info.W += info.w; info.w = 0}
      scanW = info.scanW = info.W; info.nest++;
      //
      //  Create indices that include the delimiters and separators
      //
      if (!this.dataI) {
        this.dataI = [];
        if (this.data.open) {this.dataI.push("open")}
        if (m) {this.dataI.push(0)}
        for (var j = 1; j < m; j++) {
          if (this.data["sep"+j]) {this.dataI.push("sep"+j)}
          this.dataI.push(j);
        }
        if (this.data.close) {this.dataI.push("close")}
      }
      m = this.dataI.length;
      //
      //  Look through the line for breakpoints, including the open, close, and separators
      //    (as long as we are not too far past the breaking width)
      //
      while (i < m && info.scanW < 1.33*HTMLCSS.linebreakWidth) {
        var k = this.dataI[i];
        if (this.data[k]) {
          if (this.data[k].HTMLbetterBreak(info,state)) {
            better = true; index = [i].concat(info.index); W = info.W; w = info.w;
            if (info.penalty === PENALTY.newline) {info.index = index; info.nest--; return true}
          }
          scanW = (broken ? info.scanW : this.HTMLaddWidth(i,info,scanW));
        }
        info.index = []; i++; broken = false;
      }
      info.nest--; info.index = index;
      if (better) {info.W = W; info.w = w}
      return better;
    },
    
    HTMLmoveLine: function (start,end,span,state,values) {
      var i = start[0], j = end[0];
      if (i == null) {i = -1}; if (j == null) {j = this.dataI.length-1}
      if (i === j && start.length > 1) {
        //
        //  If starting and ending in the same element move the subpiece to the new line
        //
        this.data[this.dataI[i]].HTMLmoveSlice(start.slice(1),end.slice(1),span,state,values,"paddingLeft");
      } else {
        //
        //  Otherwise, move the remainder of the initial item
        //  and any others (including open and separators) up to the last one
        //
        var last = state.last; state.last = false; var k = this.dataI[i];
        while (i < j) {
          if (this.data[k]) {
            if (start.length <= 1) {this.data[k].HTMLmoveSpan(span,state,values)}
              else {this.data[k].HTMLmoveSlice(start.slice(1),[],span,state,values,"paddingLeft")}
          }
          i++; k = this.dataI[i]; state.first = false; start = [];
        }
        //
        //  If the last item is complete, move it
        //
        state.last = last;
        if (this.data[k]) {
          if (end.length <= 1) {this.data[k].HTMLmoveSpan(span,state,values)}
            else {this.data[k].HTMLmoveSlice([],end.slice(1),span,state,values,"paddingRight")}
        }
      }
    }

  });
  
  /**************************************************************************/

  MML.msubsup.Augment({
    HTMLbetterBreak: function (info,state) {
      if (!this.data[this.base]) {return false}
      //
      //  Get the current breakpoint position and other data
      //
      var index = info.index.slice(0), i = info.index.shift(),
          W, w, scanW, broken = (info.index.length > 0), better = false;
      if (!broken) {info.W += info.w; info.w = 0}
      scanW = info.scanW = info.W;
      //
      //  Record the width of the base and the super- and subscripts
      //
      if (i == null) {
        this.HTMLbaseW = this.data[this.base].HTMLspanElement().bbox.w;
        this.HTMLdw = this.HTMLspanElement().bbox.w - this.HTMLbaseW;
      }
      //
      //  Check if the base can be broken
      //
      if (this.data[this.base].HTMLbetterBreak(info,state)) {
        better = true; index = [this.base].concat(info.index); W = info.W; w = info.w;
        if (info.penalty === PENALTY.newline) {better = broken = true}
      }
      //
      //  Add in the base if it is unbroken, and add the scripts
      //
      if (!broken) {this.HTMLaddWidth(this.base,info,scanW)}
      info.scanW += this.HTMLdw; info.W = info.scanW;
      info.index = []; if (better) {info.W = W; info.w = w; info.index = index}
      return better;
    },
    
    HTMLmoveLine: function (start,end,span,state,values) {
      //
      //  Move the proper part of the base
      //
      if (this.data[this.base]) {
        if (start.length > 1) {
          this.data[this.base].HTMLmoveSlice(start.slice(1),end.slice(1),span,state,values,"paddingLeft");
        } else {
          if (end.length <= 1) {this.data[this.base].HTMLmoveSpan(span,state,values)}
            else {this.data[this.base].HTMLmoveSlice([],end.slice(1),span,state,values,"paddingRight")}
        }
      }
      //
      //  If this is the end, check for super and subscripts, and move those
      //  by moving the stack tht contains them, and shifting by the amount of the
      //  base that has been removed.  Remove the empty base box from the stack.
      //
      if (end.length === 0) {
        var s = this.data[this.sup] || this.data[this.sub];
        if (s) {
          var box = s.HTMLspanElement().parentNode, stack = box.parentNode;
          if (this.data[this.base]) {stack.removeChild(stack.firstChild)}
	  for (box = stack.firstChild; box; box = box.nextSibling)
	    {box.style.left = HTMLCSS.Em(HTMLCSS.unEm(box.style.left)-this.HTMLbaseW)}
          stack.bbox.w -= this.HTMLbaseW; stack.style.width = HTMLCSS.Em(stack.bbox.w);
          this.HTMLcombineBBoxes(stack,span.bbox);
          span.appendChild(stack);
        }
      }
    }

  });
  
  /**************************************************************************/

  MML.mo.Augment({
    //
    //  Override the method for checking line breaks to properly handle <mo>
    //
    HTMLbetterBreak: function (info,state) {
      if (info.values && info.values.id === this.spanID) {return false}
      var values = this.getValues(
        "linebreak","linebreakstyle","lineleading","linebreakmultchar",
        "indentalign","indentshift",
        "indentalignfirst","indentshiftfirst",
        "indentalignlast","indentshiftlast",
        "texClass", "fence"
      );
      if (values.linebreakstyle === MML.LINEBREAKSTYLE.INFIXLINEBREAKSTYLE) 
        {values.linebreakstyle = this.Get("infixlinebreakstyle")}
      //
      //  Adjust nesting by TeX class (helps output that does not include
      //  mrows for nesting, but can leave these unbalanced.
      //
      if (values.texClass === MML.TEXCLASS.OPEN) {info.nest++}
      if (values.texClass === MML.TEXCLASS.CLOSE) {info.nest--}
      //
      //  Get the default penalty for this location
      //
      var W = info.scanW, mo = (info.embellished||this); delete info.embellished;
      var span = mo.HTMLspanElement(), w = span.bbox.w;
      if (span.style.paddingLeft) {w += HTMLCSS.unEm(span.style.paddingLeft)}
      if (values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER) {W += w; w = 0}
      if (W - info.shift === 0) {return false} // don't break at zero width (FIXME?)
      var offset = HTMLCSS.linebreakWidth - W;
      // Adjust offest for explicit first-line indent and align
      if (state.n === 0 && (values.indentshiftfirst !== state.VALUES.indentshiftfirst ||
          values.indentalignfirst !== state.VALUES.indentalignfirst)) {
        var align = this.HTMLgetAlign(state,values),
            shift = this.HTMLgetShift(state,values,align);
        offset += (info.shift - shift);
      }
      //
      var penalty = Math.floor(offset / HTMLCSS.linebreakWidth * 1000);
      if (penalty < 0) {penalty = PENALTY.toobig - 3*penalty}
      if (values.fence) {penalty += PENALTY.fence}
      if ((values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER &&
          values.texClass === MML.TEXCLASS.OPEN) ||
          values.texClass === MML.TEXCLASS.CLOSE) {penalty += PENALTY.close}
      penalty += info.nest * PENALTY.nestfactor;
      //
      //  Get the penalty for this type of break and
      //    use it to modify the default penalty
      //
      var linebreak = PENALTY[values.linebreak||MML.LINEBREAK.AUTO];
      if (!(linebreak instanceof Array)) {
        //  for breaks past the width, don't modify penalty
        if (offset >= 0) {penalty = linebreak * info.nest}
      } else {penalty = Math.max(1,penalty + linebreak[0] * info.nest)}
      //
      //  If the penalty is no better than the current one, return false
      //  Otherwise save the data for this breakpoint and return true
      //
      if (penalty >= info.penalty) {return false}
      info.penalty = penalty; info.values = values; info.W = W; info.w = w;
      values.lineleading = HTMLCSS.length2em(values.lineleading,state.VALUES.lineleading);
      values.id = this.spanID;
      return true;
    }
  });
  
  /**************************************************************************/

  MML.mspace.Augment({
    //
    //  Override the method for checking line breaks to properly handle <mspace>
    //
    HTMLbetterBreak: function (info,state) {
      if (info.values && info.values.id === this.spanID) {return false}
      var values = this.getValues("linebreak");
      //
      //  Get the default penalty for this location
      //
      var W = info.scanW, span = this.HTMLspanElement(), w = span.bbox.w;
      if (span.style.paddingLeft) {w += HTMLCSS.unEm(span.style.paddingLeft)}
      if (W - info.shift === 0) {return false} // don't break at zero width (FIXME?)
      var offset = HTMLCSS.linebreakWidth - W;
      //
      var penalty = Math.floor(offset / HTMLCSS.linebreakWidth * 1000);
      if (penalty < 0) {penalty = PENALTY.toobig - 3*penalty}
      penalty += info.nest * PENALTY.nestfactor;
      //
      //  Get the penalty for this type of break and
      //    use it to modify the default penalty
      //
      var linebreak = PENALTY[values.linebreak||MML.LINEBREAK.AUTO];
      if (values.linebreak === MML.LINEBREAK.AUTO && w >= PENALTY.spacelimit)
        {linebreak = [(w+PENALTY.spaceoffset)*PENALTY.spacefactor]}
      if (!(linebreak instanceof Array)) {
        //  for breaks past the width, don't modify penalty
        if (offset >= 0) {penalty = linebreak * info.nest}
      } else {penalty = Math.max(1,penalty + linebreak[0] * info.nest)}
      //
      //  If the penalty is no better than the current one, return false
      //  Otherwise save the data for this breakpoint and return true
      //
      if (penalty >= info.penalty) {return false}
      info.penalty = penalty; info.values = values; info.W = W; info.w = w;
      values.lineleading = state.VALUES.lineleading;
      values.linebreakstyle = "before"; values.id = this.spanID;
      return true;
    }
  });
  
  //
  //  Hook into the mathchoice extension
  //
  MathJax.Hub.Register.StartupHook("TeX mathchoice Ready",function () {
    MML.TeXmathchoice.Augment({
      HTMLbetterBreak: function (info,state) {
        return this.Core().HTMLbetterBreak(info,state);
      },
      HTMLmoveLine: function (start,end,span,state,values) {
        return this.Core().HTMLmoveSlice(start,end,span,state,values);
      }
    });
  });
  
  //
  //  Have maction process only the selected item
  //
  MML.maction.Augment({
    HTMLbetterBreak: function (info,state) {
      return this.Core().HTMLbetterBreak(info,state);
    },
    HTMLmoveLine: function (start,end,span,state,values) {
      return this.Core().HTMLmoveSlice(start,end,span,state,values);
    },
    //
    //  Split and move the hit boxes as well
    //
    HTMLmoveSlice: function (start,end,span,state,values,padding) {
      var hitbox = document.getElementById("MathJax-HitBox-"+this.spanID+HTMLCSS.idPostfix);
      if (hitbox) {hitbox.parentNode.removeChild(hitbox)}
      var slice = this.SUPER(arguments).HTMLmoveSlice.apply(this,arguments);
      if (end.length === 0) {
        span = this.HTMLspanElement(); var n = 0;
        while (span) {
          hitbox = this.HTMLhandleHitBox(span,"-Continue-"+n);
          span = span.nextMathJaxSpan; n++;
        }
      }
      return slice;
    }
  });
  
  //
  //  Have semantics only do the first element
  //  (FIXME:  do we need to do anything special about annotation-xml?)
  //
  MML.semantics.Augment({
    HTMLbetterBreak: function (info,state) {
      return (this.data[0] ? this.data[0].HTMLbetterBreak(info,state) : false);
    },
    HTMLmoveLine: function (start,end,span,state,values) {
      return (this.data[0] ? this.data[0].HTMLmoveSlice(start,end,span,state,values) : null);
    }
  });
  
  /**************************************************************************/

  MathJax.Hub.Startup.signal.Post("HTML-CSS multiline Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/multiline.js");
  
});

