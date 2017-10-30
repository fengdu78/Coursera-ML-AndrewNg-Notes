/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsD/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsD'] = {
  directory: 'IntegralsD/Regular',
  family: 'STIXIntegralsD',
  Ranges: [
    [0x20,0x20,"All"],
    [0xA0,0xA0,"All"],
    [0x222B,0x2233,"All"],
    [0x2A0B,0x2A1C,"All"]
  ],
  0x222B: [2000,269,585,56,1035],    // INTEGRAL
  0x222E: [2000,269,635,56,1035]     // CONTOUR INTEGRAL
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXIntegralsD");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsD/Regular/Main.js");
