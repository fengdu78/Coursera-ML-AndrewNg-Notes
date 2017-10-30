/*************************************************************
 *
 *  MathJax/extensions/TeX/AMSsymbols.js
 *  
 *  Implements macros for accessing the AMS symbol fonts.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2009-2012 Design Science, Inc.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/AMSsymbols"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var MML = MathJax.ElementJax.mml,
      TEXDEF = MathJax.InputJax.TeX.Definitions;
  
  TEXDEF.Add({

    mathchar0mi: {
      // Lowercase Greek letters
      digamma:                '03DD',
      varkappa:               '03F0',
      
      // Uppercase Greek letters
      varGamma:               ['0393',{mathvariant: MML.VARIANT.ITALIC}],
      varDelta:               ['0394',{mathvariant: MML.VARIANT.ITALIC}],
      varTheta:               ['0398',{mathvariant: MML.VARIANT.ITALIC}],
      varLambda:              ['039B',{mathvariant: MML.VARIANT.ITALIC}],
      varXi:                  ['039E',{mathvariant: MML.VARIANT.ITALIC}],
      varPi:                  ['03A0',{mathvariant: MML.VARIANT.ITALIC}],
      varSigma:               ['03A3',{mathvariant: MML.VARIANT.ITALIC}],
      varUpsilon:             ['03A5',{mathvariant: MML.VARIANT.ITALIC}],
      varPhi:                 ['03A6',{mathvariant: MML.VARIANT.ITALIC}],
      varPsi:                 ['03A8',{mathvariant: MML.VARIANT.ITALIC}],
      varOmega:               ['03A9',{mathvariant: MML.VARIANT.ITALIC}],

      // Hebrew letters
      beth:                   '2136',
      gimel:                  '2137',
      daleth:                 '2138',

      // Miscellaneous symbols
//    hbar:                   '0127',  // in TeX/jax.js
      backprime:              ['2035',{variantForm: true}],
      hslash:                 '210F',
      varnothing:             ['2205',{variantForm: true}],
      blacktriangle:          '25B4',
      triangledown:           ['25BD',{variantForm: true}],
      blacktriangledown:      '25BE',
      square:                 '25FB',
      Box:                    '25FB',
      blacksquare:            '25FC',
      lozenge:                '25CA',
      Diamond:                '25CA',
      blacklozenge:           '29EB',
      circledS:               ['24C8',{mathvariant: MML.VARIANT.NORMAL}],
      bigstar:                '2605',
//    angle:                  '2220',  // in TeX/jax.js
      sphericalangle:         '2222',
      measuredangle:          '2221',
      nexists:                '2204',
      complement:             '2201',
      mho:                    '2127',
      eth:                    ['00F0',{mathvariant: MML.VARIANT.NORMAL}],
      Finv:                   '2132',
      diagup:                 '2571',
      Game:                   '2141',
      diagdown:               '2572',
      Bbbk:                   ['006B',{mathvariant: MML.VARIANT.DOUBLESTRUCK}],
      
      yen:                    '00A5',
      circledR:               '00AE',
      checkmark:              '2713',
      maltese:                '2720'
    },

    mathchar0mo: {
      // Binary operators
      dotplus:                '2214',
      ltimes:                 '22C9',
      smallsetminus:          '2216',
      rtimes:                 '22CA',
      Cap:                    '22D2',
      doublecap:              '22D2',
      leftthreetimes:         '22CB',
      Cup:                    '22D3',
      doublecup:              '22D3',
      rightthreetimes:        '22CC',
      barwedge:               '22BC',
      curlywedge:             '22CF',
      veebar:                 '22BB',
      curlyvee:               '22CE',
      doublebarwedge:         '2A5E',
      boxminus:               '229F',
      circleddash:            '229D',
      boxtimes:               '22A0',
      circledast:             '229B',
      boxdot:                 '22A1',
      circledcirc:            '229A',
      boxplus:                '229E',
      centerdot:              '22C5',
      divideontimes:          '22C7',
      intercal:               '22BA',

      // Binary relations
      leqq:                   '2266',
      geqq:                   '2267',
      leqslant:               '2A7D',
      geqslant:               '2A7E',
      eqslantless:            '2A95',
      eqslantgtr:             '2A96',
      lesssim:                '2272',
      gtrsim:                 '2273',
      lessapprox:             '2A85',
      gtrapprox:              '2A86',
      approxeq:               '224A',
      lessdot:                '22D6',
      gtrdot:                 '22D7',
      lll:                    '22D8',
      llless:                 '22D8',
      ggg:                    '22D9',
      gggtr:                  '22D9',
      lessgtr:                '2276',
      gtrless:                '2277',
      lesseqgtr:              '22DA',
      gtreqless:              '22DB',
      lesseqqgtr:             '2A8B',
      gtreqqless:             '2A8C',
      doteqdot:               '2251',
      Doteq:                  '2251',
      eqcirc:                 '2256',
      risingdotseq:           '2253',
      circeq:                 '2257',
      fallingdotseq:          '2252',
      triangleq:              '225C',
      backsim:                '223D',
      thicksim:               ['223C',{variantForm: true}],
      backsimeq:              '22CD',
      thickapprox:            ['2248',{variantForm: true}],
      subseteqq:              '2AC5',
      supseteqq:              '2AC6',
      Subset:                 '22D0',
      Supset:                 '22D1',
      sqsubset:               '228F',
      sqsupset:               '2290',
      preccurlyeq:            '227C',
      succcurlyeq:            '227D',
      curlyeqprec:            '22DE',
      curlyeqsucc:            '22DF',
      precsim:                '227E',
      succsim:                '227F',
      precapprox:             '2AB7',
      succapprox:             '2AB8',
      vartriangleleft:        '22B2',
      lhd:                    '22B2',
      vartriangleright:       '22B3',
      rhd:                    '22B3',
      trianglelefteq:         '22B4',
      unlhd:                  '22B4',
      trianglerighteq:        '22B5',
      unrhd:                  '22B5',
      vDash:                  '22A8',
      Vdash:                  '22A9',
      Vvdash:                 '22AA',
      smallsmile:             '2323',
      shortmid:               ['2223',{variantForm: true}],
      smallfrown:             '2322',
      shortparallel:          ['2225',{variantForm: true}],
      bumpeq:                 '224F',
      between:                '226C',
      Bumpeq:                 '224E',
      pitchfork:              '22D4',
      varpropto:              '221D',
      backepsilon:            '220D',
      blacktriangleleft:      '25C2',
      blacktriangleright:     '25B8',
      therefore:              '2234',
      because:                '2235',
      eqsim:                  '2242',
      vartriangle:            ['25B3',{variantForm: true}],
      Join:                   '22C8',

      // Negated relations
      nless:                  '226E',
      ngtr:                   '226F',
      nleq:                   '2270',
      ngeq:                   '2271',
      nleqslant:              ['2A87',{variantForm: true}],
      ngeqslant:              ['2A88',{variantForm: true}],
      nleqq:                  ['2270',{variantForm: true}],
      ngeqq:                  ['2271',{variantForm: true}],
      lneq:                   '2A87',
      gneq:                   '2A88',
      lneqq:                  '2268',
      gneqq:                  '2269',
      lvertneqq:              ['2268',{variantForm: true}],
      gvertneqq:              ['2269',{variantForm: true}],
      lnsim:                  '22E6',
      gnsim:                  '22E7',
      lnapprox:               '2A89',
      gnapprox:               '2A8A',
      nprec:                  '2280',
      nsucc:                  '2281',
      npreceq:                ['22E0',{variantForm: true}],
      nsucceq:                ['22E1',{variantForm: true}],
      precneqq:               '2AB5',
      succneqq:               '2AB6',
      precnsim:               '22E8',
      succnsim:               '22E9',
      precnapprox:            '2AB9',
      succnapprox:            '2ABA',
      nsim:                   '2241',
      ncong:                  '2246',
      nshortmid:              ['2224',{variantForm: true}],
      nshortparallel:         ['2226',{variantForm: true}],
      nmid:                   '2224',
      nparallel:              '2226',
      nvdash:                 '22AC',
      nvDash:                 '22AD',
      nVdash:                 '22AE',
      nVDash:                 '22AF',
      ntriangleleft:          '22EA',
      ntriangleright:         '22EB',
      ntrianglelefteq:        '22EC',
      ntrianglerighteq:       '22ED',
      nsubseteq:              '2288',
      nsupseteq:              '2289',
      nsubseteqq:             ['2288',{variantForm: true}],
      nsupseteqq:             ['2289',{variantForm: true}],
      subsetneq:              '228A',
      supsetneq:              '228B',
      varsubsetneq:           ['228A',{variantForm: true}],
      varsupsetneq:           ['228B',{variantForm: true}],
      subsetneqq:             '2ACB',
      supsetneqq:             '2ACC',
      varsubsetneqq:          ['2ACB',{variantForm: true}],
      varsupsetneqq:          ['2ACC',{variantForm: true}],


      // Arrows
      leftleftarrows:         '21C7',
      rightrightarrows:       '21C9',
      leftrightarrows:        '21C6',
      rightleftarrows:        '21C4',
      Lleftarrow:             '21DA',
      Rrightarrow:            '21DB',
      twoheadleftarrow:       '219E',
      twoheadrightarrow:      '21A0',
      leftarrowtail:          '21A2',
      rightarrowtail:         '21A3',
      looparrowleft:          '21AB',
      looparrowright:         '21AC',
      leftrightharpoons:      '21CB',
      rightleftharpoons:      ['21CC',{variantForm: true}],
      curvearrowleft:         '21B6',
      curvearrowright:        '21B7',
      circlearrowleft:        '21BA',
      circlearrowright:       '21BB',
      Lsh:                    '21B0',
      Rsh:                    '21B1',
      upuparrows:             '21C8',
      downdownarrows:         '21CA',
      upharpoonleft:          '21BF',
      upharpoonright:         '21BE',
      downharpoonleft:        '21C3',
      restriction:            '21BE',
      multimap:               '22B8',
      downharpoonright:       '21C2',
      leftrightsquigarrow:    '21AD',
      rightsquigarrow:        '21DD',
      leadsto:                '21DD',
      dashrightarrow:         '21E2',
      dashleftarrow:          '21E0',

      // Negated arrows
      nleftarrow:             '219A',
      nrightarrow:            '219B',
      nLeftarrow:             '21CD',
      nRightarrow:            '21CF',
      nleftrightarrow:        '21AE',
      nLeftrightarrow:        '21CE'
    },
    
    delimiter: {
      // corners
      "\\ulcorner":           '231C',
      "\\urcorner":           '231D',
      "\\llcorner":           '231E',
      "\\lrcorner":           '231F'
    },
    
    macros: {
      implies:    ['Macro','\\;\\Longrightarrow\\;'],
      impliedby:  ['Macro','\\;\\Longleftarrow\\;']
    }
    
  },null,true);
  
  var REL = MML.mo.OPTYPES.REL;

  MathJax.Hub.Insert(MML.mo.prototype,{
    OPTABLE: {
      infix: {
        '\u2322': REL,  // smallfrown
        '\u2323': REL,  // smallsmile
        '\u25B3': REL,  // vartriangle
        '\uE006': REL,  // nshortmid
        '\uE007': REL,  // nshortparallel
        '\uE00C': REL,  // lvertneqq
        '\uE00D': REL,  // gvertneqq
        '\uE00E': REL,  // ngeqq
        '\uE00F': REL,  // ngeqslant
        '\uE010': REL,  // nleqslant
        '\uE011': REL,  // nleqq
        '\uE016': REL,  // nsubseteqq
        '\uE017': REL,  // varsubsetneqq
        '\uE018': REL,  // nsupseteqq
        '\uE019': REL,  // varsupsetneqq
        '\uE01A': REL,  // varsubsetneq
        '\uE01B': REL,  // varsupsetneq
        '\uE04B': REL,  // npreceq
        '\uE04F': REL   // nsucceq
      }
    }
  });

  MathJax.Hub.Startup.signal.Post("TeX AMSsymbols Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/AMSsymbols.js");
