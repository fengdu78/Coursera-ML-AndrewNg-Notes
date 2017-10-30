/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Size2/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Size2'] = {
  directory: 'Size2/Regular',
  family: 'MathJax_Size2',
  testString: "() [] {}",
  0x20: [0,0,250,0,0],               // SPACE
  0x28: [1150,649,597,180,561],      // LEFT PARENTHESIS
  0x29: [1150,649,597,35,416],       // RIGHT PARENTHESIS
  0x2F: [1150,649,811,56,754],       // SOLIDUS
  0x5B: [1150,649,472,224,455],      // LEFT SQUARE BRACKET
  0x5C: [1150,649,811,54,754],       // REVERSE SOLIDUS
  0x5D: [1150,649,472,16,247],       // RIGHT SQUARE BRACKET
  0x7B: [1150,649,667,119,547],      // LEFT CURLY BRACKET
  0x7D: [1150,649,667,119,547],      // RIGHT CURLY BRACKET
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x2C6: [772,-565,1000,-5,1004],    // MODIFIER LETTER CIRCUMFLEX ACCENT
  0x2DC: [750,-611,1000,0,999],      // SMALL TILDE
  0x302: [772,-565,0,-1005,4],       // COMBINING CIRCUMFLEX ACCENT
  0x303: [750,-611,0,-1000,-1],      // COMBINING TILDE
  0x220F: [950,450,1278,56,1221],    // N-ARY PRODUCT
  0x2210: [950,450,1278,56,1221],    // N-ARY COPRODUCT
  0x2211: [950,450,1444,55,1388],    // N-ARY SUMMATION
  0x221A: [1150,650,1000,111,1020],  // SQUARE ROOT
  0x222B: [1360,862,556,55,944],     // INTEGRAL
  0x222C: [1360,862,1084,55,1472],   // DOUBLE INTEGRAL
  0x222D: [1360,862,1592,55,1980],   // TRIPLE INTEGRAL
  0x222E: [1360,862,556,55,944],     // CONTOUR INTEGRAL
  0x22C0: [950,450,1111,55,1055],    // N-ARY LOGICAL AND
  0x22C1: [950,450,1111,55,1055],    // N-ARY LOGICAL OR
  0x22C2: [949,450,1111,55,1055],    // N-ARY INTERSECTION
  0x22C3: [950,449,1111,55,1055],    // N-ARY UNION
  0x2308: [1150,649,528,224,511],    // LEFT CEILING
  0x2309: [1150,649,528,16,303],     // RIGHT CEILING
  0x230A: [1150,649,528,224,511],    // LEFT FLOOR
  0x230B: [1150,649,528,16,303],     // RIGHT FLOOR
  0x27E8: [1150,649,611,112,524],    // MATHEMATICAL LEFT ANGLE BRACKET
  0x27E9: [1150,649,611,85,498],     // MATHEMATICAL RIGHT ANGLE BRACKET
  0x2A00: [949,449,1511,56,1454],    // N-ARY CIRCLED DOT OPERATOR
  0x2A01: [949,449,1511,56,1454],    // N-ARY CIRCLED PLUS OPERATOR
  0x2A02: [949,449,1511,56,1454],    // N-ARY CIRCLED TIMES OPERATOR
  0x2A04: [950,449,1111,55,1055],    // N-ARY UNION OPERATOR WITH PLUS
  0x2A06: [950,450,1111,55,1055]     // N-ARY SQUARE UNION OPERATOR
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Size2"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Size2/Regular/Main.js"]
);
