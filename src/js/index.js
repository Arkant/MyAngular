(function() {
  const directives = [];

  const smallAngular = {
    directive(ngName, cb) {
      directives.push({
        name: ngName,
        method: cb
      });
    },
    compile(node) {
      return undefined;
    },
    bootstrap(node) {
      return undefined;
    }
  };

  window.smallAngular = smallAngular;
}());