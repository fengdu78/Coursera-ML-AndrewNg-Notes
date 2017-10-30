/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/MathOperators.js
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
        '\u2204': MO.ORD21,    // there does not exist
        '\u221B': MO.ORD11,    // cube root
        '\u221C': MO.ORD11,    // fourth root
        '\u2221': MO.ORD,      // measured angle
        '\u2222': MO.ORD,      // spherical angle
        '\u222C': MO.INTEGRAL, // double integral
        '\u222D': MO.INTEGRAL, // triple integral
        '\u222F': MO.INTEGRAL, // surface integral
        '\u2230': MO.INTEGRAL, // volume integral
        '\u2231': MO.INTEGRAL, // clockwise integral
        '\u2232': MO.INTEGRAL, // clockwise contour integral
        '\u2233': MO.INTEGRAL  // anticlockwise contour integral
      },
      infix: {
        '\u2201': [1,2,TEXCLASS.ORD], // complement
        '\u2206': MO.BIN3,     // increment
        '\u220A': MO.REL,      // small element of
        '\u220C': MO.REL,      // does not contain as member
        '\u220D': MO.REL,      // small contains as member
        '\u220E': MO.BIN3,     // end of proof
        '\u2214': MO.BIN4,     // dot plus
        '\u221F': MO.REL,      // right angle
        '\u2224': MO.REL,      // does not divide
        '\u2226': MO.REL,      // not parallel to
        '\u2234': MO.REL,      // therefore
        '\u2235': MO.REL,      // because
        '\u2236': MO.REL,      // ratio
        '\u2237': MO.REL,      // proportion
        '\u2238': MO.BIN4,     // dot minus
        '\u2239': MO.REL,      // excess
        '\u223A': MO.BIN4,     // geometric proportion
        '\u223B': MO.REL,      // homothetic
        '\u223D': MO.REL,      // reversed tilde
        '\u223D\u0331': MO.BIN3, // reversed tilde with underline
        '\u223E': MO.REL,      // inverted lazy s
        '\u223F': MO.BIN3,     // sine wave
        '\u2241': MO.REL,      // not tilde
        '\u2242': MO.REL,      // minus tilde
        '\u2242\u0338': MO.REL, // minus tilde with slash
        '\u2244': MO.REL,      // not asymptotically equal to
        '\u2246': MO.REL,      // approximately but not actually equal to
        '\u2247': MO.REL,      // neither approximately nor actually equal to
        '\u2249': MO.REL,      // not almost equal to
        '\u224A': MO.REL,      // almost equal or equal to
        '\u224B': MO.REL,      // triple tilde
        '\u224C': MO.REL,      // all equal to
        '\u224E': MO.REL,      // geometrically equivalent to
        '\u224E\u0338': MO.REL, // geometrically equivalent to with slash
        '\u224F': MO.REL,      // difference between
        '\u224F\u0338': MO.REL, // difference between with slash
        '\u2251': MO.REL,      // geometrically equal to
        '\u2252': MO.REL,      // approximately equal to or the image of
        '\u2253': MO.REL,      // image of or approximately equal to
        '\u2254': MO.REL,      // colon equals
        '\u2255': MO.REL,      // equals colon
        '\u2256': MO.REL,      // ring in equal to
        '\u2257': MO.REL,      // ring equal to
        '\u2258': MO.REL,      // corresponds to
        '\u2259': MO.REL,      // estimates
        '\u225A': MO.REL,      // equiangular to
        '\u225C': MO.REL,      // delta equal to
        '\u225D': MO.REL,      // equal to by definition
        '\u225E': MO.REL,      // measured by
        '\u225F': MO.REL,      // questioned equal to
        '\u2262': MO.REL,      // not identical to
        '\u2263': MO.REL,      // strictly equivalent to
        '\u2266': MO.REL,      // less-than over equal to
        '\u2266\u0338': MO.REL, // less-than over equal to with slash
        '\u2267': MO.REL,      // greater-than over equal to
        '\u2268': MO.REL,      // less-than but not equal to
        '\u2269': MO.REL,      // greater-than but not equal to
        '\u226A\u0338': MO.REL, // much less than with slash
        '\u226B\u0338': MO.REL, // much greater than with slash
        '\u226C': MO.REL,      // between
        '\u226D': MO.REL,      // not equivalent to
        '\u226E': MO.REL,      // not less-than
        '\u226F': MO.REL,      // not greater-than
        '\u2270': MO.REL,      // neither less-than nor equal to
        '\u2271': MO.REL,      // neither greater-than nor equal to
        '\u2272': MO.REL,      // less-than or equivalent to
        '\u2273': MO.REL,      // greater-than or equivalent to
        '\u2274': MO.REL,      // neither less-than nor equivalent to
        '\u2275': MO.REL,      // neither greater-than nor equivalent to
        '\u2276': MO.REL,      // less-than or greater-than
        '\u2277': MO.REL,      // greater-than or less-than
        '\u2278': MO.REL,      // neither less-than nor greater-than
        '\u2279': MO.REL,      // neither greater-than nor less-than
        '\u227C': MO.REL,      // precedes or equal to
        '\u227D': MO.REL,      // succeeds or equal to
        '\u227E': MO.REL,      // precedes or equivalent to
        '\u227F': MO.REL,      // succeeds or equivalent to
        '\u227F\u0338': MO.REL, // succeeds or equivalent to with slash
        '\u2280': MO.REL,      // does not precede
        '\u2281': MO.REL,      // does not succeed
        '\u2282\u20D2': MO.REL, // subset of with vertical line
        '\u2283\u20D2': MO.REL, // superset of with vertical line
        '\u2284': MO.REL,      // not a subset of
        '\u2285': MO.REL,      // not a superset of
        '\u2288': MO.REL,      // neither a subset of nor equal to
        '\u2289': MO.REL,      // neither a superset of nor equal to
        '\u228A': MO.REL,      // subset of with not equal to
        '\u228B': MO.REL,      // superset of with not equal to
        '\u228C': MO.BIN4,     // multiset
        '\u228D': MO.BIN4,     // multiset multiplication
        '\u228F': MO.REL,      // square image of
        '\u228F\u0338': MO.REL, // square image of with slash
        '\u2290': MO.REL,      // square original of
        '\u2290\u0338': MO.REL, // square original of with slash
        '\u229A': MO.BIN4,     // circled ring operator
        '\u229B': MO.BIN4,     // circled asterisk operator
        '\u229C': MO.BIN4,     // circled equals
        '\u229D': MO.BIN4,     // circled dash
        '\u229E': MO.BIN4,     // squared plus
        '\u229F': MO.BIN4,     // squared minus
        '\u22A0': MO.BIN4,     // squared times
        '\u22A1': MO.BIN4,     // squared dot operator
        '\u22A6': MO.REL,      // assertion
        '\u22A7': MO.REL,      // models
        '\u22A9': MO.REL,      // forces
        '\u22AA': MO.REL,      // triple vertical bar right turnstile
        '\u22AB': MO.REL,      // double vertical bar double right turnstile
        '\u22AC': MO.REL,      // does not prove
        '\u22AD': MO.REL,      // not true
        '\u22AE': MO.REL,      // does not force
        '\u22AF': MO.REL,      // negated double vertical bar double right turnstile
        '\u22B0': MO.REL,      // precedes under relation
        '\u22B1': MO.REL,      // succeeds under relation
        '\u22B2': MO.REL,      // normal subgroup of
        '\u22B3': MO.REL,      // contains as normal subgroup
        '\u22B4': MO.REL,      // normal subgroup of or equal to
        '\u22B5': MO.REL,      // contains as normal subgroup or equal to
        '\u22B6': MO.REL,      // original of
        '\u22B7': MO.REL,      // image of
        '\u22B8': MO.REL,      // multimap
        '\u22B9': MO.REL,      // hermitian conjugate matrix
        '\u22BA': MO.BIN4,     // intercalate
        '\u22BB': MO.BIN4,     // xor
        '\u22BC': MO.BIN4,     // nand
        '\u22BD': MO.BIN4,     // nor
        '\u22BE': MO.BIN3,     // right angle with arc
        '\u22BF': MO.BIN3,     // right triangle
        '\u22C7': MO.BIN4,     // division times
        '\u22C9': MO.BIN4,     // left normal factor semidirect product
        '\u22CA': MO.BIN4,     // right normal factor semidirect product
        '\u22CB': MO.BIN4,     // left semidirect product
        '\u22CC': MO.BIN4,     // right semidirect product
        '\u22CD': MO.REL,      // reversed tilde equals
        '\u22CE': MO.BIN4,     // curly logical or
        '\u22CF': MO.BIN4,     // curly logical and
        '\u22D0': MO.REL,      // double subset
        '\u22D1': MO.REL,      // double superset
        '\u22D2': MO.BIN4,     // double intersection
        '\u22D3': MO.BIN4,     // double union
        '\u22D4': MO.REL,      // pitchfork
        '\u22D5': MO.REL,      // equal and parallel to
        '\u22D6': MO.REL,      // less-than with dot
        '\u22D7': MO.REL,      // greater-than with dot
        '\u22D8': MO.REL,      // very much less-than
        '\u22D9': MO.REL,      // very much greater-than
        '\u22DA': MO.REL,      // less-than equal to or greater-than
        '\u22DB': MO.REL,      // greater-than equal to or less-than
        '\u22DC': MO.REL,      // equal to or less-than
        '\u22DD': MO.REL,      // equal to or greater-than
        '\u22DE': MO.REL,      // equal to or precedes
        '\u22DF': MO.REL,      // equal to or succeeds
        '\u22E0': MO.REL,      // does not precede or equal
        '\u22E1': MO.REL,      // does not succeed or equal
        '\u22E2': MO.REL,      // not square image of or equal to
        '\u22E3': MO.REL,      // not square original of or equal to
        '\u22E4': MO.REL,      // square image of or not equal to
        '\u22E5': MO.REL,      // square original of or not equal to
        '\u22E6': MO.REL,      // less-than but not equivalent to
        '\u22E7': MO.REL,      // greater-than but not equivalent to
        '\u22E8': MO.REL,      // precedes but not equivalent to
        '\u22E9': MO.REL,      // succeeds but not equivalent to
        '\u22EA': MO.REL,      // not normal subgroup of
        '\u22EB': MO.REL,      // does not contain as normal subgroup
        '\u22EC': MO.REL,      // not normal subgroup of or equal to
        '\u22ED': MO.REL,      // does not contain as normal subgroup or equal
        '\u22F0': MO.REL,      // up right diagonal ellipsis
        '\u22F2': MO.REL,      // element of with long horizontal stroke
        '\u22F3': MO.REL,      // element of with vertical bar at end of horizontal stroke
        '\u22F4': MO.REL,      // small element of with vertical bar at end of horizontal stroke
        '\u22F5': MO.REL,      // element of with dot above
        '\u22F6': MO.REL,      // element of with overbar
        '\u22F7': MO.REL,      // small element of with overbar
        '\u22F8': MO.REL,      // element of with underbar
        '\u22F9': MO.REL,      // element of with two horizontal strokes
        '\u22FA': MO.REL,      // contains with long horizontal stroke
        '\u22FB': MO.REL,      // contains with vertical bar at end of horizontal stroke
        '\u22FC': MO.REL,      // small contains with vertical bar at end of horizontal stroke
        '\u22FD': MO.REL,      // contains with overbar
        '\u22FE': MO.REL,      // small contains with overbar
        '\u22FF': MO.REL       // z notation bag membership
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/MathOperators.js");

})(MathJax.ElementJax.mml);
