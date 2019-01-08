// export const host = 'http://47.105.96.194:8080';
export const host = 'http://192.168.1.33';

// export const socketHost =
//   process.env.NODE_ENV === 'production' ? 'http://47.105.96.194:8083' : 'http://192.168.1.33:8083';

export const socketHost = 'http://192.168.1.33:8083';
// export const socketHost = 'http://47.105.96.194:8083';

const apiUrl = `${host}/api`;

export const imageUrl = `${host}/image`;

export default apiUrl;
