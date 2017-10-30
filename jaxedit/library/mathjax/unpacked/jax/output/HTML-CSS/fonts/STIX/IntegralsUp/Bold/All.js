/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsUp/Bold/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsUp-bold'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222B: [824,320,425,59,467],      // INTEGRAL
    0x222C: [824,320,715,59,757],      // DOUBLE INTEGRAL
    0x222D: [824,320,1005,59,1047],    // TRIPLE INTEGRAL
    0x222E: [834,310,394,35,483],      // CONTOUR INTEGRAL
    0x222F: [824,320,650,35,739],      // SURFACE INTEGRAL
    0x2230: [824,320,951,54,1047],     // VOLUME INTEGRAL
    0x2231: [824,320,484,54,553],      // CLOCKWISE INTEGRAL
    0x2232: [824,320,445,35,534],      // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [824,320,456,35,545],      // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0C: [824,320,1295,59,1337],    // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [824,320,511,59,553],      // FINITE PART INTEGRAL
    0x2A0E: [824,320,511,59,553],      // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [824,320,592,59,634],      // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [824,320,385,35,474],      // CIRCULATION FUNCTION
    0x2A11: [824,320,484,54,553],      // ANTICLOCKWISE INTEGRATION
    0x2A12: [824,320,417,35,486],      // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [824,320,424,54,493],      // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [824,320,535,54,604],      // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [824,320,416,35,505],      // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [824,320,459,35,528],      // QUATERNION INTEGRAL OPERATOR
    0x2A17: [824,320,824,45,884],      // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [824,320,527,45,587],      // INTEGRAL WITH TIMES SIGN
    0x2A19: [824,320,567,45,632],      // INTEGRAL WITH INTERSECTION
    0x2A1A: [824,320,567,45,632],      // INTEGRAL WITH UNION
    0x2A1B: [959,320,479,45,521],      // INTEGRAL WITH OVERBAR
    0x2A1C: [824,455,411,35,511]       // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsUp/Bold/All.js");
