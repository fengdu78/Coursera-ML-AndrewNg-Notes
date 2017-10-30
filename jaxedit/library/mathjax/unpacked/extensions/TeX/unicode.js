/*************************************************************
 *
 *  MathJax/extensions/TeX/unicode.js
 *  
 *  Implements the \unicode extension to TeX to allow arbitrary unicode
 *  code points to be entered into the TeX file.  You can specify
 *  the height and depth of the character (the width is determined by
 *  the browser), and the default font from which to take the character.
 *  
 *  Examples:
 *      \unicode{65}                        % the character 'A'
 *      \unicode{x41}                       % the character 'A'
 *      \unicode[.55,0.05]{x22D6}           % less-than with dot, with height .55 and depth 0.05
 *      \unicode[.55,0.05][Geramond]{x22D6} % same taken from Geramond font
 *      \unicode[Garamond]{x22D6}           % same, but with default height, depth of .8,.2
 *
 *  Once a size and font are provided for a given code point, they need
 *  not be specified again in subsequent \unicode calls for that character.
 *  Note that a font list can be given, but Internet Explorer has a buggy
 *  implementation of font-family where it only looks in the first
 *  available font and if the glyph is not in that, it does not look at
 *  later fonts, but goes directly to the default font as set in the
 *  Internet-Options/Font panel.  For this reason, the default font list is
 *  "STIXGeneral,'Arial Unicode MS'", so if the user has STIX fonts, the
 *  symbol will be taken from that (almost all the symbols are in
 *  STIXGeneral), otherwise Arial Unicode MS is tried.
 *  
 *  To configure the default font list, use
 *  
 *      MathJax.Hub.Config({
 *        TeX: {
 *          unicode: {
 *            fonts: "STIXGeneral,'Arial Unicode MS'"
 *          }
 *        }
 *      });
 *
 *  The result of \unicode will have TeX class ORD (i.e., it will act like a
 *  variable).  Use \mathbin, \mathrel, etc, to specify a different class.
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

//
//  The configuration defaults, augmented by the user settings
//  
MathJax.Extension["TeX/unicode"] = {
  version: "2.1",
  unicode: {},
  config: MathJax.Hub.CombineConfig("TeX.unicode",{
    fonts: "STIXGeneral,'Arial Unicode MS'"
  })
};
  
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX;
  var MML = MathJax.ElementJax.mml;
  var UNICODE = MathJax.Extension["TeX/unicode"].unicode;
  
  //
  //  Add \unicode macro
  //
  TEX.Definitions.Add({macros: {unicode: 'Unicode'}},null,true);
  //
  //  Implementation of \unicode in parser
  //
  TEX.Parse.Augment({
    Unicode: function(name) {
      var HD = this.GetBrackets(name), font;
      if (HD) {
        if (HD.replace(/ /g,"").match(/^(\d+(\.\d*)?|\.\d+),(\d+(\.\d*)?|\.\d+)$/))
          {HD = HD.replace(/ /g,"").split(/,/); font = this.GetBrackets(name)}
            else {font = HD; HD = null}
      }
      var n = this.trimSpaces(this.GetArgument(name)),
          N = parseInt(n.match(/^x/) ? "0"+n : n);
      if (!UNICODE[N]) {UNICODE[N] = [800,200,font,N]}
      else if (!font) {font = UNICODE[N][2]}
      if (HD) {
        UNICODE[N][0] = Math.floor(HD[0]*1000);
        UNICODE[N][1] = Math.floor(HD[1]*1000);
      }
      var variant = this.stack.env.font, def = {};
      if (font) {
        UNICODE[N][2] = def.fontfamily = font.replace(/"/g,"'");
        if (variant) {
          if (variant.match(/bold/))   {def.fontweight = "bold"}
          if (variant.match(/italic|-mathit/)) {def.fontstyle = "italic"}
        }
      } else if (variant) {def.mathvariant = variant}
      def.unicode = [].concat(UNICODE[N]); // make a copy
      this.Push(MML.mtext(MML.entity("#"+n)).With(def));
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX unicode Ready");
  
});
    
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var MML = MathJax.ElementJax.mml;
  var FONTS = MathJax.Extension["TeX/unicode"].config.fonts;

  //
  //  Override getVariant to make one that includes the font and size
  //
  var GETVARIANT = MML.mbase.prototype.HTMLgetVariant;
  MML.mbase.Augment({
    HTMLgetVariant: function () {
      var variant = GETVARIANT.call(this);
      if (variant.unicode) {delete variant.unicode; delete variant.FONTS} // clear font cache in case of restart
      if (!this.unicode) {return variant}
      variant.unicode = true;
      if (!variant.defaultFont) {
        variant = MathJax.Hub.Insert({},variant); // make a copy
        variant.defaultFont = {family:FONTS};
      }
      var family = this.unicode[2]; if (family) {family += ","+FONTS} else {family = FONTS}
      variant.defaultFont[this.unicode[3]] = [
        this.unicode[0],this.unicode[1],500,0,500,
        {isUnknown:true, isUnicode:true, font:family}
      ];
      return variant;
    }
  });
});

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  var MML = MathJax.ElementJax.mml;
  var FONTS = MathJax.Extension["TeX/unicode"].config.fonts;

  //
  //  Override getVariant to make one that includes the font and size
  //
  var GETVARIANT = MML.mbase.prototype.SVGgetVariant;
  MML.mbase.Augment({
    SVGgetVariant: function () {
      var variant = GETVARIANT.call(this);
      if (variant.unicode) {delete variant.unicode; delete variant.FONTS} // clear font cache in case of restart
      if (!this.unicode) {return variant}
      variant.unicode = true;
      if (!variant.forceFamily) {variant = MathJax.Hub.Insert({},variant)} // make a copy
      variant.defaultFamily = FONTS; variant.noRemap = true;
      variant.h = this.unicode[0]; variant.d = this.unicode[1];
      return variant;
    }
  });
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/unicode.js");
