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
    code: {
      required: () => '验证码不能为空',
      digits: () => '验证码6个数字',
    },
    phone: {
      required: () => '手机号不能为空',
      digits: () => '手机号11位数字',
      regex: () => '手机号格式不正确',
    },
    new_password: {
      required: () => '新密码不能为空',
      min: () => '新密码最少长度6位',
    },
    new_password_confirmation: {
      required: () => '确认密码不能为空',
      min: () => '确认密码最少长度6位',
    },
  },
};
