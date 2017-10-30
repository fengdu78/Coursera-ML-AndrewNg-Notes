/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsUpD/Bold/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsUpD-bold'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222B: [2000,269,515,58,560],     // INTEGRAL
    0x222C: [2000,269,875,58,920],     // DOUBLE INTEGRAL
    0x222D: [2000,269,1239,59,1281],   // TRIPLE INTEGRAL
    0x222E: [2000,269,626,56,695],     // CONTOUR INTEGRAL
    0x222F: [2000,269,1039,39,1039],   // SURFACE INTEGRAL
    0x2230: [2000,269,1384,36,1395],   // VOLUME INTEGRAL
    0x2231: [2000,269,632,47,760],     // CLOCKWISE INTEGRAL
    0x2232: [2000,269,639,56,769],     // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [2000,269,598,56,778],     // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0C: [2000,269,1595,58,1640],   // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [2000,269,552,-35,590],    // FINITE PART INTEGRAL
    0x2A0E: [2000,269,642,35,680],     // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [2000,269,675,25,752],     // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [2000,269,640,56,646],     // CIRCULATION FUNCTION
    0x2A11: [2000,269,632,47,760],     // ANTICLOCKWISE INTEGRATION
    0x2A12: [2000,269,625,58,654],     // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [2000,269,557,58,626],     // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [2000,269,708,58,789],     // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [2000,269,626,56,695],     // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [2000,269,718,56,747],     // QUATERNION INTEGRAL OPERATOR
    0x2A17: [2000,269,963,24,1057],    // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [2000,269,681,62,692],     // INTEGRAL WITH TIMES SIGN
    0x2A19: [2000,269,832,65,898],     // INTEGRAL WITH INTERSECTION
    0x2A1A: [2000,269,832,65,898],     // INTEGRAL WITH UNION
    0x2A1B: [2182,269,733,0,773],      // INTEGRAL WITH OVERBAR
    0x2A1C: [2000,451,525,58,831]      // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsUpD/Bold/All.js");
