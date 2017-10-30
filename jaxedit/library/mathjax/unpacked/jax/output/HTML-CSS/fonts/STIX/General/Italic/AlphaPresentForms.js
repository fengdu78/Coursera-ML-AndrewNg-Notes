/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Italic/AlphaPresentForms.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-italic'],
  {
    0xFB00: [678,207,527,-147,673],    // LATIN SMALL LIGATURE FF
    0xFB01: [681,207,500,-141,481],    // LATIN SMALL LIGATURE FI
    0xFB02: [682,204,500,-141,518],    // LATIN SMALL LIGATURE FL
    0xFB03: [681,207,744,-147,725],    // LATIN SMALL LIGATURE FFI
    0xFB04: [682,207,745,-147,763]     // LATIN SMALL LIGATURE FFL
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Italic/AlphaPresentForms.js");
