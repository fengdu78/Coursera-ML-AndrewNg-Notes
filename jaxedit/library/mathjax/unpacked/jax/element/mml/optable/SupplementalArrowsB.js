/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/SupplementalArrowsB.js
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
      infix: {
        '\u2900': MO.RELACCENT, // rightwards two-headed arrow with vertical stroke
        '\u2901': MO.RELACCENT, // rightwards two-headed arrow with double vertical stroke
        '\u2902': MO.RELACCENT, // leftwards double arrow with vertical stroke
        '\u2903': MO.RELACCENT, // rightwards double arrow with vertical stroke
        '\u2904': MO.RELACCENT, // left right double arrow with vertical stroke
        '\u2905': MO.RELACCENT, // rightwards two-headed arrow from bar
        '\u2906': MO.RELACCENT, // leftwards double arrow from bar
        '\u2907': MO.RELACCENT, // rightwards double arrow from bar
        '\u2908': MO.REL,      // downwards arrow with horizontal stroke
        '\u2909': MO.REL,      // upwards arrow with horizontal stroke
        '\u290A': MO.RELSTRETCH, // upwards triple arrow
        '\u290B': MO.RELSTRETCH, // downwards triple arrow
        '\u290C': MO.WIDEREL,  // leftwards double dash arrow
        '\u290D': MO.WIDEREL,  // rightwards double dash arrow
        '\u290E': MO.WIDEREL,  // leftwards triple dash arrow
        '\u290F': MO.WIDEREL,  // rightwards triple dash arrow
        '\u2910': MO.WIDEREL,  // rightwards two-headed triple dash arrow
        '\u2911': MO.RELACCENT, // rightwards arrow with dotted stem
        '\u2912': MO.RELSTRETCH, // upwards arrow to bar
        '\u2913': MO.RELSTRETCH, // downwards arrow to bar
        '\u2914': MO.RELACCENT, // rightwards arrow with tail with vertical stroke
        '\u2915': MO.RELACCENT, // rightwards arrow with tail with double vertical stroke
        '\u2916': MO.RELACCENT, // rightwards two-headed arrow with tail
        '\u2917': MO.RELACCENT, // rightwards two-headed arrow with tail with vertical stroke
        '\u2918': MO.RELACCENT, // rightwards two-headed arrow with tail with double vertical stroke
        '\u2919': MO.RELACCENT, // leftwards arrow-tail
        '\u291A': MO.RELACCENT, // rightwards arrow-tail
        '\u291B': MO.RELACCENT, // leftwards double arrow-tail
        '\u291C': MO.RELACCENT, // rightwards double arrow-tail
        '\u291D': MO.RELACCENT, // leftwards arrow to black diamond
        '\u291E': MO.RELACCENT, // rightwards arrow to black diamond
        '\u291F': MO.RELACCENT, // leftwards arrow from bar to black diamond
        '\u2920': MO.RELACCENT, // rightwards arrow from bar to black diamond
        '\u2921': MO.RELSTRETCH, // north west and south east arrow
        '\u2922': MO.RELSTRETCH, // north east and south west arrow
        '\u2923': MO.REL,      // north west arrow with hook
        '\u2924': MO.REL,      // north east arrow with hook
        '\u2925': MO.REL,      // south east arrow with hook
        '\u2926': MO.REL,      // south west arrow with hook
        '\u2927': MO.REL,      // north west arrow and north east arrow
        '\u2928': MO.REL,      // north east arrow and south east arrow
        '\u2929': MO.REL,      // south east arrow and south west arrow
        '\u292A': MO.REL,      // south west arrow and north west arrow
        '\u292B': MO.REL,      // rising diagonal crossing falling diagonal
        '\u292C': MO.REL,      // falling diagonal crossing rising diagonal
        '\u292D': MO.REL,      // south east arrow crossing north east arrow
        '\u292E': MO.REL,      // north east arrow crossing south east arrow
        '\u292F': MO.REL,      // falling diagonal crossing north east arrow
        '\u2930': MO.REL,      // rising diagonal crossing south east arrow
        '\u2931': MO.REL,      // north east arrow crossing north west arrow
        '\u2932': MO.REL,      // north west arrow crossing north east arrow
        '\u2933': MO.RELACCENT, // wave arrow pointing directly right
        '\u2934': MO.REL,      // arrow pointing rightwards then curving upwards
        '\u2935': MO.REL,      // arrow pointing rightwards then curving downwards
        '\u2936': MO.REL,      // arrow pointing downwards then curving leftwards
        '\u2937': MO.REL,      // arrow pointing downwards then curving rightwards
        '\u2938': MO.REL,      // right-side arc clockwise arrow
        '\u2939': MO.REL,      // left-side arc anticlockwise arrow
        '\u293A': MO.RELACCENT, // top arc anticlockwise arrow
        '\u293B': MO.RELACCENT, // bottom arc anticlockwise arrow
        '\u293C': MO.RELACCENT, // top arc clockwise arrow with minus
        '\u293D': MO.RELACCENT, // top arc anticlockwise arrow with plus
        '\u293E': MO.REL,      // lower right semicircular clockwise arrow
        '\u293F': MO.REL,      // lower left semicircular anticlockwise arrow
        '\u2940': MO.REL,      // anticlockwise closed circle arrow
        '\u2941': MO.REL,      // clockwise closed circle arrow
        '\u2942': MO.RELACCENT, // rightwards arrow above short leftwards arrow
        '\u2943': MO.RELACCENT, // leftwards arrow above short rightwards arrow
        '\u2944': MO.RELACCENT, // short rightwards arrow above leftwards arrow
        '\u2945': MO.RELACCENT, // rightwards arrow with plus below
        '\u2946': MO.RELACCENT, // leftwards arrow with plus below
        '\u2947': MO.RELACCENT, // rightwards arrow through x
        '\u2948': MO.RELACCENT, // left right arrow through small circle
        '\u2949': MO.REL,      // upwards two-headed arrow from small circle
        '\u294A': MO.RELACCENT, // left barb up right barb down harpoon
        '\u294B': MO.RELACCENT, // left barb down right barb up harpoon
        '\u294C': MO.REL,      // up barb right down barb left harpoon
        '\u294D': MO.REL,      // up barb left down barb right harpoon
        '\u294E': MO.WIDEREL,  // left barb up right barb up harpoon
        '\u294F': MO.RELSTRETCH, // up barb right down barb right harpoon
        '\u2950': MO.WIDEREL,  // left barb down right barb down harpoon
        '\u2951': MO.RELSTRETCH, // up barb left down barb left harpoon
        '\u2952': MO.WIDEREL,  // leftwards harpoon with barb up to bar
        '\u2953': MO.WIDEREL,  // rightwards harpoon with barb up to bar
        '\u2954': MO.RELSTRETCH, // upwards harpoon with barb right to bar
        '\u2955': MO.RELSTRETCH, // downwards harpoon with barb right to bar
        '\u2956': MO.RELSTRETCH, // leftwards harpoon with barb down to bar
        '\u2957': MO.RELSTRETCH, // rightwards harpoon with barb down to bar
        '\u2958': MO.RELSTRETCH, // upwards harpoon with barb left to bar
        '\u2959': MO.RELSTRETCH, // downwards harpoon with barb left to bar
        '\u295A': MO.WIDEREL,  // leftwards harpoon with barb up from bar
        '\u295B': MO.WIDEREL,  // rightwards harpoon with barb up from bar
        '\u295C': MO.RELSTRETCH, // upwards harpoon with barb right from bar
        '\u295D': MO.RELSTRETCH, // downwards harpoon with barb right from bar
        '\u295E': MO.WIDEREL,  // leftwards harpoon with barb down from bar
        '\u295F': MO.WIDEREL,  // rightwards harpoon with barb down from bar
        '\u2960': MO.RELSTRETCH, // upwards harpoon with barb left from bar
        '\u2961': MO.RELSTRETCH, // downwards harpoon with barb left from bar
        '\u2962': MO.RELACCENT, // leftwards harpoon with barb up above leftwards harpoon with barb down
        '\u2963': MO.REL,      // upwards harpoon with barb left beside upwards harpoon with barb right
        '\u2964': MO.RELACCENT, // rightwards harpoon with barb up above rightwards harpoon with barb down
        '\u2965': MO.REL,      // downwards harpoon with barb left beside downwards harpoon with barb right
        '\u2966': MO.RELACCENT, // leftwards harpoon with barb up above rightwards harpoon with barb up
        '\u2967': MO.RELACCENT, // leftwards harpoon with barb down above rightwards harpoon with barb down
        '\u2968': MO.RELACCENT, // rightwards harpoon with barb up above leftwards harpoon with barb up
        '\u2969': MO.RELACCENT, // rightwards harpoon with barb down above leftwards harpoon with barb down
        '\u296A': MO.RELACCENT, // leftwards harpoon with barb up above long dash
        '\u296B': MO.RELACCENT, // leftwards harpoon with barb down below long dash
        '\u296C': MO.RELACCENT, // rightwards harpoon with barb up above long dash
        '\u296D': MO.RELACCENT, // rightwards harpoon with barb down below long dash
        '\u296E': MO.RELSTRETCH, // upwards harpoon with barb left beside downwards harpoon with barb right
        '\u296F': MO.RELSTRETCH, // downwards harpoon with barb left beside upwards harpoon with barb right
        '\u2970': MO.RELACCENT, // right double arrow with rounded head
        '\u2971': MO.RELACCENT, // equals sign above rightwards arrow
        '\u2972': MO.RELACCENT, // tilde operator above rightwards arrow
        '\u2973': MO.RELACCENT, // leftwards arrow above tilde operator
        '\u2974': MO.RELACCENT, // rightwards arrow above tilde operator
        '\u2975': MO.RELACCENT, // rightwards arrow above almost equal to
        '\u2976': MO.RELACCENT, // less-than above leftwards arrow
        '\u2977': MO.RELACCENT, // leftwards arrow through less-than
        '\u2978': MO.RELACCENT, // greater-than above rightwards arrow
        '\u2979': MO.RELACCENT, // subset above rightwards arrow
        '\u297A': MO.RELACCENT, // leftwards arrow through subset
        '\u297B': MO.RELACCENT, // superset above leftwards arrow
        '\u297C': MO.RELACCENT, // left fish tail
        '\u297D': MO.RELACCENT, // right fish tail
        '\u297E': MO.REL,      // up fish tail
        '\u297F': MO.REL       // down fish tail
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/SupplementalArrowsB.js");

})(MathJax.ElementJax.mml);
