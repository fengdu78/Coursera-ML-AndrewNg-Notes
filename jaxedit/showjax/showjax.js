
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: GNU Lesser General Public License, Version 3
 * Source:  https://github.com/zohooo/jaxedit
 */

var showjax = {
  frameall: [],
  framedone: [],
  frameidx: 0,
  infodiv: null,
  oldstyles: [],
  showarea: null,
  touchCenter: null,
  touchRadius: null
};

showjax.startPresent = function() {
  var showarea = this.showarea;
  var i, node;
  this.frameall = [], this.frameidx = 0;
  for (i = 0; i < showarea.childNodes.length; i++) {
    node = showarea.childNodes[i];
    if (/\bframe|maketitle\b/.test(node.className)) {
      this.frameall.push(i);
    } else {
      node.style.display = "none";
    }
  }
  //console.log(this.frameall);
  if (this.frameall.length == 0) {
    alert("There isn't any beamer frame!");
    jaxedit.doResize();
  } else {
    this.initShow();
    this.resizeShow();
    MathJax.Hub.config.showProcessingMessages = false;
    MathJax.Hub.Rerender(showarea); //"Rerender" vs "Reprocess"
    MathJax.Hub.Queue([showjax, function(){
      this.frameidx = 0;
      this.framedone[0] = true;
      for (i = 1; i < this.frameall.length; i++) {
        showarea.childNodes[this.frameall[i]].style.display = "none";
      }
    }]);
    window.onresize = function(){showjax.resizeShow()};
    document.onclick = document.onkeydown = function(event){showjax.navigateShow(event)};
    document.ontouchstart = document.ontouchmove = document.ontouchend = function(event){showjax.touchShow(event)};
  }
};

showjax.initShow = function() {
  var body = document.body, showarea = this.showarea;
  var parent, childs, chd, i, node = showarea;
  var styles = [];
  do {
    parent = node.parentNode;
    childs = parent.childNodes;
    for (var i = 0; i < childs.length; i++) {
      chd = childs[i];
      if (chd.nodeType != 1) continue;
      if (chd == node) {
        styles.push(chd, [
          "display", "block",
          "position", "static",
          "backgroundColor", "black",
          "maxWidth", "none", "maxHeight", "none",
          "height", "100%", "width", "100%",
          "margin", "0px", "padding", "0px",
          "border", "none"
        ]);
      } else {
        styles.push(chd, ["display", "none"]);
      }
    }
    node = parent;
  } while (parent != body);

  var frameall = this.frameall;
  for (var i = 0; i < frameall.length; i++) {
    styles.push(showarea.childNodes[frameall[i]], [
      "overflow", "hidden",
      "width", "96%",
      "height", "96%",
      "padding", "2%",
      "border", "none",
      "margin", "0px"
    ]);
  }

  styles.push(showarea, [
    "fontSize", "250%",
    "margin", "0px", "border", "none",
    "overflow", "hidden",
    "cursor", "pointer" /* fix for click event in ios */
  ]);
  this.setupStyle(styles);
};

showjax.resizeShow = function() {
  var showarea = this.showarea;
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

  if (pageWidth > 4 * pageHeight / 3) {
    showHeight = pageHeight;
    showWidth = 4 * showHeight / 3;
  } else {
    showWidth = pageWidth;
    showHeight = 3 * showWidth / 4;
  }

  showarea.style.width = showWidth + "px"; showarea.style.height = showHeight + "px";
  showarea.style.marginLeft = showarea.style.marginRight = (pageWidth - showWidth) / 2 + "px";
  showarea.style.fontSize = (showWidth / 4) + "%";
  MathJax.Hub.Rerender(showarea);
};

showjax.setupStyle = function(styles) {
  var i, j, el, st, old = [];
  for (i = 0; i < styles.length; i = i + 2) {
    el = styles[i]; st = styles[i + 1];
    old.push([el, el.style.cssText]);
    for (j = 0; j < st.length; j = j + 2) {
      el.style[st[j]] = st[j + 1];
    }
  }
  this.oldstyles = old;
  //console.log(old);
}

