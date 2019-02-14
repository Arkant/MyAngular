/* eslint-disable no-eval */
/* eslint-disable no-console */
(function() {
  const directives = [{}];
  const notNgAttrs = [];
  const watchers = [];
  const scope = window;

  scope.$watch = (name, watcher) => {
    watchers.push({ name, watcher });
  };

  scope.$apply = () => {
    watchers.forEach(({ watcher }) => watcher());
  };

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
            element.method(scope, node, attributes[i].value);
          }
        });
      }
    },
    bootstrap(node = document.querySelector('[ng-app]')) {
      const children = node.querySelectorAll('*');

      children.forEach(el =>
        this.compile(el)
      );
    }
  };

  window.smallAngular = smallAngular;
  smallAngular.directive('ng-show', (scope, el, attrs) => {
    const data = el.getAttribute('ng-show');
    el.style.display = eval(data) ? 'block' : 'none';
    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });
  smallAngular.directive('ng-click', (scope, el) => {
    el.addEventListener('click', e => {
      const data = el.getAttribute('ng-click');
      eval(data);
      scope.$apply();
    });
  });
  smallAngular.directive('ng-init', el => console.log('called ng-init on', el));
  smallAngular.directive('ng-make-short', el => console.log('called ng-make-short on', el));

  smallAngular.bootstrap();
  // const appWrapper = document.querySelector('p');
  // smallAngular.compile(appWrapper);
}());