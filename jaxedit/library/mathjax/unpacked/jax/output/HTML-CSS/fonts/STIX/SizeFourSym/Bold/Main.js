/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/SizeFourSym/Bold/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXSizeFourSym-bold'] = {
  directory: 'SizeFourSym/Bold',
  family: 'STIXSizeFourSym',
  weight: 'bold',
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [2604,471,818,115,761],      // LEFT PARENTHESIS
  0x29: [2604,471,818,57,703],       // RIGHT PARENTHESIS
  0x2F: [2604,471,1321,3,1318],      // SOLIDUS
  0x5B: [2604,471,699,314,691],      // LEFT SQUARE BRACKET
  0x5C: [2604,471,1321,3,1318],      // REVERSE SOLIDUS
  0x5D: [2604,471,699,8,385],        // RIGHT SQUARE BRACKET
  0x7B: [2604,471,1119,197,944],     // LEFT CURLY BRACKET
  0x7D: [2604,471,1119,175,922],     // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x221A: [1510,345,1184,101,915],   // SQUARE ROOT
  0x2308: [2604,471,720,314,712],    // LEFT CEILING
  0x2309: [2604,471,720,8,406],      // RIGHT CEILING
  0x230A: [2604,471,720,314,712],    // LEFT FLOOR
  0x230B: [2604,471,720,8,406],      // RIGHT FLOOR
  0x27E8: [2604,471,908,120,841],    // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [2604,471,908,67,788]      // MATHEMATICAL RIGHT ANGLE BRACKET
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXSizeFourSym-bold");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SizeFourSym/Bold/Main.js");
