<template>
  <div class="grid">
    <grid-item v-for="(item, index) in items" :key="index" :item="item">
      <template slot="tool">
        <div :key="'out_'+items.order+'_'+itemIndex" v-for="(line, itemIndex) in item.line">
          <template v-if="item.line.length==1">
            <my-switch
              @switch-change="changeControl($event, item.line, line, item.order)"
              :sstatus.sync="line.bStatus"
              class="grid-switch"
              true-label="开"
              false-label="关"
            ></my-switch>
          </template>
          <template v-if="item.line.length==2">
            <my-switch
              @switch-change="changeControl($event, item.line, line, item.order)"
              :sstatus.sync="line.bStatus"
              class="grid-switch"
              :true-label="itemIndex==0?'起':'落'"
              false-label="停"
            ></my-switch>
          </template>
        </div>
      </template>
    </grid-item>
  </div>
</template>

<script>
import GridItem from "./gridItem";
import MySwitch from "@/components/mySwitch";
export default {
  components: {
    GridItem,
    MySwitch
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  inject: ["control"],
  methods: {
    changeControl(val, data, current, index) {
      this.control.changeControl(val, data, current, index);
    }
  }
};
</script>

<style lang="scss">
.grid {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  .grid-item {
    justify-content: center;
    width: 50%;
    align-items: center;
    min-height: 120px;
  }
  .icon-background {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }
  .grid-switch label {
    color: $theme-color;
    &.gray {
      color: #ccc;
    }
  }
}
</style>
