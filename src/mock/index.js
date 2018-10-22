import Mock from 'mockjs';

import ImageApi from './image';
import TestApi from './test';
// import MonitorApi from './monitor';

import loginAPI from './login';

Mock.mock(/\/api\/image\/item/, 'get', ImageApi.images);
Mock.mock(/\/api\/donghuang\/index/, 'get', TestApi.index);
Mock.mock(/\/api\/donghuang\/device/, 'post', TestApi.device);
Mock.mock(/\/api\/donghuang\/realdata/, 'post', TestApi.real);
// Mock.mock(/\/monitor\/index/, 'get', MonitorApi.getList);

// Mock.mock(/\/monitor\/air/, 'get', MonitorApi.getAir);

Mock.mock(/\/api\/auth\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/api\/auth\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/api\/auth\/userinfo\.*/, 'get', loginAPI.getUserInfo);

export default Mock;
