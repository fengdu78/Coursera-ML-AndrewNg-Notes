/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Bold/CombDiacritMarks.js
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
    0x300: [706,-503,0,-461,-237],     // COMBINING GRAVE ACCENT
    0x301: [706,-503,0,-339,-115],     // COMBINING ACUTE ACCENT
    0x302: [694,-520,0,-449,-127],     // COMBINING CIRCUMFLEX ACCENT
    0x303: [694,-552,0,-479,-97],      // COMBINING TILDE
    0x304: [607,-540,0,-495,-81],      // COMBINING MACRON
    0x306: [694,-500,0,-473,-103],     // COMBINING BREVE
    0x307: [695,-525,0,-373,-203],     // COMBINING DOT ABOVE
    0x308: [695,-535,0,-479,-97],      // COMBINING DIAERESIS
    0x30A: [702,-536,0,-415,-161],     // COMBINING RING ABOVE
    0x30B: [714,-511,0,-442,-82],      // COMBINING DOUBLE ACUTE ACCENT
    0x30C: [660,-515,0,-445,-131],     // COMBINING CARON
    0x338: [711,210,0,-734,-161]       // COMBINING LONG SOLIDUS OVERLAY
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/CombDiacritMarks.js");
