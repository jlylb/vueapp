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
    pdi: {
      required: () => '设备编码不能为空',
    },
    name: {
      required: () => '设备名称不能为空',
    },
    phone: {
      required: () => '手机号不能为空',
      digits: () => '手机号由11位数字组成',
      regex: () => '手机号格式不正确',
    },
    code: {
      required: () => '验证码不能为空',
      digits: () => '验证码由6位数字组成',
    },
  },
};
