<template>
  <div class="chart-desc" v-if="item">
    <div class="chart-desc-title">
      <div class="chart-desc-item chart-desc-item-left">
        <div class="chart-desc-icon">
          <svg-icon icon-class="wsdu" class="item-icon"></svg-icon>
        </div>
      </div>
      <div class="chart-desc-item chart-desc-item-right">
        <p>
          <span class="item-title item-title-select" @click="deviceFileter">{{ this.deviceName }}</span>
        </p>
        <p>
          {{ item['consta']['consta_name'] }}:
          <mt-badge
            :type="item['consta']['consta_value']==0?'success':'error'"
          >{{ item['consta']['consta_value']==0?'正常':'断线' }}</mt-badge>
        </p>
      </div>
    </div>
    <div class="chart-desc-block">
      <div
        :class="['chart-desc-block-item', itemClass[itemFields.indexOf(index)]]"
        v-for="(itemValue, index) in currentItem"
        :key="index"
      >
        <p :class="{column: isColumn}">
          <span>{{ itemValue[index+'_name'] }}</span>
          <span>{{ itemValue[index+'_value'] }} {{ unit[index] }}</span>
        </p>
        <p :class="{column: isColumn}">
          <span>上限告警</span>
          <span>{{ itemValue['hwarn_value']==0?'正常':'过高' }}</span>
        </p>
        <p :class="{column: isColumn}">
          <span>下限告警</span>
          <span>{{ itemValue['lwarn_value']==0?'正常':'过低' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return null;
      }
    },
    itemFields: {
      type: Array,
      default() {
        return [];
      }
    },
    itemClass: {
      type: Array,
      default() {
        return [];
      }
    },
    unit: {
      type: Object,
      default() {
        return null;
      }
    },
    isColumn: {
      type: Boolean,
      default() {
        return false;
      }
    },
    deviceName: {
      type: String,
      default() {
        return "";
      }
    }
  },
  computed: {
    currentItem() {
      let items = {};
      for (let itemKey in this.item) {
        if (itemKey != "consta") {
          items[itemKey] = this.item[itemKey];
        }
      }
      return items;
    }
  },
  methods: {
    deviceFileter() {
      this.$emit("filter");
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-desc {
  height: 55%;
}
.item-title {
  letter-spacing: normal;
  cursor: pointer;
  &::after {
    border: solid 2px $blue;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    position: absolute;
    width: 6px;
    height: 6px;
    transform: rotate(135deg);
    display: inline-block;
    margin-left: 3px;
  }
}
.chart-desc-title {
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 10px 0;
  height: 25%;
  background-color: #e6effb;
}
.chart-desc-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: $blue;
  position: relative;
  margin: 0 auto;
  .item-icon {
    position: absolute;
    fill: #fff;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
.chart-desc-item-left {
  width: 25%;
}
.chart-desc-item-right {
  width: 75%;
  p {
    &:first-child {
      color: $blue;
      letter-spacing: 5px;
    }
    text-align: left;
    padding: 5px;
    color: rgba(0, 0, 0, 0.5);
    span {
      display: inline-block;
      // padding-left: 3px;
    }
  }
}
.chart-desc-block {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  // height: 185px;
  height: 75%;
}
.chart-desc-block-item {
  width: 50%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  p {
    display: flex;
    justify-content: space-around;
    width: 80%;
    &.column {
      flex-direction: column;
      width: auto;
      span {
        &:first-child {
          margin-bottom: 3px;
        }
      }
    }
    span {
      &:first-child {
        margin-right: 5px;
      }
      border-radius: 25%;
      border: 1px solid rgba(255, 255, 255, 0.8);
      display: inline-block;
      padding: 5px;
    }
  }
}
.red {
  background-color: #f56c6c;
}
.yellow {
  background-color: #e6a23c;
}
.primary {
  background-color: #409eff;
}
</style>
