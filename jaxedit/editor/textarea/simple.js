
/* JaxEdit: online LaTeX editor with live preview
 * Copyright (c) 2011-2017 JaxEdit project
 * License: GNU Lesser General Public License, Version 3
 * Source:  https://github.com/zohooo/jaxedit
 */

jaxedit.doChange = function(event) {
  var ev = event ? event : window.event; // standard or ie
  var agent = $.agent;
  var childs = jaxedit.childs,
      codearea = childs.codearea,
      lbot = childs.lbot,
      showarea = childs.showarea;
  var data = jaxedit.textdata;
  var oldtextvalue = data.oldtextvalue,
      oldtextsize  = data.oldetextsize,
      oldselstart  = data.oldselstart,
      oldselend    = data.oldselend,
      oldseltext   = data.oldseltext,
      newtextvalue = data.newtextvalue,
      newtextsize  = data.newtextsize,
      newselstart  = data.newselstart,
      newselend    = data.newselend,
      newseltext   = data.newseltext;

  oldselstart  = newselstart;
  oldselend    = newselend;
  oldtextvalue = newtextvalue;
  oldtextsize  = newtextsize;
  oldseltext   = newseltext;

  newtextvalue = codearea.value;
  newtextsize  = codearea.value.length;

  if (agent.browser == "msie" && agent.version <= 8) {
    var range1 = document.selection.createRange();
    var parent = range1.parentElement();
    if (parent != codearea) {
      console.log('TextRange: parent element is of tagName ' + parent.tagName);
      return;
    }
    var range2 = range1.duplicate();
    range2.moveToElementText(codearea);
    range2.setEndPoint('EndToEnd',range1);
    newselstart = range2.text.length - range1.text.length;
    newselend = newselstart + range1.text.length;
    newseltext = range1.text;
  } else {
    newselstart  = codearea.selectionStart;
    newselend    = codearea.selectionEnd;
    newseltext   = newtextvalue.substring(newselstart,newselend);
  }

  var omitted = false;

  if (ev.type == "mousemove" && document.activeElement.id != "codearea") { // codearea unused
    omitted = true;
  } else if ( ev.type == "mousemove" && oldselstart == newselstart && oldselend == newselend ) { // codearea in use
    omitted = true;
  } else if (ev.type == "focus"){
    omitted = true;
  } else if (ev.type == "mousedown"){ // click to clear old selection
    omitted = true;
  } else if (ev.type == "mouseup" && newselstart == newselend) {
    omitted = true;
  } else if (ev.type == "keydown" && ev.keyCode == 229 && agent.engine == "webkit"){
    // todo: iuput method in chrome
    // note: keydown event is also used when pressing a key for some time
  }

  if (omitted) return;

  var delstart = 0, delend = 0, /*delsize = 0,*/ deltext = "";
  var insstart = 0, insend = 0, /*inssize = 0,*/ instext = "";

  delstart = (oldselstart < newselstart) ? oldselstart : newselstart;
  delend = (oldtextsize-oldselend < newtextsize-newselend) ? oldselend : oldtextsize - newtextsize + newselend;

  if (agent.browser == "firefox" && oldselstart < oldselend && newselstart == newselend) {
    // fix for draging selection leftward in firefox
    var tempstart = newselstart - (oldselend - oldselstart);
    if ( newselend < oldselend && tempstart >= 0 && delstart > tempstart)
      delstart = tempstart;
  }

  if (agent.engine == "webkit" || agent.browser == "opera") {
    // fix for input method in chrome browser
    // this way is dirty, rewrite it another time
    delstart = (delstart - 64 > 0) ? delstart - 64 : 0;
    delend = (delend + 64 < oldtextsize) ? delend + 64 : oldtextsize;
  }
  //console.log(delstart,delend);

  // we should always keep these two equalities
  insstart = delstart;
  insend = newtextsize - oldtextsize + delend;

  while (newtextvalue.charAt(delstart) == oldtextvalue.charAt(delstart) && delstart < delend && insstart < insend){
    delstart += 1;
    insstart += 1;
  }
  while (newtextvalue.charAt(delend-1) == oldtextvalue.charAt(delend-1) && delstart < delend && insstart < insend){
    delend -= 1;
    insend -= 1;
  }

  deltext = oldtextvalue.substring(delstart, delend);
  instext = newtextvalue.substring(insstart, insend);

  //console.log("textsize:" + newtextsize + "; selection:" + oldselstart + "-" + oldselend + " to " +  newselstart + "-" + newselend + "; change: " + delstart + " to " + delend + "; event:" + ev.type + "; deltext:" + deltext + " ;instext:" + instext);
  lbot.innerHTML = "size: " + newtextsize + "; selection: " + oldselstart + "-" + oldselend + " to " + newselstart + "-" + newselend;

  data.oldtextvalue = oldtextvalue;
  data.oldetextsize = oldtextsize;
  data.oldselstart  = oldselstart;
  data.oldselend    = oldselend;
  data.oldseltext   = oldseltext;
  data.newtextvalue = newtextvalue;
  data.newtextsize  = newtextsize;
  data.newselstart  = newselstart;
  data.newselend    = newselend;
  data.newseltext   = newseltext;

  if (window.localStorage) {
    if (deltext != "" || instext != "") {
      //IE8 sometimes crashes when writing empty value to a localStorage item
      if (codearea.value != "") {
        localStorage.setItem("texcode", codearea.value);
      } else {
        localStorage.removeItem("texcode");
      }
    }
  }

  jaxedit.setScrollers(newtextsize, delstart, codearea.scrollTop);
  typejax.updater.inQueue(delstart, delend, deltext, instext, newtextsize, showarea);
};

