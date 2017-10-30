/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/SizeTwoSym/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXSizeTwoSym'] = {
  directory: 'SizeTwoSym/Regular',
  family: 'STIXSizeTwoSym',
  Ranges: [
    [0x2B0,0x2FF,"All"],
    [0x300,0x338,"All"],
    [0x203E,0x203E,"All"],
    [0x20D0,0x20EF,"All"],
    [0x221A,0x221C,"All"],
    [0x239B,0x23B9,"All"],
    [0x23DC,0x23E1,"All"],
    [0x2772,0x2773,"All"],
    [0x27E6,0x27EB,"All"],
    [0x2983,0x2986,"All"],
    [0x2AFC,0x2AFF,"All"]
  ],
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [1566,279,589,139,503],      // LEFT PARENTHESIS
  0x29: [1566,279,608,114,478],      // RIGHT PARENTHESIS
  0x2F: [1566,279,806,25,781],       // SOLIDUS
  0x5B: [1566,279,459,190,422],      // LEFT SQUARE BRACKET
  0x5C: [1566,279,806,25,781],       // REVERSE SOLIDUS
  0x5D: [1566,279,459,37,269],       // RIGHT SQUARE BRACKET
  0x5F: [-127,177,1500,0,1500],      // LOW LINE
  0x7B: [1566,279,717,124,531],      // LEFT CURLY BRACKET
  0x7D: [1566,279,717,186,593],      // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x302: [777,-564,0,-1150,-171],    // COMBINING CIRCUMFLEX ACCENT
  0x303: [760,-608,0,-1152,-173],    // COMBINING TILDE
  0x221A: [2056,404,1124,110,1157],  // SQUARE ROOT
  0x2308: [1566,279,524,190,479],    // LEFT CEILING
  0x2309: [1566,279,526,47,336],     // RIGHT CEILING
  0x230A: [1566,279,524,190,479],    // LEFT FLOOR
  0x230B: [1566,279,526,47,336],     // RIGHT FLOOR
  0x23DE: [143,81,1460,0,1460],      // TOP CURLY BRACKET (mathematical use)
  0x23DF: [797,-573,1460,0,1460],    // BOTTOM CURLY BRACKET (mathematical use)
  0x27E8: [1566,279,622,95,531],     // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [1566,279,622,91,527]      // MATHEMATICAL RIGHT ANGLE BRACKET
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXSizeTwoSym");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SizeTwoSym/Regular/Main.js");
