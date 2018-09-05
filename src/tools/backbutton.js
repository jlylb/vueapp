import router from '@/router';

if (window.plus) {
  window.plus.key.addEventListener('backbutton', () => {
    console.log('listening back button');
    const path = window.location.path;
    // const hash = location.hash;

    if (path === '/') {
      // 入口页了，执行退出。
      window.plus.runtime.quit();
    } else {
      // 根据实际需求选择相应的方法
      router.go(-1);
      window.history.back();
    }
  });
}