showjax.resetStyle = function(elemStyles) {
  for (var i = 0; i < elemStyles.length; i++) {
    elemStyles[i][0].style.cssText = elemStyles[i][1];
  }
};

showjax.quitShow = function() {
  document.body.removeChild(this.infodiv);
  inliner.removeStyles("showjax-style");
  this.resetStyle(this.oldstyles);
  var showarea = this.showarea, childs = showarea.childNodes;
  for (var i = 0; i < childs.length; i++) {
    if (childs[i].nodeType == 1 && !/preamble/.test(childs[i].className)) {
      childs[i].style.display = "block";
    }
  }
  jaxedit.doResize();
  MathJax.Hub.Rerender(showarea);
  window.onresize = function(){jaxedit.doResize()};
  document.onclick = document.onkeydown = null;
  document.ontouchstart = document.ontouchmove = document.ontouchend = null;
};

showjax.navigateShow = function(event) {
  var ev = event ? event : window.event;
  var k = showjax.frameidx;
  var showarea = showjax.showarea;
  switch (ev.type) {
    case "click":
      showjax.frameidx = (k + 1 == showjax.frameall.length) ? 0 : k + 1;
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      break;
    case "keydown":
      switch(ev.keyCode) {
        case 27: // escape
          showjax.quitShow();
          return;
        case 37: case 63234:  // left arrow
        case 38: case 63232:  // up arrow
          showjax.frameidx = (k == 0) ? showjax.frameall.length - 1 : k - 1;
          ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
          break;
        case 39: case 63235:  // right arrow
        case 40: case 63233:  // down arrow
          showjax.frameidx = (k + 1 == showjax.frameall.length) ? 0 : k + 1;
          ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
          break;
      }
      break;
  }
  //console.log(k, showjax.frameidx);
  showarea.childNodes[showjax.frameall[k]].style.display = "none";
  showarea.childNodes[showjax.frameall[showjax.frameidx]].style.display = "block";
  showarea.childNodes[showjax.frameall[showjax.frameidx]].style.border = "none";
  //if (!showjax.framedone[showjax.frameidx]) {
  if (showjax.frameidx !== k) {
    MathJax.Hub.Rerender(showarea);
    showjax.framedone[showjax.frameidx] = true;
  }
  //}
};

showjax.touchShow = function(event) {
  var x0, y0, x1, y1, c, x, y, r, r0, r1;
  switch(event.type) {
    case "touchstart":
      if (event.touches.length == 2) {
        x0 = event.touches[0].pageX;
        y0 = event.touches[0].pageY;
        x1 = event.touches[1].pageX;
        y1 = event.touches[1].pageY;
        showjax.touchCenter = [(x0 + x1) / 2, (y0 + y1) / 2];
        showjax.touchRadius = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) / 2;
      } else {
        showjax.touchCenter = showjax.touchRadius = null;
      }
      break;
    case "touchmove":
      if (event.touches.length == 2) {
        if (showjax.touchCenter) {
          c = showjax.touchCenter; x = c[0]; y = c[1]; r = showjax.touchRadius;
          x0 = event.touches[0].pageX;
          y0 = event.touches[0].pageY;
          x1 = event.touches[1].pageX;
          y1 = event.touches[1].pageY;
          r0 = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));
          r1 = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
          if (r0 < r / 2 || r1 < r / 2) {
            showjax.quitShow();
          }
        }
      } else {
        showjax.touchCenter = showjax.touchRadius = null;
      }
      break;
    case "touchend":
      showjax.touchCenter = showjax.touchRadius = null;
      break;
  }
};

showjax.addInfotip = function() {
  var showinfo;
  showinfo = document.createElement("div");
  showinfo.id = "infodiv";
  if (inliner.has("touch")) {
    showinfo.innerHTML = "Pinch to close presentation";
  } else {
    showinfo.innerHTML = "Press Esc to close presentation";
  }
  document.body.appendChild(showinfo);
  this.infodiv = showinfo;
  setTimeout(function(){showinfo.style.display = "none";}, 5000);
};

showjax.doPresent = function(showarea){
  this.showarea = showarea;
  this.startPresent();
  this.addInfotip();
};
