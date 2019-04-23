<template>
  <div class="layout-container air">
    <top-component></top-component>
    <div v-if="detail">
      <mt-cell title="电巡工作状态">{{ detail.rd_Batstatus }}</mt-cell>
      <mt-cell title="电巡总电流">{{ detail.rd_Batscurrent }}</mt-cell>
      <mt-cell title="网络通讯">
        <mt-badge :type="detail.rd_NetCom==0?'success':'error'">{{ detail.rd_NetCom==0?"正常":"断线" }}</mt-badge>
      </mt-cell>
      <mt-cell title="当前电池组" @click.native="openGroup">{{ currentGroup }}</mt-cell>
    </div>
    <mt-button
      class="params-btn"
      size="small"
      :type="active===item.value?'primary':'default'"
      @click.native.prevent="selectButton(item.value)"
      v-for="item in buttons"
      :key="item.value"
    >{{ item.label }}</mt-button>

    <mt-tab-container v-model="active" v-if="detail">
      <mt-tab-container-item id="tab-params">
        <mt-cell
          :title="item.label"
          v-for="(item, index) in paramsFields"
          :key="index"
        >{{ detail[item.field] }}</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-dc">
        <mt-cell
          :title="item.label"
          v-for="(item, index) in dyFields"
          :key="index"
        >{{ detail[item.field] }}</mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-alarm">
        <mt-cell :title="item.label" v-for="(item, index) in alarmFields" :key="index">
          <mt-badge
            :type="detail[item.field]==0?'success':'error'"
          >{{ detail[item.field]==0?"正常":"异常" }}</mt-badge>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-net">
        <mt-cell :title="item.label" v-for="(item, index) in netFields" :key="index">
          <mt-badge
            :type="detail[item.field]==1?'success':'error'"
          >{{ detail[item.field]==1?"正常":"异常" }}</mt-badge>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-popup v-model="groupPopup" class="popup-device" position="bottom">
      <mt-cell
        :title="getCurrentGroup(item)"
        v-for="item in groups"
        :key="item"
        @click.native="changeGroup(item)"
        :class="['donghuang-item', {'active-cell': groupIndex == item}]"
      >
        <icon-bg slot="icon" class="battery-group" icon="battery-group" small></icon-bg>
      </mt-cell>
    </mt-popup>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";

export default {
  data() {
    return {
      active: "tab-params",
      buttons: [
        { value: "tab-params", label: "电池参数" },
        { value: "tab-dc", label: "电池电压" },
        { value: "tab-alarm", label: "告警状态" },
        { value: "tab-net", label: "连线状态" }
      ],
      detail: null,
      paramsFields: [],
      dyFields: [],
      alarmFields: [],
      netFields: [],
      pdi: null,
      prefix: "rd_Bat",
      group: ["一", "二", "三", "四", "五"],
      groupName: "电池组",
      groupIndex: 1,
      groupPopup: false,
      groups: 5
    };
  },
  computed: {
    currentGroup() {
      return this.getCurrentGroup(this.groupIndex);
    }
  },
  methods: {
    fetchDevice,
    selectButton(tab) {
      this.active = tab;
    },
    genParamsFields(i) {
      const fields = [
        ["Volzy", "组压"],
        ["Volgy", "最高电压"],
        ["Voldybh", "最高电压电池编号"],
        ["Voldy", "最低电压"],
        ["Voldybh", "最低电压电池编号"],
        ["Volpjdy", "平均电压"],
        ["Voldcjs", "电池节数"]
      ];
      let paramsFields = [];
      fields.forEach(item => {
        let [field, label] = item;
        paramsFields.push({
          label: `${label}`,
          field: `${this.prefix}${i}${field}`
        });
      });
      this.paramsFields = paramsFields;
    },
    genDyFields(i) {
      const fields = ["Vol", "号电池电压"];
      const [field, label] = fields;
      let dyFields = [];
      for (let a = 1; a <= 80; a++) {
        dyFields.push({
          label: `${a - 1}${label}`,
          field: `${this.prefix}${i}${field}${a}`
        });
      }
      this.dyFields = dyFields;
    },
    genAlarmFields(i) {
      const fields = [["Voldcgz", "号电池故障"], ["Voldyyc", "号电压异常"]];
      let alarmFields = [];
      for (let a = 1; a <= 80; a++) {
        fields.forEach(item => {
          let [field, label] = item;
          alarmFields.push({
            label: `${a - 1}${label}`,
            field: `${this.prefix}${i}${field}${a}`
          });
        });
      }
      this.alarmFields = alarmFields;
    },
    genNetFields(i) {
      const fields = ["Model", "模块", "连线"];
      const [field, label, surfix] = fields;
      let netFields = [];
      for (let a = 0; a < 10; a++) {
        netFields.push({
          label: `${label}${a}${surfix}`,
          field: `${this.prefix}${field}${a}`
        });
      }
      this.netFields = netFields;
    },
    genFields(i) {
      this.genParamsFields(i);
      this.genDyFields(i);
      this.genAlarmFields(i);
      this.genNetFields(i);
    },
    getCurrentGroup(i) {
      return `${this.groupName}${this.group[i - 1]}`;
    },
    changeGroup(index) {
      this.groupIndex = index;
      this.genFields(index);
    },
    openGroup() {
      this.groupPopup = true;
    }
  },

  created() {
    this.genFields(this.groupIndex);
    const { pdi } = this.$route.params;
    this.pdi = pdi;
    this.getData();
    this.startTimer();
  }
};
</script>

<style lang='scss' scoped>
.battery-group {
  border-color: rgba(#ccc, 0.5);
}
</style>

