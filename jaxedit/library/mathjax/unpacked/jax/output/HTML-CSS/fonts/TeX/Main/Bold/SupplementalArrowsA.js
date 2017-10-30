/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Bold/SupplementalArrowsA.js
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
    0x27F5: [518,17,1805,64,1741],     // LONG LEFTWARDS ARROW
    0x27F6: [518,17,1833,96,1773],     // LONG RIGHTWARDS ARROW
    0x27F7: [518,17,2126,64,2061],     // LONG LEFT RIGHT ARROW
    0x27F8: [547,46,1868,64,1804],     // LONG LEFTWARDS DOUBLE ARROW
    0x27F9: [547,46,1870,64,1804],     // LONG RIGHTWARDS DOUBLE ARROW
    0x27FA: [547,46,2126,64,2060],     // LONG LEFT RIGHT DOUBLE ARROW
    0x27FC: [518,17,1833,65,1773]      // LONG RIGHTWARDS ARROW FROM BAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/SupplementalArrowsA.js");
