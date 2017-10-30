/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Typewriter'],
  {
    0x300: [611,-485,0,-409,-195],     // COMBINING GRAVE ACCENT
    0x301: [611,-485,0,-331,-117],     // COMBINING ACUTE ACCENT
    0x302: [611,-460,0,-429,-97],      // COMBINING CIRCUMFLEX ACCENT
    0x303: [611,-466,0,-438,-88],      // COMBINING TILDE
    0x304: [577,-500,0,-452,-74],      // COMBINING MACRON
    0x306: [611,-504,0,-446,-79],      // COMBINING BREVE
    0x308: [612,-519,0,-421,-104],     // COMBINING DIAERESIS
    0x30A: [619,-499,0,-344,-182],     // COMBINING RING ABOVE
    0x30C: [577,-449,0,-427,-99]       // COMBINING CARON
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Typewriter/Regular/CombDiacritMarks.js");
