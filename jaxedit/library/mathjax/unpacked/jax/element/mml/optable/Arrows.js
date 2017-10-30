/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/Arrows.js
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
        '\u219A': MO.RELACCENT, // leftwards arrow with stroke
        '\u219B': MO.RELACCENT, // rightwards arrow with stroke
        '\u219C': MO.WIDEREL,  // leftwards wave arrow
        '\u219D': MO.WIDEREL,  // rightwards wave arrow
        '\u219E': MO.WIDEREL,  // leftwards two headed arrow
        '\u219F': MO.WIDEREL,  // upwards two headed arrow
        '\u21A0': MO.WIDEREL,  // rightwards two headed arrow
        '\u21A1': MO.RELSTRETCH, // downwards two headed arrow
        '\u21A2': MO.WIDEREL,  // leftwards arrow with tail
        '\u21A3': MO.WIDEREL,  // rightwards arrow with tail
        '\u21A4': MO.WIDEREL,  // leftwards arrow from bar
        '\u21A5': MO.RELSTRETCH, // upwards arrow from bar
        '\u21A7': MO.RELSTRETCH, // downwards arrow from bar
        '\u21A8': MO.RELSTRETCH, // up down arrow with base
        '\u21AB': MO.WIDEREL,  // leftwards arrow with loop
        '\u21AC': MO.WIDEREL,  // rightwards arrow with loop
        '\u21AD': MO.WIDEREL,  // left right wave arrow
        '\u21AE': MO.RELACCENT, // left right arrow with stroke
        '\u21AF': MO.RELSTRETCH, // downwards zigzag arrow
        '\u21B0': MO.RELSTRETCH, // upwards arrow with tip leftwards
        '\u21B1': MO.RELSTRETCH, // upwards arrow with tip rightwards
        '\u21B2': MO.RELSTRETCH, // downwards arrow with tip leftwards
        '\u21B3': MO.RELSTRETCH, // downwards arrow with tip rightwards
        '\u21B4': MO.RELSTRETCH, // rightwards arrow with corner downwards
        '\u21B5': MO.RELSTRETCH, // downwards arrow with corner leftwards
        '\u21B6': MO.RELACCENT, // anticlockwise top semicircle arrow
        '\u21B7': MO.RELACCENT, // clockwise top semicircle arrow
        '\u21B8': MO.REL,      // north west arrow to long bar
        '\u21B9': MO.WIDEREL,  // leftwards arrow to bar over rightwards arrow to bar
        '\u21BA': MO.REL,      // anticlockwise open circle arrow
        '\u21BB': MO.REL,      // clockwise open circle arrow
        '\u21BE': MO.RELSTRETCH, // upwards harpoon with barb rightwards
        '\u21BF': MO.RELSTRETCH, // upwards harpoon with barb leftwards
        '\u21C2': MO.RELSTRETCH, // downwards harpoon with barb rightwards
        '\u21C3': MO.RELSTRETCH, // downwards harpoon with barb leftwards
        '\u21C4': MO.WIDEREL,  // rightwards arrow over leftwards arrow
        '\u21C5': MO.RELSTRETCH, // upwards arrow leftwards of downwards arrow
        '\u21C6': MO.WIDEREL,  // leftwards arrow over rightwards arrow
        '\u21C7': MO.WIDEREL,  // leftwards paired arrows
        '\u21C8': MO.RELSTRETCH, // upwards paired arrows
        '\u21C9': MO.WIDEREL,  // rightwards paired arrows
        '\u21CA': MO.RELSTRETCH, // downwards paired arrows
        '\u21CB': MO.WIDEREL,  // leftwards harpoon over rightwards harpoon
        '\u21CD': MO.RELACCENT, // leftwards double arrow with stroke
        '\u21CE': MO.RELACCENT, // left right double arrow with stroke
        '\u21CF': MO.RELACCENT, // rightwards double arrow with stroke
        '\u21D6': MO.RELSTRETCH, // north west double arrow
        '\u21D7': MO.RELSTRETCH, // north east double arrow
        '\u21D8': MO.RELSTRETCH, // south east double arrow
        '\u21D9': MO.RELSTRETCH, // south west double arrow
        '\u21DA': MO.WIDEREL,  // leftwards triple arrow
        '\u21DB': MO.WIDEREL,  // rightwards triple arrow
        '\u21DC': MO.WIDEREL,  // leftwards squiggle arrow
        '\u21DD': MO.WIDEREL,  // rightwards squiggle arrow
        '\u21DE': MO.REL,      // upwards arrow with double stroke
        '\u21DF': MO.REL,      // downwards arrow with double stroke
        '\u21E0': MO.WIDEREL,  // leftwards dashed arrow
        '\u21E1': MO.RELSTRETCH, // upwards dashed arrow
        '\u21E2': MO.WIDEREL,  // rightwards dashed arrow
        '\u21E3': MO.RELSTRETCH, // downwards dashed arrow
        '\u21E4': MO.WIDEREL,  // leftwards arrow to bar
        '\u21E5': MO.WIDEREL,  // rightwards arrow to bar
        '\u21E6': MO.WIDEREL,  // leftwards white arrow
        '\u21E7': MO.RELSTRETCH, // upwards white arrow
        '\u21E8': MO.WIDEREL,  // rightwards white arrow
        '\u21E9': MO.RELSTRETCH, // downwards white arrow
        '\u21EA': MO.RELSTRETCH, // upwards white arrow from bar
        '\u21EB': MO.RELSTRETCH, // upwards white arrow on pedestal
        '\u21EC': MO.RELSTRETCH, // upwards white arrow on pedestal with horizontal bar
        '\u21ED': MO.RELSTRETCH, // upwards white arrow on pedestal with vertical bar
        '\u21EE': MO.RELSTRETCH, // upwards white double arrow
        '\u21EF': MO.RELSTRETCH, // upwards white double arrow on pedestal
        '\u21F0': MO.WIDEREL,  // rightwards white arrow from wall
        '\u21F1': MO.REL,      // north west arrow to corner
        '\u21F2': MO.REL,      // south east arrow to corner
        '\u21F3': MO.RELSTRETCH, // up down white arrow
        '\u21F4': MO.RELACCENT, // right arrow with small circle
        '\u21F5': MO.RELSTRETCH, // downwards arrow leftwards of upwards arrow
        '\u21F6': MO.WIDEREL,  // three rightwards arrows
        '\u21F7': MO.RELACCENT, // leftwards arrow with vertical stroke
        '\u21F8': MO.RELACCENT, // rightwards arrow with vertical stroke
        '\u21F9': MO.RELACCENT, // left right arrow with vertical stroke
        '\u21FA': MO.RELACCENT, // leftwards arrow with double vertical stroke
        '\u21FB': MO.RELACCENT, // rightwards arrow with double vertical stroke
        '\u21FC': MO.RELACCENT, // left right arrow with double vertical stroke
        '\u21FD': MO.WIDEREL,  // leftwards open-headed arrow
        '\u21FE': MO.WIDEREL,  // rightwards open-headed arrow
        '\u21FF': MO.WIDEREL   // left right open-headed arrow
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/Arrows.js");

})(MathJax.ElementJax.mml);
