/*************************************************************
 *
 *  MathJax/extensions/TeX/enclose.js
 *  
 *  Implements the \enclose macros, which give access from TeX to the
 *  <menclose> tag in the MathML that underlies MathJax's internal format.
 *  
 *  Usage:
 *  
 *      \enclose{notation}{math}                  % enclose math using given notation
 *      \enclose{notation,notation,...}{math}     % enclose with several notations
 *      \enclose{notation}[attributes]{math}      % enclose with attributes
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

MathJax.Extension["TeX/enclose"] = {
  version: "2.1",
  
  //
  //  The attributes allowed in \enclose{notation}[attributes]{math}
  //
  ALLOWED: {
    arrow: 1,
    color: 1, mathcolor: 1,
    background: 1, mathbackground: 1,
    padding: 1,
    thickness: 1
  }
};
  
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX,
      MML = MathJax.ElementJax.mml,
      ALLOW = MathJax.Extension["TeX/enclose"].ALLOWED;
  
  //
  //  Set up macro
  //
  TEX.Definitions.Add({macros: {enclose: 'Enclose'}},null,true);

  TEX.Parse.Augment({
    //
    //  Implement \enclose{notation}[attr]{math}
    //    (create <menclose notation="notation">math</menclose>)
    //
    Enclose: function(name) {
      var notation = this.GetArgument(name),
          attr = this.GetBrackets(name),
          math = this.ParseArg(name);
      var def = {notation: notation.replace(/,/g," ")};
      if (attr) {
        attr = attr.replace(/ /g,"").split(/,/);
        for (var i = 0, m = attr.length; i < m; i++) {
          var keyvalue = attr[i].split(/[:=]/);
          if (ALLOW[keyvalue[0]]) {
            keyvalue[1] = keyvalue[1].replace(/^"(.*)"$/,"$1");
            if (keyvalue[1] === "true") {keyvalue[1] = true}
            if (keyvalue[1] === "false") {keyvalue[1] = false}
            def[keyvalue[0]] = keyvalue[1];
          }
        }
      }
      this.Push(MML.menclose(math).With(def));
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX enclose Ready");
  
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/enclose.js");
