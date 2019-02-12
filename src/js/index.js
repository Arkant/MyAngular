/* eslint-disable no-console */
(function() {
  const directives = [{}];

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
    bootstrap(node = document.querySelector('*[ng-app]')) {
      const children = node.querySelectorAll('*');

      children.forEach(el =>
        this.compile(el)
      );
    }
  };

  window.smallAngular = smallAngular;
  smallAngular.directive('ng-click', el => console.log('called ng-click on', el));
  smallAngular.directive('ng-init', el => console.log('called ng-init on', el));
  smallAngular.directive('ng-show', el => console.log('called ng-show on', el));
  smallAngular.directive('ng-make-short', el => console.log('called ng-make-short on', el));

  smallAngular.bootstrap();
  // const appWrapper = document.querySelector('p');
  // smallAngular.compile(appWrapper);
}());