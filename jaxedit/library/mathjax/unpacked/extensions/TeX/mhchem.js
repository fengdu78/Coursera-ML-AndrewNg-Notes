/*************************************************************
 *
 *  MathJax/extensions/TeX/mhchem.js
 *  
 *  Implements the \ce command for handling chemical formulas
 *  from the mhchem LaTeX package.
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

MathJax.Extension["TeX/mhchem"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  
  var TEX = MathJax.InputJax.TeX;
  
  /*
   *  This is the main class for handing the \ce and related commands.
   *  Its main method is Parse() which takes the argument to \ce and
   *  returns the corresponding TeX string.
   */

  var CE = MathJax.Object.Subclass({
    string: "",   // the \ce string being parsed
    i: 0,         // the current position in the string
    tex: "",      // the processed TeX result
    atom: false,  // last processed token is an atom
    sup: "",      // pending superscript
    sub: "",      // pending subscript
    
    //
    //  Store the string when a CE object is created
    //
    Init: function (string) {this.string = string},
    
    //
    //  These are the special characters and the methods that
    //  handle them.  All others are passed through verbatim.
    //
    ParseTable: {
      '-': "Minus",
      '+': "Plus",
      '(': "Open",
      ')': "Close",
      '[': "Open",
      ']': "Close",
      '<': "Less",
      '^': "Superscript",
      '_': "Subscript",
      '*': "Dot",
      '.': "Dot",
      '=': "Equal",
      '#': "Pound",
      '$': "Math",
      '\\': "Macro",
      ' ': "Space"
    },
    //
    //  Basic arrow names for reactions
    //
    Arrows: {
      '->': "rightarrow",
      '<-': "leftarrow",
      '<->': "leftrightarrow",
      '<=>': "rightleftharpoons",
      '<=>>': "Rightleftharpoons",
      '<<=>': "Leftrightharpoons",
      '^': "uparrow",
      'v': "downarrow"
    },
    
    //
    //  Implementations for the various bonds
    //  (the ~ ones are hacks that don't work well in NativeMML)
    //
    Bonds: {
      '-': "-",
      '=': "=",
      '#': "\\equiv",
      '~': "\\tripledash",
      '~-': "\\begin{CEstack}{}\\tripledash\\\\-\\end{CEstack}",
      '~=': "\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}",
      '~--': "\\raise2mu{\\begin{CEstack}{}\\tripledash\\\\-\\\\-\\end{CEstack}}",
      '-~-': "\\raise2mu{\\begin{CEstack}{}-\\\\\\tripledash\\\\-\\end{CEstack}}",
      '...': "{\\cdot}{\\cdot}{\\cdot}",
      '....': "{\\cdot}{\\cdot}{\\cdot}{\\cdot}",
      '->': "\\rightarrow",
      '<-': "\\leftarrow",
      '??': "\\text{??}"           // unknown bond
    },

    //
    //  This converts the CE string to a TeX string.
    //  It loops through the string and calls the proper
    //  method depending on the ccurrent character.
    //  
    Parse: function () {
      this.tex = ""; this.atom = false;
      while (this.i < this.string.length) {
        var c = this.string.charAt(this.i);
        if (c.match(/[a-z]/i)) {this.ParseLetter()}
        else if (c.match(/[0-9]/)) {this.ParseNumber()}
        else {this["Parse"+(this.ParseTable[c]||"Other")](c)}
      }
      this.FinishAtom();
      return this.tex;
    },
    
    //
    //  Make an atom name or a down arrow
    //  
    ParseLetter: function () {
      this.FinishAtom();
      if (this.Match(/^v( |$)/)) {
        this.tex += "{\\"+this.Arrows["v"]+"}";
      } else {
        this.tex += "\\text{"+this.Match(/^[a-z]+/i)+"}";
        this.atom = true;
      }
    },
    
    //
    //  Make a number or fraction preceeding an atom,
    //  or a subscript for an atom.
    //  
    ParseNumber: function () {
      var n = this.Match(/^\d+/);
      if (this.atom && !this.sub) {
        this.sub = n;
      } else {
        this.FinishAtom();
        var match = this.Match(/^\/\d+/);
        if (match) {
          var frac = "\\frac{"+n+"}{"+match.substr(1)+"}";
          this.tex += "\\mathchoice{\\textstyle"+frac+"}{"+frac+"}{"+frac+"}{"+frac+"}";
        } else {
          this.tex += n;
          if (this.i < this.string.length) {this.tex += "\\,"}
        }
      }
    },
    
    //
    //  Make a superscript minus, or an arrow, or a single bond.
    //
    ParseMinus: function (c) {
      if (this.atom && (this.i === this.string.length-1 || this.string.charAt(this.i+1) === " ")) {
        this.sup += c;
      } else {
        this.FinishAtom();
        if (this.string.substr(this.i,2) === "->") {this.i += 2; this.AddArrow("->"); return}
        else {this.tex += "{-}"}
      }
      this.i++;
    },

    //
    //  Make a superscript plus, or pass it through
    //
    ParsePlus: function (c) {
      if (this.atom) {this.sup += c} else {this.FinishAtom(); this.tex += c}
      this.i++;
    },
    
    //
    //  Handle dots and double or triple bonds
    //
    ParseDot:   function (c) {this.FinishAtom(); this.tex += "\\cdot "; this.i++},
    ParseEqual: function (c) {this.FinishAtom(); this.tex += "{=}"; this.i++},
    ParsePound: function (c) {this.FinishAtom(); this.tex += "{\\equiv}"; this.i++},

    //
    //  Look for (v) or (^), or pass it through
    //
    ParseOpen: function (c) {
      this.FinishAtom();
      var match = this.Match(/^\([v^]\)/);
      if (match) {this.tex += "{\\"+this.Arrows[match.charAt(1)]+"}"}
        else {this.tex += "{"+c; this.i++}
    },
    //
    //  Allow ) and ] to get super- and subscripts
    //
    ParseClose: function (c) {this.FinishAtom(); this.atom = true; this.tex += c+"}"; this.i++},

    //
    //  Make the proper arrow
    //
    ParseLess: function (c) {
      this.FinishAtom();
      var arrow = this.Match(/^(<->?|<=>>?|<<=>)/);
      if (!arrow) {this.tex += c; this.i++} else {this.AddArrow(arrow)}
    },

    //
    //  Look for a superscript, or an up arrow
    //  
    ParseSuperscript: function (c) {
      c = this.string.charAt(++this.i);
      if (c === "{") {
        this.i++; var m = this.Find("}");
        if (m === "-.") {this.sup += "{-}{\\cdot}"}
        else if (m) {this.sup += CE(m).Parse().replace(/^\{-\}/,"-")}
      } else if (c === " " || c === "") {
        this.tex += "{\\"+this.Arrows["^"]+"}"; this.i++;
      } else {
        var n = this.Match(/^(\d+|-\.)/);
        if (n) {this.sup += n}
      }
    },
    //
    //  Look for subscripts
    //
    ParseSubscript: function (c) {
      if (this.string.charAt(++this.i) == "{") {
        this.i++; this.sub += CE(this.Find("}")).Parse().replace(/^\{-\}/,"-");
      } else {
        var n = this.Match(/^\d+/);
        if (n) {this.sub += n}
      }
    },

    //
    //  Look for raw TeX code to include
    //
    ParseMath: function (c) {
      this.FinishAtom();
      this.i++; this.tex += this.Find(c);
    },
    
    //
    //  Look for specific macros for bonds
    //  and allow \} to have subscripts
    //
    ParseMacro: function (c) {
      this.FinishAtom();
      this.i++; var match = this.Match(/^([a-z]+|.)/i)||" ";
      if (match === "sbond") {this.tex += "{-}"}
      else if (match === "dbond") {this.tex += "{=}"}
      else if (match === "tbond") {this.tex += "{\\equiv}"}
      else if (match === "bond") {
        var bond = (this.Match(/^\{.*?\}/)||"");
        bond = bond.substr(1,bond.length-2);
        this.tex += "{"+(this.Bonds[bond]||"\\text{??}")+"}";
      }
      else if (match === "{") {this.tex += "{\\{"}
      else if (match === "}") {this.tex += "\\}}"; this.atom = true}
      else {this.tex += c+match}
    },
    
    //
    //  Ignore spaces
    //
    ParseSpace: function (c) {this.FinishAtom(); this.i++},
    
    //
    //  Pass anything else on verbatim
    //
    ParseOther: function (c) {this.FinishAtom(); this.tex += c; this.i++},

    //
    //  Process an arrow (looking for brackets for above and below)
    //
    AddArrow: function (arrow) {
      var c = this.Match(/^[CT]\[/);
      if (c) {this.i--; c = c.charAt(0)}
      var above = this.GetBracket(c), below = this.GetBracket(c);
      arrow = this.Arrows[arrow];
      if (above || below) {
        if (below) {arrow += "["+below+"]"}
        arrow += "{"+above+"}";
        arrow = "\\mathrel{\\x"+arrow+"}";
      } else {
        arrow = "\\long"+arrow+" ";
      }
      this.tex += arrow;
    },

    //
    //  Handle the super and subscripts for an atom
    //  
    FinishAtom: function () {
      if (this.sup || this.sub) {
        if (this.sup && this.sub && !this.atom) {
          //
          // right-justify super- and subscripts when they are before the atom
          //
          var sup = this.sup, sub = this.sub;
          if (!sup.match(/\d/)) {sup += "\\vphantom{0}"} // force common heights
          if (!sub.match(/\d/)) {sub += "\\vphantom{0}"}
          this.tex += "\\raise 1pt{\\scriptstyle\\begin{CEscriptstack}"+sup+"\\\\"+
                         sub+"\\end{CEscriptstack}}\\kern-.125em ";
        } else {
          if (!this.sup) {this.sup = "\\Space{0pt}{0pt}{.2em}"} // forces subscripts to align properly
          this.tex += "^{"+this.sup+"}_{"+this.sub+"}";
        }
        this.sup = this.sub = "";
      }
      this.atom = false;
    },
    
    //
    //  Find a bracket group and handle C and T prefixes
    //
    GetBracket: function (c) {
      if (this.string.charAt(this.i) !== "[") {return ""}
      this.i++; var bracket = this.Find("]");
      if (c === "C") {bracket = "\\ce{"+bracket+"}"} else
      if (c === "T") {
        if (!bracket.match(/^\{.*\}$/)) {bracket = "{"+bracket+"}"}
        bracket = "\\text"+bracket;
      };
      return bracket;
    },

    //
    //  Check if the string matches a regular expression
    //    and move past it if so, returning the match
    //
    Match: function (regex) {
      var match = regex.exec(this.string.substr(this.i));
      if (match) {match = match[0]; this.i += match.length}
      return match;
    },
    
    //
    //  Find a particular character, skipping over braced groups
    //
    Find: function (c) {
      var m = this.string.length, i = this.i, braces = 0;
      while (this.i < m) {
        var C = this.string.charAt(this.i++);
        if (C === c && braces === 0) {return this.string.substr(i,this.i-i-1)}
        if (C === "{") {braces++} else
        if (C === "}") {
          if (braces) {braces--}
            else {TEX.Error("Extra close brace or missing open brace")}
        }
      }
      if (braces) {TEX.Error("Missing close brace")};
      TEX.Error("Can't find closing "+c);
    }
    
  });
  
  MathJax.Extension["TeX/mhchem"].CE = CE;
  
  /***************************************************************************/
  
  TEX.Definitions.Add({
    macros: {
      //
      //  Set up the macros for chemistry
      //
      ce:   'CE',
      cf:   'CE',
      cee:  'CE',
  
      //
      //  Make these load AMSmath package (redefined below when loaded)
      //
      xleftrightarrow:    ['Extension','AMSmath'],
      xrightleftharpoons: ['Extension','AMSmath'],
      xRightleftharpoons: ['Extension','AMSmath'],
      xLeftrightharpoons: ['Extension','AMSmath'],

      //  FIXME:  These don't work well in FF NativeMML mode
      longrightleftharpoons: ["Macro","\\stackrel{\\textstyle{{-}\\!\\!{\\rightharpoonup}}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}"],
      longRightleftharpoons: ["Macro","\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\small\\smash\\leftharpoondown}"],
      longLeftrightharpoons: ["Macro","\\stackrel{\\rightharpoonup}{{{\\leftharpoondown}\\!\\!\\textstyle{-}}}"],

      //
      //  Add \hyphen used in some mhchem examples
      //  
      hyphen: ["Macro","\\text{-}"],
      
      //
      //  Needed for \bond for the ~ forms
      //
      tripledash: ["Macro","\\raise3mu{\\tiny\\text{-}\\kern2mu\\text{-}\\kern2mu\\text{-}}"]
    },
    
    //
    //  Needed for \bond for the ~ forms
    //
    environment: {
      CEstack:       ['Array',null,null,null,'r',null,"0.001em",'T',1],
      CEscriptstack: ['Array',null,null,null,'r',null,"0.2em",'S',1]
    }
  },null,true);
  
  if (!MathJax.Extension["TeX/AMSmath"]) {
    TEX.Definitions.Add({
      macros: {
        xrightarrow: ['Extension','AMSmath'],
        xleftarrow:  ['Extension','AMSmath']
      }
    },null,true);
  }
  
  //
  //  These arrows need to wait until AMSmath is loaded
  //
  MathJax.Hub.Register.StartupHook("TeX AMSmath Ready",function () {
    TEX.Definitions.Add({
      macros: {
        //
        //  Some of these are hacks for now
        //
        xleftrightarrow:    ['xArrow',0x2194,6,6],
        xrightleftharpoons: ['xArrow',0x21CC,5,7],  // FIXME:  doesn't stretch in HTML-CSS output
        xRightleftharpoons: ['xArrow',0x21CC,5,7],  // FIXME:  how should this be handled?
        xLeftrightharpoons: ['xArrow',0x21CC,5,7]
      }
    },null,true);
  });

  TEX.Parse.Augment({

    //
    //  Implements \ce and friends
    //
    CE: function (name) {
      var arg = this.GetArgument(name);
      var tex = CE(arg).Parse();
      this.string = tex + this.string.substr(this.i); this.i = 0;
    }
    
  });
  
  //
  //  Indicate that the extension is ready
  //
  MathJax.Hub.Startup.signal.Post("TeX mhchem Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mhchem.js");
