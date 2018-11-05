const clickoutsideContext = '@@clickoutsideContext';
export default {
  bind(el, binding, vnode) {
    console.log(el, binding, vnode, 'clickout.....');
    // eslint-disable-next-line
    const documentHandler = function(e) {
      if (vnode.context && !el.contains(e.target)) {
        vnode.context[el[clickoutsideContext].methodName]();
      }
    };
    // eslint-disable-next-line
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click',
    };
    document.addEventListener(el[clickoutsideContext].arg, documentHandler);
  },

  update(el, binding) {
    // eslint-disable-next-line
    el[clickoutsideContext].methodName = binding.expression;
  },

  unbind(el) {
    document.removeEventListener(
      el[clickoutsideContext].arg,
      el[clickoutsideContext].documentHandler,
    );
  },

  install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind,
    });
  },
};
