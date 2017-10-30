/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/LatinExtendedAdditional.js
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
    0x1E80: [904,18,889,64,940],       // LATIN CAPITAL LETTER W WITH GRAVE
    0x1E81: [697,13,667,15,614],       // LATIN SMALL LETTER W WITH GRAVE
    0x1E82: [904,18,889,64,940],       // LATIN CAPITAL LETTER W WITH ACUTE
    0x1E83: [697,13,667,15,614],       // LATIN SMALL LETTER W WITH ACUTE
    0x1E84: [862,18,889,64,940],       // LATIN CAPITAL LETTER W WITH DIAERESIS
    0x1E85: [655,13,667,15,614],       // LATIN SMALL LETTER W WITH DIAERESIS
    0x1EF2: [904,0,611,71,659],        // LATIN CAPITAL LETTER Y WITH GRAVE
    0x1EF3: [697,205,444,-94,392]      // LATIN SMALL LETTER Y WITH GRAVE
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/BoldItalic/LatinExtendedAdditional.js");
