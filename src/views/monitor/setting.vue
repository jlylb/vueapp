<template>
  <mt-popup
    v-model="openSetting"
    class="popup-device"
    :style="{height: '350px'}"
    :close-on-click-modal="false"
    position="bottom"
  >
    <tool-bar confirm-text="保存" @cancel="cancel" @confirm="confirm"></tool-bar>
    <mt-field
      class="limit"
      :label="item.label"
      placeholder="请输入阀值"
      type="number"
      v-for="(item, index) in form"
      v-model="item.value"
      :key="index"
    ></mt-field>
    <nt-loading :visible="loadingVisible"></nt-loading>
  </mt-popup>
</template>

<script>
import ToolBar from "@/components/toolbar";
import NtLoading from "@/components/ntLoading";
import { fetchDeviceData, saveCommand } from "@/api/limit";
import { Indicator, Toast } from "mint-ui";

export default {
  components: { ToolBar, NtLoading },
  data() {
    return {
      openSetting: this.visible,
      params: null,
      configForm: {},
      form: {},
      desc: {},
      loadingVisible: false
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    pdiIndex: {
      type: [String, Number],
      default: null
    },
    itemIndex: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    cancel() {
      this.openSetting = false;
    },
    confirm() {
      const post = {
        pdi_index: this.pdiIndex,
        data: this.form
      };
      // Indicator.open("正在保存...");
      this.loadingVisible = true;
      saveCommand(post)
        .then(res => {
          Toast(res.data.msg);
          this.openSetting = false;
          this.getData()
            .then(() => {
              // Indicator.close();
              this.loadingVisible = false;
            })
            .catch(() => {
              // Indicator.close();
              this.loadingVisible = false;
            });
        })
        .catch(() => {
          // Indicator.close();
          this.loadingVisible = false;
        });
    },
    genModels() {
      this.form = {};
      Object.keys(this.desc).forEach(item => {
        let itemKey = `${item}${this.itemIndex}`;
        let fieldKey = `rd_${itemKey}`;
        let label = this.desc[item].replace(/\d+/, this.itemIndex);
        let dpId = this.params[fieldKey].Dp_id;
        let value = this.params[fieldKey].value;
        this.form[fieldKey] = {
          // field: fieldKey,
          label: label,
          dp_id: dpId,
          value: value
        };
      });
    },
    getData() {
      return fetchDeviceData({ pdi_index: this.pdiIndex }).then(res => {
        this.params = res.data.params;
        this.desc = res.data.desc;
        this.genModels();
      });
    }
  },
  watch: {
    visible(nval) {
      this.openSetting = nval;
    },
    openSetting(newVal) {
      this.$emit("update:visible", newVal);
    },
    pdiIndex() {
      this.getData();
    },
    itemIndex(nval, oval) {
      console.log(nval, oval, "items...............");

      this.genModels();
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.limit .mint-cell-title {
  width: 170px;
}
</style>
