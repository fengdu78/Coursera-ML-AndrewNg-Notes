/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Bold/MiscMathSymbolsA.js
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
    0x27C8: [547,13,1025,62,943],      // REVERSE SOLIDUS PRECEDING SUBSET
    0x27C9: [547,13,1025,62,943],      // SUBSET PRECEDING SOLIDUS
    0x27E8: [732,193,445,69,399],      // MATHEMATICAL LEFT ANGLE BRACKET
    0x27E9: [732,193,445,46,376]       // MATHEMATICAL RIGHT ANGLE BRACKET
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Bold/MiscMathSymbolsA.js");
