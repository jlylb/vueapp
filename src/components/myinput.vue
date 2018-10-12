<template>
  <x-cell
    class="mint-field my-input"
    :title="label"
    v-clickoutside="doCloseActive"
    :class="[{
      'is-textarea': inputType === 'textarea',
      'is-nolabel': !label
    }]">
    <template slot='left'>
        <slot name='prepend'></slot>
    </template>
    <template slot='right'>
        <svg-icon 
        :icon-class="eyeIcon" 
        class='login-input-icon'
        @click.native='showPass' 
        v-if="type === 'password'"></svg-icon>
        <slot name='append'></slot>
    </template>
    <textarea
      @change="$emit('change', currentValue)"
      ref="textarea"
      class="mint-field-core"
      :placeholder="placeholder"
      v-if="inputType === 'textarea'"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      v-model="currentValue">
    </textarea>
    <input
      @change="$emit('change', currentValue)"
      ref="input"
      class="mint-field-core"
      :class='activeClass'
      :placeholder="placeholder"
      :number="inputType === 'number'"
      v-else
      :type="inputType"
      @focus="active = true"
      :disabled="disabled"
      :readonly="readonly"
      :value="currentValue"
      @input="handleInput">
    <div
      @click="handleClear"
      class="mint-field-clear"
      v-if="!disableClear"
      v-show="currentValue && inputType !== 'textarea' && active">
      <i class="mintui mintui-field-error"></i>
        <!-- <svg-icon 
        icon-class="clear" 
        class='clear-input-icon'></svg-icon> -->
    </div>
    <span class="mint-field-state" v-if="state" :class="['is-' + state]">
      <i class="mintui" :class="['mintui-field-' + state]"></i>
    </span>
    <div class="mint-field-other">
      <slot></slot>
    </div>
  </x-cell>
</template>

<script>
import { Cell as XCell } from 'mint-ui';
import Clickoutside from '@/tools/clickoutside';

export default {
  name: 'mt-field-input',
  data() {
    return {
      active: false,
      currentValue: this.value,
      isShowPass: this.showEye,
      inputType: this.type
    };
  },
  directives: {
    Clickoutside
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    rows: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    showEye: {
        type: Boolean,
        default: false
    },
    state: {
      type: String,
      default: 'default'
    },
    value: {},
    attr: Object
  },
  components: { XCell },
  computed: {
      activeClass() {
          return {'active-field-input': this.active}
      },
      eyeIcon() {
          return this.isShowPass?'eye':'eye-close'
      }
  },
  methods: {
    doCloseActive() {
      this.active = false;
    },
    handleInput(evt) {
      this.currentValue = evt.target.value;
    },
    handleClear() {
      if (this.disabled || this.readonly) return;
      this.currentValue = '';
    },
    showPass() {
        this.isShowPass = !this.isShowPass
        this.inputType = this.isShowPass?'text':'password'
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit('input', val);
    },
    attr: {
      immediate: true,
      handler(attrs) {
        this.$nextTick(() => {
          const target = [this.$refs.input, this.$refs.textarea];
          target.forEach(el => {
            if (!el || !attrs) return;
            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
          });
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
.mint-field-clear {
    opacity: 1;
}
.mint-field-core {
    background-color: transparent;
    color: #fff;
}
.active-field-input {
    /* border: 1px solid #ff00ff; */
}
.mint-field {
    background-color: transparent;
    align-items: center;
    border: 1px solid #fff;
    margin: 10px auto;
    /* margin: 10px auto; */
}
.mint-field >>> .mint-cell-wrapper {
    background-image: none;
}

.mint-field >>> .mint-cell-left {
    transform: none;
    position: inherit;
    padding-left: 10px;
}
.mint-field >>> .mint-cell-right {
    transform: none;
    position: inherit;
    padding-right: 10px;
}
.mint-field:active, .mint-field:hover {
    border-color: #26a2ff
}

</style>