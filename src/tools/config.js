// export const host = 'http://47.105.96.194:8080';
export const host = process.env.VUE_APP_APIHOST;

export const socketHost = process.env.VUE_APP_SOCKETHOST;

const apiUrl = `${host}/api`;

export const imageUrl = `${host}/image`;

export default apiUrl;
