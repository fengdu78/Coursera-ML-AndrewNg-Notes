
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

window.onload = function() {
  var tests = [
    {
      info: "text",
      code: "One\n\nTwo",
      tree: "|main tree 0  \n|--block par 0 3 \n|----inline itext 0 -1 One\n|--block par 3 8 \n|----inline itext 3 -1 Two"
    }, {
      info: "math",
      code: "$\\alpha$ and \\[\\beta\\]",
      tree: "|main tree 0  \n|--block par 0 22 \n|----inline imath 0 8 \\alpha\n|----inline itext 8 -1  and \n|----block bmath 13 env \\beta\n|----inline itext env -1 "
    }, {
      info: "article",
      code: "\\documentclass{article}\\begin{document}One\\end{document}",
      tree: "|main tree 0  \n|--main preamble 0 39 \n|----block par 0 23 \n|------inline documentclass 0 23 \n|--------inline {} 14 23 \n|----------inline itext 14 -1 article\n|------inline itext 23 -1 \n|--block par 39 42 \n|----inline itext 39 -1 One\n|--block par 42 56 "
    }, {
      info: "beamer",
      code: "\\documentclass{beamer}\n\\begin{document}\n\\begin{frame}\nOne\n\\end{frame}\n\\end{document}",
      tree: "|main tree 0  \n|--main preamble 0 39 \n|----block par 0 23 \n|------inline documentclass 0 22 \n|--------inline {} 14 22 \n|----------inline itext 14 -1 beamer\n|------inline itext 22 -1  \n|--block par 39 84 \n|main tree 0  \n|--main preamble 0 39 \n|----block par 0 23 \n|------inline documentclass 0 22 \n|--------inline {} 14 22 \n|----------inline itext 14 -1 beamer\n|------inline itext 22 -1  \n|--block par 39 40 \n|--main frame 40 69 \n|----block par 54 58 \n|------inline itext 54 -1 One \n|--block par 69 70 \n|--block par 70 84 "
    }, {
      info: "textbf",
      code: "One \\textbf{Two} Three",
      tree: "|main tree 0  \n|--block par 0 22 \n|----inline itext 0 -1 One \n|----inline textbf 4 16 <b>Two</b>\n|----inline itext 16 -1  Three"
  }];

  var testarea = document.getElementById("testarea"), value = testarea.value;
  if (value) tests.push({ info: "textarea", code: value, tree: "" });

  var output = document.getElementById("output");
  var message = typejax.message;
  var test, code, tree, tree1, i = 0;

  function doTest() {
    test = tests[i], code = test.code, tree = test.tree;
    typejax.parser.load(code, 0, code.length, callback);
  }

  function callback() {
    tree1 = message.get("tree");
    message.clear("tree");
    if (tree === tree1) {
      output.innerHTML += "<p><span class='passed'>passed</span> in testing " + test.info + ".</p>";
    } else {
      output.innerHTML += "<p><span class='failed'>failed</span> in testing " + test.info + ".</p>";
      console.log(tree);
      console.log(tree1);
      console.log(code.replace(/\\/g, "\\\\").replace(/\n/g, "\\n"));
      console.log(tree1.replace(/\\/g, "\\\\").replace(/\n/g, "\\n"));
    }
    if ((++i) < tests.length) doTest();
  }

  doTest();
}
