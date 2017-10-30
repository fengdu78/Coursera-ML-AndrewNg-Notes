/*************************************************************
 *
 *  MathJax/jax/output/SVG/config.js
 *  
 *  Initializes the SVG OutputJax (the main definition is in
 *  MathJax/jax/input/SVG/jax.js, which is loaded when needed).
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2012 Design Science, Inc.
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

MathJax.OutputJax.SVG = MathJax.OutputJax({
  id: "SVG",
  version: "2.1",
  directory: MathJax.OutputJax.directory + "/SVG",
  extensionDir: MathJax.OutputJax.extensionDir + "/SVG",
  autoloadDir: MathJax.OutputJax.directory + "/SVG/autoload",
  fontDir: MathJax.OutputJax.directory + "/SVG/fonts", // font name added later
  
  config: {
    scale: 100, minScaleAdjust: 50, // global math scaling factor, and minimum adjusted scale factor
    font: "TeX",                    // currently the only font available
    blacker: 10,                    // stroke-width to make fonts blacker
    mtextFontInherit: false,        // to make <mtext> be in page font rather than MathJax font
    undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif",  // fonts to use for missing characters

    addMMLclasses: false,           // keep MathML structure and use CSS classes to mark elements

    EqnChunk: (MathJax.Hub.Browser.isMobile ? 10: 50),
                                    // number of equations to process before showing them
    EqnChunkFactor: 1.5,            // chunk size is multiplied by this after each chunk
    EqnChunkDelay: 100,             // milliseconds to delay between chunks (to let browser
                                    //   respond to other events)

    linebreaks: {
      automatic: false,   // when false, only process linebreak="newline",
                          // when true, insert line breaks automatically in long expressions.

      width: "container" // maximum width of a line for automatic line breaks (e.g. "30em").
                         // use "container" to compute size from containing element,
                         // use "nn% container" for a portion of the container,
                         // use "nn%" for a portion of the window size
    },
    
    styles: {
      ".MathJax_SVG_Display": {
        "text-align": "center",
        margin:       "1em 0em"
      },
      
      "#MathJax_SVG_Tooltip": {
        "background-color": "InfoBackground", color: "InfoText",
        border: "1px solid black",
        "box-shadow": "2px 2px 5px #AAAAAA",         // Opera 10.5
        "-webkit-box-shadow": "2px 2px 5px #AAAAAA", // Safari 3 and Chrome
        "-moz-box-shadow": "2px 2px 5px #AAAAAA",    // Forefox 3.5
        "-khtml-box-shadow": "2px 2px 5px #AAAAAA",  // Konqueror
        padding: "3px 4px"
      }
    }
  }
});

if (!MathJax.Hub.config.delayJaxRegistration) {MathJax.OutputJax.SVG.Register("jax/mml")}

MathJax.OutputJax.SVG.loadComplete("config.js");
