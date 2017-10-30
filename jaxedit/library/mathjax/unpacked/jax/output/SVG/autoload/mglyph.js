/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/mglyph.js
 *  
 *  Implements the SVG output for <mglyph> elements.
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
  
  var XLINKNS = "http://www.w3.org/1999/xlink";

  BBOX.MGLYPH = BBOX.Subclass({
    type: "image", removeable: false,
    Init: function (img,w,h,align,mu,def) {
      if (def == null) {def = {}}
      var W = img.width*1000/SVG.em, H = img.height*1000/SVG.em, y = 0;
      if (w !== "") {W = SVG.length2em(w,mu,W)}
      if (h !== "") {H = SVG.length2em(h,mu,H)}
      if (align !== "" && align.match(/\d/)) {y = SVG.length2em(align,mu); def.y = -y}
      def.height = Math.floor(H); def.width = Math.floor(W);
      def.transform = "translate(0,"+H+") matrix(1 0 0 -1 0 0)";
      def.preserveAspectRatio = "none";
      this.SUPER(arguments).Init.call(this,def);
      this.element.setAttributeNS(XLINKNS,"href",img.src);
      this.w = this.r = W; this.h = this.H = H + y;
      this.d = this.D = -y; this.l = 0;
    }
  });
  
  MML.mglyph.Augment({
    toSVG: function (variant,scale) {
      this.SVGgetStyles(); var svg = this.SVG(), img, err;
      this.SVGhandleSpace(svg);
      var values = this.getValues("src","width","height","valign","alt");
      if (values.src === "") {
        values = this.getValues("index","fontfamily");
        if (values.index) {
          if (!scale) {scale = this.SVGgetScale()}
          var def = {}; if (values.fontfamily) {def["font-family"] = values.fontfamily}
          svg.Add(BBOX.TEXT(scale,String.fromCharCode(values.index),def));
        }
      } else {
        if (!this.img) {this.img = MML.mglyph.GLYPH[values.src]}
        if (!this.img) {
          this.img = MML.mglyph.GLYPH[values.src] = {img: new Image(), status: "pending"};
          img = this.img.img;
          img.onload  = MathJax.Callback(["SVGimgLoaded",this]);
          img.onerror = MathJax.Callback(["SVGimgError",this]);
          img.src = values.src;
          MathJax.Hub.RestartAfter(img.onload);
        }
        if (this.img.status !== "OK") {
          err = MML.merror("Bad mglyph: "+values.src).With({mathsize:"75%"});
          this.Append(err); svg = err.toSVG(); this.data.pop();
        } else {
          var mu = this.SVGgetMu(svg);
          svg.Add(BBOX.MGLYPH(this.img.img,values.width,values.height,values.valign,mu,
                              {src:values.src, alt:values.alt, title:values.alt}));
        }
      }
      svg.Clean();
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    },
    SVGimgLoaded: function (event,status) {
      if (typeof(event) === "string") {status = event}
      this.img.status = (status || "OK")
    },
    SVGimgError: function () {this.img.img.onload("error")}
  },{
    GLYPH: {}    // global list of all loaded glyphs
  });
  
  MathJax.Hub.Startup.signal.Post("SVG mglyph Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/mglyph.js");
  
});

