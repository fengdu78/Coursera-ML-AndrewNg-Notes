/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/SizeTwoSym/Bold/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXSizeTwoSym-bold'] = {
  directory: 'SizeTwoSym/Bold',
  family: 'STIXSizeTwoSym',
  weight: 'bold',
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [1604,241,608,110,512],      // LEFT PARENTHESIS
  0x29: [1604,241,608,96,498],       // RIGHT PARENTHESIS
  0x2F: [1604,241,802,4,798],        // SOLIDUS
  0x5B: [1604,241,485,197,467],      // LEFT SQUARE BRACKET
  0x5C: [1604,241,802,4,798],        // REVERSE SOLIDUS
  0x5D: [1604,241,485,18,288],       // RIGHT SQUARE BRACKET
  0x7B: [1604,241,681,69,514],       // LEFT CURLY BRACKET
  0x7D: [1604,241,681,167,612],      // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x221A: [2095,355,1130,106,1185],  // SQUARE ROOT
  0x2308: [1604,241,538,185,510],    // LEFT CEILING
  0x2309: [1604,241,538,28,355],     // RIGHT CEILING
  0x230A: [1604,241,538,185,512],    // LEFT FLOOR
  0x230B: [1604,241,538,28,353],     // RIGHT FLOOR
  0x27E8: [1604,241,622,98,572],     // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [1604,241,622,50,524]      // MATHEMATICAL RIGHT ANGLE BRACKET
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXSizeTwoSym-bold");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SizeTwoSym/Bold/Main.js");
