/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Italic/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXNonUnicode-italic'] = {
  directory: 'NonUnicode/Italic',
  family: 'STIXNonUnicode',
  style: 'italic',
  Ranges: [
    [0x20,0x20,"All"],
    [0xA0,0xA0,"All"],
    [0xE000,0xF8FF,"PrivateUse"]
  ],
  0xE22D: [677,45,852,43,812],       // stix-mathematical calligraphic capital A
  0xE22E: [670,3,724,35,709],        // stix-mathematical calligraphic capital B
  0xE22F: [671,11,569,43,586],       // stix-mathematical calligraphic capital C
  0xE230: [662,0,801,34,788],        // stix-mathematical calligraphic capital D
  0xE231: [670,4,553,40,599],        // stix-mathematical calligraphic capital E
  0xE232: [662,0,652,43,710],        // stix-mathematical calligraphic capital F
  0xE233: [671,131,580,40,580],      // stix-mathematical calligraphic capital G
  0xE234: [664,21,831,41,845],       // stix-mathematical calligraphic capital H
  0xE235: [662,0,575,38,591],        // stix-mathematical calligraphic capital I
  0xE236: [662,120,632,31,785],      // stix-mathematical calligraphic capital J
  0xE237: [670,13,809,30,783],       // stix-mathematical calligraphic capital K
  0xE238: [670,7,693,30,653],        // stix-mathematical calligraphic capital L
  0xE239: [671,45,1166,40,1128],     // stix-mathematical calligraphic capital M
  0xE23A: [795,37,957,40,1064],      // stix-mathematical calligraphic capital N
  0xE23B: [669,10,737,38,729],       // stix-mathematical calligraphic capital O
  0xE23C: [662,0,667,38,709],        // stix-mathematical calligraphic capital P
  0xE23D: [671,131,744,43,704],      // stix-mathematical calligraphic capital Q
  0xE23E: [662,3,854,38,816],        // stix-mathematical calligraphic capital R
  0xE23F: [671,0,634,38,671],        // stix-mathematical calligraphic capital S
  0xE240: [721,0,509,41,730],        // stix-mathematical calligraphic capital T
  0xE241: [672,13,817,37,950],       // stix-mathematical calligraphic capital U
  0xE242: [677,33,638,33,680],       // stix-mathematical calligraphic capital V
  0xE243: [685,32,956,33,998],       // stix-mathematical calligraphic capital W
  0xE244: [672,13,692,38,739],       // stix-mathematical calligraphic capital X
  0xE245: [675,131,719,34,763],      // stix-mathematical calligraphic capital Y
  0xE246: [664,94,752,38,714]        // stix-mathematical calligraphic capital Z
};

MathJax.OutputJax["HTML-CSS"].initFont("STIXNonUnicode-italic");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/NonUnicode/Italic/Main.js");
