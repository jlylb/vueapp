<template>
  <div class="picker-slot" :class="classNames" :style="flexStyle">
    <div
      v-if="!divider"
      ref="wrapper"
      class="picker-slot-wrapper"
      :class="{ dragging: dragging }"
      :style="{ height: contentHeight + 'em' }"
    >
      <div
        class="picker-item"
        v-for="(itemValue, itemIndex) in mutatingValues"
        :key="itemIndex"
        :class="{ 'picker-selected': itemValue === currentValue }"
        :style="{ height: itemHeight + 'em', lineHeight: itemHeight + 'em' }"
      >{{ typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue }}</div>
    </div>
    <div v-if="divider">{{ content }}</div>
  </div>
</template>

<script>
import PickSlot from "mint-ui/packages/picker/src/picker-slot.vue";
import { once, addClass, removeClass } from "mint-ui/src/utils/dom";
import translateUtil from "@/tools/translate";
import emitter from "mint-ui/src/mixins/emitter";
import draggable from "mint-ui/packages/picker/src/draggable.js";
export default {
  extends: PickSlot,
  props: {
    itemHeight: {
      type: Number,
      default: 2
    }
  },
  mixins: [emitter],
  methods: {
    initEvents() {
      var el = this.$refs.wrapper;
      var dragState = {};
      var velocityTranslate, prevTranslate, pickerItems;
      draggable(el, {
        start: event => {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
          dragState = {
            range: this.dragRange,
            start: new Date(),
            startLeft: event.pageX,
            startTop: event.pageY,
            startTranslateTop: translateUtil.getElementTranslate(el).top
          };
          pickerItems = el.querySelectorAll(".picker-item");
        },
        drag: event => {
          this.dragging = true;
          dragState.left = event.pageX;
          dragState.top = event.pageY;
          var deltaY = dragState.top - dragState.startTop;
          var translate = dragState.startTranslateTop + deltaY;
          translateUtil.translateElement(el, null, translate);
          velocityTranslate = translate - prevTranslate || translate;
          prevTranslate = translate;
          if (this.rotateEffect) {
            this.updateRotate(prevTranslate, pickerItems);
          }
        },
        end: event => {
          this.dragging = false;
          var momentumRatio = 7;
          var currentTranslate = translateUtil.getElementTranslate(el).top;
          var duration = new Date() - dragState.start;
          let distance = Math.abs(
            dragState.startTranslateTop - currentTranslate
          );
          var itemHeight = this.itemHeight;
          var visibleItemCount = this.visibleItemCount;
          let rect, offset;
          if (distance < 6) {
            rect = this.$el.getBoundingClientRect();
            offset =
              Math.floor(
                (event.clientY -
                  (rect.top + ((visibleItemCount - 1) * itemHeight) / 2)) /
                  itemHeight
              ) * itemHeight;
            if (offset > this.maxTranslateY) {
              offset = this.maxTranslateY;
            }
            velocityTranslate = 0;
            currentTranslate -= offset;
          }
          var momentumTranslate;
          if (duration < 300) {
            momentumTranslate =
              currentTranslate + velocityTranslate * momentumRatio;
          }
          var dragRange = dragState.range;
          this.$nextTick(() => {
            var translate;
            if (momentumTranslate) {
              translate =
                Math.round(momentumTranslate / itemHeight) * itemHeight;
            } else {
              translate =
                Math.round(currentTranslate / itemHeight) * itemHeight;
            }
            translate = Math.max(
              Math.min(translate, dragRange[1]),
              dragRange[0]
            );
            translateUtil.translateElement(el, null, translate);
            this.currentValue = this.translate2Value(translate);
            if (this.rotateEffect) {
              this.planUpdateRotate();
            }
          });
          dragState = {};
        }
      });
    },
    planUpdateRotate: function() {
      var el = this.$refs.wrapper;
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateRotate();
      });
      once(el, translateUtil.transitionEndProperty, () => {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      });
    },
    doOnValueChange() {
      var value = this.currentValue;
      var wrapper = this.$refs.wrapper;
      translateUtil.translateElement(
        wrapper,
        null,
        this.value2Translate(value)
      );
    },
    doOnValuesChange() {
      var el = this.$el;
      var items = el.querySelectorAll(".picker-item");
      [].forEach.call(items, (item, index) => {
        translateUtil.translateElement(item, null, this.itemHeight * index);
      });
      if (this.rotateEffect) {
        this.planUpdateRotate();
      }
    }
  }
};
</script>

<style>
.picker-item {
  height: 1.6em;
  line-height: 1.6em;
  padding: 0 10px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #707274;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  transition-duration: 0.3s;
  backface-visibility: hidden;
}
</style>
