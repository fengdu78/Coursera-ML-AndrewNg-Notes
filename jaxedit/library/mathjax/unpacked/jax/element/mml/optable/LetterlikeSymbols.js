/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/LetterlikeSymbols.js
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
      prefix: {
        '\u2145': MO.ORD21,    // double-struck italic capital d
        '\u2146': [2,0,TEXCLASS.ORD]  // double-struck italic small d
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/LetterlikeSymbols.js");

})(MathJax.ElementJax.mml);
