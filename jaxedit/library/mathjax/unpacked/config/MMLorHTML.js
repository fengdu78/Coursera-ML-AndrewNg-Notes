/*************************************************************
 *
 *  MathJax/config/MMLorHTML.js
 *  
 *  Chooses between the NativeMML and HTML-CSS output jax depending
 *  on the capabilities of the browser and configuration settings
 *  of the page.
 *  
 *  This file should be added to the config array when configuring
 *  MathJax.  Note that if you include this, you should NOT include
 *  an output jax in the jax array (it will be added for you by
 *  this file).
 *  
 *  You can specify the preferred output jax on a global or
 *  browser-by-browser basis.  To specify it globally, use
 *  
 *      MathJax.Hub.Config({
 *        MMLorHTML: {prefer: "MML"} // or "HTML"
 *      });
 *  
 *  To specify on a browser-by-borwser basis, use
 *  
 *      MathJax.Hub.Config({
 *        MMLorHTML: {prefer: {
 *          MSIE:    "MML",
 *          Firefox: "MML",
 *          Opera:   "HTML",
 *          other:   "HTML"
 *        }}
 *      });
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2010-2012 Design Science, Inc.
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

(function (HUB,BROWSER) {
  var VERSION = "2.1";
  
  var CONFIG = MathJax.Hub.CombineConfig("MMLorHTML",{
    prefer: {
      MSIE:"MML",
      Firefox:"HTML",
      Opera:"HTML",
      Chrome:"HTML",
      Safari:"HTML",
      other:"HTML"
    }
  });

  var MINBROWSERVERSION = {
    Firefox: 3.0,
    Opera: 9.52,
    MSIE: 6.0,
    Chrome: 0.3,
    Safari: 2.0,
    Konqueror: 4.0
  };
  
  var canUseHTML = (BROWSER.version === "0.0" ||
                    BROWSER.versionAtLeast(MINBROWSERVERSION[BROWSER]||0.0));

  var canUseMML = (BROWSER.isFirefox && BROWSER.versionAtLeast("1.5")) ||
                  (BROWSER.isMSIE    && BROWSER.hasMathPlayer) ||
                  (BROWSER.isSafari  && BROWSER.versionAtLeast("5.0")) ||
                  (BROWSER.isOpera   && BROWSER.versionAtLeast("9.52"));

  HUB.Register.StartupHook("End Config",function () {
    var prefer = (CONFIG.prefer && typeof(CONFIG.prefer) === "object" ? 
                  CONFIG.prefer[MathJax.Hub.Browser]||CONFIG.prefer.other||"HTML" :
                  CONFIG.prefer);

    if (canUseHTML || canUseMML) {
      if (canUseMML && (prefer === "MML" || !canUseHTML)) {
        if (MathJax.OutputJax.NativeMML) {MathJax.OutputJax.NativeMML.Register("jax/mml")}
          else {HUB.config.jax.unshift("output/NativeMML")}
        HUB.Startup.signal.Post("NativeMML output selected");
      } else {
        if (MathJax.OutputJax["HTML-CSS"]) {MathJax.OutputJax["HTML-CSS"].Register("jax/mml")}
          else {HUB.config.jax.unshift("output/HTML-CSS")}
        HUB.Startup.signal.Post("HTML-CSS output selected");
      }
    } else {
      HUB.PreProcess.disabled = true;
      HUB.prepareScripts.disabled = true;
      MathJax.Message.Set("Your browser does not support MathJax",null,4000);
      HUB.Startup.signal.Post("MathJax not supported");
    }
  });

})(MathJax.Hub,MathJax.Hub.Browser);

MathJax.Ajax.loadComplete("[MathJax]/config/MMLorHTML.js");
