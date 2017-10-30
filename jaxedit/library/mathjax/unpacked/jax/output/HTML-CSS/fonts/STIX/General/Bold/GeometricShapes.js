/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/Bold/GeometricShapes.js
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold'],
  {
    0x25B3: [811,127,1145,35,1110],    // WHITE UP-POINTING TRIANGLE
    0x25B7: [791,284,1043,70,1008],    // WHITE RIGHT-POINTING TRIANGLE
    0x25BD: [811,127,1145,35,1110],    // WHITE DOWN-POINTING TRIANGLE
    0x25C1: [791,284,1043,35,973],     // WHITE LEFT-POINTING TRIANGLE
    0x25CA: [795,289,790,45,745],      // LOZENGE
    0x25EC: [811,127,1145,35,1110]     // WHITE UP-POINTING TRIANGLE WITH DOT
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/Bold/GeometricShapes.js");
