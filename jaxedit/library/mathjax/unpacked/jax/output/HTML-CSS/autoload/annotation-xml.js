/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/autoload/annotation-xm;l.js
 *  
 *  Implements the HTML-CSS output for <annotation-xml> elements.
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var VERSION = "2.1";
  var MML = MathJax.ElementJax.mml,
      HTMLCSS = MathJax.OutputJax["HTML-CSS"];

  MML["annotation-xml"].Augment({
    toHTML: function (span) {
      span = this.HTMLhandleSize(this.HTMLcreateSpan(span));
      var encoding = this.Get("encoding");
      for (var i = 0, m = this.data.length; i < m; i++)
        {this.data[i].toHTML(span,encoding)}
      this.HTMLhandleSpace(span);
      this.HTMLhandleColor(span);
      return span;
    },
    HTMLgetScale: function () {
      return this.SUPER(arguments).HTMLgetScale.call(this) / HTMLCSS.scale;
    }
  });
  
  MML.xml.Augment({
    toHTML: function (span,encoding) {
      for (var i = 0, m = this.data.length; i < m; i++) 
        {span.appendChild(this.data[i].cloneNode(true))}
      span.bbox.w = HTMLCSS.getW(span); span.bbox.rw = span.bbox.w;
      var HD = HTMLCSS.getHD(span);
      span.bbox.h = HD.h; span.bbox.d = HD.d;
    }
  });
  
  MathJax.Hub.Startup.signal.Post("HTML-CSS annotation-xml Ready");
  MathJax.Ajax.loadComplete(HTMLCSS.autoloadDir+"/annotation-xml.js");

});

