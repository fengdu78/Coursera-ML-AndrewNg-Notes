CodeMirror.registerHelper("fold", "indent", function(cm, start) {
  var tabSize = cm.getOption("tabSize"), firstLine = cm.getLine(start.line);
  if (!/\S/.test(firstLine)) return;
  var getIndent = function(lineNum) {
    return CodeMirror.countColumn(lineNum, null, tabSize);
  };
  var myIndent = getIndent(firstLine);
  var lastLineInFold = null;
  // Go through lines until we find a line that definitely doesn't belong in
  // the block we're folding, or to the end.
  for (var i = start.line + 1, end = cm.lastLine(); i <= end; ++i) {
    var curLine = cm.getLine(i);
    var curIndent = getIndent(curLine);
    if (curIndent > myIndent) {
      // Lines with a greater indent are considered part of the block.
      lastLineInFold = i;
    } else if (!/\S/.test(curLine)) {
      // Empty lines might be breaks within the block we're trying to fold.
    } else {
      // A non-empty line at an indent equal to or less than ours marks the
      // start of another block.
      break;
    }
  }
  if (lastLineInFold) return {
    from: CodeMirror.Pos(start.line, firstLine.length),
    to: CodeMirror.Pos(lastLineInFold, cm.getLine(lastLineInFold).length)
  };
});
CodeMirror.indentRangeFinder = CodeMirror.fold.indent; // deprecated
