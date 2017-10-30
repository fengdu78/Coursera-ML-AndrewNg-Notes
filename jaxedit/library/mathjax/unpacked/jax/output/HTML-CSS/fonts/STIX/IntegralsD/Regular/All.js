/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsD/Regular/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsD'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222C: [2000,269,895,56,1345],    // DOUBLE INTEGRAL
    0x222D: [2000,269,1205,56,1655],   // TRIPLE INTEGRAL
    0x222F: [2000,269,945,56,1345],    // SURFACE INTEGRAL
    0x2230: [2000,269,1255,56,1655],   // VOLUME INTEGRAL
    0x2231: [2000,269,635,56,1035],    // CLOCKWISE INTEGRAL
    0x2232: [2000,269,635,56,1035],    // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [2000,269,635,56,1035],    // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0B: [2000,269,914,56,1035],    // SUMMATION WITH INTEGRAL
    0x2A0C: [2000,269,1515,56,1965],   // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [2000,269,635,56,1035],    // FINITE PART INTEGRAL
    0x2A0E: [2000,269,635,56,1035],    // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [2000,269,635,56,1035],    // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [2000,269,635,56,1035],    // CIRCULATION FUNCTION
    0x2A11: [2000,269,635,56,1035],    // ANTICLOCKWISE INTEGRATION
    0x2A12: [2000,269,735,56,1035],    // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [2000,269,635,56,1035],    // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [2000,269,844,56,1054],    // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [2000,269,635,56,1035],    // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [2000,269,735,56,1035],    // QUATERNION INTEGRAL OPERATOR
    0x2A17: [2000,269,819,24,1039],    // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [2000,269,635,56,1035],    // INTEGRAL WITH TIMES SIGN
    0x2A19: [2000,269,735,56,1035],    // INTEGRAL WITH INTERSECTION
    0x2A1A: [2000,269,735,56,1035],    // INTEGRAL WITH UNION
    0x2A1B: [2157,269,636,56,1036],    // INTEGRAL WITH OVERBAR
    0x2A1C: [2000,426,585,56,1035]     // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsD/Regular/All.js");
