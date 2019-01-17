/* eslint-disable */
const install = function(Vue, options) {
 
  Vue.prototype.$AutoUpdateApp = () => ({
    getVersion(CallBack) {
      if (!window.plus) return;
      let wgtVer = null;
      // 异步操作
      plus.runtime.getProperty(plus.runtime.appid, info => {
        wgtVer = info.version;
        CallBack(wgtVer);
      });
    },
    // 下载wgt文件
    downWgt(wgtUrl) {
      console.log(wgtUrl, '开始下载.......');
      const self = this;
      if (!window.plus) return;
      // plus.nativeUI.showWaiting('下载更新文件...');
      plus.downloader
        .createDownload(wgtUrl, { filename: '_doc/update/' }, (d, status) => {
          if (status == 200) {
            console.log(`下载更新文件成功：${d.filename}`);
            self.installWgt(d.filename); // 安装wgt包
          } else {
            // plus.nativeUI.alert('下载失败！');
            console.log("下载失败")
          }
          // plus.nativeUI.closeWaiting();
        })
        .start();
    },
    // 更新应用资源
    installWgt(path) {
      console.log(path, '开始安装.......');
      if (!window.plus) return;
      // plus.nativeUI.showWaiting('安装更新文件...');
      plus.runtime.install(
        path,
        {},
        () => {
          // plus.nativeUI.closeWaiting();
          // plus.nativeUI.alert('应用资源更新完成！', () => {
          //   plus.runtime.restart();
          // });
          console.log('应用资源更新完成！')
        },
        e => {
          // plus.nativeUI.closeWaiting();
          // plus.nativeUI.alert(`安装更新文件失败[${e.code}]：${e.message}`);
          // if (e.code == 10) {
          //   plus.nativeUI.alert('请清除临时目录');
          // }
          console.log(`安装更新文件失败[${e.code}]：${e.message}`)
        },
      );
    },
    testMethod() {
      console.log('update method auto app......');
    },
  });
};

export default install;
