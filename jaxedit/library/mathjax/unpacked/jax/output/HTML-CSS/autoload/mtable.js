/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/mtable.js
 *  
 *  Implements the HTML-CSS output for <mtable> elements.
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
  
  MML.mtable.Augment({
    toHTML: function (span) {
      span = this.HTMLcreateSpan(span);
      if (this.data.length === 0) {return span}
      var values = this.getValues("columnalign","rowalign","columnspacing","rowspacing",
                                  "columnwidth","equalcolumns","equalrows",
                                  "columnlines","rowlines","frame","framespacing",
                                  "align","useHeight","width","side","minlabelspacing");
      var hasRelativeWidth = values.width.match(/%$/);
      var stack = HTMLCSS.createStack(span);
      var scale = this.HTMLgetScale(), mu = this.HTMLgetMu(span), LABEL = -1;

      var H = [], D = [], W = [], A = [], C = [], i, j, J = -1, m, M, s, row, cell, mo, entries = [];
      var LHD = HTMLCSS.FONTDATA.baselineskip * scale * values.useHeight, HD,
          LH = HTMLCSS.FONTDATA.lineH * scale, LD = HTMLCSS.FONTDATA.lineD * scale;

      //
      //  Create cells and measure columns and rows
      //
      for (i = 0, m = this.data.length; i < m; i++) {
        row = this.data[i]; s = (row.type === "mlabeledtr" ? LABEL : 0);
        A[i] = []; H[i] = D[i] = 0;
        for (j = s, M = row.data.length + s; j < M; j++) {
          if (W[j] == null) {
            if (j > J) {J = j}
            C[j] = HTMLCSS.createStack(HTMLCSS.createBox(stack));
            W[j] = -HTMLCSS.BIGDIMEN;
          }
          A[i][j] = HTMLCSS.createBox(C[j]);
          entries.push(row.data[j-s].toHTML(A[i][j]));
        }
      }
      HTMLCSS.MeasureSpans(entries);
      for (i = 0, m = this.data.length; i < m; i++) {
        row = this.data[i]; s = (row.type === "mlabeledtr" ? LABEL : 0);
        for (j = s, M = row.data.length + s; j < M; j++) {
          cell = row.data[j-s];
          if (cell.isMultiline) {A[i][j].style.width = "100%"}
          if (cell.isEmbellished()) {
            mo = cell.CoreMO();
            var min = mo.Get("minsize",true);
            if (min) {
              var bbox = mo.HTMLspanElement().bbox;
              if (mo.HTMLcanStretch("Vertical")) {
                HD = bbox.h + bbox.d;
                if (HD) {
                  min = HTMLCSS.length2em(min,mu,HD);
                  if (min*bbox.h/HD > H[j]) {H[j] = min*bbox.h/HD}
                  if (min*bbox.d/HD > D[j]) {D[j] = min*bbox.d/HD}
                }
              } else if (mo.HTMLcanStretch("Horizontal")) {
                min = HTMLCSS.length2em(min,mu,bbox.w);
                if (min > W[j]) {W[j] = min}
              }
            }
          }
          if (A[i][j].bbox.h > H[i]) {H[i] = A[i][j].bbox.h}
          if (A[i][j].bbox.d > D[i]) {D[i] = A[i][j].bbox.d}
          if (A[i][j].bbox.w > W[j]) {W[j] = A[i][j].bbox.w}
        }
      }
      if (H[0]+D[0]) {H[0] = Math.max(H[0],LH)}
      if (H[A.length-1]+D[A.length-1]) {D[A.length-1] = Math.max(D[A.length-1],LD)}

      //
      //  Determine spacing and alignment
      //
      var CSPACE = values.columnspacing.split(/ /),
          RSPACE = values.rowspacing.split(/ /),
          CALIGN = values.columnalign.split(/ /),
          RALIGN = values.rowalign.split(/ /),
          CLINES = values.columnlines.split(/ /),
          RLINES = values.rowlines.split(/ /),
          CWIDTH = values.columnwidth.split(/ /),
          RCALIGN = [];
      for (i = 0, m = CSPACE.length; i < m; i++) {CSPACE[i] = HTMLCSS.length2em(CSPACE[i],mu)}
      for (i = 0, m = RSPACE.length; i < m; i++) {RSPACE[i] = HTMLCSS.length2em(RSPACE[i],mu)}
      while (CSPACE.length <  J) {CSPACE.push(CSPACE[CSPACE.length-1])}
      while (CALIGN.length <= J) {CALIGN.push(CALIGN[CALIGN.length-1])}
      while (CLINES.length <  J) {CLINES.push(CLINES[CLINES.length-1])}
      while (CWIDTH.length <= J) {CWIDTH.push(CWIDTH[CWIDTH.length-1])}
      while (RSPACE.length <  A.length) {RSPACE.push(RSPACE[RSPACE.length-1])}
      while (RALIGN.length <= A.length) {RALIGN.push(RALIGN[RALIGN.length-1])}
      while (RLINES.length <  A.length) {RLINES.push(RLINES[RLINES.length-1])}
      if (C[LABEL]) {
        CALIGN[LABEL] = (values.side.substr(0,1) === "l" ? "left" : "right");
        CSPACE[LABEL] = -W[LABEL];
      }
      //
      //  Override row data
      //
      for (i = 0, m = A.length; i < m; i++) {
        row = this.data[i]; RCALIGN[i] = [];
        if (row.rowalign) {RALIGN[i] = row.rowalign}
        if (row.columnalign) {
          RCALIGN[i] = row.columnalign.split(/ /);
          while (RCALIGN[i].length <= J) {RCALIGN[i].push(RCALIGN[i][RCALIGN[i].length-1])}
        }
      }

      //
      //  Handle equal heights
      //
      if (values.equalrows) {
        // FIXME:  should really be based on row align (below is for baseline)
        var Hm = Math.max.apply(Math,H), Dm = Math.max.apply(Math,D);
        for (i = 0, m = A.length; i < m; i++)
          {s = ((Hm + Dm) - (H[i] + D[i])) / 2;  H[i] += s; D[i] += s}
      }

      //  FIXME:  do background colors for entire cell (include half the intercolumn space?)
      
      //
      //  Determine array total height
      //
      HD = H[0] + D[A.length-1];
      for (i = 0, m = A.length-1; i < m; i++) {HD += Math.max((H[i]+D[i] ? LHD : 0),D[i]+H[i+1]+RSPACE[i])}
      //
      //  Determine frame and line sizes
      //
      var fx = 0, fy = 0, fW, fH = HD;
      if (values.frame !== "none" ||
         (values.columnlines+values.rowlines).match(/solid|dashed/)) {
        fx = HTMLCSS.length2em(values.framespacing.split(/[, ]+/)[0],mu);
        fy = HTMLCSS.length2em(values.framespacing.split(/[, ]+/)[1],mu);
        fH = HD + 2*fy; // fW waits until stack.bbox.w is determined
      }
      //
      //  Compute alignment
      //
      var Y, fY, n = "";
      if (typeof(values.align) !== "string") {values.align = String(values.align)}
      if (values.align.match(/(top|bottom|center|baseline|axis)( +(-?\d+))?/))
        {n = RegExp.$3; values.align = RegExp.$1} else {values.align = this.defaults.align}
      if (n !== "") {
        //
        //  Find the height of the given row
        //
        n = parseInt(n);
        if (n < 0) {n = A.length + 1 + n}
        if (n < 1) {n = 1} else if (n > A.length) {n = A.length}
        Y = 0; fY = -(HD + fy) + H[0];
        for (i = 0, m = n-1; i < m; i++) {
          // FIXME:  Should handle values.align for final row
          var dY = Math.max((H[i]+D[i] ? LHD : 0),D[i]+H[i+1]+RSPACE[i]);
          Y += dY; fY += dY;
        }
      } else {
        Y = ({
          top:    -(H[0] + fy),
          bottom:   HD + fy - H[0],
          center:   HD/2 - H[0],
          baseline: HD/2 - H[0],
          axis:     HD/2 + HTMLCSS.TeX.axis_height*scale - H[0]
        })[values.align];
        fY = ({
          top:      -(HD + 2*fy),
          bottom:   0,
          center:   -(HD/2 + fy),
          baseline: -(HD/2 + fy),
          axis:     HTMLCSS.TeX.axis_height*scale - HD/2 - fy
        })[values.align];
      }
            
      var WW, WP = 0, Wt = 0, Wp = 0, p = 0, f = 0, P = [], F = [], Wf = 1;
      //
      if (values.equalcolumns && values.width !== "auto") {
        //
        //  Handle equalcolumns for percent-width and fixed-width tables
        //
        if (hasRelativeWidth) {
          //  Set widths to percentages
          WW = (100/(J+1)).toFixed(2).replace(/\.?0+$/,"")+"%";
          for (i = 0, m = Math.min(J+1,CWIDTH.length); i < m; i++) {CWIDTH[i] = WW}
          //  Get total column spacing
          WW = 0; WP = 1; f = J+1;
          for (i = 0, m = Math.min(J+1,CSPACE.length); i < m; i++) {WW += CSPACE[i]}
        } else {
          //  Get total width minus column spacing
          WW = HTMLCSS.length2em(values.width,mu);
          for (i = 0, m = Math.min(J+1,CSPACE.length); i < m; i++) {WW -= CSPACE[i]}
          //  Determine individual column widths
          WW /= J+1;
          for (i = 0, m = Math.min(J+1,CWIDTH.length); i < m; i++) {W[i] = WW}
        }
      } else {
        //
        //  Get column widths for fit and percentage columns
        //
        //  Calculate the natural widths and percentage widths,
        //    while keeping track of the fit and percentage columns
        for(i = 0, m = Math.min(J+1,CWIDTH.length); i < m; i++) {
          if (CWIDTH[i] === "auto") {Wt += W[i]}
          else if (CWIDTH[i] === "fit") {F[f] = i; f++; Wt += W[i]}
          else if (CWIDTH[i].match(/%$/))
            {P[p] = i; p++; Wp += W[i]; WP += HTMLCSS.length2em(CWIDTH[i],mu,1)}
          else {W[i] = HTMLCSS.length2em(CWIDTH[i],mu); Wt += W[i]}
        }
        if (hasRelativeWidth) {
          // Get separation width and check percentages
          WW = 0; for (i = 0, m = Math.min(J,CSPACE.length); i < m; i++) {WW += CSPACE[i]}
          if (WP > .98) {Wf = .98/WP; WP = .98}
        } else {
          // Get the full width (excluding inter-column spacing)
          if (values.width === "auto") {
            if (WP > .98) {Wf = Wp/(Wt+Wp); WW = Wt + Wp} else {WW = Wt / (1-WP)}
          } else {
            WW = HTMLCSS.length2em(values.width,mu);
            for (i = 0, m = Math.min(J+1,CSPACE.length); i < m; i++) {WW -= CSPACE[i]}
          }
          //  Determine the relative column widths
          for (i = 0, m = P.length; i < m; i++) {
            W[P[i]] = HTMLCSS.length2em(CWIDTH[P[i]],mu,WW*Wf); Wt += W[P[i]];
          }
          //  Stretch fit columns, if any, otherwise stretch (or shrink) everything
          if (Math.abs(WW - Wt) > .01) {
            if (f && WW > Wt) {
              WW = (WW - Wt) / f; for (i = 0, m = F.length; i < m; i++) {W[F[i]] += WW}
            } else {WW = WW/Wt; for (j = 0; j <= J; j++) {W[j] *= WW}}
          }
          //
          //  Handle equal columns
          //
          if (values.equalcolumns) {
            var Wm = Math.max.apply(Math,W);
            for (j = 0; j <= J; j++) {W[j] = Wm}
          }
        }
      }
      
      //
      //  Lay out array columns
      //
      var y = Y, dy, line, align; s = (C[LABEL] ? LABEL : 0);
      for (j = s; j <= J; j++) {
        for (i = 0, m = A.length; i < m; i++) {
          if (A[i][j]) {
            s = (this.data[i].type === "mlabeledtr" ? LABEL : 0);
            cell = this.data[i].data[j-s];
            if (cell.HTMLcanStretch("Horizontal")) {
              A[i][j].bbox = cell.HTMLstretchH(C[j],W[j]).bbox;
            } else if (cell.HTMLcanStretch("Vertical")) {
              mo = cell.CoreMO();
              var symmetric = mo.symmetric; mo.symmetric = false;
              A[i][j].bbox = cell.HTMLstretchV(C[j],H[i],D[i]).bbox; A[i][j].HH = null;
              mo.symmetric = symmetric;
            }
            align = cell.rowalign||this.data[i].rowalign||RALIGN[i];
            dy = ({top:    H[i] - A[i][j].bbox.h,
                   bottom: A[i][j].bbox.d - D[i],
                   center: ((H[i]-D[i]) - (A[i][j].bbox.h-A[i][j].bbox.d))/2,
                   baseline: 0, axis: 0})[align] || 0; // FIXME:  handle axis better?
            align = (cell.columnalign||RCALIGN[i][j]||CALIGN[j]);
            HTMLCSS.alignBox(A[i][j],align,y+dy);
          }
          if (i < A.length-1) {y -= Math.max((H[i]+D[i] ? LHD : 0),D[i]+H[i+1]+RSPACE[i])}
        }
        y = Y;
      }

      //
      //  Set column widths and placement
      //
      if (hasRelativeWidth) {
        //
        //  Remove column spacing to get width available for columns
        //
        var box = HTMLCSS.createBox(stack); box.style.left = box.style.top = 0;
        box.style.right = HTMLCSS.Em(WW+2*fx); box.style.display = "inline-block";
        box.style.height = "0px";
        if (HTMLCSS.msieRelativeWidthBug) {
          box = HTMLCSS.createBox(box); box.style.position = "relative";
          box.style.height = "1em"; box.style.width = "100%"; box.bbox = stack.bbox;
        }
        //
        //  wp = remaining width (%) divided by the number of columns it is split over
        //  wm = remaining width (fixed) divided by the number of columns it is split over
        //
        var xp = 0, xf = fx, wp, wm;
        if (f) {wp = 100*(1-WP)/f, wm = Wt/f} else {wp = 100*(1-WP)/(J+1); wm = Wt/(J+1)}
        for (j = 0; j <= J; j++) {
          HTMLCSS.placeBox(C[j].parentNode,0,0); // sets the bbox
          //
          //  Convert original column to the innermost span in the mobile column
          //
          C[j].style.position = "relative";
          C[j].style.left = HTMLCSS.Em(xf);
          C[j].style.width = "100%";
          C[j].parentNode.parentNode.removeChild(C[j].parentNode);
          var Cj = HTMLCSS.createBox(box); HTMLCSS.addBox(Cj,C[j]); C[j] = Cj;
          var CjStyle = Cj.style; CjStyle.display = "inline-block"; CjStyle.left = xp + "%";
          //
          //  Set width/position based on the type of column
          //
          if (CWIDTH[j].match(/%$/)) {
            var pp = parseFloat(CWIDTH[j]) * Wf;
            if (f === 0) {
              CjStyle.width = (wp + pp) + "%"; xp += wp + pp;
              Cj = HTMLCSS.createBox(Cj); HTMLCSS.addBox(Cj,C[j].firstChild);
              Cj.style.left = 0; Cj.style.right = HTMLCSS.Em(wm); xf -= wm;
            } else {
              CjStyle.width = pp + "%"; xp += pp;
            }
          } else if (CWIDTH[j] === "fit" || f === 0) {
            CjStyle.width = wp + "%";
            Cj = HTMLCSS.createBox(Cj); HTMLCSS.addBox(Cj,C[j].firstChild);
            Cj.style.left = 0; Cj.style.right = HTMLCSS.Em(wm-W[j]);
            xf += W[j] - wm; xp += wp;
          } else {
            CjStyle.width = HTMLCSS.Em(W[j]); xf += W[j];
          }
	  if (HTMLCSS.msieRelativeWidthBug) {
            HTMLCSS.addText(Cj.firstChild,HTMLCSS.NBSP); // gets correct baseline
            Cj.firstChild.style.position = "relative";
          }
          xf += CSPACE[j];
          //
          //  Add column lines
          //
          if (CLINES[j] !== "none" && j < J && j !== LABEL) {
            line = HTMLCSS.createBox(box); line.style.left = xp+"%";
            line = HTMLCSS.createRule(line,fH,0,1.25/HTMLCSS.em); line.style.position = "absolute";
            line.bbox = {h:fH, d:0, w:0, rw:1.25/HTMLCSS.em, lw:0};
            line.parentNode.bbox = stack.bbox; // make sure stack size is updated
            HTMLCSS.placeBox(line,xf-CSPACE[j]/2,fY,true); line.style.borderStyle = CLINES[j];
          }
        }
      } else {
        //
        //  Set the column box widths and place them
        //
        var x = fx;
        for (j = 0; j <= J; j++) {
          if (!C[j].bbox.width) {HTMLCSS.setStackWidth(C[j],W[j])}
          if (CWIDTH[j] !== "auto" && CWIDTH[j] !== "fit")
            {C[j].bbox.width = W[j]; C[j].bbox.isFixed = true}
          HTMLCSS.placeBox(C[j].parentNode,x,0); x += W[j] + CSPACE[j];
          //
          //  Add column lines
          //
          if (CLINES[j] !== "none" && j < J && j !== LABEL) {
            line = HTMLCSS.createRule(stack,fH,0,1.25/HTMLCSS.em); HTMLCSS.addBox(stack,line);
            line.bbox = {h:fH, d:0, w:0, rw:1.25/HTMLCSS.em, lw:0};
            HTMLCSS.placeBox(line,x-CSPACE[j]/2,fY,true); line.style.borderStyle = CLINES[j];
          }
        }
      }
      stack.bbox.d = -fY; stack.bbox.h = fH+fY;
      HTMLCSS.setStackWidth(stack,stack.bbox.w + fx);

      //
      //  Add frame
      //
      fW = stack.bbox.w; var frame;
      if (values.frame !== "none") {
        frame = HTMLCSS.createFrame(stack,fH,0,fW,1.25/HTMLCSS.em,values.frame);
        HTMLCSS.addBox(stack,frame); HTMLCSS.placeBox(frame,0,fY,true);
        if (hasRelativeWidth) {frame.style.width = "100%"}
      }
      //
      //  Add row lines
      //
      y = Y;
      for (i = 0, m = A.length-1; i < m; i++) {
        dy = Math.max(LHD,D[i]+H[i+1]+RSPACE[i]);
        if (RLINES[i] !== "none") {
          line = HTMLCSS.createRule(stack,1.25/HTMLCSS.em,0,fW); HTMLCSS.addBox(stack,line);
          line.bbox = {h:1.25/HTMLCSS.em, d:0, w:fW, rw:fW, lw:0};
          HTMLCSS.placeBox(line,0,y - D[i] - (dy-D[i]-H[i+1])/2,true);
          if (RLINES[i] === "dashed" || hasRelativeWidth) {
            line.style.borderTop = line.style.height+" "+RLINES[i]; line.style.height = 0;
            line.style.width = line.style.borderLeftWidth; line.style.borderLeft = "";
            if (hasRelativeWidth) {line.style.width = "100%"}
          }
        }
        y -= dy;
      }
      //
      //  Set relative width
      //
      if (hasRelativeWidth) {span.bbox.width = values.width; stack.style.width = "100%"}
      //
      //  Place the labels, if any
      //
      if (C[LABEL]) {
        var indent = this.getValues("indentalignfirst","indentshiftfirst","indentalign","indentshift");
        if (indent.indentalignfirst !== MML.INDENTALIGN.INDENTALIGN) {indent.indentalign = indent.indentalignfirst}
        if (indent.indentalign === MML.INDENTALIGN.AUTO) {indent.indentalign = this.displayAlign}
        if (indent.indentshiftfirst !== MML.INDENTSHIFT.INDENTSHIFT) {indent.indentshift = indent.indentshiftfirst}
        if (indent.indentshift === "auto") {indent.indentshift = this.displayIndent}
        var eqn = HTMLCSS.createStack(span,false,"100%");
        HTMLCSS.addBox(eqn,stack); HTMLCSS.alignBox(stack,indent.indentalign,0);
	if (indent.indentshift && indent.indentalign !== MML.INDENTALIGN.CENTER) {
	  stack.style[indent.indentalign] = HTMLCSS.Em(HTMLCSS.length2em(indent.indentshift,mu));
	}
        C[LABEL].parentNode.parentNode.removeChild(C[LABEL].parentNode);
        HTMLCSS.addBox(eqn,C[LABEL]); HTMLCSS.alignBox(C[LABEL],CALIGN[LABEL],0);
        if (HTMLCSS.msieRelativeWidthBug) {stack.style.top = C[LABEL].style.top = ""}
        if (hasRelativeWidth) {stack.style.width = values.width; span.bbox.width = "100%"}
        C[LABEL].style.marginRight = C[LABEL].style.marginLeft =
          HTMLCSS.Em(HTMLCSS.length2em(values.minlabelspacing,mu));
      }
      //
      //  Finish the table
      //
      if (!hasRelativeWidth) {this.HTMLhandleSpace(span)}
      var color = this.HTMLhandleColor(span);
      //
      //  Handle relative-sized background color
      //
      if (color && hasRelativeWidth) {
        if (!frame) {
          frame = HTMLCSS.createFrame(stack,fH,0,fW,0,"none");
          HTMLCSS.addBox(stack,frame); HTMLCSS.placeBox(frame,0,fY,true);
          frame.style.width = "100%";
        }
        frame.style.backgroundColor = color.style.backgroundColor;
        frame.parentNode.insertBefore(frame,frame.parentNode.firstChild);
        color.parentNode.removeChild(color);
      }
      return span;
    },
    HTMLhandleSpace: function (span) {
      span.bbox.keepPadding = true; span.bbox.exact = true;
      if (!this.hasFrame) {span.style.paddingLeft = span.style.paddingRight = HTMLCSS.Em(1/6)}
      this.SUPER(arguments).HTMLhandleSpace.call(this,span);
    }
  });
  
  MML.mtd.Augment({
    toHTML: function (span,HW,D) {
      span = this.HTMLcreateSpan(span);
      if (this.data[0]) {
        var box = this.data[0].toHTML(span);
        if (D != null) {box = this.data[0].HTMLstretchV(span,HW,D)}
        else if (HW != null) {box = this.data[0].HTMLstretchH(span,HW)}
        span.bbox = box.bbox;
      }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    HTMLstretchH: MML.mbase.HTMLstretchH,
    HTMLstretchV: MML.mbase.HTMLstretchV
  });

  MathJax.Hub.Startup.signal.Post("HTML-CSS mtable Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/mtable.js");
  
});

