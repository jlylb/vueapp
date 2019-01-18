import ProgressBox from '@/tools/progressbox';

let pbox;

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
      const dtask = plus.downloader.createDownload(
        wgtUrl,
        { filename: '_doc/update/' },
        (d, status) => {
          if (status == 200) {
            console.log(`下载更新文件成功：${d.filename}`);
            self.installWgt(d.filename); // 安装wgt包
          } else {
            // plus.nativeUI.alert('下载失败！');
            console.log('下载失败');
          }
          // plus.nativeUI.closeWaiting();
        },
      );
      dtask.addEventListener('statechanged', this.onStateChanged, false);
      dtask.start();
    },
    //下载状态
    onStateChanged(download, status) {
      pbox = ProgressBox({ per: 0 });
      ProgressBox.show();
      console.log(download, status, 'download stated changed.......');
      if (download.state == 3 && status == 200) {
        var percent = Math.round((download.downloadedSize / download.totalSize) * 100);
        pbox.per = percent;
      } else if (download.state == 4 && status == 200) {
        pbox.msg = '下载完成';
      }
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
          pbox.msg = '更新完成';
          setTimeout(() => {
            ProgressBox.close();
            plus.runtime.restart();
          }, 1000);

          console.log('应用资源更新完成！');
        },
        e => {
          // plus.nativeUI.closeWaiting();
          // plus.nativeUI.alert(`安装更新文件失败[${e.code}]：${e.message}`);
          // if (e.code == 10) {
          //   plus.nativeUI.alert('请清除临时目录');
          // }
          pbox.msg = '更新失败';
          setTimeout(() => {
            ProgressBox.close();
          }, 1000);
          console.log(`安装更新文件失败[${e.code}]：${e.message}`);
        },
      );
    },
    testMethod() {
      console.log('update method auto app......');
    },
    //获得系统信息
    GetDeviceInfo() {
      var device = {
        IMEI: plus.device.imei,
        IMSI: '',
        Model: plus.device.model,
        Vendor: plus.device.vendor,
        UUID: plus.device.uuid,
        Screen:
          plus.screen.resolutionWidth * plus.screen.scale +
          ' x ' +
          plus.screen.resolutionHeight * plus.screen.scale +
          '',
        DPI: plus.screen.dpiX + ' x ' + plus.screen.dpiY,
        OS: new Object(),
      };
      for (var i = 0; i < plus.device.imsi.length; i++) {
        device.IMSI += plus.device.imsi[i];
      }
      var types = {};
      types[plus.networkinfo.CONNECTION_UNKNOW] = '未知';
      types[plus.networkinfo.CONNECTION_NONE] = '未连接网络';
      types[plus.networkinfo.CONNECTION_ETHERNET] = '有线网络';
      types[plus.networkinfo.CONNECTION_WIFI] = 'WiFi网络';
      types[plus.networkinfo.CONNECTION_CELL2G] = '2G蜂窝网络';
      types[plus.networkinfo.CONNECTION_CELL3G] = '3G蜂窝网络';
      types[plus.networkinfo.CONNECTION_CELL4G] = '4G蜂窝网络';
      device.NetworkInfo = types[plus.networkinfo.getCurrentType()];
      device.OS = {
        Language: plus.os.language,
        Version: plus.os.version,
        Name: plus.os.name,
        Vendor: plus.os.vendor,
      };
      return device;
    },
  });
};

export default install;
