/*************************************************************
 *
 *  MathJax/extensions/TeX/boldsymbol.js
 *  
 *  Implements the \boldsymbol{...} command to make bold
 *  versions of all math characters (not just variables).
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

MathJax.Extension["TeX/boldsymbol"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  
  var MML = MathJax.ElementJax.mml;
  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  
  var BOLDVARIANT = {};
  BOLDVARIANT[MML.VARIANT.NORMAL]    = MML.VARIANT.BOLD;
  BOLDVARIANT[MML.VARIANT.ITALIC]    = MML.VARIANT.BOLDITALIC;
  BOLDVARIANT[MML.VARIANT.FRAKTUR]   = MML.VARIANT.BOLDFRAKTUR;
  BOLDVARIANT[MML.VARIANT.SCRIPT]    = MML.VARIANT.BOLDSCRIPT;
  BOLDVARIANT[MML.VARIANT.SANSSERIF] = MML.VARIANT.BOLDSANSSERIF;
  BOLDVARIANT["-tex-caligraphic"]    = "-tex-caligraphic-bold";
  BOLDVARIANT["-tex-oldstyle"]       = "-tex-oldstyle-bold";
  
  TEXDEF.Add({macros: {boldsymbol: 'Boldsymbol'}},null,true);
  
  TEX.Parse.Augment({
    mmlToken: function (token) {
      if (this.stack.env.boldsymbol) {
        var variant = token.Get("mathvariant");
        if (variant == null) {token.mathvariant = MML.VARIANT.BOLD}
        else {token.mathvariant = (BOLDVARIANT[variant]||variant)}
      }
      return token;
    },
    
    Boldsymbol: function (name) {
      var boldsymbol = this.stack.env.boldsymbol,
          font = this.stack.env.font;
      this.stack.env.boldsymbol = true;
      this.stack.env.font = null;
      var mml = this.ParseArg(name);
      this.stack.env.font = font;
      this.stack.env.boldsymbol = boldsymbol;
      this.Push(mml);
    }
  });
  
  MathJax.Hub.Startup.signal.Post("TeX boldsymbol Ready");

});

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
  var HTMLCSS = MathJax.OutputJax["HTML-CSS"];
  var FONTS = HTMLCSS.FONTDATA.FONTS;
  var VARIANT = HTMLCSS.FONTDATA.VARIANT;

  if (HTMLCSS.fontInUse === "TeX") {
    FONTS["MathJax_Caligraphic-bold"] = "Caligraphic/Bold/Main.js";

    VARIANT["-tex-caligraphic-bold"] =
      {fonts:["MathJax_Caligraphic-bold","MathJax_Main-bold","MathJax_Main","MathJax_Math","MathJax_Size1"],
       offsetA: 0x41, variantA: "bold-italic"};
    VARIANT["-tex-oldstyle-bold"] =
      {fonts:["MathJax_Caligraphic-bold","MathJax_Main-bold","MathJax_Main","MathJax_Math","MathJax_Size1"]};

    if (HTMLCSS.msieCheckGreek && HTMLCSS.Font.testFont({
      family:"MathJax_Greek", weight:"bold", style:"italic", testString: HTMLCSS.msieCheckGreek
    })) {
      VARIANT["bold-italic"].offsetG = 0x391; VARIANT["bold-italic"].variantG = "-Greek-Bold-Italic";
      VARIANT["-Greek-Bold-Italic"] = {fonts:["MathJax_Greek-bold-italic"]};
      FONTS["MathJax_Greek-bold-italic"] = "Greek/BoldItalic/Main.js";
    }
    
    if (MathJax.Hub.Browser.isChrome && !MathJax.Hub.Browser.versionAtLeast("5.0")) {
      VARIANT["-tex-caligraphic-bold"].remap = {0x54: [0xE2F0,"-WinChrome"]};
    }
    
  } else if (HTMLCSS.fontInUse === "STIX") {
    VARIANT["-tex-caligraphic-bold"] = {
      fonts:["STIXGeneral-bold-italic","STIXNonUnicode-bold-italic","STIXNonUnicode","STIXGeneral","STIXSizeOneSym"],
      offsetA: 0xE247, noLowerCase: 1
    };
    VARIANT["-tex-oldstyle-bold"] = {
      fonts:["STIXGeneral-bold","STIXNonUnicode-bold","STIXGeneral","STIXSizeOneSym"], offsetN: 0xE263,
      remap: {0xE264: 0xE267, 0xE265: 0xE26B, 0xE266: 0xE26F, 0xE267: 0xE273,
              0xE268: 0xE277, 0xE269: 0xE27B, 0xE26A: 0xE27F, 0xE26B: 0xE283,
              0xE26C: 0xE287}
    };
  }
});

MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
  var SVG = MathJax.OutputJax.SVG;
  var FONTS = SVG.FONTDATA.FONTS;
  var VARIANT = SVG.FONTDATA.VARIANT;

  FONTS["MathJax_Caligraphic-bold"] = "Caligraphic/Bold/Main.js";

  VARIANT["-tex-caligraphic-bold"] =
    {fonts:["MathJax_Caligraphic-bold","MathJax_Main-bold","MathJax_Main","MathJax_Math","MathJax_Size1"],
     offsetA: 0x41, variantA: "bold-italic"};
  VARIANT["-tex-oldstyle-bold"] =
    {fonts:["MathJax_Caligraphic-bold","MathJax_Main-bold","MathJax_Main","MathJax_Math","MathJax_Size1"]};
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/boldsymbol.js");
