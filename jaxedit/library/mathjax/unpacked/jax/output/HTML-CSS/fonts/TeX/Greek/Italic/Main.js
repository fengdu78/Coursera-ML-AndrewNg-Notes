/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Greek/Italic/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Greek-italic'] = {
  directory: 'Greek/Italic',
  family: 'MathJax_Greek',
  style: 'italic',
  testString: "\u0393 \u03A5 \u039B",
  skew: {
    0x393: 0.0833,
    0x394: 0.167,
    0x398: 0.0833,
    0x39B: 0.167,
    0x39E: 0.0833,
    0x3A0: 0.0556,
    0x3A3: 0.0833,
    0x3A5: 0.0556,
    0x3A6: 0.0833,
    0x3A8: 0.0556,
    0x3A9: 0.0833,
    0x3B1: 0.0278,
    0x3B2: 0.0833,
    0x3B4: 0.0556,
    0x3B5: 0.0833,
    0x3B6: 0.0833,
    0x3B7: 0.0556,
    0x3B8: 0.0833,
    0x3B9: 0.0556,
    0x3BC: 0.0278,
    0x3BD: 0.0278,
    0x3BE: 0.111,
    0x3BF: 0.0556,
    0x3C1: 0.0833,
    0x3C2: 0.0833,
    0x3C4: 0.0278,
    0x3C5: 0.0278,
    0x3C6: 0.0833,
    0x3C7: 0.0556,
    0x3C8: 0.111,
    0x3D1: 0.0833,
    0x3D5: 0.0833,
    0x3F1: 0.0833,
    0x3F5: 0.0556
  },
  0x20: [0,0,250,0,0],               // SPACE
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x393: [680,-1,615,31,721],        // GREEK CAPITAL LETTER GAMMA
  0x394: [716,0,833,48,788],         // GREEK CAPITAL LETTER DELTA
  0x398: [704,22,763,50,740],        // GREEK CAPITAL LETTER THETA
  0x39B: [716,0,694,35,670],         // GREEK CAPITAL LETTER LAMDA
  0x39E: [678,0,742,53,777],         // GREEK CAPITAL LETTER XI
  0x3A0: [681,0,831,31,887],         // GREEK CAPITAL LETTER PI
  0x3A3: [683,0,780,58,806],         // GREEK CAPITAL LETTER SIGMA
  0x3A5: [705,0,583,28,700],         // GREEK CAPITAL LETTER UPSILON
  0x3A6: [683,0,667,24,642],         // GREEK CAPITAL LETTER PHI
  0x3A8: [683,0,612,21,692],         // GREEK CAPITAL LETTER PSI
  0x3A9: [704,0,772,80,786],         // GREEK CAPITAL LETTER OMEGA
  0x3B1: [442,11,640,34,603],        // GREEK SMALL LETTER ALPHA
  0x3B2: [705,194,566,23,573],       // GREEK SMALL LETTER BETA
  0x3B3: [441,216,518,11,543],       // GREEK SMALL LETTER GAMMA
  0x3B4: [717,10,444,36,451],        // GREEK SMALL LETTER DELTA
  0x3B5: [452,22,466,27,428],        // GREEK SMALL LETTER EPSILON
  0x3B6: [704,204,438,44,471],       // GREEK SMALL LETTER ZETA
  0x3B7: [442,216,497,21,503],       // GREEK SMALL LETTER ETA
  0x3B8: [705,10,469,35,462],        // GREEK SMALL LETTER THETA
  0x3B9: [442,10,354,48,332],        // GREEK SMALL LETTER IOTA
  0x3BA: [442,11,576,49,554],        // GREEK SMALL LETTER KAPPA
  0x3BB: [694,12,583,47,556],        // GREEK SMALL LETTER LAMDA
  0x3BC: [442,216,603,23,580],       // GREEK SMALL LETTER MU
  0x3BD: [442,2,494,45,530],         // GREEK SMALL LETTER NU
  0x3BE: [704,205,438,21,443],       // GREEK SMALL LETTER XI
  0x3BF: [441,11,485,34,476],        // GREEK SMALL LETTER OMICRON
  0x3C0: [431,11,570,19,573],        // GREEK SMALL LETTER PI
  0x3C1: [442,216,517,23,510],       // GREEK SMALL LETTER RHO
  0x3C2: [442,107,363,31,405],       // GREEK SMALL LETTER FINAL SIGMA
  0x3C3: [431,11,571,31,572],        // GREEK SMALL LETTER SIGMA
  0x3C4: [431,13,437,18,517],        // GREEK SMALL LETTER TAU
  0x3C5: [443,10,540,21,523],        // GREEK SMALL LETTER UPSILON
  0x3C6: [442,218,654,50,618],       // GREEK SMALL LETTER PHI
  0x3C7: [442,204,626,25,600],       // GREEK SMALL LETTER CHI
  0x3C8: [694,205,651,21,634],       // GREEK SMALL LETTER PSI
  0x3C9: [443,11,622,15,604],        // GREEK SMALL LETTER OMEGA
  0x3D1: [705,11,591,21,563],        // GREEK THETA SYMBOL
  0x3D5: [694,205,596,43,579],       // GREEK PHI SYMBOL
  0x3D6: [431,10,828,19,823],        // GREEK PI SYMBOL
  0x3F1: [442,194,517,67,510],       // GREEK RHO SYMBOL
  0x3F5: [431,11,406,40,382]         // GREEK LUNATE EPSILON SYMBOL
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Greek-italic"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Greek/Italic/Main.js"]
);
