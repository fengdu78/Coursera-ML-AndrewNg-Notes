(function () {
  "use strict";

  function getHints(cm) {
    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
    var inner = CodeMirror.innerMode(cm.getMode(), token.state);
    if (inner.mode.name != "css") return;

    // If it's not a 'word-style' token, ignore the token.
    if (!/^[\w$_-]*$/.test(token.string)) {
      token = {
        start: cur.ch, end: cur.ch, string: "", state: token.state,
        type: null
      };
      var stack = token.state.stack;
      var lastToken = stack && stack.length > 0 ? stack[stack.length - 1] : "";
      if (token.string == ":" || lastToken.indexOf("property") == 0)
        token.type = "variable";
      else if (token.string == "{" || lastToken.indexOf("rule") == 0)
        token.type = "property";
    }

    if (!token.type)
      return;

    var spec = CodeMirror.resolveMode("text/css");
    var keywords = null;
    if (token.type.indexOf("property") == 0)
      keywords = spec.propertyKeywords;
    else if (token.type.indexOf("variable") == 0)
      keywords = spec.valueKeywords;

    if (!keywords)
      return;

    var result = [];
    for (var name in keywords) {
      if (name.indexOf(token.string) == 0 /* > -1 */)
        result.push(name);
    }

    return {
      list: result,
      from: CodeMirror.Pos(cur.line, token.start),
      to: CodeMirror.Pos(cur.line, token.end)
    };
  }

  CodeMirror.registerHelper("hint", "css", getHints);
})();
