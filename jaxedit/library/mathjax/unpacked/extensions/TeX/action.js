/*************************************************************
 *
 *  MathJax/extensions/TeX/action.js
 *  
 *  Implements the \mathtip, \texttip, and \toggle macros, which give
 *  access from TeX to the <maction> tag in the MathML that underlies
 *  MathJax's internal format.
 *  
 *  Usage:
 *  
 *      \mathtip{math}{tip}        % use "tip" (in math mode) as tooltip for "math"
 *      \texttip{math}{tip}        % use "tip" (in text mode) as tooltip for "math"
 *      \toggle{math1}{math2}...\endtoggle
 *                                 % show math1, and when clicked, show math2, and so on.
 *                                 %   When the last one is clicked, go back to math1.   
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

MathJax.Extension["TeX/action"] = {
  version: "2.1"
};
  
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX,
      MML = MathJax.ElementJax.mml;
  
  //
  //  Set up control sequenecs
  //
  TEX.Definitions.Add({
    macros: {
      toggle:  'Toggle',
      mathtip: 'Mathtip',
      texttip: ['Macro','\\mathtip{#1}{\\text{#2}}',2]
    }
  },null,true);

  TEX.Parse.Augment({

    //
    //  Implement \toggle {math1} {math2} ... \endtoggle
    //    (as an <maction actiontype="toggle">)
    //
    Toggle: function (name) {
      var data = [], arg;
      while ((arg = this.GetArgument(name)) !== "\\endtoggle")
        {data.push(TEX.Parse(arg,this.stack.env).mml())}
      this.Push(MML.maction.apply(MML,data).With({actiontype: MML.ACTIONTYPE.TOGGLE}));
    },

    //
    //  Implement \mathtip{math}{tip}
    //    (an an <maction actiontype="tooltip">)
    //
    Mathtip: function(name) {
      var arg = this.ParseArg(name), tip = this.ParseArg(name);
      this.Push(MML.maction(arg,tip).With({actiontype: MML.ACTIONTYPE.TOOLTIP}));
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX action Ready");
  
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/action.js");
