/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/Variants/Bold/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXVariants-bold'] = {
  directory: 'Variants/Bold',
  family: 'STIXVariants',
  weight: 'bold',
  Ranges: [
    [0x20,0x20,"All"],
    [0x77,0x7C,"All"],
    [0xA0,0xA0,"All"],
    [0x19B,0x19B,"All"],
    [0x2032,0x2057,"All"],
    [0x2140,0x2140,"All"],
    [0x2190,0x2193,"All"],
    [0x21D1,0x21E2,"All"],
    [0x2205,0x22ED,"All"]
  ],
  0x2032: [586,-12,394,44,350],      // PRIME
  0x2205: [729,74,584,36,548],       // EMPTY SET
  0x2216: [732,193,518,45,473],      // SET MINUS
  0x221A: [943,-28,800,112,844]      // SQUARE ROOT
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXVariants-bold");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Variants/Bold/Main.js");
