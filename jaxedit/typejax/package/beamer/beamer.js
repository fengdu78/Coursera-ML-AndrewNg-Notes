
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {
    environment: {
      "corollary":                "theorem",
      "corollary*":               "theorem",
      "definition":               "theorem",
      "definition*":              "theorem",
      "definitions":              "theorem",
      "definitions*":             "theorem",
      "example":                  "theorem",
      "example*":                 "theorem",
      "examples":                 "theorem",
      "examples*":                "theorem",
      "fact":                     "theorem",
      "fact*":                    "theorem",
      "frame":                    {mode: "main", args: ["<>", "[]", "[]", "{]", "{]", "||"], outs: ["par", "frame", "center", "theorem"]},
      "proof":                    "theorem",
      "theorem":                  {mode: "main", args: ["[]", "||"], outs: ["par", "theorem"]},
      "theorem*":                 "theorem"
    },
    command: {
      "framesubtitle":            {mode: "block", args: ["{}"]},
      "frametitle":               {mode: "block", args: ["{}"]},
      "institute":                {mode: "inline", args: ["{}"]},
      "titlepage":                {mode: "block", args: []},
      "transblindshorizontal":    "transdissolve",
      "transblindsvertical":      "transdissolve",
      "transboxin":               "transdissolve",
      "transboxout":              "transdissolve",
      "transdissolve":            {mode: "inline", args: ["<>", "[]"]},
      "transduration":            {mode: "inline", args: ["<>", "{}"]},
      "transglitter":             "transdissolve",
      "transsplithorizontalin":   "transdissolve",
      "transsplithorizontalout":  "transdissolve",
      "transsplitverticalin":     "transdissolve",
      "transsplitverticalout":    "transdissolve",
      "transwipe":                "transdissolve",
      "usecolortheme":            {mode: "inline", args: ["[]", "{}"]},
      "usefonttheme":             {mode: "inline", args: ["[]", "{}"]},
      "useinnertheme":            {mode: "inline", args: ["[]", "{}"]},
      "useoutertheme":            {mode: "inline", args: ["[]", "{}"]},
      "usetheme":                 {mode: "inline", args: ["[]", "{}"]}
    }
  };

  function useTheme(node, that, type) {
    var parameters = that.readParameters(node),
        pkgoptn = parameters[0] ? parameters[0].split(/ *, */) : [],
        pkgname = parameters[1], pkginfo,
        prefix = "beamer" + (type || "") + "theme";
    if (pkgname) {
      pkgname = pkgname.split(/ *, */);
      for (var i = 0; i < pkgname.length; i++) {
        if (pkginfo = that.packages.info[prefix + pkgname[i]])
          that.addPackage([pkginfo.file, prefix + pkgname[i]].concat(pkgoptn));
      }
    }
  }

  var renderers = {
    envFrame : function(node) {
      //  \begin{frame}<overlay specification>[<default overlay specification>][options]{title}{subtitle}
      //  environment contents
      //  \end{frame
      var argarray = node.argarray, subnode;
      if (argarray[0]) {
        argarray[0].childs[0].value = "";
      }
      if (argarray[1]) {
        argarray[1].childs[0].value = "";
      }
      if (argarray[2]) {
        argarray[2].childs[0].value = "";
      }
      if (argarray[3]) {
        argarray[3].name = "frametitle", argarray[3].mode = "block";
        if (argarray[4]) {
          argarray[4].name = "framesubtitle", argarray[4].mode = "block";
        }
      }
    },

    envTheorem: function(node) {
      if (node.childs.length == 0) return;
      var envname = node.name, theorem = this.theorems[envname]; if (!theorem) return;
      var cname = (envname.slice(-1) == '*') ? envname.slice(0, -1) : envname,
          thmhead = thmname = theorem.thmname,
          counter = theorem.counter, star = theorem.star;
      if (counter) {
        thmhead += "<span class='the" + counter + "'></span>";
      } else if (!star) {
        thmhead += "<span class='the" + cname + "'></span>";
      }
      if (node.argarray[0]) {
        thmhead += " (" + node.argarray[0].childs[0].value + ")";
        node.childs.splice(0, 1);
      }
      var thmnode = {
        type: "env",
        name: "thmhead",
        mode: "block",
        from: node.from,
        value: "<span>" + thmhead + " </span>",
        parent: node,
        childs: []
      };
      node.childs.splice(0, 0, thmnode);
      node.name = "theorem";
    },

    cmdInstitute: function(node) {
      this.renderers.find("cmd", "title").call(this, node);
    },

    cmdPause: function() {
      this.addText("<span class='pause'></span>", this.place - 1);
    },

    cmdTitlepage: function(node) {
      this.renderers.find("cmd", "maketitle").call(this, node);
    },

    cmdUsecolortheme: function(node) {
      useTheme(node, this, "color");
    },

    cmdUsefonttheme: function(node) {
      useTheme(node, this, "font");
    },

    cmdUseinnertheme: function(node) {
      useTheme(node, this, "inner");
    },

    cmdUseoutertheme: function(node) {
      useTheme(node, this, "outer");
    },

    cmdUsetheme: function(node) {
      useTheme(node, this);
    }
  };

  typejax.parser.extend("beamer/beamer", definitions, renderers);
})();
