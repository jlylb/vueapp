import Mock from 'mockjs';
import { param2Obj } from '@/tools';
import itemData from './item';
import { items } from './item';

const power = {
  devices: [
    {
      label: '单相ups',
      value: '1',
      icon: 'ups',
      router: 'sups',
      child: 0,
      rvalue: '1',
      num: 1,
    },
    {
      label: '三相ups',
      value: '10',
      icon: 'ups',
      router: 'ups',
      child: 0,
      rvalue: '10',
      num: 1,
    },
    {
      label: '精密配电',
      value: '5',
      icon: 'jmpd',
      router: 'peidian',
      child: 0,
      rvalue: '5',
      num: 1,
    },
  ],
  name: '动力系统',
  status: 1,
};

const env = {
  devices: [
    {
      label: '精密空调',
      value: '13',
      icon: 'jmkt',
      router: 'air',
      child: 0,
      rvalue: '13',
      num: 1,
    },
    {
      label: '温湿度',
      value: '33',
      icon: 'wsdu',
      router: 'temphu',
      child: 0,
      rvalue: '33',
      num: 1,
    },
  ],
  name: '环境系统',
  status: 1,
};

const fire = {
  devices: [
    {
      label: '烟感',
      value: '341',
      icon: 'yangan',
      router: 'yangan',
      child: 1,
      rvalue: '34',
      num: 2,
    },
  ],
  name: '消防系统',
  status: 1,
};

const protect = {
  devices: [
    {
      label: '红外',
      value: '343',
      icon: 'red-gan',
      router: 'red',
      child: 3,
      rvalue: '34',
      num: 2,
    },
  ],
  name: '安保系统',
  status: 1,
};
const data = {
  power,
  env,
  fire,
  protect,
};
export default {
  index: (config) => {
    const { type } = param2Obj(config.url);
    return data[type];
  },
  device: (config) => {
    console.log(JSON.parse(config.body), 'device ......');
    const { type } = JSON.parse(config.body);
    return itemData[type];
  },
  real: (config) => {
    console.log(JSON.parse(config.body), 'device ......');
    const { pdi } = JSON.parse(config.body);
    return items[pdi];
  },
};
