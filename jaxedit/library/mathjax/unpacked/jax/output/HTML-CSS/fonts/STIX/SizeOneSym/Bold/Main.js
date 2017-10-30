/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/SizeOneSym/Bold/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXSizeOneSym-bold'] = {
  directory: 'SizeOneSym/Bold',
  family: 'STIXSizeOneSym',
  weight: 'bold',
  Ranges: [
    [0x2140,0x2140,"All"]
  ],
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [1104,126,468,158,439],      // LEFT PARENTHESIS
  0x29: [1104,126,468,29,310],       // RIGHT PARENTHESIS
  0x2F: [1104,126,579,14,564],       // SOLIDUS
  0x5B: [1104,126,408,186,407],      // LEFT SQUARE BRACKET
  0x5C: [1104,126,579,14,564],       // REVERSE SOLIDUS
  0x5D: [1104,126,408,1,222],        // RIGHT SQUARE BRACKET
  0x7B: [1104,126,595,115,503],      // LEFT CURLY BRACKET
  0x7D: [1104,126,595,92,480],       // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x220F: [1500,-49,1355,35,1321],   // N-ARY PRODUCT
  0x2210: [1500,-49,1355,34,1320],   // N-ARY COPRODUCT
  0x2211: [1500,-49,1292,60,1215],   // N-ARY SUMMATION
  0x221A: [1588,241,1061,109,1119],  // SQUARE ROOT
  0x2308: [1104,126,476,186,470],    // LEFT CEILING
  0x2309: [1104,126,476,6,292],      // RIGHT CEILING
  0x230A: [1104,126,476,184,470],    // LEFT FLOOR
  0x230B: [1104,126,476,6,290],      // RIGHT FLOOR
  0x27E8: [1104,126,579,99,481],     // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [1104,126,579,98,480]      // MATHEMATICAL RIGHT ANGLE BRACKET
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXSizeOneSym-bold");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/SizeOneSym/Bold/Main.js");
