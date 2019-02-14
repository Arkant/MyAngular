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

  smallAngular.directive('ng-show', (scope, el) => {
    const data = el.getAttribute('ng-show');
    el.style.display = eval(data) ? 'block' : 'none';
    scope.$watch(data, () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-hide', (scope, el) => {
    const data = el.getAttribute('ng-hide');
    el.style.display = eval(data) ? 'none' : 'block';
    scope.$watch('ng-hide', () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-click', (scope, el) => {
    el.addEventListener('click', e => {
      const data = el.getAttribute('ng-click');
      eval(data);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-init', (scope, el) => {
    const data = el.getAttribute('ng-init');
    eval(data);
    scope.$apply();
  });
  smallAngular.directive('ng-bind', el => console.log('called ng-bind on', el));
  smallAngular.directive('ng-model', el => console.log('called ng-model on', el));
  smallAngular.directive('ng-repeat', el => console.log('called ng-repeat on', el));
  smallAngular.directive('ng-random-color', el => console.log('called ng-random-color on', el));
  smallAngular.directive('ng-make-short', el => console.log('called ng-make-short on', el));

  smallAngular.bootstrap();
}());