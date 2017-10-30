/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/entities/j.js
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
    'Jcirc': '\u0134',
    'Jcy': '\u0419',
    'Jsercy': '\u0408',
    'Jukcy': '\u0404',
    'jcirc': '\u0135',
    'jcy': '\u0439',
    'jsercy': '\u0458',
    'jukcy': '\u0454'
  });

  MathJax.Ajax.loadComplete(MATHML.entityDir+"/j.js");

})(MathJax.InputJax.MathML);
