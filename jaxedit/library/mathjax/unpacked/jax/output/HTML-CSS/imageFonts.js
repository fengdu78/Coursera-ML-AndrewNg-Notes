/*************************************************************
 *
 *  MathJax/jax/output/HTML-CSS/imageFonts.js
 *  
 *  Implements the image fallback fonts for the HTML-CSS OutputJax.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2009-2012 Design Science, Inc.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (HUB,HTMLCSS,AJAX) {
  var VERSION = "2.1";
  
  HUB.Register.LoadHook(HTMLCSS.fontDir + "/fontdata.js",function () {

    HTMLCSS.Augment({
      allowWebFonts: false,
      
      imgDir: HTMLCSS.webfontDir+"/png",
      imgPacked: (MathJax.isPacked ? "" : "/unpacked"),
      imgSize: ['050','060','071','085',100,120,141,168,200,238,283,336,400,476],
      imgBaseIndex: 4,      // set by initImg()
      imgSizeForEm: {},     // cache of indexes by em-size
      imgSizeForScale: {},  // cache of indexes by scale for a given em-size
      imgZoom: 1,           // set by initImg for each equation

      handleImg: function (span,font,c,n,text) {
        if (text.length) {this.addText(span,text)}
        var orig = c[5].orig; if (!orig) {orig = c[5].orig = [c[0],c[1],c[2],c[3],c[4]]}
        var bscale = this.imgZoom; if (!span.scale) {span.scale = 1}
        var index = this.imgIndex(span.scale*bscale);
        if (index == this.imgEmWidth.length-1 &&
            this.em*span.scale*bscale/this.imgEmWidth[index] > 1.1)
              {bscale = this.imgEmWidth[index]/(this.em*span.scale)}
        var factor = this.imgEmWidth[index]/(this.em*(span.scale||1)*bscale);
        c[0] = orig[0]*factor; c[1] = orig[1]*factor; c[2] = orig[2]*factor;
        c[3] = orig[3]*factor; c[4] = orig[4]*factor;
        var dir = this.imgDir+"/"+font.directory+"/"+this.imgSize[index];
        var chr = n.toString(16).toUpperCase(); while (chr.length < 4) {chr = "0"+chr};
        var file = dir+"/"+chr+".png";
        var img = c[5].img[index];
        var style = {width:Math.floor(img[0]/bscale+.5)+"px", height:Math.floor(img[1]/bscale+.5)+"px"};
        if (img[2]) {style.verticalAlign = Math.floor(-img[2]/bscale+.5)+"px"}
        if (c[3] < 0) {style.marginLeft = this.Em(c[3]/1000)}
        if (c[4] != c[2]) {style.marginRight = this.Em((c[2]-c[4])/1000)}
        if (this.msieIE6) {
          style.filter = "progid:DXImageTransform.Microsoft." +
            "AlphaImageLoader(src='"+AJAX.fileURL(file)+"', sizingMethod='scale')";
          file = this.directory+"/blank.gif"
        }
        this.addElement(span,"img",{src:AJAX.fileURL(file), style:style, isMathJax:true});
        return "";
      },
      
      defineImageData: function (def) {
        for (var font in def) {if (def.hasOwnProperty(font)) {
          var FONT = HTMLCSS.FONTDATA.FONTS[font];
          if (FONT) {
            font = def[font];
            for (var n in font) {if (font.hasOwnProperty(n) && FONT[n]) {FONT[n][5] = {img: font[n]}}}
          }
        }}
      },
      
      initImg: function (span) {
        if (this.imgSizeForEm[this.em]) {this.imgBaseIndex = this.imgSizeForEm[this.em]}
        for (var i = 0, m = this.imgEmWidth.length-1; i < m; i++)
          {if (this.em <= this.imgEmWidth[i]) break}
        if (i && this.imgEmWidth[i] - this.em > this.em - this.imgEmWidth[i-1]) {i--}
        this.imgSizeForEm[this.em] = this.imgBaseIndex = i;
        this.imgZoom = this.imgBrowserZoom();
      },
      
      imgIndex: function (scale) {
        if (!scale) {return this.imgBaseIndex}
        if (!this.imgSizeForScale[this.em]) {this.imgSizeForScale[this.em] = {}}
        if (this.imgSizeForScale[this.em][scale]) {return this.imgSizeForScale[this.em][scale]}
        var em = this.em * scale;
        for (var i = 0, m = this.imgEmWidth.length-1; i < m; i++)
          {if (em <= this.imgEmWidth[i]) break}
        if (i && this.imgEmWidth[i] - em > em - this.imgEmWidth[i-1]) {i--}
        this.imgSizeForScale[this.em][scale] = i;
        return i;
      },
      
      imgBrowserZoom: function () {return 1}
      
    });
    
    HUB.Browser.Select({
      
      Firefox: function (browser) {
        var ZDIV = HTMLCSS.addElement(document.body,"div",{
          style: {
            display:"none", visibility:"hidden", overflow:"scroll",
            position:"absolute", top:0, left: 0, width:"200px", height:"200px",
            padding:0, border:0, margin:0
          }
        });
        
        var ZFRAME = HTMLCSS.addElement(ZDIV,"div",{
          style: {
            position:"absolute", left:0, top:0, right:0, bottom:0,
            padding:0, border:0, margin:0
          }
        });

        HTMLCSS.Augment({
          imgSpaceBug: true,
          imgSpace: "\u00A0",
          
          imgZoomLevel: (browser.isMac ?
            {50:.3, 30:.5, 22:.67, 19:.8, 16:.9, 15:1, 13:1.1, 12:1.2,
              11:1.33, 10:1.5, 9:1.7, 7:2, 6:2.4, 5:3,  0:15} :
            {56:.3, 34:.5, 25:.67, 21:.8, 19:.9, 17:1, 15:1.1, 14:1.2,
              13:1.33, 11:1.5, 10:1.7, 8:2, 7:2.4, 6:3,  0:17}
          ),
        
          imgZoomDiv: ZDIV,
          
          imgBrowserZoom: function () {
            var size = this.imgZoomLevel;
            ZDIV.style.display = "";
            var ratio = (ZDIV.offsetWidth-ZFRAME.offsetWidth);
            ratio = (size[ratio] ? size[ratio] : size[0]/ratio);
            ZDIV.style.display = "none";
            return ratio;
          }
        });
      },

      Safari: function (browser) {
	// for iPhone and iTouch
//        var webkit = (navigator.appVersion+"AppleWebKit/530").match(/AppleWebKit\/(\d+)/)[1];
	HTMLCSS.Augment({
//          imgHeightBug: (!browser.isMac || webkit > 525),
//          imgDepthBug:  (!browser.isMac || webkit > 525),
          imgBrowserZoom: function () {return 3}
        });
      },
      
      Chrome: function (browser) {
	HTMLCSS.Augment({
          imgHeightBug: true,
          imgBrowserZoom: function () {return 3}
        });
      },
      
      Opera: function (browser) {
        HTMLCSS.Augment({
          imgSpaceBug: true,
          imgSpace: "\u00A0\u00A0",
          
          imgDoc: (document.compatMode == "BackCompat" ? document.body :
                   document.documentElement),

          imgBrowserZoom: function () {
            if (browser.isMac) {return 3}  // Mac Opera scales very nicely
            var H = this.imgDoc.clientHeight, d = Math.floor(15*H/window.innerHeight);
            if (this.imgDoc.clientWidth < this.imgDoc.scrollWidth-d) {H += d}
            return parseFloat((window.innerHeight/H).toFixed(1));
          }
        });
      }
    });
    
    var GETWIDTHS = function () {
      var img = HTMLCSS.FONTDATA.FONTS["MathJax_Main"][0x2014][5].img; // em-dash
      HTMLCSS.imgEmWidth = [];
      for (var i = 0, m = img.length; i < m; i++) {HTMLCSS.imgEmWidth[i] = img[i][0]}
    };
    
    var IMGDIR = HTMLCSS.imgDir + HTMLCSS.imgPacked;
    
    MathJax.Callback.Queue(
      ["Require",AJAX,IMGDIR+"/imagedata.js"],
      GETWIDTHS,
      ["loadComplete",AJAX,HTMLCSS.directory+"/imageFonts.js"]
    );
      
  });
  
})(MathJax.Hub,MathJax.OutputJax["HTML-CSS"],MathJax.Ajax);
