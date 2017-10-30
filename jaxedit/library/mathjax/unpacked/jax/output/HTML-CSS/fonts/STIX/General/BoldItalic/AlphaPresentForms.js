/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/AlphaPresentForms.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold-italic'],
  {
    0xFB00: [698,205,613,-169,726],    // LATIN SMALL LIGATURE FF
    0xFB01: [703,205,556,-188,514],    // LATIN SMALL LIGATURE FI
    0xFB02: [704,205,556,-186,553],    // LATIN SMALL LIGATURE FL
    0xFB03: [703,205,856,-169,814],    // LATIN SMALL LIGATURE FFI
    0xFB04: [704,205,854,-169,851]     // LATIN SMALL LIGATURE FFL
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/BoldItalic/AlphaPresentForms.js");
