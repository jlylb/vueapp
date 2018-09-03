import { getToken } from '@/tools/auth';
import Mock from 'mockjs';

const userMap = {
  username1: {
    user: {
      roles: ['admin'],
      token: 'username1',
      introduction: '我是超级管理员',
      avatar: Mock.Random.dataImage('100x100', 'avatar'),
      username: 'username1',
      company_name: '盛世奈特管理系统',
      company_logo: Mock.Random.dataImage('180x80', 'LOGO'),
    },
  },
  username2: {
    user: {
      roles: ['editor'],
      token: 'username2',
      introduction: '我是编辑',
      avatar: Mock.Random.dataImage('100x100', 'avatar'),
      username: 'username2',
      company_name: '盛世奈特管理系统',
      company_logo: Mock.Random.dataImage('180x80', 'LOGO'),
    },
  },
};

export default {
  loginByUsername: (config) => {
    const { username } = JSON.parse(config.body);
    return userMap[username].user;
  },
  getUserInfo: () => {
    const token = getToken();
    if (userMap[token]) {
      return userMap[token];
    }
    return false;
  },
  logout: () => 'success',
};
