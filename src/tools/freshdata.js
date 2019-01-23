export default {
  data() {
    return {
      timerId: null,
      freshTime: 5000,
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
        this.remoteCb();
      }, this.freshTime);
    },
    remoteCb() {
      if (typeof this.getData === 'function') {
        this.getData(false);
      }
    },
  },
  beforeDestroy() {
    this.clearTimerId();
  },
};
