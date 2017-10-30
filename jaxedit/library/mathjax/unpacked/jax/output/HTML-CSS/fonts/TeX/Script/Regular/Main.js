/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/fonts/TeX/Script/Regular/Main.js
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

MathJax.OutputJax['HTML-CSS'].FONTDATA.FONTS['MathJax_Script'] = {
  directory: 'Script/Regular',
  family: 'MathJax_Script',
  testString: "MATHJAX SCRIPT",
  skew: {
    0x41: 0.389,
    0x42: 0.194,
    0x43: 0.278,
    0x44: 0.111,
    0x45: 0.139,
    0x46: 0.222,
    0x47: 0.25,
    0x48: 0.333,
    0x49: 0.333,
    0x4A: 0.417,
    0x4B: 0.361,
    0x4C: 0.306,
    0x4D: 0.444,
    0x4E: 0.389,
    0x4F: 0.167,
    0x50: 0.222,
    0x51: 0.278,
    0x52: 0.194,
    0x53: 0.333,
    0x54: 0.222,
    0x55: 0.25,
    0x56: 0.222,
    0x57: 0.25,
    0x58: 0.278,
    0x59: 0.194,
    0x5A: 0.306
  },
  Ranges: [
    [0x0,0x7F,"BasicLatin"],
    [0x80,0xFFFF,"Other"]
  ]

};

MathJax.Callback.Queue(
  ["initFont",MathJax.OutputJax["HTML-CSS"],"MathJax_Script"],
  ["loadComplete",MathJax.Ajax,MathJax.OutputJax["HTML-CSS"].fontDir+"/Script/Regular/Main.js"]
);
