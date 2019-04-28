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
      MessageBox.confirm('确定执行吗?')
        .then(() => {
          saveCommand({ pdi_index: this.pdi }).then(() => {
            this.isRelease = false;
            Toast('放电成功');
          });
        })
        .catch(() => {
          this.isRelease = false;
          Toast('已取消执行');
        });
    },
  },
};
