const { posix: path } = require('path')

function initInlineManMacro (context, docType) {
  return function () {
    this.process((parent, target, attrs) => {
      // console.log("window.location.pathname: ", window.location.pathname);
      // console.log("{outdir}: ", {outdir});
      // console.log("{outfile}: ", {outfile});
      // console.log("document.options[:to_dir]: ", document.options[:to_dir]);
      const text = target
      console.log("text: ", text);
      const pageId = path.join(path.dirname(context.file.src.relative), target)
      console.log("pageId: ", pageId);
      console.log("path: ", path);
      console.log("context.file.src.relative: ", context.file.src.relative);
      console.log("dirname(context.file.src.relative): ", path.dirname(context.file.src.relative));
      console.log("basename:", path.basename);
      console.log("extname:", path.extname);
      console.log("toNamespacedPath:", path.toNamespacedPath);

      // NOTE the value of the path attribute is never used, so we can fake it
      const attributes = Opal.hash2(['refid', 'path'], { refid: pageId, path: pageId })
      if (docType == "javadoc") {
        console.log("doctype is javadoc for target: ", target);
        return target
      }
      else {
        console.log("doctype is NOT javadoc for target: ", target);
        return this.createInline(parent, 'anchor', text, { type: 'link', target: "/docs/ref/" + docType + "/latest/" + target + ".html", attributes })
      }
    })
  }
}

function register (registry, context) {
  registry.inlineMacro('config', initInlineManMacro(context, "config"))
  registry.inlineMacro('feature', initInlineManMacro(context, "feature"))
  registry.inlineMacro('javadoc', initInlineManMacro(context, "javadoc"))
}

module.exports.register = register