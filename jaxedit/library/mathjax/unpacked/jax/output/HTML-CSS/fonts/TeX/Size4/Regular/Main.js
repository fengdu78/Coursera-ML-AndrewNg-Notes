/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Size4/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Size4'] = {
  directory: 'Size4/Regular',
  family: 'MathJax_Size4',
  testString: "() [] {}",
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [1750,1249,792,237,758],     // LEFT PARENTHESIS
  0x29: [1750,1249,792,33,554],      // RIGHT PARENTHESIS
  0x2F: [1750,1249,1278,56,1221],    // SOLIDUS
  0x5B: [1750,1249,583,269,577],     // LEFT SQUARE BRACKET
  0x5C: [1750,1249,1278,56,1221],    // REVERSE SOLIDUS
  0x5D: [1750,1249,583,5,313],       // RIGHT SQUARE BRACKET
  0x7B: [1750,1249,806,144,661],     // LEFT CURLY BRACKET
  0x7D: [1750,1249,806,144,661],     // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x2C6: [845,-561,1889,-14,1902],   // MODIFIER LETTER CIRCUMFLEX ACCENT
  0x2DC: [823,-583,1889,1,1885],     // SMALL TILDE
  0x302: [845,-561,0,-1903,13],      // COMBINING CIRCUMFLEX ACCENT
  0x303: [823,-583,0,-1888,-4],      // COMBINING TILDE
  0x221A: [1750,1250,1000,111,1020], // SQUARE ROOT
  0x2308: [1750,1249,639,269,633],   // LEFT CEILING
  0x2309: [1750,1249,639,5,369],     // RIGHT CEILING
  0x230A: [1750,1249,639,269,633],   // LEFT FLOOR
  0x230B: [1750,1249,639,5,369],     // RIGHT FLOOR
  0x239B: [1154,655,875,291,843],    // LEFT PARENTHESIS UPPER HOOK
  0x239C: [610,10,875,291,417],      // LEFT PARENTHESIS EXTENSION
  0x239D: [1165,644,875,291,843],    // LEFT PARENTHESIS LOWER HOOK
  0x239E: [1154,655,875,31,583],     // RIGHT PARENTHESIS UPPER HOOK
  0x239F: [610,10,875,457,583],      // RIGHT PARENTHESIS EXTENSION
  0x23A0: [1165,644,875,31,583],     // RIGHT PARENTHESIS LOWER HOOK
  0x23A1: [1154,645,667,319,666],    // LEFT SQUARE BRACKET UPPER CORNER
  0x23A2: [602,0,667,319,403],       // LEFT SQUARE BRACKET EXTENSION
  0x23A3: [1155,644,667,319,666],    // LEFT SQUARE BRACKET LOWER CORNER
  0x23A4: [1154,645,667,0,347],      // RIGHT SQUARE BRACKET UPPER CORNER
  0x23A5: [602,0,667,263,347],       // RIGHT SQUARE BRACKET EXTENSION
  0x23A6: [1155,644,667,0,347],      // RIGHT SQUARE BRACKET LOWER CORNER
  0x23A7: [899,10,889,384,718],      // LEFT CURLY BRACKET UPPER HOOK
  0x23A8: [1160,660,889,170,504],    // LEFT CURLY BRACKET MIDDLE PIECE
  0x23A9: [10,899,889,384,718],      // LEFT CURLY BRACKET LOWER HOOK
  0x23AA: [310,10,889,384,504],      // CURLY BRACKET EXTENSION
  0x23AB: [899,10,889,170,504],      // RIGHT CURLY BRACKET UPPER HOOK
  0x23AC: [1160,660,889,384,718],    // RIGHT CURLY BRACKET MIDDLE PIECE
  0x23AD: [10,899,889,170,504],      // RIGHT CURLY BRACKET LOWER HOOK
  0x23B7: [935,885,1056,111,742],    // RADICAL SYMBOL BOTTOM
  0x27E8: [1750,1248,806,140,703],   // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [1750,1248,806,103,665],   // MATHEMATICAL RIGHT ANGLE BRACKET
  0xE000: [625,14,1056,702,742],     // stix-radical symbol vertical extender
  0xE001: [605,14,1056,702,1076],    // stix-radical symbol top corner piece
  0xE150: [120,213,450,-24,460],     // stix-horizontal brace, down left piece
  0xE151: [120,213,450,-10,474],     // stix-horizontal brace, down right piece
  0xE152: [333,0,450,-24,460],       // stix-horizontal brace, upper left piece
  0xE153: [333,0,450,-10,474],       // stix-horizontal brace, upper right piece
  0xE154: [120,0,400,-10,410]        // stix-oblique open face capital letter A
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Size4"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Size4/Regular/Main.js"]
);
