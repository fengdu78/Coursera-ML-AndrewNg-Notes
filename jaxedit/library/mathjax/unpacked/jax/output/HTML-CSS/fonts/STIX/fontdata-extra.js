/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the STIX data.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2012 Design Science, Inc.
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
 */

(function (HTMLCSS) {
  var VERSION = "2.1";
  
  var DELIMITERS = HTMLCSS.FONTDATA.DELIMITERS;

  var GENERAL = "STIXGeneral",
      BOLD    = "STIXGeneral-bold",
      VARIANT = "STIXVariants",
      NONUNI  = "STIXNonUnicode",
      SIZE1   = "STIXSizeOneSym",
      SIZE2   = "STIXSizeTwoSym",
      SIZE3   = "STIXSizeThreeSym",
      SIZE4   = "STIXSizeFourSym",
      SIZE5   = "STIXSizeFiveSym";
  var H = "H", V = "V";
  
  var delim = {
    0x003D: // equal sign
    {
      dir: H, HW: [[.685,GENERAL]], stretch: {rep:[0x003D,GENERAL]}
    },
    0x219E: // left two-headed arrow
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x219E,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21A0: // right two-headed arrow
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21A0,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21A4: // left arrow from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x2190,VARIANT], rep:[0x2212,GENERAL], right:[0x22A3,BOLD,0,.1,.6]}
    },
    0x21A5: // up arrow from bar
    {
      dir: V, HW: [[.816,GENERAL]],
      stretch: {bot:[0x5F,GENERAL,.05,-.01,.8], ext:[0x23D0,GENERAL], top:[0x2191,GENERAL]}
    },
    0x21A6: // right arrow from bar
    {
      dir: H, HW: [[1,GENERAL]],
      stretch: {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x2192,GENERAL]}
    },
    0x21A7: // down arrow from bar
    {
      dir: V, HW: [[.816,GENERAL]],
      stretch: {top:[0x22A4,BOLD,0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x2193,GENERAL]}
    },
    0x21B0: // up arrow with top leftwards
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21B0,GENERAL], ext:[0x23D0,GENERAL,.152]}
    },
    0x21B1: // up arrow with top right
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21B1,GENERAL], ext:[0x23D0,GENERAL,-.195]}
    },
    0x21BC: // left harpoon with barb up
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21BD: // left harpoon with barb down
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {left:[0x21BD,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21BE: // up harpoon with barb right
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21BE,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21BF: // up harpoon with barb left
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21BF,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21C0: // right harpoon with barb up
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {right:[0x21C0,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21C1: // right harpoon with barb down
    {
      dir: H, HW: [[.955,GENERAL]], stretch: {right:[0x21C1,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21C2: // down harpoon with barb right
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21C2,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21C3: // down harpoon with barb left
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21C3,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x21DA: // left triple arrow
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21DA,GENERAL], rep:[0x2261,GENERAL]}
    },
    0x21DB: // right triple arrow
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21DB,GENERAL], rep:[0x2261,GENERAL]}
    },
    0x23B4: // top square bracket
    {
      dir: H, HW: [[.926,GENERAL],[1.063,SIZE1],[1.606,SIZE2],[2.147,SIZE3],[2.692,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0x2310,GENERAL], rep:[0x2212,GENERAL,0,.12], right:[0xAC,GENERAL]}
    },
    0x23B5: // bottom square bracket
    {
      dir: H, HW: [[.926,GENERAL],[1.063,SIZE1],[1.606,SIZE2],[2.147,SIZE3],[2.692,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0x2A3D,GENERAL,0,.12], rep:[0x2212,GENERAL,0,0,0,.12], right:[0x2A3C,GENERAL,0,.12]}
    },
    0x23DC: // top paren
    {
      dir: H, HW: [[.926,SIZE1],[1,GENERAL],[1.460,SIZE2],[1.886,SIZE3],[2.328,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0xE13B,NONUNI], right:[0xE13C,NONUNI], rep:[0xE14A,NONUNI]}
    },
    0x23DD: // bottom paren
    {
      dir: H, HW: [[.926,SIZE1],[1,GENERAL],[1.460,SIZE2],[1.886,SIZE3],[2.328,SIZE4],[3.237,SIZE5]],
      stretch: {left:[0xE13D,NONUNI], right:[0xE13E,NONUNI], rep:[0xE14B,NONUNI]}
    },
    0x23E0: // top tortoise shell
    {
      dir: H, HW: [[1,GENERAL],[1.460,SIZE1],[1.886,SIZE2],[2.312,SIZE3],[2.738,SIZE4],[3.164,SIZE5]],
      stretch: {left:[0xE10D,NONUNI,-.1,-.1], rep:[0x2212,GENERAL,0,.05], right:[0xE10C,NONUNI,0,-.1], fullExtenders:true}
    },
    0x23E1: // bottom tortoise shell
    {
      dir: H, HW: [[1,GENERAL],[1.460,SIZE1],[1.886,SIZE2],[2.312,SIZE3],[2.738,SIZE4],[3.164,SIZE5]],
      stretch: {left:[0xE10C,NONUNI,-.1,.1], rep:[0x2212,GENERAL,0,-.1,0,.1], right:[0xE10D,NONUNI,0,.1], fullExtenders:true}
    },
    0x2906: // leftwards double arrow from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21D0,GENERAL], rep:[0x3D,GENERAL], right:[0x2AE4,GENERAL,0,-.09]}
    },
    0x2907: // rightwards double arrow from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x22A8,GENERAL,0,-.09], rep:[0x3D,GENERAL], right:[0x21D2,GENERAL]}
    },
    0x294E: // left barb up right barb up harpoon
    {
      dir: H, HW: [],
      stretch: {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL], right:[0x21C0,GENERAL]}
    },
    0x294F: // up barb right down barb right harpoon
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x21BE,GENERAL], ext:[0x23D0,GENERAL], bot:[0x21C2,GENERAL]}
    },
    0x2950: // left barb dow right barb down harpoon
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21BD,GENERAL], rep:[0x2212,GENERAL], right:[0x21C1,GENERAL]}
    },
    0x2951: // up barb left down barb left harpoon
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x21BF,GENERAL], ext:[0x23D0,GENERAL], bot:[0x21C3,GENERAL]}
    },
    0x295A: // leftwards harpoon with barb up from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21BC,GENERAL], rep:[0x2212,GENERAL], right:[0x22A3,BOLD,0,.1,.6]}
    },
    0x295B: // rightwards harpoon with barb up from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x21C0,GENERAL]}
    },
    0x295C: // up harpoon with barb right from bar
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {bot:[0x5F,GENERAL,.05,-.01,.8], ext:[0x23D0,GENERAL], top:[0x21BE,GENERAL]}
    },
    0x295D: // down harpoon with barb right from bar
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x22A4,BOLD,0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x21C2,GENERAL]}
    },
    0x295E: // leftwards harpoon with barb down from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21BD,GENERAL], rep:[0x2212,GENERAL], right:[0x22A3,BOLD,0,.1,.6]}
    },
    0x295F: // rightwards harpoon with barb down from bar
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0xE0B6,NONUNI], rep:[0x2212,GENERAL], right:[0x21C1,GENERAL]}
    },
    0x2960: // up harpoon with barb left from bar
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {bot:[0x5F,GENERAL,.05,-.01,.8], ext:[0x23D0,GENERAL], top:[0x21BF,GENERAL]}
    },
    0x2961: // down harpoon with barb left from bar
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {top:[0x22A4,BOLD,0.04,0,.6], ext:[0x23D0,GENERAL], bot:[0x21C3,GENERAL]}
    },
    
    0x02C7: // caron
    {
      dir: H, HW: [[.333,GENERAL],[.56,SIZE1],[.979,SIZE2],[1.458,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
    },
    0x02CD: // low macron
    {
      dir: H, HW: [[.334,GENERAL]], stretch: {rep:[0x2CD,GENERAL]}
    },
    0x02F7: // low tilde
    {
      dir: H, HW: [[.558,SIZE1],[.977,SIZE2],[1.458,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
    },
    0x219F: // upwards two headed arrow
    {
      dir: V, HW: [[.816,GENERAL]], stretch: {ext:[0x23D0,GENERAL], top:[0x219F,GENERAL]}
    },
    0x21A1: // downwards two headed arrow
    {
      dir: V, HW: [[.816,GENERAL]], stretch: {ext:[0x23D0,GENERAL], bot:[0x21A1,GENERAL]}
    },
    0x21A8: // up down arrow with base
    {
      dir: V, HW: [[.816,GENERAL]],
      stretch: {top:[0x2191,GENERAL], ext:[0x23D0,GENERAL], bot:[0x2913,GENERAL]}
    },
    0x21A9: // left hook arrow
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x2190,GENERAL], rep:[0x2212,GENERAL], right:[0xE0B5,NONUNI]}
    },
    0x21AA: // right hook arrow
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0xE0B4,NONUNI], rep:[0x2212,GENERAL], right:[0x2192,GENERAL]}
    },
    0x21B2: // down arrow with tip left
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21B2,GENERAL], ext:[0x23D0,GENERAL,.152]}
    },
    0x21B3: // down arrow with tip right
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21B3,GENERAL], ext:[0x23D0,GENERAL,-.195]}
    },
    0x21B4: // right arrow with corner down
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {rep:[0x2212,GENERAL,0,.4], right:[0x21B4,GENERAL]}
    },
    0x21B5: // down arrow with corner left
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x21B5,GENERAL], ext:[0x23D0,GENERAL,.57]}
    },
    0x21CB: // left harpoon over right harpoon
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x296A,GENERAL], rep:[0x3D,GENERAL], right:[0x296D,GENERAL]}
    },
    0x21CC: // right harpoon over left harpoon
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x296B,GENERAL], rep:[0x3D,GENERAL], right:[0x296C,GENERAL]}
    },
    0x21E0: // left dashed arrow
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21E0,GENERAL], rep:[0xE121,NONUNI,0,0,0,0,.1], fullExtenders:true}
    },
    0x21E1: // up dashed arrow
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {ext:[0xE12D,NONUNI], top:[0x21E1,GENERAL], fullExtenders: true}
    },
    0x21E2: // right dashed arrow
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {right:[0x21E2,VARIANT], rep:[0xE12E,NONUNI,0,0,0,0,.1], fullExtenders:true}
    },
    0x21E3: // down dashed arrow
    {
      dir: V, HW: [[.818,GENERAL]],
      stretch: {ext:[0xE12C,NONUNI], bot:[0x21E3,GENERAL], fullExtenders: true}
    },
    0x21E4: // left arrow to bar
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21E4,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21E5: // right arrow to bar
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21E5,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21FD: // left open-headed arrow
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21FD,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21FE: // right open-headed arrow
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x21FE,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x21FF: // left right open-headed arrow
    {
      dir: H, HW: [[.926,GENERAL]],
      stretch: {left:[0x21FD,GENERAL], rep:[0x2212,GENERAL], right:[0x21FE,GENERAL]}
    },
    0x27E6: // left white square bracket
    {
      dir: V, HW: [[.93,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.46,SIZE3],[3.075,SIZE4]],
      stretch: {top:[0x2553,GENERAL], ext:[0x2551,GENERAL], bot:[0x2559,GENERAL]}
    },
    0x27E7: // right white square bracket
    {
      dir: V, HW: [[.93,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.46,SIZE3],[3.075,SIZE4]],
      stretch: {top:[0x2556,GENERAL], ext:[0x2551,GENERAL], bot:[0x255C,GENERAL]}
    },
    0x27EA: // left double angle bracket
    {
      dir: V, HW: [[.931,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.461,SIZE3],[3.075,SIZE4]]
    },
    0x27EB: // right double angle bracket
    {
      dir: V, HW: [[.931,GENERAL],[1.23,SIZE1],[1.845,SIZE2],[2.461,SIZE3],[3.075,SIZE4]]
    },
    0x290A: // up triple arrow
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x290A,GENERAL], ext:[0xE135,NONUNI]}
    },
    0x290B: // down triple arrow
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x290B,GENERAL], ext:[0xE135,NONUNI]}
    },
    0x2912: // up arrow to bar
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2912,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2913: // down arrow to bar
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x2913,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2952: // left harpoon with barb up to bar
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x2952,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2953: // right harpoon with barb up to bar
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x2953,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2954: // up harpoon with barb right to bar
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2954,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2955: // down harpoon with barb right to bar
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x2955,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2956: // left harpoon with barb down to bar
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x2956,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2957: // right harpoon with barb down to bar
    {
      dir: H, HW: [[.926,GENERAL]], stretch: {right:[0x2957,GENERAL], rep:[0x2212,GENERAL]}
    },
    0x2958: // up harpoon with barb left to bar
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2958,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2959: // down harpoon with barb left to bar
    {
      dir: V, HW: [[.818,GENERAL]], stretch: {bot:[0x2959,GENERAL], ext:[0x23D0,GENERAL]}
    },
    0x2980: // triple vertical bar
    {
      dir: V, HW: [[.874,GENERAL]], stretch: {ext:[0x2980,GENERAL]}
    },
    0x2997: // left black tortoise shell
    {
      dir: V, HW: [[.932,GENERAL]],
      stretch: {top:[0xE10D,NONUNI,.1,.05], ext:[0x23D0,GENERAL,-.1], bot:[0xE10C,NONUNI,.1]}
    },
    0x2998: // right black tortoise shell
    {
      dir: V, HW: [[.932,GENERAL]],
      stretch: {top:[0xE10C,NONUNI,-.1,.05], ext:[0x23D0,GENERAL], bot:[0xE10D,NONUNI,-.1]}
    }

  };
  
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};

  MathJax.Ajax.loadComplete(HTMLCSS.fontDir + "/fontdata-extra.js");

})(MathJax.OutputJax["HTML-CSS"]);

