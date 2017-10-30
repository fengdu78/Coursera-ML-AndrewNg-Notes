/*************************************************************
 *
 *  MathJax/jax/output/SVG/fonts/TeX/svg/Main/Italic/Main.js
 *
 *  Copyright (c) 2011 Design Science, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

MathJax.OutputJax.SVG.FONTDATA.FONTS['MathJax_Main-italic'] = {
  directory: 'Main/Italic',
  family: 'MathJax_Main',
  id: 'MJMAINI',
  style: 'italic',
  Ranges: [
    [0x20,0x7F,"BasicLatin"],
    [0x100,0x17F,"LatinExtendedA"],
    [0x180,0x24F,"LatinExtendedB"],
    [0x300,0x36F,"CombDiacritMarks"],
    [0x370,0x3FF,"GreekAndCoptic"],
    [0x2000,0x206F,"GeneralPunctuation"],
    [0x2100,0x214F,"LetterlikeSymbols"],
    [0x2200,0x22FF,"MathOperators"]
  ],

    // POUND SIGN
    0xA3: [714,11,769,88,699,'699 578Q699 473 635 473Q597 473 595 508Q595 559 654 569V576Q654 619 637 648T581 677Q545 677 513 647T463 561Q460 554 437 464T414 371Q414 370 458 370H502Q508 364 508 362Q505 334 495 324H402L382 241Q377 224 373 206T366 180T361 163T358 151T354 142T350 133T344 120Q340 112 338 107T336 101L354 90Q398 63 422 54T476 44Q515 44 539 73T574 133Q578 144 580 146T598 148Q622 148 622 139Q622 138 620 130Q602 74 555 32T447 -11Q395 -11 317 38L294 51Q271 28 233 9T155 -10Q117 -10 103 5T88 39Q88 73 126 106T224 139Q236 139 247 138T266 134L273 132Q275 132 302 239L323 324H259Q253 330 253 332Q253 350 265 370H300L334 371L355 453Q356 457 360 477T366 501T372 522T379 545T387 565T397 587T409 606T425 627Q453 664 497 689T583 714Q640 714 669 676T699 578ZM245 76Q211 85 195 85Q173 85 158 71T142 42Q142 26 160 26H163Q211 30 245 76']
};

MathJax.Ajax.loadComplete(MathJax.OutputJax.SVG.fontDir+"/Main/Italic/Main.js");
