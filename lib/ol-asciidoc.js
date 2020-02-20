const { posix: path } = require('path')

function initInlineManMacro (context, docType) {
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
      // const attributes = Opal.hash2(['refid', 'path'], { refid: pageId, path: pageId })
      console.log("attributes:", attributes);
      return this.createInline(parent, 'anchor', text, { type: 'link', target: "/docs/ref/" + docType + "/latest/" + target + ".html", attributes })
    })
  }
}

function register (registry, context) {
  console.log("register function called");
  registry.inlineMacro('config', initInlineManMacro(context, "config"))
  registry.inlineMacro('feature', initInlineManMacro(context, "feature"))
}

module.exports.register = register