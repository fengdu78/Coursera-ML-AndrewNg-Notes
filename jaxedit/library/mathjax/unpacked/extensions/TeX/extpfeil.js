/*************************************************************
 *
 *  MathJax/extensions/TeX/extpfeil.js
 *  
 *  Implements additional stretchy arrow macros.
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

MathJax.Extension["TeX/extpfeil"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  
  var TEX = MathJax.InputJax.TeX,
      TEXDEF = TEX.Definitions;
  
  //
  //  Define the arrows to load the AMSmath extension
  //  (since they need its xArrow method)
  // 
  TEXDEF.Add({
    macros: {
      xtwoheadrightarrow: ['Extension','AMSmath'],
      xtwoheadleftarrow:  ['Extension','AMSmath'],
      xmapsto:            ['Extension','AMSmath'],
      xlongequal:         ['Extension','AMSmath'],
      xtofrom:            ['Extension','AMSmath'],
      Newextarrow:        ['Extension','AMSmath']
    }
  },null,true);
  
  //
  //  Redefine the macros when AMSmath is loaded
  //
  MathJax.Hub.Register.StartupHook("TeX AMSmath Ready",function () {
    MathJax.Hub.Insert(TEXDEF,{
      macros: {
        xtwoheadrightarrow: ['xArrow',0x21A0,12,16],
        xtwoheadleftarrow:  ['xArrow',0x219E,17,13],
        xmapsto:            ['xArrow',0x21A6,6,7],
        xlongequal:         ['xArrow',0x003D,7,7],
        xtofrom:            ['xArrow',0x21C4,12,12],
        Newextarrow:        'NewExtArrow'
      }
    });
  });

  //
  //  Implements \Newextarrow to define a new arrow (not compatible with \newextarrow, but
  //  the equivalent for MathJax)
  //
  TEX.Parse.Augment({
    NewExtArrow: function (name) {
      var cs    = this.GetArgument(name),
          space = this.GetArgument(name),
          chr   = this.GetArgument(name);
      if (!cs.match(/^\\([a-z]+|.)$/i))
        {TEX.Error("First argument to "+name+" must be a control sequence name")}
      if (!space.match(/^(\d+),(\d+)$/))
        {TEX.Error("Second argument to "+name+" must be two integers separated by a comma")}
      if (!chr.match(/^(\d+|0x[0-9A-F]+)$/i))
        {TEX.Error("Third argument to "+name+" must be a unicode character number")}
      cs = cs.substr(1); space = space.split(","); chr = parseInt(chr);
      TEXDEF.macros[cs] = ['xArrow',chr,parseInt(space[0]),parseInt(space[1])];
    }
  });
  
  MathJax.Hub.Startup.signal.Post("TeX extpfeil Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/extpfeil.js");
