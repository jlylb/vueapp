/* eslint-disable */
Plugin.install = function(Vue, options) {
  if (!window.plus) return;
  // 蓝牙搜索方法
  Vue.prototype.$AutoUpdateApp = () => ({
    getVersion(CallBack) {
      let wgtVer = null;
      // 异步操作
      plus.runtime.getProperty(plus.runtime.appid, info => {
        wgtVer = info.version;
        CallBack(wgtVer);
      });
    },
    // 下载wgt文件
    downWgt(wgtUrl) {
      const self = this;
      plus.nativeUI.showWaiting('下载更新文件...');
      plus.downloader
        .createDownload(wgtUrl, { method: 'post' }, (d, status) => {
          if (status == 200) {
            console.log(`下载更新文件成功：${d.filename}`);
            self.installWgt(d.filename); // 安装wgt包
          } else {
            plus.nativeUI.alert('下载失败！');
          }
          plus.nativeUI.closeWaiting();
        })
        .start();
    },
    // 更新应用资源
    installWgt(path) {
      plus.nativeUI.showWaiting('安装更新文件...');
      plus.runtime.install(
        path,
        {},
        () => {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert('应用资源更新完成！', () => {
            plus.runtime.restart();
          });
        },
        e => {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert(`安装更新文件失败[${e.code}]：${e.message}`);
          if (e.code == 10) {
            plus.nativeUI.alert('请清除临时目录');
          }
        },
      );
    },
  });
};

export default Plugin;
