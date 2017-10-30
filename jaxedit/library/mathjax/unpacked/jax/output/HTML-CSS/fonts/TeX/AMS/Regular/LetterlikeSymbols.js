/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/LetterlikeSymbols.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_AMS'],
  {
    0x210F: [695,13,540,42,562],       // stix-/hbar - Planck's over 2pi
    0x2127: [684,22,722,44,675],       // INVERTED OHM SIGN
    0x2132: [695,1,556,55,497],        // TURNED CAPITAL F
    0x2136: [763,21,667,-22,687],      // BET SYMBOL
    0x2137: [764,43,444,-22,421],      // GIMEL SYMBOL
    0x2138: [764,43,667,54,640],       // DALET SYMBOL
    0x2141: [705,23,639,37,577]        // TURNED SANS-SERIF CAPITAL G
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/AMS/Regular/LetterlikeSymbols.js");
