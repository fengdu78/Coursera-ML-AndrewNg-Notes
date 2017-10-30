/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Size3/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Size3'] = {
  directory: 'Size3/Regular',
  family: 'MathJax_Size3',
  testString: "() [] {}",
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [1450,949,736,209,701],      // LEFT PARENTHESIS
  0x29: [1450,949,736,34,526],       // RIGHT PARENTHESIS
  0x2F: [1450,949,1044,55,989],      // SOLIDUS
  0x5B: [1450,949,528,247,516],      // LEFT SQUARE BRACKET
  0x5C: [1450,949,1044,56,988],      // REVERSE SOLIDUS
  0x5D: [1450,949,528,11,280],       // RIGHT SQUARE BRACKET
  0x7B: [1450,949,750,130,618],      // LEFT CURLY BRACKET
  0x7D: [1450,949,750,131,618],      // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x2C6: [772,-564,1444,-4,1447],    // MODIFIER LETTER CIRCUMFLEX ACCENT
  0x2DC: [749,-610,1444,1,1442],     // SMALL TILDE
  0x302: [772,-564,0,-1448,3],       // COMBINING CIRCUMFLEX ACCENT
  0x303: [749,-610,0,-1443,-2],      // COMBINING TILDE
  0x221A: [1450,950,1000,111,1020],  // SQUARE ROOT
  0x2308: [1450,949,583,246,571],    // LEFT CEILING
  0x2309: [1450,949,583,11,336],     // RIGHT CEILING
  0x230A: [1450,949,583,246,571],    // LEFT FLOOR
  0x230B: [1450,949,583,11,336],     // RIGHT FLOOR
  0x27E8: [1450,950,750,126,654],    // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [1450,949,750,94,623]      // MATHEMATICAL RIGHT ANGLE BRACKET
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Size3"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Size3/Regular/Main.js"]
);
