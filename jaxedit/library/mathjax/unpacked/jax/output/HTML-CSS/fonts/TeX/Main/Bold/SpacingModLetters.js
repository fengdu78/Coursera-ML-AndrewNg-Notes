/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Main/Bold/SpacingModLetters.js
 *
 *  Copyright (c) 2009-2012 Design Science, Inc.
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
  MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Main-bold'],
  {
    0x2C6: [694,-520,575,126,448],     // MODIFIER LETTER CIRCUMFLEX ACCENT
    0x2C7: [660,-515,575,130,444],     // CARON
    0x2C9: [607,-540,575,80,494],      // MODIFIER LETTER MACRON
    0x2CA: [706,-503,575,236,460],     // MODIFIER LETTER ACUTE ACCENT
    0x2CB: [706,-503,575,114,338],     // MODIFIER LETTER GRAVE ACCENT
    0x2D8: [694,-500,575,102,472],     // BREVE
    0x2D9: [695,-525,575,202,372],     // DOT ABOVE
    0x2DA: [702,-536,575,160,414],     // RING ABOVE
    0x2DC: [694,-552,575,96,478]       // SMALL TILDE
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/Main/Bold/SpacingModLetters.js");
