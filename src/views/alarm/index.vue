<template>
  <div class="layout-container">
    <top-component>
      <template slot="right">
        <mt-button @click="goFilter">筛选</mt-button>
      </template>
    </top-component>

    <div
      class="realwarn"
      v-infinite-scroll="getData"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-distance="60"
    >
      <mt-cell
        @click.native.prevent="openRoute(item)"
        is-link
        v-for="(item, index) in device"
        :key="index"
      >
        <template slot="title">
          <span :class="['mint-cell-text', {'alarm-dot': isRead(item) } ]">{{ item.pdi_name }}</span>
          <span class="mint-cell-label">{{ item.pdi_warnname }}</span>
        </template>

        <mt-badge
          :type="wlevel[item.pdi_warnlevel]['class']"
          v-if="wlevel[item.pdi_warnlevel]"
        >{{ wlevel[item.pdi_warnlevel]['name'] }}</mt-badge>
        <!-- <svg-icon
          :icon-class="icons[item.pdi_type]"
          class="item-icon"
          slot="icon"
          v-if="icons[item.pdi_type]"
        ></svg-icon>-->
      </mt-cell>
    </div>
    <!-- <vue-qr  text="Hello world!" :size="200"></vue-qr> -->
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>加载中...
    </p>

    <mt-popup v-model="popupVisible" class="popup-device" position="bottom">
      <toolbar @cancel="cancelAlarm" @confirm="confirmAlarm(selectItem)" v-if="!selectItem.warnlog"></toolbar>
      <mt-cell title="告警时间">{{ selectItem.pdi_updatetime }}</mt-cell>
      <mt-cell title="设备编号">{{ selectItem.pdi_devid }}</mt-cell>
      <mt-cell title="设备名称">{{ selectItem.pdi_name }}</mt-cell>
      <mt-cell title="告警内容">{{ selectItem.pdi_warnname }}</mt-cell>
      <mt-cell title="区域">{{ selectItem.pdi_areaname }}</mt-cell>

      <template v-if="selectItem.warnlog">
        <mt-cell title="确认时间">
          <mt-badge type="success">{{ selectItem.warnlog.confirm_at }}</mt-badge>
        </mt-cell>
        <mt-cell title="确认人">
          <mt-badge type="success">{{ selectItem.warnlog.confirm_user }}</mt-badge>
        </mt-cell>
      </template>
    </mt-popup>

    <mt-popup v-model="popupFilter" class="popup-device" position="bottom">
      <toolbar @cancel="cancalFilter" @confirm="confirmFilter"></toolbar>
      <mt-cell title="开始时间" @click.native="changeTimeStart">{{ formatTime(searchDate.start) }}</mt-cell>
      <mt-cell title="结束时间" @click.native="changeTimeEnd">{{ formatTime(searchDate.end) }}</mt-cell>
    </mt-popup>

    <my-datetime-picker
      ref="pickerTimeStart"
      type="date"
      @confirm="handleConfirm($event, 'start')"
      @cancel="handleCancel('start')"
      v-model="pickerStart"
    ></my-datetime-picker>

    <my-datetime-picker
      ref="pickerTimeEnd"
      type="date"
      @confirm="handleConfirm($event, 'end')"
      @cancel="handleCancel('end')"
      v-model="pickerEnd"
    ></my-datetime-picker>
  </div>
</template>

