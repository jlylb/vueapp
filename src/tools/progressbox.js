import Vue from 'vue';
import downloadState from '@/views/tabs/download.vue';

const Ds = Vue.extend(downloadState);
let instance;

const progressBox = (options) => {
  if (!instance) {
    // 生成组件
    instance = new Ds({
      data: options,
    });
    // 组件需要挂载在dom元素上
    instance.vm = instance.$mount();

    console.log(instance, '11111111....');
    document.body.appendChild(instance.vm.$el);
  }

  return instance.vm;
};

progressBox.show = () => {
  if (!instance || instance.isOpen) return;
  instance.isOpen = true;
};

progressBox.close = () => {
  if (!instance) return;
  instance.per = 0;
  instance.isOpen = false;
};
export default progressBox;
