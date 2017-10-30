(function () {
  "use strict";

  var tables;
  var keywords;

  function getKeywords(editor) {
    var mode = editor.doc.modeOption;
    if(mode === "sql") mode = "text/x-sql";
    return CodeMirror.resolveMode(mode).keywords;
  }

  function match(string, word) {
    var len = string.length;
    var sub = word.substr(0, len);
    return string.toUpperCase() === sub.toUpperCase();
  }

  function addMatches(result, search, wordlist, formatter) {
    for(var word in wordlist) {
      if(!wordlist.hasOwnProperty(word)) continue;
      if(Array.isArray(wordlist)) {
        word = wordlist[word];
      }
      if(match(search, word)) {
        result.push(formatter(word));
      }
    }
  }

  function columnCompletion(result, editor) {
    var cur = editor.getCursor();
    var token = editor.getTokenAt(cur);
    var string = token.string.substr(1);
    var prevCur = CodeMirror.Pos(cur.line, token.start);
    var table = editor.getTokenAt(prevCur).string;
    var columns = tables[table];
    if(!columns) {
      table = findTableByAlias(table, editor);
    }
    columns = tables[table];
    if(!columns) {
      return;
    }
    addMatches(result, string, columns,
        function(w) {return "." + w;});
  }

  function eachWord(line, f) {
    var words = line.text.split(" ");
    for(var i = 0; i < words.length; i++) {
      f(words[i]);
    }
  }

  // Tries to find possible table name from alias.
  function findTableByAlias(alias, editor) {
    var aliasUpperCase = alias.toUpperCase();
    var previousWord = "";
    var table = "";

    editor.eachLine(function(line) {
      eachWord(line, function(word) {
        var wordUpperCase = word.toUpperCase();
        if(wordUpperCase === aliasUpperCase) {
          if(tables.hasOwnProperty(previousWord)) {
            table = previousWord;
          }
        }
        if(wordUpperCase !== "AS") {
          previousWord = word;
        }
      });
    });
    return table;
  }

  function sqlHint(editor, options) {
    tables = (options && options.tables) || {};
    keywords = keywords || getKeywords(editor);
    var cur = editor.getCursor();
    var token = editor.getTokenAt(cur);

    var result = [];

    var search = token.string.trim();

    addMatches(result, search, keywords,
        function(w) {return w.toUpperCase();});

    addMatches(result, search, tables,
        function(w) {return w;});

    if(search.lastIndexOf('.') === 0) {
      columnCompletion(result, editor);
    }

    return {
      list: result,
        from: CodeMirror.Pos(cur.line, token.start),
        to: CodeMirror.Pos(cur.line, token.end)
    };
  }
  CodeMirror.registerHelper("hint", "sql", sqlHint);
})();
