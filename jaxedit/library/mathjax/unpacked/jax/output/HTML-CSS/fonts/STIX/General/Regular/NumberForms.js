/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Regular/NumberForms.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral'],
  {
    0x2153: [676,14,750,36,725],       // VULGAR FRACTION ONE THIRD
    0x2154: [676,14,750,14,731],       // VULGAR FRACTION TWO THIRDS
    0x2155: [676,14,750,37,715],       // VULGAR FRACTION ONE FIFTH
    0x2156: [676,14,750,14,720],       // VULGAR FRACTION TWO FIFTHS
    0x2157: [676,14,750,13,720],       // VULGAR FRACTION THREE FIFTHS
    0x2158: [676,14,750,14,720],       // VULGAR FRACTION FOUR FIFTHS
    0x2159: [676,14,750,37,717],       // VULGAR FRACTION ONE SIXTH
    0x215A: [676,15,750,29,722],       // VULGAR FRACTION FIVE SIXTHS
    0x215B: [676,14,750,37,722],       // VULGAR FRACTION ONE EIGHTH
    0x215C: [676,14,750,13,727],       // VULGAR FRACTION THREE EIGHTHS
    0x215D: [676,14,750,29,727],       // VULGAR FRACTION FIVE EIGHTHS
    0x215E: [676,14,750,28,727]        // VULGAR FRACTION SEVEN EIGHTHS
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Regular/NumberForms.js");
