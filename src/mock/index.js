import Mock from 'mockjs';

import ImageApi from './image';
import MonitorApi from './monitor';

Mock.mock(/\/image\/item/, 'get', ImageApi.images);

Mock.mock(/\/monitor\/index/, 'get', MonitorApi.getList);

Mock.mock(/\/monitor\/air/, 'get', MonitorApi.getAir);

export default Mock;
