/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/SansSerif/Italic/Other.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_SansSerif-italic'],
  {
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x131: [444,0,239,74,258],         // LATIN SMALL LETTER DOTLESS I
    0x237: [444,204,267,-96,286],      // LATIN SMALL LETTER DOTLESS J
    0x393: [691,0,542,87,646],         // GREEK CAPITAL LETTER GAMMA
    0x394: [694,0,833,42,790],         // GREEK CAPITAL LETTER DELTA
    0x398: [715,22,778,119,804],       // GREEK CAPITAL LETTER THETA
    0x39B: [694,0,611,28,582],         // GREEK CAPITAL LETTER LAMDA
    0x39E: [688,0,667,42,765],         // GREEK CAPITAL LETTER XI
    0x3A0: [691,0,708,86,768],         // GREEK CAPITAL LETTER PI
    0x3A3: [694,0,722,55,813],         // GREEK CAPITAL LETTER SIGMA
    0x3A5: [716,0,778,173,843],        // GREEK CAPITAL LETTER UPSILON
    0x3A6: [694,0,722,124,743],        // GREEK CAPITAL LETTER PHI
    0x3A8: [694,0,778,171,854],        // GREEK CAPITAL LETTER PSI
    0x3A9: [716,0,722,44,769],         // GREEK CAPITAL LETTER OMEGA
    0x2013: [312,-236,500,50,565],     // EN DASH
    0x2014: [312,-236,1000,50,1065],   // EM DASH
    0x2018: [694,-471,278,190,336],    // LEFT SINGLE QUOTATION MARK
    0x2019: [694,-471,278,190,335],    // RIGHT SINGLE QUOTATION MARK
    0x201C: [694,-471,500,274,614],    // LEFT DOUBLE QUOTATION MARK
    0x201D: [694,-471,500,133,472]     // RIGHT DOUBLE QUOTATION MARK
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SansSerif/Italic/Other.js");
