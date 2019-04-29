// const host = 'http://47.105.96.194:8080';
// const host = 'http://192.168.1.33';

const host =
  process.env.NODE_ENV === 'production' ? 'http://47.105.71.7:8080' : 'http://192.168.1.33';

const apiUrl = `${host}/api`;

export const imageUrl = `${host}/image`;

export default apiUrl;
