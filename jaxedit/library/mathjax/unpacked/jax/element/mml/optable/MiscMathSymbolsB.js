/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/MiscMathSymbolsB.js
 *
 *  Copyright (c) 2010 Design Science, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;

  MathJax.Hub.Insert(MML.mo.prototype,{
    OPTABLE: {
      prefix: {
        '\u2980': [0,0,TEXCLASS.ORD,{fence: true, stretchy: true}], // triple vertical bar delimiter
        '\u2983': MO.OPEN,     // left white curly bracket
        '\u2985': MO.OPEN,     // left white parenthesis
        '\u2987': MO.OPEN,     // z notation left image bracket
        '\u2989': MO.OPEN,     // z notation left binding bracket
        '\u298B': MO.OPEN,     // left square bracket with underbar
        '\u298D': MO.OPEN,     // left square bracket with tick in top corner
        '\u298F': MO.OPEN,     // left square bracket with tick in bottom corner
        '\u2991': MO.OPEN,     // left angle bracket with dot
        '\u2993': MO.OPEN,     // left arc less-than bracket
        '\u2995': MO.OPEN,     // double left arc greater-than bracket
        '\u2997': MO.OPEN,     // left black tortoise shell bracket
        '\u29FC': MO.OPEN      // left-pointing curved angle bracket
      },
      postfix: {
        '\u2980': [0,0,TEXCLASS.ORD,{fence: true, stretchy: true}], // triple vertical bar delimiter
        '\u2984': MO.CLOSE,    // right white curly bracket
        '\u2986': MO.CLOSE,    // right white parenthesis
        '\u2988': MO.CLOSE,    // z notation right image bracket
        '\u298A': MO.CLOSE,    // z notation right binding bracket
        '\u298C': MO.CLOSE,    // right square bracket with underbar
        '\u298E': MO.CLOSE,    // right square bracket with tick in bottom corner
        '\u2990': MO.CLOSE,    // right square bracket with tick in top corner
        '\u2992': MO.CLOSE,    // right angle bracket with dot
        '\u2994': MO.CLOSE,    // right arc greater-than bracket
        '\u2996': MO.CLOSE,    // double right arc less-than bracket
        '\u2998': MO.CLOSE,    // right black tortoise shell bracket
        '\u29FD': MO.CLOSE     // right-pointing curved angle bracket
      },
      infix: {
        '\u2981': MO.BIN3,     // z notation spot
        '\u2982': MO.BIN3,     // z notation type colon
        '\u2999': MO.BIN3,     // dotted fence
        '\u299A': MO.BIN3,     // vertical zigzag line
        '\u299B': MO.BIN3,     // measured angle opening left
        '\u299C': MO.BIN3,     // right angle variant with square
        '\u299D': MO.BIN3,     // measured right angle with dot
        '\u299E': MO.BIN3,     // angle with s inside
        '\u299F': MO.BIN3,     // acute angle
        '\u29A0': MO.BIN3,     // spherical angle opening left
        '\u29A1': MO.BIN3,     // spherical angle opening up
        '\u29A2': MO.BIN3,     // turned angle
        '\u29A3': MO.BIN3,     // reversed angle
        '\u29A4': MO.BIN3,     // angle with underbar
        '\u29A5': MO.BIN3,     // reversed angle with underbar
        '\u29A6': MO.BIN3,     // oblique angle opening up
        '\u29A7': MO.BIN3,     // oblique angle opening down
        '\u29A8': MO.BIN3,     // measured angle with open arm ending in arrow pointing up and right
        '\u29A9': MO.BIN3,     // measured angle with open arm ending in arrow pointing up and left
        '\u29AA': MO.BIN3,     // measured angle with open arm ending in arrow pointing down and right
        '\u29AB': MO.BIN3,     // measured angle with open arm ending in arrow pointing down and left
        '\u29AC': MO.BIN3,     // measured angle with open arm ending in arrow pointing right and up
        '\u29AD': MO.BIN3,     // measured angle with open arm ending in arrow pointing left and up
        '\u29AE': MO.BIN3,     // measured angle with open arm ending in arrow pointing right and down
        '\u29AF': MO.BIN3,     // measured angle with open arm ending in arrow pointing left and down
        '\u29B0': MO.BIN3,     // reversed empty set
        '\u29B1': MO.BIN3,     // empty set with overbar
        '\u29B2': MO.BIN3,     // empty set with small circle above
        '\u29B3': MO.BIN3,     // empty set with right arrow above
        '\u29B4': MO.BIN3,     // empty set with left arrow above
        '\u29B5': MO.BIN3,     // circle with horizontal bar
        '\u29B6': MO.BIN4,     // circled vertical bar
        '\u29B7': MO.BIN4,     // circled parallel
        '\u29B8': MO.BIN4,     // circled reverse solidus
        '\u29B9': MO.BIN4,     // circled perpendicular
        '\u29BA': MO.BIN4,     // circle divided by horizontal bar and top half divided by vertical bar
        '\u29BB': MO.BIN4,     // circle with superimposed x
        '\u29BC': MO.BIN4,     // circled anticlockwise-rotated division sign
        '\u29BD': MO.BIN4,     // up arrow through circle
        '\u29BE': MO.BIN4,     // circled white bullet
        '\u29BF': MO.BIN4,     // circled bullet
        '\u29C0': MO.REL,      // circled less-than
        '\u29C1': MO.REL,      // circled greater-than
        '\u29C2': MO.BIN3,     // circle with small circle to the right
        '\u29C3': MO.BIN3,     // circle with two horizontal strokes to the right
        '\u29C4': MO.BIN4,     // squared rising diagonal slash
        '\u29C5': MO.BIN4,     // squared falling diagonal slash
        '\u29C6': MO.BIN4,     // squared asterisk
        '\u29C7': MO.BIN4,     // squared small circle
        '\u29C8': MO.BIN4,     // squared square
        '\u29C9': MO.BIN3,     // two joined squares
        '\u29CA': MO.BIN3,     // triangle with dot above
        '\u29CB': MO.BIN3,     // triangle with underbar
        '\u29CC': MO.BIN3,     // s in triangle
        '\u29CD': MO.BIN3,     // triangle with serifs at bottom
        '\u29CE': MO.REL,      // right triangle above left triangle
        '\u29CF': MO.REL,      // left triangle beside vertical bar
        '\u29CF\u0338': MO.REL, // left triangle beside vertical bar with slash
        '\u29D0': MO.REL,      // vertical bar beside right triangle
        '\u29D0\u0338': MO.REL, // vertical bar beside right triangle with slash
        '\u29D1': MO.REL,      // bowtie with left half black
        '\u29D2': MO.REL,      // bowtie with right half black
        '\u29D3': MO.REL,      // black bowtie
        '\u29D4': MO.REL,      // times with left half black
        '\u29D5': MO.REL,      // times with right half black
        '\u29D6': MO.BIN4,     // white hourglass
        '\u29D7': MO.BIN4,     // black hourglass
        '\u29D8': MO.BIN3,     // left wiggly fence
        '\u29D9': MO.BIN3,     // right wiggly fence
        '\u29DB': MO.BIN3,     // right double wiggly fence
        '\u29DC': MO.BIN3,     // incomplete infinity
        '\u29DD': MO.BIN3,     // tie over infinity
        '\u29DE': MO.REL,      // infinity negated with vertical bar
        '\u29DF': MO.BIN3,     // double-ended multimap
        '\u29E0': MO.BIN3,     // square with contoured outline
        '\u29E1': MO.REL,      // increases as
        '\u29E2': MO.BIN4,     // shuffle product
        '\u29E3': MO.REL,      // equals sign and slanted parallel
        '\u29E4': MO.REL,      // equals sign and slanted parallel with tilde above
        '\u29E5': MO.REL,      // identical to and slanted parallel
        '\u29E6': MO.REL,      // gleich stark
        '\u29E7': MO.BIN3,     // thermodynamic
        '\u29E8': MO.BIN3,     // down-pointing triangle with left half black
        '\u29E9': MO.BIN3,     // down-pointing triangle with right half black
        '\u29EA': MO.BIN3,     // black diamond with down arrow
        '\u29EB': MO.BIN3,     // black lozenge
        '\u29EC': MO.BIN3,     // white circle with down arrow
        '\u29ED': MO.BIN3,     // black circle with down arrow
        '\u29EE': MO.BIN3,     // error-barred white square
        '\u29EF': MO.BIN3,     // error-barred black square
        '\u29F0': MO.BIN3,     // error-barred white diamond
        '\u29F1': MO.BIN3,     // error-barred black diamond
        '\u29F2': MO.BIN3,     // error-barred white circle
        '\u29F3': MO.BIN3,     // error-barred black circle
        '\u29F4': MO.REL,      // rule-delayed
        '\u29F5': MO.BIN4,     // reverse solidus operator
        '\u29F6': MO.BIN4,     // solidus with overbar
        '\u29F7': MO.BIN4,     // reverse solidus with horizontal stroke
        '\u29F8': MO.BIN3,     // big solidus
        '\u29F9': MO.BIN3,     // big reverse solidus
        '\u29FA': MO.BIN3,     // double plus
        '\u29FB': MO.BIN3,     // triple plus
        '\u29FE': MO.BIN4,     // tiny
        '\u29FF': MO.BIN4      // miny
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/MiscMathSymbolsB.js");

})(MathJax.ElementJax.mml);
