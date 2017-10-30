
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: The MIT License
 * Source:  https://github.com/zohooo/jaxedit
 */

(function(){
  var definitions = {environment: {}, command: {}};
  var renderers = {};

  var counters = {
    "part":         {content: "'\\007B2C\\0000A0' counter(part, upper-roman) '\\0000A0\\0090E8\\005206\\0000A0\\0000A0'"},
    "chapter":      {content: "'\\007B2C\\0000A0' counter(chapter) '\\0000A0\\007AE0\\0000A0\\0000A0'"},
    "section":      {parent: "chapter", content: "'\\007B2C\\0000A0' counter(section) '\\0000A0\\008282\\0000A0\\0000A0'"},
    "-toc-part":    {content: "'\\007B2C\\0000A0' counter(-toc-part, upper-roman) '\\0000A0\\0090E8\\005206\\0000A0\\0000A0'"},
    "-toc-chapter": {content: "'\\007B2C\\0000A0' counter(-toc-chapter) '\\0000A0\\007AE0\\0000A0\\0000A0'"},
    "-toc-section": {parent: "-toc-chapter", content: "'\\007B2C\\0000A0' counter(-toc-section) '\\0000A0\\008282\\0000A0\\0000A0'"}
  };

  typejax.parser.extend("ctex/ctex", definitions, renderers, null, counters);
})();
