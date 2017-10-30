/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/SuppMathOperators.js
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
        '\u2A03': MO.OP,       // n-ary union operator with dot
        '\u2A05': MO.OP,       // n-ary square intersection operator
        '\u2A07': MO.OP,       // two logical and operator
        '\u2A08': MO.OP,       // two logical or operator
        '\u2A09': MO.OP,       // n-ary times operator
        '\u2A0A': MO.OP,       // modulo two sum
        '\u2A0B': MO.INTEGRAL2, // summation with integral
        '\u2A0C': MO.INTEGRAL, // quadruple integral operator
        '\u2A0D': MO.INTEGRAL2, // finite part integral
        '\u2A0E': MO.INTEGRAL2, // integral with double stroke
        '\u2A0F': MO.INTEGRAL2, // integral average with slash
        '\u2A10': MO.OP,       // circulation function
        '\u2A11': MO.OP,       // anticlockwise integration
        '\u2A12': MO.OP,       // line integration with rectangular path around pole
        '\u2A13': MO.OP,       // line integration with semicircular path around pole
        '\u2A14': MO.OP,       // line integration not including the pole
        '\u2A15': MO.INTEGRAL2, // integral around a point operator
        '\u2A16': MO.INTEGRAL2, // quaternion integral operator
        '\u2A17': MO.INTEGRAL2, // integral with leftwards arrow with hook
        '\u2A18': MO.INTEGRAL2, // integral with times sign
        '\u2A19': MO.INTEGRAL2, // integral with intersection
        '\u2A1A': MO.INTEGRAL2, // integral with union
        '\u2A1B': MO.INTEGRAL2, // integral with overbar
        '\u2A1C': MO.INTEGRAL2, // integral with underbar
        '\u2AFC': MO.OP,       // large triple vertical bar operator
        '\u2AFF': MO.OP        // n-ary white vertical bar
      },
      infix: {
        '\u2A1D': MO.BIN3,     // join
        '\u2A1E': MO.BIN3,     // large left triangle operator
        '\u2A1F': MO.BIN3,     // z notation schema composition
        '\u2A20': MO.BIN3,     // z notation schema piping
        '\u2A21': MO.BIN3,     // z notation schema projection
        '\u2A22': MO.BIN4,     // plus sign with small circle above
        '\u2A23': MO.BIN4,     // plus sign with circumflex accent above
        '\u2A24': MO.BIN4,     // plus sign with tilde above
        '\u2A25': MO.BIN4,     // plus sign with dot below
        '\u2A26': MO.BIN4,     // plus sign with tilde below
        '\u2A27': MO.BIN4,     // plus sign with subscript two
        '\u2A28': MO.BIN4,     // plus sign with black triangle
        '\u2A29': MO.BIN4,     // minus sign with comma above
        '\u2A2A': MO.BIN4,     // minus sign with dot below
        '\u2A2B': MO.BIN4,     // minus sign with falling dots
        '\u2A2C': MO.BIN4,     // minus sign with rising dots
        '\u2A2D': MO.BIN4,     // plus sign in left half circle
        '\u2A2E': MO.BIN4,     // plus sign in right half circle
        '\u2A30': MO.BIN4,     // multiplication sign with dot above
        '\u2A31': MO.BIN4,     // multiplication sign with underbar
        '\u2A32': MO.BIN4,     // semidirect product with bottom closed
        '\u2A33': MO.BIN4,     // smash product
        '\u2A34': MO.BIN4,     // multiplication sign in left half circle
        '\u2A35': MO.BIN4,     // multiplication sign in right half circle
        '\u2A36': MO.BIN4,     // circled multiplication sign with circumflex accent
        '\u2A37': MO.BIN4,     // multiplication sign in double circle
        '\u2A38': MO.BIN4,     // circled division sign
        '\u2A39': MO.BIN4,     // plus sign in triangle
        '\u2A3A': MO.BIN4,     // minus sign in triangle
        '\u2A3B': MO.BIN4,     // multiplication sign in triangle
        '\u2A3C': MO.BIN4,     // interior product
        '\u2A3D': MO.BIN4,     // righthand interior product
        '\u2A3E': MO.BIN4,     // z notation relational composition
        '\u2A40': MO.BIN4,     // intersection with dot
        '\u2A41': MO.BIN4,     // union with minus sign
        '\u2A42': MO.BIN4,     // union with overbar
        '\u2A43': MO.BIN4,     // intersection with overbar
        '\u2A44': MO.BIN4,     // intersection with logical and
        '\u2A45': MO.BIN4,     // union with logical or
        '\u2A46': MO.BIN4,     // union above intersection
        '\u2A47': MO.BIN4,     // intersection above union
        '\u2A48': MO.BIN4,     // union above bar above intersection
        '\u2A49': MO.BIN4,     // intersection above bar above union
        '\u2A4A': MO.BIN4,     // union beside and joined with union
        '\u2A4B': MO.BIN4,     // intersection beside and joined with intersection
        '\u2A4C': MO.BIN4,     // closed union with serifs
        '\u2A4D': MO.BIN4,     // closed intersection with serifs
        '\u2A4E': MO.BIN4,     // double square intersection
        '\u2A4F': MO.BIN4,     // double square union
        '\u2A50': MO.BIN4,     // closed union with serifs and smash product
        '\u2A51': MO.BIN4,     // logical and with dot above
        '\u2A52': MO.BIN4,     // logical or with dot above
        '\u2A53': MO.BIN4,     // double logical and
        '\u2A54': MO.BIN4,     // double logical or
        '\u2A55': MO.BIN4,     // two intersecting logical and
        '\u2A56': MO.BIN4,     // two intersecting logical or
        '\u2A57': MO.BIN4,     // sloping large or
        '\u2A58': MO.BIN4,     // sloping large and
        '\u2A59': MO.REL,      // logical or overlapping logical and
        '\u2A5A': MO.BIN4,     // logical and with middle stem
        '\u2A5B': MO.BIN4,     // logical or with middle stem
        '\u2A5C': MO.BIN4,     // logical and with horizontal dash
        '\u2A5D': MO.BIN4,     // logical or with horizontal dash
        '\u2A5E': MO.BIN4,     // logical and with double overbar
        '\u2A5F': MO.BIN4,     // logical and with underbar
        '\u2A60': MO.BIN4,     // logical and with double underbar
        '\u2A61': MO.BIN4,     // small vee with underbar
        '\u2A62': MO.BIN4,     // logical or with double overbar
        '\u2A63': MO.BIN4,     // logical or with double underbar
        '\u2A64': MO.BIN4,     // z notation domain antirestriction
        '\u2A65': MO.BIN4,     // z notation range antirestriction
        '\u2A66': MO.REL,      // equals sign with dot below
        '\u2A67': MO.REL,      // identical with dot above
        '\u2A68': MO.REL,      // triple horizontal bar with double vertical stroke
        '\u2A69': MO.REL,      // triple horizontal bar with triple vertical stroke
        '\u2A6A': MO.REL,      // tilde operator with dot above
        '\u2A6B': MO.REL,      // tilde operator with rising dots
        '\u2A6C': MO.REL,      // similar minus similar
        '\u2A6D': MO.REL,      // congruent with dot above
        '\u2A6E': MO.REL,      // equals with asterisk
        '\u2A6F': MO.REL,      // almost equal to with circumflex accent
        '\u2A70': MO.REL,      // approximately equal or equal to
        '\u2A71': MO.BIN4,     // equals sign above plus sign
        '\u2A72': MO.BIN4,     // plus sign above equals sign
        '\u2A73': MO.REL,      // equals sign above tilde operator
        '\u2A74': MO.REL,      // double colon equal
        '\u2A75': MO.REL,      // two consecutive equals signs
        '\u2A76': MO.REL,      // three consecutive equals signs
        '\u2A77': MO.REL,      // equals sign with two dots above and two dots below
        '\u2A78': MO.REL,      // equivalent with four dots above
        '\u2A79': MO.REL,      // less-than with circle inside
        '\u2A7A': MO.REL,      // greater-than with circle inside
        '\u2A7B': MO.REL,      // less-than with question mark above
        '\u2A7C': MO.REL,      // greater-than with question mark above
        '\u2A7D': MO.REL,      // less-than or slanted equal to
        '\u2A7D\u0338': MO.REL, // less-than or slanted equal to with slash
        '\u2A7E': MO.REL,      // greater-than or slanted equal to
        '\u2A7E\u0338': MO.REL, // greater-than or slanted equal to with slash
        '\u2A7F': MO.REL,      // less-than or slanted equal to with dot inside
        '\u2A80': MO.REL,      // greater-than or slanted equal to with dot inside
        '\u2A81': MO.REL,      // less-than or slanted equal to with dot above
        '\u2A82': MO.REL,      // greater-than or slanted equal to with dot above
        '\u2A83': MO.REL,      // less-than or slanted equal to with dot above right
        '\u2A84': MO.REL,      // greater-than or slanted equal to with dot above left
        '\u2A85': MO.REL,      // less-than or approximate
        '\u2A86': MO.REL,      // greater-than or approximate
        '\u2A87': MO.REL,      // less-than and single-line not equal to
        '\u2A88': MO.REL,      // greater-than and single-line not equal to
        '\u2A89': MO.REL,      // less-than and not approximate
        '\u2A8A': MO.REL,      // greater-than and not approximate
        '\u2A8B': MO.REL,      // less-than above double-line equal above greater-than
        '\u2A8C': MO.REL,      // greater-than above double-line equal above less-than
        '\u2A8D': MO.REL,      // less-than above similar or equal
        '\u2A8E': MO.REL,      // greater-than above similar or equal
        '\u2A8F': MO.REL,      // less-than above similar above greater-than
        '\u2A90': MO.REL,      // greater-than above similar above less-than
        '\u2A91': MO.REL,      // less-than above greater-than above double-line equal
        '\u2A92': MO.REL,      // greater-than above less-than above double-line equal
        '\u2A93': MO.REL,      // less-than above slanted equal above greater-than above slanted equal
        '\u2A94': MO.REL,      // greater-than above slanted equal above less-than above slanted equal
        '\u2A95': MO.REL,      // slanted equal to or less-than
        '\u2A96': MO.REL,      // slanted equal to or greater-than
        '\u2A97': MO.REL,      // slanted equal to or less-than with dot inside
        '\u2A98': MO.REL,      // slanted equal to or greater-than with dot inside
        '\u2A99': MO.REL,      // double-line equal to or less-than
        '\u2A9A': MO.REL,      // double-line equal to or greater-than
        '\u2A9B': MO.REL,      // double-line slanted equal to or less-than
        '\u2A9C': MO.REL,      // double-line slanted equal to or greater-than
        '\u2A9D': MO.REL,      // similar or less-than
        '\u2A9E': MO.REL,      // similar or greater-than
        '\u2A9F': MO.REL,      // similar above less-than above equals sign
        '\u2AA0': MO.REL,      // similar above greater-than above equals sign
        '\u2AA1': MO.REL,      // double nested less-than
        '\u2AA1\u0338': MO.REL, // double nested less-than with slash
        '\u2AA2': MO.REL,      // double nested greater-than
        '\u2AA2\u0338': MO.REL, // double nested greater-than with slash
        '\u2AA3': MO.REL,      // double nested less-than with underbar
        '\u2AA4': MO.REL,      // greater-than overlapping less-than
        '\u2AA5': MO.REL,      // greater-than beside less-than
        '\u2AA6': MO.REL,      // less-than closed by curve
        '\u2AA7': MO.REL,      // greater-than closed by curve
        '\u2AA8': MO.REL,      // less-than closed by curve above slanted equal
        '\u2AA9': MO.REL,      // greater-than closed by curve above slanted equal
        '\u2AAA': MO.REL,      // smaller than
        '\u2AAB': MO.REL,      // larger than
        '\u2AAC': MO.REL,      // smaller than or equal to
        '\u2AAD': MO.REL,      // larger than or equal to
        '\u2AAE': MO.REL,      // equals sign with bumpy above
        '\u2AAF\u0338': MO.REL, // precedes above single-line equals sign with slash
        '\u2AB0\u0338': MO.REL, // succeeds above single-line equals sign with slash
        '\u2AB1': MO.REL,      // precedes above single-line not equal to
        '\u2AB2': MO.REL,      // succeeds above single-line not equal to
        '\u2AB3': MO.REL,      // precedes above equals sign
        '\u2AB4': MO.REL,      // succeeds above equals sign
        '\u2AB5': MO.REL,      // precedes above not equal to
        '\u2AB6': MO.REL,      // succeeds above not equal to
        '\u2AB7': MO.REL,      // precedes above almost equal to
        '\u2AB8': MO.REL,      // succeeds above almost equal to
        '\u2AB9': MO.REL,      // precedes above not almost equal to
        '\u2ABA': MO.REL,      // succeeds above not almost equal to
        '\u2ABB': MO.REL,      // double precedes
        '\u2ABC': MO.REL,      // double succeeds
        '\u2ABD': MO.REL,      // subset with dot
        '\u2ABE': MO.REL,      // superset with dot
        '\u2ABF': MO.REL,      // subset with plus sign below
        '\u2AC0': MO.REL,      // superset with plus sign below
        '\u2AC1': MO.REL,      // subset with multiplication sign below
        '\u2AC2': MO.REL,      // superset with multiplication sign below
        '\u2AC3': MO.REL,      // subset of or equal to with dot above
        '\u2AC4': MO.REL,      // superset of or equal to with dot above
        '\u2AC5': MO.REL,      // subset of above equals sign
        '\u2AC6': MO.REL,      // superset of above equals sign
        '\u2AC7': MO.REL,      // subset of above tilde operator
        '\u2AC8': MO.REL,      // superset of above tilde operator
        '\u2AC9': MO.REL,      // subset of above almost equal to
        '\u2ACA': MO.REL,      // superset of above almost equal to
        '\u2ACB': MO.REL,      // subset of above not equal to
        '\u2ACC': MO.REL,      // superset of above not equal to
        '\u2ACD': MO.REL,      // square left open box operator
        '\u2ACE': MO.REL,      // square right open box operator
        '\u2ACF': MO.REL,      // closed subset
        '\u2AD0': MO.REL,      // closed superset
        '\u2AD1': MO.REL,      // closed subset or equal to
        '\u2AD2': MO.REL,      // closed superset or equal to
        '\u2AD3': MO.REL,      // subset above superset
        '\u2AD4': MO.REL,      // superset above subset
        '\u2AD5': MO.REL,      // subset above subset
        '\u2AD6': MO.REL,      // superset above superset
        '\u2AD7': MO.REL,      // superset beside subset
        '\u2AD8': MO.REL,      // superset beside and joined by dash with subset
        '\u2AD9': MO.REL,      // element of opening downwards
        '\u2ADA': MO.REL,      // pitchfork with tee top
        '\u2ADB': MO.REL,      // transversal intersection
        '\u2ADC': MO.REL,      // forking
        '\u2ADD': MO.REL,      // nonforking
        '\u2ADE': MO.REL,      // short left tack
        '\u2ADF': MO.REL,      // short down tack
        '\u2AE0': MO.REL,      // short up tack
        '\u2AE1': MO.REL,      // perpendicular with s
        '\u2AE2': MO.REL,      // vertical bar triple right turnstile
        '\u2AE3': MO.REL,      // double vertical bar left turnstile
        '\u2AE4': MO.REL,      // vertical bar double left turnstile
        '\u2AE5': MO.REL,      // double vertical bar double left turnstile
        '\u2AE6': MO.REL,      // long dash from left member of double vertical
        '\u2AE7': MO.REL,      // short down tack with overbar
        '\u2AE8': MO.REL,      // short up tack with underbar
        '\u2AE9': MO.REL,      // short up tack above short down tack
        '\u2AEA': MO.REL,      // double down tack
        '\u2AEB': MO.REL,      // double up tack
        '\u2AEC': MO.REL,      // double stroke not sign
        '\u2AED': MO.REL,      // reversed double stroke not sign
        '\u2AEE': MO.REL,      // does not divide with reversed negation slash
        '\u2AEF': MO.REL,      // vertical line with circle above
        '\u2AF0': MO.REL,      // vertical line with circle below
        '\u2AF1': MO.REL,      // down tack with circle below
        '\u2AF2': MO.REL,      // parallel with horizontal stroke
        '\u2AF3': MO.REL,      // parallel with tilde operator
        '\u2AF4': MO.BIN4,     // triple vertical bar binary relation
        '\u2AF5': MO.BIN4,     // triple vertical bar with horizontal stroke
        '\u2AF6': MO.BIN4,     // triple colon operator
        '\u2AF7': MO.REL,      // triple nested less-than
        '\u2AF8': MO.REL,      // triple nested greater-than
        '\u2AF9': MO.REL,      // double-line slanted less-than or equal to
        '\u2AFA': MO.REL,      // double-line slanted greater-than or equal to
        '\u2AFB': MO.BIN4,     // triple solidus binary relation
        '\u2AFD': MO.BIN4,     // double solidus operator
        '\u2AFE': MO.BIN3      // white vertical bar
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/SuppMathOperators.js");

})(MathJax.ElementJax.mml);
