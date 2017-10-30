/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Fraktur/Bold/PUA.js
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

MathJax.Hub.Insert(
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Fraktur-bold'],
  {
    0xE301: [630,27,587,64,512],       // stix-MATHEMATICAL BOLD CAPITAL GAMMA SLASHED
    0xE302: [693,212,394,37,408],      // stix-capital Delta, Greek slashed
    0xE303: [681,219,387,36,384],      // stix-MATHEMATICAL BOLD CAPITAL DELTA SLASHED
    0xE304: [473,212,593,67,531],      // stix-capital Epsilon, Greek slashed
    0xE305: [684,27,393,33,387],       // stix-MATHEMATICAL BOLD CAPITAL EPSILON SLASHED
    0xE308: [679,220,981,32,875],      // stix-capital Eta, Greek slashed
    0xE309: [717,137,727,17,633]       // stix-MATHEMATICAL BOLD CAPITAL ETA SLASHED
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Fraktur/Bold/PUA.js");
