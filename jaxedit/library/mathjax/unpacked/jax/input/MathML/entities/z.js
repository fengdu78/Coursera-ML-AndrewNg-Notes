/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/entities/z.js
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
    'ZHcy': '\u0416',
    'Zacute': '\u0179',
    'Zcaron': '\u017D',
    'Zcy': '\u0417',
    'Zdot': '\u017B',
    'ZeroWidthSpace': '\u200B',
    'Zeta': '\u0396',
    'zacute': '\u017A',
    'zcaron': '\u017E',
    'zcy': '\u0437',
    'zdot': '\u017C',
    'zeetrf': '\u2128',
    'zhcy': '\u0436',
    'zwj': '\u200D',
    'zwnj': '\u200C'
  });

  MathJax.Ajax.loadComplete(MATHML.entityDir+"/z.js");

})(MathJax.InputJax.MathML);
