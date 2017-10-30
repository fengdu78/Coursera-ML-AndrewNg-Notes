/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Bold/Latin1Supplement.js
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
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0xA8: [695,-535,575,96,478],       // DIAERESIS
    0xAC: [371,-61,767,64,702],        // NOT SIGN
    0xAF: [607,-540,575,80,494],       // MACRON
    0xB0: [702,-536,575,160,414],      // DEGREE SIGN
    0xB1: [728,35,894,64,829],         // PLUS-MINUS SIGN
    0xB4: [706,-503,575,236,460],      // ACUTE ACCENT
    0xD7: [530,28,894,168,726],        // MULTIPLICATION SIGN
    0xF7: [597,96,894,64,828]          // DIVISION SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/Latin1Supplement.js");
