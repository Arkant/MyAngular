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
      if (typeof method !== 'function') {
        throw new Error('Callback must be a function!');
      }

      directives.push({ ngName, method });
    },
    compile(node) {
      for (let i = 0; i < node.attributes.length; i++) {
        directives.forEach(element => {
          const { name, value } = node.attributes[i];

          if (name === element.ngName) {
            element.method(scope, node, value);
          }
        });
      }
    },
    bootstrap(node = document.querySelector('[ng-app]')) {
      const children = node.querySelectorAll('*');

      children.forEach(this.compile);
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
}());