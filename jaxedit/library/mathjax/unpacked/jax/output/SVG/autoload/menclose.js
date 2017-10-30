/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/menclose.js
 *  
 *  Implements the SVG output for <menclose> elements.
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
      
  BBOX.ELLIPSE = BBOX.Subclass({
    type: "ellipse", removeable: false,
    Init: function (h,d,w,t,color,def) {
      if (def == null) {def = {}}; def.fill = "none";
      if (color) {def.stroke = color}
      def["stroke-width"] = t.toFixed(2).replace(/\.?0+$/,"");
      def.cx = Math.floor(w/2); def.cy = Math.floor((h+d)/2-d);
      def.rx = Math.floor((w-t)/2); def.ry = Math.floor((h+d-t)/2);
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = w; this.h = this.H = h;
      this.d = this.D = d; this.l = 0;
    }
  });
  
  BBOX.DLINE = BBOX.Subclass({
    type: "line", removeable: false,
    Init: function (h,d,w,t,color,updown,def) {
      if (def == null) {def = {}}; def.fill = "none";
      if (color) {def.stroke = color}
      def["stroke-width"] = t.toFixed(2).replace(/\.?0+$/,"");
      if (updown == "up") {
        def.x1 = Math.floor(t/2); def.y1 = Math.floor(t/2-d);
        def.x2 = Math.floor(w-t/2); def.y2 = Math.floor(h-t/2);
      } else {
        def.x1 = Math.floor(t/2); def.y1 = Math.floor(h-t/2);
        def.x2 = Math.floor(w-t/2); def.y2 = Math.floor(t/2-d);
      }
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = w; this.h = this.H = h;
      this.d = this.D = d; this.l = 0;
    }
  });
  
  BBOX.FPOLY = BBOX.Subclass({
    type: "polygon", removeable: false,
    Init: function (points,color,def) {
      if (def == null) {def = {}}
      if (color) {def.fill = color}
      var P = [], mx = 100000000, my = mx, Mx = -mx, My = Mx;
      for (var i = 0, m = points.length; i < m; i++) {
        var x = points[i][0], y = points[i][1];
        if (x > Mx) {Mx = x}; if (x < mx) {mx = x}
        if (y > My) {My = y}; if (y < my) {my = y}
        P.push(Math.floor(x)+","+Math.floor(y));
      }
      def.points = P.join(" ");
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = Mx; this.h = this.H = My;
      this.d = this.D = -my; this.l = -mx;
    }
  });

  BBOX.PPATH = BBOX.Subclass({
    type: "path", removeable: false,
    Init: function (h,d,w,p,t,color,def) {
      if (def == null) {def = {}}; def.fill = "none";
      if (color) {def.stroke = color}
      def["stroke-width"] = t.toFixed(2).replace(/\.?0+$/,"");
      def.d = p;
      this.SUPER(arguments).Init.call(this,def);
      this.w = this.r = w; this.h = this.H = h+d;
      this.d = this.D = this.l = 0; this.y = -d;
    }
  });
  
  MML.menclose.Augment({
    toSVG: function (HW,DD) {
      this.SVGgetStyles();

      var svg = this.SVG();
      this.SVGhandleSpace(svg);
      var base = this.SVGdataStretched(0,HW,DD);

      var values = this.getValues("notation","thickness","padding","mathcolor","color");
      if (values.color && !this.mathcolor) {values.mathcolor = values.color}
      if (values.thickness == null) {values.thickness = ".075em"}
      if (values.padding == null)   {values.padding   = ".2em"}
      var mu = this.SVGgetMu(svg), scale = this.SVGgetScale();
      var p = SVG.length2em(values.padding,mu,1/SVG.em) * scale;
      var t = SVG.length2em(values.thickness,mu,1/SVG.em) * scale;
      var H = base.h+p+t, D = base.d+p+t, W = base.w+2*(p+t);
      var notation = values.notation.split(/ /);
      var dx = 0, w, h, i, m, borders = [false,false,false,false];
      if (!values.mathcolor) {values.mathcolor = "black"}
      
      for (i = 0, m = notation.length; i < m; i++) {
        switch (notation[i]) {
          case MML.NOTATION.BOX:
            borders = [true,true,true,true];
            break;

          case MML.NOTATION.ROUNDEDBOX:
            svg.Add(BBOX.FRAME(H,D,W,t,"solid",values.mathcolor,
                     {rx:Math.floor(Math.min(H+D-t,W-t)/4)}));
            break;
            
          case MML.NOTATION.CIRCLE:
            svg.Add(BBOX.ELLIPSE(H,D,W,t,values.mathcolor));
            break;

          case MML.NOTATION.ACTUARIAL:
            borders[0] = true;
          case MML.NOTATION.RIGHT:
            borders[1] = true;
            break;

          case MML.NOTATION.LEFT:
            borders[3] = true;
            break;
            
          case MML.NOTATION.TOP:
            borders[0] = true;
            break;
            
          case MML.NOTATION.BOTTOM:
            borders[2] = true;
            break;
            
          case MML.NOTATION.VERTICALSTRIKE:
            svg.Add(BBOX.VLINE(H+D,t,"solid",values.mathcolor),(W-t)/2,-D);
            break;
            
          case MML.NOTATION.HORIZONTALSTRIKE:
            svg.Add(BBOX.HLINE(W,t,"solid",values.mathcolor),0,(H+D-t)/2-D);
            break;

          case MML.NOTATION.UPDIAGONALSTRIKE:
              if (this.arrow) {
                var l = Math.sqrt(W*W + (H+D)*(H+D)), f = 1/l * 10/SVG.em * t/.075;
                w = W * f; h = (H+D) * f; var x = .4*h;
                svg.Add(BBOX.DLINE(H-.5*h,D,W-.5*w,t,values.mathcolor,"up"));
                svg.Add(BBOX.FPOLY(
                  [[x+w,h], [x-.4*h,.4*w], [x+.3*w,.3*h], [x+.4*h,-.4*w], [x+w,h]],
                  values.mathcolor),W-w-x,H-h);
              } else {
                svg.Add(BBOX.DLINE(H,D,W,t,values.mathcolor,"up"));
              }
            break;

          case MML.NOTATION.DOWNDIAGONALSTRIKE:
            svg.Add(BBOX.DLINE(H,D,W,t,values.mathcolor,"down"));
            break;

          case MML.NOTATION.MADRUWB:
            borders[1] = borders[2] = true;
            break;

          case MML.NOTATION.RADICAL:
            svg.Add(BBOX.PPATH(H,D,W,
              "M "+this.SVGxy(t/2,.4*(H+D)) +
              " L "+this.SVGxy(p,t/2) +
              " L "+this.SVGxy(2*p,H+D-t/2) +
              " L "+this.SVGxy(W,H+D-t/2),
              t,values.mathcolor),0,t);
            dx = p;
            break;
            
          case MML.NOTATION.LONGDIV:
            svg.Add(BBOX.PPATH(H,D,W,
              "M "+this.SVGxy(t/2,t/2) +
              " a "+this.SVGxy(p,(H+D)/2-2*t) + " 0 0,1 " + this.SVGxy(t/2,H+D-t) +
              " L "+this.SVGxy(W,H+D-t/2),
              t,values.mathcolor),0,t/2);
            dx = p;
            break;
        }
      }
      var sides = [["H",W,0,H-t],["V",H+D,W-t,-D],["H",W,0,-D],["V",H+D,0,-D]];
      for (i = 0; i < 4; i++) {
        if (borders[i]) {
          var side = sides[i];
          svg.Add(BBOX[side[0]+"LINE"](side[1],t,"solid",values.mathcolor),side[2],side[3]);
        }
      }
      svg.Add(base,dx+p+t,0,false,true);
      svg.Clean();
      this.SVGhandleSpace(svg);
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    },
    
    SVGxy: function (x,y) {return Math.floor(x)+","+Math.floor(y)}
    
  });
  
  MathJax.Hub.Startup.signal.Post("SVG menclose Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/menclose.js");
  
});

