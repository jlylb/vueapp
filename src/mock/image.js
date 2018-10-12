import Mock from 'mockjs';

export default {
  images: () => {
    const items = [
      {
        url: 'http://www.baidu.com',
        image: Mock.Random.image('600x150', Mock.Random.color()),
      },
      {
        url: 'http://www.baidu.com',
        image: Mock.Random.image('600x150', Mock.Random.color()),
      },
      {
        url: 'http://www.baidu.com',
        image: Mock.Random.image('600x150', Mock.Random.color()),
      },
    ];
    return { items, status: 1 };
  },
};
