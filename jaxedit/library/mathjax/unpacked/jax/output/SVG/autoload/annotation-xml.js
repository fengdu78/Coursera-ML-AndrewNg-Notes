/*************************************************************
 *
 *  MathJax/jax/output/SVG/autoload/annotation-xml.js
 *  
 *  Implements the SVG output for <annotation-xml> elements.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2012 Design Science, Inc.
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
  var BBOX = SVG.BBOX;
  
  BBOX.FOREIGN = BBOX.Subclass({type: "foreignObject", removeable: false});

  MML["annotation-xml"].Augment({
    toSVG: function () {
      var svg = this.SVG(); this.SVGhandleSpace(svg);
      var encoding = this.Get("encoding");
      for (var i = 0, m = this.data.length; i < m; i++)
        {svg.Add(this.data[i].toSVG(encoding),svg.w,0)}
      svg.Clean();
      this.SVGhandleColor(svg);
      this.SVGsaveData(svg);
      return svg;
    }
  });
  
  MML.xml.Augment({
    toSVG: function (encoding) {
      //
      //  Get size of xml content
      //
      var span = SVG.textSVG.parentNode;
      SVG.mathDiv.style.width = "auto";  // Firefox returns offsetWidth = 0 without this
      span.insertBefore(this.div,SVG.textSVG);
      var w = this.div.offsetWidth, h = this.div.offsetHeight;
      var strut = MathJax.HTML.addElement(this.div,"span",{
        style:{display:"inline-block", overflow:"hidden", height:h+"px",
               width:"1px", marginRight:"-1px"}
      });
      var d = this.div.offsetHeight - h; h -= d;
      this.div.removeChild(strut);
      span.removeChild(this.div); SVG.mathDiv.style.width = "";
      //
      //  Create foreignObject element for the content
      //
      var scale = 1000/SVG.em;
      var svg = BBOX.FOREIGN({
        y:(-h)+"px", width:w+"px", height:(h+d)+"px",
        transform:"scale("+scale+") matrix(1 0 0 -1 0 0)"
      });
      //
      //  Add the children to the foreignObject
      //
      for (var i = 0, m = this.data.length; i < m; i++) 
        {svg.element.appendChild(this.data[i].cloneNode(true))}
      //
      //  Set the scale and finish up
      //
      svg.w = w*scale; svg.h = h*scale; svg.d = d*scale;
      svg.r = svg.w; svg.l = 0;
      svg.Clean();
      this.SVGsaveData(svg);
      return svg;
    }
  });
  
  MathJax.Hub.Startup.signal.Post("SVG annotation-xml Ready");
  MathJax.Ajax.loadComplete(SVG.autoloadDir+"/annotation-xml.js");

});

