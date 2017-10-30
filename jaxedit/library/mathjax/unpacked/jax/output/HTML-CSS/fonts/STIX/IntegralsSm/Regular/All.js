/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsSm/Regular/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsSm'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222C: [690,189,726,41,782],      // DOUBLE INTEGRAL
    0x222D: [690,189,956,41,1012],     // TRIPLE INTEGRAL
    0x222F: [690,189,790,41,782],      // SURFACE INTEGRAL
    0x2230: [690,189,1020,41,1012],    // VOLUME INTEGRAL
    0x2231: [690,189,560,41,552],      // CLOCKWISE INTEGRAL
    0x2232: [690,189,560,41,552],      // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [690,189,560,41,552],      // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0B: [694,190,593,41,552],      // SUMMATION WITH INTEGRAL
    0x2A0C: [695,189,1152,41,1242],    // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [694,190,512,41,552],      // FINITE PART INTEGRAL
    0x2A0E: [693,190,512,41,552],      // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [694,190,560,41,552],      // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [694,190,496,41,552],      // CIRCULATION FUNCTION
    0x2A11: [695,189,560,41,552],      // ANTICLOCKWISE INTEGRATION
    0x2A12: [694,191,513,41,552],      // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [694,190,512,41,552],      // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [694,190,635,41,597],      // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [694,190,512,43,552],      // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [695,189,512,41,552],      // QUATERNION INTEGRAL OPERATOR
    0x2A17: [694,190,613,13,586],      // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [695,189,512,41,552],      // INTEGRAL WITH TIMES SIGN
    0x2A19: [694,190,512,40,551],      // INTEGRAL WITH INTERSECTION
    0x2A1A: [694,190,512,40,551],      // INTEGRAL WITH UNION
    0x2A1B: [784,190,462,41,552],      // INTEGRAL WITH OVERBAR
    0x2A1C: [694,284,496,41,552]       // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsSm/Regular/All.js");
