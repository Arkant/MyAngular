/* eslint-disable no-eval */
/* eslint-disable no-console */
(function() {
  const directives = [{}];
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
    scope.$watch(() => scope[data], () => {
      el.style.display = eval(data) ? 'block' : 'none';
    });
  });

  smallAngular.directive('ng-hide', (scope, el) => {
    const data = el.getAttribute('ng-hide');

    el.style.display = eval(data) ? 'none' : 'block';
    scope.$watch(() => scope[data], () => {
      el.style.display = eval(data) ? 'none' : 'block';
    });
  });

  smallAngular.directive('ng-click', (scope, el) => {
    const data = el.getAttribute('ng-click');

    el.addEventListener('click', e => {
      eval(data);
      scope.$apply();
    });
  });

  smallAngular.directive('ng-init', (scope, el) => {
    const data = el.getAttribute('ng-init');
    eval(data);
  });

  smallAngular.directive('ng-bind', (scope, el) => {
    const data = el.getAttribute('ng-bind');

    scope.$watch(name, () => {
      el.innerText = scope[data];
    });
    scope.$apply();
  });

  smallAngular.directive('ng-random-color', (scope, el) => {
    el.addEventListener('click', e => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      el.style.backgroundColor = `#${randomColor}`;
    });
  });

  smallAngular.directive('ng-repeat', (scope, el) => {
    const data = el.getAttribute('ng-repeat');
    const parent = el.parentNode;
    const [, item] = data.split(' in ');

    scope.$watch(name, () => {
      const items = Array.from(scope[item]);
      const similarEls = document.querySelectorAll(`[ng-repeat="${data}"]`);

      items.forEach(item => {
        const newLi = el.cloneNode();
        newLi.innerHTML = item;
        parent.appendChild(newLi);
      });

      for (const $el of Array.from(similarEls)) {
        $el.remove();
      }
    });
  });

  smallAngular.directive('ng-make-short', (scope, el, attrs) => {
    scope.$watch(() => attrs.length.value, () => {
      el.innerText = `${el.innerText.slice(0, attrs.length.value || 5)} ...`;
    });
  });

  smallAngular.directive('ng-model', (scope, el) => {
    const data = el.getAttribute('ng-model');

    el.addEventListener('input', () => {
      scope[data] = el.value;
      scope.$apply();
    });
    scope.$watch(data, () => {
      el.value = eval(data);
    });
  });

  smallAngular.bootstrap();
}());