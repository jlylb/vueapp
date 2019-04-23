<template>
  <div class="picker-slot picker-my" :class="classNames" :style="flexStyle">
    <div
      v-if="!divider"
      ref="wrapper"
      class="picker-slot-wrapper"
      :class="{ dragging: dragging }"
      :style="{ height: contentHeight + 'rem' }"
    >
      <div
        class="picker-item"
        v-for="(itemValue, itemIndex) in mutatingValues"
        :key="itemIndex"
        :class="{ 'picker-selected': itemValue === currentValue }"
        :style="{ height: itemHeight + 'rem', lineHeight: itemHeight + 'rem' }"
      >{{ typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue }}</div>
    </div>
    <div v-if="divider">{{ content }}</div>
  </div>
</template>

<script>
import PickSlot from "mint-ui/packages/picker/src/picker-slot.vue";
import { once, addClass, removeClass } from "mint-ui/src/utils/dom";
import translateUtil from "./translate";
import emitter from "mint-ui/src/mixins/emitter";
import draggable from "mint-ui/packages/picker/src/draggable.js";
import Vue from "vue";
// if (!Vue.prototype.$isServer) {
//   require("raf.js");
// }
var rotateElement = function(element, angle) {
  if (!element) return;
  var transformProperty = translateUtil.transformProperty;
  element.style[transformProperty] =
    element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, "") +
    ` rotateX(${angle}deg)`;
};
export default {
  extends: PickSlot,
  props: {
    itemHeight: {
      type: Number,
      default: 1
    }
  },
  mixins: [emitter],
  computed: {
    dragRange() {
      var values = this.mutatingValues;
      var visibleItemCount = this.visibleItemCount;
      var itemHeight = this.rem2px(this.itemHeight);
      return [
        -itemHeight * (values.length - Math.ceil(visibleItemCount / 2)),
        itemHeight * Math.floor(visibleItemCount / 2)
      ];
    },
    minTranslateY() {
      return (
        this.rem2px(this.itemHeight) *
        (Math.ceil(this.visibleItemCount / 2) - this.mutatingValues.length)
      );
    },
    maxTranslateY() {
      return (
        this.rem2px(this.itemHeight) * Math.floor(this.visibleItemCount / 2)
      );
    }
  },
  methods: {
    rem2px(d) {
      return Math.round(window.lib.flexible.rem2px(d));
    },
    value2Translate(value) {
      var values = this.mutatingValues;
      var valueIndex = values.indexOf(value);
      var offset = Math.floor(this.visibleItemCount / 2);
      var itemHeight = this.rem2px(this.itemHeight);

      if (valueIndex !== -1) {
        return (valueIndex - offset) * -itemHeight;
      }
    },
    translate2Value(translate) {
      var itemHeight = this.rem2px(this.itemHeight);
      translate = Math.round(translate / itemHeight) * itemHeight;
      var index =
        -(translate - Math.floor(this.visibleItemCount / 2) * itemHeight) /
        itemHeight;
      return this.mutatingValues[index];
    },
    updateRotate: function(currentTranslate, pickerItems) {
      if (this.divider) return;
      var dragRange = this.dragRange;
      var wrapper = this.$refs.wrapper;
      if (!pickerItems) {
        pickerItems = wrapper.querySelectorAll(".picker-item");
      }
      if (currentTranslate === undefined) {
        currentTranslate = this.rem2px(
          translateUtil.getElementTranslate(wrapper).top
        );
      }
      var itemsFit = Math.ceil(this.visibleItemCount / 2);
      var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;
      var itemHeight = this.rem2px(this.itemHeight);
      [].forEach.call(pickerItems, (item, index) => {
        var itemOffsetTop = index * itemHeight;
        var translateOffset = dragRange[1] - currentTranslate;
        var itemOffset = itemOffsetTop - translateOffset;
        var percentage = itemOffset / itemHeight;
        var angle = angleUnit * percentage;
        if (angle > 180) angle = 180;
        if (angle < -180) angle = -180;
        rotateElement(item, angle);
        if (Math.abs(percentage) > itemsFit) {
          addClass(item, "picker-item-far");
        } else {
          removeClass(item, "picker-item-far");
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
            startTranslateTop: this.rem2px(
              translateUtil.getElementTranslate(el).top
            )
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
          var currentTranslate = this.rem2px(
            translateUtil.getElementTranslate(el).top
          );

          var duration = new Date() - dragState.start;
          let distance = Math.abs(
            dragState.startTranslateTop - currentTranslate
          );
          var itemHeight = this.rem2px(this.itemHeight);
          var visibleItemCount = this.visibleItemCount;
          let rect, offset;
          console.log(currentTranslate, distance, "drag_end ......... start");
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
        translateUtil.translateElement(
          item,
          null,
          this.rem2px(this.itemHeight) * index
        );
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
  height: 1rem;
  line-height: 1rem;
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
/* .picker-my {
  font-size: inherit;
} */
</style>
