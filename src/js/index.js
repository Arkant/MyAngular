/* eslint-disable no-console */
(function() {
  const directives = [{
    name: 'ng-click',
    method(element, cb) {
      element.addEventListener('click', function() {
        const func = new Function(cb);
        func();
      });
    }
  }];

  const smallAngular = {
    directive(ngName, method) {
      directives.push({
        name: ngName,
        method
      });
    },
    compile(node) {
      const { attributes } = node;
      const { length } = attributes;

      for (let i = 0; i <= length - 1; i++) {
        directives.forEach(element => {
          if (attributes[i].name === element.name) {
            element.method(node, attributes[i].value);
          }
        });
      }
    },
    bootstrap(node = '[ng-app]') {
      const appWrapper = document.querySelector(node);
      const { children } = appWrapper;

      [...children].forEach(item =>
        this.compile(item)
      );
    }
  };

  window.smallAngular = smallAngular;
  smallAngular.directive('ng-click', el => console.log('called ng-click on', el));
  smallAngular.directive('ng-show', el => console.log('called ng-show on', el));
  smallAngular.directive('ng-make-short', el => console.log('called ng-make-short on', el));

  // smallAngular.bootstrap();
  // const appWrapper = document.querySelector('p');
  // smallAngular.compile(appWrapper);
}());