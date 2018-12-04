export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: { ...query, mtype: 2 },
  });
}

export function fetchAreaDevice(params) {
  const data = { ...params, mtype: 2 };
  return axios({
    url: '/monitor/areadevice',
    method: 'post',
    data,
  });
}

export function fetchDeviceData(data) {
  return axios({
    url: '/control/devicedata',
    method: 'get',
    params: data,
  });
}

export function saveCommand(data) {
  return axios({
    url: '/control/command',
    method: 'post',
    params: data,
  });
}
export function saveSwitch(data) {
  return axios({
    url: '/control/switch',
    method: 'post',
    params: data,
  });
}
export function saveOut(data) {
  return axios({
    url: '/control/out',
    method: 'post',
    params: data,
  });
}
