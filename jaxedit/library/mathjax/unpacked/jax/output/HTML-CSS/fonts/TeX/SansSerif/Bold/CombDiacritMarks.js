/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_SansSerif-bold'],
  {
    0x300: [694,-537,0,-458,-218],     // COMBINING GRAVE ACCENT
    0x301: [694,-537,0,-334,-93],      // COMBINING ACUTE ACCENT
    0x302: [694,-537,0,-442,-109],     // COMBINING CIRCUMFLEX ACCENT
    0x303: [694,-548,0,-458,-93],      // COMBINING TILDE
    0x304: [660,-560,0,-474,-77],      // COMBINING MACRON
    0x306: [694,-552,0,-470,-80],      // COMBINING BREVE
    0x307: [695,-596,0,-356,-194],     // COMBINING DOT ABOVE
    0x308: [695,-595,0,-459,-91],      // COMBINING DIAERESIS
    0x30A: [694,-538,0,-365,-119],     // COMBINING RING ABOVE
    0x30B: [694,-537,0,-440,-94],      // COMBINING DOUBLE ACUTE ACCENT
    0x30C: [657,-500,0,-442,-109]      // COMBINING CARON
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SansSerif/Bold/CombDiacritMarks.js");
