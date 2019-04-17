export default function checkUpdate(data) {
  /* eslint-disable */
  return axios({
    url: '/checkupdate',
    method: 'post',
    data,
  });
}

export function addDevice(data) {
  /* eslint-disable */
  return axios({
    url: '/registerApp',
    method: 'post',
    data,
  });
}
