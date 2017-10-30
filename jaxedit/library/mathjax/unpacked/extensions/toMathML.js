/*************************************************************
 *
 *  MathJax/extensions/toMathML.js
 *  
 *  Implements a toMathML() method for the mml Element Jax that returns
 *  a MathML string from a given math expression.
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

MathJax.Hub.Register.LoadHook("[MathJax]/jax/element/mml/jax.js",function () {
  var VERSION = "2.1";
  
  var MML = MathJax.ElementJax.mml
      SETTINGS = MathJax.Hub.config.menuSettings;
  
  MML.mbase.Augment({

    toMathML: function (space) {
      var inferred = (this.inferred && this.parent.inferRow);
      if (space == null) {space = ""}
      var tag = this.type, attr = this.toMathMLattributes();
      if (tag === "mspace") {return space + "<"+tag+attr+" />"}
      var data = []; var SPACE = (this.isToken ? "" : space+(inferred ? "" : "  "));
      for (var i = 0, m = this.data.length; i < m; i++) {
        if (this.data[i]) {data.push(this.data[i].toMathML(SPACE))}
          else if (!this.isToken) {data.push(SPACE+"<mrow />")}
      }
      if (this.isToken) {return space + "<"+tag+attr+">"+data.join("")+"</"+tag+">"}
      if (inferred) {return data.join("\n")}
      if (data.length === 0 || (data.length === 1 && data[0] === ""))
        {return space + "<"+tag+attr+" />"}
      return space + "<"+tag+attr+">\n"+data.join("\n")+"\n"+ space +"</"+tag+">";
    },

    toMathMLattributes: function () {
      var attr = [], defaults = this.defaults;
      var copy = (this.attrNames||MML.copyAttributeNames), skip = MML.skipAttributes;

      if (this.type === "math" && (!this.attr || !this.attr.xmlns))
        {attr.push('xmlns="http://www.w3.org/1998/Math/MathML"')}
      if (!this.attrNames) {
        if (this.type === "mstyle") {defaults = MML.math.prototype.defaults}
        for (var id in defaults) {if (!skip[id] && defaults.hasOwnProperty(id)) {
          var force = (id === "open" || id === "close");
          if (this[id] != null && (force || this[id] !== defaults[id])) {
            var value = this[id]; delete this[id];
            if (force || this.Get(id) !== value)
              {attr.push(id+'="'+this.toMathMLattribute(value)+'"')}
            this[id] = value;
          }
        }}
      }
      for (var i = 0, m = copy.length; i < m; i++) {
        if (copy[i] === "class") continue;  // this is handled separately below
        value = (this.attr||{})[copy[i]]; if (value == null) {value = this[copy[i]]}
        if (value != null) {attr.push(copy[i]+'="'+this.toMathMLquote(value)+'"')}
      }
      this.toMathMLclass(attr);
      if (attr.length) {return " "+attr.join(" ")} else {return ""}
    },
    toMathMLclass: function (attr) {
      var CLASS = []; if (this["class"]) {CLASS.push(this["class"])}
      if (this.isa(MML.TeXAtom) && SETTINGS.texHints) {
        var TEXCLASS = ["ORD","OP","BIN","REL","OPEN","CLOSE","PUNCT","INNER","VCENTER"][this.texClass];
        if (TEXCLASS) {CLASS.push("MJX-TeXAtom-"+TEXCLASS)}
      }
      if (this.mathvariant && this.toMathMLvariants[this.mathvariant])
        {CLASS.push("MJX"+this.mathvariant)}
      if (this.arrow) {CLASS.push("MJX-arrow")}
      if (this.variantForm) {CLASS.push("MJX-variant")}
      if (CLASS.length) {attr.unshift('class="'+CLASS.join(" ")+'"')}
    },
    toMathMLattribute: function (value) {
      if (typeof(value) === "string" &&
          value.replace(/ /g,"").match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)) {
        // FIXME:  should take scriptlevel into account
        return RegExp.$2+((1/18)*RegExp.$3).toFixed(3).replace(/\.?0+$/,"")+"em";
      }
      else if (this.toMathMLvariants[value]) {return this.toMathMLvariants[value]}
      return this.toMathMLquote(value);
    },
    toMathMLvariants: {
      "-tex-caligraphic":      MML.VARIANT.SCRIPT,
      "-tex-caligraphic-bold": MML.VARIANT.BOLDSCRIPT,
      "-tex-oldstyle":         MML.VARIANT.NORMAL,
      "-tex-oldstyle-bold":    MML.VARIANT.BOLD,
      "-tex-mathit":           MML.VARIANT.ITALIC
    },
    
    toMathMLquote: function (string) {
      string = String(string).split("");
      for (var i = 0, m = string.length; i < m; i++) {
        var n = string[i].charCodeAt(0);
        if (n < 0x20 || n > 0x7E) {
          string[i] = "&#x"+n.toString(16).toUpperCase()+";";
        } else {
          var c = {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;'}[string[i]];
          if (c) {string[i] = c}
        }
      }
      return string.join("");
    }
  });
  
  MML.msubsup.Augment({
    toMathML: function (space) {
      var tag = this.type;
      if (this.data[this.sup] == null) {tag = "msub"}
      if (this.data[this.sub] == null) {tag = "msup"}
      var attr = this.toMathMLattributes();
      delete this.data[0].inferred;
      var data = [];
      for (var i = 0, m = this.data.length; i < m; i++)
        {if (this.data[i]) {data.push(this.data[i].toMathML(space+"  "))}}
      return space + "<"+tag+attr+">\n" + data.join("\n") + "\n" + space + "</"+tag+">";
    }
  });
  
  MML.munderover.Augment({
    toMathML: function (space) {
      var tag = this.type;
      if (this.data[this.under] == null) {tag = "mover"}
      if (this.data[this.over] == null)  {tag = "munder"}
      var attr = this.toMathMLattributes();
      delete this.data[0].inferred;
      var data = [];
      for (var i = 0, m = this.data.length; i < m; i++)
        {if (this.data[i]) {data.push(this.data[i].toMathML(space+"  "))}}
      return space + "<"+tag+attr+">\n" + data.join("\n") + "\n" + space + "</"+tag+">";
    }
  });
  
  MML.TeXAtom.Augment({
    toMathML: function (space) {
      // FIXME:  Handle spacing using mpadded?
      var attr = this.toMathMLattributes();
      if (!attr && this.data[0].data.length === 1) {return space.substr(2) + this.data[0].toMathML(space)}
      return space+"<mrow"+attr+">\n" + this.data[0].toMathML(space+"  ")+"\n"+space+"</mrow>";
    }
  });
  
  MML.chars.Augment({
    toMathML: function (space) {return (space||"") + this.toMathMLquote(this.toString())}
  });
  
  MML.entity.Augment({
    toMathML: function (space) {return (space||"") + "&"+this.data[0]+";<!-- "+this.toString()+" -->"}
  });
  
  MML.xml.Augment({
   toMathML: function (space) {return (space||"") + this.toString()}
  });
  
  MathJax.Hub.Register.StartupHook("TeX mathchoice Ready",function () {
    MML.TeXmathchoice.Augment({
      toMathML: function (space) {return this.Core().toMathML(space)}
    });
  });
  
  MathJax.Hub.Startup.signal.Post("toMathML Ready");
  
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/toMathML.js");
