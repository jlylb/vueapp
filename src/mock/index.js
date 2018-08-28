import Mock from 'mockjs';

import ImageApi from './image';

Mock.mock(/\/image\/item/, 'get', ImageApi.images);

export default Mock;
