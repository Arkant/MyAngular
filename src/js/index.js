/* eslint-disable no-console */
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
      for (let i = 0; i <= node.length - 1; i++) {
        console.log(`${node[i].name} -> ${node[i].value}`);
      }
    },
    bootstrap(node) {
      const appWrapper = document.querySelector('[ng-app]');
      const child = appWrapper.children;
      console.log(child);

      [...child].map(item =>
        this.compile(item.attributes)
      );
    }
  };

  window.smallAngular = smallAngular;
  smallAngular.directive('ng-click', () => console.log('i am ng-click'));
  smallAngular.bootstrap();
}());