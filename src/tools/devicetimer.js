export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          timerId: null,
          freshTime: 5000,
          detail: null,
          pdi: null,
          boolFields: [],
        };
      },
      methods: {
        clearTimerId() {
          if (this.timerId) {
            clearInterval(this.timerId);
          }
        },
        startTimer() {
          this.clearTimerId();
          this.timerId = setInterval(() => {
            this.callback();
          }, this.freshTime);
        },
        getData(loading = true) {
          const { pdi, pditype: type = undefined } = this;
          if (typeof this.fetchDevice !== 'function') return;
          this.fetchDevice({ pdi, type }, loading)
            .then((res) => {
              console.log(res.data.devices);
              const device = res.data.devices;
              if (device) {
                Object.keys(device).forEach((item) => {
                  if (this.boolFields.indexOf(item) > -1) {
                    device[item] = device[item] == 0;
                  }
                });
              }
              this.detail = device;
              if (typeof this.formatChartData === 'function') {
                this.formatChartData();
              }
            })
            .catch(() => {
              this.clearTimerId();
            });
        },
        callback() {
          this.getData(false);
        },
      },
      beforeDestroy() {
        this.clearTimerId();
      },
    });
  },
};