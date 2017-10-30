/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/optable/BasicLatin.js
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
        '||': [0,0,TEXCLASS.BIN,{fence: true, stretchy: true, symmetric: true}], // multiple character operator: ||
        '|||': [0,0,TEXCLASS.ORD,{fence: true, stretchy: true, symmetric: true}]  // multiple character operator: |||
      },
      postfix: {
        '!!': [1,0,TEXCLASS.BIN], // multiple character operator: !!
        '\'': MO.ACCENT,       // apostrophe
        '++': [0,0,TEXCLASS.BIN], // multiple character operator: ++
        '--': [0,0,TEXCLASS.BIN], // multiple character operator: --
        '..': [0,0,TEXCLASS.BIN], // multiple character operator: ..
        '...': MO.ORD,         // multiple character operator: ...
        '||': [0,0,TEXCLASS.BIN,{fence: true, stretchy: true, symmetric: true}], // multiple character operator: ||
        '|||': [0,0,TEXCLASS.ORD,{fence: true, stretchy: true, symmetric: true}]  // multiple character operator: |||
      },
      infix: {
        '!=': MO.BIN4,         // multiple character operator: !=
        '&&': MO.BIN4,         // multiple character operator: &&
        '**': [1,1,TEXCLASS.BIN], // multiple character operator: **
        '*=': MO.BIN4,         // multiple character operator: *=
        '+=': MO.BIN4,         // multiple character operator: +=
        '-=': MO.BIN4,         // multiple character operator: -=
        '->': MO.BIN5,         // multiple character operator: ->
        '//': [1,1,TEXCLASS.BIN], // multiple character operator: //
        '/=': MO.BIN4,         // multiple character operator: /=
        ':=': MO.BIN4,         // multiple character operator: :=
        '<=': MO.BIN5,         // multiple character operator: <=
        '<>': [1,1,TEXCLASS.BIN], // multiple character operator: <>
        '==': MO.BIN4,         // multiple character operator: ==
        '>=': MO.BIN5,         // multiple character operator: >=
        '@': MO.ORD11,         // commercial at
        '||': [2,2,TEXCLASS.BIN,{fence: true, stretchy: true, symmetric: true}], // multiple character operator: ||
        '|||': [2,2,TEXCLASS.ORD,{fence: true, stretchy: true, symmetric: true}]  // multiple character operator: |||
      }
    }
  });

  MathJax.Ajax.loadComplete(MML.optableDir+"/BasicLatin.js");

})(MathJax.ElementJax.mml);
