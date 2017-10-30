/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/CurrencySymbols.js
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
    0x20A3: [669,0,668,-13,661],       // FRENCH FRANC SIGN
    0x20A4: [683,12,500,-32,510],      // LIRA SIGN
    0x20A7: [669,13,1229,-28,1173],    // PESETA SIGN
    0x20AC: [681,17,562,34,546]        // EURO SIGN
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/BoldItalic/CurrencySymbols.js");
