/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/SizeThreeSym/Bold/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXSizeThreeSym-bold'] = {
  directory: 'SizeThreeSym/Bold',
  family: 'STIXSizeThreeSym',
  weight: 'bold',
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [2104,355,750,163,686],      // LEFT PARENTHESIS
  0x29: [2104,355,750,64,587],       // RIGHT PARENTHESIS
  0x2F: [2104,355,1102,11,1091],     // SOLIDUS
  0x5B: [2104,355,538,236,540],      // LEFT SQUARE BRACKET
  0x5C: [2104,355,1102,11,1091],     // REVERSE SOLIDUS
  0x5D: [2104,355,538,-2,302],       // RIGHT SQUARE BRACKET
  0x7B: [2104,355,906,124,736],      // LEFT CURLY BRACKET
  0x7D: [2104,355,906,170,782],      // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x221A: [2604,471,1076,104,1139],  // SQUARE ROOT
  0x2308: [2104,355,595,236,599],    // LEFT CEILING
  0x2309: [2104,355,595,-4,359],     // RIGHT CEILING
  0x230A: [2104,355,595,236,599],    // LEFT FLOOR
  0x230B: [2104,355,595,-4,359],     // RIGHT FLOOR
  0x27E8: [2104,355,765,108,720],    // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [2104,355,765,45,657]      // MATHEMATICAL RIGHT ANGLE BRACKET
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXSizeThreeSym-bold");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SizeThreeSym/Bold/Main.js");
