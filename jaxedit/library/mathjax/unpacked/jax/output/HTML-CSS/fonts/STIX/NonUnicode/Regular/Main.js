/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXNonUnicode'] = {
  directory: 'NonUnicode/Regular',
  family: 'STIXNonUnicode',
  Ranges: [
    [0x20,0x20,"All"],
    [0xA0,0xA0,"All"],
    [0xE000,0xF8FF,"PrivateUse"]
  ],
  0xE000: [610,25,1184,829,895],     // stix-radical symbol vertical extender
  0xE001: [667,-41,1184,829,1211],   // stix-radical symbol top corner piece
  0xE138: [634,-584,480,-10,490],    // stix-horizontal extender for multiple character over accent arrows, harpoons, line
  0xE139: [-127,177,480,-10,490],    // stix-horizontal extender for multiple character under accent arrows, harpoons, line
  0xE13B: [955,-512,897,-25,908],    // stix-left end of extensible overbrace (CMEX10 x3A rotated 90deg)
  0xE13C: [955,-512,897,-11,922],    // stix-right end of extensible overbrace (CMEX10 x38 rotated 90deg)
  0xE13D: [182,261,897,-25,908],     // stix-left end of extensible underbrace (CMEX10 x3B rotated 90deg)
  0xE13E: [182,261,897,-11,922],     // stix-right end of extensible underbrace (CMEX10 x39 rotated 90deg)
  0xE140: [1218,-820,1844,-10,1854], // stix-center of extensible overbrace (CMEX10 x3C rotated 90deg)
  0xE141: [-126,524,1844,-10,1854],  // stix-center of extensible underbrace (CMEX10 x3D rotated 90deg)
  0xE14A: [955,-820,633,-1,634],     // stix-extensible horizontal for over paren or square bracket (CMEX10 x42 rotated 90deg)
  0xE14B: [-126,261,633,-1,634],     // stix-extensible horizontal for under paren or square bracket (CMEX10 x43 rotated 90deg)
  0xE261: [422,10,523,41,481],       // stix-old style digit 0
  0xE265: [421,0,523,127,405],       // stix-old style digit 1
  0xE269: [421,0,523,68,455],        // stix-old style digit 2
  0xE26D: [424,198,523,47,463],      // stix-old style digit 3
  0xE271: [420,198,523,58,480],      // stix-old style digit 4
  0xE275: [421,198,523,66,457],      // stix-old style digit 5
  0xE279: [612,8,523,37,486],        // stix-old style digit 6
  0xE27D: [421,198,523,25,490],      // stix-old style digit 7
  0xE281: [606,12,523,47,477],       // stix-old style digit 8
  0xE285: [421,200,523,41,483],      // stix-old style digit 9
  0xE28F: [135,0,325,-1,326],        // stix-short horizontal extender at baseline
  0xE290: [135,0,633,-1,634]         // stix-long horizontal extender at baseline
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXNonUnicode");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/NonUnicode/Regular/Main.js");
