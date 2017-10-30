/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Bold/LatinExtendedAdditional.js
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
    0x1E80: [923,15,1000,19,981],      // LATIN CAPITAL LETTER W WITH GRAVE
    0x1E81: [713,14,722,23,707],       // LATIN SMALL LETTER W WITH GRAVE
    0x1E82: [923,15,1000,19,981],      // LATIN CAPITAL LETTER W WITH ACUTE
    0x1E83: [713,14,722,23,707],       // LATIN SMALL LETTER W WITH ACUTE
    0x1E84: [876,15,1000,19,981],      // LATIN CAPITAL LETTER W WITH DIAERESIS
    0x1E85: [666,14,722,23,707],       // LATIN SMALL LETTER W WITH DIAERESIS
    0x1EF2: [923,0,722,15,699],        // LATIN CAPITAL LETTER Y WITH GRAVE
    0x1EF3: [713,205,500,16,482]       // LATIN SMALL LETTER Y WITH GRAVE
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Bold/LatinExtendedAdditional.js");
