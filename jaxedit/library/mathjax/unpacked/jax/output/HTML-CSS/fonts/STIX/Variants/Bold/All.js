/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/Variants/Bold/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXVariants-bold'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0x7C: [691,189,340,126,214],       // VERTICAL LINE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x19B: [666,0,536,60,526],         // LATIN SMALL LETTER LAMBDA WITH STROKE
    0x2033: [586,-12,713,44,669],      // DOUBLE PRIME
    0x2034: [586,-12,1032,44,988],     // TRIPLE PRIME
    0x2035: [586,-12,394,44,350],      // REVERSED PRIME
    0x2036: [586,-12,713,44,669],      // REVERSED DOUBLE PRIME
    0x2037: [586,-12,1032,44,988],     // REVERSED TRIPLE PRIME
    0x2057: [586,-12,1351,43,1306],    // QUADRUPLE PRIME
    0x2140: [691,0,780,55,725],        // DOUBLE-STRUCK N-ARY SUMMATION
    0x2190: [451,-55,428,68,428],      // LEFTWARDS ARROW
    0x2191: [680,15,556,80,476],       // UPWARDS ARROW
    0x2192: [451,-55,428,0,360],       // RIGHTWARDS ARROW
    0x2193: [680,15,556,80,476],       // DOWNWARDS ARROW
    0x21D1: [600,15,714,40,674],       // UPWARDS DOUBLE ARROW
    0x21D3: [600,15,714,40,674],       // DOWNWARDS DOUBLE ARROW
    0x220F: [676,0,734,27,707],        // N-ARY PRODUCT
    0x2210: [676,0,734,27,707],        // N-ARY COPRODUCT
    0x2211: [676,0,690,39,649],        // N-ARY SUMMATION
    0x221D: [431,0,750,56,687],        // PROPORTIONAL TO
    0x2223: [451,19,290,89,201],       // DIVIDES
    0x2244: [543,45,750,68,683],       // stix-not (vert) similar or equal
    0x2247: [648,144,750,68,683],      // stix-not (vert) similar over two-line equals
    0x2249: [598,64,750,68,683],       // stix-not, vert, approximate
    0x2260: [687,183,750,68,682],      // stix-not (vert) equals
    0x2262: [747,243,750,68,682],      // stix-not (vert) three-line equals
    0x2268: [728,293,750,80,670],      // stix-less, vert, not double equals
    0x2269: [728,293,750,80,670],      // stix-gt, vert, not double equals
    0x226E: [672,166,750,80,670],      // stix-not, vert, less-than
    0x226F: [672,166,750,80,670],      // stix-not, vert, greater-than
    0x2270: [742,236,750,80,670],      // stix-not, vert, less-than-or-equal
    0x2271: [742,236,750,80,670]       // stix-not, vert, greater-than-or-equal
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Variants/Bold/All.js");
