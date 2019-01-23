import { Indicator } from 'mint-ui';

function startLoading() {
  Indicator.open({
    text: '加载中……',
  });
}

function endLoading() {
  Indicator.close();
}

// let needLoadingRequestCount = 0;

export default {
  isShow: true,
  needLoadingRequestCount: 0,
  showFullScreenLoading() {
    if (this.needLoadingRequestCount === 0) {
      startLoading();
    }
    this.needLoadingRequestCount += 1;
  },
  tryHideFullScreenLoading() {
    if (this.needLoadingRequestCount <= 0) return;
    this.needLoadingRequestCount -= 1;
    if (this.needLoadingRequestCount === 0) {
      setTimeout(endLoading, 300);
    }
  },
  start() {
    if (this.isShow) {
      this.showFullScreenLoading();
    }
  },
  close() {
    if (this.isShow) {
      this.tryHideFullScreenLoading();
    }
  },
  enable(status = true) {
    this.isShow = status;
    return this;
  },
};
