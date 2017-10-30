/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Bold/AlphaPresentForms.js
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

MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold'],
  {
    0xFB00: [691,0,610,15,666],        // LATIN SMALL LIGATURE FF
    0xFB01: [691,0,556,14,536],        // LATIN SMALL LIGATURE FI
    0xFB02: [691,0,556,15,535],        // LATIN SMALL LIGATURE FL
    0xFB03: [691,0,833,15,813],        // LATIN SMALL LIGATURE FFI
    0xFB04: [691,0,833,15,812]         // LATIN SMALL LIGATURE FFL
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Bold/AlphaPresentForms.js");
