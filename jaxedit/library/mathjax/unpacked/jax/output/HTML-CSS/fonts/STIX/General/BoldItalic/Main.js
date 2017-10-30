/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['STIXGeneral-bold-italic'] = {
  directory: 'General/BoldItalic',
  family: 'STIXGeneral',
  weight: 'bold',
  style: 'italic',
  Ranges: [
    [0x0,0x7F,"BasicLatin"],
    [0xA0,0xFF,"Latin1Supplement"],
    [0x100,0x17F,"LatinExtendedA"],
    [0x180,0x24F,"LatinExtendedB"],
    [0x250,0x2AF,"IPAExtensions"],
    [0x2B0,0x2FF,"SpacingModLetters"],
    [0x370,0x3FF,"GreekAndCoptic"],
    [0x400,0x4FF,"Cyrillic"],
    [0x1E00,0x1EFF,"LatinExtendedAdditional"],
    [0x2000,0x206F,"GeneralPunctuation"],
    [0x20A0,0x20CF,"CurrencySymbols"],
    [0x20D0,0x20FF,"CombDiactForSymbols"],
    [0x2100,0x214F,"LetterlikeSymbols"],
    [0x2200,0x22FF,"MathOperators"],
    [0x2400,0x243F,"ControlPictures"],
    [0x2460,0x24FF,"EnclosedAlphanum"],
    [0x2500,0x257F,"BoxDrawing"],
    [0xFB00,0xFB4F,"AlphaPresentForms"],
    [0x1D468,0x1D49B,"MathBoldItalic"],
    [0x1D4D0,0x1D503,"MathBoldScript"],
    [0x1D63C,0x1D66F,"MathSSItalicBold"],
    [0x1D71C,0x1D755,"GreekBoldItalic"],
    [0x1D790,0x1D7C9,"GreekSSBoldItalic"]
  ]

};

MathJax.OutputJax["HTML-CSS"].initFont("STIXGeneral-bold-italic");

MathJax.Ajax.loadComplete(MathJax.OutputJax["HTML-CSS"].fontDir + "/General/BoldItalic/Main.js");
