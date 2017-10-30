/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/ms.js
 *  
 *  Implements the SVG output for <ms> elements.
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
  
  MML.ms.Augment({
    toSVG: function () {
      this.SVGgetStyles();
      var svg = this.SVG(); this.SVGhandleSpace(svg);
      var values = this.getValues("lquote","rquote");
      var variant = this.SVGgetVariant(), scale = this.SVGgetScale();
      var text = this.data.join("");  // FIXME:  handle mglyph?
      var pattern = [];
      if (values.lquote.length === 1) {pattern.push(this.SVGquoteRegExp(values.lquote))}
      if (values.rquote.length === 1) {pattern.push(this.SVGquoteRegExp(values.rquote))}
      if (pattern.length) {text = text.replace(RegExp("("+pattern.join("|")+")","g"),"\\$1")}
      svg.Add(this.SVGhandleVariant(variant,scale,values.lquote+text+values.rquote));
      svg.Clean();
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    },
    SVGquoteRegExp: function (string) {
      return string.replace(/([.*+?|{}()\[\]\\])/g,"\\$1");
    }
  });
  MML.ms.prototype.defaults.mathvariant = 'monospace';
  
  MathJax.Hub.Startup.signal.Post("SVG ms Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/ms.js");

});

