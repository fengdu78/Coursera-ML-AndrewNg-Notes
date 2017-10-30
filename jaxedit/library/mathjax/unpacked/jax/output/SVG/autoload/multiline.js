/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/multiline.js
 *  
 *  Implements the SVG output for <mrow>'s that contain line breaks.
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
      SVG = MathJax.OutputJax.SVG,
      BBOX = SVG.BBOX;
      
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
  
  MML.mrow.Augment({
    //
    // Handle breaking an mrow into separate lines
    //
    SVGmultiline: function (svg) {

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
      VALUES.lineleading = SVG.length2em(VALUES.lineleading,1,0.5);

      //
      //  Start with a fresh SVG element
      //  and make it full width if we are breaking to a specific width
      //
      svg = this.SVG();
      if (SVG.linebreakWidth < SVG.BIGDIMEN) {svg.w = SVG.linebreakWidth}
        else {svg.w = SVG.cwidth/SVG.em * 1000}

      var state = {
            n: 0, Y: 0,
            scale: this.SVGgetScale(),
            isTop: isTop,
            values: {},
            VALUES: VALUES
          },
          align = this.SVGgetAlign(state,{}),
          shift = this.SVGgetShift(state,{},align),
          start = [],
          end = {
            index:[], penalty:PENALTY.nobreak,
            w:0, W:shift, shift:shift, scanW:shift,
            nest: 0
          },
          broken = false;
          
      //
      //  Break the expression at its best line breaks
      //
      while (this.SVGbetterBreak(end,state) && 
             (end.scanW >= SVG.linebreakWidth || end.penalty == PENALTY.newline)) {
        this.SVGaddLine(svg,start,end.index,state,end.values,broken);
        start = end.index.slice(0); broken = true;
        align = this.SVGgetAlign(state,end.values);
        shift = this.SVGgetShift(state,end.values,align);
        if (align === MML.INDENTALIGN.CENTER) {shift = 0}
        end.W = end.shift = end.scanW = shift; end.penalty = PENALTY.nobreak;
      }
      state.isLast = true;
      this.SVGaddLine(svg,start,[],state,ENDVALUES,broken);

      this.SVGhandleSpace(svg);
      this.SVGhandleColor(svg);
      svg.isMultiline = true;

      this.SVGsaveData(svg);
      return svg;
    }
  });
  
  /**************************************************************************/

  MML.mbase.Augment({
    SVGlinebreakPenalty: PENALTY,

    /****************************************************************/
    //
    //  Locate the next linebreak that is better than the current one
    //
    SVGbetterBreak: function (info,state) {
      if (this.isToken) {return false}  // FIXME: handle breaking of token elements
      if (this.isEmbellished()) {
        info.embellished = this;
        return this.CoreMO().SVGbetterBreak(info,state);
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
      while (i < m && info.scanW < 1.33*SVG.linebreakWidth) {
        if (this.data[i]) {
          if (this.data[i].SVGbetterBreak(info,state)) {
            better = true; index = [i].concat(info.index); W = info.W; w = info.w;
            if (info.penalty === PENALTY.newline) {info.index = index; info.nest--; return true}
          }
          scanW = (broken ? info.scanW : this.SVGaddWidth(i,info,scanW));
        }
        info.index = []; i++; broken = false;
      }
      info.nest--; info.index = index;
      if (better) {info.W = W}
      return better;
    },
    SVGaddWidth: function (i,info,scanW) {
      if (this.data[i]) {
        var svg = this.data[i].SVGdata;
        scanW += svg.w + svg.x; if (svg.X) {scanW += svg.X}
        info.W = info.scanW = scanW; info.w = 0;
      }
      return scanW;
    },
    
    /****************************************************************/
    //
    //  Create a new line and move the required elements into it
    //  Position it using proper alignment and indenting
    //
    SVGaddLine: function (svg,start,end,state,values,broken) {
      //
      //  Create a box for the line, with empty BBox
      //    fill it with the proper elements,
      //    and clean up the bbox
      //
      var line = BBOX();
      state.first = broken; state.last = true;
      this.SVGmoveLine(start,end,line,state,values);
      line.Clean();
      //
      //  Get the alignment and shift values
      //
      var align = this.SVGgetAlign(state,values),
          shift = this.SVGgetShift(state,values,align);
      //
      //  Add in space for the shift
      //
      if (shift) {
        if (align === MML.INDENTALIGN.LEFT)  {line.x = shift} else
        if (align === MML.INDENTALIGN.RIGHT) {line.w += shift; line.r = line.w}
      }
      //
      //  Set the Y offset based on previous depth, leading, and current height
      //
      if (state.n > 0) {
        var LHD = SVG.FONTDATA.baselineskip * state.scale;
        var leading = (state.values.lineleading == null ? state.VALUES : state.values).lineleading;
        state.Y -= Math.max(LHD,state.d + line.h + leading);
      }
      //
      //  Place the new line
      //
      svg.Align(line,align,0,state.Y);
      //
      //  Save the values needed for the future
      //
      state.d = line.d; state.values = values; state.n++;
    },
    
    /****************************************************************/
    //
    //  Get alignment and shift values from the given data
    //
    SVGgetAlign: function (state,values) {
      var cur = values, prev = state.values, def = state.VALUES, align;
      if (state.n === 0)     {align = cur.indentalignfirst || prev.indentalignfirst || def.indentalignfirst}
      else if (state.isLast) {align = prev.indentalignlast || def.indentalignlast}
      else                   {align = prev.indentalign || def.indentalign}
      if (align === MML.INDENTALIGN.INDENTALIGN) {align = prev.indentalign || def.indentalign}
      if (align === MML.INDENTALIGN.AUTO) {align = (state.isTop ? this.displayAlign : MML.INDENTALIGN.LEFT)}
      return align;
    },
    SVGgetShift: function (state,values,align) {
      if (align === MML.INDENTALIGN.CENTER) {return 0}
      var cur = values, prev = state.values, def = state.VALUES, shift;
      if (state.n === 0)     {shift = cur.indentshiftfirst || prev.indentshiftfirst || def.indentshiftfirst}
      else if (state.isLast) {shift = prev.indentshiftlast || def.indentshiftlast}
      else                   {shift = prev.indentshift || def.indentshift}
      if (shift === MML.INDENTSHIFT.INDENTSHIFT) {shift = prev.indentshift || def.indentshift}
      if (shift === "auto" || shift === "") {shift = (state.isTSop ? this.displayIndent : "0")}
      return SVG.length2em(shift,0);
    },
    
    /****************************************************************/
    //
    //  Move the selected elements into the new line,
    //    moving whole items when possible, and parts of ones
    //    that are split by a line break.
    //  
    SVGmoveLine: function (start,end,svg,state,values) {
      var i = start[0], j = end[0];
      if (i == null) {i = -1}; if (j == null) {j = this.data.length-1}
      if (i === j && start.length > 1) {
        //
        //  If starting and ending in the same element move the subpiece to the new line
        //
        this.data[i].SVGmoveSlice(start.slice(1),end.slice(1),svg,state,values,"paddingLeft");
      } else {
        //
        //  Otherwise, move the remainder of the initial item
        //  and any others up to the last one
        //
        var last = state.last; state.last = false;
        while (i < j) {
          if (this.data[i]) {
            if (start.length <= 1) {this.data[i].SVGmove(svg,state,values)}
              else {this.data[i].SVGmoveSlice(start.slice(1),[],svg,state,values,"paddingLeft")}
          }
          i++; state.first = false; start = [];
        }
        //
        //  If the last item is complete, move it,
        //    otherwise move the first part of it up to the split
        //
        state.last = last;
        if (this.data[i]) {
          if (end.length <= 1) {this.data[i].SVGmove(svg,state,values)}
            else {this.data[i].SVGmoveSlice([],end.slice(1),svg,state,values,"paddingRight")}
        }
      }
    },
    
    /****************************************************************/
    //
    //  Split an element and copy the selected items into the new part
    //
    SVGmoveSlice: function (start,end,svg,state,values,padding) {
      //
      //  Create a new container for the slice of the element
      //  Move the selected portion into the slice
      //
      var slice = BBOX();
      this.SVGmoveLine(start,end,slice,state,values);
      slice.Clean();
      this.SVGhandleColor(slice);
      svg.Add(slice,svg.w,0,true);
      return slice;
    },

    /****************************************************************/
    //
    //  Move an element from its original position to its new location in
    //    a split element or the new line's position
    //
    SVGmove: function (line,state,values) {
      // FIXME:  handle linebreakstyle === "duplicate"
      // FIXME:  handle linebreakmultchar
      if (!(state.first || state.last) ||
           (state.first && state.values.linebreakstyle === MML.LINEBREAKSTYLE.BEFORE) ||
           (state.last && values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER)) {
        //
        //  Recreate output
        //  Remove padding (if first, remove at right, if last remove at left)
        //  Add to line
        //
        var svg = this.toSVG(this.SVGdata.HW,this.SVGdata.D);
        if (state.last) {svg.x = 0}
        if (state.first || state.nextIsFirst) {delete state.nextIsFirst; if (svg.X) {svg.X = 0}}
        line.Add(svg,line.w,0,true);
      } else if (state.first) {state.nextIsFirst = true} else {delete state.nextIsFirst}
    }
  });
      
  /**************************************************************************/

  MML.mfenced.Augment({
    SVGbetterBreak: function (info,state) {
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
      while (i < m && info.scanW < 1.33*SVG.linebreakWidth) {
        var k = this.dataI[i];
        if (this.data[k]) {
          if (this.data[k].SVGbetterBreak(info,state)) {
            better = true; index = [i].concat(info.index); W = info.W; w = info.w;
            if (info.penalty === PENALTY.newline) {info.index = index; info.nest--; return true}
          }
          scanW = (broken ? info.scanW : this.SVGaddWidth(i,info,scanW));
        }
        info.index = []; i++; broken = false;
      }
      info.nest--; info.index = index;
      if (better) {info.W = W; info.w = w}
      return better;
    },

    SVGmoveLine: function (start,end,svg,state,values) {
      var i = start[0], j = end[0];
      if (i == null) {i = -1}; if (j == null) {j = this.dataI.length-1}
      if (i === j && start.length > 1) {
        //
        //  If starting and ending in the same element move the subpiece to the new line
        //
        this.data[this.dataI[i]].SVGmoveSlice(start.slice(1),end.slice(1),svg,state,values,"paddingLeft");
      } else {
        //
        //  Otherwise, move the remainder of the initial item
        //  and any others (including open and separators) up to the last one
        //
        var last = state.last; state.last = false; var k = this.dataI[i];
        while (i < j) {
          if (this.data[k]) {
            if (start.length <= 1) {this.data[k].SVGmove(svg,state,values)}
              else {this.data[k].SVGmoveSlice(start.slice(1),[],svg,state,values,"paddingLeft")}
          }
          i++; k = this.dataI[i]; state.first = false; start = [];
        }
        //
        //  If the last item is complete, move it
        //
        state.last = last;
        if (this.data[k]) {
          if (end.length <= 1) {this.data[k].SVGmove(svg,state,values)}
            else {this.data[k].SVGmoveSlice([],end.slice(1),svg,state,values,"paddingRight")}
        }
      }
    }
    
  });
  
  /**************************************************************************/

  MML.msubsup.Augment({
    SVGbetterBreak: function (info,state) {
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
      if (i == null) {this.SVGdata.dw = this.SVGdata.w - this.data[this.base].SVGdata.w}
      //
      //  Check if the base can be broken
      //
      if (this.data[this.base].SVGbetterBreak(info,state)) {
        better = true; index = [this.base].concat(info.index); W = info.W; w = info.w;
        if (info.penalty === PENALTY.newline) {better = broken = true}
      }
      //
      //  Add in the base if it is unbroken, and add the scripts
      //
      if (!broken) {this.SVGaddWidth(this.base,info,scanW)}
      info.scanW += this.SVGdata.dw; info.W = info.scanW;
      info.index = []; if (better) {info.W = W; info.w = w; info.index = index}
      return better;
    },
    
    SVGmoveLine: function (start,end,svg,state,values) {
      //
      //  Move the proper part of the base
      //
      if (this.data[this.base]) {
        if (start.length > 1) {
          this.data[this.base].SVGmoveSlice(start.slice(1),end.slice(1),svg,state,values,"paddingLeft");
        } else {
          if (end.length <= 1) {this.data[this.base].SVGmove(svg,state,values)}
            else {this.data[this.base].SVGmoveSlice([],end.slice(1),svg,state,values,"paddingRight")}
        }
      }
      //
      //  If this is the end, check for super and subscripts, and move those
      //  by moving the stack tht contains them, and shifting by the amount of the
      //  base that has been removed.  Remove the empty base box from the stack.
      //
      if (end.length === 0) {
        var sup = this.data[this.sup], sub = this.data[this.sub], w = svg.w, data;
        if (sup) {data = sup.SVGdata; svg.Add(sup.toSVG(),w+(data.dx||0),data.dy)}
        if (sub) {data = sub.SVGdata; svg.Add(sub.toSVG(),w+(data.dx||0),data.dy)}
      }
    }

  });
  
  /**************************************************************************/

  MML.mo.Augment({
    //
    //  Override the method for checking line breaks to properly handle <mo>
    //
    SVGbetterBreak: function (info,state) {
      if (info.values && info.values.last === this) {return false}
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
      var svg = mo.SVGdata, w = svg.w + svg.x;
      if (values.linebreakstyle === MML.LINEBREAKSTYLE.AFTER) {W += w; w = 0}
      if (W - info.shift === 0) {return false} // don't break at zero width (FIXME?)
      var offset = SVG.linebreakWidth - W;
      // adjust offest for explicit first-line indent and align
      if (state.n === 0 && (values.indentshiftfirst !== state.VALUES.indentshiftfirst ||
          values.indentalignfirst !== state.VALUES.indentalignfirst)) {
        var align = this.SVGgetAlign(state,values),
            shift = this.SVGgetShift(state,values,align);
        offset += (info.shift - shift);
      }
      //
      var penalty = Math.floor(offset / SVG.linebreakWidth * 1000);
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
      values.lineleading = SVG.length2em(values.lineleading,state.VALUES.lineleading);
      values.last = this;
      return true;
    }
  });
  
  /**************************************************************************/

  MML.mspace.Augment({
    //
    //  Override the method for checking line breaks to properly handle <mspace>
    //
    SVGbetterBreak: function (info,state) {
      if (info.values && info.values.last === this) {return false}
      var values = this.getValues("linebreak");
      //
      //  Get the default penalty for this location
      //
      var W = info.scanW, svg = this.SVGdata, w = svg.w + svg.x;
      if (W - info.shift === 0) {return false} // don't break at zero width (FIXME?)
      var offset = SVG.linebreakWidth - W;
      //
      var penalty = Math.floor(offset / SVG.linebreakWidth * 1000);
      if (penalty < 0) {penalty = PENALTY.toobig - 3*penalty}
      penalty += info.nest * PENALTY.nestfactor;
      //
      //  Get the penalty for this type of break and
      //    use it to modify the default penalty
      //
      var linebreak = PENALTY[values.linebreak||MML.LINEBREAK.AUTO];
      if (values.linebreak === MML.LINEBREAK.AUTO && w >= PENALTY.spacelimit*1000)
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
      values.linebreakstyle = "before"; values.last = this;
      return true;
    }
  });
  
  //
  //  Hook into the mathchoice extension
  //
  MathJax.Hub.Register.StartupHook("TeX mathchoice Ready",function () {
    MML.TeXmathchoice.Augment({
      SVGbetterBreak: function (info,state) {
        return this.Core().SVGbetterBreak(info,state);
      },
      SVGmoveLine: function (start,end,svg,state,values) {
        return this.Core().SVGmoveSlice(start,end,svg,state,values);
      }
    });
  });
  
  //
  //  Have maction process only the selected item
  //
  MML.maction.Augment({
    SVGbetterBreak: function (info,state) {
      return this.Core().SVGbetterBreak(info,state);
    },
    SVGmoveLine: function (start,end,svg,state,values) {
      return this.Core().SVGmoveSlice(start,end,svg,state,values);
    },
  });
  
  //
  //  Have semantics only do the first element
  //  (FIXME:  do we need to do anything special about annotation-xml?)
  //
  MML.semantics.Augment({
    SVGbetterBreak: function (info,state) {
      return (this.data[0] ? this.data[0].SVGbetterBreak(info,state) : false);
    },
    SVGmoveLine: function (start,end,svg,state,values) {
      return (this.data[0] ? this.data[0].SVGmoveSlice(start,end,svg,state,values) : null);
    }
  });
  
  /**************************************************************************/

  MathJax.Hub.Startup.signal.Post("SVG multiline Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/multiline.js");
  
});

