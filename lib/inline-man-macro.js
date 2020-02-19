/* Copyright (c) 2018 OpenDevise, Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Extends the AsciiDoc syntax to add support for the inline man(ual) macro.
 * This macro creates a link to a manual page that's suitable for the output
 * format.
 *
 * Usage:
 *
 *  man:cbbackupmgr[1]
 *
 * The target must be located in the same directory as the source.
 *
 * @author Dan Allen <dan@opendevise.com>
 */
const { posix: path } = require('path')

function initInlineManMacro (context) {
  console.log("initInlineManMacro func called");
  return function () {
    console.log("return function called");
    this.process((parent, target, attrs) => {
      console.log("this.process called");
      console.log("target: ", target);
      console.log("attrs: ", attrs);
      const text = target.startsWith('couchbase-cli-') ? target.substr(14) : target
      console.log("text: ", text);
      const pageId = path.join(path.dirname(context.file.src.relative), target)
      console.log("pageId: ", pageId);
      // NOTE the value of the path attribute is never used, so we can fake it
      const attributes = Opal.hash2(['refid', 'path'], { refid: pageId, path: pageId })
      console.log("attributes:", attributes);
      return this.createInline(parent, 'anchor', text, { type: 'link', target: "/docs/ref/config/latest/" + target + ".html", attributes })
    })
  }
}

function register (registry, context) {
  console.log("register function called");
  registry.inlineMacro('config', initInlineManMacro(context))
}

module.exports.register = register