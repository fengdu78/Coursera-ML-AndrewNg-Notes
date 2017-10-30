/*************************************************************
 *
 *  MathJax/jax/input/TeX/jax.js
 *  
 *  Implements the TeX InputJax that reads mathematics in
 *  TeX and LaTeX format and converts it to the MML ElementJax
 *  internal format.
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

(function (TEX,HUB,AJAX) {
  var MML, NBSP = "\u00A0"; 
  
  var STACK = MathJax.Object.Subclass({
    Init: function (env,inner) {
      this.global = {isInner: inner};
      this.data = [STACKITEM.start(this.global)];
      if (env) {this.data[0].env = env}
      this.env = this.data[0].env;
    },
    Push: function () {
      var i, m, item, top;
      for (i = 0, m = arguments.length; i < m; i++) {
        item = arguments[i];
        if (item instanceof MML.mbase) {item = STACKITEM.mml(item)}
        item.global = this.global;
        top = (this.data.length ? this.Top().checkItem(item) : true);
        if (top instanceof Array) {this.Pop(); this.Push.apply(this,top)}
        else if (top instanceof STACKITEM) {this.Pop(); this.Push(top)}
        else if (top) {
          this.data.push(item);
          if (item.env) {
            for (var id in this.env)
              {if (this.env.hasOwnProperty(id)) {item.env[id] = this.env[id]}}
            this.env = item.env;
          } else {item.env = this.env}
        }
      }
    },
    Pop: function () {
      var item = this.data.pop(); if (!item.isOpen) {delete item.env}
      this.env = (this.data.length ? this.Top().env : {});
      return item;
    },
    Top: function (n) {
      if (n == null) {n = 1}
      if (this.data.length < n) {return null}
      return this.data[this.data.length-n];
    },
    Prev: function (noPop) {
      var top = this.Top();
      if (noPop) {return top.data[top.data.length-1]}
            else {return top.Pop()}
    },
    toString: function () {return "stack[\n  "+this.data.join("\n  ")+"\n]"}
  });
  
  var STACKITEM = STACK.Item = MathJax.Object.Subclass({
    type: "base",
    closeError: "Extra close brace or missing open brace",
    rightError: "Missing \\left or extra \\right",
    Init: function () {
      if (this.isOpen) {this.env = {}}
      this.data = [];
      this.Push.apply(this,arguments);
    },
    Push: function () {this.data.push.apply(this.data,arguments)},
    Pop: function () {return this.data.pop()},
    mmlData: function (inferred,forceRow) {
      if (inferred == null) {inferred = true}
      if (this.data.length === 1 && !forceRow) {return this.data[0]}
      return MML.mrow.apply(MML,this.data).With((inferred ? {inferred: true}: {}));
    },
    checkItem: function (item) {
      if (item.type === "over" && this.isOpen) {item.num = this.mmlData(false); this.data = []}
      if (item.type === "cell" && this.isOpen) {
        if (item.linebreak) {return false}
        TEX.Error("Misplaced "+item.name);
      }
      if (item.isClose && this[item.type+"Error"]) {TEX.Error(this[item.type+"Error"])}
      if (!item.isNotStack) {return true}
      this.Push(item.data[0]); return false;
    },
    With: function (def) {
      for (var id in def) {if (def.hasOwnProperty(id)) {this[id] = def[id]}}
      return this;
    },
    toString: function () {return this.type+"["+this.data.join("; ")+"]"}
  });

  STACKITEM.start = STACKITEM.Subclass({
    type: "start", isOpen: true,
    Init: function (global) {
      this.SUPER(arguments).Init.call(this);
      this.global = global;
    },
    checkItem: function (item) {
      if (item.type === "stop") {return STACKITEM.mml(this.mmlData())}
      return this.SUPER(arguments).checkItem.call(this,item);
    }
  });

  STACKITEM.stop = STACKITEM.Subclass({
    type: "stop", isClose: true
  });

  STACKITEM.open = STACKITEM.Subclass({
    type: "open", isOpen: true,
    stopError: "Extra open brace or missing close brace",
    checkItem: function (item) {
      if (item.type === "close") {
        var mml = this.mmlData(); // this.mmlData(true,true); // force row
        return STACKITEM.mml(MML.TeXAtom(mml)); // TeXAtom make it an ORD to prevent spacing (FIXME: should be another way)
      }
      return this.SUPER(arguments).checkItem.call(this,item);
    }
  });

  STACKITEM.close = STACKITEM.Subclass({
    type: "close", isClose: true
  });

  STACKITEM.prime = STACKITEM.Subclass({
    type: "prime",
    checkItem: function (item) {
      if (this.data[0].type !== "msubsup") 
        {return [MML.msup(this.data[0],this.data[1]),item]}
      this.data[0].SetData(this.data[0].sup,this.data[1]);
      return [this.data[0],item];
    }
  });
  
  STACKITEM.subsup = STACKITEM.Subclass({
    type: "subsup",
    stopError: "Missing superscript or subscript argument",
    checkItem: function (item) {
      var script = ["","subscript","superscript"][this.position];
      if (item.type === "open" || item.type === "left") {return true}
      if (item.type === "mml") {
        if (this.primes) {
          if (this.position !== 2) {this.data[0].SetData(2,this.primes)}
            else {item.data[0] = MML.mrow(this.primes.With({variantForm:true}),item.data[0])}
        }
        this.data[0].SetData(this.position,item.data[0]);
        return STACKITEM.mml(this.data[0]);
      }
      if (this.SUPER(arguments).checkItem.call(this,item))
        {TEX.Error("Missing open brace for "+script)}
    },
    Pop: function () {}
  });

  STACKITEM.over = STACKITEM.Subclass({
    type: "over", isClose: true, name: "\\over",
    checkItem: function (item,stack) {
      if (item.type === "over") {TEX.Error("Ambiguous use of "+item.name)}
      if (item.isClose) {
        var mml = MML.mfrac(this.num,this.mmlData(false));
        if (this.thickness != null) {mml.linethickness = this.thickness}
        if (this.open || this.close) {
          mml.texClass = MML.TEXCLASS.INNER;
          mml.texWithDelims = true;
          mml = MML.mfenced(mml).With({open: this.open, close: this.close});
        }
        return [STACKITEM.mml(mml), item];
      }
      return this.SUPER(arguments).checkItem.call(this,item);
    },
    toString: function () {return "over["+this.num+" / "+this.data.join("; ")+"]"}
  });

  STACKITEM.left = STACKITEM.Subclass({
    type: "left", isOpen: true, delim: '(',
    stopError: "Extra \\left or missing \\right",
    checkItem: function (item) {
      if (item.type === "right") {
        var mml = MML.mfenced(this.data.length === 1 ? this.data[0] : MML.mrow.apply(MML,this.data));
        return STACKITEM.mml(mml.With({open: this.delim, close: item.delim}));
      }
      return this.SUPER(arguments).checkItem.call(this,item);
    }
  });

  STACKITEM.right = STACKITEM.Subclass({
    type: "right", isClose: true, delim: ')'
  });

  STACKITEM.begin = STACKITEM.Subclass({
    type: "begin", isOpen: true,
    checkItem: function (item) {
      if (item.type === "end") {
        if (item.name !== this.name)
          {TEX.Error("\\begin{"+this.name+"} ended with \\end{"+item.name+"}")}
        if (!this.end) {return STACKITEM.mml(this.mmlData())}
        return this.parse[this.end].call(this.parse,this,this.data);
      }
      if (item.type === "stop") {TEX.Error("Missing \\end{"+this.name+"}")}
      return this.SUPER(arguments).checkItem.call(this,item);
    }
  });
  
  STACKITEM.end = STACKITEM.Subclass({
    type: "end", isClose: true
  });

  STACKITEM.style = STACKITEM.Subclass({
    type: "style",
    checkItem: function (item) {
      if (!item.isClose) {return this.SUPER(arguments).checkItem.call(this,item)}
      var mml = MML.mstyle.apply(MML,this.data).With(this.styles);
      return [STACKITEM.mml(mml),item];
    }
  });
  
  STACKITEM.position = STACKITEM.Subclass({
    type: "position",
    checkItem: function (item) {
      if (item.isClose) {TEX.Error("Missing box for "+this.name)}
      if (item.isNotStack) {
        var mml = item.mmlData();
        switch (this.move) {
         case 'vertical':
          mml = MML.mpadded(mml).With({height: this.dh, depth: this.dd, voffset: this.dh});
          return [STACKITEM.mml(mml)];
         case 'horizontal':
          return [STACKITEM.mml(this.left),item,STACKITEM.mml(this.right)];
        }
      }
      return this.SUPER(arguments).checkItem.call(this,item);
    }
  });
  
  STACKITEM.array = STACKITEM.Subclass({
    type: "array", isOpen: true, arraydef: {},
    Init: function () {
      this.table = []; this.row = []; this.env = {}; this.frame = []
      this.SUPER(arguments).Init.apply(this,arguments);
    },
    checkItem: function (item) {
      if (item.isClose && item.type !== "over") {
        if (item.isEntry) {this.EndEntry(); this.clearEnv(); return false}
        if (item.isCR)    {this.EndEntry(); this.EndRow(); this.clearEnv(); return false}
        this.EndTable(); this.clearEnv();
        var mml = MML.mtable.apply(MML,this.table).With(this.arraydef);
        if (this.frame.length === 4) {
          mml.frame = (this.frame.dashed ? "dashed" : "solid");
        } else if (this.frame.length) {
          mml.hasFrame = true;
          if (this.arraydef.rowlines) {this.arraydef.rowlines = this.arraydef.rowlines.replace(/none( none)+$/,"none")}
          mml = MML.menclose(mml).With({notation: this.frame.join(" "), isFrame: true});
          if ((this.arraydef.columnlines||"none") != "none" ||
              (this.arraydef.rowlines||"none") != "none") {mml.padding = 0} // HTML-CSS jax implements this
        }
        if (this.open || this.close) {
          mml = MML.mfenced(mml).With({open: this.open, close: this.close});
        }
        mml = STACKITEM.mml(mml);
        if (this.requireClose) {
          if (item.type === 'close') {return mml}
          TEX.Error("Missing close brace");
        }
        return [mml,item];
      }
      return this.SUPER(arguments).checkItem.call(this,item);
    },
    EndEntry: function () {this.row.push(MML.mtd.apply(MML,this.data)); this.data = []},
    EndRow:   function () {this.table.push(MML.mtr.apply(MML,this.row)); this.row = []},
    EndTable: function () {
      if (this.data.length || this.row.length) {this.EndEntry(); this.EndRow()}
      this.checkLines();
    },
    checkLines: function () {
      if (this.arraydef.rowlines) {
        var lines = this.arraydef.rowlines.split(/ /);
        if (lines.length === this.table.length) {
          this.frame.push("bottom"); lines.pop();
          this.arraydef.rowlines = lines.join(' ');
        } else if (lines.length < this.table.length-1) {
          this.arraydef.rowlines += " none";
        }
      }
      if (this.rowspacing) {
        var rows = this.arraydef.rowspacing.split(/ /);
        while (rows.length < this.table.length) {rows.push(this.rowspacing+"em")}
        this.arraydef.rowspacing = rows.join(' ');
      }
    },
    clearEnv: function () {
      for (var id in this.env) {if (this.env.hasOwnProperty(id)) {delete this.env[id]}}
    }
  });
  
  STACKITEM.cell = STACKITEM.Subclass({
    type: "cell", isClose: true
  });

  STACKITEM.mml = STACKITEM.Subclass({
    type: "mml", isNotStack: true,
    Add: function () {this.data.push.apply(this.data,arguments); return this}
  });
  
  STACKITEM.fn = STACKITEM.Subclass({
    type: "fn",
    checkItem: function (item) {
      if (this.data[0]) {
        if (item.type !== "mml" || !item.data[0]) {return [this.data[0],item]}
        if (item.data[0].isa(MML.mspace)) {return [this.data[0],item]}
        var mml = item.data[0]; if (mml.isEmbellished()) {mml = mml.CoreMO()}
        if ([0,0,1,1,0,1,1,0,0,0][mml.Get("texClass")]) {return [this.data[0],item]}
        return [this.data[0],MML.mo(MML.entity("#x2061")).With({texClass:MML.TEXCLASS.NONE}),item];
      }
      return this.SUPER(arguments).checkItem.apply(this,arguments);
    }
  });
  
  STACKITEM.not = STACKITEM.Subclass({
    type: "not",
    checkItem: function (item) {
      var mml, c;
      if (item.type === "open" || item.type === "left") {return true}
      if (item.type === "mml" && item.data[0].type.match(/^(mo|mi|mtext)$/)) {
        mml = item.data[0], c = mml.data.join("");
        if (c.length === 1 && !mml.movesupsub) {
          c = STACKITEM.not.remap[c.charCodeAt(0)];
          if (c) {mml.SetData(0,MML.chars(String.fromCharCode(c)))}
            else {mml.Append(MML.chars("\u0338"))}
          return item;
        }
      }
      //  \mathrel{\rlap{\notChar}}
      mml = MML.mpadded(MML.mtext("\u29F8")).With({width:0});
      mml = MML.TeXAtom(mml).With({texClass:MML.TEXCLASS.REL});
      return [mml,item];
    }
  });
  STACKITEM.not.remap = {
    0x2190:0x219A, 0x2192:0x219B, 0x2194:0x21AE,
    0x21D0:0x21CD, 0x21D2:0x21CF, 0x21D4:0x21CE,
    0x2208:0x2209, 0x220B:0x220C, 0x2223:0x2224, 0x2225:0x2226,
    0x223C:0x2241, 0x007E:0x2241, 0x2243:0x2244, 0x2245:0x2247,
    0x2248:0x2249, 0x224D:0x226D, 0x003D:0x2260, 0x2261:0x2262,
    0x003C:0x226E, 0x003E:0x226F, 0x2264:0x2270, 0x2265:0x2271,
    0x2272:0x2274, 0x2273:0x2275, 0x2276:0x2278, 0x2277:0x2279,
    0x227A:0x2280, 0x227B:0x2281, 0x2282:0x2284, 0x2283:0x2285,
    0x2286:0x2288, 0x2287:0x2289, 0x22A2:0x22AC, 0x22A8:0x22AD,
    0x22A9:0x22AE, 0x22AB:0x22AF, 0x227C:0x22E0, 0x227D:0x22E1,
    0x2291:0x22E2, 0x2292:0x22E3, 0x22B2:0x22EA, 0x22B3:0x22EB,
    0x22B4:0x22EC, 0x22B5:0x22ED, 0x2203:0x2204
  };
  
  STACKITEM.dots = STACKITEM.Subclass({
    type: "dots",
    checkItem: function (item) {
      if (item.type === "open" || item.type === "left") {return true}
      var dots = this.ldots;
      if (item.type === "mml" && item.data[0].isEmbellished()) {
        var tclass = item.data[0].CoreMO().Get("texClass");
        if (tclass === MML.TEXCLASS.BIN || tclass === MML.TEXCLASS.REL) {dots = this.cdots}
      }
      return [dots,item];
    }
  });
  

  var TEXDEF = {
    //
    //  Add new definitions without overriding user-defined ones
    //
    Add: function (src,dst,nouser) {
      if (!dst) {dst = this}
      for (var id in src) {if (src.hasOwnProperty(id)) {
        if (typeof src[id] === 'object' && !(src[id] instanceof Array) &&
           (typeof dst[id] === 'object' || typeof dst[id] === 'function')) 
             {this.Add(src[id],dst[id],src[id],nouser)}
          else if (!dst[id] || !dst[id].isUser || !nouser) {dst[id] = src[id]}
      }}
      return dst;
    }
  };
  var STARTUP = function () {
    MML = MathJax.ElementJax.mml;
    HUB.Insert(TEXDEF,{
  
      // patterns for letters and numbers
      letter:  /[a-z]/i,
      digit:   /[0-9.]/,
      number:  /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)*|\.[0-9]+)/,
    
      special: {
        '\\':  'ControlSequence',
        '{':   'Open',
        '}':   'Close',
        '~':   'Tilde',
        '^':   'Superscript',
        '_':   'Subscript',
        ' ':   'Space',
        "\t":  'Space',
        "\r":  'Space',
        "\n":  'Space',
        "'":   'Prime',
        '%':   'Comment',
        '&':   'Entry',
        '#':   'Hash',
        '\u2019': 'Prime'
      },
      
      remap: {
        '-':   '2212',
        '*':   '2217'
      },
    
      mathchar0mi: {
	// Lower-case greek
	alpha:        '03B1',
	beta:         '03B2',
	gamma:        '03B3',
	delta:        '03B4',
	epsilon:      '03F5',
	zeta:         '03B6',
	eta:          '03B7',
	theta:        '03B8',
	iota:         '03B9',
	kappa:        '03BA',
	lambda:       '03BB',
	mu:           '03BC',
	nu:           '03BD',
	xi:           '03BE',
	omicron:      '03BF', // added for completeness
	pi:           '03C0',
	rho:          '03C1',
	sigma:        '03C3',
	tau:          '03C4',
	upsilon:      '03C5',
	phi:          '03D5',
	chi:          '03C7',
	psi:          '03C8',
	omega:        '03C9',
	varepsilon:   '03B5',
	vartheta:     '03D1',
	varpi:        '03D6',
	varrho:       '03F1',
	varsigma:     '03C2',
	varphi:       '03C6',
        
        // Ord symbols
        S:            ['00A7',{mathvariant: MML.VARIANT.NORMAL}],
        aleph:        ['2135',{mathvariant: MML.VARIANT.NORMAL}],
        hbar:         ['210F',{variantForm:true}],
        imath:        '0131',
        jmath:        '0237',
        ell:          '2113',
        wp:           ['2118',{mathvariant: MML.VARIANT.NORMAL}],
        Re:           ['211C',{mathvariant: MML.VARIANT.NORMAL}],
        Im:           ['2111',{mathvariant: MML.VARIANT.NORMAL}],
        partial:      ['2202',{mathvariant: MML.VARIANT.NORMAL}],
        infty:        ['221E',{mathvariant: MML.VARIANT.NORMAL}],
        prime:        ['2032',{mathvariant: MML.VARIANT.NORMAL, variantForm:true}],
        emptyset:     ['2205',{mathvariant: MML.VARIANT.NORMAL}],
        nabla:        ['2207',{mathvariant: MML.VARIANT.NORMAL}],
        top:          ['22A4',{mathvariant: MML.VARIANT.NORMAL}],
        bot:          ['22A5',{mathvariant: MML.VARIANT.NORMAL}],
        angle:        ['2220',{mathvariant: MML.VARIANT.NORMAL}],
        triangle:     ['25B3',{mathvariant: MML.VARIANT.NORMAL}],
        backslash:    ['2216',{mathvariant: MML.VARIANT.NORMAL, variantForm:true}],
        forall:       ['2200',{mathvariant: MML.VARIANT.NORMAL}],
        exists:       ['2203',{mathvariant: MML.VARIANT.NORMAL}],
        neg:          ['00AC',{mathvariant: MML.VARIANT.NORMAL}],
        lnot:         ['00AC',{mathvariant: MML.VARIANT.NORMAL}],
        flat:         ['266D',{mathvariant: MML.VARIANT.NORMAL}],
        natural:      ['266E',{mathvariant: MML.VARIANT.NORMAL}],
        sharp:        ['266F',{mathvariant: MML.VARIANT.NORMAL}],
        clubsuit:     ['2663',{mathvariant: MML.VARIANT.NORMAL}],
        diamondsuit:  ['2662',{mathvariant: MML.VARIANT.NORMAL}],
        heartsuit:    ['2661',{mathvariant: MML.VARIANT.NORMAL}],
        spadesuit:    ['2660',{mathvariant: MML.VARIANT.NORMAL}]
      },
        
      mathchar0mo: {
        surd:         '221A',

        // big ops
        coprod:       ['2210',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigvee:       ['22C1',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigwedge:     ['22C0',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        biguplus:     ['2A04',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigcap:       ['22C2',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigcup:       ['22C3',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        'int':        ['222B',{texClass: MML.TEXCLASS.OP}],
        intop:        ['222B',{texClass: MML.TEXCLASS.OP, movesupsub:true, movablelimits:true}],
        iint:         ['222C',{texClass: MML.TEXCLASS.OP}],
        iiint:        ['222D',{texClass: MML.TEXCLASS.OP}],
        prod:         ['220F',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        sum:          ['2211',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigotimes:    ['2A02',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigoplus:     ['2A01',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        bigodot:      ['2A00',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        oint:         ['222E',{texClass: MML.TEXCLASS.OP}],
        bigsqcup:     ['2A06',{texClass: MML.TEXCLASS.OP, movesupsub:true}],
        smallint:     ['222B',{largeop:false}],
        
        // binary operations
        triangleleft:      '25C3',
        triangleright:     '25B9',
        bigtriangleup:     '25B3',
        bigtriangledown:   '25BD',
        wedge:        '2227',
        land:         '2227',
        vee:          '2228',
        lor:          '2228',
        cap:          '2229',
        cup:          '222A',
        ddagger:      '2021',
        dagger:       '2020',
        sqcap:        '2293',
        sqcup:        '2294',
        uplus:        '228E',
        amalg:        '2A3F',
        diamond:      '22C4',
        bullet:       '2219',
        wr:           '2240',
        div:          '00F7',
        odot:         ['2299',{largeop: false}],
        oslash:       ['2298',{largeop: false}],
        otimes:       ['2297',{largeop: false}],
        ominus:       ['2296',{largeop: false}],
        oplus:        ['2295',{largeop: false}],
        mp:           '2213',
        pm:           '00B1',
        circ:         '2218',
        bigcirc:      '25EF',
        setminus:     ['2216',{variantForm:true}],
        cdot:         '22C5',
        ast:          '2217',
        times:        '00D7',
        star:         '22C6',
        
        // Relations
        propto:       '221D',
        sqsubseteq:   '2291',
        sqsupseteq:   '2292',
        parallel:     '2225',
        mid:          '2223',
        dashv:        '22A3',
        vdash:        '22A2',
        leq:          '2264',
        le:           '2264',
        geq:          '2265',
        ge:           '2265',
        lt:           '003C',
        gt:           '003E',
        succ:         '227B',
        prec:         '227A',
        approx:       '2248',
        succeq:       '2AB0',  // or '227C',
        preceq:       '2AAF',  // or '227D',
        supset:       '2283',
        subset:       '2282',
        supseteq:     '2287',
        subseteq:     '2286',
        'in':         '2208',
        ni:           '220B',
        notin:        '2209',
        owns:         '220B',
        gg:           '226B',
        ll:           '226A',
        sim:          '223C',
        simeq:        '2243',
        perp:         '22A5',
        equiv:        '2261',
        asymp:        '224D',
        smile:        '2323',
        frown:        '2322',
        ne:           '2260',
        neq:          '2260',
        cong:         '2245',
        doteq:        '2250',
        bowtie:       '22C8',
        models:       '22A8',
        
        notChar:      '29F8',
        
        
        // Arrows
        Leftrightarrow:     '21D4',
        Leftarrow:          '21D0',
        Rightarrow:         '21D2',
        leftrightarrow:     '2194',
        leftarrow:          '2190',
        gets:               '2190',
        rightarrow:         '2192',
        to:                 '2192',
        mapsto:             '21A6',
        leftharpoonup:      '21BC',
        leftharpoondown:    '21BD',
        rightharpoonup:     '21C0',
        rightharpoondown:   '21C1',
        nearrow:            '2197',
        searrow:            '2198',
        nwarrow:            '2196',
        swarrow:            '2199',
        rightleftharpoons:  '21CC',
        hookrightarrow:     '21AA',
        hookleftarrow:      '21A9',
        longleftarrow:      '27F5',
        Longleftarrow:      '27F8',
        longrightarrow:     '27F6',
        Longrightarrow:     '27F9',
        Longleftrightarrow: '27FA',
        longleftrightarrow: '27F7',
        longmapsto:         '27FC',
        
        
        // Misc.
        ldots:            '2026',
        cdots:            '22EF',
        vdots:            '22EE',
        ddots:            '22F1',
        dotsc:            '2026',  // dots with commas
        dotsb:            '22EF',  // dots with binary ops and relations
        dotsm:            '22EF',  // dots with multiplication
        dotsi:            '22EF',  // dots with integrals
        dotso:            '2026',  // other dots
        
        ldotp:            ['002E', {texClass: MML.TEXCLASS.PUNCT}],
        cdotp:            ['22C5', {texClass: MML.TEXCLASS.PUNCT}],
        colon:            ['003A', {texClass: MML.TEXCLASS.PUNCT}]
      },
      
      mathchar7: {
        Gamma:        '0393',
        Delta:        '0394',
        Theta:        '0398',
        Lambda:       '039B',
        Xi:           '039E',
        Pi:           '03A0',
        Sigma:        '03A3',
        Upsilon:      '03A5',
        Phi:          '03A6',
        Psi:          '03A8',
        Omega:        '03A9',
        
        '_':          '005F',
        '#':          '0023',
        '$':          '0024',
        '%':          '0025',
        '&':          '0026',
        And:          '0026'
      },
      
      delimiter: {
        '(':                '(',
        ')':                ')',
        '[':                '[',
        ']':                ']',
        '<':                '27E8',
        '>':                '27E9',
        '\\lt':             '27E8',
        '\\gt':             '27E9',
        '/':                '/',
        '|':                ['|',{texClass:MML.TEXCLASS.ORD}],
        '.':                '',
        '\\\\':             '\\',
        '\\lmoustache':     '23B0',  // non-standard
        '\\rmoustache':     '23B1',  // non-standard
        '\\lgroup':         '27EE',  // non-standard
        '\\rgroup':         '27EF',  // non-standard
        '\\arrowvert':      '23D0',
        '\\Arrowvert':      '2016',
        '\\bracevert':      '23AA',  // non-standard
        '\\Vert':           ['2225',{texClass:MML.TEXCLASS.ORD}],
        '\\|':              ['2225',{texClass:MML.TEXCLASS.ORD}],
        '\\vert':           ['|',{texClass:MML.TEXCLASS.ORD}],
        '\\uparrow':        '2191',
        '\\downarrow':      '2193',
        '\\updownarrow':    '2195',
        '\\Uparrow':        '21D1',
        '\\Downarrow':      '21D3',
        '\\Updownarrow':    '21D5',
        '\\backslash':      '\\',
        '\\rangle':         '27E9',
        '\\langle':         '27E8',
        '\\rbrace':         '}',
        '\\lbrace':         '{',
        '\\}':              '}',
        '\\{':              '{',
        '\\rceil':          '2309',
        '\\lceil':          '2308',
        '\\rfloor':         '230B',
        '\\lfloor':         '230A',
        '\\lbrack':         '[',
        '\\rbrack':         ']'
      },
      
      macros: {
        displaystyle:      ['SetStyle','D',true,0],
        textstyle:         ['SetStyle','T',false,0],
        scriptstyle:       ['SetStyle','S',false,1],
        scriptscriptstyle: ['SetStyle','SS',false,2],
        
        rm:                ['SetFont',MML.VARIANT.NORMAL],
        mit:               ['SetFont',MML.VARIANT.ITALIC],
        oldstyle:          ['SetFont',MML.VARIANT.OLDSTYLE],
        cal:               ['SetFont',MML.VARIANT.CALIGRAPHIC],
        it:                ['SetFont',"-tex-mathit"], // needs special handling
        bf:                ['SetFont',MML.VARIANT.BOLD],
        bbFont:            ['SetFont',MML.VARIANT.DOUBLESTRUCK],
        scr:               ['SetFont',MML.VARIANT.SCRIPT],
        frak:              ['SetFont',MML.VARIANT.FRAKTUR],
        sf:                ['SetFont',MML.VARIANT.SANSSERIF],
        tt:                ['SetFont',MML.VARIANT.MONOSPACE],

//      font:
        
        tiny:              ['SetSize',0.5],
        Tiny:              ['SetSize',0.6],  // non-standard
        scriptsize:        ['SetSize',0.7],
        small:             ['SetSize',0.85],
        normalsize:        ['SetSize',1.0],
        large:             ['SetSize',1.2],
        Large:             ['SetSize',1.44],
        LARGE:             ['SetSize',1.73],
        huge:              ['SetSize',2.07],
        Huge:              ['SetSize',2.49],
        
        arcsin:            ['NamedFn'],
        arccos:            ['NamedFn'],
        arctan:            ['NamedFn'],
        arg:               ['NamedFn'],
        cos:               ['NamedFn'],
        cosh:              ['NamedFn'],
        cot:               ['NamedFn'],
        coth:              ['NamedFn'],
        csc:               ['NamedFn'],
        deg:               ['NamedFn'],
        det:                'NamedOp',
        dim:               ['NamedFn'],
        exp:               ['NamedFn'],
        gcd:                'NamedOp',
        hom:               ['NamedFn'],
        inf:                'NamedOp',
        ker:               ['NamedFn'],
        lg:                ['NamedFn'],
        lim:                'NamedOp',
        liminf:            ['NamedOp','lim&thinsp;inf'],
        limsup:            ['NamedOp','lim&thinsp;sup'],
        ln:                ['NamedFn'],
        log:               ['NamedFn'],
        max:                'NamedOp',
        min:                'NamedOp',
        Pr:                 'NamedOp',
        sec:               ['NamedFn'],
        sin:               ['NamedFn'],
        sinh:              ['NamedFn'],
        sup:                'NamedOp',
        tan:               ['NamedFn'],
        tanh:              ['NamedFn'],
        
        limits:            ['Limits',1],
        nolimits:          ['Limits',0],

        overline:            ['UnderOver','00AF'],
        underline:           ['UnderOver','005F'],
        overbrace:           ['UnderOver','23DE',1],
        underbrace:          ['UnderOver','23DF',1],
        overrightarrow:      ['UnderOver','2192'],
        underrightarrow:     ['UnderOver','2192'],
        overleftarrow:       ['UnderOver','2190'],
        underleftarrow:      ['UnderOver','2190'],
        overleftrightarrow:  ['UnderOver','2194'],
        underleftrightarrow: ['UnderOver','2194'],

        overset:            'Overset',
        underset:           'Underset',
        stackrel:           ['Macro','\\mathrel{\\mathop{#2}\\limits^{#1}}',2],
          
        over:               'Over',
        overwithdelims:     'Over',
        atop:               'Over',
        atopwithdelims:     'Over',
        above:              'Over',
        abovewithdelims:    'Over',
        brace:             ['Over','{','}'],
        brack:             ['Over','[',']'],
        choose:            ['Over','(',')'],
        
        frac:               'Frac',
        sqrt:               'Sqrt',
        root:               'Root',
        uproot:            ['MoveRoot','upRoot'],
        leftroot:          ['MoveRoot','leftRoot'],
        
        left:               'LeftRight',
        right:              'LeftRight',
        middle:             'Middle',

        llap:               'Lap',
        rlap:               'Lap',
        raise:              'RaiseLower',
        lower:              'RaiseLower',
        moveleft:           'MoveLeftRight',
        moveright:          'MoveLeftRight',

        ',':               ['Spacer',MML.LENGTH.THINMATHSPACE],
        ':':               ['Spacer',MML.LENGTH.MEDIUMMATHSPACE],  // for LaTeX
        '>':               ['Spacer',MML.LENGTH.MEDIUMMATHSPACE],
        ';':               ['Spacer',MML.LENGTH.THICKMATHSPACE],
        '!':               ['Spacer',MML.LENGTH.NEGATIVETHINMATHSPACE],
        enspace:           ['Spacer',".5em"],
        quad:              ['Spacer',"1em"],
        qquad:             ['Spacer',"2em"],
        thinspace:         ['Spacer',MML.LENGTH.THINMATHSPACE],
        negthinspace:      ['Spacer',MML.LENGTH.NEGATIVETHINMATHSPACE],
    
        hskip:              'Hskip',
        hspace:             'Hskip',
        kern:               'Hskip',
        mskip:              'Hskip',
        mspace:             'Hskip',
        mkern:              'Hskip',
        Rule:              ['Rule'],
        Space:             ['Rule','blank'],
    
        big:               ['MakeBig',MML.TEXCLASS.ORD,0.85],
        Big:               ['MakeBig',MML.TEXCLASS.ORD,1.15],
        bigg:              ['MakeBig',MML.TEXCLASS.ORD,1.45],
        Bigg:              ['MakeBig',MML.TEXCLASS.ORD,1.75],
        bigl:              ['MakeBig',MML.TEXCLASS.OPEN,0.85],
        Bigl:              ['MakeBig',MML.TEXCLASS.OPEN,1.15],
        biggl:             ['MakeBig',MML.TEXCLASS.OPEN,1.45],
        Biggl:             ['MakeBig',MML.TEXCLASS.OPEN,1.75],
        bigr:              ['MakeBig',MML.TEXCLASS.CLOSE,0.85],
        Bigr:              ['MakeBig',MML.TEXCLASS.CLOSE,1.15],
        biggr:             ['MakeBig',MML.TEXCLASS.CLOSE,1.45],
        Biggr:             ['MakeBig',MML.TEXCLASS.CLOSE,1.75],
        bigm:              ['MakeBig',MML.TEXCLASS.REL,0.85],
        Bigm:              ['MakeBig',MML.TEXCLASS.REL,1.15],
        biggm:             ['MakeBig',MML.TEXCLASS.REL,1.45],
        Biggm:             ['MakeBig',MML.TEXCLASS.REL,1.75],

        mathord:           ['TeXAtom',MML.TEXCLASS.ORD],
        mathop:            ['TeXAtom',MML.TEXCLASS.OP],
        mathopen:          ['TeXAtom',MML.TEXCLASS.OPEN],
        mathclose:         ['TeXAtom',MML.TEXCLASS.CLOSE],
        mathbin:           ['TeXAtom',MML.TEXCLASS.BIN],
        mathrel:           ['TeXAtom',MML.TEXCLASS.REL],
        mathpunct:         ['TeXAtom',MML.TEXCLASS.PUNCT],
        mathinner:         ['TeXAtom',MML.TEXCLASS.INNER],

        vcenter:           ['TeXAtom',MML.TEXCLASS.VCENTER],

        mathchoice:        ['Extension','mathchoice'],
        buildrel:           'BuildRel',
    
        hbox:               ['HBox',0],
        text:               'HBox',
        mbox:               ['HBox',0],
        fbox:               'FBox',

        strut:              'Strut',
        mathstrut:         ['Macro','\\vphantom{(}'],
        phantom:            'Phantom',
        vphantom:          ['Phantom',1,0],
        hphantom:          ['Phantom',0,1],
        smash:              'Smash',
    
        acute:             ['Accent', "00B4"],  // or 0301 or 02CA
        grave:             ['Accent', "0060"],  // or 0300 or 02CB
        ddot:              ['Accent', "00A8"],  // or 0308
        tilde:             ['Accent', "007E"],  // or 0303 or 02DC
        bar:               ['Accent', "00AF"],  // or 0304 or 02C9
        breve:             ['Accent', "02D8"],  // or 0306
        check:             ['Accent', "02C7"],  // or 030C
        hat:               ['Accent', "005E"],  // or 0302 or 02C6
        vec:               ['Accent', "2192"],  // or 20D7
        dot:               ['Accent', "02D9"],  // or 0307
        widetilde:         ['Accent', "007E",1], // or 0303 or 02DC
        widehat:           ['Accent', "005E",1], // or 0302 or 02C6

        matrix:             'Matrix',
        array:              'Matrix',
        pmatrix:           ['Matrix','(',')'],
        cases:             ['Matrix','{','',"left left",null,".1em",null,true],
        eqalign:           ['Matrix',null,null,"right left",MML.LENGTH.THICKMATHSPACE,".5em",'D'],
        displaylines:      ['Matrix',null,null,"center",null,".5em",'D'],
        cr:                 'Cr',
        '\\':               'CrLaTeX',
        newline:            'Cr',
        hline:             ['HLine','solid'],
        hdashline:         ['HLine','dashed'],
//      noalign:            'HandleNoAlign',
        eqalignno:         ['Matrix',null,null,"right left right",MML.LENGTH.THICKMATHSPACE+" 3em",".5em",'D'],
        leqalignno:        ['Matrix',null,null,"right left right",MML.LENGTH.THICKMATHSPACE+" 3em",".5em",'D'],

        //  TeX substitution macros
        bmod:              ['Macro','\\mathbin{\\mmlToken{mo}{mod}}'],
        pmod:              ['Macro','\\pod{\\mmlToken{mi}{mod}\\kern 6mu #1}',1],
        mod:               ['Macro','\\mathchoice{\\kern18mu}{\\kern12mu}{\\kern12mu}{\\kern12mu}\\mmlToken{mi}{mod}\\,\\,#1',1],
        pod:               ['Macro','\\mathchoice{\\kern18mu}{\\kern8mu}{\\kern8mu}{\\kern8mu}(#1)',1],
        iff:               ['Macro','\\;\\Longleftrightarrow\\;'],
        skew:              ['Macro','{{#2{#3\\mkern#1mu}\\mkern-#1mu}{}}',3],
        mathcal:           ['Macro','{\\cal #1}',1],
        mathscr:           ['Macro','{\\scr #1}',1],
        mathrm:            ['Macro','{\\rm #1}',1],
        mathbf:            ['Macro','{\\bf #1}',1],
        mathbb:            ['Macro','{\\bbFont #1}',1],
        Bbb:               ['Macro','{\\bbFont #1}',1],
        mathit:            ['Macro','{\\it #1}',1],
        mathfrak:          ['Macro','{\\frak #1}',1],
        mathsf:            ['Macro','{\\sf #1}',1],
        mathtt:            ['Macro','{\\tt #1}',1],
        textrm:            ['Macro','\\mathord{\\rm\\text{#1}}',1],
        textit:            ['Macro','\\mathord{\\it{\\text{#1}}}',1],
        textbf:            ['Macro','\\mathord{\\bf{\\text{#1}}}',1],
        pmb:               ['Macro','\\rlap{#1}\\kern1px{#1}',1],
        TeX:               ['Macro','T\\kern-.14em\\lower.5ex{E}\\kern-.115em X'],
        LaTeX:             ['Macro','L\\kern-.325em\\raise.21em{\\scriptstyle{A}}\\kern-.17em\\TeX'],
        ' ':               ['Macro','\\text{ }'],

        //  Specially handled
        not:                'Not',
        dots:               'Dots',
        space:              'Tilde',
        

        //  LaTeX
        begin:              'Begin',
        end:                'End',

        newcommand:        ['Extension','newcommand'],
        renewcommand:      ['Extension','newcommand'],
        newenvironment:    ['Extension','newcommand'],
        renewenvironment:  ['Extension','newcommand'],
        def:               ['Extension','newcommand'],
        let:               ['Extension','newcommand'],
        
        verb:              ['Extension','verb'],
        
        boldsymbol:        ['Extension','boldsymbol'],
        
        tag:               ['Extension','AMSmath'],
        notag:             ['Extension','AMSmath'],
        label:             ['Extension','AMSmath'],
        ref:               ['Extension','AMSmath'],
        eqref:             ['Extension','AMSmath'],
        nonumber:          ['Macro','\\notag'],

        //  Extensions to TeX
        unicode:           ['Extension','unicode'],
        color:              'Color',
        
        href:              ['Extension','HTML'],
        'class':           ['Extension','HTML'],
        style:             ['Extension','HTML'],
        cssId:             ['Extension','HTML'],
        bbox:              ['Extension','bbox'],
    
        mmlToken:           'MmlToken',

        require:            'Require'

      },
      
      environment: {
        array:        ['AlignedArray'],
        matrix:       ['Array',null,null,null,'c'],
        pmatrix:      ['Array',null,'(',')','c'],
        bmatrix:      ['Array',null,'[',']','c'],
        Bmatrix:      ['Array',null,'\\{','\\}','c'],
        vmatrix:      ['Array',null,'\\vert','\\vert','c'],
        Vmatrix:      ['Array',null,'\\Vert','\\Vert','c'],
        cases:        ['Array',null,'\\{','.','ll',null,".1em"],

        equation:     [null,'Equation'],
        'equation*':  [null,'Equation'],

        eqnarray:     ['ExtensionEnv',null,'AMSmath'],
        'eqnarray*':  ['ExtensionEnv',null,'AMSmath'],

        align:        ['ExtensionEnv',null,'AMSmath'],
        'align*':     ['ExtensionEnv',null,'AMSmath'],
        aligned:      ['ExtensionEnv',null,'AMSmath'],
        multline:     ['ExtensionEnv',null,'AMSmath'],
        'multline*':  ['ExtensionEnv',null,'AMSmath'],
        split:        ['ExtensionEnv',null,'AMSmath'],
        gather:       ['ExtensionEnv',null,'AMSmath'],
        'gather*':    ['ExtensionEnv',null,'AMSmath'],
        gathered:     ['ExtensionEnv',null,'AMSmath'],
        alignat:      ['ExtensionEnv',null,'AMSmath'],
        'alignat*':   ['ExtensionEnv',null,'AMSmath'],
        alignedat:    ['ExtensionEnv',null,'AMSmath']
      },
      
      p_height: 1.2 / .85   // cmex10 height plus depth over .85

    });
    
    //
    //  Add macros defined in the configuration
    //
    if (this.config.Macros) {
      var MACROS = this.config.Macros;
      for (var id in MACROS) {if (MACROS.hasOwnProperty(id)) {
        if (typeof(MACROS[id]) === "string") {TEXDEF.macros[id] = ['Macro',MACROS[id]]}
        else {TEXDEF.macros[id] = ["Macro"].concat(MACROS[id])}
        TEXDEF.macros[id].isUser = true;
      }}
    }
  };
  
  /************************************************************************/
  /*
   *   The TeX Parser
   */

  var PARSE = MathJax.Object.Subclass({
    Init: function (string,env) {
      this.string = string; this.i = 0; this.macroCount = 0;
      var ENV; if (env) {ENV = {}; for (var id in env) {if (env.hasOwnProperty(id)) {ENV[id] = env[id]}}}
      this.stack = TEX.Stack(ENV,!!env);
      this.Parse(); this.Push(STACKITEM.stop());
    },
    Parse: function () {
      var c, n;
      while (this.i < this.string.length) {
        c = this.string.charAt(this.i++); n = c.charCodeAt(0);
        if (n >= 0xD800 && n < 0xDC00) {c += this.string.charAt(this.i++)}
        if (TEXDEF.special[c]) {this[TEXDEF.special[c]](c)}
        else if (TEXDEF.letter.test(c)) {this.Variable(c)}
        else if (TEXDEF.digit.test(c)) {this.Number(c)}
        else {this.Other(c)}
      }
    },
    Push: function () {this.stack.Push.apply(this.stack,arguments)},
    mml: function () {
      if (this.stack.Top().type !== "mml") {return null}
      return this.stack.Top().data[0];
    },
    mmlToken: function (token) {return token}, // used by boldsymbol extension
    
    /************************************************************************/
    /*
     *   Handle various token classes
     */

    /*
     *  Lookup a control-sequence and process it
     */
    ControlSequence: function (c) {
      var name = this.GetCS(), macro = this.csFindMacro(name);
      if (macro) {
        if (!(macro instanceof Array)) {macro = [macro]}
        var fn = macro[0]; if (!(fn instanceof Function)) {fn = this[fn]}
        fn.apply(this,[c+name].concat(macro.slice(1)));
      } else if (TEXDEF.mathchar0mi[name])            {this.csMathchar0mi(name,TEXDEF.mathchar0mi[name])}
        else if (TEXDEF.mathchar0mo[name])            {this.csMathchar0mo(name,TEXDEF.mathchar0mo[name])}
        else if (TEXDEF.mathchar7[name])              {this.csMathchar7(name,TEXDEF.mathchar7[name])}
        else if (TEXDEF.delimiter["\\"+name] != null) {this.csDelimiter(name,TEXDEF.delimiter["\\"+name])}
        else                                          {this.csUndefined(c+name)}
    },
    //
    //  Look up a macro in the macros list
    //  (overridden in begingroup extension)
    //
    csFindMacro: function (name) {return TEXDEF.macros[name]},
    //
    //  Handle normal mathchar (as an mi)
    //
    csMathchar0mi: function (name,mchar) {
      var def = {mathvariant: MML.VARIANT.ITALIC};
      if (mchar instanceof Array) {def = mchar[1]; mchar = mchar[0]}
      this.Push(this.mmlToken(MML.mi(MML.entity("#x"+mchar)).With(def)));
    },
    //
    //  Handle normal mathchar (as an mo)
    //
    csMathchar0mo: function (name,mchar) {
      var def = {stretchy: false};
      if (mchar instanceof Array) {def = mchar[1]; def.stretchy = false; mchar = mchar[0]}
      this.Push(this.mmlToken(MML.mo(MML.entity("#x"+mchar)).With(def)));
    },
    //
    //  Handle mathchar in current family
    //
    csMathchar7: function (name,mchar) {
      var def = {mathvariant: MML.VARIANT.NORMAL};
      if (mchar instanceof Array) {def = mchar[1]; mchar = mchar[0]}
      if (this.stack.env.font) {def.mathvariant = this.stack.env.font}
      this.Push(this.mmlToken(MML.mi(MML.entity("#x"+mchar)).With(def)));
    },
    //
    //  Handle delimiter
    //
    csDelimiter: function (name,delim) {
      var def = {};
      if (delim instanceof Array) {def = delim[1]; delim = delim[0]}
      if (delim.length === 4) {delim = MML.entity('#x'+delim)} else {delim = MML.chars(delim)}
      this.Push(this.mmlToken(MML.mo(delim).With({fence: false, stretchy: false}).With(def)));
    },
    //
    //  Handle undefined control sequence
    //  (overridden in noUndefined extension)
    //
    csUndefined: function (name) {
      TEX.Error("Undefined control sequence "+name);
    },

    /*
     *  Handle a variable (a single letter)
     */
    Variable: function (c) {
      var def = {}; if (this.stack.env.font) {def.mathvariant = this.stack.env.font}
      this.Push(this.mmlToken(MML.mi(MML.chars(c)).With(def)));
    },

    /*
     *  Determine the extent of a number (pattern may need work)
     */
    Number: function (c) {
      var mml, n = this.string.slice(this.i-1).match(TEXDEF.number);
      if (n) {mml = MML.mn(n[0].replace(/[{}]/g,"")); this.i += n[0].length - 1}
        else {mml = MML.mo(MML.chars(c))}
      if (this.stack.env.font) {mml.mathvariant = this.stack.env.font}
      this.Push(this.mmlToken(mml));
    },
    
    /*
     *  Handle { and }
     */
    Open: function (c) {this.Push(STACKITEM.open())},
    Close: function (c) {this.Push(STACKITEM.close())},
    
    /*
     *  Handle tilde and spaces
     */
    Tilde: function (c) {this.Push(MML.mtext(MML.chars(NBSP)))},
    Space: function (c) {},
    
    /*
     *  Handle ^, _, and '
     */
    Superscript: function (c) {
      if (this.GetNext().match(/\d/)) // don't treat numbers as a unit
        {this.string = this.string.substr(0,this.i+1)+" "+this.string.substr(this.i+1)}
      var position, primes, base, top = this.stack.Top();
      if (top.type === "prime") {base = top.data[0]; primes = top.data[1]; this.stack.Pop()}
        else {base = this.stack.Prev(); if (!base) {base = MML.mi("")}}
      if (base.isEmbellishedWrapper) {base = base.data[0].data[0]}
      if (base.type === "msubsup") {
        if (base.data[base.sup]) {TEX.Error("Double exponent: use braces to clarify")}
        position = base.sup;
      } else if (base.movesupsub) {
        if (base.type !== "munderover" || base.data[base.over]) {
          if (base.movablelimits && base.isa(MML.mi)) {base = this.mi2mo(base)}
          base = MML.munderover(base,null,null).With({movesupsub:true})
        }
        position = base.over;
      } else {
        base = MML.msubsup(base,null,null);
        position = base.sup;
      }
      this.Push(STACKITEM.subsup(base).With({position: position, primes: primes}));
    },
    Subscript: function (c) {
      if (this.GetNext().match(/\d/)) // don't treat numbers as a unit
        {this.string = this.string.substr(0,this.i+1)+" "+this.string.substr(this.i+1)}
      var position, primes, base, top = this.stack.Top();
      if (top.type === "prime") {base = top.data[0]; primes = top.data[1]; this.stack.Pop()}
        else {base = this.stack.Prev(); if (!base) {base = MML.mi("")}}
      if (base.isEmbellishedWrapper) {base = base.data[0].data[0]}
      if (base.type === "msubsup") {
        if (base.data[base.sub]) {TEX.Error("Double subscripts: use braces to clarify")}
        position = base.sub;
      } else if (base.movesupsub) {
        if (base.type !== "munderover" || base.data[base.under]) {
          if (base.movablelimits && base.isa(MML.mi)) {base = this.mi2mo(base)}
          base = MML.munderover(base,null,null).With({movesupsub:true})
        }
        position = base.under;
      } else {
        base = MML.msubsup(base,null,null);
        position = base.sub;
      }
      this.Push(STACKITEM.subsup(base).With({position: position, primes: primes}));
    },
    PRIME: "\u2032", SMARTQUOTE: "\u2019",
    Prime: function (c) {
      var base = this.stack.Prev(); if (!base) {base = MML.mi()}
      if (base.type === "msubsup" && base.data[base.sup])
        {TEX.Error("Prime causes double exponent: use braces to clarify")}
      var sup = ""; this.i--;
      do {sup += this.PRIME; this.i++, c = this.GetNext()}
        while (c === "'" || c === this.SMARTQUOTE);
      sup = ["","\u2032","\u2033","\u2034","\u2057"][sup.length] || sup;
      this.Push(STACKITEM.prime(base,this.mmlToken(MML.mo(sup))));
    },
    mi2mo: function (mi) {
      var mo = MML.mo();  mo.Append.apply(mo,mi.data); var id;
      for (id in mo.defaults)
        {if (mo.defaults.hasOwnProperty(id) && mi[id] != null) {mo[id] = mi[id]}}
      for (id in MML.copyAttributes)
        {if (MML.copyAttributes.hasOwnProperty(id) && mi[id] != null) {mo[id] = mi[id]}}
      return mo;
    },
    
    /*
     *  Handle comments
     */
    Comment: function (c) {
      while (this.i < this.string.length && this.string.charAt(this.i) != "\n") {this.i++}
    },
    
    /*
     *  Handle hash marks outside of definitions
     */
    Hash: function (c) {
      TEX.Error("You can't use 'macro parameter character #' in math mode");
    },
    
    /*
     *  Handle other characters (as <mo> elements)
     */
    Other: function (c) {
      var def = {stretchy: false}, mo;
      if (this.stack.env.font) {def.mathvariant = this.stack.env.font}
      if (TEXDEF.remap[c]) {
        c = TEXDEF.remap[c];
        if (c instanceof Array) {def = c[1]; c = c[0]}
        mo = MML.mo(MML.entity('#x'+c)).With(def);
      } else {
        mo = MML.mo(c).With(def);
      }
      if (mo.autoDefault("texClass",true) == "") {mo = MML.TeXAtom(mo)}
      this.Push(this.mmlToken(mo));
    },
    
    /************************************************************************/
    /*
     *   Macros
     */
    
    SetFont: function (name,font) {this.stack.env.font = font},
    SetStyle: function (name,texStyle,style,level) {
      this.stack.env.style = texStyle; this.stack.env.level = level;
      this.Push(STACKITEM.style().With({styles: {displaystyle: style, scriptlevel: level}}));
    },
    SetSize: function (name,size) {
      this.stack.env.size = size;
      this.Push(STACKITEM.style().With({styles: {mathsize: size+"em"}})); // convert to absolute?
    },

    Color: function (name) {
      var color = this.GetArgument(name);
      var old = this.stack.env.color; this.stack.env.color = color;
      var math = this.ParseArg(name);
      if (old) {this.stack.env.color} else {delete this.stack.env.color}
      this.Push(MML.mstyle(math).With({mathcolor: color}));
    },
    
    Spacer: function (name,space) {
      this.Push(MML.mspace().With({width: space, mathsize: MML.SIZE.NORMAL, scriptlevel:0}));
    },
    
    LeftRight: function (name) {
      this.Push(STACKITEM[name.substr(1)]().With({delim: this.GetDelimiter(name)}));
    },
    
    Middle: function (name) {
      var delim = this.GetDelimiter(name);
      if (this.stack.Top().type !== "left") {TEX.Error(name+" must be within \\left and \\right")}
      this.Push(MML.mo(delim).With({stretchy:true}));
    },
    
    NamedFn: function (name,id) {
      if (!id) {id = name.substr(1)};
      var mml = MML.mi(id).With({texClass: MML.TEXCLASS.OP});
      this.Push(STACKITEM.fn(this.mmlToken(mml)));
    },
    NamedOp: function (name,id) {
      if (!id) {id = name.substr(1)};
      id = id.replace(/&thinsp;/,"\u2006");
      var mml = MML.mo(id).With({
        movablelimits: true,
        movesupsub: true,
        form: MML.FORM.PREFIX,
        texClass: MML.TEXCLASS.OP
      });
      mml.useMMLspacing &= ~mml.SPACE_ATTR.form;  // don't count this explicit form setting
      this.Push(this.mmlToken(mml));
    },
    Limits: function (name,limits) {
      var op = this.stack.Prev("nopop");
      if (!op || op.texClass !== MML.TEXCLASS.OP) {TEX.Error(name+" is allowed only on operators")}
      op.movesupsub = (limits ? true : false);
      op.movablelimits = false;
    },
    
    Over: function (name,open,close) {
      var mml = STACKITEM.over().With({name: name});
      if (open || close) {
        mml.open = open; mml.close = close;
      } else if (name.match(/withdelims$/)) {
        mml.open  = this.GetDelimiter(name);
        mml.close = this.GetDelimiter(name);
      }
      if (name.match(/^\\above/)) {mml.thickness = this.GetDimen(name)}
      else if (name.match(/^\\atop/) || open || close) {mml.thickness = 0}
      this.Push(mml);
    },

    Frac: function (name) {
      var num = this.ParseArg(name);
      var den = this.ParseArg(name);
      this.Push(MML.mfrac(num,den));
    },

    Sqrt: function (name) {
      var n = this.GetBrackets(name), arg = this.GetArgument(name);
      if (arg === "\\frac") {arg += "{"+this.GetArgument(arg)+"}{"+this.GetArgument(arg)+"}"}
      var mml = TEX.Parse(arg,this.stack.env).mml();
      if (!n) {mml = MML.msqrt.apply(MML,mml.array())}
         else {mml = MML.mroot(mml,this.parseRoot(n))}
      this.Push(mml);
    },
    Root: function (name) {
      var n = this.GetUpTo(name,"\\of");
      var arg = this.ParseArg(name);
      this.Push(MML.mroot(arg,this.parseRoot(n)));
    },
    parseRoot: function (n) {
      var env = this.stack.env, inRoot = env.inRoot; env.inRoot = true;
      var parser = TEX.Parse(n,env); n = parser.mml(); var global = parser.stack.global;
      if (global.leftRoot || global.upRoot) {
        n = MML.mpadded(n);
        if (global.leftRoot) {n.width = global.leftRoot}
        if (global.upRoot) {n.voffset = global.upRoot; n.height = global.upRoot}
      }
      env.inRoot = inRoot;
      return n;
    },
    MoveRoot: function (name,id) {
      if (!this.stack.env.inRoot) TEX.Error(name+" can appear only within a root");
      if (this.stack.global[id]) TEX.Error("Multiple use of "+name);
      var n = this.GetArgument(name);
      if (!n.match(/-?[0-9]+/)) TEX.Error("The argument to "+name+" must be an integer");
      n = (n/15)+"em";
      if (n.substr(0,1) !== "-") {n = "+"+n}
      this.stack.global[id] = n;
    },
    
    Accent: function (name,accent,stretchy) {
      var c = this.ParseArg(name);
      var def = {accent: true}; if (this.stack.env.font) {def.mathvariant = this.stack.env.font}
      var mml = this.mmlToken(MML.mo(MML.entity("#x"+accent)).With(def));
      mml.stretchy = (stretchy ? true : false);
      this.Push(MML.TeXAtom(MML.munderover(c,null,mml).With({accent: true})));
    },
    
    UnderOver: function (name,c,stack) {
      var pos = {o: "over", u: "under"}[name.charAt(1)];
      var base = this.ParseArg(name);
      if (base.Get("movablelimits")) {base.movablelimits = false}
      var mml = MML.munderover(base,null,null);
      if (stack) {mml.movesupsub = true}
      mml.data[mml[pos]] = 
        this.mmlToken(MML.mo(MML.entity("#x"+c)).With({stretchy:true, accent:(pos == "under")}));
      this.Push(mml);
    },
    
    Overset: function (name) {
      var top = this.ParseArg(name), base = this.ParseArg(name);
      this.Push(MML.mover(base,top));
    },
    Underset: function (name) {
      var bot = this.ParseArg(name), base = this.ParseArg(name);
      this.Push(MML.munder(base,bot));
    },
    
    TeXAtom: function (name,mclass) {
      var def = {texClass: mclass}, mml;
      if (mclass == MML.TEXCLASS.OP) {
        def.movesupsub = def.movablelimits = true;
        var arg = this.GetArgument(name);
        var match = arg.match(/^\s*\\rm\s+([a-zA-Z0-9 ]+)$/);
        if (match) {
          def.mathvariant = MML.VARIANT.NORMAL;
          mml = STACKITEM.fn(this.mmlToken(MML.mi(match[1]).With(def)));
        } else {
          mml = STACKITEM.fn(MML.TeXAtom(TEX.Parse(arg,this.stack.env).mml()).With(def));
        }
      } else {mml = MML.TeXAtom(this.ParseArg(name)).With(def)}
      this.Push(mml);
    },
    
    MmlToken: function (name) {
      var type = this.GetArgument(name),
          attr = this.GetBrackets(name,"").replace(/^\s+/,""),
          data = this.GetArgument(name),
          def = {attrNames:[]}, match;
      if (!MML[type] || !MML[type].prototype.isToken) {TEX.Error(type+" is not a token element")}
      while (attr !== "") {
        match = attr.match(/^([a-z]+)\s*=\s*('[^']*'|"[^"]*"|[^ ]*)\s*/i);
        if (!match) {TEX.Error("Invalid MathML attribute: "+attr)}
        if (!MML[type].prototype.defaults[match[1]] && !this.MmlTokenAllow[match[1]])
          {TEX.Error(match[1]+" is not a recognized attribute for "+type)}
        def[match[1]] = match[2].replace(/^(['"])(.*)\1$/,"$2");
        def.attrNames.push(match[1]);
        attr = attr.substr(match[0].length);
      }
      this.Push(this.mmlToken(MML[type](data).With(def)));
    },
    MmlTokenAllow: {
      fontfamily:1, fontsize:1, fontweight:1, fontstyle:1,
      color:1, background:1,
      id:1, "class":1, href:1, style:1
    },
    
    Strut: function (name) {
      this.Push(MML.mpadded(MML.mrow()).With({height: "8.6pt", depth: "3pt", width: 0}));
    },
    
    Phantom: function (name,v,h) {
      var box = MML.mphantom(this.ParseArg(name));
      if (v || h) {
        box = MML.mpadded(box);
        if (h) {box.height = box.depth = 0}
        if (v) {box.width = 0}
      }
      this.Push(MML.TeXAtom(box));
    },
    
    Smash: function (name) {
      var bt = this.trimSpaces(this.GetBrackets(name,""));
      var smash = MML.mpadded(this.ParseArg(name));
      switch (bt) {
        case "b": smash.depth = 0; break;
        case "t": smash.height = 0; break;
        default: smash.height = smash.depth = 0;
      }
      this.Push(MML.TeXAtom(smash));
    },
    
    Lap: function (name) {
      var mml = MML.mpadded(this.ParseArg(name)).With({width: 0});
      if (name === "\\llap") {mml.lspace = "-1 width"}
      this.Push(MML.TeXAtom(mml));
    },
    
    RaiseLower: function (name) {
      var h = this.GetDimen(name);
      var item = STACKITEM.position().With({name: name, move: 'vertical'});
      if (h.charAt(0) === '-') {h = h.slice(1); name = {raise: "\\lower", lower: "\\raise"}[name.substr(1)]}
      if (name === "\\lower") {item.dh = '-'+h; item.dd = '+'+h} else {item.dh = '+'+h; item.dd = '-'+h}
      this.Push(item);
    },
    
    MoveLeftRight: function (name) {
      var h = this.GetDimen(name);
      var nh = (h.charAt(0) === '-' ? h.slice(1) : '-'+h);
      if (name === "\\moveleft") {var tmp = h; h = nh; nh = tmp}
      this.Push(STACKITEM.position().With({
        name: name, move: 'horizontal',
        left:  MML.mspace().With({width: h, mathsize: MML.SIZE.NORMAL}),
        right: MML.mspace().With({width: nh, mathsize: MML.SIZE.NORMAL})
      }));
    },
    
    Hskip: function (name) {
      this.Push(MML.mspace().With({width: this.GetDimen(name), mathsize: MML.SIZE.NORMAL}));
    },
    
    Rule: function (name,style) {
      var w = this.GetDimen(name),
          h = this.GetDimen(name),
          d = this.GetDimen(name);
      var mml, def = {width:w, height:h, depth:d};
      if (style !== 'blank') {
        if (parseFloat(w) && parseFloat(h)+parseFloat(d))
          {def.mathbackground = (this.stack.env.color || "black")}
        mml = MML.mpadded(MML.mrow()).With(def);
      } else {
        mml = MML.mspace().With(def);
      }
      this.Push(mml);
    },
    
    MakeBig: function (name,mclass,size) {
      size *= TEXDEF.p_height;
      size = String(size).replace(/(\.\d\d\d).+/,'$1')+"em";
      var delim = this.GetDelimiter(name);
      this.Push(MML.TeXAtom(MML.mo(delim).With({
        minsize: size, maxsize: size, scriptlevel: 0,
        fence: true, stretchy: true, symmetric: true
      })).With({texClass: mclass}));
    },
    
    BuildRel: function (name) {
      var top = this.ParseUpTo(name,"\\over");
      var bot = this.ParseArg(name);
      this.Push(MML.TeXAtom(MML.munderover(bot,null,top)).With({mclass: MML.TEXCLASS.REL}));
    },
    
    HBox: function (name,style) {
      this.Push.apply(this,this.InternalMath(this.GetArgument(name),style));
    },
    
    FBox: function (name) {
      this.Push(MML.menclose.apply(MML,this.InternalMath(this.GetArgument(name))).With({notation:"box"}));
    },
    
    Not: function (name) {
      this.Push(STACKITEM.not());
    },
    
    Dots: function (name) {
      this.Push(STACKITEM.dots().With({
        ldots: this.mmlToken(MML.mo(MML.entity("#x2026")).With({stretchy:false})),
        cdots: this.mmlToken(MML.mo(MML.entity("#x22EF")).With({stretchy:false}))
      }));
    },
    
    Require: function (name) {
      var file = this.GetArgument(name)
        .replace(/.*\//,"")            // remove any leading path
        .replace(/[^a-z0-9_.-]/ig,""); // remove illegal characters
      this.Extension(null,file);
    },
    
    Extension: function (name,file,array) {
      if (name && !typeof(name) === "string") {name = name.name}
      file = TEX.extensionDir+"/"+file;
      if (!file.match(/\.js$/)) {file += ".js"}
      if (!AJAX.loaded[AJAX.fileURL(file)]) {
        if (name != null) {delete TEXDEF[array || 'macros'][name.replace(/^\\/,"")]}
        HUB.RestartAfter(AJAX.Require(file));
      }
    },
    
    Macro: function (name,macro,argcount,def) {
      if (argcount) {
        var args = [];
        if (def != null) {
          var optional = this.GetBrackets(name);
          args.push(optional == null ? def : optional);
        }
        for (var i = args.length; i < argcount; i++) {args.push(this.GetArgument(name))}
        macro = this.SubstituteArgs(args,macro);
      }
      this.string = this.AddArgs(macro,this.string.slice(this.i));
      this.i = 0;
      if (++this.macroCount > TEX.config.MAXMACROS)
        {TEX.Error("MathJax maximum macro substitution count exceeded; is there a recursive macro call?")}
    },
    
    Matrix: function (name,open,close,align,spacing,vspacing,style,cases) {
      var c = this.GetNext(); if (c === "") {TEX.Error("Missing argument for "+name)}
      if (c === "{") {this.i++} else {this.string = c+"}"+this.string.slice(this.i+1); this.i = 0}
      var array = STACKITEM.array().With({
        requireClose: true,
        arraydef: {
          rowspacing: (vspacing||"4pt"),
          columnspacing: (spacing||"1em")
        }
      });
      if (cases)         {array.isCases = true}
      if (open || close) {array.open = open; array.close = close}
      if (style === "D") {array.arraydef.displaystyle = true}
      if (align != null) {array.arraydef.columnalign = align}
      this.Push(array);
    },
    
    Entry: function (name) {
      this.Push(STACKITEM.cell().With({isEntry: true, name: name}));
      if (this.stack.Top().isCases) {
        var string = this.string;
        var braces = 0, i = this.i, m = string.length;
        while (i < m) {
          var c = string.charAt(i);
          if (c === "{") {braces++; i++}
          else if (c === "}") {if (braces === 0) {m = 0} else {braces--; i++}}
          else if (c === "&" && braces === 0) {TEX.Error("Extra alignment tab in \\cases text")}
          else if (c === "\\") {
            if (string.substr(i).match(/^((\\cr)[^a-zA-Z]|\\\\)/)) {m = 0} else {i += 2}
          } else {i++}
        }
        var text = string.substr(this.i,i-this.i);
        if (!text.match(/^\s*\\text[^a-zA-Z]/)) {
          this.Push.apply(this,this.InternalMath(text));
          this.i = i;
        }
      }
    },
    
    Cr: function (name) {
      this.Push(STACKITEM.cell().With({isCR: true, name: name}));
    },
    
    CrLaTeX: function (name) {
      var n;
      if (this.string.charAt(this.i) === "[") {
        n = this.GetBrackets(name,"").replace(/ /g,"");
        if (n && !n.match(/^((-?(\.\d+|\d+(\.\d*)?))(pt|em|ex|mu|mm|cm|in|pc))$/))
          {TEX.Error("Bracket argument to "+name+" must be a dimension")}
      }
      this.Push(STACKITEM.cell().With({isCR: true, name: name, linebreak: true}));
      var top = this.stack.Top();
      if (top.isa(STACKITEM.array)) {
        if (n && top.arraydef.rowspacing) {
          var rows = top.arraydef.rowspacing.split(/ /);
          if (!top.rowspacing) {top.rowspacing = this.dimen2em(rows[0])}
          while (rows.length < top.table.length) {rows.push(this.Em(top.rowspacing))}
          rows[top.table.length-1] = this.Em(Math.max(0,top.rowspacing+this.dimen2em(n)));
          top.arraydef.rowspacing = rows.join(' ');
        }
      } else {
        if (n) {this.Push(MML.mspace().With({depth:n}))}
        this.Push(MML.mo().With({linebreak:MML.LINEBREAK.NEWLINE}));
      }
    },
    emPerInch: 7.2,
    dimen2em: function (dim) {
      var match = dim.match(/^(-?(?:\.\d+|\d+(?:\.\d*)?))(pt|em|ex|mu|pc|in|mm|cm)/);
      var m = parseFloat(match[1]||"1"), unit = match[2];
      if (unit === "em") {return m}
      if (unit === "ex") {return m * .43}
      if (unit === "pt") {return m / 10}                    // 10 pt to an em
      if (unit === "pc") {return m * 1.2}                   // 12 pt to a pc
      if (unit === "in") {return m * this.emPerInch}
      if (unit === "cm") {return m * this.emPerInch / 2.54} // 2.54 cm to an inch
      if (unit === "mm") {return m * this.emPerInch / 25.4} // 10 mm to a cm
      if (unit === "mu") {return m / 18}
      return 0;
    },
    Em: function (m) {
      if (Math.abs(m) < .0006) {return "0em"}
      return m.toFixed(3).replace(/\.?0+$/,"") + "em";
    },
    
    HLine: function (name,style) {
      if (style == null) {style = "solid"}
      var top = this.stack.Top();
      if (!top.isa(STACKITEM.array) || top.data.length) {TEX.Error("Misplaced "+name)}
      if (top.table.length == 0) {
        top.frame.push("top");
      } else {
        var lines = (top.arraydef.rowlines ? top.arraydef.rowlines.split(/ /) : []);
        while (lines.length < top.table.length) {lines.push("none")}
        lines[top.table.length-1] = style;
        top.arraydef.rowlines = lines.join(' ');
      }
    },
    
   /************************************************************************/
   /*
    *   LaTeX environments
    */

    Begin: function (name) {
      var env = this.GetArgument(name);
      if (env.match(/[^a-z*]/i)) {TEX.Error('Invalid environment name "'+env+'"')}
      var cmd = this.envFindName(env); if (!cmd) {TEX.Error('Unknown environment "'+env+'"')}
      if (++this.macroCount > TEX.config.MAXMACROS)
        {TEX.Error("MathJax maximum substitution count exceeded; is there a recursive latex environment?")}
      if (!(cmd instanceof Array)) {cmd = [cmd]}
      var mml = STACKITEM.begin().With({name: env, end: cmd[1], parse:this});
      if (cmd[0] && this[cmd[0]]) {mml = this[cmd[0]].apply(this,[mml].concat(cmd.slice(2)))}
      this.Push(mml);
    },
    End: function (name) {
      this.Push(STACKITEM.end().With({name: this.GetArgument(name)}));
    },
    envFindName: function (name) {return TEXDEF.environment[name]},
    
    Equation: function (begin,row) {return row},
    
    ExtensionEnv: function (begin,file) {this.Extension(begin.name,file,"environment")},
    
    Array: function (begin,open,close,align,spacing,vspacing,style,raggedHeight) {
      if (!align) {align = this.GetArgument("\\begin{"+begin.name+"}")}
      var lines = ("c"+align).replace(/[^clr|:]/g,'').replace(/[^|:]([|:])+/g,'$1');
      align = align.replace(/[^clr]/g,'').split('').join(' ');
      align = align.replace(/l/g,'left').replace(/r/g,'right').replace(/c/g,'center');
      var array = STACKITEM.array().With({
        arraydef: {
          columnalign: align,
          columnspacing: (spacing||"1em"),
          rowspacing: (vspacing||"4pt")
        }
      });
      if (lines.match(/[|:]/)) {
        if (lines.charAt(0).match(/[|:]/)) {array.frame.push("left"); array.frame.dashed = lines.charAt(0) === ":"}
        if (lines.charAt(lines.length-1).match(/[|:]/)) {array.frame.push("right")}
        lines = lines.substr(1,lines.length-2);
        array.arraydef.columnlines =
          lines.split('').join(' ').replace(/[^|: ]/g,'none').replace(/\|/g,'solid').replace(/:/g,'dashed');
      }
      if (open)  {array.open  = this.convertDelimiter(open)}
      if (close) {array.close = this.convertDelimiter(close)}
      if (style === "D") {array.arraydef.displaystyle = true}
      if (style === "S") {array.arraydef.scriptlevel = 1} // FIXME: should use mstyle?
      if (raggedHeight)  {array.arraydef.useHeight = false}
      this.Push(begin);
      return array;
    },
    
    AlignedArray: function (begin) {
      var align = this.GetBrackets("\\begin{"+begin.name+"}");
      return this.setArrayAlign(this.Array.apply(this,arguments),align);
    },
    setArrayAlign: function (array,align) {
      align = this.trimSpaces(align||"");
      if (align === "t") {array.arraydef.align = "baseline 1"}
      else if (align === "b") {array.arraydef.align = "baseline -1"}
      else if (align === "c") {array.arraydef.align = "center"}
      else if (align) {array.arraydef.align = align} // FIXME: should be an error?
      return array;
    },
    
    /************************************************************************/
    /*
     *   String handling routines
     */

    /*
     *  Convert delimiter to character
     */
    convertDelimiter: function (c) {
      if (c) {c = TEXDEF.delimiter[c]}
      if (c == null) {return null}
      if (c instanceof Array) {c = c[0]}
      if (c.length === 4) {c = String.fromCharCode(parseInt(c,16))}
      return c;
    },

    /*
     *  Trim spaces from a string
     */
    trimSpaces: function (text) {
      if (typeof(text) != 'string') {return text}
      return text.replace(/^\s+|\s+$/g,'');
    },

    /*
     *   Check if the next character is a space
     */
    nextIsSpace: function () {
      return this.string.charAt(this.i).match(/[ \n\r\t]/);
    },
    
    /*
     *  Get the next non-space character
     */
    GetNext: function () {
      while (this.nextIsSpace()) {this.i++}
      return this.string.charAt(this.i);
    },
  
    /*
     *  Get and return a control-sequence name
     */
    GetCS: function () {
      var CS = this.string.slice(this.i).match(/^([a-z]+|.) ?/i);
      if (CS) {this.i += CS[1].length; return CS[1]} else {this.i++; return " "}
    },

    /*
     *  Get and return a TeX argument (either a single character or control sequence,
     *  or the contents of the next set of braces).
     */
    GetArgument: function (name,noneOK) {
      switch (this.GetNext()) {
       case "":
        if (!noneOK) {TEX.Error("Missing argument for "+name)}
        return null;
       case '}':
        if (!noneOK) {TEX.Error("Extra close brace or missing open brace")}
        return null;
       case '\\':
        this.i++; return "\\"+this.GetCS();
       case '{':
        var j = ++this.i, parens = 1;
        while (this.i < this.string.length) {
          switch (this.string.charAt(this.i++)) {
           case '\\':  this.i++; break;
           case '{':   parens++; break;
           case '}':
            if (parens == 0) {TEX.Error("Extra close brace")}
            if (--parens == 0) {return this.string.slice(j,this.i-1)}
            break;
          }
        }
        TEX.Error("Missing close brace");
        break;
      }        
      return this.string.charAt(this.i++);
    },
    
    /*
     *  Get an optional LaTeX argument in brackets
     */
    GetBrackets: function (name,def) {
      if (this.GetNext() != '[') {return def};
      var j = ++this.i, parens = 0;
      while (this.i < this.string.length) {
        switch (this.string.charAt(this.i++)) {
         case '{':   parens++; break;
         case '\\':  this.i++; break;
         case '}':
          if (parens-- <= 0) {TEX.Error("Extra close brace while looking for ']'")}
          break;   
         case ']':
          if (parens == 0) {return this.string.slice(j,this.i-1)}
          break;
        }
      }
      TEX.Error("Couldn't find closing ']' for argument to "+name);
    },
  
    /*
     *  Get the name of a delimiter (check it in the delimiter list).
     */
    GetDelimiter: function (name) {
      while (this.nextIsSpace()) {this.i++}
      var c = this.string.charAt(this.i);
      if (this.i < this.string.length) {
        this.i++; if (c == "\\") {c += this.GetCS(name)}
        if (TEXDEF.delimiter[c] != null) {return this.convertDelimiter(c)}
      }
      TEX.Error("Missing or unrecognized delimiter for "+name);
    },

    /*
     *  Get a dimension (including its units).
     */
    GetDimen: function (name) {
      var dimen;
      if (this.nextIsSpace()) {this.i++}
      if (this.string.charAt(this.i) == '{') {
        dimen = this.GetArgument(name);
        if (dimen.match(/^\s*([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)\s*$/))
          {return dimen.replace(/ /g,"")}
      } else {
        dimen = this.string.slice(this.i);
        var match = dimen.match(/^\s*(([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)) ?/);
        if (match) {
          this.i += match[0].length;
          return match[1].replace(/ /g,"");
        }
      }
      TEX.Error("Missing dimension or its units for "+name);
    },
    
    /*
     *  Get everything up to the given control sequence (token)
     */
    GetUpTo: function (name,token) {
      while (this.nextIsSpace()) {this.i++}
      var j = this.i, k, c, parens = 0;
      while (this.i < this.string.length) {
        k = this.i; c = this.string.charAt(this.i++);
        switch (c) {
         case '\\':  c += this.GetCS(); break;
         case '{':   parens++; break;
         case '}':
          if (parens == 0) {TEX.Error("Extra close brace while looking for "+token)}
          parens--;
          break;
        }
        if (parens == 0 && c == token) {return this.string.slice(j,k)}
      }
      TEX.Error("Couldn't find "+token+" for "+name);
    },

    /*
     *  Parse various substrings
     */
    ParseArg: function (name) {return TEX.Parse(this.GetArgument(name),this.stack.env).mml()},
    ParseUpTo: function (name,token) {return TEX.Parse(this.GetUpTo(name,token),this.stack.env).mml()},
    
    /*
     *  Break up a string into text and math blocks
     *  @@@ FIXME:  skip over braced groups?  @@@
     *  @@@ FIXME:  pass environment to TEX.Parse? @@@
     */
    InternalMath: function (text,level) {
      var def = {displaystyle: false}; if (level != null) {def.scriptlevel = level}
      if (this.stack.env.font) {def.mathvariant = this.stack.env.font}
      if (!text.match(/\$|\\\(|\\(eq)?ref\s*\{/)) {return [this.InternalText(text,def)]}
      var i = 0, k = 0, c, match = '';
      var mml = [];
      while (i < text.length) {
        c = text.charAt(i++);
        if (c === '$') {
          if (match === '$') {
            mml.push(MML.TeXAtom(TEX.Parse(text.slice(k,i-1),{}).mml().With(def)));
            match = ''; k = i;
          } else if (match === '') {
            if (k < i-1) {mml.push(this.InternalText(text.slice(k,i-1),def))}
            match = '$'; k = i;
          }
        } else if (c === '}' && match === '}') {
          mml.push(MML.TeXAtom(TEX.Parse(text.slice(k,i),{}).mml().With(def)));
          match = ''; k = i;
        } else if (c === '\\') {
          if (match === '' && text.substr(i).match(/^(eq)?ref\s*\{/)) {
            if (k < i-1) {mml.push(this.InternalText(text.slice(k,i-1),def))}
            match = '}'; k = i-1;
          } else {
            c = text.charAt(i++);
            if (c === '(' && match === '') {
              if (k < i-2) {mml.push(this.InternalText(text.slice(k,i-2),def))}
              match = ')'; k = i;
            } else if (c === ')' && match === ')') {
              mml.push(MML.TeXAtom(TEX.Parse(text.slice(k,i-2),{}).mml().With(def)));
              match = ''; k = i;
            }
          }
        }
      }
      if (match !== '') {TEX.Error("Math not terminated in text box")}
      if (k < text.length) {mml.push(this.InternalText(text.slice(k),def))}
      return mml;
    },
    InternalText: function (text,def) {
      text = text.replace(/^\s+/,NBSP).replace(/\s+$/,NBSP);
      return MML.mtext(MML.chars(text)).With(def);
    },

    /*
     *  Replace macro paramters with their values
     */
    SubstituteArgs: function (args,string) {
      var text = ''; var newstring = ''; var c; var i = 0;
      while (i < string.length) {
        c = string.charAt(i++);
        if (c === "\\") {text += c + string.charAt(i++)}
        else if (c === '#') {
          c = string.charAt(i++);
          if (c === '#') {text += c} else {
            if (!c.match(/[1-9]/) || c > args.length)
              {TEX.Error("Illegal macro parameter reference")}
            newstring = this.AddArgs(this.AddArgs(newstring,text),args[c-1]);
            text = '';
          }
        } else {text += c}
      }
      return this.AddArgs(newstring,text);
    },
    
    /*
     *  Make sure that macros are followed by a space if their names
     *  could accidentally be continued into the following text.
     */
    AddArgs: function (s1,s2) {
      if (s2.match(/^[a-z]/i) && s1.match(/(^|[^\\])(\\\\)*\\[a-z]+$/i)) {s1 += ' '}
      if (s1.length + s2.length > TEX.config.MAXBUFFER)
        {TEX.Error("MathJax internal buffer size exceeded; is there a recursive macro call?")}
      return s1+s2;
    }
    
  });
  
  /************************************************************************/

  TEX.Augment({
    Stack: STACK, Parse: PARSE, Definitions: TEXDEF, Startup: STARTUP,
    
    config: {
      MAXMACROS: 10000,    // maximum number of macro substitutions per equation
      MAXBUFFER: 5*1024    // maximum size of TeX string to process
    },
    
    sourceMenuTitle: "TeX Commands",

    prefilterHooks: MathJax.Callback.Hooks(true),    // hooks to run before processing TeX
    postfilterHooks: MathJax.Callback.Hooks(true),   // hooks to run after processing TeX
    
    //
    //  Check if AMSmath extension must be loaded and push
    //    it on the extensions array, if needed
    //
    Config: function () {
      this.SUPER(arguments).Config.apply(this,arguments);
      if (this.config.equationNumbers.autoNumber !== "none") {
        if (!this.config.extensions) {this.config.extensions = []}
        this.config.extensions.push("AMSmath.js");
      }
    },

    //
    //  Convert TeX to ElementJax
    //
    Translate: function (script) {
      var mml, isError = false, math = MathJax.HTML.getScript(script);
      var display = (script.type.replace(/\n/g," ").match(/(;|\s|\n)mode\s*=\s*display(;|\s|\n|$)/) != null);
      var data = {math:math, display:display, script:script};
      this.prefilterHooks.Execute(data); math = data.math;
      try {
        mml = TEX.Parse(math).mml();
//        mml = MML.semantics(mml,MML.annotation(math).With({encoding:"application/x-tex"}));
      } catch(err) {
        if (!err.texError) {throw err}
        mml = this.formatError(err,math,display,script);
        isError = true;
      }
      if (mml.inferred) {mml = MML.apply(MathJax.ElementJax,mml.data)} else {mml = MML(mml)}
      if (display) {mml.root.display = "block"}
      if (isError) {mml.texError = true}
      data.math = mml; this.postfilterHooks.Execute(data);
      return data.math;
    },
    prefilterMath: function (math,displaystyle,script) {
      return math;
    },
    postfilterMath: function (math,displaystyle,script) {
      this.combineRelations(math.root);
      return math;
    },
    formatError: function (err,math,display,script) {
      var message = err.message.replace(/\n.*/,"");
      HUB.signal.Post(["TeX Jax - parse error",message,math,display,script]);
      return MML.merror(message);
    },

    //
    //  Produce an error and stop processing this equation
    //
    Error: function (message) {
      throw HUB.Insert(Error(message),{texError: true});
    },
    
    //
    //  Add a user-defined macro to the macro list
    //
    Macro: function (name,def,argn) {
      TEXDEF.macros[name] = ['Macro'].concat([].slice.call(arguments,1));
      TEXDEF.macros[name].isUser = true;
    },
    
    //
    //  Combine adjacent <mo> elements that are relations
    //    (since MathML treats the spacing very differently)
    //
    combineRelations: function (mml) {
      var i, m, m1, m2;
      for (i = 0, m = mml.data.length; i < m; i++) {
        if (mml.data[i]) {
          if (mml.isa(MML.mrow)) {
            while (i+1 < m && (m1 = mml.data[i]) && (m2 = mml.data[i+1]) &&
                   m1.isa(MML.mo) && m2.isa(MML.mo) &&
                   m1.Get("texClass") === MML.TEXCLASS.REL &&
                   m2.Get("texClass") === MML.TEXCLASS.REL) {
              if (m1.variantForm == m2.variantForm &&
                  m1.Get("mathvariant") == m2.Get("mathvariant") && m1.style == m2.style &&
                  m1["class"] == m2["class"] && !m1.id && !m2.id) {
                m1.Append.apply(m1,m2.data);
                mml.data.splice(i+1,1); m--;
              } else {
                m1.rspace = m2.lspace = "0pt"; i++;
              }
            }
          }
          if (!mml.data[i].isToken) {this.combineRelations(mml.data[i])}
        }
      }
    }
  });

  //
  //  Add the default filters
  //
  TEX.prefilterHooks.Add(function (data) {
    data.math = TEX.prefilterMath(data.math,data.display,data.script);
  });
  TEX.postfilterHooks.Add(function (data) {
    data.math = TEX.postfilterMath(data.math,data.display,data.script);
  });

  TEX.loadComplete("jax.js");
  
})(MathJax.InputJax.TeX,MathJax.Hub,MathJax.Ajax);
