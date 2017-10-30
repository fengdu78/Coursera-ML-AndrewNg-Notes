/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsUpSm/Regular/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsUpSm'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222C: [690,189,587,52,605],      // DOUBLE INTEGRAL
    0x222D: [690,189,817,52,835],      // TRIPLE INTEGRAL
    0x222F: [690,189,682,52,642],      // SURFACE INTEGRAL
    0x2230: [690,189,909,52,869],      // VOLUME INTEGRAL
    0x2231: [690,189,480,52,447],      // CLOCKWISE INTEGRAL
    0x2232: [690,189,480,52,448],      // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [690,189,480,52,470],      // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0B: [694,190,556,41,515],      // SUMMATION WITH INTEGRAL
    0x2A0C: [694,190,1044,68,1081],    // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [694,190,420,68,391],      // FINITE PART INTEGRAL
    0x2A0E: [694,190,420,68,391],      // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [694,190,520,39,482],      // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [694,190,324,41,380],      // CIRCULATION FUNCTION
    0x2A11: [694,190,480,52,447],      // ANTICLOCKWISE INTEGRATION
    0x2A12: [694,190,450,68,410],      // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [690,189,450,68,412],      // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [690,189,550,68,512],      // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [690,189,450,50,410],      // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [694,191,450,50,410],      // QUATERNION INTEGRAL OPERATOR
    0x2A17: [694,190,611,12,585],      // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [694,190,450,48,412],      // INTEGRAL WITH TIMES SIGN
    0x2A19: [694,190,450,59,403],      // INTEGRAL WITH INTERSECTION
    0x2A1A: [694,190,450,59,403],      // INTEGRAL WITH UNION
    0x2A1B: [784,189,379,68,416],      // INTEGRAL WITH OVERBAR
    0x2A1C: [690,283,357,52,400]       // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsUpSm/Regular/All.js");