jaxedit.addEditor = function() {
  var codearea = this.childs.codearea;

  this.editor = {
    getWrapperElement : function() {
      return codearea;
    },

    getValue : function() {
      return codearea.value;
    },

    setValue : function(value) {
      codearea.value = value;
    },

    setReadOnly : function(bool) {
      codearea.readOnly = bool;
    },

    getScrollInfo : function() {
      return {
        left :         codearea.scrollLeft,
        top :          codearea.scrollTop,
        width :        codearea.scrollWidth,
        height :       codearea.scrollHeight,
        clientWidth :  codearea.clientWidth,
        clientHeight : codearea.clientHeight
      };
    },

    getViewPort : function() {
      // return {from, to};
      alert('unsupported!');
    },

    scrollTo : function(x, y) {
      codearea.scrollTop = y;
    },

    scrollIntoView : function(pos) {
      // pos = {line, ch}
      alert('unsupported!');
    }
  };
};

jaxedit.addHandler = function() {
  var codearea = this.childs.codearea,
      showarea = this.childs.showarea;

  codearea.onkeydown = this.doChange;
  //codearea.onkeypress = this.doChange;
  codearea.onkeyup = this.doChange;

  //codearea.onfocus = this.doChange;
  //codearea.onblur = this.doChange;

  codearea.onmousedown = this.doChange;
  codearea.onmousemove = this.doChange;
  codearea.onmouseup = this.doChange;

  codearea.oncopy = this.doChange;
  codearea.oncut = this.doChange;
  codearea.onpaste = this.doChange;

  //codearea.oninput = this.doChange;
  //codearea.addEventListener("textInput", this.doChange, false);
  //codearea.addEventListener("textinput", this.doChange, false);
  //codearea.onchange = this.doChange;
  //codearea.onpropertychange = this.doChange;

  codearea.onscroll = function () {
    if (window.localStorage) {
      localStorage.setItem("scroll", codearea.scrollTop);
    }
    jaxedit.doScroll(true);
  };

  showarea.onscroll = function() {
    jaxedit.doScroll(false);
  };
};