<script>
import { fetchList, addWarn } from "@/api/alarm";
import { parseTime } from "@/tools/";
import Toast from "@/components/toast/toast.js";
import { mapGetters } from "vuex";
import MyDatetimePicker from "@/components/picker/datetime-picker.vue";
import Toolbar from "@/components/toolbar.vue";
// import VueQr from 'vue-qr'
export default {
  components: {
    MyDatetimePicker,
    Toolbar
  },
  data() {
    return {
      device: [],
      icons: null,
      wlevel: null,
      loading: false,
      moreLoading: false,
      selectItem: {},
      popupVisible: false,
      search: {
        page: 0,
        pageSize: 15
      },
      hasPage: true,
      popupFilter: false,
      pickerStart: new Date(),
      pickerEnd: new Date(),
      searchDate: { start: null, end: null },
      isConfirm: false
    };
  },
  computed: {
    ...mapGetters("user", ["notification"])
  },
  methods: {
    parseTime,
    openRoute(item) {
      this.selectItem = item;
      this.popupVisible = true;
    },
    desc() {
      const alarmNum = this.notification - 1;
      this.$store.dispatch("user/setNotification", alarmNum);
      if (!window.plus) reutrn;
      plus.runtime.setBadgeNumber(alarmNum);
    },
    getData() {
      this.loading = true;
      console.log(this.search, "search data ing.......");
      if (!this.hasPage) {
        return;
      }
      this.search.page += 1;
      this.moreLoading = true;
      // const { start, end } = this.searchDate;
      let params = { ...this.search, searchDate: this.searchDate };
      fetchList(params)
        .then(res => {
          const data = res.data.data.data;
          if (data.length < this.search.pageSize) {
            this.moreLoading = true;
            this.hasPage = false;
          } else {
            this.hasPage = true;
            // this.search.page += 1;
            this.moreLoading = false;
          }
          this.device = this.device.concat(data || []);
          this.icons = res.data.icons;
          this.wlevel = res.data.wlevel;
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },
    goFilter() {
      this.searchDate = { start: null, end: null };
      this.popupFilter = true;
    },
    formatTime(sstr) {
      if (!sstr) return;
      if (!(sstr instanceof Date)) {
        sstr = new Date(sstr);
      }
      return parseTime(sstr, "{y}-{m}-{d}");
    },
    handleConfirm(val, sType) {
      this.searchDate[sType] = this.formatTime(val);
    },
    handleCancel(sType) {
      this.searchDate[sType] = null;
    },
    changeTimeStart() {
      this.$refs.pickerTimeStart.open();
    },
    changeTimeEnd() {
      this.$refs.pickerTimeEnd.open();
    },
    cancalFilter() {
      this.searchDate = { start: null, end: null };
      if (this.isConfirm) {
        this.search = {
          page: 0,
          pageSize: 15
        };

        this.device = [];
        this.hasPage = true;
        this.getData();
      }
      this.isConfirm = false;
      // this.searchDate = { start: null, end: null };
      this.popupFilter = false;
    },
    confirmFilter() {
      const { start, end } = this.searchDate;
      if (!start || !end) {
        // Toast("请选择筛选时间");
        return;
      }
      this.isConfirm = true;
      this.search = {
        page: 0,
        pageSize: 15
      };

      this.device = [];
      this.hasPage = true;
      this.getData();
    },
    isRead(item) {
      return !item.warnlog;
    },
    cancelAlarm() {
      this.popupVisible = false;
    },
    confirmAlarm(item) {
      addWarn({ warn_id: item.pdi_index }).then(res => {
        this.popupVisible = false;
        if (!res) return;
        Toast("消息确认成功");
        this.selectItem.warnlog = res.data.data;
        this.desc();
      });
    }
  },
  created() {
    this.search = {
      page: 0,
      pageSize: 15
    };
  }
};
</script>

<style lang='scss'>
.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
  div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
}
.realwarn {
  .mint-cell-title {
    width: 60%;
  }
  .mint-cell-text {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
  }
}
.tool-button {
  .mint-cell-wrapper {
    padding: 0;
  }
  .mint-cell-value {
    width: 100%;
    .btn {
      width: 50%;
      padding: 0;
      border-radius: 0;
    }
  }
}
.alarm-dot {
  &::before {
    height: 0.15rem;
    width: 0.15rem;
    padding: 0;
    content: "";
    border-radius: 50%;
    display: inline-block;
    color: #f44336;
    background-color: #f44336;
    position: absolute;
    left: 0;
  }
}
</style>
