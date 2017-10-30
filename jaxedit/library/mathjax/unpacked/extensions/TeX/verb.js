/*************************************************************
 *
 *  MathJax/extensions/TeX/verb.js
 *  
 *  Implements the \verb|...| command for including text verbatim
 *  (with no processing of macros or special characters).
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2009-2012 Design Science, Inc.
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

MathJax.Extension["TeX/verb"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  
  var MML = MathJax.ElementJax.mml;
  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  
  TEXDEF.Add({macros: {verb: 'Verb'}},null,true);

  TEX.Parse.Augment({

    /*
     *  Implement \verb|...|
     */
    Verb: function (name) {
      var c = this.GetNext(); var start = ++this.i;
      if (c == "" ) {TEX.Error(name+" requires an argument")}
      while (this.i < this.string.length && this.string.charAt(this.i) != c) {this.i++}
      if (this.i == this.string.length) 
        {TEX.Error("Can't find closing delimiter for "+name)}
      var text = this.string.slice(start,this.i); this.i++;
      this.Push(MML.mtext(text).With({mathvariant:MML.VARIANT.MONOSPACE}));
    }
    
  });
  
  MathJax.Hub.Startup.signal.Post("TeX verb Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/verb.js");
