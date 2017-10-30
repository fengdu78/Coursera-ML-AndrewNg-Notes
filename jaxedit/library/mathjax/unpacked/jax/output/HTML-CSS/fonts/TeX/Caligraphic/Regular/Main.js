/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Caligraphic/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Caligraphic'] = {
  directory: 'Caligraphic/Regular',
  family: 'MathJax_Caligraphic',
  testString: "MATHJAX CALIGRAPHIC",
  skew: {
    0x41: 0.194,
    0x42: 0.139,
    0x43: 0.139,
    0x44: 0.0833,
    0x45: 0.111,
    0x46: 0.111,
    0x47: 0.111,
    0x48: 0.111,
    0x49: 0.0278,
    0x4A: 0.167,
    0x4B: 0.0556,
    0x4C: 0.139,
    0x4D: 0.139,
    0x4E: 0.0833,
    0x4F: 0.111,
    0x50: 0.0833,
    0x51: 0.111,
    0x52: 0.0833,
    0x53: 0.139,
    0x54: 0.0278,
    0x55: 0.0833,
    0x56: 0.0278,
    0x57: 0.0833,
    0x58: 0.139,
    0x59: 0.0833,
    0x5A: 0.139
  },
  0x20: [0,0,250,0,0],               // SPACE
  0x30: [452,22,500,39,460],         // DIGIT ZERO
  0x31: [453,0,500,86,426],          // DIGIT ONE
  0x32: [453,0,500,44,449],          // DIGIT TWO
  0x33: [452,216,500,42,456],        // DIGIT THREE
  0x34: [464,194,500,28,471],        // DIGIT FOUR
  0x35: [453,216,500,50,448],        // DIGIT FIVE
  0x36: [665,22,500,42,456],         // DIGIT SIX
  0x37: [463,216,500,55,485],        // DIGIT SEVEN
  0x38: [666,21,500,43,456],         // DIGIT EIGHT
  0x39: [453,216,500,42,457],        // DIGIT NINE
  0x41: [728,50,798,30,819],         // LATIN CAPITAL LETTER A
  0x42: [705,22,657,32,664],         // LATIN CAPITAL LETTER B
  0x43: [705,25,527,12,533],         // LATIN CAPITAL LETTER C
  0x44: [683,0,771,19,766],          // LATIN CAPITAL LETTER D
  0x45: [705,22,528,30,564],         // LATIN CAPITAL LETTER E
  0x46: [683,32,719,18,829],         // LATIN CAPITAL LETTER F
  0x47: [704,119,595,44,599],        // LATIN CAPITAL LETTER G
  0x48: [683,48,845,18,803],         // LATIN CAPITAL LETTER H
  0x49: [683,0,545,-30,642],         // LATIN CAPITAL LETTER I
  0x4A: [683,119,678,47,839],        // LATIN CAPITAL LETTER J
  0x4B: [705,22,762,32,732],         // LATIN CAPITAL LETTER K
  0x4C: [705,22,690,32,656],         // LATIN CAPITAL LETTER L
  0x4D: [705,50,1201,28,1137],       // LATIN CAPITAL LETTER M
  0x4E: [789,50,820,-27,979],        // LATIN CAPITAL LETTER N
  0x4F: [705,22,796,58,777],         // LATIN CAPITAL LETTER O
  0x50: [683,57,696,19,733],         // LATIN CAPITAL LETTER P
  0x51: [705,131,817,114,787],       // LATIN CAPITAL LETTER Q
  0x52: [682,22,848,19,837],         // LATIN CAPITAL LETTER R
  0x53: [705,22,606,18,642],         // LATIN CAPITAL LETTER S
  0x54: [717,68,545,34,833],         // LATIN CAPITAL LETTER T
  0x55: [683,28,626,-17,687],        // LATIN CAPITAL LETTER U
  0x56: [683,52,613,25,658],         // LATIN CAPITAL LETTER V
  0x57: [683,53,988,25,1034],        // LATIN CAPITAL LETTER W
  0x58: [683,0,713,52,807],          // LATIN CAPITAL LETTER X
  0x59: [683,143,668,31,714],        // LATIN CAPITAL LETTER Y
  0x5A: [683,0,725,37,767],          // LATIN CAPITAL LETTER Z
  0xA0: [0,0,250,0,0]                // NO-BREAK SPACE
};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Caligraphic"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Caligraphic/Regular/Main.js"]
);
