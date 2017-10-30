/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/MiscMathSymbolsA.js
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
        '\u27E6': MO.OPEN,     // mathematical left white square bracket
        '\u27EA': MO.OPEN,     // mathematical left double angle bracket
        '\u27EC': MO.OPEN      // mathematical left white tortoise shell bracket
      },
      postfix: {
        '\u27E7': MO.CLOSE,    // mathematical right white square bracket
        '\u27EB': MO.CLOSE,    // mathematical right double angle bracket
        '\u27ED': MO.CLOSE     // mathematical right white tortoise shell bracket
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/MiscMathSymbolsA.js");

})(MathJax.ElementJax.mml);
