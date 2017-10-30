/*************************************************************
 *
 *  MathJax/extensions/TeX/begingroup.js
 *  
 *  Implements \begingroup and \endgroup commands that make local 
 *  definitions possible and are removed when the \endgroup occurs.  
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2012 Design Science, Inc.
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

MathJax.Extension["TeX/begingroup"] = {
  version: "2.1"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {

  var TEX = MathJax.InputJax.TeX,
      TEXDEF = TEX.Definitions;

  /****************************************************/

  //
  //  A namespace for localizing macros and environments
  //  (\begingroup and \endgroup create and destroy these)
  //
  var NSFRAME = MathJax.Object.Subclass({
    macros: null,         // the local macro definitions
    environments: null,   // the local environments
    Init: function (macros,environments) {
      this.macros = (macros || {});
      this.environments = (environments || {});
    },
    //
    //  Find a macro or environment by name
    //
    Find: function (name,type) {if (this[type][name]) {return this[type][name]}},
    //
    //  Define or remove a macro or environment
    //
    Def: function (name,value,type) {this[type][name] = value},
    Undef: function (name,type) {delete this[type][name]},
    //
    //  Merge two namespaces (used when the equation namespace is combined with the root one)
    //
    Merge: function (frame) {
      MathJax.Hub.Insert(this.macros,frame.macros);
      MathJax.Hub.Insert(this.environments,frame.environments);
    },
    //
    //  Move global macros to the stack (globally) and remove from the frame
    //
    MergeGlobals: function (stack) {
      var macros = this.macros;
      for (var cs in macros) {if (macros.hasOwnProperty(cs) && macros[cs].global) {
        stack.Def(cs,macros[cs],"macros",true);
        delete macros[cs].global; delete macros[cs];
      }}
    },
    //
    //  Clear the macro and environment lists
    //  (but not global macros unless "all" is true)
    //
    Clear: function (all) {
      this.environments = {};
      if (all) {this.macros = {}} else {
        var macros = this.macros;
        for (var cs in macros) {
          if (macros.hasOwnProperty(cs) && !macros[cs].global) {delete macros[cs]}
        }
      }
      return this;
    }
  });

  /****************************************************/

  //
  //  A Stack of namespace frames
  //
  var NSSTACK = TEX.nsStack = MathJax.Object.Subclass({
    stack: null,         // the namespace frames
    top: 0,              // the current top one (we don't pop for real until the equation completes)
    isEqn: false,        // true if this is the equation stack (not the global one)
    //
    //  Set up the initial stack frame
    //
    Init: function (eqn) {
      this.isEqn = eqn; this.stack = [];
      if (!eqn) {this.Push(NSFRAME(TEXDEF.macros,TEXDEF.environment))}
           else {this.Push(NSFRAME())}
    },
    //
    //  Define a macro or environment in the top frame
    //
    Def: function (name,value,type,global) {
      var n = this.top-1;
      if (global) {
        //
        //  Define global macros in the base frame and remove that cs
        //  from all other frames.  Mark the global ones in equations
        //  so they can be made global when merged with the root stack.
        //
        while (n > 0) {this.stack[n].Undef(name,type); n--}
        if (!(value instanceof Array)) {value = [value]}
        if (this.isEqn) {value.global = true}
      }
      this.stack[n].Def(name,value,type);
    },
    //
    //  Push a new namespace frame on the stack
    //
    Push: function (frame) {
      this.stack.push(frame);
      this.top = this.stack.length;
    },
    //
    //  Pop the top stack frame
    //  (if it is the root, just keep track of the pop so we can
    //   reset it if the equation is reprocessed)
    //
    Pop: function () {
      var top;
      if (this.top > 1) {
        top = this.stack[--this.top];
        if (this.isEqn) {this.stack.pop()}
      } else if (this.isEqn) {
        this.Clear();
      }
      return top;
    },
    //
    //  Search the stack from top to bottom for the first
    //    definition of the given control sequence in the given type
    //
    Find: function (name,type) {
      for (var i = this.top-1; i >= 0; i--) {
        var def = this.stack[i].Find(name,type);
        if (def) {return def}
      }
      return null;
    },
    //
    //  Combine the equation stack with the global one
    //  (The bottom frame of the equation goes with the top frame of the global one,
    //   and the remainder are pushed on the global stack, truncated to the
    //   position where items were poped from it.)
    //
    Merge: function (stack) {
      stack.stack[0].MergeGlobals(this);
      this.stack[this.top-1].Merge(stack.stack[0]);
      var data = [this.top,this.stack.length-this.top].concat(stack.stack.slice(1));
      this.stack.splice.apply(this.stack,data);
      this.top = this.stack.length;
    },
    //
    //  Put back the temporarily poped items
    //
    Reset: function () {this.top = this.stack.length},
    //
    //  Clear the stack and start with a blank frame
    //
    Clear: function (all) {
      this.stack = [this.stack[0].Clear()];
      this.top = this.stack.length;
    }
  },{
    nsFrame: NSFRAME
  });

  /****************************************************/

  //
  //  Define the new macros
  //
  TEXDEF.Add({
    macros: {
      begingroup: "BeginGroup",
      endgroup:   "EndGroup",
      global:     ["Extension","newcommand"],
      gdef:       ["Extension","newcommand"]
    }
  },null,true);
  
  TEX.Parse.Augment({
    //
    //  Implement \begingroup
    //
    BeginGroup: function (name) {
      TEX.eqnStack.Push(NSFRAME());
    },
    //
    //  Implements \endgroup
    //
    EndGroup: function (name) {
      //
      //  If the equation has pushed frames, pop one,
      //  Otherwise clear the equation stack and pop the top global one
      //
      if (TEX.eqnStack.top > 1) {
        TEX.eqnStack.Pop();
      } else if (TEX.rootStack.top === 1) {
        TEX.Error("Extra "+name+" or missing \\begingroup");
      } else {
        TEX.eqnStack.Clear();
        TEX.rootStack.Pop();
      }
    },

    //
    //  Replace the original routines with ones that looks through the
    //  equation and root stacks for the given name
    //  
    csFindMacro: function (name) {
      return (TEX.eqnStack.Find(name,"macros") || TEX.rootStack.Find(name,"macros"));
    },
    envFindName: function (name) {
      return (TEX.eqnStack.Find(name,"environments") || TEX.rootStack.Find(name,"environments"));
    }

  });

  /****************************************************/

  TEX.rootStack = NSSTACK();         // the global namespace stack
  TEX.eqnStack  = NSSTACK(true);     // the equation stack

  //
  //  Reset the global stack and clear the equation stack
  //  (this gets us back to the initial stack state as it was
  //   before the equation was first processed, in case the equation
  //   get restarted due to an autoloaded file)
  //
  TEX.prefilterHooks.Add(function () {TEX.rootStack.Reset(); TEX.eqnStack.Clear(true)});
  
  //
  //  We only get here if there were no errors and the equation is fully
  //  processed (all restarts are complete).  So we merge the equation
  //  stack into the global stack, thus making the changes from this
  //  equation permanent.
  //
  TEX.postfilterHooks.Add(function () {TEX.rootStack.Merge(TEX.eqnStack)});
  
  /*********************************************************/

  MathJax.Hub.Register.StartupHook("TeX newcommand Ready",function () {

    //
    //  Add the commands that depend on the newcommand code
    //
    TEXDEF.Add({
      macros: {
        global: "Global",
        gdef:   ["Macro","\\global\\def"]
      }
    },null,true);

    TEX.Parse.Augment({
      //
      //  Modify the way macros and environments are defined
      //  to make them go into the equation namespace stack
      //
      setDef: function (name,value) {
        value.isUser = true;
        TEX.eqnStack.Def(name,value,"macros",this.stack.env.isGlobal);
        delete this.stack.env.isGlobal;
      },
      setEnv: function (name,value) {
        value.isUser = true;
        TEX.eqnStack.Def(name,value,"environments")
      },

      //
      //  Implement \global (for \global\let, \global\def and \global\newcommand)
      //
      Global: function (name) {
        var i = this.i; var cs = this.GetCSname(name); this.i = i;
        if (cs !== "let" && cs !== "def" && cs !== "newcommand")
        {TEX.Error(name+" not followed by \\let, \\def, or \\newcommand")}
        this.stack.env.isGlobal = true;
      }

    });

  });

  MathJax.Hub.Startup.signal.Post("TeX begingroup Ready");

});

MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/begingroup.js");
