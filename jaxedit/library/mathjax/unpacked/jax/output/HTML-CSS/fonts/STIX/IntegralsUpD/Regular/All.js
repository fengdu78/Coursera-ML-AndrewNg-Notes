/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsUpD/Regular/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsUpD'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222C: [2000,269,787,58,832],     // DOUBLE INTEGRAL
    0x222D: [2000,269,1107,58,1152],   // TRIPLE INTEGRAL
    0x222F: [2000,269,849,39,849],     // SURFACE INTEGRAL
    0x2230: [2000,269,1161,36,1172],   // VOLUME INTEGRAL
    0x2231: [2000,269,608,47,736],     // CLOCKWISE INTEGRAL
    0x2232: [2000,269,616,56,746],     // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [2000,269,605,56,785],     // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0B: [2000,269,914,58,856],     // SUMMATION WITH INTEGRAL
    0x2A0C: [2000,269,1397,58,1442],   // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [2000,269,609,35,647],     // FINITE PART INTEGRAL
    0x2A0E: [1999,270,609,35,647],     // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [1999,270,658,25,734],     // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [2000,269,629,56,635],     // CIRCULATION FUNCTION
    0x2A11: [2000,269,608,47,736],     // ANTICLOCKWISE INTEGRATION
    0x2A12: [2000,269,568,58,597],     // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [2000,269,530,58,599],     // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [2000,269,695,58,776],     // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [2000,269,615,56,684],     // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [2000,269,653,56,682],     // QUATERNION INTEGRAL OPERATOR
    0x2A17: [2000,269,945,24,1039],    // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [2000,269,597,62,608],     // INTEGRAL WITH TIMES SIGN
    0x2A19: [2000,269,735,65,801],     // INTEGRAL WITH INTERSECTION
    0x2A1A: [2000,269,735,65,801],     // INTEGRAL WITH UNION
    0x2A1B: [2157,269,701,0,741],      // INTEGRAL WITH OVERBAR
    0x2A1C: [2000,426,467,58,799]      // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsUpD/Regular/All.js");
