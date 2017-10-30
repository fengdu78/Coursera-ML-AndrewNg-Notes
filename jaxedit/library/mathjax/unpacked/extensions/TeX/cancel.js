/*************************************************************
 *
 *  MathJax/extensions/TeX/cancel.js
 *  
 *  Implements the \cancel, \bcancel, \xcancel, and \cancelto macros.
 *  
 *  Usage:
 *  
 *      \cancel{math}            % strikeout math from lower left to upper right
 *      \bcancel{math}           % strikeout from upper left to lower right
 *      \xcancel{math}           % strikeout with an X
 *      \cancelto{value}{math}   % strikeout with arrow going to value
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

MathJax.Extension["TeX/cancel"] = {
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
      CANCEL = MathJax.Extension["TeX/cancel"];
      
      CANCEL.setAttributes = function (def,attr) {
        if (attr !== "") {
          attr = attr.replace(/ /g,"").split(/,/);
          for (var i = 0, m = attr.length; i < m; i++) {
            var keyvalue = attr[i].split(/[:=]/);
            if (CANCEL.ALLOWED[keyvalue[0]]) {
              if (keyvalue[1] === "true") {keyvalue[1] = true}
              if (keyvalue[1] === "false") {keyvalue[1] = false}
              def[keyvalue[0]] = keyvalue[1];
            }
          }
        }
        return def;
      };
  
  //
  //  Set up macros
  //
  TEX.Definitions.Add({
    macros: {
      cancel:   ['Cancel',MML.NOTATION.UPDIAGONALSTRIKE],
      bcancel:  ['Cancel',MML.NOTATION.DOWNDIAGONALSTRIKE],
      xcancel:  ['Cancel',MML.NOTATION.UPDIAGONALSTRIKE+" "+MML.NOTATION.DOWNDIAGONALSTRIKE],
      cancelto: 'CancelTo'
    }
  },null,true);

  TEX.Parse.Augment({
    //
    //  Implement \cancel[attributes]{math},
    //            \bcancel[attributes]{math}, and
    //            \xcancel[attributes]{math}
    //
    Cancel: function(name,notation) {
      var attr = this.GetBrackets(name,""), math = this.ParseArg(name);
      var def = CANCEL.setAttributes({notation: notation},attr);
      this.Push(MML.menclose(math).With(def));
    },
    
    //
    //  Implement \cancelto{value}[attributes]{math}
    //
    CancelTo: function(name,notation) {
      var value = this.ParseArg(name),
          attr = this.GetBrackets(name,""),
          math = this.ParseArg(name);
      var def = CANCEL.setAttributes({notation: MML.NOTATION.UPDIAGONALSTRIKE, arrow:true},attr);
      value = MML.mpadded(value).With({depth:"-.1em",height:"+.1em",voffset:".1em"});
      this.Push(MML.msup(MML.menclose(math).With(def),value));
    }

  });

  MathJax.Hub.Startup.signal.Post("TeX cancel Ready");
  
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/cancel.js");
