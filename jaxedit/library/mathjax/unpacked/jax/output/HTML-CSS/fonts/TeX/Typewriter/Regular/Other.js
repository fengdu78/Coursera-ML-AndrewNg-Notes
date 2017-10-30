/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Typewriter/Regular/Other.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Typewriter'],
  {
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x131: [431,-1,525,72,462],        // LATIN SMALL LETTER DOTLESS I
    0x237: [431,228,525,48,376],       // LATIN SMALL LETTER DOTLESS J
    0x393: [611,0,525,25,488],         // GREEK CAPITAL LETTER GAMMA
    0x394: [623,0,525,35,489],         // GREEK CAPITAL LETTER DELTA
    0x398: [621,10,525,56,468],        // GREEK CAPITAL LETTER THETA
    0x39B: [623,-1,525,30,495],        // GREEK CAPITAL LETTER LAMDA
    0x39E: [611,-1,525,33,491],        // GREEK CAPITAL LETTER XI
    0x3A0: [611,-1,525,16,508],        // GREEK CAPITAL LETTER PI
    0x3A3: [611,-1,525,40,484],        // GREEK CAPITAL LETTER SIGMA
    0x3A5: [622,-1,525,38,486],        // GREEK CAPITAL LETTER UPSILON
    0x3A6: [611,-1,525,41,483],        // GREEK CAPITAL LETTER PHI
    0x3A8: [611,-1,525,37,487],        // GREEK CAPITAL LETTER PSI
    0x3A9: [622,-1,525,32,492],        // GREEK CAPITAL LETTER OMEGA
    0x7E2: [611,-287,525,175,349],     // ??
    0x7E3: [681,-357,525,176,350],     // ??
    0x2032: [623,-334,525,211,313]     // PRIME
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Typewriter/Regular/Other.js");
