import Mock from 'mockjs';

export default {
  getList: () => {
    const items = [
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
      {
        title: '',
        image: Mock.Random.image('200x150', Mock.Random.color()),
      },
    ];
    return { items };
  },
  getAir: () => {
    const wendu = [];
    const shidu = [];
    for (let i = 1; i < 10; i++) {
      const cur = [Mock.Random.now(), Mock.Random.float(1, 30, 3, 3)];
      wendu.push(cur);
      shidu.push(Mock.Random.float(1, 30));
    }
    return {
      wendu,
      shidu,
    };
  },
};
