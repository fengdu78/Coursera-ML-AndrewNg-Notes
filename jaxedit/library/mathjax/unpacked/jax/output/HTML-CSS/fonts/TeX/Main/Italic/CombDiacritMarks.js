/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Italic/CombDiacritMarks.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main-italic'],
  {
    0x300: [697,-500,0,-222,-74],      // COMBINING GRAVE ACCENT
    0x301: [697,-500,0,-173,39],       // COMBINING ACUTE ACCENT
    0x302: [694,-527,0,-251,17],       // COMBINING CIRCUMFLEX ACCENT
    0x303: [668,-558,0,-265,60],       // COMBINING TILDE
    0x304: [589,-544,0,-282,54],       // COMBINING MACRON
    0x306: [694,-515,0,-237,62],       // COMBINING BREVE
    0x307: [669,-548,0,-165,-41],      // COMBINING DOT ABOVE
    0x308: [669,-554,0,-251,45],       // COMBINING DIAERESIS
    0x30A: [716,-542,0,-199,3],        // COMBINING RING ABOVE
    0x30B: [697,-503,0,-248,65],       // COMBINING DOUBLE ACUTE ACCENT
    0x30C: [638,-502,0,-236,29]        // COMBINING CARON
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Italic/CombDiacritMarks.js");
