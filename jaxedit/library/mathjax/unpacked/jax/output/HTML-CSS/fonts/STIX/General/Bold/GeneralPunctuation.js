/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Bold/GeneralPunctuation.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold'],
  {
    0x2010: [287,-171,333,44,287],     // HYPHEN
    0x2011: [287,-171,333,44,287],     // NON-BREAKING HYPHEN
    0x2012: [287,-171,500,0,500],      // FIGURE DASH
    0x2013: [271,-181,500,0,500],      // EN DASH
    0x2014: [271,-181,1000,0,1000],    // EM DASH
    0x2015: [271,-181,2000,0,2000],    // HORIZONTAL BAR
    0x2017: [-137,287,520,10,510],     // DOUBLE LOW LINE
    0x2018: [691,-356,333,70,254],     // LEFT SINGLE QUOTATION MARK
    0x2019: [691,-356,333,79,263],     // RIGHT SINGLE QUOTATION MARK
    0x201A: [155,180,333,79,263],      // SINGLE LOW-9 QUOTATION MARK
    0x201B: [691,-356,333,79,263],     // SINGLE HIGH-REVERSED-9 QUOTATION MARK
    0x201C: [691,-356,500,32,486],     // LEFT DOUBLE QUOTATION MARK
    0x201D: [691,-356,500,14,468],     // RIGHT DOUBLE QUOTATION MARK
    0x201E: [155,180,500,14,468],      // DOUBLE LOW-9 QUOTATION MARK
    0x201F: [691,-356,500,14,468],     // DOUBLE HIGH-REVERSED-9 QUOTATION MARK
    0x2020: [691,134,500,47,453],      // DAGGER
    0x2021: [691,132,500,45,456],      // DOUBLE DAGGER
    0x2022: [462,-42,560,70,490],      // BULLET
    0x2025: [156,13,666,82,584],       // TWO DOT LEADER
    0x2026: [156,13,1000,82,917],      // HORIZONTAL ELLIPSIS
    0x2030: [706,29,1110,61,1049],     // PER MILLE SIGN
    0x2031: [706,29,1472,61,1411],     // PER TEN THOUSAND SIGN
    0x2032: [713,-438,310,75,235],     // PRIME
    0x2033: [713,-438,467,75,392],     // DOUBLE PRIME
    0x2034: [713,-438,625,75,550],     // TRIPLE PRIME
    0x2035: [713,-438,310,75,235],     // REVERSED PRIME
    0x2036: [713,-438,467,75,392],     // REVERSED DOUBLE PRIME
    0x2037: [713,-438,625,75,550],     // REVERSED TRIPLE PRIME
    0x2038: [117,170,584,91,497],      // CARET
    0x2039: [415,-36,333,51,305],      // SINGLE LEFT-POINTING ANGLE QUOTATION MARK
    0x203A: [415,-36,333,28,282],      // SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
    0x203C: [691,13,625,81,544],       // DOUBLE EXCLAMATION MARK
    0x203E: [838,-766,500,0,500],      // OVERLINE
    0x2040: [725,-508,798,79,733],     // CHARACTER TIE
    0x2044: [688,12,183,-168,345],     // FRACTION SLASH
    0x2047: [689,13,947,57,892],       // DOUBLE QUESTION MARK
    0x204E: [236,200,500,56,448],      // LOW ASTERISK
    0x204F: [472,180,333,67,251],      // REVERSED SEMICOLON
    0x2051: [706,200,500,56,448],      // TWO ASTERISKS ALIGNED VERTICALLY
    0x2057: [713,-438,783,75,708]      // QUADRUPLE PRIME
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Bold/GeneralPunctuation.js");
