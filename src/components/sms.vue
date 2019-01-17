<template>
  <mt-button :type="type" :disabled="auto" @click.native="getSMS" size="small">{{ smsText }}</mt-button>
</template>

<script>
export default {
  data() {
    return {
      smsText: this.text, //按钮文字
      smsCls: "", //按钮样式
      smsNum: this.time, //倒计时时间
      deNum: this.time, //默认倒计时时间
      auto: this.isDisabled, //开关--在倒计时
      smstimeout: null
    };
  },
  methods: {
    getSMS() {
      if (this.auto === false) {
        this.$emit("sentAjax"); // 发ajax
        this.auto = true;
        this.smsText = this.smsNum + "秒后重发";
        this.smstimeout = setInterval(() => {
          this.smsNum--;
          this.smsText = this.smsNum + "秒后重发";
          if (this.smsNum === 0) {
            this.stopTimer();
            this.smsText = "重新发送";
            this.smsNum = this.deNum;
            this.auto = false;
          }
        }, 1000);
      }
    },
    stopTimer() {
      if (this.smstimeout) {
        clearInterval(this.smstimeout);
      }
    },
    reset() {
      this.stopTimer();
      this.smsText = "重新发送";
      this.smsNum = this.deNum;
      // this.auto = false;
    }
  },
  watch: {
    isDisabled(newval) {
      console.log(newval, "sms......");
      this.auto = newval;
    }
  },
  props: {
    type: {
      type: String,
      default: "primary"
    },
    time: {
      type: Number,
      default: 60
    },
    text: {
      type: String,
      default: "点击发送"
    },
    timeOut: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.timeOut === true) this.getSMS();
  },
  beforeDestroy() {
    this.stopTimer();
  }
};
</script>

<style>
</style>
