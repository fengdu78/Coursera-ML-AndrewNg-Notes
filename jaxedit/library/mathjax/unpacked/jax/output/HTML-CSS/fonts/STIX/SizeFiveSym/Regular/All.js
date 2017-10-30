/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/SizeFiveSym/Regular/All.js
 *
 *  Copyright (c) 2009-2010 Design Science, Inc.
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXSizeFiveSym'],
  {
    0x2C6: [816,-572,2328,0,2328],     // MODIFIER LETTER CIRCUMFLEX ACCENT
    0x2C7: [816,-572,2328,0,2328],     // CARON
    0x2DC: [780,-617,2328,0,2328],     // SMALL TILDE
    0x2F7: [-117,280,2328,0,2328],     // ??
    0x305: [820,-770,0,-3000,0],       // COMBINING OVERLINE
    0x30C: [816,-572,0,-2485,-157],    // COMBINING CARON
    0x330: [-117,280,0,-2485,-157],    // COMBINING TILDE BELOW
    0x332: [-127,177,0,-3000,0],       // COMBINING LOW LINE
    0x338: [960,454,0,-561,-123],      // COMBINING LONG SOLIDUS OVERLAY
    0x203E: [820,-770,3000,0,3000],    // OVERLINE
    0x20D0: [749,-584,0,-3000,0],      // COMBINING LEFT HARPOON ABOVE
    0x20D1: [749,-584,0,-3000,0],      // COMBINING RIGHT HARPOON ABOVE
    0x20D6: [735,-482,0,-3000,0],      // COMBINING LEFT ARROW ABOVE
    0x20D7: [735,-482,0,-3000,0],      // COMBINING RIGHT ARROW ABOVE
    0x20EC: [-123,288,0,-3000,0],      // COMBINING RIGHTWARDS HARPOON WITH BARB DOWNWARDS
    0x20ED: [-123,288,0,-3000,0],      // COMBINING LEFTWARDS HARPOON WITH BARB DOWNWARDS
    0x20EE: [-26,279,0,-3000,0],       // COMBINING LEFT ARROW BELOW
    0x20EF: [-26,279,0,-3000,0],       // COMBINING RIGHT ARROW BELOW
    0x23B4: [766,-544,3237,90,3147],   // TOP SQUARE BRACKET
    0x23B5: [139,83,3237,90,3147],     // BOTTOM SQUARE BRACKET
    0x23DC: [80,189,3237,0,3237],      // TOP PARENTHESIS (mathematical use)
    0x23DD: [842,-573,3237,0,3237],    // BOTTOM PARENTHESIS (mathematical use)
    0x23E0: [66,212,3164,0,3164],      // TOP TORTOISE SHELL BRACKET (mathematical use)
    0x23E1: [842,-564,3164,0,3164]     // BOTTOM TORTOISE SHELL BRACKET (mathematical use)
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SizeFiveSym/Regular/All.js");
