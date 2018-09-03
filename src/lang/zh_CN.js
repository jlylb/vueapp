export default {
  custom: {
    username: {
      required: () => '用户名不能为空',
      alpha_dash: () => '用户名由字母、下划线、数字组成',
    },
    password: {
      required: () => '密码不能为空',
      min: () => '密码最少长度6位',
    },
  },
};
