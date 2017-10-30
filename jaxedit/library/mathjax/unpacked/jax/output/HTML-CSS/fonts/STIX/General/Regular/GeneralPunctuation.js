/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Regular/GeneralPunctuation.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral'],
  {
    0x2010: [259,-193,333,39,285],     // HYPHEN
    0x2011: [257,-194,333,39,285],     // NON-BREAKING HYPHEN
    0x2012: [259,-193,500,0,500],      // FIGURE DASH
    0x2013: [250,-201,500,0,500],      // EN DASH
    0x2014: [250,-201,1000,0,1000],    // EM DASH
    0x2015: [250,-201,2000,0,2000],    // HORIZONTAL BAR
    0x2016: [690,189,523,129,394],     // DOUBLE VERTICAL LINE
    0x2017: [-141,300,500,0,500],      // DOUBLE LOW LINE
    0x2018: [676,-433,333,115,254],    // LEFT SINGLE QUOTATION MARK
    0x2019: [676,-433,333,79,218],     // RIGHT SINGLE QUOTATION MARK
    0x201A: [102,141,333,79,218],      // SINGLE LOW-9 QUOTATION MARK
    0x201B: [676,-433,333,79,218],     // SINGLE HIGH-REVERSED-9 QUOTATION MARK
    0x201C: [676,-433,444,43,414],     // LEFT DOUBLE QUOTATION MARK
    0x201D: [676,-433,444,30,401],     // RIGHT DOUBLE QUOTATION MARK
    0x201E: [102,141,444,45,416],      // DOUBLE LOW-9 QUOTATION MARK
    0x201F: [676,-433,444,30,401],     // DOUBLE HIGH-REVERSED-9 QUOTATION MARK
    0x2022: [444,-59,523,70,455],      // BULLET
    0x2025: [100,11,667,111,555],      // TWO DOT LEADER
    0x2030: [706,19,1109,61,1048],     // PER MILLE SIGN
    0x2031: [706,19,1471,61,1410],     // PER TEN THOUSAND SIGN
    0x2033: [678,-401,426,75,351],     // DOUBLE PRIME
    0x2034: [678,-401,563,75,488],     // TRIPLE PRIME
    0x2035: [678,-402,289,75,214],     // REVERSED PRIME
    0x2036: [678,-401,426,75,351],     // REVERSED DOUBLE PRIME
    0x2037: [678,-401,563,75,488],     // REVERSED TRIPLE PRIME
    0x2038: [102,156,511,59,454],      // CARET
    0x2039: [416,-33,333,63,285],      // SINGLE LEFT-POINTING ANGLE QUOTATION MARK
    0x203A: [416,-33,333,48,270],      // SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
    0x203B: [547,41,685,48,635],       // REFERENCE MARK
    0x203C: [676,9,549,130,452],       // DOUBLE EXCLAMATION MARK
    0x2040: [709,-512,798,72,726],     // CHARACTER TIE
    0x2043: [332,-172,333,39,285],     // HYPHEN BULLET
    0x2044: [676,14,167,-168,331],     // FRACTION SLASH
    0x2047: [676,8,839,68,809],        // DOUBLE QUESTION MARK
    0x204E: [240,171,500,68,433],      // LOW ASTERISK
    0x204F: [459,141,278,60,199],      // REVERSED SEMICOLON
    0x2050: [691,40,790,55,735],       // CLOSE UP
    0x2051: [676,171,501,68,433],      // TWO ASTERISKS ALIGNED VERTICALLY
    0x2052: [706,200,471,54,417],      // COMMERCIAL MINUS SIGN
    0x2057: [678,-401,710,75,635],     // QUADRUPLE PRIME
    0x205F: [0,0,1000,0,0]             // MEDIUM MATHEMATICAL SPACE
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Regular/GeneralPunctuation.js");
