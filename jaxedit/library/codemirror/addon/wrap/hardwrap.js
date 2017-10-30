(function() {
  "use strict";

  var Pos = CodeMirror.Pos;

  function findParagraph(cm, pos, options) {
    var startRE = options.paragraphStart || cm.getHelper(pos, "paragraphStart");
    for (var start = pos.line, first = cm.firstLine(); start > first; --start) {
      var line = cm.getLine(start);
      if (startRE && startRE.test(line)) break;
      if (!/\S/.test(line)) { ++start; break; }
    }
    var endRE = options.paragraphEnd || cm.getHelper(pos, "paragraphEnd");
    for (var end = pos.line + 1, last = cm.lastLine(); end <= last; ++end) {
      var line = cm.getLine(end);
      if (endRE && endRE.test(line)) { ++end; break; }
      if (!/\S/.test(line)) break;
    }
    return {from: start, to: end};
  }

  function findBreakPoint(text, column, wrapOn, killTrailingSpace) {
    for (var at = column; at > 0; --at)
      if (wrapOn.test(text.slice(at - 1, at + 1))) break;
    if (at == 0) at = column;
    var endOfText = at;
    if (killTrailingSpace)
      while (text.charAt(endOfText - 1) == " ") --endOfText;
    return {from: endOfText, to: at};
  }

  function wrapRange(cm, from, to, options) {
    from = cm.clipPos(from); to = cm.clipPos(to);
    var column = options.column || 80;
    var wrapOn = options.wrapOn || /\s\S|-[^\.\d]/;
    var killTrailing = options.killTrailingSpace !== false;
    var changes = [], curLine = "", curNo = from.line;
    var lines = cm.getRange(from, to, false);
    for (var i = 0; i < lines.length; ++i) {
      var text = lines[i], oldLen = curLine.length, spaceInserted = 0;
      if (curLine && text && !wrapOn.test(curLine.charAt(curLine.length - 1) + text.charAt(0))) {
        curLine += " ";
        spaceInserted = 1;
      }
      curLine += text;
      if (i) {
        var firstBreak = curLine.length > column && findBreakPoint(curLine, column, wrapOn, killTrailing);
        // If this isn't broken, or is broken at a different point, remove old break
        if (!firstBreak || firstBreak.from != oldLen || firstBreak.to != oldLen + spaceInserted) {
          changes.push({text: spaceInserted ? " " : "",
                        from: Pos(curNo, oldLen),
                        to: Pos(curNo + 1, 0)});
        } else {
          curLine = text;
          ++curNo;
        }
      }
      while (curLine.length > column) {
        var bp = findBreakPoint(curLine, column, wrapOn, killTrailing);
        changes.push({text: "\n",
                      from: Pos(curNo, bp.from),
                      to: Pos(curNo, bp.to)});
        curLine = curLine.slice(bp.to);
        ++curNo;
      }
    }
    if (changes.length) cm.operation(function() {
      for (var i = 0; i < changes.length; ++i) {
        var change = changes[i];
        cm.replaceRange(change.text, change.from, change.to);
      }
    });
  }

  CodeMirror.defineExtension("wrapParagraph", function(pos, options) {
    options = options || {};
    if (!pos) pos = this.getCursor();
    var para = findParagraph(this, pos, options);
    wrapRange(this, Pos(para.from, 0), Pos(para.to - 1), options);
  });

  CodeMirror.defineExtension("wrapRange", function(from, to, options) {
    wrapRange(this, from, to, options || {});
  });

  CodeMirror.defineExtension("wrapParagraphsInRange", function(from, to, options) {
    options = options || {};
    var cm = this, paras = [];
    for (var line = from.line; line <= to.line;) {
      var para = findParagraph(cm, Pos(line, 0), options);
      paras.push(para);
      line = para.to;
    }
    if (paras.length) cm.operation(function() {
      for (var i = paras.length - 1; i >= 0; --i)
        wrapRange(cm, Pos(paras[i].from, 0), Pos(paras[i].to - 1), options);
    });
  });
})();
