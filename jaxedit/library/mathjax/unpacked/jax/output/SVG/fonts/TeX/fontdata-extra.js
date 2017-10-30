/*************************************************************
 *
 *  MathJax/jax/output/SVG/fonts/TeX/fontdata-extra.js
 *  
 *  Adds extra stretchy characters to the TeX font data.
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

(function (SVG) {
  var VERSION = "2.1";
  
  var DELIMITERS = SVG.FONTDATA.DELIMITERS;

  var MAIN   = "MathJax_Main",
      BOLD   = "MathJax_Main-bold",
      AMS    = "MathJax_AMS",
      SIZE1  = "MathJax_Size1",
      SIZE4  = "MathJax_Size4";
  var H = "H", V = "V";
  
  var delim = {
    0x003D: // equal sign
    {
      dir: H, HW: [[.767,MAIN]], stretch: {rep:[0x003D,MAIN]}
    },
    0x219E: // left two-headed arrow
    {
      dir: H, HW: [[1,AMS]], stretch: {left:[0x219E,AMS], rep:[0x2212,MAIN]}
    },
    0x21A0: // right two-headed arrow
    {
      dir: H, HW: [[1,AMS]], stretch: {right:[0x21A0,AMS], rep:[0x2212,MAIN]}
    },
    0x21A4: // left arrow from bar
    {
      dir: H, HW: [],
      stretch: {min:1, left:[0x2190,MAIN], rep:[0x2212,MAIN], right:[0x2223,SIZE1,0,-.05,.9]}
    },
    0x21A5: // up arrow from bar
    {
      dir: V, HW: [],
      stretch: {min:.6, bot:[0x22A5,BOLD,0,0,.75], ext:[0x23D0,SIZE1], top:[0x2191,SIZE1]}
    },
    0x21A6: // right arrow from bar
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {left:[0x2223,SIZE1,-.09,-.05,.9], rep:[0x2212,MAIN], right:[0x2192,MAIN]}
    },
    0x21A7: // down arrow from bar
    {
      dir: V, HW: [],
      stretch: {min:.6, top:[0x22A4,BOLD,0,0,.75], ext:[0x23D0,SIZE1], bot:[0x2193,SIZE1]}
    },
    0x21B0: // up arrow with top leftwards
    {
      dir: V, HW: [[.722,AMS]],
      stretch: {top:[0x21B0,AMS], ext:[0x23D0,SIZE1,.097]}
    },
    0x21B1: // up arrow with top right
    {
      dir: V, HW: [[.722,AMS]],
      stretch: {top:[0x21B1,AMS,.27], ext:[0x23D0,SIZE1]}
    },
    0x21BC: // left harpoon with barb up
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {left:[0x21BC,MAIN], rep:[0x2212,MAIN]}
    },
    0x21BD: // left harpoon with barb down
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {left:[0x21BD,MAIN], rep:[0x2212,MAIN]}
    },
    0x21BE: // up harpoon with barb right
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {top:[0x21BE,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21BF: // up harpoon with barb left
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {top:[0x21BF,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21C0: // right harpoon with barb up
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {right:[0x21C0,MAIN], rep:[0x2212,MAIN]}
    },
    0x21C1: // right harpoon with barb down
    {
      dir: H, HW: [[1,MAIN]],
      stretch: {right:[0x21C1,MAIN], rep:[0x2212,MAIN]}
    },
    0x21C2: // down harpoon with barb right
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {bot:[0x21C2,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21C3: // down harpoon with barb left
    {
      dir: V, HW: [[.888,AMS]],
      stretch: {bot:[0x21C3,AMS,.12,0,1.1], ext:[0x23D0,SIZE1]}
    },
    0x21DA: // left triple arrow
    {
      dir: H, HW: [[1,AMS]],
      stretch: {left:[0x21DA,AMS], rep:[0x2261,MAIN]}
    },
    0x21DB: // right triple arrow
    {
      dir: H, HW: [[1,AMS]],
      stretch: {right:[0x21DB,AMS], rep:[0x2261,MAIN]}
    },
    0x23B4: // top square bracket
    {
      dir: H, HW: [],
      stretch: {min:.5, left:[0x250C,AMS,0,-.1], rep:[0x2212,MAIN,0,.325], right:[0x2510,AMS,0,-.1]}
    },
    0x23B5: // bottom square bracket
    {
      dir: H, HW: [],
      stretch: {min:.5, left:[0x2514,AMS,0,.26], rep:[0x2212,MAIN,0,0,0,.25], right:[0x2518,AMS,0,.26]}
    },
    0x23DC: // top paren
    {
      dir: H, HW: [[.778,AMS,0,0x2322],[1,MAIN,0,0x2322]],
      stretch: {left:[0xE150,SIZE4], rep:[0xE154,SIZE4], right:[0xE151,SIZE4]}
    },
    0x23DD: // bottom paren
    {
      dir: H, HW: [[.778,AMS,0,0x2323],[1,MAIN,0,0x2323]],
      stretch: {left:[0xE152,SIZE4], rep:[0xE154,SIZE4], right:[0xE153,SIZE4]}
    },
    0x23E0: // top tortoise shell
    {
      dir: H, HW: [],
      stretch: {min:1.25, left:[0x2CA,MAIN,-.1], rep:[0x2C9,MAIN,-.05,.13], right:[0x2CB,MAIN], fullExtenders:true}
    },
    0x23E1: // bottom tortoise shell
    {
      dir: H, HW: [],
      stretch: {min:1.5, left:[0x2CB,MAIN,-.1,.1], rep:[0x2C9,MAIN,-.1], right:[0x2CA,MAIN,-.1,.1], fullExtenders:true}
    },
    0x2906: // leftwards double arrow from bar
    {
      dir: H, HW: [],
      stretch: {min:1, left:[0x21D0,MAIN], rep:[0x3D,MAIN], right:[0x2223,SIZE1,0,-.1]}
    },
    0x2907: // rightwards double arrow from bar
    {
      dir: H, HW: [],
      stretch: {min:.7, left:[0x22A8,AMS,0,-.12], rep:[0x3D,MAIN], right:[0x21D2,MAIN]}
    },
    0x294E: // left barb up right barb up harpoon
    {
      dir: H, HW: [],
      stretch: {min:.5, left:[0x21BC,MAIN], rep:[0x2212,MAIN], right:[0x21C0,MAIN]}
    },
    0x294F: // up barb right down barb right harpoon
    {
      dir: V, HW: [],
      stretch: {min:.5, top:[0x21BE,AMS,.12,0,1.1], ext:[0x23D0,SIZE1], bot:[0x21C2,AMS,.12,0,1.1]}
    },
    0x2950: // left barb dow right barb down harpoon
    {
      dir: H, HW: [],
      stretch: {min:.5, left:[0x21BD,MAIN], rep:[0x2212,MAIN], right:[0x21C1,MAIN]}
    },
    0x2951: // up barb left down barb left harpoon
    {
      dir: V, HW: [],
      stretch: {min:.5, top:[0x21BF,AMS,.12,0,1.1], ext:[0x23D0,SIZE1], bot:[0x21C3,AMS,.12,0,1.1]}
    },
    0x295A: // leftwards harpoon with barb up from bar
    {
      dir: H, HW: [],
      stretch: {min:1, left:[0x21BC,MAIN], rep:[0x2212,MAIN], right:[0x2223,SIZE1,0,-.05,.9]}
    },
    0x295B: // rightwards harpoon with barb up from bar
    {
      dir: H, HW: [],
      stretch: {min:1, left:[0x2223,SIZE1,-.05,-.05,.9], rep:[0x2212,MAIN], right:[0x21C0,MAIN]}
    },
    0x295C: // up harpoon with barb right from bar
    {
      dir: V, HW: [],
      stretch: {min:.7, bot:[0x22A5,BOLD,0,0,.75], ext:[0x23D0,SIZE1], top:[0x21BE,AMS,.12,0,1.1]}
    },
    0x295D: // down harpoon with barb right from bar
    {
      dir: V, HW: [],
      stretch: {min:.7, top:[0x22A4,BOLD,0,0,.75], ext:[0x23D0,SIZE1], bot:[0x21C2,AMS,.12,0,1.1]}
    },
    0x295E: // leftwards harpoon with barb down from bar
    {
      dir: H, HW: [],
      stretch: {min:1, left:[0x21BD,MAIN], rep:[0x2212,MAIN], right:[0x2223,SIZE1,0,-.05,.9]}
    },
    0x295F: // rightwards harpoon with barb down from bar
    {
      dir: H, HW: [],
      stretch: {min:1, left:[0x2223,SIZE1,-.05,-.05,.9], rep:[0x2212,MAIN], right:[0x21C1,MAIN]}
    },
    0x2960: // up harpoon with barb left from bar
    {
      dir: V, HW: [],
      stretch: {min:.7, bot:[0x22A5,BOLD,0,0,.75], ext:[0x23D0,SIZE1], top:[0x21BF,AMS,.12,0,1.1]}
    },
    0x2961: // down harpoon with barb left from bar
    {
      dir: V, HW: [],
      stretch: {min:.7, top:[0x22A4,BOLD,0,0,.75], ext:[0x23D0,SIZE1], bot:[0x21C3,AMS,.12,0,1.1]}
    }
  };
  
  for (var id in delim) {if (delim.hasOwnProperty(id)) {DELIMITERS[id] = delim[id]}};

  MathJax.Ajax.loadComplete(SVG.fontDir + "/fontdata-extra.js");

})(MathJax.OutputJax.SVG);

