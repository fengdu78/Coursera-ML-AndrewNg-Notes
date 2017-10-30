/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/IntegralsUp/Regular/All.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXIntegralsUp'],
  {
    0x20: [0,0,250,0,0],               // SPACE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x222C: [824,320,596,59,638],      // DOUBLE INTEGRAL
    0x222D: [824,320,826,59,868],      // TRIPLE INTEGRAL
    0x222F: [824,320,548,35,637],      // SURFACE INTEGRAL
    0x2230: [824,320,876,54,972],      // VOLUME INTEGRAL
    0x2231: [824,320,478,54,547],      // CLOCKWISE INTEGRAL
    0x2232: [824,320,441,35,530],      // CLOCKWISE CONTOUR INTEGRAL
    0x2233: [824,320,475,35,564],      // ANTICLOCKWISE CONTOUR INTEGRAL
    0x2A0B: [812,332,706,43,661],      // SUMMATION WITH INTEGRAL
    0x2A0C: [812,332,1093,59,1135],    // QUADRUPLE INTEGRAL OPERATOR
    0x2A0D: [812,332,467,59,509],      // FINITE PART INTEGRAL
    0x2A0E: [812,332,467,59,509],      // INTEGRAL WITH DOUBLE STROKE
    0x2A0F: [812,332,529,59,571],      // INTEGRAL AVERAGE WITH SLASH
    0x2A10: [812,332,346,35,435],      // CIRCULATION FUNCTION
    0x2A11: [812,332,478,54,547],      // ANTICLOCKWISE INTEGRATION
    0x2A12: [812,332,365,35,434],      // LINE INTEGRATION WITH RECTANGULAR PATH AROUND POLE
    0x2A13: [812,332,384,54,453],      // LINE INTEGRATION WITH SEMICIRCULAR PATH AROUND POLE
    0x2A14: [812,332,509,54,578],      // LINE INTEGRATION NOT INCLUDING THE POLE
    0x2A15: [812,332,396,35,485],      // INTEGRAL AROUND A POINT OPERATOR
    0x2A16: [812,332,412,31,481],      // QUATERNION INTEGRAL OPERATOR
    0x2A17: [812,332,771,45,831],      // INTEGRAL WITH LEFTWARDS ARROW WITH HOOK
    0x2A18: [812,332,455,45,515],      // INTEGRAL WITH TIMES SIGN
    0x2A19: [812,332,504,45,569],      // INTEGRAL WITH INTERSECTION
    0x2A1A: [812,332,504,45,569],      // INTEGRAL WITH UNION
    0x2A1B: [935,332,453,45,495],      // INTEGRAL WITH OVERBAR
    0x2A1C: [812,455,376,59,509]       // INTEGRAL WITH UNDERBAR
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/IntegralsUp/Regular/All.js");
