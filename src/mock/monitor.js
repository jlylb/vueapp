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
      const now1 = +new Date();
      const timers = now1 - Math.ceil(Math.random() * 10000 * 3600);
      wendu.push([timers, Mock.Random.float(1, 30, 3, 3)]);
      const timers2 = now1 - Math.ceil(Math.random() * 10000 * 3600);
      shidu.push([timers2, Mock.Random.float(1, 30, 3, 3)]);
    }

    return {
      wendu,
      shidu,
    };
  },
};
