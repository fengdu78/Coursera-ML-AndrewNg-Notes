/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsSm/Bold/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsSm-bold'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222B: [732,193,562,41,618],      // INTEGRAL
    0x222C: [732,193,870,41,926],      // DOUBLE INTEGRAL
    0x222D: [732,193,1179,41,1235],    // TRIPLE INTEGRAL
    0x222E: [732,193,626,41,618],      // CONTOUR INTEGRAL
    0x222F: [732,193,934,41,926],      // SURFACE INTEGRAL
    0x2230: [732,193,1243,41,1235],    // VOLUME INTEGRAL
    0x2231: [732,193,626,41,618],      // CLOCKWISE INTEGRAL
    0x2232: [732,193,626,41,618],      // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [732,193,626,41,618],      // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0C: [732,193,1488,41,1544],    // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [732,193,578,41,618],      // FINITE PART INTEGRAL
    0x2A0E: [732,193,578,41,618],      // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [732,193,626,41,618],      // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [732,193,562,41,618],      // CIRCULATION FUNCTION
    0x2A11: [732,193,626,41,618],      // ANTICLOCKWISE INTEGRATION
    0x2A12: [732,193,579,41,618],      // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [732,193,581,41,618],      // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [732,193,688,41,652],      // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [732,193,626,41,618],      // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [732,193,579,41,618],      // QUATERNION INTEGRAL OPERATOR
    0x2A17: [732,193,646,8,646],       // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [732,193,578,41,618],      // INTEGRAL WITH TIMES SIGN
    0x2A19: [732,193,559,41,618],      // INTEGRAL WITH INTERSECTION
    0x2A1A: [732,193,559,41,618],      // INTEGRAL WITH UNION
    0x2A1B: [802,193,555,41,611],      // INTEGRAL WITH OVERBAR
    0x2A1C: [732,268,556,41,612]       // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsSm/Bold/All.js");
