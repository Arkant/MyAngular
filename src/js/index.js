/* eslint-disable no-console */
(function() {
  const directives = [{
    name: 'ng-click',
    functions: [function(element, cb) {
      element.addEventListener('click', function() {
        const fn = new Function(cb);
        fn();
      });
    }]
  }];

  const smallAngular = {
    directive(ngName, cb) {
      directives.push({
        name: ngName,
        method: cb
      });
    },
    compile(node) {
      for (let i = 0; i <= node.length - 1; i++) {
        directives.forEach(element => {
          if (node[i].name === element.name) {
            element.method();
          }
        });
      }
    },
    bootstrap(node = '[ng-app]') {
      const appWrapper = document.querySelector(node);
      const child = appWrapper.children;

      [...child].forEach(item =>
        this.compile(item.attributes)
      );
    }
  };

  window.smallAngular = smallAngular;
  // smallAngular.directive('ng-click', () => console.log('i am ng-click'));
  // smallAngular.directive('ng-init', () => console.log('i am ng-init'));
  smallAngular.bootstrap();
}());