export function fetchDeviceData(data) {
  return axios({
    url: '/limit/index',
    method: 'get',
    params: data,
  });
}

export function saveCommand(data) {
  return axios({
    url: '/limit/command',
    method: 'post',
    data,
  });
}
