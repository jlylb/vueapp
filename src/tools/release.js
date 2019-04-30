import { saveCommand } from '@/api/home';
import Toast from '@/components/toast/toast';
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      isRelease: false,
    };
  },
  methods: {
    release(v) {
      console.log(v);
      if (v) return;
      MessageBox.prompt('操作确认', '', {
        inputValue: '',
        closeOnClickModal: false,
        inputValidator: this.inputValidator,
        inputType: 'password',
      })
        .then(({ value: pwd }) => {
          saveCommand({ pdi_index: this.pdi, pwd }).then((res) => {
            this.isRelease = false;
            if (res) {
              Toast('放电成功');
            }
          });
        })
        .catch(() => {
          this.isRelease = false;
          Toast('已取消执行');
        });
    },
    inputValidator(value) {
      const sStr = value.replace(/(^\s*)|(\s*$)/g, '');
      if (!sStr) {
        return '请输入密码';
      }
      return true;
    },
  },
};
