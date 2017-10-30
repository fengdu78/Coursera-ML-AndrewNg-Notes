// Depends on csslint.js from https://github.com/stubbornella/csslint

// declare global: CSSLint

CodeMirror.registerHelper("lint", "css", function(text) {
  var found = [];
  var results = CSSLint.verify(text), messages = results.messages, message = null;
  for ( var i = 0; i < messages.length; i++) {
    message = messages[i];
    var startLine = message.line -1, endLine = message.line -1, startCol = message.col -1, endCol = message.col;
    found.push({
      from: CodeMirror.Pos(startLine, startCol),
      to: CodeMirror.Pos(endLine, endCol),
      message: message.message,
      severity : message.type
    });
  }
  return found;
});
