/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Regular/CombDiacritMarks.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main'],
  {
    0x300: [699,-505,0,-394,-205],     // COMBINING GRAVE ACCENT
    0x301: [699,-505,0,-297,-107],     // COMBINING ACUTE ACCENT
    0x302: [694,-531,0,-388,-113],     // COMBINING CIRCUMFLEX ACCENT
    0x303: [668,-565,0,-417,-84],      // COMBINING TILDE
    0x304: [590,-544,0,-431,-70],      // COMBINING MACRON
    0x306: [694,-515,0,-408,-93],      // COMBINING BREVE
    0x307: [669,-549,0,-310,-191],     // COMBINING DOT ABOVE
    0x308: [669,-554,0,-405,-96],      // COMBINING DIAERESIS
    0x30A: [715,-542,0,-353,-148],     // COMBINING RING ABOVE
    0x30B: [701,-510,0,-378,-80],      // COMBINING DOUBLE ACUTE ACCENT
    0x30C: [644,-513,0,-386,-115],     // COMBINING CARON
    0x338: [716,215,0,-639,-140]       // COMBINING LONG SOLIDUS OVERLAY
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Regular/CombDiacritMarks.js");
