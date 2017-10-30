/*************************************************************
 *
 *  MathJax/extensions/TeX/bbox.js
 *  
 *  This file implements the \bbox macro, which creates an box that
 *  can be styled (for background colors, and so on).  You can include
 *  an optional dimension that tells how much extra padding to include
 *  around the bounding box for the mathematics, or a color specification 
 *  for the background color to use, or both.  E.g.,
 *  
 *    \bbox[2pt]{x+y}        %  an invisible box around x+y with 2pt of extra space
 *    \bbox[green]{x+y}      %  a green box around x+y
 *    \bbox[green,2pt]{x+y}  %  a green box with 2pt of extra space
 *
 *  You can also specify style attributes, for example
 *  
 *    \bbox[red,border:3px solid blue,5px]{x+y}
 *  
 *  would give a red background with a 3px solid blue border that has 5px
 *  of padding between the border and the mathematics.  Note that not all
 *  output formats support the style specifications.  In particular, the
 *  NativeMML output depends on the browser to render the attributes, and
 *  not all MathML renderers will honor them (e.g., MathPlayer2 doesn't
 *  render border styles).
 *  
 *  This file will be loaded automatically when \bbox is first used.
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

MathJax.Extension["TeX/bbox"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {

  var TEX = MathJax.InputJax.TeX,
      MML = MathJax.ElementJax.mml;

  TEX.Definitions.Add({macros: {bbox: "BBox"}},null,true);
  
  TEX.Parse.Augment({
    BBox: function (name) {
      var bbox = this.GetBrackets(name,""),
          math = this.ParseArg(name);
      var parts = bbox.split(/,/), def, background, style;
      for (var i in parts) {
        var part = parts[i].replace(/^\s+/,'').replace(/\s+$/,'');
        var match = part.match(/^(\.\d+|\d+(\.\d*)?)(pt|em|ex|mu|px|in|cm|mm)$/);
        if (match) {
          var pad = match[1]+match[3];
          if (def) {TEX.Error("Padding specified twice in "+name)}
          def = {height:"+"+pad, depth:"+"+pad, lspace:pad, width:"+"+(2*match[1])+match[3]};
        } else if (part.match(/^([a-z0-9]+|\#[0-9a-f]{6}|\#[0-9a-f]{3})$/i)) {
          if (background) {TEX.Error("Background specified twice in "+name)}
          background = part;
        } else if (part.match(/^[-a-z]+:/i)) {
          if (style) {TEX.Error("Style specified twice in "+name)}
          style = part;
        } else if (part !== "") {
          TEX.Error("'"+part+"' doesn't look like a color, a padding dimension, or a style");
        }
      }
      if (def) {math = MML.mpadded(math).With(def)}
      if (background || style) {
        math = MML.mstyle(math).With({mathbackground:background, style:style});
      }
      this.Push(math);
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX bbox Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/bbox.js");
