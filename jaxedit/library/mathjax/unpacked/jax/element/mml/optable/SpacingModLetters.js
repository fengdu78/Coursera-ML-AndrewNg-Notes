/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/SpacingModLetters.js
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

(function (MML) {
  var MO = MML.mo.OPTYPES;
  var TEXCLASS = MML.TEXCLASS;

  MathJax.Hub.Insert(MML.mo.prototype,{
    OPTABLE: {
      postfix: {
        '\u02CD': MO.WIDEACCENT, // modifier letter low macron
        '\u02DA': MO.ACCENT,   // ring above
        '\u02DD': MO.ACCENT,   // double acute accent
        '\u02F7': MO.WIDEACCENT  // modifier letter low tilde
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/SpacingModLetters.js");

})(MathJax.ElementJax.mml);
