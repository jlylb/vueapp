import Vue from 'vue';
import MyIndicator from '../components/indicator.vue';

const Indicator = Vue.extend(MyIndicator);

let instance;

export default {
  open(options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div'),
      });
    }
    console.log(instance, 'instance.......', instance.visible);
    if (instance.visible) return;
    instance.text = typeof options === 'string' ? options : options.text || '';
    instance.spinnerType = options.spinnerType || 'snake';
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  },
};
