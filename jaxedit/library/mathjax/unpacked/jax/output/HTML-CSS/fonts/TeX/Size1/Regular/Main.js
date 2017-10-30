/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Size1/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Size1'] = {
  directory: 'Size1/Regular',
  family: 'MathJax_Size1',
  testString: "() [] {}",
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [850,349,458,152,422],       // LEFT PARENTHESIS
  0x29: [850,349,458,35,305],        // RIGHT PARENTHESIS
  0x2F: [850,349,578,55,522],        // SOLIDUS
  0x5B: [850,349,417,202,394],       // LEFT SQUARE BRACKET
  0x5C: [850,349,578,54,522],        // REVERSE SOLIDUS
  0x5D: [850,349,417,22,214],        // RIGHT SQUARE BRACKET
  0x7B: [850,349,583,105,477],       // LEFT CURLY BRACKET
  0x7D: [850,349,583,105,477],       // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x2C6: [744,-551,556,-8,564],      // MODIFIER LETTER CIRCUMFLEX ACCENT
  0x2DC: [722,-597,556,1,554],       // SMALL TILDE
  0x302: [744,-551,0,-564,8],        // COMBINING CIRCUMFLEX ACCENT
  0x303: [722,-597,0,-555,-2],       // COMBINING TILDE
  0x2016: [602,0,778,257,521],       // DOUBLE VERTICAL LINE
  0x2191: [600,0,667,112,555],       // UPWARDS ARROW
  0x2193: [600,0,667,112,555],       // DOWNWARDS ARROW
  0x21D1: [599,0,778,57,721],        // UPWARDS DOUBLE ARROW
  0x21D3: [600,-1,778,57,721],       // DOWNWARDS DOUBLE ARROW
  0x220F: [750,250,944,55,888],      // N-ARY PRODUCT
  0x2210: [750,250,944,55,888],      // N-ARY COPRODUCT
  0x2211: [750,250,1056,56,999],     // N-ARY SUMMATION
  0x221A: [850,350,1000,111,1020],   // SQUARE ROOT
  0x2223: [627,15,333,145,188],      // DIVIDES
  0x2225: [627,15,556,145,410],      // PARALLEL TO
  0x222B: [805,306,472,55,610],      // INTEGRAL
  0x222C: [805,306,819,55,957],      // DOUBLE INTEGRAL
  0x222D: [805,306,1166,55,1304],    // TRIPLE INTEGRAL
  0x222E: [805,306,472,55,610],      // CONTOUR INTEGRAL
  0x22C0: [750,249,833,55,777],      // N-ARY LOGICAL AND
  0x22C1: [750,249,833,55,777],      // N-ARY LOGICAL OR
  0x22C2: [750,249,833,55,777],      // N-ARY INTERSECTION
  0x22C3: [750,249,833,55,777],      // N-ARY UNION
  0x2308: [850,349,472,202,449],     // LEFT CEILING
  0x2309: [850,349,472,22,269],      // RIGHT CEILING
  0x230A: [850,349,472,202,449],     // LEFT FLOOR
  0x230B: [850,349,472,22,269],      // RIGHT FLOOR
  0x23D0: [602,0,667,312,355],       // VERTICAL LINE EXTENSION (used to extend arrows)
  0x27E8: [850,350,472,97,394],      // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [850,350,472,77,374],      // MATHEMATICAL RIGHT ANGLE BRACKET
  0x2A00: [750,250,1111,56,1054],    // N-ARY CIRCLED DOT OPERATOR
  0x2A01: [750,250,1111,56,1054],    // N-ARY CIRCLED PLUS OPERATOR
  0x2A02: [750,250,1111,56,1054],    // N-ARY CIRCLED TIMES OPERATOR
  0x2A04: [750,249,833,55,777],      // N-ARY UNION OPERATOR WITH PLUS
  0x2A06: [750,249,833,55,777]       // N-ARY SQUARE UNION OPERATOR
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Size1"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Size1/Regular/Main.js"]
);
