/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/mmultiscripts.js
 *  
 *  Implements the HTML-CSS output for <mmultiscripts> elements.
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
  
  MML.mmultiscripts.Augment({
    toHTML: function (span,HW,D) {
      span = this.HTMLcreateSpan(span); var scale = this.HTMLgetScale();
      var stack = HTMLCSS.createStack(span), values;
      var base = HTMLCSS.createBox(stack);
      if (this.data[this.base]) {
        var child = this.data[this.base].toHTML(base);
        if (D != null) {this.data[this.base].HTMLstretchV(base,HW,D)}
        else if (HW != null) {this.data[this.base].HTMLstretchH(base,HW)}
        HTMLCSS.Measured(child,base);
      } else {base.bbox = this.HTMLzeroBBox()}
      var x_height = HTMLCSS.TeX.x_height * scale,
          s = HTMLCSS.TeX.scriptspace * scale * .75;  // FIXME: .75 can be removed when IC is right?

      var BOX = this.HTMLgetScripts(stack,s);
      var sub = BOX[0], sup = BOX[1], presub = BOX[2], presup = BOX[3];

      var sscale = (this.data[1]||this).HTMLgetScale();
      var q = HTMLCSS.TeX.sup_drop * sscale, r = HTMLCSS.TeX.sub_drop * sscale;
      var u = base.bbox.h - q, v = base.bbox.d + r, delta = 0, p;
      if (base.bbox.ic) {delta = base.bbox.ic}
      if (this.data[this.base] &&
         (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
        if (this.data[this.base].data.join("").length === 1 && base.bbox.scale === 1 &&
            !this.data[this.base].Get("largeop")) {u = v = 0}
      }
      var min = this.getValues("subscriptshift","superscriptshift"), mu = this.HTMLgetMu(span);
      min.subscriptshift   = (min.subscriptshift === ""   ? 0 : HTMLCSS.length2em(min.subscriptshift,mu));
      min.superscriptshift = (min.superscriptshift === "" ? 0 : HTMLCSS.length2em(min.superscriptshift,mu));

      var dx = 0;
      if (presub) {dx = presub.bbox.w+delta} else if (presup) {dx = presup.bbox.w-delta}
      if (dx < 0) {dx = 0};
      HTMLCSS.placeBox(base,dx,0);

      if (!sup && !presup) {
        v = Math.max(v,HTMLCSS.TeX.sub1*scale,min.subscriptshift);
        if (sub)    {v = Math.max(v,sub.bbox.h-(4/5)*x_height)}
        if (presub) {v = Math.max(v,presub.bbox.h-(4/5)*x_height)}
        if (sub)    {HTMLCSS.placeBox(sub,dx+base.bbox.w+s-delta,-v)}
        if (presub) {HTMLCSS.placeBox(presub,0,-v)}
      } else {
        if (!sub && !presub) {
          values = this.getValues("displaystyle","texprimestyle");
          p = HTMLCSS.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
          u = Math.max(u,p*scale,min.superscriptshift);
          if (sup)    {u = Math.max(u,sup.bbox.d+(1/4)*x_height)}
          if (presup) {u = Math.max(u,presup.bbox.d+(1/4)*x_height)}
          if (sup)    {HTMLCSS.placeBox(sup,dx+base.bbox.w+s,u)}
          if (presup) {HTMLCSS.placeBox(presup,0,u)}
        } else {
          v = Math.max(v,HTMLCSS.TeX.sub2*scale);
          var t = HTMLCSS.TeX.rule_thickness * scale;
          var h = (sub||presub).bbox.h, d = (sup||presup).bbox.d;
          if (presub) {h = Math.max(h,presub.bbox.h)}
          if (presup) {d = Math.max(d,presup.bbox.d)}
          if ((u - d) - (h - v) < 3*t) {
            v = 3*t - u + d + h; q = (4/5)*x_height - (u - d);
            if (q > 0) {u += q; v -= q}
          }
          u = Math.max(u,min.superscriptshift); v = Math.max(v,min.subscriptshift);
          if (sup)    {HTMLCSS.placeBox(sup,dx+base.bbox.w+s,u)}
          if (presup) {HTMLCSS.placeBox(presup,dx+delta-presup.bbox.w,u)}
          if (sub)    {HTMLCSS.placeBox(sub,dx+base.bbox.w+s-delta,-v)}
          if (presub) {HTMLCSS.placeBox(presub,dx-presub.bbox.w,-v)}
        }
      }
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    HTMLgetScripts: function (stack,s) {
      var sup, sub, BOX = [];
      var i = 1, m = this.data.length, W = 0;
      for (var k = 0; k < 4; k += 2) {
        while (i < m && this.data[i].type !== "mprescripts") {
          for (var j = k; j < k+2; j++) {
            if (this.data[i] && this.data[i].type !== "none") {
              if (!BOX[j]) {
                BOX[j] = HTMLCSS.createBox(stack); BOX[j].bbox = this.HTMLemptyBBox({});
                if (W) {HTMLCSS.createBlank(BOX[j],W); BOX[j].bbox.w = BOX[j].bbox.rw = W}
              }
              this.data[i].toHTML(BOX[j]); this.HTMLcombineBBoxes(this.data[i],BOX[j].bbox);
            }
            i++;
          }
          sub = BOX[k]; sup = BOX[k+1];
          if (sub && sup) {
            if (sub.bbox.w < sup.bbox.w) {
              HTMLCSS.createBlank(sub,sup.bbox.w-sub.bbox.w);
              sub.bbox.w = sup.bbox.w; sub.bbox.rw = Math.max(sub.bbox.w,sub.bbox.rw);
            } else if (sub.bbox.w > sup.bbox.w) {
              HTMLCSS.createBlank(sup,sub.bbox.w-sup.bbox.w);
              sup.bbox.w = sub.bbox.w; sup.bbox.rw = Math.max(sup.bbox.w,sup.bbox.rw);
            }
          }
          if (sub) {W = sub.bbox.w} else if (sup) {W = sup.bbox.w}
        }
        i++; W = 0;
      }
      for (j = 0; j < 4; j++) {
        if (BOX[j]) {
          BOX[j].bbox.w += s;
          BOX[j].bbox.rw = Math.max(BOX[j].bbox.w,BOX[j].bbox.rw);
          this.HTMLcleanBBox(BOX[j].bbox);
        }
      }
      return BOX;
    },
    HTMLstretchH: MML.mbase.HTMLstretchH,
    HTMLstretchV: MML.mbase.HTMLstretchV
  });
  
  MathJax.Hub.Startup.signal.Post("HTML-CSS mmultiscripts Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/mmultiscripts.js");

});

