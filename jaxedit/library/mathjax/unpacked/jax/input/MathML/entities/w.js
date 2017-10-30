/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/entities/w.js
 *
 *  Copyright (c) 2010 Design Science, Inc.
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

(function (MATHML) {
  MathJax.Hub.Insert(MATHML.Parse.Entity,{
    'Wcirc': '\u0174',
    'wcirc': '\u0175',
    'wedbar': '\u2A5F',
    'wedge': '\u2227',
    'wedgeq': '\u2259',
    'wp': '\u2118',
    'wr': '\u2240',
    'wreath': '\u2240'
  });

  MathJax.Ajax.loadComplete(MATHML.entityDir+"/w.js");

})(MathJax.InputJax.MathML);
