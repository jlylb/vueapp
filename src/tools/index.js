import { imageUrl } from '@/tools/config';

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (`${time}`.length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return timeStr;
}

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(Object.keys(json).map((key) => {
    if (json[key] === undefined) return '';
    return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
  })).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(`{"${decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')}"}`);
}

export function getDataValue(data, keys, other = '') {
  keys = keys || [];
  const len = keys.length;
  if (len === 0) return other;
  let index = 0;
  let dataVal = data;
  if (!data || Object.keys(data).length === 0) return other;
  while (dataVal != null && index < len) {
    dataVal = dataVal[keys[index++]];
  }
  dataVal = dataVal || other;
  return index && index == len ? dataVal : other;
}

export function getImageUrl(path) {
  if (!path) return '';
  const prefix = process.env.NODE_ENV === 'production' ? imageUrl : '/image';
  return `${prefix}/${path}`;
}
