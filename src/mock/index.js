import Mock from 'mockjs';

import ImageApi from './image';
import MonitorApi from './monitor';

import loginAPI from './login';

Mock.mock(/\/image\/item/, 'get', ImageApi.images);

Mock.mock(/\/monitor\/index/, 'get', MonitorApi.getList);

Mock.mock(/\/monitor\/air/, 'get', MonitorApi.getAir);

Mock.mock(/\/auth\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/auth\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/auth\/userinfo\.*/, 'get', loginAPI.getUserInfo);

export default Mock;
