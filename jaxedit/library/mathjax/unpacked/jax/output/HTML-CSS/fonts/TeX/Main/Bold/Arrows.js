/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Bold/Arrows.js
 *
 *  Copyright (c) 2009-2012 Design Science, Inc.
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

MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main-bold'],
  {
    0x2190: [518,17,1150,64,1084],     // LEFTWARDS ARROW
    0x2191: [694,193,575,14,561],      // UPWARDS ARROW
    0x2192: [518,17,1150,65,1085],     // RIGHTWARDS ARROW
    0x2193: [694,194,575,14,561],      // DOWNWARDS ARROW
    0x2194: [518,17,1150,64,1085],     // LEFT RIGHT ARROW
    0x2195: [767,267,575,14,561],      // UP DOWN ARROW
    0x2196: [724,194,1150,64,1084],    // NORTH WEST ARROW
    0x2197: [724,193,1150,64,1085],    // NORTH EAST ARROW
    0x2198: [694,224,1150,65,1085],    // SOUTH EAST ARROW
    0x2199: [694,224,1150,64,1085],    // SOUTH WEST ARROW
    0x21A6: [518,17,1150,65,1085],     // RIGHTWARDS ARROW FROM BAR
    0x21A9: [518,17,1282,64,1218],     // LEFTWARDS ARROW WITH HOOK
    0x21AA: [518,17,1282,65,1217],     // RIGHTWARDS ARROW WITH HOOK
    0x21BC: [518,-220,1150,64,1084],   // LEFTWARDS HARPOON WITH BARB UPWARDS
    0x21BD: [281,17,1150,64,1084],     // LEFTWARDS HARPOON WITH BARB DOWNWARDS
    0x21C0: [518,-220,1150,65,1085],   // RIGHTWARDS HARPOON WITH BARB UPWARDS
    0x21C1: [281,17,1150,64,1085],     // RIGHTWARDS HARPOON WITH BARB DOWNWARDS
    0x21CC: [718,17,1150,64,1085],     // RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON
    0x21D0: [547,46,1150,64,1085],     // LEFTWARDS DOUBLE ARROW
    0x21D1: [694,193,703,30,672],      // UPWARDS DOUBLE ARROW
    0x21D2: [547,46,1150,64,1084],     // RIGHTWARDS DOUBLE ARROW
    0x21D3: [694,194,703,30,672],      // DOWNWARDS DOUBLE ARROW
    0x21D4: [547,46,1150,47,1102],     // LEFT RIGHT DOUBLE ARROW
    0x21D5: [767,267,703,30,672]       // UP DOWN DOUBLE ARROW
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/Arrows.js");
