(function() {
  const directives = [{}];

  const smallAngular = {
    directive() {
      return undefined;
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