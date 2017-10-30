/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/mtable.js
 *  
 *  Implements the SVG output for <mtable> elements.
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
  
  MML.mtable.Augment({
    toSVG: function (span) {
      this.SVGgetStyles();
      var svg = this.SVG();
      if (this.data.length === 0) {return svg}
      var values = this.getValues("columnalign","rowalign","columnspacing","rowspacing",
                                  "columnwidth","equalcolumns","equalrows",
                                  "columnlines","rowlines","frame","framespacing",
                                  "align","useHeight","width","side","minlabelspacing");
      //  Handle relative width as fixed width in relation to container
      if (values.width.match(/%$/))
        {svg.width = values.width = Math.floor(SVG.cwidth*parseFloat(values.width)/100)+"px"}
      var scale = this.SVGgetScale(), mu = this.SVGgetMu(svg);
      var LABEL = -1;

      var H = [], D = [], W = [], A = [], C = [], i, j, J = -1, m, M, s, row, cell, mo;
      var LHD = SVG.FONTDATA.baselineskip * scale * values.useHeight, HD,
          LH = SVG.FONTDATA.lineH * scale, LD = SVG.FONTDATA.lineD * scale;

      //
      //  Create cells and measure columns and rows
      //
      for (i = 0, m = this.data.length; i < m; i++) {
        row = this.data[i]; s = (row.type === "mlabeledtr" ? LABEL : 0);
        A[i] = []; H[i] = D[i] = 0;
        for (j = s, M = row.data.length + s; j < M; j++) {
          if (W[j] == null) {
            if (j > J) {J = j}
            C[j] = BBOX.G();
            W[j] = -SVG.BIGDIMEN;
          }
          cell = row.data[j-s];
          A[i][j] = cell.toSVG();
//          if (row.data[j-s].isMultiline) {A[i][j].style.width = "100%"}
          if (cell.isEmbellished()) {
            mo = cell.CoreMO();
            var min = mo.Get("minsize",true);
            if (min) {
              if (mo.SVGcanStretch("Vertical")) {
                HD = mo.SVGdata.h + mo.SVGdata.d;
                if (HD) {
                  min = SVG.length2em(min,mu,HD);
                  if (min*mo.SVGdata.h/HD > H[j]) {H[j] = min*mo.SVGdata.h/HD}
                  if (min*mo.SVGdata.d/HD > D[j]) {D[j] = min*mo.SVGdata.d/HD}
                }
              } else if (mo.SVGcanStretch("Horizontal")) {
                min = SVG.length2em(min,mu,mo.SVGdata.w);
                if (min > W[j]) {W[j] = min}
              }
            }
          }
          if (A[i][j].h > H[i]) {H[i] = A[i][j].h}
          if (A[i][j].d > D[i]) {D[i] = A[i][j].d}
          if (A[i][j].w > W[j]) {W[j] = A[i][j].w}
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
      for (i = 0, m = CSPACE.length; i < m; i++) {CSPACE[i] = SVG.length2em(CSPACE[i],mu)}
      for (i = 0, m = RSPACE.length; i < m; i++) {RSPACE[i] = SVG.length2em(RSPACE[i],mu)}
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
      for (i = 0, m = A.length-1; i < m; i++)
        {HD += Math.max((H[i]+D[i] ? LHD : 0),D[i]+H[i+1]+RSPACE[i])}
      //
      //  Determine frame and line sizes
      //
      var fx = 0, fy = 0, fW, fH = HD;
      if (values.frame !== "none" ||
         (values.columnlines+values.rowlines).match(/solid|dashed/)) {
        fx = SVG.length2em(values.framespacing.split(/[, ]+/)[0],mu);
        fy = SVG.length2em(values.framespacing.split(/[, ]+/)[1],mu);
        fH = HD + 2*fy; // fW waits until svg.w is determined
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
          axis:     HD/2 + SVG.TeX.axis_height*scale - H[0]
        })[values.align];
        fY = ({
          top:      -(HD + 2*fy),
          bottom:   0,
          center:   -(HD/2 + fy),
          baseline: -(HD/2 + fy),
          axis:     SVG.TeX.axis_height*scale - HD/2 - fy
        })[values.align];
      }
            
      var WW, WP = 0, Wt = 0, Wp = 0, p = 0, f = 0, P = [], F = [], Wf = 1;
      //
      if (values.equalcolumns && values.width !== "auto") {
        //
        //  Handle equalcolumns for percent-width and fixed-width tables
        //

        //  Get total width minus column spacing
        WW = SVG.length2em(values.width,mu);
        for (i = 0, m = Math.min(J+1,CSPACE.length); i < m; i++) {WW -= CSPACE[i]}
        //  Determine individual column widths
        WW /= J+1;
        for (i = 0, m = Math.min(J+1,CWIDTH.length); i < m; i++) {W[i] = WW}
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
            {P[p] = i; p++; Wp += W[i]; WP += SVG.length2em(CWIDTH[i],mu,1)}
          else {W[i] = SVG.length2em(CWIDTH[i],mu); Wt += W[i]}
        }
        // Get the full width (excluding inter-column spacing)
        if (values.width === "auto") {
          if (WP > .98) {Wf = Wp/(Wt+Wp); WW = Wt + Wp} else {WW = Wt / (1-WP)}
        } else {
          WW = SVG.length2em(values.width,mu);
          for (i = 0, m = Math.min(J+1,CSPACE.length); i < m; i++) {WW -= CSPACE[i]}
        }
        //  Determine the relative column widths
        for (i = 0, m = P.length; i < m; i++) {
          W[P[i]] = SVG.length2em(CWIDTH[P[i]],mu,WW*Wf); Wt += W[P[i]];
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
      
      //
      //  Lay out array columns
      //
      var y = Y, dy, align; s = (C[LABEL] ? LABEL : 0);
      for (j = s; j <= J; j++) {
        C[j].w = W[j];
        for (i = 0, m = A.length; i < m; i++) {
          if (A[i][j]) {
            s = (this.data[i].type === "mlabeledtr" ? LABEL : 0);
            cell = this.data[i].data[j-s];
	    if (cell.SVGcanStretch("Horizontal")) {
	      A[i][j] = cell.SVGstretchH(W[j]);
	    } else if (cell.SVGcanStretch("Vertical")) {
	      mo = cell.CoreMO();
	      var symmetric = mo.symmetric; mo.symmetric = false;
	      A[i][j] = cell.SVGstretchV(H[i],D[i]);
	      mo.symmetric = symmetric;
	    }
            align = cell.rowalign||this.data[i].rowalign||RALIGN[i];
            dy = ({top:    H[i] - A[i][j].h,
                   bottom: A[i][j].d - D[i],
                   center: ((H[i]-D[i]) - (A[i][j].h-A[i][j].d))/2,
                   baseline: 0, axis: 0})[align] || 0; // FIXME:  handle axis better?
            align = (cell.columnalign||RCALIGN[i][j]||CALIGN[j])
            C[j].Align(A[i][j],align,0,y+dy);
          }
          if (i < A.length-1) {y -= Math.max((H[i]+D[i] ? LHD : 0),D[i]+H[i+1]+RSPACE[i])}
        }
        y = Y;
      }

      //
      //  Place the columns and add column lines
      //
      var lw = 1.5*SVG.em;
      var x = fx - lw/2;
      for (j = 0; j <= J; j++) {
        svg.Add(C[j],x,0); x += W[j] + CSPACE[j];
        if (CLINES[j] !== "none" && j < J && j !== LABEL)
        {svg.Add(BBOX.VLINE(fH,lw,CLINES[j]),x-CSPACE[j]/2,fY)}
      }
      svg.w += fx; svg.d = -fY; svg.h = fH+fY;
      fW = svg.w;
      
      //
      //  Add frame
      //
      if (values.frame !== "none") {
        svg.Add(BBOX.HLINE(fW,lw,values.frame),0,fY+fH-lw);
        svg.Add(BBOX.HLINE(fW,lw,values.frame),0,fY);
        svg.Add(BBOX.VLINE(fH,lw,values.frame),0,fY);
        svg.Add(BBOX.VLINE(fH,lw,values.frame),fW-lw,fY);
      }

      //
      //  Add row lines
      //
      y = Y - lw/2;
      for (i = 0, m = A.length-1; i < m; i++) {
        dy = Math.max(LHD,D[i]+H[i+1]+RSPACE[i]);
        if (RLINES[i] !== "none")
          {svg.Add(BBOX.HLINE(fW,lw,RLINES[i]),0,y-D[i]-(dy-D[i]-H[i+1])/2)}
        y -= dy;
      }
      
      //
      //  Finish the table
      //
      svg.Clean();
      this.SVGhandleSpace(svg);
      this.SVGhandleColor(svg);
      
      //
      //  Place the labels, if any
      //
      if (C[LABEL]) {
        var indent = this.getValues("indentalignfirst","indentshiftfirst","indentalign","indentshift");
        if (indent.indentalignfirst !== MML.INDENTALIGN.INDENTALIGN) {indent.indentalign = indent.indentalignfirst}
        if (indent.indentalign === MML.INDENTALIGN.AUTO) {indent.indentalign = this.displayAlign}
        if (indent.indentshiftfirst !== MML.INDENTSHIFT.INDENTSHIFT) {indent.indentshift = indent.indentshiftfirst}
        if (indent.indentshift === "auto") {indent.indentshift = this.displayIndent}
        var shift = (indent.indentshift ? SVG.length2em(indent.indentshift,mu) : 0);
        var labelshift = SVG.length2em(values.minlabelspacing,mu);
        var eqn = svg; svg = this.SVG();
        if (indent.indentalign === MML.INDENTALIGN.CENTER) {
          svg.w = svg.r = SVG.length2em(SVG.cwidth+"px"); shift = 0; svg.hasIndent = true;
        } else if (CALIGN[LABEL] !== indent.indentalign) {
          svg.w = svg.r = SVG.length2em(SVG.cwidth+"px") - shift - labelshift;
          shift = labelshift = 0;
        } else {
          svg.w = svg.r = eqn.w + shift;
          svg.hasIndent = true;
        }
        svg.Align(eqn,indent.indentalign,shift,0);
        svg.Align(C[LABEL],CALIGN[LABEL],labelshift,0);
      }
      
      this.SVGsaveData(svg);
      return svg;
    },
    SVGhandleSpace: function (svg) {
      if (!this.hasFrame && !svg.width) {svg.x = svg.X = 167}
      this.SUPER(arguments).SVGhandleSpace.call(this,svg);
    }
  });
  
  MML.mtd.Augment({
    toSVG: function (HW,D) {
      var svg = this.svg = this.SVG();
      if (this.data[0]) {
        svg.Add(this.SVGdataStretched(0,HW,D));
        svg.Clean();
      }
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    }
  });

  MathJax.Hub.Startup.signal.Post("SVG mtable Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/mtable.js");
  
});

