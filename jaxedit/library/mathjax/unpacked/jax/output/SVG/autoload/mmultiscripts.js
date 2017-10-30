/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/mmultiscripts.js
 *  
 *  Implements the SVG output for <mmultiscripts> elements.
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
      SVG = MathJax.OutputJax.SVG;
  
  MML.mmultiscripts.Augment({
    toSVG: function (HW,D) {
      this.SVGgetStyles();
      var svg = this.SVG(); this.SVGhandleSpace(svg);
      var scale = this.SVGgetScale();
      var base = (this.data[this.base] ? this.SVGdataStretched(this.base,HW,D) : SVG.BBOX.G().Clean());
      var x_height = SVG.TeX.x_height * scale,
          s = SVG.TeX.scriptspace * scale * .75;  // FIXME: .75 can be removed when IC is right?

      var BOX = this.SVGgetScripts(s);
      var sub = BOX[0], sup = BOX[1], presub = BOX[2], presup = BOX[3];

      var sscale = (this.data[1]||this).SVGgetScale();
      var q = SVG.TeX.sup_drop * sscale, r = SVG.TeX.sub_drop * sscale;
      var u = base.h - q, v = base.d + r, delta = 0, p;
      if (base.ic) {delta = base.ic}
      if (this.data[this.base] &&
         (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
        if (this.data[this.base].data.join("").length === 1 && base.scale === 1 &&
            !base.stretched && !this.data[this.base].Get("largeop")) {u = v = 0}
      }
      var min = this.getValues("subscriptshift","superscriptshift"), mu = this.SVGgetMu(svg);
      min.subscriptshift   = (min.subscriptshift === ""   ? 0 : SVG.length2em(min.subscriptshift,mu));
      min.superscriptshift = (min.superscriptshift === "" ? 0 : SVG.length2em(min.superscriptshift,mu));

      var dx = 0;
      if (presub) {dx = presub.w+delta} else if (presup) {dx = presup.w-delta}
      svg.Add(base,Math.max(0,dx),0);

      if (!sup && !presup) {
        v = Math.max(v,SVG.TeX.sub1*scale,min.subscriptshift);
        if (sub)    {v = Math.max(v,sub.h-(4/5)*x_height)}
        if (presub) {v = Math.max(v,presub.h-(4/5)*x_height)}
        if (sub)    {svg.Add(sub,dx+base.w+s-delta,-v)}
        if (presub) {svg.Add(presub,0,-v)}
      } else {
        if (!sub && !presub) {
          var values = this.getValues("displaystyle","texprimestyle");
          p = SVG.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
          u = Math.max(u,p*scale,min.superscriptshift);
          if (sup)    {u = Math.max(u,sup.d+(1/4)*x_height)}
          if (presup) {u = Math.max(u,presup.d+(1/4)*x_height)}
          if (sup)    {svg.Add(sup,dx+base.w+s,u)}
          if (presup) {svg.Add(presup,0,u)}
        } else {
          v = Math.max(v,SVG.TeX.sub2*scale);
          var t = SVG.TeX.rule_thickness * scale;
          var h = (sub||presub).h, d = (sup||presup).d;
          if (presub) {h = Math.max(h,presub.h)}
          if (presup) {d = Math.max(d,presup.d)}
          if ((u - d) - (h - v) < 3*t) {
            v = 3*t - u + d + h; q = (4/5)*x_height - (u - d);
            if (q > 0) {u += q; v -= q}
          }
          u = Math.max(u,min.superscriptshift); v = Math.max(v,min.subscriptshift);
          if (sup)    {svg.Add(sup,dx+base.w+s,u)}
          if (presup) {svg.Add(presup,dx+delta-presup.w,u)}
          if (sub)    {svg.Add(sub,dx+base.w+s-delta,-v)}
          if (presub) {svg.Add(presub,dx-presub.w,-v)}
        }
      }
      svg.Clean();
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    },
    SVGgetScripts: function (s) {
      var sup, sub, BOX = [];
      var i = 1, m = this.data.length, W = 0;
      for (var k = 0; k < 4; k += 2) {
        while (i < m && this.data[i].type !== "mprescripts") {
          for (var j = k; j < k+2; j++) {
            if (this.data[i] && this.data[i].type !== "none") {
              if (!BOX[j]) {BOX[j] = SVG.BBOX.G()}
              BOX[j].Add(this.data[i].toSVG().With({x:W}));
            }
            i++;
          }
          sub = BOX[k]||{w:0}; sup = BOX[k+1]||{w:0};
          sub.w = sup.w = W = Math.max(sub.w,sup.w);
        }
        i++; W = 0;
      }
      for (j = 0; j < 4; j++) {if (BOX[j]) {BOX[j].w += s; BOX[j].Clean()}}
      return BOX;
    }
  });
  
  MathJax.Hub.Startup.signal.Post("SVG mmultiscripts Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/mmultiscripts.js");

});

