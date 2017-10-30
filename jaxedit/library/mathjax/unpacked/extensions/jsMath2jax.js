/*************************************************************
 *
 *  MathJax/extensions/jsMath2jax.js
 *  
 *  Implements a jsMath to Jax preprocessor that locates jsMath-style
 *  <SPAN CLASS="math">...</SPAN> and <DIV CLASS="math">...</DIV> tags
 *  and replaces them with SCRIPT tags for processing by MathJax.
 *  (Note: use the tex2jax preprocessor to convert TeX delimiters or 
 *  custom delimiters to MathJax SCRIPT tags.  This preprocessor is
 *  only for the SPAN and DIV form of jsMath delimiters).
 *  
 *  To use this preprocessor, include "jsMath2jax.js" in the extensions
 *  array in your config/MathJax.js file, or the MathJax.Hub.Config() call
 *  in your HTML document.
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

MathJax.Extension.jsMath2jax = {
  version: "2.1",
  
  config: {
    preview: "TeX"    // Set to "none" to prevent preview strings from being inserted
                      //   or to an array that specifies an HTML snippet to use for
                      //   the preview.
  },
  
  PreProcess: function (element) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig("jsMath2jax",this.config);
      if (this.config.Augment) {MathJax.Hub.Insert(this,this.config.Augment)}
      if (typeof(this.config.previewTeX) !== "undefined" && !this.config.previewTeX)
        {this.config.preview = "none"} // backward compatibility for previewTeX parameter
      this.previewClass = MathJax.Hub.config.preRemoveClass;
      this.configured = true;
    }
    if (typeof(element) === "string") {element = document.getElementById(element)}
    if (!element) {element = document.body}
    var span = element.getElementsByTagName("span"), i;
    for (i = span.length-1; i >= 0; i--)
      {if (String(span[i].className).match(/(^| )math( |$)/)) {this.ConvertMath(span[i],"")}}
    var div = element.getElementsByTagName("div");
    for (i = div.length-1; i >= 0; i--)
      {if (String(div[i].className).match(/(^| )math( |$)/)) {this.ConvertMath(div[i],"; mode=display")}}
  },
  
  ConvertMath: function (node,mode) {
    if (node.getElementsByTagName("script").length === 0) {
      var parent = node.parentNode,
          script = this.createMathTag(mode,node.innerHTML);
      if (node.nextSibling) {parent.insertBefore(script,node.nextSibling)}
        else {parent.appendChild(script)}
      if (this.config.preview !== "none") {this.createPreview(node)}
      parent.removeChild(node);
    }
  },
  
  createPreview: function (node) {
    var preview;
    if (this.config.preview === "TeX") {preview = [this.filterPreview(node.innerHTML)]}
    else if (this.config.preview instanceof Array) {preview = this.config.preview}
    if (preview) {
      preview = MathJax.HTML.Element("span",{className: MathJax.Hub.config.preRemoveClass},preview);
      node.parentNode.insertBefore(preview,node);
    }
  },
  
  createMathTag: function (mode,tex) {
    tex = tex.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
    var script = document.createElement("script");
    script.type = "math/tex" + mode;
    MathJax.HTML.setScript(script,tex);
    return script;
  },
  
  filterPreview: function (tex) {return tex}
  
};

MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.jsMath2jax],8);
MathJax.Ajax.loadComplete("[MathJax]/extensions/jsMath2jax.js");
