/*************************************************************
 *
 *  MathJax/extensions/mml2jax.js
 *  
 *  Implements the MathML to Jax preprocessor that locates <math> nodes
 *  within the text of a document and replaces them with SCRIPT tags
 *  for processing by MathJax.
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

MathJax.Extension.mml2jax = {
  version: "2.1",
  config: {
    preview: "alttext"      // Use the <math> element's alttext as the 
                            //   preview.  Set to "none" for no preview,
                            //   or set to an array specifying an HTML snippet
                            //   to use a fixed preview for all math

  },
  MMLnamespace: "http://www.w3.org/1998/Math/MathML",
  
  PreProcess: function (element) {
    if (!this.configured) {
      this.config = MathJax.Hub.CombineConfig("mml2jax",this.config);
      if (this.config.Augment) {MathJax.Hub.Insert(this,this.config.Augment)}
      this.InitBrowser();
      this.configured = true;
    }
    if (typeof(element) === "string") {element = document.getElementById(element)}
    if (!element) {element = document.body}
    //
    //  Handle all math tags with no namespaces
    //
    this.ProcessMathArray(element.getElementsByTagName("math"));
    //
    //  Handle math with namespaces in XHTML
    //
    if (element.getElementsByTagNameNS)
      {this.ProcessMathArray(element.getElementsByTagNameNS(this.MMLnamespace,"math"))}
    //
    //  Handle math with namespaces in HTML
    //
    var i, m;
    if (typeof(document.namespaces) !== "undefined") {
      //
      // IE namespaces are listed in document.namespaces
      //
      try {
        for (i = 0, m = document.namespaces.length; i < m; i++) {
          var ns = document.namespaces[i];
          if (ns.urn === this.MMLnamespace)
            {this.ProcessMathArray(element.getElementsByTagName(ns.name+":math"))}
        }
      } catch (err) {}
    } else {
      //
      //  Everybody else
      //  
      var html = document.getElementsByTagName("html")[0];
      if (html) {
        for (i = 0, m = html.attributes.length; i < m; i++) {
          var attr = html.attributes[i];
          if (attr.nodeName.substr(0,6) === "xmlns:" && attr.nodeValue === this.MMLnamespace)
            {this.ProcessMathArray(element.getElementsByTagName(attr.nodeName.substr(6)+":math"))}
        }
      }
    }
  },
  
  ProcessMathArray: function (math) {
    var i;
    if (math.length) {
      if (this.MathTagBug) {
        for (i = math.length-1; i >= 0; i--) {
          if (math[i].nodeName === "MATH") {this.ProcessMathFlattened(math[i])}
                                      else {this.ProcessMath(math[i])}
        }
      } else {
        for (i = math.length-1; i >= 0; i--) {this.ProcessMath(math[i])}
      }
    }
  },
  
  ProcessMath: function (math) {
    var parent = math.parentNode;
    var script = document.createElement("script");
    script.type = "math/mml";
    parent.insertBefore(script,math);
    if (this.AttributeBug) {
      var html = this.OuterHTML(math);
      if (this.CleanupHTML) {
        html = html.replace(/<\?import .*?>/i,"").replace(/<\?xml:namespace .*?\/>/i,"");
        html = html.replace(/&nbsp;/g,"&#xA0;");
      }
      MathJax.HTML.setScript(script,html); parent.removeChild(math);
    } else {
      var span = MathJax.HTML.Element("span"); span.appendChild(math);
      MathJax.HTML.setScript(script,span.innerHTML);
    }
    if (this.config.preview !== "none") {this.createPreview(math,script)}
  },
  
  ProcessMathFlattened: function (math) {
    var parent = math.parentNode;
    var script = document.createElement("script");
    script.type = "math/mml";
    parent.insertBefore(script,math);
    var mml = "", node, MATH = math;
    while (math && math.nodeName !== "/MATH") {
      node = math; math = math.nextSibling;
      mml += this.NodeHTML(node);
      node.parentNode.removeChild(node);
    }
    if (math && math.nodeName === "/MATH") {math.parentNode.removeChild(math)}
    script.text = mml + "</math>";
    if (this.config.preview !== "none") {this.createPreview(MATH,script)}
  },
  
  NodeHTML: function (node) {
    var html, i, m;
    if (node.nodeName === "#text") {
      html = this.quoteHTML(node.nodeValue);
    } else if (node.nodeName === "#comment") {
      html = "<!--" + node.nodeValue + "-->"
    } else {
      // In IE, outerHTML doesn't properly quote attributes, so quote them by hand
      // In Opera, HTML special characters aren't quoted in attributes, so quote them
      html = "<"+node.nodeName.toLowerCase();
      for (i = 0, m = node.attributes.length; i < m; i++) {
        var attribute = node.attributes[i];
        if (attribute.specified) {
          // Opera 11.5 beta turns xmlns into xmlns:xmlns, so put it back (*** check after 11.5 is out ***)
          html += " "+attribute.nodeName.toLowerCase().replace(/xmlns:xmlns/,"xmlns")+"=";
          var value = attribute.nodeValue; // IE < 8 doesn't properly set style by setAttributes
          if (value == null && attribute.nodeName === "style" && node.style) {value = node.style.cssText}
          html += '"'+this.quoteHTML(value)+'"';
        }
      }
      html += ">";
      // Handle internal HTML (possibly due to <semantics> annotation or missing </math>)
      if (node.outerHTML != null && node.outerHTML.match(/(.<\/[A-Z]+>|\/>)$/)) {
        for (i = 0, m = node.childNodes.length; i < m; i++)
          {html += this.OuterHTML(node.childNodes[i])}
        html += "</"+node.nodeName.toLowerCase()+">";
      }
    }
    return html;
  },
  OuterHTML: function (node) {
    if (node.nodeName.charAt(0) === "#") {return this.NodeHTML(node)}
    if (!this.AttributeBug) {return node.outerHTML}
    var html = this.NodeHTML(node);
    for (var i = 0, m = node.childNodes.length; i < m; i++)
      {html += this.OuterHTML(node.childNodes[i]);}
    html += "</"+node.nodeName.toLowerCase()+">";
    return html;
  },
  quoteHTML: function (string) {
    if (string == null) {string = ""}
    return string.replace(/&/g,"&#x26;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  },
  
  createPreview: function (math,script) {
    var preview;
    if (this.config.preview === "alttext") {
      var text = math.getAttribute("alttext");
      if (text != null) {preview = [this.filterPreview(text)]}
    } else if (this.config.preview instanceof Array) {preview = this.config.preview}
    if (preview) {
      preview = MathJax.HTML.Element("span",{className:MathJax.Hub.config.preRemoveClass},preview);
      script.parentNode.insertBefore(preview,script);
    }
  },
  
  filterPreview: function (text) {return text},
  
  InitBrowser: function () {
    var test = MathJax.HTML.Element("span",{id:"<", className: "mathjax", innerHTML: "<math><mi>x</mi><mspace /></math>"});
    var html = test.outerHTML || "";
    this.AttributeBug = html !== "" && !(
      html.match(/id="&lt;"/) &&           // "<" should convert to "&lt;"
      html.match(/class="mathjax"/) &&     // IE leaves out quotes
      html.match(/<\/math>/)               // Opera 9 drops tags after self-closing tags
    );
    this.MathTagBug = test.childNodes.length > 1;    // IE < 9 flattens unknown tags
    this.CleanupHTML = MathJax.Hub.Browser.isMSIE;   // remove namespace and other added tags
  }

};

MathJax.Hub.Register.PreProcessor(["PreProcess",MathJax.Extension.mml2jax]);
MathJax.Ajax.loadComplete("[MathJax]/extensions/mml2jax.js");
