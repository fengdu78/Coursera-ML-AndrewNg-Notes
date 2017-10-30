/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/font/STIX/fontdata.js
 *  
 *  Initializes the HTML-CSS OutputJax to use the STIX fonts
 *  for displaying mathematics.
 *
 *  ---------------------------------------------------------------------
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
 */

(function (HTMLCSS,MML,HTML) {
  var VERSION = "2.1";
  
  HTMLCSS.allowWebFonts = false;
  
  var GENERAL = "STIXGeneral",
      BOLD    = "STIXGeneral-bold",
      ITALIC  = "STIXGeneral-italic",
      BITALIC = "STIXGeneral-bold-italic",
      NONUNI  = "STIXNonUnicode",
      NONUNII = "STIXNonUnicode-italic",
      SIZE1   = "STIXSizeOneSym",
      SIZE2   = "STIXSizeTwoSym",
      SIZE3   = "STIXSizeThreeSym",
      SIZE4   = "STIXSizeFourSym",
      SIZE5   = "STIXSizeFiveSym";
  var H = "H", V = "V", EXTRAH = {load:"extra", dir:H}, EXTRAV = {load:"extra", dir:V};

  HTMLCSS.Augment({
    FONTDATA: {
      version: VERSION,
      STIXversion: "1.1",
      
      TeX_factor: 1.125,    // TeX em's to STIX em's seem to need this
      baselineskip: 1.2,
      lineH: .8, lineD: .2,

      FONTS: {
        "STIXGeneral":                "General/Regular/Main.js",
        "STIXGeneral-italic":         "General/Italic/Main.js",
        "STIXGeneral-bold":           "General/Bold/Main.js",
        "STIXGeneral-bold-italic":    "General/BoldItalic/Main.js",
        "STIXNonUnicode":             "NonUnicode/Regular/Main.js",
        "STIXNonUnicode-italic":      "NonUnicode/Italic/Main.js",
        "STIXNonUnicode-bold":        "NonUnicode/Bold/Main.js",
        "STIXNonUnicode-bold-italic": "NonUnicode/BoldItalic/Main.js",
        "STIXVariants":               "Variants/Regular/All.js",
        "STIXSizeOneSym":             "SizeOneSym/Regular/All.js",
        "STIXSizeTwoSym":             "SizeTwoSym/Regular/All.js",
        "STIXSizeThreeSym":           "SizeThreeSym/Regular/All.js",
        "STIXSizeFourSym":            "SizeFourSym/Regular/All.js",
        "STIXSizeFiveSym":            "SizeFiveSym/Regular/All.js",
        "STIXIntegralsD":             "IntegralsD/Regular/All.js"
      },
      
      VARIANT: {
        "normal": {fonts: [GENERAL,NONUNI,SIZE1],
                   remap: {0x2205: [0x2205,"-STIX-variant"]}}, // \emptyset
        "bold":   {fonts: [BOLD,"STIXNonUnicode-bold","STIXSizeOneSym-bold"], bold:true},
        "italic": {fonts: [ITALIC,NONUNII,GENERAL,NONUNI,SIZE1], italic:true},
        "bold-italic": {fonts: [BITALIC,"STIXNonUnicode-bold-italic"], bold:true, italic:true},
        "double-struck": {offsetA: 0x1D538, offsetN: 0x1D7D8,
                   remap: {0x1D53A: 0x2102, 0x1D53F: 0x210D, 0x1D545: 0x2115, 0x1D547: 0x2119,
                           0x1D548: 0x211A, 0x1D549: 0x211D, 0x1D551: 0x2124}},
        "fraktur": {offsetA: 0x1D504,
                   remap: {0x1D506: 0x212D, 0x1D50B: 0x210C, 0x1D50C: 0x2111, 0x1D515: 0x211C, 0x1D51D: 0x2128}},
        "bold-fraktur": {fonts: [BOLD], offsetA: 0x1D56C, bold:true},
        "script": {fonts: [ITALIC], offsetA: 0x1D49C, italic:true,
                   remap: {0x1D49D: 0x212C, 0x1D4A0: 0x2130, 0x1D4A1: 0x2131, 0x1D4A3: 0x210B,
                           0x1D4A4: 0x2110, 0x1D4A7: 0x2112, 0x1D4A8: 0x2133, 0x1D4AD: 0x211B,
                           0x1D4BA: 0x212F, 0x1D4BC: 0x210A, 0x1D4C4: 0x2134}},
        "bold-script": {fonts: [BITALIC], offsetA: 0x1D4D0, bold:true, italic:true},
        "sans-serif": {offsetA: 0x1D5A0, offsetN: 0x1D7E2, offsetG: 0xE17D},
        "bold-sans-serif": {offsetA: 0x1D5D4, offsetG: 0x1D756, offsetN: 0x1D7EC, bold:true},
        "sans-serif-italic": {fonts: [ITALIC,NONUNII], offsetA: 0x1D608, offsetN: 0xE1B4, offsetG: 0xE1BF, italic:true},
        "sans-serif-bold-italic": {fonts: [BITALIC,"STIXNonUnicode-bold-italic"], offsetA: 0x1D63C, offsetN: 0xE1F6, offsetG: 0x1D790, bold:true, italic:true},
        "monospace": {offsetA: 0x1D670, offsetN: 0x1D7F6},
        "-STIX-variant": {fonts:["STIXVariants",NONUNI,GENERAL],
                   remap: {0x2A87: 0xE010, 0x2A88: 0xE00F, 0x2270: 0xE011, 0x2271: 0xE00E,
                           0x22E0: 0xE04B, 0x22E1: 0xE04F, 0x2288: 0xE016, 0x2289: 0xE018,
                           0x25B3: 0x25B5, 0x25BD: 0x25BF,
                           0x2205: [0x2205,MML.VARIANT.NORMAL]}},  // \varnothing
        "-tex-caligraphic": {fonts: [ITALIC,NONUNII,NONUNI,SIZE1], offsetA: 0xE22D, noLowerCase: 1},
        "-tex-oldstyle": {offsetN: 0xE261,
                   remap: {0xE262: 0xE265, 0xE263: 0xE269, 0xE264: 0xE26D, 0xE265: 0xE271,
                           0xE266: 0xE275, 0xE267: 0xE279, 0xE268: 0xE27D, 0xE269: 0xE281,
                           0xE26A: 0xE285}},
        "-tex-mathit": {fonts: [ITALIC,NONUNII,GENERAL,NONUNI,SIZE1], italic:true, noIC:true},
        "-largeOp": {fonts:[SIZE1,"STIXIntegralsD",NONUNI,GENERAL]},
        "-smallOp": {}
      },
      
      RANGES: [
        {name: "alpha", low: 0x61, high: 0x7A, offset: "A", add: 26},
        {name: "Alpha", low: 0x41, high: 0x5A, offset: "A"},
        {name: "number", low: 0x30, high: 0x39, offset: "N"},
        {name: "greek", low: 0x03B1, high: 0x03C9, offset: "G", add: 26},
        {name: "Greek", low: 0x0391, high: 0x03F6, offset: "G",
           remap: {0x03F5: 53, 0x03D1: 54, 0x03F0: 55, 0x03D5: 56, 0x03F1: 57, 0x03D6: 58, 0x03F4: 17}}
      ],
      
      RULECHAR: 0x203E,
      
      REMAP: {
        0x2F3: 0x2DA, 0x2F4: 0x2CA,     // ring below, middle grave
        0xFE37: 0x23DE, 0xFE38: 0x23DF, // OverBrace, UnderBrace
        0x3008: 0x27E8, 0x3009: 0x27E9, // langle, rangle
        0x2758: 0x2223                  // VerticalSeparator
      },
      
      REMAPACCENT: {
        "\u2192": "\u20D7"
      },
      REMAPACCENTUNDER: {
      },
      
      DELIMITERS: {
        0x0028: // (
        {
          dir: V, HW: [[.844,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x239B,SIZE1], ext:[0x239C,SIZE1], bot:[0x239D,SIZE1]}
        },
        0x0029: // )
        {
          dir: V, HW: [[.844,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x239E,SIZE1], ext:[0x239F,SIZE1], bot:[0x23A0,SIZE1]}
        },
        0x002F: // /
        {
          dir: V, HW: [[.690,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]]
        },
        0x005B: // [
        {
          dir: V, HW: [[.818,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x23A1,SIZE1], ext:[0x23A2,SIZE1], bot:[0x23A3,SIZE1]}
        },
        0x005C: // \
        {
          dir: V, HW: [[.690,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]]
        },
        0x005D: // ]
        {
          dir: V, HW: [[.818,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x23A4,SIZE1], ext:[0x23A5,SIZE1], bot:[0x23A6,SIZE1]}
        },
        0x007B: // {
        {
          dir: V, HW: [[.861,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x23A7,SIZE1], mid:[0x23A8,SIZE1], bot:[0x23A9,SIZE1], ext:[0x23AA,SIZE1]}
        },
        0x007C: // |
        {
          dir: V, HW: [[.69,GENERAL]], stretch: {ext:[0x2223,GENERAL]}
        },
        0x007D: // }
        {
          dir: V, HW: [[.861,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                         [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x23AB,SIZE1], mid:[0x23AC,SIZE1], bot:[0x23AD,SIZE1], ext:[0x23AA,SIZE1]}
        },
        0x02C6: // wide hat
        {
          dir: H, HW: [[.333,GENERAL],[.560,SIZE1],[.979,SIZE2],[1.46,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
        },
        0x02C7: // wide caron
        {
          dir: H, HW: [[.333,GENERAL],[.560,SIZE1],[.979,SIZE2],[1.46,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
        },
        0x02DC: // wide tilde
        {
          dir: H, HW: [[.333,GENERAL],[.558,SIZE1],[.978,SIZE2],[1.458,SIZE3],[1.886,SIZE4],[2.328,SIZE5]]
        },
        0x2016: // double vertical line 
        {
          dir: V, HW: [[.879,GENERAL]], stretch: {ext:[0x2016,GENERAL]}
        },
        0x203E: // horizontal line
        {
          dir: H, HW: [[.5,GENERAL]], stretch: {rep:[0x203E,GENERAL]}
        },
        0x2190: // left arrow
        {
          dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x2190,GENERAL], rep:[0x2212,GENERAL]}
        },
        0x2191: // \uparrow
        {
          dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x2191,GENERAL], ext:[0x23D0,GENERAL]}
        },
        0x2192: // right arrow
        {
          dir: H, HW: [[.926,GENERAL]], stretch: {rep:[0x2212,GENERAL], right:[0x2192,GENERAL]}
        },
        0x2193: // \downarrow
        {
          dir: V, HW: [[.818,GENERAL]], stretch: {ext:[0x23D0,GENERAL], bot:[0x2193,GENERAL]}
        },
        0x2194: // left-right arrow
        {
          dir: H, HW: [[.926,GENERAL]],
          stretch: {left:[0x2190,GENERAL], rep:[0x2212,GENERAL], right:[0x2192,GENERAL]}
        },
        0x2195: // \updownarrow
        {
          dir: V, HW: [[.818,GENERAL]],
          stretch: {top:[0x2191,GENERAL], ext:[0x23D0,GENERAL], bot:[0x2193,GENERAL]}
        },
        0x21D0: // left double arrow
        {
          dir: H, HW: [[.926,GENERAL]], stretch: {left:[0x21D0,GENERAL], rep:[0x3D,GENERAL]}
        },
        0x21D1: // \Uparrow
        {
          dir: V, HW: [[.818,GENERAL]], stretch: {top:[0x21D1,GENERAL], ext:[0x2225,GENERAL,.1]}
        },
        0x21D2: // right double arrow
        {
          dir: H, HW: [[.926,GENERAL]], stretch: {rep:[0x3D,GENERAL], right:[0x21D2,GENERAL]}
        },
        0x21D3: // \Downarrow
        {
          dir: V, HW: [[.818,GENERAL]], stretch: {ext:[0x2225,GENERAL,.1], bot:[0x21D3,GENERAL]}
        },
        0x21D4: // left-right double arrow
        {
          dir: H, HW: [[.926,GENERAL]],
          stretch: {left:[0x21D0,GENERAL], rep:[0x3D,GENERAL], right:[0x21D2,GENERAL]}
        },
        0x21D5: // \Updownarrow
        {
          dir: V, HW: [[.818,GENERAL]],
          stretch: {top:[0x21D1,GENERAL], ext:[0x2225,GENERAL,.1], bot:[0x21D3,GENERAL]}
        },
        0x221A: // \surd
        {
          dir: V, HW: [[.954,"STIXVariants"],[1.232,GENERAL],[1.847,SIZE1],[2.460,SIZE2],[3.075,SIZE3]],
          stretch: {top: [0xE001,NONUNI], ext: [0xE000,NONUNI], bot: [0x23B7,SIZE1], fullExtenders:true}
        },
        0x2223: // \vert
        {
          dir: V, HW: [[.879,GENERAL]], stretch: {ext:[0x2223,GENERAL]}
        },
        0x2225: // \Vert
        {
          dir: V, HW: [[.879,GENERAL]], stretch: {ext:[0x2225,GENERAL]}
        },
        0x2308: // \lceil
        {
          dir: V, HW: [[.926,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                       [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {top:[0x23A1,SIZE1], ext:[0x23A2,SIZE1]}
        },
        0x2309: // \rceil
        {
          dir: V, HW: [[.926,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                       [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          streth: {top:[0x23A4,SIZE1], ext:[0x23A5,SIZE1]}
        },
        0x230A: // \lfloor
        {
          dir: V, HW: [[.926,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                       [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {ext:[0x23A2,SIZE1], bot:[0x23A3,SIZE1]}
        },
        0x230B: // \rfloor
        {
          dir: V, HW: [[.926,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                       [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]],
          stretch: {ext:[0x23A5,SIZE1], bot:[0x23A6,SIZE1]}
        },
        0x23AA: // \bracevert
        {
          dir: V, HW: [[1.01,SIZE1]],
          stretch: {top:[0x23AA,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23AA,SIZE1]}
        },
        0x23AF: // horizontal line
        {
          dir: H, HW: [[.315,GENERAL]], stretch: {rep:[0x23AF,GENERAL]}
        },
        0x23B0: // \lmoustache
        {
          dir: V, HW: [[1.0,SIZE1]],
          stretch: {top:[0x23A7,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23AD,SIZE1]}
        },
        0x23B1: // \rmoustache
        {
          dir: V, HW: [[1.0,SIZE1]],
          stretch: {top:[0x23AB,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23A9,SIZE1]}
        },
        0x23D0: // vertical line extension
        {
          dir: V, HW: [[.304,GENERAL],[.690,GENERAL,null,0x7C],[.879,GENERAL,null,0x2223]],
          stretch: {ext:[0x2223,GENERAL]}
        },
        0x23DE: // horizontal brace down
        {
          dir: H, HW: [[.926,SIZE1],[1,GENERAL],[1.46,SIZE2],[1.886,SIZE3],[2.328,SIZE4],[3.238,SIZE5]],
          stretch: {left:[0xE13B,NONUNI], mid:[0xE140,NONUNI], right:[0xE13C,NONUNI], rep:[0xE14A,NONUNI]}
        },
        0x23DF: // horizontal brace up
        {
          dir: H, HW: [[.926,SIZE1],[1,GENERAL],[1.46,SIZE2],[1.886,SIZE3],[2.328,SIZE4],[3.238,SIZE5]],
          stretch: {left:[0xE13D,NONUNI], mid:[0xE141,NONUNI], right:[0xE13E,NONUNI], rep:[0xE14B,NONUNI]}
        },
        0x27E8: // \langle
        {
          dir: V, HW: [[.926,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                       [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]]
        },
        0x27E9: // \rangle
        {
          dir: V, HW: [[.926,GENERAL],[1.230,SIZE1],[1.353,SIZE1,1.1],[1.845,SIZE2],
                       [2.048,SIZE2,1.11],[2.460,SIZE3],[2.472,SIZE3,1.005],[3.075,SIZE4]]
        },
        0x27EE: // \lgroup
        {
          dir: V, HW: [[.853,GENERAL]],
          stretch: {top:[0x23A7,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23A9,SIZE1]}
        },
        0x27EF: // \rgroup
        {
          dir: V, HW: [[.853,GENERAL]],
          stretch: {top:[0x23AB,SIZE1], ext:[0x23AA,SIZE1], bot:[0x23AD,SIZE1]}
        },
        0x002D: {alias: 0x23AF, dir:H}, // minus
        0x005E: {alias: 0x02C6, dir:H}, // wide hat
        0x005F: {alias: 0x23AF, dir:H}, // low line
        0x007E: {alias: 0x02DC, dir:H}, // wide tilde
        0x00AF: {alias: 0x23AF, dir:H}, // macron
        0x02C9: {alias: 0x23AF, dir:H}, // macron
        0x0302: {alias: 0x02C6, dir:H}, // wide hat
        0x0303: {alias: 0x02DC, dir:H}, // wide tilde
        0x030C: {alias: 0x02C7, dir:H}, // wide caron
        0x0332: {alias: 0x23AF, dir:H}, // combining low line
        0x2015: {alias: 0x23AF, dir:H}, // horizontal line
        0x2017: {alias: 0x23AF, dir:H}, // horizontal line
        0x2212: {alias: 0x23AF, dir:H}, // minus
        0x2215: {alias: 0x002F, dir:V}, // division slash
        0x2329: {alias: 0x27E8, dir:V}, // langle
        0x232A: {alias: 0x27E9, dir:V}, // rangle
        0x2500: {alias: 0x2212, dir:H}, // horizontal line
        0x2758: {alias: 0x2223, dir:V}, // vertical separator
        0x3008: {alias: 0x27E8, dir:V}, // langle
        0x3009: {alias: 0x27E9, dir:V}, // rangle
        0xFE37: {alias: 0x23DE, dir:H}, // horizontal brace down
        0xFE38: {alias: 0x23DF, dir:H}, // horizontal brace up

        0x003D: EXTRAH, // equal sign
        0x219E: EXTRAH, // left two-headed arrow
        0x21A0: EXTRAH, // right two-headed arrow
        0x21A4: EXTRAH, // left arrow from bar
        0x21A5: EXTRAV, // up arrow from bar
        0x21A6: EXTRAH, // right arrow from bar
        0x21A7: EXTRAV, // down arrow from bar
        0x21B0: EXTRAV, // up arrow with top leftwards
        0x21B1: EXTRAV, // up arrow with top right
        0x21BC: EXTRAH, // left harpoon with barb up
        0x21BD: EXTRAH, // left harpoon with barb down
        0x21BE: EXTRAV, // up harpoon with barb right
        0x21BF: EXTRAV, // up harpoon with barb left
        0x21C0: EXTRAH, // right harpoon with barb up
        0x21C1: EXTRAH, // right harpoon with barb down
        0x21C2: EXTRAV, // down harpoon with barb right
        0x21C3: EXTRAV, // down harpoon with barb left
        0x21DA: EXTRAH, // left triple arrow
        0x21DB: EXTRAH, // right triple arrow
        0x23B4: EXTRAH, // top square bracket
        0x23B5: EXTRAH, // bottom square bracket
        0x23DC: EXTRAH, // top paren
        0x23DD: EXTRAH, // bottom paren
        0x23E0: EXTRAH, // top tortoise shell
        0x23E1: EXTRAH, // bottom tortoise shell
        0x2906: EXTRAH, // leftwards double arrow from bar
        0x2907: EXTRAH, // rightwards double arrow from bar
        0x294E: EXTRAH, // left barb up right barb up harpoon
        0x294F: EXTRAV, // up barb right down barb right harpoon
        0x2950: EXTRAH, // left barb dow right barb down harpoon
        0x2951: EXTRAV, // up barb left down barb left harpoon
        0x295A: EXTRAH, // leftwards harpoon with barb up from bar
        0x295B: EXTRAH, // rightwards harpoon with barb up from bar
        0x295C: EXTRAV, // up harpoon with barb right from bar
        0x295D: EXTRAV, // down harpoon with barb right from bar
        0x295E: EXTRAH, // leftwards harpoon with barb down from bar
        0x295F: EXTRAH, // rightwards harpoon with barb down from bar
        0x2960: EXTRAV, // up harpoon with barb left from bar
        0x2961: EXTRAV, // down harpoon with barb left from bar
        0x27F5: {alias: 0x2190, dir:H}, // long left arrow
        0x27F6: {alias: 0x2192, dir:H}, // long right arrow
        0x27F7: {alias: 0x2194, dir:H}, // long left-right arrow
        0x27F8: {alias: 0x21D0, dir:H}, // long left double arrow
        0x27F9: {alias: 0x21D2, dir:H}, // long right double arrow
        0x27FA: {alias: 0x21D4, dir:H}, // long left-right double arrow
        0x27FB: {alias: 0x21A4, dir:H}, // long left arrow from bar
        0x27FC: {alias: 0x21A6, dir:H}, // long right arrow from bar
        0x27FD: {alias: 0x2906, dir:H}, // long left double arrow from bar
        0x27FE: {alias: 0x2907, dir:H}, // long right double arrow from bar

        0x02C7: EXTRAH, // caron
        0x02CD: EXTRAH, // low macron
        0x02F7: EXTRAH, // low tilde
        0x219F: EXTRAV, // upwards two headed arrow
        0x21A1: EXTRAV, // downwards two headed arrow
        0x21A8: EXTRAV, // up down arrow with base
        0x21A9: EXTRAH, // left hook arrow
        0x21AA: EXTRAH, // right hook arrow
        0x21B2: EXTRAV, // down arrow with tip left
        0x21B3: EXTRAV, // down arrow with tip right
        0x21B4: EXTRAH, // right arrow with corner down
        0x21B5: EXTRAV, // down arrow with corner left
        0x21CB: EXTRAH, // left harpoon over right harpoon
        0x21CC: EXTRAH, // right harpoon over left harpoon
        0x21E0: EXTRAH, // left dashed arrow
        0x21E1: EXTRAV, // up dashed arrow
        0x21E2: EXTRAH, // right dashed arrow
        0x21E3: EXTRAV, // down dahsed arrow
        0x21E4: EXTRAH, // left arrow to bar
        0x21E5: EXTRAH, // right arrow to bar
        0x21FD: EXTRAH, // left open-headed arrow
        0x21FE: EXTRAH, // right open-headed arrow
        0x21FF: EXTRAH, // left right open-headed arrow
        0x27E6: EXTRAV, // left white square bracket
        0x27E7: EXTRAV, // right white square bracket
        0x27EA: EXTRAV, // left double angle bracket
        0x27EB: EXTRAV, // right double angle bracket
        0x290A: EXTRAV, // up triple arrow
        0x290B: EXTRAV, // down triple arrow
        0x2912: EXTRAV, // up arrow to bar
        0x2913: EXTRAV, // down arrow to bar
        0x2952: EXTRAH, // left harpoon with barb up to bar
        0x2953: EXTRAH, // right harpoon with barb up to bar
        0x2954: EXTRAV, // up harpoon with barb right to bar
        0x2955: EXTRAV, // down harpoon with barb right to bar
        0x2956: EXTRAH, // left harpoon with barb down to bar
        0x2957: EXTRAH, // right harpoon with barb down to bar
        0x2958: EXTRAV, // up harpoon with barb left to bar
        0x2959: EXTRAV, // down harpoon with barb left to bar
        0x2980: EXTRAV, // triple vertical bar
        0x2997: EXTRAV, // left balck tortoise shell
        0x2998: EXTRAV  // right balck tortoise shell
      }
    }
  });
  
  HTMLCSS.FONTDATA.FONTS['STIXGeneral'] = {
    directory: 'General/Regular',
    family: 'STIXGeneral',
    Ranges: [
      [0xA0,0xFF,"Latin1Supplement"],
      [0x100,0x17F,"LatinExtendedA"],
      [0x180,0x24F,"LatinExtendedB"],
      [0x250,0x2AF,"IPAExtensions"],
      [0x2B0,0x2FF,"SpacingModLetters"],
      [0x300,0x36F,"CombDiacritMarks"],
      [0x370,0x3FF,"GreekAndCoptic"],
      [0x400,0x4FF,"Cyrillic"],
      [0x1D00,0x1DBF,"PhoneticExtensions"],
      [0x1E00,0x1EFF,"LatinExtendedAdditional"],
      [0x2000,0x206F,"GeneralPunctuation"],
      [0x2070,0x209F,"SuperAndSubscripts"],
      [0x20A0,0x20CF,"CurrencySymbols"],
      [0x20D0,0x20FF,"CombDiactForSymbols"],
      [0x2100,0x214F,"LetterlikeSymbols"],
      [0x2150,0x218F,"NumberForms"],
      [0x2190,0x21FF,"Arrows"],
      [0x2200,0x22FF,"MathOperators"],
      [0x2300,0x23FF,"MiscTechnical"],
      [0x2400,0x243F,"ControlPictures"],
      [0x2460,0x24FF,"EnclosedAlphanum"],
      [0x2500,0x257F,"BoxDrawing"],
      [0x2580,0x259F,"BlockElements"],
      [0x25A0,0x25FF,"GeometricShapes"],
      [0x2600,0x26FF,"MiscSymbols"],
      [0x2700,0x27BF,"Dingbats"],
      [0x27C0,0x27EF,"MiscMathSymbolsA"],
      [0x27F0,0x27FF,"SupplementalArrowsA"],
      [0x2900,0x297F,"SupplementalArrowsB"],
      [0x2980,0x29FF,"MiscMathSymbolsB"],
      [0x2A00,0x2AFF,"SuppMathOperators"],
      [0x2B00,0x2BFF,"MiscSymbolsAndArrows"],
      [0x3000,0x303F,"CJK"],
      [0x3040,0x309F,"Hiragana"],
      [0xA720,0xA7FF,"LatinExtendedD"],
      [0xFB00,0xFB4F,"AlphaPresentForms"],
      [0xFFF0,0xFFFF,"Specials"],
      [0x1D400,0x1D433,"MathBold"],
      [0x1D434,0x1D467,"MathItalic"],
      [0x1D468,0x1D49B,"MathBoldItalic"],
      [0x1D49C,0x1D4CF,"MathScript"],
      [0x1D4D0,0x1D503,"MathBoldScript"],
      [0x1D504,0x1D537,"Fraktur"],
      [0x1D538,0x1D56B,"BBBold"],
      [0x1D56C,0x1D59F,"BoldFraktur"],
      [0x1D5A0,0x1D5D3,"MathSS"],
      [0x1D5D4,0x1D607,"MathSSBold"],
      [0x1D608,0x1D63B,"MathSSItalic"],
      [0x1D63C,0x1D66F,"MathSSItalicBold"],
      [0x1D670,0x1D6A3,"MathTT"],
      [0x1D6A4,0x1D6A5,"ij"],
      [0x1D6A8,0x1D6E1,"GreekBold"],
      [0x1D6E2,0x1D71B,"GreekItalic"],
      [0x1D71C,0x1D755,"GreekBoldItalic"],
      [0x1D756,0x1D78F,"GreekSSBold"],
      [0x1D790,0x1D7C9,"GreekSSBoldItalic"],
      [0x1D7CE,0x1D7D7,"MathBold"],
      [0x1D7D8,0x1D7E1,"BBBold"],
      [0x1D7E2,0x1D7EB,"MathSS"],
      [0x1D7EC,0x1D7F6,"MathSSBold"],
      [0x1D7F6,0x1D7FF,"MathTT"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x21: [676,9,333,130,236],         // EXCLAMATION MARK
    0x22: [676,-431,408,77,331],       // QUOTATION MARK
    0x23: [662,0,500,6,495],           // NUMBER SIGN
    0x24: [727,87,500,44,458],         // DOLLAR SIGN
    0x25: [706,19,747,61,686],         // PERCENT SIGN
    0x26: [676,13,778,42,750],         // AMPERSAND
    0x27: [676,-431,180,48,133],       // APOSTROPHE
    0x28: [676,177,333,48,304],        // LEFT PARENTHESIS
    0x29: [676,177,333,29,285],        // RIGHT PARENTHESIS
    0x2A: [676,-265,500,68,433],       // ASTERISK
    0x2B: [547,41,685,48,636],         // PLUS SIGN
    0x2C: [102,141,250,55,195],        // COMMA
    0x2D: [257,-194,333,39,285],       // HYPHEN-MINUS
    0x2E: [100,11,250,70,181],         // FULL STOP
    0x2F: [676,14,278,-9,287],         // SOLIDUS
    0x30: [676,14,500,24,476],         // DIGIT ZERO
    0x31: [676,0,500,111,394],         // DIGIT ONE
    0x32: [676,0,500,29,474],          // DIGIT TWO
    0x33: [676,14,500,41,431],         // DIGIT THREE
    0x34: [676,0,500,12,473],          // DIGIT FOUR
    0x35: [688,14,500,31,438],         // DIGIT FIVE
    0x36: [684,14,500,34,468],         // DIGIT SIX
    0x37: [662,8,500,20,449],          // DIGIT SEVEN
    0x38: [676,14,500,56,445],         // DIGIT EIGHT
    0x39: [676,22,500,30,459],         // DIGIT NINE
    0x3A: [459,11,278,81,192],         // COLON
    0x3B: [459,141,278,80,219],        // SEMICOLON
    0x3C: [534,24,685,56,621],         // LESS-THAN SIGN
    0x3D: [386,-120,685,48,637],       // EQUALS SIGN
    0x3E: [534,24,685,56,621],         // GREATER-THAN SIGN
    0x3F: [676,8,444,68,414],          // QUESTION MARK
    0x40: [676,14,921,116,809],        // COMMERCIAL AT
    0x41: [674,0,722,15,707],          // LATIN CAPITAL LETTER A
    0x42: [662,0,667,17,593],          // LATIN CAPITAL LETTER B
    0x43: [676,14,667,28,633],         // LATIN CAPITAL LETTER C
    0x44: [662,0,722,16,685],          // LATIN CAPITAL LETTER D
    0x45: [662,0,611,12,597],          // LATIN CAPITAL LETTER E
    0x46: [662,0,556,11,546],          // LATIN CAPITAL LETTER F
    0x47: [676,14,722,32,709],         // LATIN CAPITAL LETTER G
    0x48: [662,0,722,18,703],          // LATIN CAPITAL LETTER H
    0x49: [662,0,333,18,315],          // LATIN CAPITAL LETTER I
    0x4A: [662,14,373,-6,354],         // LATIN CAPITAL LETTER J
    0x4B: [662,0,722,33,723],          // LATIN CAPITAL LETTER K
    0x4C: [662,0,611,12,598],          // LATIN CAPITAL LETTER L
    0x4D: [662,0,889,12,864],          // LATIN CAPITAL LETTER M
    0x4E: [662,11,722,12,707],         // LATIN CAPITAL LETTER N
    0x4F: [676,14,722,34,688],         // LATIN CAPITAL LETTER O
    0x50: [662,0,557,16,542],          // LATIN CAPITAL LETTER P
    0x51: [676,177,722,34,701],        // LATIN CAPITAL LETTER Q
    0x52: [662,0,667,17,660],          // LATIN CAPITAL LETTER R
    0x53: [676,14,556,43,491],         // LATIN CAPITAL LETTER S
    0x54: [662,0,611,17,593],          // LATIN CAPITAL LETTER T
    0x55: [662,14,722,14,705],         // LATIN CAPITAL LETTER U
    0x56: [662,11,722,16,697],         // LATIN CAPITAL LETTER V
    0x57: [662,11,944,5,932],          // LATIN CAPITAL LETTER W
    0x58: [662,0,722,10,704],          // LATIN CAPITAL LETTER X
    0x59: [662,0,722,22,703],          // LATIN CAPITAL LETTER Y
    0x5A: [662,0,612,10,598],          // LATIN CAPITAL LETTER Z
    0x5B: [662,156,333,88,299],        // LEFT SQUARE BRACKET
    0x5C: [676,14,278,-9,287],         // REVERSE SOLIDUS
    0x5D: [662,156,333,34,245],        // RIGHT SQUARE BRACKET
    0x5E: [662,-297,469,24,446],       // CIRCUMFLEX ACCENT
    0x5F: [-75,125,500,0,500],         // LOW LINE
    0x60: [678,-507,333,18,242],       // GRAVE ACCENT
    0x61: [460,10,444,37,442],         // LATIN SMALL LETTER A
    0x62: [683,10,500,3,468],          // LATIN SMALL LETTER B
    0x63: [460,10,444,25,412],         // LATIN SMALL LETTER C
    0x64: [683,10,500,27,491],         // LATIN SMALL LETTER D
    0x65: [460,10,444,25,424],         // LATIN SMALL LETTER E
    0x66: [683,0,333,20,383],          // LATIN SMALL LETTER F
    0x67: [460,218,500,28,470],        // LATIN SMALL LETTER G
    0x68: [683,0,500,9,487],           // LATIN SMALL LETTER H
    0x69: [683,0,278,16,253],          // LATIN SMALL LETTER I
    0x6A: [683,218,278,-70,194],       // LATIN SMALL LETTER J
    0x6B: [683,0,500,7,505],           // LATIN SMALL LETTER K
    0x6C: [683,0,278,19,257],          // LATIN SMALL LETTER L
    0x6D: [460,0,778,16,775],          // LATIN SMALL LETTER M
    0x6E: [460,0,500,16,485],          // LATIN SMALL LETTER N
    0x6F: [460,10,500,29,470],         // LATIN SMALL LETTER O
    0x70: [460,217,500,5,470],         // LATIN SMALL LETTER P
    0x71: [460,217,500,24,488],        // LATIN SMALL LETTER Q
    0x72: [460,0,333,5,335],           // LATIN SMALL LETTER R
    0x73: [459,10,389,51,348],         // LATIN SMALL LETTER S
    0x74: [579,10,278,13,279],         // LATIN SMALL LETTER T
    0x75: [450,10,500,9,480],          // LATIN SMALL LETTER U
    0x76: [450,14,500,19,477],         // LATIN SMALL LETTER V
    0x77: [450,14,722,21,694],         // LATIN SMALL LETTER W
    0x78: [450,0,500,17,479],          // LATIN SMALL LETTER X
    0x79: [450,218,500,14,475],        // LATIN SMALL LETTER Y
    0x7A: [450,0,444,27,418],          // LATIN SMALL LETTER Z
    0x7B: [680,181,480,100,350],       // LEFT CURLY BRACKET
    0x7C: [676,14,200,67,133],         // VERTICAL LINE
    0x7D: [680,181,480,130,380],       // RIGHT CURLY BRACKET
    0x7E: [325,-183,541,40,502],       // TILDE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0xA8: [622,-523,333,18,316],       // DIAERESIS
    0xAC: [393,-115,600,48,552],       // NOT SIGN
    0xAF: [601,-547,333,11,322],       // MACRON
    0xB1: [502,87,685,48,637],         // PLUS-MINUS SIGN
    0xB7: [310,-199,250,70,181],       // MIDDLE DOT
    0xD7: [529,25,640,43,597],         // MULTIPLICATION SIGN
    0xF7: [516,10,564,30,534],         // DIVISION SIGN
    0x131: [460,0,278,16,253],         // LATIN SMALL LETTER DOTLESS I
    0x237: [460,218,278,-70,193],      // LATIN SMALL LETTER DOTLESS J
    0x2C6: [674,-507,333,11,322],      // MODIFIER LETTER CIRCUMFLEX ACCENT
    0x2C7: [674,-507,333,11,322],      // CARON
    0x2C9: [601,-547,334,11,322],      // MODIFIER LETTER MACRON
    0x2CA: [679,-509,333,93,320],      // MODIFIER LETTER ACUTE ACCENT
    0x2CB: [679,-509,333,22,249],      // MODIFIER LETTER GRAVE ACCENT
    0x2D8: [664,-507,335,27,308],      // BREVE
    0x2D9: [622,-523,333,118,217],     // DOT ABOVE
    0x2DC: [638,-532,333,1,331],       // SMALL TILDE
    0x300: [678,-507,0,-371,-147],     // COMBINING GRAVE ACCENT
    0x301: [678,-507,0,-371,-147],     // COMBINING ACUTE ACCENT
    0x302: [674,-507,0,-386,-75],      // COMBINING CIRCUMFLEX ACCENT
    0x303: [638,-532,0,-395,-65],      // COMBINING TILDE
    0x304: [601,-547,0,-385,-74],      // COMBINING MACRON
    0x306: [664,-507,0,-373,-92],      // COMBINING BREVE
    0x307: [622,-523,0,-280,-181],     // COMBINING DOT ABOVE
    0x308: [622,-523,0,-379,-81],      // COMBINING DIAERESIS
    0x30A: [711,-512,0,-329,-130],     // COMBINING RING ABOVE
    0x30B: [678,-507,0,-401,-22],      // COMBINING DOUBLE ACUTE ACCENT
    0x30C: [674,-507,0,-385,-74],      // COMBINING CARON
    0x338: [662,156,0,-380,31],        // COMBINING LONG SOLIDUS OVERLAY
    0x393: [662,0,587,11,577],         // GREEK CAPITAL LETTER GAMMA
    0x394: [674,0,722,48,675],         // GREEK CAPITAL LETTER DELTA
    0x398: [676,14,722,34,688],        // GREEK CAPITAL LETTER THETA
    0x39B: [674,0,702,15,687],         // GREEK CAPITAL LETTER LAMDA
    0x39E: [662,0,643,29,614],         // GREEK CAPITAL LETTER XI
    0x3A0: [662,0,722,18,703],         // GREEK CAPITAL LETTER PI
    0x3A3: [662,0,624,30,600],         // GREEK CAPITAL LETTER SIGMA
    0x3A5: [674,0,722,29,703],         // GREEK CAPITAL LETTER UPSILON
    0x3A6: [662,0,763,35,728],         // GREEK CAPITAL LETTER PHI
    0x3A8: [690,0,746,22,724],         // GREEK CAPITAL LETTER PSI
    0x3A9: [676,0,744,29,715],         // GREEK CAPITAL LETTER OMEGA
    0x2020: [676,149,500,59,442],      // DAGGER
    0x2021: [676,153,500,58,442],      // DOUBLE DAGGER
    0x2026: [100,11,1000,111,888],     // HORIZONTAL ELLIPSIS
    0x2032: [678,-402,289,75,214],     // PRIME
    0x203E: [820,-770,500,0,500],      // OVERLINE
    0x20D7: [760,-548,0,-453,-17],     // COMBINING RIGHT ARROW ABOVE
    0x2111: [695,34,762,45,711],       // BLACK-LETTER CAPITAL I
    0x2118: [547,217,826,52,799],      // SCRIPT CAPITAL P
    0x211C: [704,22,874,50,829],       // BLACK-LETTER CAPITAL R
    0x2135: [677,13,682,43,634],       // ALEF SYMBOL
    0x2190: [449,-58,926,71,857],      // LEFTWARDS ARROW
    0x2191: [662,156,511,60,451],      // UPWARDS ARROW
    0x2192: [448,-57,926,70,856],      // RIGHTWARDS ARROW
    0x2193: [662,156,511,60,451],      // DOWNWARDS ARROW
    0x2194: [449,-57,926,38,888],      // LEFT RIGHT ARROW
    0x2195: [730,224,511,60,451],      // UP DOWN ARROW
    0x2196: [662,156,926,70,856],      // NORTH WEST ARROW
    0x2197: [662,156,926,70,856],      // NORTH EAST ARROW
    0x2198: [662,156,926,70,856],      // SOUTH EAST ARROW
    0x2199: [662,156,926,70,856],      // SOUTH WEST ARROW
    0x21A6: [450,-57,926,70,857],      // RIGHTWARDS ARROW FROM BAR
    0x21A9: [553,-57,926,70,856],      // LEFTWARDS ARROW WITH HOOK
    0x21AA: [553,-57,926,70,856],      // RIGHTWARDS ARROW WITH HOOK
    0x21BC: [494,-220,955,54,901],     // LEFTWARDS HARPOON WITH BARB UPWARDS
    0x21BD: [286,-12,955,54,901],      // LEFTWARDS HARPOON WITH BARB DOWNWARDS
    0x21C0: [494,-220,955,54,901],     // RIGHTWARDS HARPOON WITH BARB UPWARDS
    0x21C1: [286,-12,955,54,901],      // RIGHTWARDS HARPOON WITH BARB DOWNWARDS
    0x21CC: [539,33,926,70,856],       // RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON
    0x21D0: [551,45,926,60,866],       // LEFTWARDS DOUBLE ARROW
    0x21D1: [662,156,685,45,641],      // UPWARDS DOUBLE ARROW
    0x21D2: [551,45,926,60,866],       // RIGHTWARDS DOUBLE ARROW
    0x21D3: [662,156,685,45,641],      // DOWNWARDS DOUBLE ARROW
    0x21D4: [517,10,926,20,906],       // LEFT RIGHT DOUBLE ARROW
    0x21D5: [730,224,685,45,641],      // UP DOWN DOUBLE ARROW
    0x2200: [662,0,560,2,558],         // FOR ALL
    0x2202: [668,11,471,40,471],       // PARTIAL DIFFERENTIAL
    0x2203: [662,0,560,73,487],        // THERE EXISTS
    0x2205: [583,79,762,50,712],       // EMPTY SET
    0x2207: [662,12,731,63,667],       // NABLA
    0x2208: [531,27,685,60,625],       // ELEMENT OF
    0x2209: [662,157,685,60,625],      // stix-negated (vert) set membership, variant
    0x220B: [531,27,685,60,625],       // CONTAINS AS MEMBER
    0x220F: [763,259,1000,52,948],     // N-ARY PRODUCT
    0x2210: [763,259,1000,52,948],     // N-ARY COPRODUCT
    0x2211: [763,259,914,58,856],      // N-ARY SUMMATION
    0x2212: [286,-220,685,64,621],     // MINUS SIGN
    0x2213: [502,87,685,48,637],       // MINUS-OR-PLUS SIGN
    0x2215: [710,222,523,46,478],      // DIVISION SLASH
    0x2216: [411,-93,428,25,403],      // SET MINUS
    0x2217: [471,-33,523,67,457],      // ASTERISK OPERATOR
    0x2218: [387,-117,350,40,310],     // RING OPERATOR
    0x2219: [387,-117,350,40,310],     // BULLET OPERATOR
    0x221A: [973,259,928,112,963],     // SQUARE ROOT
    0x221D: [430,0,685,41,643],        // PROPORTIONAL TO
    0x221E: [430,0,926,70,854],        // INFINITY
    0x2220: [547,0,685,23,643],        // ANGLE
    0x2223: [690,189,266,100,166],     // DIVIDES
    0x2225: [690,189,523,129,394],     // PARALLEL TO
    0x2227: [536,29,620,31,589],       // LOGICAL AND
    0x2228: [536,29,620,31,589],       // LOGICAL OR
    0x2229: [536,31,620,48,572],       // stix-intersection, serifs
    0x222A: [536,31,620,48,572],       // stix-union, serifs
    0x222B: [824,320,459,32,639],      // INTEGRAL
    0x223C: [362,-148,685,48,637],     // TILDE OPERATOR
    0x2240: [547,42,286,35,249],       // WREATH PRODUCT
    0x2243: [445,-55,685,48,637],      // ASYMPTOTICALLY EQUAL TO
    0x2245: [532,27,685,48,637],       // APPROXIMATELY EQUAL TO
    0x2248: [475,-25,685,48,637],      // ALMOST EQUAL TO
    0x224D: [498,-8,685,48,637],       // EQUIVALENT TO
    0x2250: [611,-120,685,48,637],     // APPROACHES THE LIMIT
    0x2260: [662,156,685,48,637],      // stix-not (vert) equals
    0x2261: [478,-28,685,48,637],      // IDENTICAL TO
    0x2264: [609,103,685,64,629],      // LESS-THAN OR EQUAL TO
    0x2265: [609,103,685,64,629],      // GREATER-THAN OR EQUAL TO
    0x226A: [532,26,933,25,908],       // MUCH LESS-THAN
    0x226B: [532,26,933,25,908],       // MUCH GREATER-THAN
    0x227A: [532,26,685,64,621],       // PRECEDES
    0x227B: [532,26,685,64,621],       // SUCCEEDS
    0x227C: [628,120,685,64,621],      // PRECEDES OR EQUAL TO
    0x227D: [629,119,685,64,621],      // SUCCEEDS OR EQUAL TO
    0x2282: [531,25,685,64,621],       // SUBSET OF
    0x2283: [531,25,685,64,621],       // SUPERSET OF
    0x2286: [607,103,685,64,621],      // SUBSET OF OR EQUAL TO
    0x2287: [607,103,685,64,621],      // SUPERSET OF OR EQUAL TO
    0x228E: [536,31,620,48,572],       // MULTISET UNION
    0x2291: [607,103,685,64,621],      // SQUARE IMAGE OF OR EQUAL TO
    0x2292: [607,103,685,64,621],      // SQUARE ORIGINAL OF OR EQUAL TO
    0x2293: [536,31,620,48,572],       // stix-square intersection, serifs
    0x2294: [536,31,620,48,572],       // stix-square union, serifs
    0x2295: [623,119,842,50,792],      // stix-circled plus (with rim)
    0x2296: [623,119,842,50,792],      // CIRCLED MINUS
    0x2297: [623,119,842,50,792],      // stix-circled times (with rim)
    0x2298: [623,119,842,50,792],      // CIRCLED DIVISION SLASH
    0x2299: [583,79,762,50,712],       // CIRCLED DOT OPERATOR
    0x22A2: [662,0,685,64,621],        // RIGHT TACK
    0x22A3: [662,0,685,64,621],        // LEFT TACK
    0x22A4: [662,0,685,48,637],        // DOWN TACK
    0x22A5: [662,0,685,48,637],        // UP TACK
    0x22A8: [662,0,685,64,621],        // TRUE
    0x22C0: [763,259,924,54,870],      // N-ARY LOGICAL AND
    0x22C1: [763,259,924,54,870],      // N-ARY LOGICAL OR
    0x22C2: [778,254,924,94,830],      // N-ARY INTERSECTION
    0x22C3: [768,264,924,94,830],      // N-ARY UNION
    0x22C4: [488,-16,523,26,497],      // DIAMOND OPERATOR
    0x22C5: [313,-193,286,83,203],     // DOT OPERATOR
    0x22C6: [597,13,700,35,665],       // STAR OPERATOR
    0x22C8: [582,80,810,54,756],       // BOWTIE
    0x22EE: [606,104,511,192,319],     // VERTICAL ELLIPSIS
    0x22EF: [316,-189,926,108,818],    // MIDLINE HORIZONTAL ELLIPSIS
    0x22F1: [520,18,926,194,732],      // DOWN RIGHT DIAGONAL ELLIPSIS
    0x2308: [713,213,469,188,447],     // LEFT CEILING
    0x2309: [713,213,469,27,286],      // RIGHT CEILING
    0x230A: [713,213,469,188,447],     // LEFT FLOOR
    0x230B: [713,213,469,27,286],      // RIGHT FLOOR
    0x2322: [360,-147,1019,54,965],    // stix-small down curve
    0x2323: [360,-147,1019,54,965],    // stix-small up curve
    0x23AF: [286,-220,315,0,315],      // HORIZONTAL LINE EXTENSION
    0x23D0: [405,-101,511,222,288],    // VERTICAL LINE EXTENSION (used to extend arrows)
    0x25B3: [811,127,1145,35,1110],    // WHITE UP-POINTING TRIANGLE
    0x25B9: [555,50,660,80,605],       // WHITE RIGHT-POINTING SMALL TRIANGLE
    0x25BD: [811,127,1145,35,1110],    // WHITE DOWN-POINTING TRIANGLE
    0x25C3: [554,51,660,55,580],       // WHITE LEFT-POINTING SMALL TRIANGLE
    0x25EF: [785,282,1207,70,1137],    // LARGE CIRCLE
    0x2660: [609,99,685,34,651],       // BLACK SPADE SUIT
    0x2661: [603,105,685,34,651],      // WHITE HEART SUIT
    0x2662: [609,105,685,41,643],      // WHITE DIAMOND SUIT
    0x2663: [603,99,685,34,651],       // BLACK CLUB SUIT
    0x266D: [768,10,426,57,346],       // MUSIC FLAT SIGN
    0x266E: [768,181,426,75,350],      // MUSIC NATURAL SIGN
    0x266F: [768,181,426,41,386],      // MUSIC SHARP SIGN
    0x27E8: [713,213,400,77,335],      // MATHEMATICAL LEFT ANGLE BRACKET
    0x27E9: [713,213,400,65,323],      // MATHEMATICAL RIGHT ANGLE BRACKET
    0x27EE: [676,177,233,56,211],      // MATHEMATICAL LEFT FLATTENED PARENTHESIS
    0x27EF: [676,177,233,22,177],      // MATHEMATICAL RIGHT FLATTENED PARENTHESIS
    0x27F5: [449,-58,1574,55,1519],    // LONG LEFTWARDS ARROW
    0x27F6: [449,-57,1574,55,1519],    // LONG RIGHTWARDS ARROW
    0x27F7: [449,-57,1574,55,1519],    // LONG LEFT RIGHT ARROW
    0x27F8: [551,45,1574,55,1519],     // LONG LEFTWARDS DOUBLE ARROW
    0x27F9: [551,45,1574,55,1519],     // LONG RIGHTWARDS DOUBLE ARROW
    0x27FA: [517,10,1574,55,1519],     // LONG LEFT RIGHT DOUBLE ARROW
    0x27FB: [450,-57,1574,55,1519],    // LONG LEFTWARDS ARROW FROM BAR
    0x27FC: [450,-57,1574,55,1519],    // LONG RIGHTWARDS ARROW FROM BAR
    0x29F5: [710,222,523,46,478],      // REVERSE SOLIDUS OPERATOR
    0x2A00: [763,259,1126,53,1073],    // N-ARY CIRCLED DOT OPERATOR
    0x2A01: [763,259,1126,53,1073],    // N-ARY CIRCLED PLUS OPERATOR
    0x2A02: [763,259,1126,53,1073],    // N-ARY CIRCLED TIMES OPERATOR
    0x2A03: [768,264,924,94,830],      // N-ARY UNION OPERATOR WITH DOT
    0x2A04: [768,264,924,94,830],      // N-ARY UNION OPERATOR WITH PLUS
    0x2A05: [763,259,924,94,830],      // N-ARY SQUARE INTERSECTION OPERATOR
    0x2A06: [763,259,924,94,830],      // N-ARY SQUARE UNION OPERATOR
    0x2A3F: [662,0,694,30,664],        // AMALGAMATION OR COPRODUCT
    0x2AAF: [609,103,685,64,621],      // PRECEDES ABOVE SINGLE-LINE EQUALS SIGN
    0x2AB0: [609,103,685,64,621]       // SUCCEEDS ABOVE SINGLE-LINE EQUALS SIGN
  };

  HTMLCSS.FONTDATA.FONTS['STIXGeneral-bold'] = {
    directory: 'General/Bold',
    family: 'STIXGeneral',
    weight: 'bold',
    Ranges: [
      [0xA0,0xFF,"Latin1Supplement"],
      [0x100,0x17F,"LatinExtendedA"],
      [0x180,0x24F,"LatinExtendedB"],
      [0x250,0x2AF,"IPAExtensions"],
      [0x2B0,0x2FF,"SpacingModLetters"],
      [0x300,0x36F,"CombDiacritMarks"],
      [0x370,0x3FF,"GreekAndCoptic"],
      [0x400,0x4FF,"Cyrillic"],
      [0x1D00,0x1DBF,"PhoneticExtensions"],
      [0x1E00,0x1EFF,"LatinExtendedAdditional"],
      [0x2000,0x206F,"GeneralPunctuation"],
      [0x2070,0x209F,"SuperAndSubscripts"],
      [0x20A0,0x20CF,"CurrencySymbols"],
      [0x20D0,0x20FF,"CombDiactForSymbols"],
      [0x2100,0x214F,"LetterlikeSymbols"],
      [0x2150,0x218F,"NumberForms"],
      [0x2190,0x21FF,"Arrows"],
      [0x2200,0x22FF,"MathOperators"],
      [0x2300,0x23FF,"MiscTechnical"],
      [0x2400,0x243F,"ControlPictures"],
      [0x2460,0x24FF,"EnclosedAlphanum"],
      [0x2500,0x257F,"BoxDrawing"],
      [0x25A0,0x25FF,"GeometricShapes"],
      [0x2600,0x26FF,"MiscSymbols"],
      [0x27C0,0x27EF,"MiscMathSymbolsA"],
      [0x2980,0x29FF,"MiscMathSymbolsB"],
      [0x2A00,0x2AFF,"SuppMathOperators"],
      [0xA720,0xA7FF,"LatinExtendedD"],
      [0xFB00,0xFB4F,"AlphaPresentForms"],
      [0x1D400,0x1D433,"MathBold"],
      [0x1D538,0x1D56B,"BBBold"],
      [0x1D56C,0x1D59F,"BoldFraktur"],
      [0x1D5D4,0x1D607,"MathSSBold"],
      [0x1D6A8,0x1D6E1,"GreekBold"],
      [0x1D756,0x1D78F,"GreekSSBold"],
      [0x1D7CE,0x1D7D7,"MathBold"],
      [0x1D7EC,0x1D7F6,"MathSSBold"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x21: [691,13,333,81,251],         // EXCLAMATION MARK
    0x22: [691,-404,555,83,472],       // QUOTATION MARK
    0x23: [700,0,500,5,495],           // NUMBER SIGN
    0x24: [750,99,500,29,472],         // DOLLAR SIGN
    0x25: [706,29,749,61,688],         // PERCENT SIGN
    0x26: [691,16,833,62,789],         // AMPERSAND
    0x27: [691,-404,278,75,204],       // APOSTROPHE
    0x28: [694,168,333,46,306],        // LEFT PARENTHESIS
    0x29: [694,168,333,27,287],        // RIGHT PARENTHESIS
    0x2A: [691,-255,500,56,448],       // ASTERISK
    0x2B: [563,57,750,65,685],         // PLUS SIGN
    0x2C: [155,180,250,39,223],        // COMMA
    0x2D: [287,-171,333,44,287],       // HYPHEN-MINUS
    0x2E: [156,13,250,41,210],         // FULL STOP
    0x2F: [691,19,278,-24,302],        // SOLIDUS
    0x30: [688,13,500,24,476],         // DIGIT ZERO
    0x31: [688,0,500,65,441],          // DIGIT ONE
    0x32: [688,0,500,17,478],          // DIGIT TWO
    0x33: [688,14,500,16,468],         // DIGIT THREE
    0x34: [688,0,500,19,476],          // DIGIT FOUR
    0x35: [676,8,500,22,470],          // DIGIT FIVE
    0x36: [688,13,500,28,475],         // DIGIT SIX
    0x37: [676,0,500,17,477],          // DIGIT SEVEN
    0x38: [688,13,500,28,472],         // DIGIT EIGHT
    0x39: [688,13,500,26,473],         // DIGIT NINE
    0x3A: [472,13,333,82,251],         // COLON
    0x3B: [472,180,333,82,266],        // SEMICOLON
    0x3C: [534,24,750,80,670],         // LESS-THAN SIGN
    0x3D: [399,-107,750,68,682],       // EQUALS SIGN
    0x3E: [534,24,750,80,670],         // GREATER-THAN SIGN
    0x3F: [689,13,500,57,445],         // QUESTION MARK
    0x40: [691,19,930,108,822],        // COMMERCIAL AT
    0x41: [690,0,722,9,689],           // LATIN CAPITAL LETTER A
    0x42: [676,0,667,16,619],          // LATIN CAPITAL LETTER B
    0x43: [691,19,722,49,687],         // LATIN CAPITAL LETTER C
    0x44: [676,0,722,14,690],          // LATIN CAPITAL LETTER D
    0x45: [676,0,667,16,641],          // LATIN CAPITAL LETTER E
    0x46: [676,0,611,16,583],          // LATIN CAPITAL LETTER F
    0x47: [691,19,778,37,755],         // LATIN CAPITAL LETTER G
    0x48: [676,0,778,21,759],          // LATIN CAPITAL LETTER H
    0x49: [676,0,389,20,370],          // LATIN CAPITAL LETTER I
    0x4A: [676,96,500,3,478],          // LATIN CAPITAL LETTER J
    0x4B: [676,0,778,30,769],          // LATIN CAPITAL LETTER K
    0x4C: [677,0,667,19,638],          // LATIN CAPITAL LETTER L
    0x4D: [676,0,944,14,921],          // LATIN CAPITAL LETTER M
    0x4E: [676,18,722,16,701],         // LATIN CAPITAL LETTER N
    0x4F: [691,19,778,35,743],         // LATIN CAPITAL LETTER O
    0x50: [676,0,611,16,600],          // LATIN CAPITAL LETTER P
    0x51: [691,176,778,35,743],        // LATIN CAPITAL LETTER Q
    0x52: [676,0,722,26,716],          // LATIN CAPITAL LETTER R
    0x53: [692,19,556,35,513],         // LATIN CAPITAL LETTER S
    0x54: [676,0,667,31,636],          // LATIN CAPITAL LETTER T
    0x55: [676,19,722,16,701],         // LATIN CAPITAL LETTER U
    0x56: [676,18,722,16,701],         // LATIN CAPITAL LETTER V
    0x57: [676,15,1000,19,981],        // LATIN CAPITAL LETTER W
    0x58: [676,0,722,16,699],          // LATIN CAPITAL LETTER X
    0x59: [676,0,722,15,699],          // LATIN CAPITAL LETTER Y
    0x5A: [676,0,667,28,634],          // LATIN CAPITAL LETTER Z
    0x5B: [678,149,333,67,301],        // LEFT SQUARE BRACKET
    0x5C: [691,19,278,-25,303],        // REVERSE SOLIDUS
    0x5D: [678,149,333,32,266],        // RIGHT SQUARE BRACKET
    0x5E: [676,-311,581,73,509],       // CIRCUMFLEX ACCENT
    0x5F: [-75,125,500,0,500],         // LOW LINE
    0x60: [713,-528,333,8,246],        // GRAVE ACCENT
    0x61: [473,14,500,25,488],         // LATIN SMALL LETTER A
    0x62: [676,14,556,17,521],         // LATIN SMALL LETTER B
    0x63: [473,14,444,25,430],         // LATIN SMALL LETTER C
    0x64: [676,14,556,25,534],         // LATIN SMALL LETTER D
    0x65: [473,14,444,25,427],         // LATIN SMALL LETTER E
    0x66: [691,0,333,14,389],          // LATIN SMALL LETTER F
    0x67: [473,206,500,28,483],        // LATIN SMALL LETTER G
    0x68: [676,0,556,15,534],          // LATIN SMALL LETTER H
    0x69: [691,0,278,15,256],          // LATIN SMALL LETTER I
    0x6A: [691,203,333,-57,263],       // LATIN SMALL LETTER J
    0x6B: [676,0,556,22,543],          // LATIN SMALL LETTER K
    0x6C: [676,0,278,15,256],          // LATIN SMALL LETTER L
    0x6D: [473,0,833,15,814],          // LATIN SMALL LETTER M
    0x6E: [473,0,556,21,539],          // LATIN SMALL LETTER N
    0x6F: [473,14,500,25,476],         // LATIN SMALL LETTER O
    0x70: [473,205,556,19,524],        // LATIN SMALL LETTER P
    0x71: [473,205,556,34,536],        // LATIN SMALL LETTER Q
    0x72: [473,0,444,28,434],          // LATIN SMALL LETTER R
    0x73: [473,14,389,25,361],         // LATIN SMALL LETTER S
    0x74: [630,12,333,19,332],         // LATIN SMALL LETTER T
    0x75: [461,14,556,16,538],         // LATIN SMALL LETTER U
    0x76: [461,14,500,21,485],         // LATIN SMALL LETTER V
    0x77: [461,14,722,23,707],         // LATIN SMALL LETTER W
    0x78: [461,0,500,12,484],          // LATIN SMALL LETTER X
    0x79: [461,205,500,16,482],        // LATIN SMALL LETTER Y
    0x7A: [461,0,444,21,420],          // LATIN SMALL LETTER Z
    0x7B: [698,175,394,22,340],        // LEFT CURLY BRACKET
    0x7C: [691,19,220,66,154],         // VERTICAL LINE
    0x7D: [698,175,394,54,372],        // RIGHT CURLY BRACKET
    0x7E: [333,-173,520,29,491],       // TILDE
    0x393: [676,0,620,16,593],         // GREEK CAPITAL LETTER GAMMA
    0x394: [690,0,722,33,673],         // GREEK CAPITAL LETTER DELTA
    0x398: [692,18,778,35,743],        // GREEK CAPITAL LETTER THETA
    0x39B: [690,0,707,9,674],          // GREEK CAPITAL LETTER LAMDA
    0x39E: [676,0,647,40,607],         // GREEK CAPITAL LETTER XI
    0x3A0: [676,0,778,21,759],         // GREEK CAPITAL LETTER PI
    0x3A3: [676,0,671,28,641],         // GREEK CAPITAL LETTER SIGMA
    0x3A5: [692,0,703,7,693],          // GREEK CAPITAL LETTER UPSILON
    0x3A6: [676,0,836,18,818],         // GREEK CAPITAL LETTER PHI
    0x3A8: [692,0,808,15,797],         // GREEK CAPITAL LETTER PSI
    0x3A9: [692,0,768,28,740]          // GREEK CAPITAL LETTER OMEGA
  };

  HTMLCSS.FONTDATA.FONTS['STIXGeneral-italic'] = {
    directory: 'General/Italic',
    family: 'STIXGeneral',
    style: 'italic',
    Ranges: [
      [0xA0,0xFF,"Latin1Supplement"],
      [0x100,0x17F,"LatinExtendedA"],
      [0x180,0x24F,"LatinExtendedB"],
      [0x250,0x2AF,"IPAExtensions"],
      [0x2B0,0x2FF,"SpacingModLetters"],
      [0x370,0x3FF,"GreekAndCoptic"],
      [0x400,0x4FF,"Cyrillic"],
      [0x1E00,0x1EFF,"LatinExtendedAdditional"],
      [0x2000,0x206F,"GeneralPunctuation"],
      [0x20A0,0x20CF,"CurrencySymbols"],
      [0x20D0,0x20FF,"CombDiactForSymbols"],
      [0x2100,0x214F,"LetterlikeSymbols"],
      [0x2200,0x22FF,"MathOperators"],
      [0x2400,0x243F,"ControlPictures"],
      [0x2460,0x24FF,"EnclosedAlphanum"],
      [0x2500,0x257F,"BoxDrawing"],
      [0xFB00,0xFB4F,"AlphaPresentForms"],
      [0x1D434,0x1D467,"MathItalic"],
      [0x1D49C,0x1D4CF,"MathScript"],
      [0x1D608,0x1D63B,"MathSSItalic"],
      [0x1D6A4,0x1D6A5,"ij"],
      [0x1D6E2,0x1D71B,"GreekItalic"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x21: [667,11,333,39,304],         // EXCLAMATION MARK
    0x22: [666,-421,420,144,432],      // QUOTATION MARK
    0x23: [676,0,501,2,540],           // NUMBER SIGN
    0x24: [731,89,500,32,497],         // DOLLAR SIGN
    0x25: [706,19,755,80,705],         // PERCENT SIGN
    0x26: [666,18,778,76,723],         // AMPERSAND
    0x27: [666,-421,214,132,241],      // APOSTROPHE
    0x28: [669,181,333,42,315],        // LEFT PARENTHESIS
    0x29: [669,180,333,16,289],        // RIGHT PARENTHESIS
    0x2A: [666,-255,500,128,492],      // ASTERISK
    0x2B: [506,0,675,86,590],          // PLUS SIGN
    0x2C: [101,129,250,-5,135],        // COMMA
    0x2D: [255,-192,333,49,282],       // HYPHEN-MINUS
    0x2E: [100,11,250,27,138],         // FULL STOP
    0x2F: [666,18,278,-65,386],        // SOLIDUS
    0x30: [676,7,500,32,497],          // DIGIT ZERO
    0x31: [676,0,500,50,409],          // DIGIT ONE
    0x32: [676,0,500,12,452],          // DIGIT TWO
    0x33: [676,7,500,16,465],          // DIGIT THREE
    0x34: [676,0,500,1,479],           // DIGIT FOUR
    0x35: [666,7,500,15,491],          // DIGIT FIVE
    0x36: [686,7,500,30,521],          // DIGIT SIX
    0x37: [666,8,500,75,537],          // DIGIT SEVEN
    0x38: [676,7,500,30,493],          // DIGIT EIGHT
    0x39: [676,17,500,23,492],         // DIGIT NINE
    0x3A: [441,11,333,50,261],         // COLON
    0x3B: [441,129,333,26,261],        // SEMICOLON
    0x3C: [516,10,675,84,592],         // LESS-THAN SIGN
    0x3D: [386,-120,675,86,590],       // EQUALS SIGN
    0x3E: [516,10,675,84,592],         // GREATER-THAN SIGN
    0x3F: [664,12,500,132,472],        // QUESTION MARK
    0x40: [666,18,920,118,806],        // COMMERCIAL AT
    0x41: [668,0,611,-51,564],         // LATIN CAPITAL LETTER A
    0x42: [653,0,611,-8,588],          // LATIN CAPITAL LETTER B
    0x43: [666,18,667,66,689],         // LATIN CAPITAL LETTER C
    0x44: [653,0,722,-8,700],          // LATIN CAPITAL LETTER D
    0x45: [653,0,611,-1,634],          // LATIN CAPITAL LETTER E
    0x46: [653,0,611,8,645],           // LATIN CAPITAL LETTER F
    0x47: [666,18,722,52,722],         // LATIN CAPITAL LETTER G
    0x48: [653,0,722,-8,769],          // LATIN CAPITAL LETTER H
    0x49: [653,0,333,-8,384],          // LATIN CAPITAL LETTER I
    0x4A: [653,18,444,-6,491],         // LATIN CAPITAL LETTER J
    0x4B: [653,0,667,7,722],           // LATIN CAPITAL LETTER K
    0x4C: [653,0,556,-8,559],          // LATIN CAPITAL LETTER L
    0x4D: [653,0,833,-18,872],         // LATIN CAPITAL LETTER M
    0x4E: [653,15,667,-20,727],        // LATIN CAPITAL LETTER N
    0x4F: [667,18,722,60,699],         // LATIN CAPITAL LETTER O
    0x50: [653,0,611,0,605],           // LATIN CAPITAL LETTER P
    0x51: [666,182,722,59,699],        // LATIN CAPITAL LETTER Q
    0x52: [653,0,611,-13,588],         // LATIN CAPITAL LETTER R
    0x53: [667,18,500,17,508],         // LATIN CAPITAL LETTER S
    0x54: [653,0,556,59,633],          // LATIN CAPITAL LETTER T
    0x55: [653,18,722,102,765],        // LATIN CAPITAL LETTER U
    0x56: [653,18,611,76,688],         // LATIN CAPITAL LETTER V
    0x57: [653,18,833,71,906],         // LATIN CAPITAL LETTER W
    0x58: [653,0,611,-29,655],         // LATIN CAPITAL LETTER X
    0x59: [653,0,556,78,633],          // LATIN CAPITAL LETTER Y
    0x5A: [653,0,556,-6,606],          // LATIN CAPITAL LETTER Z
    0x5B: [663,153,389,21,391],        // LEFT SQUARE BRACKET
    0x5C: [666,18,278,-41,319],        // REVERSE SOLIDUS
    0x5D: [663,153,389,12,382],        // RIGHT SQUARE BRACKET
    0x5E: [666,-301,422,0,422],        // CIRCUMFLEX ACCENT
    0x5F: [-75,125,500,0,500],         // LOW LINE
    0x60: [664,-492,333,120,311],      // GRAVE ACCENT
    0x61: [441,11,501,17,476],         // LATIN SMALL LETTER A
    0x62: [683,11,500,23,473],         // LATIN SMALL LETTER B
    0x63: [441,11,444,30,425],         // LATIN SMALL LETTER C
    0x64: [683,13,500,15,527],         // LATIN SMALL LETTER D
    0x65: [441,11,444,31,412],         // LATIN SMALL LETTER E
    0x66: [678,207,278,-147,424],      // LATIN SMALL LETTER F
    0x67: [441,206,500,8,471],         // LATIN SMALL LETTER G
    0x68: [683,9,500,19,478],          // LATIN SMALL LETTER H
    0x69: [654,11,278,49,264],         // LATIN SMALL LETTER I
    0x6A: [652,207,278,-124,279],      // LATIN SMALL LETTER J
    0x6B: [683,11,444,14,461],         // LATIN SMALL LETTER K
    0x6C: [683,11,278,41,279],         // LATIN SMALL LETTER L
    0x6D: [441,9,722,12,704],          // LATIN SMALL LETTER M
    0x6E: [441,9,500,14,474],          // LATIN SMALL LETTER N
    0x6F: [441,11,500,27,468],         // LATIN SMALL LETTER O
    0x70: [441,205,504,-75,472],       // LATIN SMALL LETTER P
    0x71: [441,209,500,25,484],        // LATIN SMALL LETTER Q
    0x72: [441,0,389,45,412],          // LATIN SMALL LETTER R
    0x73: [442,13,389,16,366],         // LATIN SMALL LETTER S
    0x74: [546,11,278,38,296],         // LATIN SMALL LETTER T
    0x75: [441,11,500,42,475],         // LATIN SMALL LETTER U
    0x76: [441,18,444,20,426],         // LATIN SMALL LETTER V
    0x77: [441,18,667,15,648],         // LATIN SMALL LETTER W
    0x78: [441,11,444,-27,447],        // LATIN SMALL LETTER X
    0x79: [441,206,444,-24,426],       // LATIN SMALL LETTER Y
    0x7A: [428,81,389,-2,380],         // LATIN SMALL LETTER Z
    0x7B: [687,177,400,51,407],        // LEFT CURLY BRACKET
    0x7C: [666,18,275,105,171],        // VERTICAL LINE
    0x7D: [687,177,400,-7,349],        // RIGHT CURLY BRACKET
    0x7E: [323,-183,541,40,502],       // TILDE
    0x131: [441,11,278,47,235],        // LATIN SMALL LETTER DOTLESS I
    0x237: [441,207,278,-124,246],     // LATIN SMALL LETTER DOTLESS J
    0x393: [653,0,611,8,645],          // GREEK CAPITAL LETTER GAMMA
    0x394: [668,0,611,-32,526],        // GREEK CAPITAL LETTER DELTA
    0x398: [667,18,722,60,699],        // GREEK CAPITAL LETTER THETA
    0x39B: [668,0,611,-51,564],        // GREEK CAPITAL LETTER LAMDA
    0x39E: [653,0,651,-6,680],         // GREEK CAPITAL LETTER XI
    0x3A0: [653,0,722,-8,769],         // GREEK CAPITAL LETTER PI
    0x3A3: [653,0,620,-6,659],         // GREEK CAPITAL LETTER SIGMA
    0x3A5: [668,0,556,78,648],         // GREEK CAPITAL LETTER UPSILON
    0x3A6: [653,0,741,50,731],         // GREEK CAPITAL LETTER PHI
    0x3A8: [667,0,675,77,778],         // GREEK CAPITAL LETTER PSI
    0x3A9: [666,0,762,-6,739],         // GREEK CAPITAL LETTER OMEGA
    0x3B1: [441,11,552,27,549],        // GREEK SMALL LETTER ALPHA
    0x3B2: [678,205,506,-40,514],      // GREEK SMALL LETTER BETA
    0x3B3: [435,206,410,19,438],       // GREEK SMALL LETTER GAMMA
    0x3B4: [668,11,460,24,460],        // GREEK SMALL LETTER DELTA
    0x3B5: [441,11,444,30,425],        // GREEK SMALL LETTER EPSILON
    0x3B6: [683,185,454,30,475],       // GREEK SMALL LETTER ZETA
    0x3B7: [441,205,474,14,442],       // GREEK SMALL LETTER ETA
    0x3B8: [678,11,480,27,494],        // GREEK SMALL LETTER THETA
    0x3B9: [441,11,278,49,235],        // GREEK SMALL LETTER IOTA
    0x3BA: [441,13,444,14,465],        // GREEK SMALL LETTER KAPPA
    0x3BB: [678,16,458,-12,431],       // GREEK SMALL LETTER LAMDA
    0x3BC: [428,205,526,-33,483],      // GREEK SMALL LETTER MU
    0x3BD: [441,18,470,20,459],        // GREEK SMALL LETTER NU
    0x3BE: [683,185,454,30,446],       // GREEK SMALL LETTER XI
    0x3BF: [441,11,500,27,468],        // GREEK SMALL LETTER OMICRON
    0x3C0: [428,18,504,19,536],        // GREEK SMALL LETTER PI
    0x3C1: [441,205,504,-40,471],      // GREEK SMALL LETTER RHO
    0x3C2: [441,185,454,30,453],       // GREEK SMALL LETTER FINAL SIGMA
    0x3C3: [428,11,498,27,531],        // GREEK SMALL LETTER SIGMA
    0x3C4: [428,11,410,12,426],        // GREEK SMALL LETTER TAU
    0x3C5: [441,10,478,19,446],        // GREEK SMALL LETTER UPSILON
    0x3C6: [441,205,622,27,590],       // GREEK SMALL LETTER PHI
    0x3C7: [441,207,457,-108,498],     // GREEK SMALL LETTER CHI
    0x3C8: [441,205,584,15,668],       // GREEK SMALL LETTER PSI
    0x3C9: [439,11,686,27,654],        // GREEK SMALL LETTER OMEGA
    0x3D1: [678,10,556,19,526],        // GREEK THETA SYMBOL
    0x3D5: [683,205,627,27,595],       // GREEK PHI SYMBOL
    0x3D6: [428,11,792,17,832],        // GREEK PI SYMBOL
    0x3F1: [441,205,516,27,484],       // GREEK RHO SYMBOL
    0x3F5: [441,11,444,30,420],        // GREEK LUNATE EPSILON SYMBOL
    0x2113: [687,11,579,48,571]        // SCRIPT SMALL L
  };

  HTMLCSS.FONTDATA.FONTS['STIXIntegralsD'] = {
    directory: 'IntegralsD/Regular',
    family: 'STIXIntegralsD',
    Ranges: [
      [0x20,0x20,"All"],
      [0xA0,0xA0,"All"],
      [0x222B,0x2233,"All"],
      [0x2A0B,0x2A1C,"All"]
    ],
    0x222B: [2000,269,585,56,1035],    // INTEGRAL
    0x222E: [2000,269,635,56,1035]     // CONTOUR INTEGRAL
  };

  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode'] = {
    directory: 'NonUnicode/Regular',
    family: 'STIXNonUnicode',
    Ranges: [
      [0x20,0x20,"All"],
      [0xA0,0xA0,"All"],
      [0xE000,0xF8FF,"PrivateUse"]
    ],
    0xE000: [610,25,1184,829,895],     // stix-radical symbol vertical extender
    0xE001: [667,-41,1184,829,1211],   // stix-radical symbol top corner piece
    0xE138: [634,-584,480,-10,490],    // stix-horizontal extender for multiple character over accent arrows, harpoons, line
    0xE139: [-127,177,480,-10,490],    // stix-horizontal extender for multiple character under accent arrows, harpoons, line
    0xE13B: [955,-512,897,-25,908],    // stix-left end of extensible overbrace (CMEX10 x3A rotated 90deg)
    0xE13C: [955,-512,897,-11,922],    // stix-right end of extensible overbrace (CMEX10 x38 rotated 90deg)
    0xE13D: [182,261,897,-25,908],     // stix-left end of extensible underbrace (CMEX10 x3B rotated 90deg)
    0xE13E: [182,261,897,-11,922],     // stix-right end of extensible underbrace (CMEX10 x39 rotated 90deg)
    0xE140: [1218,-820,1844,-10,1854], // stix-center of extensible overbrace (CMEX10 x3C rotated 90deg)
    0xE141: [-126,524,1844,-10,1854],  // stix-center of extensible underbrace (CMEX10 x3D rotated 90deg)
    0xE14A: [955,-820,633,-1,634],     // stix-extensible horizontal for over paren or square bracket (CMEX10 x42 rotated 90deg)
    0xE14B: [-126,261,633,-1,634],     // stix-extensible horizontal for under paren or square bracket (CMEX10 x43 rotated 90deg)
    0xE261: [422,10,523,41,481],       // stix-old style digit 0
    0xE265: [421,0,523,127,405],       // stix-old style digit 1
    0xE269: [421,0,523,68,455],        // stix-old style digit 2
    0xE26D: [424,198,523,47,463],      // stix-old style digit 3
    0xE271: [420,198,523,58,480],      // stix-old style digit 4
    0xE275: [421,198,523,66,457],      // stix-old style digit 5
    0xE279: [612,8,523,37,486],        // stix-old style digit 6
    0xE27D: [421,198,523,25,490],      // stix-old style digit 7
    0xE281: [606,12,523,47,477],       // stix-old style digit 8
    0xE285: [421,200,523,41,483],      // stix-old style digit 9
    0xE28F: [135,0,325,-1,326],        // stix-short horizontal extender at baseline
    0xE290: [135,0,633,-1,634]         // stix-long horizontal extender at baseline
  };

  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode-bold'] = {
    directory: 'NonUnicode/Bold',
    family: 'STIXNonUnicode',
    weight: 'bold',
    Ranges: [
      [0x20,0x20,"All"],
      [0xA0,0xA0,"All"],
      [0xE000,0xF8FF,"PrivateUse"]
    ]
  
  };

  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode-italic'] = {
    directory: 'NonUnicode/Italic',
    family: 'STIXNonUnicode',
    style: 'italic',
    Ranges: [
      [0x20,0x20,"All"],
      [0xA0,0xA0,"All"],
      [0xE000,0xF8FF,"PrivateUse"]
    ],
    0xE22D: [677,45,852,43,812],       // stix-mathematical calligraphic capital A
    0xE22E: [670,3,724,35,709],        // stix-mathematical calligraphic capital B
    0xE22F: [671,11,569,43,586],       // stix-mathematical calligraphic capital C
    0xE230: [662,0,801,34,788],        // stix-mathematical calligraphic capital D
    0xE231: [670,4,553,40,599],        // stix-mathematical calligraphic capital E
    0xE232: [662,0,652,43,710],        // stix-mathematical calligraphic capital F
    0xE233: [671,131,580,40,580],      // stix-mathematical calligraphic capital G
    0xE234: [664,21,831,41,845],       // stix-mathematical calligraphic capital H
    0xE235: [662,0,575,38,591],        // stix-mathematical calligraphic capital I
    0xE236: [662,120,632,31,785],      // stix-mathematical calligraphic capital J
    0xE237: [670,13,809,30,783],       // stix-mathematical calligraphic capital K
    0xE238: [670,7,693,30,653],        // stix-mathematical calligraphic capital L
    0xE239: [671,45,1166,40,1128],     // stix-mathematical calligraphic capital M
    0xE23A: [795,37,957,40,1064],      // stix-mathematical calligraphic capital N
    0xE23B: [669,10,737,38,729],       // stix-mathematical calligraphic capital O
    0xE23C: [662,0,667,38,709],        // stix-mathematical calligraphic capital P
    0xE23D: [671,131,744,43,704],      // stix-mathematical calligraphic capital Q
    0xE23E: [662,3,854,38,816],        // stix-mathematical calligraphic capital R
    0xE23F: [671,0,634,38,671],        // stix-mathematical calligraphic capital S
    0xE240: [721,0,509,41,730],        // stix-mathematical calligraphic capital T
    0xE241: [672,13,817,37,950],       // stix-mathematical calligraphic capital U
    0xE242: [677,33,638,33,680],       // stix-mathematical calligraphic capital V
    0xE243: [685,32,956,33,998],       // stix-mathematical calligraphic capital W
    0xE244: [672,13,692,38,739],       // stix-mathematical calligraphic capital X
    0xE245: [675,131,719,34,763],      // stix-mathematical calligraphic capital Y
    0xE246: [664,94,752,38,714]        // stix-mathematical calligraphic capital Z
  };

  HTMLCSS.FONTDATA.FONTS['STIXSizeOneSym'] = {
    directory: 'SizeOneSym/Regular',
    family: 'STIXSizeOneSym',
    Ranges: [
      [0x2B0,0x2FF,"All"],
      [0x300,0x338,"All"],
      [0x203E,0x203E,"All"],
      [0x20D0,0x20EF,"All"],
      [0x2140,0x2140,"All"],
      [0x221A,0x221C,"All"],
      [0x2320,0x2321,"All"],
      [0x239B,0x23B9,"All"],
      [0x23DC,0x23E1,"All"],
      [0x2772,0x2773,"All"],
      [0x27E6,0x27EB,"All"],
      [0x2983,0x2986,"All"],
      [0x29F8,0x29F9,"All"],
      [0x2A00,0x2A0A,"All"],
      [0x2AFC,0x2AFF,"All"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x28: [1066,164,468,139,382],      // LEFT PARENTHESIS
    0x29: [1066,164,468,86,329],       // RIGHT PARENTHESIS
    0x2F: [1066,164,579,25,552],       // SOLIDUS
    0x5B: [1066,164,383,180,363],      // LEFT SQUARE BRACKET
    0x5C: [1066,164,579,27,552],       // REVERSE SOLIDUS
    0x5D: [1066,164,383,20,203],       // RIGHT SQUARE BRACKET
    0x5F: [-127,177,1000,0,1000],      // LOW LINE
    0x7B: [1066,164,575,114,466],      // LEFT CURLY BRACKET
    0x7D: [1066,164,575,109,461],      // RIGHT CURLY BRACKET
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x302: [767,-554,0,-720,-160],     // COMBINING CIRCUMFLEX ACCENT
    0x303: [750,-598,0,-722,-162],     // COMBINING TILDE
    0x220F: [1500,-49,1355,50,1305],   // N-ARY PRODUCT
    0x2210: [1500,-49,1355,50,1305],   // N-ARY COPRODUCT
    0x2211: [1499,-49,1292,90,1202],   // N-ARY SUMMATION
    0x221A: [1552,295,1057,112,1089],  // SQUARE ROOT
    0x22C0: [1500,-49,1265,60,1205],   // N-ARY LOGICAL AND
    0x22C1: [1500,-49,1265,60,1205],   // N-ARY LOGICAL OR
    0x22C2: [1510,-49,1265,118,1147],  // N-ARY INTERSECTION
    0x22C3: [1500,-39,1265,118,1147],  // N-ARY UNION
    0x2308: [1066,164,453,180,426],    // LEFT CEILING
    0x2309: [1066,164,453,25,273],     // RIGHT CEILING
    0x230A: [1066,164,453,180,428],    // LEFT FLOOR
    0x230B: [1066,164,453,27,273],     // RIGHT FLOOR
    0x239B: [700,305,450,50,400],      // LEFT PARENTHESIS UPPER HOOK
    0x239C: [705,305,450,50,174],      // LEFT PARENTHESIS EXTENSION
    0x239D: [705,300,450,50,400],      // LEFT PARENTHESIS LOWER HOOK
    0x239E: [700,305,450,50,400],      // RIGHT PARENTHESIS UPPER HOOK
    0x239F: [705,305,450,276,400],     // RIGHT PARENTHESIS EXTENSION
    0x23A0: [705,300,450,50,400],      // RIGHT PARENTHESIS LOWER HOOK
    0x23A1: [682,323,450,50,415],      // LEFT SQUARE BRACKET UPPER CORNER
    0x23A2: [687,323,450,50,150],      // LEFT SQUARE BRACKET EXTENSION
    0x23A3: [687,318,450,50,415],      // LEFT SQUARE BRACKET LOWER CORNER
    0x23A4: [682,323,450,35,400],      // RIGHT SQUARE BRACKET UPPER CORNER
    0x23A5: [687,323,450,300,400],     // RIGHT SQUARE BRACKET EXTENSION
    0x23A6: [687,318,450,35,400],      // RIGHT SQUARE BRACKET LOWER CORNER
    0x23A7: [700,305,640,260,600],     // LEFT CURLY BRACKET UPPER HOOK
    0x23A8: [705,305,640,40,380],      // LEFT CURLY BRACKET MIDDLE PIECE
    0x23A9: [705,300,640,260,600],     // LEFT CURLY BRACKET LOWER HOOK
    0x23AA: [705,305,640,260,380],     // CURLY BRACKET EXTENSION
    0x23AB: [700,305,640,40,380],      // RIGHT CURLY BRACKET UPPER HOOK
    0x23AC: [705,305,640,260,600],     // RIGHT CURLY BRACKET MIDDLE PIECE
    0x23AD: [705,300,640,40,380],      // RIGHT CURLY BRACKET LOWER HOOK
    0x23AE: [610,25,688,294,394],      // INTEGRAL EXTENSION
    0x23B0: [700,301,600,35,566],      // UPPER LEFT OR LOWER RIGHT CURLY BRACKET SECTION
    0x23B1: [700,301,600,35,566],      // UPPER RIGHT OR LOWER LEFT CURLY BRACKET SECTION
    0x23B7: [1510,345,1184,112,895],   // RADICAL SYMBOL BOTTOM
    0x23B8: [1566,289,721,0,66],       // LEFT VERTICAL BOX LINE
    0x23B9: [1566,289,721,655,721],    // RIGHT VERTICAL BOX LINE
    0x23DE: [136,89,926,0,925],        // TOP CURLY BRACKET (mathematical use)
    0x23DF: [789,-564,926,0,925],      // BOTTOM CURLY BRACKET (mathematical use)
    0x27E8: [1066,164,578,116,462],    // MATHEMATICAL LEFT ANGLE BRACKET
    0x27E9: [1066,164,578,116,462],    // MATHEMATICAL RIGHT ANGLE BRACKET
    0x2A00: [1500,-49,1555,52,1503],   // N-ARY CIRCLED DOT OPERATOR
    0x2A01: [1500,-49,1555,52,1503],   // N-ARY CIRCLED PLUS OPERATOR
    0x2A02: [1500,-49,1555,52,1503],   // N-ARY CIRCLED TIMES OPERATOR
    0x2A04: [1500,-39,1265,118,1147],  // N-ARY UNION OPERATOR WITH PLUS
    0x2A05: [1500,-49,1153,82,1071],   // N-ARY SQUARE INTERSECTION OPERATOR
    0x2A06: [1500,-49,1153,82,1071]    // N-ARY SQUARE UNION OPERATOR
  };

  HTMLCSS.FONTDATA.FONTS['STIXSizeTwoSym'] = {
    directory: 'SizeTwoSym/Regular',
    family: 'STIXSizeTwoSym',
    Ranges: [
      [0x2B0,0x2FF,"All"],
      [0x300,0x338,"All"],
      [0x203E,0x203E,"All"],
      [0x20D0,0x20EF,"All"],
      [0x221A,0x221C,"All"],
      [0x239B,0x23B9,"All"],
      [0x23DC,0x23E1,"All"],
      [0x2772,0x2773,"All"],
      [0x27E6,0x27EB,"All"],
      [0x2983,0x2986,"All"],
      [0x2AFC,0x2AFF,"All"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x28: [1566,279,589,139,503],      // LEFT PARENTHESIS
    0x29: [1566,279,608,114,478],      // RIGHT PARENTHESIS
    0x2F: [1566,279,806,25,781],       // SOLIDUS
    0x5B: [1566,279,459,190,422],      // LEFT SQUARE BRACKET
    0x5C: [1566,279,806,25,781],       // REVERSE SOLIDUS
    0x5D: [1566,279,459,37,269],       // RIGHT SQUARE BRACKET
    0x5F: [-127,177,1500,0,1500],      // LOW LINE
    0x7B: [1566,279,717,124,531],      // LEFT CURLY BRACKET
    0x7D: [1566,279,717,186,593],      // RIGHT CURLY BRACKET
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x302: [777,-564,0,-1150,-171],    // COMBINING CIRCUMFLEX ACCENT
    0x303: [760,-608,0,-1152,-173],    // COMBINING TILDE
    0x221A: [2056,404,1124,110,1157],  // SQUARE ROOT
    0x2308: [1566,279,524,190,479],    // LEFT CEILING
    0x2309: [1566,279,526,47,336],     // RIGHT CEILING
    0x230A: [1566,279,524,190,479],    // LEFT FLOOR
    0x230B: [1566,279,526,47,336],     // RIGHT FLOOR
    0x23DE: [143,81,1460,0,1460],      // TOP CURLY BRACKET (mathematical use)
    0x23DF: [797,-573,1460,0,1460],    // BOTTOM CURLY BRACKET (mathematical use)
    0x27E8: [1566,279,622,95,531],     // MATHEMATICAL LEFT ANGLE BRACKET
    0x27E9: [1566,279,622,91,527]      // MATHEMATICAL RIGHT ANGLE BRACKET
  };

  HTMLCSS.FONTDATA.FONTS['STIXSizeThreeSym'] = {
    directory: 'SizeThreeSym/Regular',
    family: 'STIXSizeThreeSym',
    Ranges: [
      [0x2B0,0x2FF,"All"],
      [0x300,0x338,"All"],
      [0x203E,0x203E,"All"],
      [0x20D0,0x20EF,"All"],
      [0x221A,0x221C,"All"],
      [0x239B,0x23B9,"All"],
      [0x23DC,0x23E1,"All"],
      [0x2772,0x2773,"All"],
      [0x27E6,0x27EB,"All"],
      [0x2983,0x2986,"All"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x28: [2066,394,750,182,667],      // LEFT PARENTHESIS
    0x29: [2066,394,750,83,568],       // RIGHT PARENTHESIS
    0x2F: [2066,394,1101,30,1071],     // SOLIDUS
    0x5B: [2066,394,508,225,491],      // LEFT SQUARE BRACKET
    0x5C: [2066,394,1101,30,1071],     // REVERSE SOLIDUS
    0x5D: [2066,394,508,17,283],       // RIGHT SQUARE BRACKET
    0x5F: [-127,177,2000,0,2000],      // LOW LINE
    0x7B: [2066,394,906,143,717],      // LEFT CURLY BRACKET
    0x7D: [2066,394,906,189,763],      // RIGHT CURLY BRACKET
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x302: [777,-564,0,-1610,-150],    // COMBINING CIRCUMFLEX ACCENT
    0x303: [774,-608,0,-1612,-152],    // COMBINING TILDE
    0x221A: [2565,510,1076,112,1110],  // SQUARE ROOT
    0x2308: [2066,394,565,225,550],    // LEFT CEILING
    0x2309: [2066,394,565,15,340],     // RIGHT CEILING
    0x230A: [2066,394,565,225,550],    // LEFT FLOOR
    0x230B: [2066,394,565,15,340],     // RIGHT FLOOR
    0x23DE: [157,86,1886,0,1886],      // TOP CURLY BRACKET (mathematical use)
    0x23DF: [815,-572,1886,0,1886],    // BOTTOM CURLY BRACKET (mathematical use)
    0x27E8: [2066,394,765,96,670],     // MATHEMATICAL LEFT ANGLE BRACKET
    0x27E9: [2066,394,765,95,669]      // MATHEMATICAL RIGHT ANGLE BRACKET
  };

  HTMLCSS.FONTDATA.FONTS['STIXSizeFourSym'] = {
    directory: 'SizeFourSym/Regular',
    family: 'STIXSizeFourSym',
    Ranges: [
      [0x2B0,0x2FF,"All"],
      [0x300,0x338,"All"],
      [0x203E,0x203E,"All"],
      [0x20D0,0x20EF,"All"],
      [0x221A,0x221C,"All"],
      [0x239B,0x23B9,"All"],
      [0x23DC,0x23E1,"All"],
      [0x2772,0x2773,"All"],
      [0x27E6,0x27EB,"All"],
      [0x2983,0x2986,"All"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x28: [2566,509,808,124,732],      // LEFT PARENTHESIS
    0x29: [2566,509,808,76,684],       // RIGHT PARENTHESIS
    0x2F: [2566,509,1309,16,1293],     // SOLIDUS
    0x5B: [2566,509,661,295,634],      // LEFT SQUARE BRACKET
    0x5C: [2566,509,1309,16,1293],     // REVERSE SOLIDUS
    0x5D: [2566,509,661,27,366],       // RIGHT SQUARE BRACKET
    0x5F: [-127,177,2500,0,2500],      // LOW LINE
    0x7B: [2566,509,1076,173,882],     // LEFT CURLY BRACKET
    0x7D: [2566,509,1076,194,903],     // RIGHT CURLY BRACKET
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x302: [796,-573,0,-2040,-154],    // COMBINING CIRCUMFLEX ACCENT
    0x303: [771,-608,0,-2040,-154],    // COMBINING TILDE
    0x221A: [1510,345,1184,112,895],   // SQUARE ROOT
    0x2308: [2566,509,682,295,655],    // LEFT CEILING
    0x2309: [2566,509,682,27,387],     // RIGHT CEILING
    0x230A: [2566,509,682,295,655],    // LEFT FLOOR
    0x230B: [2566,509,682,27,387],     // RIGHT FLOOR
    0x23DE: [175,90,2328,0,2328],      // TOP CURLY BRACKET (mathematical use)
    0x23DF: [837,-572,2328,0,2328],    // BOTTOM CURLY BRACKET (mathematical use)
    0x27E8: [2566,509,908,113,796],    // MATHEMATICAL LEFT ANGLE BRACKET
    0x27E9: [2566,509,908,112,795]     // MATHEMATICAL RIGHT ANGLE BRACKET
  };

  HTMLCSS.FONTDATA.FONTS['STIXSizeFiveSym'] = {
    directory: 'SizeFiveSym/Regular',
    family: 'STIXSizeFiveSym',
    Ranges: [
      [0x2B0,0x2FF,"All"],
      [0x300,0x338,"All"],
      [0x203E,0x203E,"All"],
      [0x20D0,0x20EF,"All"],
      [0x239B,0x23B9,"All"],
      [0x23DC,0x23E1,"All"]
    ],
    0x20: [0,0,250,0,0],               // SPACE
    0x5F: [-127,177,3000,0,3000],      // LOW LINE
    0xA0: [0,0,250,0,0],               // NO-BREAK SPACE
    0x302: [816,-572,0,-2485,-157],    // COMBINING CIRCUMFLEX ACCENT
    0x303: [780,-617,0,-2485,-157],    // COMBINING TILDE
    0x23DE: [181,90,3238,0,3238],      // TOP CURLY BRACKET (mathematical use)
    0x23DF: [844,-573,3238,0,3238]     // BOTTOM CURLY BRACKET (mathematical use)
  };

  HTMLCSS.FONTDATA.FONTS['STIXVariants'] = {
    directory: 'Variants/Regular',
    family: 'STIXVariants',
    Ranges: [
      [0x20,0x20,"All"],
      [0x77,0x7C,"All"],
      [0xA0,0xA0,"All"],
      [0x19B,0x19B,"All"],
      [0x264,0x264,"All"],
      [0x2032,0x2057,"All"],
      [0x2140,0x2140,"All"],
      [0x2190,0x2193,"All"],
      [0x21D1,0x21E2,"All"],
      [0x2205,0x22ED,"All"],
      [0x2322,0x2323,"All"],
      [0x2423,0x2423,"All"],
      [0x25A9,0x25A9,"All"],
      [0x2A3C,0x2AEE,"All"]
    ],
    0x2032: [565,-28,340,44,295],      // PRIME
    0x210F: [683,10,579,47,547],       // stix-/hbar - Planck's over 2pi
    0x2205: [729,74,523,28,502],       // EMPTY SET
    0x2216: [710,222,523,46,478],      // SET MINUS
    0x221A: [943,11,737,67,767]        // SQUARE ROOT
  };

  HTMLCSS.FONTDATA.FONTS['STIXGeneral'][0x22EE][0] += 400;  // adjust height for \vdots
  HTMLCSS.FONTDATA.FONTS['STIXGeneral'][0x22F1][0] += 500;  // adjust height for \ddots
  HTMLCSS.FONTDATA.FONTS['STIXGeneral'][0x2212][1] += 100;  // adjust depth for minus (arrow extender)
  HTMLCSS.FONTDATA.FONTS['STIXGeneral'][0x003D][1] += 100;  // adjust depth for = (double arrow extender)
  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode'][0xE14A][0] += 200;  // adjust height for brace extender
  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode'][0xE14A][1] += 200;  // adjust depth for brace extender
  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode'][0xE14B][0] += 200;  // adjust height for brace extender
  HTMLCSS.FONTDATA.FONTS['STIXNonUnicode'][0xE14B][1] += 200;  // adjust depth for brace extender

  MathJax.Hub.Browser.Select({
    MSIE: function (browser) {
      if (!browser.versionAtLeast("8.0") || document.documentMode < 8) {
        var FONTDATA = HTMLCSS.FONTDATA;
        // MSIE Can't access the Spacing Modifier positions
        FONTDATA.REMAP[0x2C9] = 0xAF; // macron
        FONTDATA.REMAP[0x2CA] = 0xB4; // acute
        FONTDATA.REMAP[0x2CB] = 0x60; // grave
        FONTDATA.REMAP[0x2DA] = 0xB0; // ring above
        // MSIE can't access Greek block
        FONTDATA.RANGES[5] = FONTDATA.RANGES[4]; FONTDATA.RANGES[4] = FONTDATA.RANGES[3]
	FONTDATA.RANGES[3] = {name: "greek", low: 0x03B1, high: 0x03F6, offset: "GG",
	  remap: {0x03F5: 26, 0x03D1: 27, 0x03F0: 28, 0x03D5: 29, 0x03F1: 30, 0x03D6: 31}};
	FONTDATA.VARIANT["bold"].offsetGG = 0x1D6C2; FONTDATA.VARIANT["bold"].offsetG = 0x1D6A8;
	FONTDATA.VARIANT["italic"].offsetGG = 0x1D6FC; FONTDATA.VARIANT["italic"].offsetG = 0x1D6E2;
        FONTDATA.VARIANT["bold-italic"].offsetGG = 0x1D736; FONTDATA.VARIANT["bold-italic"].offsetG = 0x1D71C;
      }
    },
    Safari: function (browser) {
      browser.STIXfontBug = browser.versionAtLeast("5.1") && browser.isMac;
    },
    Chrome: function (browser) {
      if (browser.isMac) {
        var match = navigator.appVersion.match(/AppleWebKit\/(\d+)/);
        if (match && parseInt(match[1]) > 534) {browser.STIXfontBug = true}
      }
    }
  });
  
  //
  //  Fix WebKit problem with STIX fonts in OS X Lion
  //
  if (MathJax.Hub.Browser.STIXfontBug) {
    HTMLCSS.FONTDATA.FONTS["STIXGeneral"].family = "STIXGeneral-Regular";
    HTMLCSS.FONTDATA.FONTS["STIXGeneral-italic"].family = "STIXGeneral-Italic";
    delete HTMLCSS.FONTDATA.FONTS["STIXGeneral-italic"].style;
    HTMLCSS.FONTDATA.FONTS["STIXNonUnicode"].family = "STIXNonUnicode-Regular";
    HTMLCSS.FONTDATA.FONTS["STIXNonUnicode-italic"].family = "STIXNonUnicode-Italic";
    delete HTMLCSS.FONTDATA.FONTS["STIXNonUnicode-italic"].style;
  }
  
  //
  //  Check for STIX font version
  //
  var QUEUE = [];
  
  //
  //  Test for v1.1 rather than v1.0 (double-struck alphabet was moved from
  //  user-defined area in STIXNonUnicode to STIXGeneral math alphabet)
  //
  var DIV = HTMLCSS.Font.div;
  HTML.addElement(DIV,"span",
    {style:{display:"inline-block","font-family":"STIXNonUnicode","font-weight":"bold"}},
    ["\uE38C\uE38C\uE38C\uE38C\uE38C"]
  );
  HTML.addElement(DIV,"span",
    {style:{display:"inline-block","font-family":"STIXNonUnicode","font-weight":"bold"}},
    ["\uE39A\uE39A\uE39A\uE39A\uE39A"]
  );
  if (DIV.lastChild.previousSibling.offsetWidth < DIV.lastChild.offsetWidth)
    {QUEUE.push(["Require",MathJax.Ajax,HTMLCSS.fontDir+"/fontdata-1.0.js"])}
  DIV.removeChild(DIV.lastChild); DIV.removeChild(DIV.lastChild);

  //
  //  Text for 1.0-beta version (U+02C56 was added in 1.0)
  //
  if (!HTMLCSS.Font.testFont({family:"STIXSizeOneSym",testString:"\u02C6"}))
    {QUEUE.push(["Require",MathJax.Ajax,HTMLCSS.fontDir + "/fontdata-beta.js"])}
  
  //
  //  Load any patch files and then call loadComplete()
  //
  QUEUE.push(["loadComplete",MathJax.Ajax,HTMLCSS.fontDir + "/fontdata.js"]);
  MathJax.Callback.Queue.apply(MathJax.Callback,QUEUE);

})(MathJax.OutputJax["HTML-CSS"],MathJax.ElementJax.mml,MathJax.HTML);

