<template>
  <div class="layout-container air">
    <top-component></top-component>

    <mt-button
      size="small"
      :type="active===item.value?'primary':'default'"
      @click.native.prevent="selectButton(item.value)"
      v-for="item in buttons"
      :key="item.value"
    >{{ item.label }}</mt-button>

    <mt-tab-container v-model="active" v-if="detail">
      <mt-tab-container-item id="tab-real" class="real">
        <mt-cell is-link @click.native="openDetail('A')">
          <v-circle :percent="fixPer(detail.rd_PhaVol_A)" dashboard>
            <p>A相电压</p>
            <p>{{ detail.rd_PhaVol_A }} {{ unit }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell is-link @click.native="openDetail('B')">
          <v-circle :percent="fixPer(detail.rd_PhaVol_B)" dashboard>
            <p>B相电压</p>
            <p>{{ detail.rd_PhaVol_B }} {{ unit }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell is-link @click.native="openDetail('C')">
          <v-circle :percent="fixPer(detail.rd_PhaVol_C)" dashboard>
            <p>C相电压</p>
            <p>{{ detail.rd_PhaVol_C }} {{ unit }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell is-link @click.native="openDetail('all')">
          <v-circle :percent="fixPer(detail.rd_AvePhaVol)" dashboard>
            <p>合相电压</p>
            <p>{{ detail.rd_AvePhaVol }} {{ unit }}</p>
          </v-circle>
        </mt-cell>

        <mt-cell>
          <mt-button type="primary" size="small" @click.native.prevent="more">更多参数</mt-button>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-running">
        <mt-cell
          :title="item.label"
          :label="detail[item.field]?item.tLabel:item.fLabel"
          v-for="(item, index) in running"
          :key="index"
        >
          <mt-switch v-model="detail[item.field]" disabled></mt-switch>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-alarm">
        <mt-cell :title="item.label" v-for="(item, index) in alarm" :key="index">
          <mt-badge
            :type="detail[item.field]==0?'success':'error'"
          >{{ detail[item.field]==0?item.tLabel:item.fLabel }}</mt-badge>
        </mt-cell>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab-temp">
        <mt-cell :title="item.label" v-for="(item, index) in moreParams" :key="index">
          <span style="color: green">{{ detail[item.field] }} {{ item.unit }}</span>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
    <popup-bottom
      :open.sync="openPop"
      :data="popData"
      :pop-prop="{ position: 'bottom' }"
      :show-label="true"
    ></popup-bottom>
  </div>
</template>

<script>
import { fetchDevice } from "@/api/monitor";
import { getDataValue } from "@/tools";
import { mapGetters } from "vuex";
import VCircle from "@/components/vcircle";

import PopupBottom from "@/components/dropdown";

export default {
  components: { VCircle, PopupBottom },
  data() {
    return {
      rangeValue: 10,
      rangeValue1: 5,
      active: "tab-real",
      buttons: [
        { value: "tab-real", label: "实时数据" },
        { value: "tab-running", label: "运行状态" },
        { value: "tab-alarm", label: "告警状态" },
        { value: "tab-temp", label: "参数" }
      ],
      switch1: true,
      detail: null,
      running: [],
      alarm: [
        {
          label: "网络状态",
          field: "rd_NetCom",
          tLabel: "正常",
          fLabel: "断线"
        }
      ],
      boolFields: [],
      moreParams: [
        { label: "总有功电能", field: "rd_PosActEne", unit: "KWH" },
        { label: "总无功电能", field: "rd_PosReaPow_All", unit: "KWH" },
        { label: "频率", field: "rd_Freq", unit: "HZ" },
        { label: "PT", field: "rd_PTValue", unit: "" },
        { label: "CT", field: "rd_CTValue", unit: "" }
      ],
      chartData: {},
      chartSettings: {},
      openPop: false,
      popData: [],
      unit: "V",
      mapFields: {
        A: [
          { field: "rd_PhaVol_A", label: "A相电压", unit: "V" },
          { field: "rd_PhaCur_A", label: "A相电流", unit: "A" },
          { field: "rd_ActPow_A", label: "A相有功功率", unit: "kW" },
          { field: "rd_PowFac_A", label: "A相功率因数", unit: "kw" },
          { field: "rd_ReaPow_A", label: "A相无功功率", unit: "Kw" },
          { field: "rd_PhaCur_A", label: "A相视在功率", unit: "Kw" },
          { field: "rd_PhaOutload_A", label: "A相输出负载", unit: "%" }
        ],
        B: [
          { field: "rd_PhaVol_B", label: "B相电压", unit: "V" },
          { field: "rd_PhaCur_B", label: "B相电流", unit: "A" },
          { field: "rd_ActPow_B", label: "B相有功功率", unit: "kW" },
          { field: "rd_PowFac_B", label: "B相功率因数", unit: "kw" },
          { field: "rd_ReaPow_B", label: "B相无功功率", unit: "Kw" },
          { field: "rd_PhaCur_B", label: "B相视在功率", unit: "Kw" },
          { field: "rd_PhaOutload_B", label: "B相输出负载", unit: "%" }
        ],
        C: [
          { field: "rd_PhaVol_C", label: "C相电压", unit: "V" },
          { field: "rd_PhaCur_C", label: "C相电流", unit: "A" },
          { field: "rd_ActPow_C", label: "C相有功功率", unit: "kW" },
          { field: "rd_PowFac_C", label: "C相功率因数", unit: "kw" },
          { field: "rd_ReaPow_C", label: "C相无功功率", unit: "Kw" },
          { field: "rd_PhaCur_C", label: "C相视在功率", unit: "Kw" },
          { field: "rd_PhaOutload_C", label: "C相输出负载", unit: "%" }
        ],
        all: [
          { field: "rd_AvePhaVol", label: "合相电压", unit: "V" },
          { field: "rd_AvePhaCur", label: "合相电流", unit: "A" },
          { field: "rd_ActPow_All", label: "合相有功功率", unit: "kW" },
          { field: "rd_PowFac_All", label: "合相功率因数", unit: "kw" },
          { field: "rd_ReaPow_All", label: "合相无功功率", unit: "Kw" },
          { field: "rd_AppPow_All", label: "合相视在功率", unit: "Kw" },
          { field: "rd_AveLoad", label: "合相输出负载", unit: "%" }
        ]
      }
    };
  },
  computed: {},
  methods: {
    fixPer(val) {
      return Number(((val * 100) / 240).toFixed(1));
    },
    round(val, surfix = 1) {
      return val && val.toFixed(surfix);
    },
    selectButton(tab) {
      this.active = tab;
    },
    more() {
      this.active = "tab-temp";
    },
    openDetail(pName) {
      this.popData = [];
      this.openPop = true;
      let params = this.mapFields[pName];

      this.popData = params.map(v => {
        let { field, label, unit } = v;
        return { label, value: this.detail[field] + " " + unit };
      });

      console.log(this.popData, "after open detail");
    }
  },

  created() {
    this.extend = {
      grid: {
        left: "5%",
        right: "5%",
        bottom: "1%"
      },
      xAxis: {
        axisLabel: {
          interval: 0
        }
      }
    };
    const { pdi } = this.$route.params;
    fetchDevice({ pdi }).then(res => {
      console.log(res.data.devices);
      const device = res.data.devices;
      if (device) {
        Object.keys(device).map(item => {
          if (this.boolFields.indexOf(item) > -1) {
            device[item] = device[item] == 0 ? true : false;
          }
        });
      }
      this.detail = device;
    });
  }
};
</script>

<style lang='scss' scoped>
.sheet .mu-item-action {
  justify-content: center;
  color: inherit;
}
.real {
  p {
    padding: 2px 0;
  }
  /deep/ .mint-cell-value {
    position: relative;
    justify-content: space-around;
    margin: 5px 0;
    width: 100%;
  }
  .air-range {
    width: 100%;
  }
}
</style>

