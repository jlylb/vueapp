// const host = 'http://47.105.71.7:8080';
// const host = 'http://192.168.1.33';

// const host =
//   process.env.NODE_ENV === 'production' ? 'http://c7e5dfd0.ngrok.io' : 'http://192.168.1.33';

const apiUrl = `${process.env.VUE_APP_APIHOST}/api`;

console.log(apiUrl, 'api.....host', process.env);

export const imageUrl = `${process.env.VUE_APP_APIHOST}/image`;

export default apiUrl;
