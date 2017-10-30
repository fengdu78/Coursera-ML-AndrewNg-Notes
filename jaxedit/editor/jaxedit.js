
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: GNU Lesser General Public License, Version 3
 * Source:  https://github.com/zohooo/jaxedit
 */

window.jaxedit = (function($){
  var gatepath = "",
      mathname = "MathJax.js?config=TeX-AMS_HTML",
      mathpath = "",
      shareurl = "";

  return {
    autoScroll: false,
    dialogMode: null,
    fileid: 0,
    fileName: "noname.tex",
    hasEditor: false,
    hasParser: false,
    localDrive: false,
    trustHost: false,
    useDrive: null,
    version: "0.40",
    mode: "write",
    view: "half",
    wcode: null,

    options: {
      debug: "none",
      highlight: false,
      localjs: false
    },

    childs: {
      html : document.documentElement,
      body : document.body,
      wrap : document.getElementById("wrap"),
      head : document.getElementById("head"),
      example : document.getElementById("example"),
      newbtn : document.getElementById("newbtn"),
      openbtn : document.getElementById("openbtn"),
      savebtn : document.getElementById("savebtn"),
      presbtn : document.getElementById("presbtn"),
      main : document.getElementById("main"),
      left : document.getElementById("left"),
      ltop : document.getElementById("ltop"),
      source : document.getElementById("source"),
      codearea : document.getElementById("codearea"),
      lbot : document.getElementById("lbot"),
      resizer : document.getElementById("resizer"),
      right : document.getElementById("right"),
      rtop : document.getElementById("rtop"),
      preview : document.getElementById("preview"),
      showarea : document.getElementById("showarea"),
      rbot : document.getElementById("rbot")
    },

    scrollers: {
      codelength : 0,
      codechange : 0,
      codescroll : 0,
      showscroll : 0,
      showheight : 1,
      divheights : []
    },

    textdata: {
      oldtextvalue : "", oldtextsize : 0, oldselstart : 0, oldselend : 0, oldseltext : "",
      newtextvalue : "", newtextsize : 0, newselstart : 0, newselend : 0, newseltext : ""
    },

    getOptions: function() {
      var options = this.options, agent = $.agent, browser = agent.browser, version = agent.version;

      if (browser == "chrome" || (browser == "firefox" && version >= 3) || (browser == "msie" && version >=8)
                              || (browser == "safari" && version >= 5.2) || (browser == "opera" && version >= 9)) {
        if (!$.has("touch")) {
          options.highlight = true;
        }
      }

      options.localjs = (location.protocol == "file:" || location.protocol == "https:");

      var qs = location.search.length > 0 ? location.search.substring(1) : "";
      var items = qs.split("&"), pair, name, value;

      for (var i=0; i<items.length; i++) {
        pair = items[i].split("=");
        if (pair.length == 1) {
          var id = parseInt(pair[0]);
          if (isFinite(id)) this.fileid = id;
          continue;
        }
        name = decodeURIComponent(pair[0]);
        value = pair[1] ? decodeURIComponent(pair[1]) : "";
        switch (typeof options[name]) {
          case "boolean":
            if (value == "true" || value == "1") {
              options[name] = true;
            } else if (value == "false" || value == "0") {
              options[name] = false;
            }
            break;
          case "number":
            value = parseFloat(value);
            if (!isNaN(value)) {
              options[name] = value;
            }
            break;
          case "string":
            options[name] = value;
            break;
        }
      }

      mathpath = options.localjs ? "library/mathjax/unpacked/" : "http://cdn.mathjax.org/mathjax/2.1-latest/";
      if (location.pathname.slice(0, 6) == "/note/") {
        gatepath = "/gate/"; shareurl = "/note/";
      } else {
        gatepath = "/door/"; shareurl = "/beta/";
      }
      if (/jaxedit/.test(location.hostname)) this.trustHost = true;
    },

    doResize: function(clientX) {
      var that = this;
      var childs = that.childs,
          html = childs.html,
          body = childs.body,
          left = childs.left,
          resizer = childs.resizer,
          right = childs.right,
          preview = childs.preview,
          showarea = childs.showarea;

      var pageWidth = window.innerWidth;
      var pageHeight = window.innerHeight;
      if (typeof pageWidth != "number" ){
         if (document.compatMode == "CSS1Compat"){
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
         } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
         }
      }

      if (typeof clientX == "number") { // resizer
        if (clientX < 80) clientX = 2;
        if (pageWidth - clientX < 80) clientX = pageWidth - 2;
        left.style.right = pageWidth - clientX + "px";
        right.style.left = clientX + "px";
        resizer.style.left = clientX - 2 + "px";
        return;
      } else {
        left.removeAttribute("style"); right.removeAttribute("style"); resizer.removeAttribute("style");
        preview.removeAttribute("style"); showarea.removeAttribute("style");
      }

      var view = this.view;
      if (pageWidth > 540 && (view == "code" || view == "show")) {
        this.view = "half";
      } else if (pageWidth <= 540 && (view == "half" || view == "quad") && !($.agent.browser == "msie" && $.agent.version < 9)) {
        if (view == "quad") setTimeout(function(){typejax.updater.initMode("full");}, 0);
        this.view = "code";
      }

      html.id = "view-" + this.view;
    },

    loadEditor: function() {
      var that = this;
      if (this.options.highlight) {
        $.loadStyles("library/codemirror/lib/codemirror.css");
        $.loadScript("editor/textarea/colorful.js", function(){
          $.loadScript("library/codemirror/lib/codemirror.js", function(){
            $.loadScript("library/codemirror/mode/stex/stex.js", function(){
              $.loadScript("library/codemirror/addon/edit/matchbrackets.js", function(){
                that.addEditor();
                that.hasEditor = true;
                that.initialize();
              });
            });
          });
        });
      } else {
        $.loadScript("editor/textarea/simple.js", function(){
          that.addEditor();
          that.hasEditor = true;
          that.initialize();
        });
      }
    },

    loadParser: function() {
      var that = this;
      var script = document.createElement("script");
      script.type = "text/x-mathjax-config";
      script[(window.opera ? "innerHTML" : "text")] =
        "MathJax.Hub.Config({\n" +
        "  skipStartupTypeset: true,\n" +
        "  TeX: { extensions: ['color.js', 'extpfeil.js'] },\n" +
        "  'HTML-CSS': { imageFont: null }\n" +
        "});"
      document.body.appendChild(script);

      $.loadStyles("typejax/typejax.css");
      $.loadScript("typejax/typejax.js", function(){
        $.loadScript(mathpath + mathname, function(){
          MathJax.Hub.processUpdateTime = 200;
          MathJax.Hub.processUpdateDelay = 15;
          that.hasParser = true;
          that.initialize();
          that.autoScroll = true;
        });
      });
    },

    initialize: function() {
      if (this.hasEditor && this.hasParser) {
        this.initEditor();
        this.bindView();
      }
    },

    initEditor: function(value) {
      var childs = this.childs,
          codearea = childs.codearea,
          lbot = childs.lbot,
          showarea = childs.showarea;
      var editor = this.editor,
          scrollers = this.scrollers,
          data = this.textdata;
      var highlight = this.options.highlight;

      if (!highlight && $.agent.browser == "msie") codearea.setActive();

      if (typeof value == "string") {
        editor.setValue(value);
      }
      data.newtextvalue = editor.getValue();
      data.newtextsize = data.newtextvalue.length;
      if (!highlight) {
        data.newselstart = codearea.selectionStart;
        data.newselend = codearea.selectionEnd;
      }

      lbot.innerHTML = "size: " + data.newtextsize + "; textarea: initialized";
      scrollers.codelength = data.newtextsize;
      scrollers.codechange = 0;
      scrollers.codescroll = 0;
      scrollers.showscroll = 0;
      scrollers.showheight = 1;
      scrollers.divheights = [];

      editor.setReadOnly(true);
      this.disableFileElements(true);
      this.addHooks();
      typejax.message.debug = this.options.debug;
      typejax.updater.init(data.newtextvalue, data.newtextsize, showarea);
      this.addHandler();
      editor.setReadOnly(false);
    },

    addHooks: function() {
      var childs = this.childs, showarea = childs.showarea, updater = typejax.updater;

      function resizeShow(isAll) {
        var source = childs.source, right = childs.right, preview = childs.preview, size;

        showarea.style.visibility = "hidden";

        showarea.style.width = "20px";
        var mw = source.clientWidth, cw = showarea.clientWidth, sw = showarea.scrollWidth,
        size = Math.max(Math.min(sw + 30, 0.618 * mw), 0.382 * mw);
        right.style.width = size + "px";
        preview.style.width = (size - 6) + "px";
        showarea.style.width = (size - 8) + "px";

        showarea.style.height = "20px";
        var mh = source.clientHeight, ch = showarea.clientHeight, sh = showarea.scrollHeight;
        size = Math.min(sh + 10, 0.5 * mh);
        right.style.height = size + "px";
        preview.style.height = (size - 6) + "px";
        showarea.style.height = (size - 10) + "px";

        showarea.style.visibility = "visible";

        this.autoScroll = isAll;
      }

      function scrollView(start) {
        if (showarea.childNodes.length > start) { // sometimes showarea is empty
          this.autoScroll = false;
          showarea.childNodes[start].scrollIntoView(true);
          showarea.scrollTop -= 60;
          setTimeout(function(){jaxedit.autoScroll = true;}, 500); // after scroll event
        }
        // for scrollbar following
        this.scrollers.showscroll = showarea.scrollTop;
      }

      function updateHeight(start, end, innerdata) {
        var divheights = this.scrollers.divheights, showheight = this.scrollers.showheight;
        var totaldata = typejax.totaldata, data, height, i;
        divheights.splice(start, end - start);
        for (i = 0; i < innerdata.length; i++) {
          data = innerdata[i];
          height = showarea.childNodes[start+i].scrollHeight;
          divheights.splice(start+i, 0, [data.from, data.to, height]);
        }
        for (i = start + innerdata.length; i < totaldata.length; i++) {
          data = totaldata[i];
          divheights[i][0] = data.from;
          divheights[i][1] = data.to;
        }
        showheight = 0;
        for (i = 0; i < divheights.length; i++) {
          showheight += divheights[i][2];
        }
        this.scrollers.showheight = (showheight > 0) ? showheight : 1;
        //console.log("divheights:", showheight, divheights);
      }

      function enableFileElements() {
        this.disableFileElements(false);
      }

      updater.addHook("After Typeset Tiny", this, resizeShow);
      updater.addHook("After Typeset Tiny", this, enableFileElements);
      updater.addHook("After Typeset Full", this, scrollView);
      updater.addHook("After Typeset Full", this, updateHeight);
      updater.addHook("After Typeset Full", this, enableFileElements);
    },

    doLoad: function() {
      var codearea = this.childs.codearea,
          showarea = this.childs.showarea;

      document.getElementById("version").innerHTML =
        (location.pathname.slice(0, 6) == "/beta/") ? "beta" : "v" + this.version;
      this.getOptions();
      this.bindCore();
      if (this.trustHost) {
        var enableShare = this.bindShare();
      }
      this.autoScroll = false;

      if (window.localStorage && this.fileid <= 0) {
        if (localStorage.getItem("texcode")) {
          codearea.value = localStorage.getItem("texcode");
        }
        if (localStorage.getItem("scroll")) {
          codearea.scrollTop = parseInt(localStorage.getItem("scroll"));
        }
      }

      if (this.mode == "write") {
        this.showWindow(enableShare);
      }

      showarea.innerHTML = "<div id='parser-loading'><i class='gif-loading'></i>Loading TypeJax and MathJax...</div>";
      this.loadEditor();
      this.loadParser();
    },

    showWindow: function(enableShare) {
      this.doResize();
      this.childs.wrap.style.visibility = "visible";
      if (this.mode == "write") {
        if (location.protocol != "file:") {
          this.bindExample();
        }
        this.bindDrive();
        this.bindOption();
        this.addResizer();
        if (this.trustHost) enableShare();
      }
      this.bindPresent();
    },

    disableFileElements: function(disabled) {
      var childs = this.childs;
      var elems = [childs.newbtn, childs.openbtn, childs.presbtn];
      for (var i = 0; i < elems.length; i++) {
        elems[i].disabled = disabled;
      }
      var menubar = document.getElementById("menubar");
      if (disabled) {
        menubar.className = "busy";
      } else {
        menubar.className = "idle";
      }
    },

    addResizer: function() {
      var resizer = this.childs.resizer, main = this.childs.main;
      var that = this;

      resizer.onmousedown = function(event) {
        that.forResize = true;
        var ev = event ? event : window.event;
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          ev.returnValue = false;
        }
      };

      main.onmousemove = function(event) {
        if (that.forResize) {
          var ev = event ? event : window.event;
          var x = (ev.clientX > 2) ? ev.clientX - 2 : 0;
          var style = resizer.style;
          style.position = "absolute";
          style.margin = "0";
          style.left = x + "px";
        }
      };

      resizer.onmouseup = function(event) {
        if (that.forResize) {
          var ev = event ? event : window.event;
          that.doResize(ev.clientX);
        }
        that.forResize = false;
      };
    },

    doScroll: function(isForward) {
      if (!this.autoScroll) return;
      var scrollers = this.scrollers, divheights = scrollers.divheights;
      if (!divheights.length) return;
      var codelength = scrollers.codelength,
          codescroll = scrollers.codescroll,
          codechange = scrollers.codechange,
          showscoll = scrollers.showscroll,
          showheight = scrollers.showheight;
      var editor = this.editor, editinfo = editor.getScrollInfo(),
          leftpos = editinfo.top,
          leftscroll = editinfo.height,
          leftclient = editinfo.clientHeight,
          leftsize = leftscroll - leftclient;
      var showarea = this.childs.showarea,
          rightpos = showarea.scrollTop,
          rightscroll = showarea.scrollHeight,
          rightclient = showarea.clientHeight,
          rightsize = rightscroll - rightclient;

      var length, newpos, thatpos, thatarea;

      function getLeftIndex() {
        var length;
        /* length = codelength * (leftpos / leftsize); */
        if (leftpos <= codescroll) {
          length = (codescroll <= 0) ? 0 : codechange * leftpos / codescroll;
        } else {
          length = (codescroll >= leftsize) ? codelength : codechange + (codelength - codechange) * (leftpos - codescroll) / (leftsize - codescroll)
        }
        return length;
      }

      function getLeftScroll(length) {
        var newpos;
        /* newpos = leftsize * length / codelength; */
        if (length <= codechange) {
          newpos = (codechange <= 0) ? 0 : codescroll * length / codechange;
        } else {
          newpos = (codechange >= codelength) ? leftsize : codescroll + (leftsize - codescroll) * (length - codechange) / (codelength - codechange);
        }
        return newpos;
      }

      function getRightIndex() {
        var length, data, i;
        var height = showheight * rightpos / rightsize;
        for (i = 1; i < divheights.length; i++) {
          data = divheights[i];
          if (height > data[2]) {
            height -= data[2];
          } else {
            if (data[2] > 0) {
              length = data[0] + (data[1] - data[0]) * height / data[2];
            } else {
              length = data[0];
            }
            break;
          }
        }
        return length;
      }

      function getRightScroll(length) {
        var height = 0, data, i;
        for (i = 0; i < divheights.length; i++) {
          data = divheights[i];
          if (length > data[1]) {
            height += data[2];
          } else {
            height += data[2] * (length - data[0]) / (data[1] - data[0]);
            break;
          }
        }
        var newpos = rightsize * (height / showheight);
        return newpos;
      }

      // leftpos <--> length <--> height <--> rightpos

      if (isForward) { // left to right
        length = getLeftIndex();
        newpos = getRightScroll(length);
        //console.log("left2right:", leftpos, Math.round(length), Math.round(newpos));
        thatpos = rightpos, thatarea = showarea;
      } else { // right to left
        length = getRightIndex();
        newpos = getLeftScroll(length);
        //console.log("right2left:", rightpos, Math.round(length), Math.round(newpos));
        thatpos = leftpos, thatarea = editor;
      }

      var that = this;
      if (Math.abs(newpos - thatpos) > 10) {
        this.autoScroll = false;
        if (isForward) {
          thatarea.scrollTop = newpos;
        } else {
          thatarea.scrollTo(0, newpos);
        }
        setTimeout(function(){that.autoScroll = true;}, 20);
      }
    },

    setScrollers: function(length, change, scroll) {
      var scrollers = this.scrollers;
      scrollers.codelength = length;
      scrollers.codechange = change;
      scrollers.codescroll = scroll;
    },

    bindCore: function() {
      var that = this;
      var helpbtn = document.getElementById("helpbtn");
      $(".dlgclose").each(function(){
        this.onclick = function(){ that.toggleModal(false); };
      });
      $(".dbtnclose").each(function(){
        this.onclick = function(){ that.toggleModal(false); };
      });
      helpbtn.onclick = function() {
        window.open("manual/help.html", "_blank");
      };
      helpbtn.style.display = "inline-block";
    },

    bindExample: function() {
      var newbtn = document.getElementById("newbtn");
      var example = document.getElementById("example");
      var that = this;

      function openExample(event) {
        var ev = event ? event : window.event,
            target = ev.target || ev.srcElement;
        if (target.nodeName.toUpperCase() != "LI") return;
        var name = target.getAttribute("data-name");
        $.ajax({
          type: "GET",
          url: "editor/example/" + name,
          data: "",
          success: success
        });

        function success(text, status) {
          if ((status >= 200 && status <300) || status == 304) {
            that.initEditor(text);
          } else {
            that.changeDialog("dialog-info", "Error", "Error 404: File Not Found!");
          }
        }
      }
      example.onclick = openExample;
      newbtn.style.display = "inline-block";
    },

    bindPresent: function() {
      var that = this;
      var presbtn = document.getElementById("presbtn");
      $.loadScript("showjax/showjax.js", function(){
        presbtn.onclick = function(event) {
          var ev = event ? event : window.event;
          ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
          window.onresize = null;
          $.loadStyles("showjax/showjax.css", "showjax-style");
          showjax.doPresent(that.childs.showarea);
        };
      });
    },

    bindShare: function() {
      var that = this;
      function downloadContent(fid, wcode) {
        console.log("fetch file with fid=" + fid);
        var path = gatepath + "share.php", info = "fid=" + fid + "&wcode=" + wcode;
        path += "?info=" + encodeURIComponent(that.encodeText(encodeURIComponent(info)));

        function success(text, status, xhr) {
          if ((status >= 200 && status <300) || status == 304) {
            document.getElementById("filename").innerHTML = that.fileName = name;
            console.log("hasEditor", that.hasEditor, "hasParser", that.hasParser);
            var data = decodeURIComponent(that.decodeText(text));
            if (that.hasEditor && that.hasParser) {
              that.initEditor(data);
            } else if (that.hasEditor) {
              that.editor.setValue(data);
            } else {
              that.childs.codearea.value = data;
            }
            that.wcode = wcode;
            var mode = xhr.getResponseHeader("Permission");
            that.toggleModal(false);
            that.view = (mode == "read") ? "read" : "half";
            if (that.mode !== mode) {
              that.mode = mode;
              that.showWindow(enableShare);
            }
          } else {
            that.toggleInfo(status + ": " + text);
          }
        }

        $.ajax({
          type: "GET",
          url: path,
          data: "",
          success: success
        });
      }

      function uploadContent(data, name, fid, wcode, rcode, email) {
        var path = gatepath + "share.php", info = "wcode=" + wcode;
        if (fid) info += "&fid=" + fid;
        if (rcode) info += "&rcode=" + rcode;
        if (email) info += "&email=" + email;
        path += "?info=" + encodeURIComponent(that.encodeText(encodeURIComponent(info)));
        var boundary, content, request;

        boundary = 'jjaaxxeeddiitt';
        content = ['--' + boundary,
                   'Content-Disposition: form-data; name="file"; filename="' + name + '"',
                   'Content-Type: text/plain; charset=utf-8',
                   '',
                   that.encodeText(encodeURIComponent(data)),
                   '--' + boundary + '--'].join('\r\n');

        function success(text, status) {
          if ((status >= 200 && status <300) || status == 304) {
            document.getElementById("filename").innerHTML = that.fileName = name;
            that.fileid = parseInt(text);
            that.wcode = wcode;
            showShareUrl(parseInt(text));
          } else {
            that.toggleInfo("Error " + status + ": Failed to upload file!");
          }
        }

        $.ajax({
          type: "POST",
          url: path,
          data: content,
          success: success,
          contentType: "multipart/form-data; boundary=" + boundary
        });
      }

      function showShareUrl(fid) {
        var url = location.protocol + "//" + location.host + shareurl + "?" + fid;
        var info = "Sharing URL is <a href='" + url + "'>" + url + "</a>";
        that.changeDialog("dialog-info", "Share File", info);
      }

      function setupShare() {
        var dialog = document.getElementById("dialog"),
            dlgtitle = $("#dialog-share .dlgtitle")[0],
            dbtnshare = document.getElementById("dbtnshare"),
            share_email = document.getElementById("share_email"),
            share_rcode = document.getElementById("share_rcode"),
            share_wcode = document.getElementById("share_wcode");

        function checkShare() {
          var name = that.fileName ? that.fileName : "noname.tex";
          var note = document.getElementById("share_note");
          var email = share_email.value,
              rcode = share_rcode.value,
              wcode = share_wcode.value;
          if (rcode.length < 4) {
            note.innerHTML = "Error: reading password is too short!";
          } else if (wcode.length < 6) {
            note.innerHTML = "Error: editing password is too short!";
          } else if (email.indexOf("@") <= 0 || email.indexOf("@") == email.length - 1) {
            note.innerHTML = "Error: your email address is invalid!";
          } else {
            that.changeDialog("dialog-info", "", "Uploading file...", true);
            uploadContent(that.editor.getValue(), name, null, wcode, rcode, email);
          }
        }

        function checkPress(event) {
          var ev = event ? event : window.event;
          if (ev.keyCode == 13) checkShare();
        }

        dlgtitle.innerHTML = "Share File";
        share_rcode.value = share_wcode.value = that.randomString(4);
        share_wcode.value += that.randomString(2);
        dbtnshare.onclick = checkShare;
        dialog.onkeypress = checkPress;
        that.changeDialog("dialog-share");
        share_email.focus();
      }

      function enableShare() {
        var sharebtn = document.getElementById("sharebtn");
        sharebtn.onclick = function() {
          var fid = that.fileid;
          var name = that.fileName ? that.fileName : "noname.tex";
          if (fid > 0) {
            uploadContent(that.editor.getValue(), name, fid, that.wcode);
          } else {
            setupShare();
          }
        };
        sharebtn.style.display = "inline-block";
      }

      function setupFetch() {
        function checkFetch() {
          var scode = document.getElementById("share_scode").value;
          that.changeDialog("dialog-info", "Fetch File", "Fetching file...", true);
          downloadContent(that.fileid, scode);
        };

        function checkPress(event) {
          var ev = event ? event : window.event;
          if (ev.keyCode == 13) checkFetch();
        }

        that.childs.codearea.value = "";
        that.mode = "load";
        document.getElementById("dbtnfetch").onclick = checkFetch;
        document.getElementById("dialog").onkeypress = checkPress;
        that.changeDialog("dialog-fetch", "Enter Password");
        document.getElementById("share_scode").focus();
      }

      if (this.fileid > 0) setupFetch();
      return enableShare;
    },

    bindDrive: function() {
      var that = this;
      var agent = $.agent, browser = agent.browser, version = agent.version;
      var codearea = this.childs.codearea, showarea = this.childs.showarea;
      var openbtn = document.getElementById("openbtn"),
          opensel = document.getElementById("opensel"),
          savebtn = document.getElementById("savebtn");

      function doOpen(evt) {
        var file = evt.target.files[0],
            reader = new FileReader();
        reader.onload = function() {
          //console.log(this.readyState);
          that.initEditor(this.result);
        };
        document.getElementById("filename").innerHTML = that.fileName = name;
        reader.readAsText(file);
      }

      function fileOpen(event) {
        var ev = event ? event : window.event;
        switch (that.useDrive) {
          case "localdrive":
            opensel.click();
            ev.preventDefault();
            break;
          case "skydrive":
            skydrive.signUserIn();
            driveOpenSave("open");
            break;
        }
      }

      function doSave() {
        var value = that.editor.getValue(), type = "text/latex";
        if (typeof window.Blob == "function") {
          var blob = new Blob([value], {type: type});
        } else {
          var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
          var bb = new BlobBuilder;
          bb.append(value);
          var blob = bb.getBlob(type);
        }
        var URL = window.URL || window.webkitURL;
        var bloburl = URL.createObjectURL(blob);
        var name = that.fileName.split(/\.[^.]+$/)[0] + ".tex";
        var anchor = document.createElement("a");
        if ("download" in anchor) {
          anchor.style.visibility = "hidden";
          anchor.href = bloburl;
          anchor.download = name;
          document.body.appendChild(anchor);
          var evt = document.createEvent("MouseEvents");
          evt.initEvent("click", true, true);
          anchor.dispatchEvent(evt);
          document.body.removeChild(anchor);
        } else if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, name);
        } else {
          location.href = bloburl;
          //URL.revokeObjectURL(bloburl); // doesn't work in chrome
        }
      }

      function fileSave() {
        switch (that.useDrive) {
          case "localdrive":
            doSave();
            break;
          case "skydrive":
            skydrive.signUserIn();
            driveOpenSave("save");
            break;
        }
      }

      function driveOpenSave(mode) {
        var dlgflist = document.getElementById("dialog-file-list"),
            savename = document.getElementById("savename"),
            dbtnsave = document.getElementById("dbtnsave");
        var footclose = document.getElementById("footclose"),
            footsave = document.getElementById("footsave");
        var info = "Loading...";
        dlgflist.onclick = dialogClick;
        if (mode == "open") {
          footclose.style.display = "inline"; footsave.style.display = "none";
          that.dialogMode = "open";
          that.changeDialog("dialog-info", "Open File", info, true);
        } else {
          footclose.style.display = "none"; footsave.style.display = "inline";
          that.dialogMode = "save";
          savename.value = that.fileName.split(/\.[^.]+$/)[0];
          dbtnsave.onclick = checkSave;
          that.changeDialog("dialog-info", "Save File", info, true);
        }
        (function(){
          if (skydrive.homeid){
            skydrive.getFilesList(handleResponse);
          } else {
            setTimeout(arguments.callee, 100);
          }
        })();
      }

      function handleResponse(response) {
        var dlginside = document.getElementById("dialog-file-inside"),
            dlgwalkup = document.getElementById("dialog-file-walkup"),
            dlgflist = document.getElementById("dialog-file-list");
        if (!response.error) {
          var bodytext = "", data, type, name, fid, url, size, time, ftype;
          var finside = skydrive.finside;
          dlginside.innerHTML = finside[finside.length - 1].name;
          if (finside.length <= 1) {
            dlgwalkup.style.display = "none";
          } else {
            dlgwalkup.style.display = "inline";
          }
          bodytext += "<table frame='box' rules='rows'><thead><tr class='finfo'><th>Type</th><th>Name</th><th class='fsize'>Size</th><th class='ftime'>Modified</th></tr></thead><tbody>";
          for (var i = 0; i < response.data.length; i++) {
            data = response.data[i];
            type = data.type; name = data.name; fid = data.id; time = data.updated_time.slice(0, 10);
            if (type == "file" || type == "folder") {
              url = (type == "file") ? data.source : "#";
              size = (type == "file") ? data.size : "---";
              ftype = (type == "file") ? "File" : "Folder";
              bodytext += "<tr class='" + type + "'><td>" + ftype + "</td><td><a href='javascript:void(0)' data-fid='" + fid + "' data-url='" + url + "'>" + name + "</a></td><td class='fsize'>" + size + "</td><td class='ftime'>" + time + "</td></tr>";
            }
          }
          bodytext += "</tbody></table>";
          dlgflist.innerHTML = bodytext;
          that.changeDialog("dialog-file", "Browse Files");
        }
        else {
          that.toggleInfo("Error in reading LaTeX files!");
        }
      }

      function getFileContent(url, name) {
        console.log("fetch file: " + url);
        var path = gatepath + "drive.php?path=" + encodeURIComponent(that.encodeText(url));
        that.toggleLoading("Opening file...");

        function success(text, status) {
          if ((status >= 200 && status <300) || status == 304) {
            document.getElementById("filename").innerHTML = that.fileName = name;
            that.toggleModal(false);
            that.initEditor(text);
          } else {
            that.toggleInfo(status + " error in opening file!");
          }
        }

        $.ajax({
          type: "GET",
          url: path,
          data: "",
          success: success
        });
      }

      function saveFileContent(data, name) {
        var fid = skydrive.finside[skydrive.finside.length - 1].fid,
            hostpath = "https://apis.live.net/v5.0/" + fid + "/files",
            querystr = "?access_token=" + encodeURIComponent(skydrive.access_token),
            path = gatepath + "drive.php";
        var type, url, boundary, content, contype;
        that.changeDialog("dialog-info", "", "Saving file...", true);

        if (location.search == "?put") { // using PUT method
          type = "PUT";
          url = hostpath + "/" + name + querystr;
          path += "?path=" + encodeURIComponent(that.encodeText(url));
          content = data;
          contype = "text/plain; charset=utf-8";
        } else { // using POST method
          type = "POST";
          url = hostpath + querystr;
          path += "?path=" + encodeURIComponent(that.encodeText(url));
          boundary = 'jjaaxxeeddiitt';
          content = ['--' + boundary,
                     'Content-Disposition: form-data; name="file"; filename="' + name + '"',
                     'Content-Type: text/plain; charset=utf-8',
                     '',
                     data,
                     '--' + boundary + '--'].join('\r\n');
          contype = "multipart/form-data; boundary=" + boundary;
        }

        function success(text, status) {
            if ((status >= 200 && status <300) || status == 304) {
              document.getElementById("filename").innerHTML = that.fileName = name;
              that.toggleModal(false);
            } else {
              that.toggleInfo(status + " error in saving file!");
            }
        }

        $.ajax({
          type: type,
          url: path,
          data: content,
          success: success,
          contentType: contype
        });
      }

      function checkSave() {
        var fname = document.getElementById("savename").value;
        if (fname === "") {
          alert("Filename is empty!");
          return;
        } else {
          //skydrive api doesn't support .tex file, use .txt instead
          saveFileContent(that.editor.getValue(), fname + ".txt");
        }
      }

      function dialogClick(event) {
        var ev = event ? event : window.event,
            target = ev.target || ev.srcElement;
        if (target.nodeName.toUpperCase() == "A") {
          var fid = target.getAttribute("data-fid");
          console.log("clicked: fid = " + fid);
          switch (target.parentNode.parentNode.className) {
            case "file":
              if (that.dialogMode == "open") {
                getFileContent(target.getAttribute("data-url"), target.innerHTML);
              }
              break;
            case "folder":
              that.toggleLoading("Loading...");
              skydrive.finside.push({fid: fid, name: target.innerHTML});
              skydrive.getFilesList(handleResponse);
              break;
          }
        }
      }

      function dialogWalkup() {
        that.changeDialog("dialog-info");
        skydrive.finside.pop();
        skydrive.getFilesList(handleResponse);
      }

      function changeFileDisplay(display) {
        var openbtn = document.getElementById("openbtn"),
           savebtn = document.getElementById("savebtn");
        if (display) {
          openbtn.style.display = "inline-block";
          savebtn.style.display = "inline-block";
        } else {
          openbtn.style.display = "none";
          savebtn.style.display = "none";
        }
      }

      function addFileHandler() {
        openbtn.onclick = fileOpen;
        savebtn.onclick = fileSave;
      }

      var dlgwalkup = document.getElementById("dialog-file-walkup");
      dlgwalkup.onclick = dialogWalkup;

      if ($.has("file-open") && $.has("file-save")) {
        this.localDrive = true;
        this.useDrive = "localdrive";
        opensel.style.visibility = "visible";
        opensel.addEventListener("change", doOpen, false);
        addFileHandler();
        changeFileDisplay(true);
      } else {
        this.localDrive = false;
        opensel.style.display = "none";
      }

      if (that.trustHost) {
        $.loadScript(location.protocol + "//js.live.net/v5.0/wl.js", function(){ // wl.debug.js
          $.loadScript("editor/webdrive/skydrive.js", function(){
            if (that.localDrive) {
              document.getElementById("dialog-option-drive").style.display = "block";
              document.getElementById("optbtn").style.display = "inline-block"; // remove later
            } else {
              that.useDrive = "skydrive";
              that.changeDriveIcons("cloud");
              addFileHandler();
              changeFileDisplay(true);
            }
            skydrive.initDrive();
          });
        });
      }

      /*
      window.onbeforeunload = function() {
        if (that.useDrive == "skydrive") {
          if (browser == "chrome" || confirm("Do you want to logout from SkyDrive?")) {
            skydrive.signUserOut();
          }
        }
      }
      */
    },

    bindOption: function() {
      var that = this;
      var optbtn = document.getElementById("optbtn");
      var dbtndone = document.getElementById("dbtndone");
      optbtn.onclick = function() {
        that.changeDialog("dialog-option", "Options");
      };
      dbtndone.onclick = function() {
        that.toggleModal(false);
        var radios = document.getElementsByName('drive');
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            var value = radios[i].value;
            var prefix = value == "localdrive" ? "disk" : "cloud";
            that.useDrive = value;
            that.changeDriveIcons(prefix);
            break;
          }
        }
      }
      // optbtn.style.display = "inline-block";
    },

    bindView: function() {
      var that = this;
      var quad = document.getElementById("toggle-quadview"),
          half = document.getElementById("toggle-halfview"),
          code = document.getElementById("toggle-codeview"),
          show = document.getElementById("toggle-showview");
      function disable() {
        that.childs.presbtn.style.display = "none";
      }
      quad.onclick = function() {
        disable();
        that.view = "quad";
        that.doResize();
        typejax.updater.initMode("tiny");
      };
      half.onclick = function() {
        disable();
        that.view = "half";
        that.doResize();
        typejax.updater.initMode("full");
      };
      code.onclick = function() {
        that.view = "code";
        that.doResize();
      };
      show.onclick = function() {
        that.view = "show";
        that.doResize();
      };
    },

    changeDriveIcons: function(prefix) {
        $("#openbtn i")[0].className = "icon-" + prefix + "-open";
        $("#savebtn i")[0].className = "icon-" + prefix + "-save";
    },

    toggleModal: function(view) {
      var ol = document.getElementById("overlay"),
          ct = document.getElementById("container");
      if (view) {
        ol.style.display = "block";
        ct.style.display = "block";
      } else {
        ol.style.display = "none";
        ct.style.display = "none";
      }
    },

    toggleLoading: function(info) {
      this.changeDialog("dialog-info", "Loading", info, true);
    },

    toggleInfo: function(info) {
      this.changeDialog("dialog-info", "Info", info);
    },

    changeDialog: function(idname, title, info, loading) {
      var childs, element, i;
      if (idname) {
        childs = document.getElementById("dialog").childNodes;
        for (i = 0; i < childs.length; i++) {
          element = childs[i];
          if (element.nodeType == 1) {
            if (element.id === idname) {
              element.style.display = "block"
            } else {
              element.style.display = "none";
            }
          }
        }
      }
      if (title) {
        $("#" + idname + " .dlgtitle")[0].innerHTML = title;
      }
      if (info) {
        if (loading) info = "<i class='gif-loading'></i>" + info;
        $("#dialog-info .dialog-middle")[0].innerHTML = info;
      }
      this.toggleModal(true);
    },

    encodeText: function(text) {
      if (!text) return text;
      var length = text.length, safePrime = 1964903159, result = [],
          index = navigator.userAgent.length % length, step = safePrime % length;
      console.log("encodeText: length = " + length + " start = " + index + " step = " + step);
      for (var i = 0; i < length; i++) {
        result.push(text.charAt(index));
        index = (index - step + length) % length;
      }
      return result.join("");
    },

    decodeText: function(text) {
      if (!text) return text;
      var length = text.length, safePrime = 1964903159, result = [],
          index = navigator.userAgent.length % length, step = safePrime % length;
      console.log("decodeText: length = " + length + " start = " + index + " step = " + step);
      for (var i = 0; i < length; i++) {
        result[index] = text.charAt(i);
        index = (index - step + length) % length;
      }
      return result.join("");
    },

    randomString: function(size) {
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz";
      for (var i=0; i < size; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  }
})(inliner);

window.onload = function() {jaxedit.doLoad()};
window.onresize = function() {jaxedit.doResize()};
