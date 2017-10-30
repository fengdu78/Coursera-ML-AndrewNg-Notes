/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Greek/BoldItalic/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Greek-bold-italic'] = {
  directory: 'Greek/BoldItalic',
  family: 'MathJax_Greek',
  weight: 'bold',
  style: 'italic',
  testString: "\u0393 \u03A5 \u039B",
  skew: {
    0x393: 0.0958,
    0x394: 0.192,
    0x398: 0.0958,
    0x39B: 0.192,
    0x39E: 0.0958,
    0x3A0: 0.0639,
    0x3A3: 0.0958,
    0x3A5: 0.0639,
    0x3A6: 0.0958,
    0x3A8: 0.0639,
    0x3A9: 0.0958,
    0x3B1: 0.0319,
    0x3B2: 0.0958,
    0x3B4: 0.0639,
    0x3B5: 0.0958,
    0x3B6: 0.0958,
    0x3B7: 0.0639,
    0x3B8: 0.0958,
    0x3B9: 0.0639,
    0x3BC: 0.0319,
    0x3BD: 0.0319,
    0x3BE: 0.128,
    0x3BF: 0.0639,
    0x3C1: 0.0958,
    0x3C2: 0.0958,
    0x3C4: 0.0319,
    0x3C5: 0.0319,
    0x3C6: 0.0958,
    0x3C7: 0.0639,
    0x3C8: 0.128,
    0x3D1: 0.0958,
    0x3D5: 0.0958,
    0x3F1: 0.0958,
    0x3F5: 0.0639
  },
  0x20: [0,0,250,0,0],               // SPACE
  0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
  0x393: [680,0,657,43,777],         // GREEK CAPITAL LETTER GAMMA
  0x394: [711,0,958,59,904],         // GREEK CAPITAL LETTER DELTA
  0x398: [702,17,867,54,844],        // GREEK CAPITAL LETTER THETA
  0x39B: [711,0,806,44,776],         // GREEK CAPITAL LETTER LAMDA
  0x39E: [675,0,841,62,867],         // GREEK CAPITAL LETTER XI
  0x3A0: [680,0,982,43,1026],        // GREEK CAPITAL LETTER PI
  0x3A3: [686,0,885,69,902],         // GREEK CAPITAL LETTER SIGMA
  0x3A5: [703,0,671,32,802],         // GREEK CAPITAL LETTER UPSILON
  0x3A6: [686,0,767,29,737],         // GREEK CAPITAL LETTER PHI
  0x3A8: [686,0,714,22,790],         // GREEK CAPITAL LETTER PSI
  0x3A9: [703,0,879,93,886],         // GREEK CAPITAL LETTER OMEGA
  0x3B1: [452,8,761,39,712],         // GREEK SMALL LETTER ALPHA
  0x3B2: [701,194,660,28,637],       // GREEK SMALL LETTER BETA
  0x3B3: [451,211,590,5,617],        // GREEK SMALL LETTER GAMMA
  0x3B4: [725,8,522,39,513],         // GREEK SMALL LETTER DELTA
  0x3B5: [461,17,529,36,481],        // GREEK SMALL LETTER EPSILON
  0x3B6: [711,202,508,48,521],       // GREEK SMALL LETTER ZETA
  0x3B7: [452,211,600,24,600],       // GREEK SMALL LETTER ETA
  0x3B8: [702,8,562,40,554],         // GREEK SMALL LETTER THETA
  0x3B9: [452,8,412,38,386],         // GREEK SMALL LETTER IOTA
  0x3BA: [452,8,668,45,642],         // GREEK SMALL LETTER KAPPA
  0x3BB: [694,13,671,40,652],        // GREEK SMALL LETTER LAMDA
  0x3BC: [452,211,708,33,682],       // GREEK SMALL LETTER MU
  0x3BD: [452,2,577,38,608],         // GREEK SMALL LETTER NU
  0x3BE: [711,201,508,23,490],       // GREEK SMALL LETTER XI
  0x3BF: [452,8,585,39,576],         // GREEK SMALL LETTER OMICRON
  0x3C0: [444,8,682,23,674],         // GREEK SMALL LETTER PI
  0x3C1: [451,211,612,34,603],       // GREEK SMALL LETTER RHO
  0x3C2: [451,105,424,33,457],       // GREEK SMALL LETTER FINAL SIGMA
  0x3C3: [444,8,686,35,677],         // GREEK SMALL LETTER SIGMA
  0x3C4: [444,13,521,23,610],        // GREEK SMALL LETTER TAU
  0x3C5: [453,8,631,24,604],         // GREEK SMALL LETTER UPSILON
  0x3C6: [452,216,747,53,703],       // GREEK SMALL LETTER PHI
  0x3C7: [452,201,718,32,685],       // GREEK SMALL LETTER CHI
  0x3C8: [694,202,758,24,732],       // GREEK SMALL LETTER PSI
  0x3C9: [453,8,718,24,691],         // GREEK SMALL LETTER OMEGA
  0x3D1: [701,8,692,24,656],         // GREEK THETA SYMBOL
  0x3D5: [694,202,712,51,693],       // GREEK PHI SYMBOL
  0x3D6: [444,8,975,23,961],         // GREEK PI SYMBOL
  0x3F1: [451,194,612,75,603],       // GREEK RHO SYMBOL
  0x3F5: [444,7,483,44,450]          // GREEK LUNATE EPSILON SYMBOL
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Greek-bold-italic"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Greek/BoldItalic/Main.js"]
);
