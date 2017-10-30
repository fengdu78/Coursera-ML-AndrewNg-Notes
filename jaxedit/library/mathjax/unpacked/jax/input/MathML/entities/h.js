/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/entities/h.js
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
    'HARDcy': '\u042A',
    'Hcirc': '\u0124',
    'HilbertSpace': '\u210B',
    'HorizontalLine': '\u2500',
    'Hstrok': '\u0126',
    'hArr': '\u21D4',
    'hairsp': '\u200A',
    'half': '\u00BD',
    'hamilt': '\u210B',
    'hardcy': '\u044A',
    'harr': '\u2194',
    'harrcir': '\u2948',
    'hcirc': '\u0125',
    'hearts': '\u2665',
    'heartsuit': '\u2665',
    'hercon': '\u22B9',
    'hksearow': '\u2925',
    'hkswarow': '\u2926',
    'hoarr': '\u21FF',
    'homtht': '\u223B',
    'horbar': '\u2015',
    'hslash': '\u210F',
    'hstrok': '\u0127',
    'hybull': '\u2043',
    'hyphen': '\u2010'
  });

  MathJax.Ajax.loadComplete(MATHML.entityDir+"/h.js");

})(MathJax.InputJax.MathML);
