export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: query,
  });
}

export function fetchDevice(data) {
  return axios({
    url: '/monitor/realdata',
    method: 'post',
    data,
  });
}

export function fetchAreaDevice(data) {
  return axios({
    url: '/monitor/areadevice',
    method: 'post',
    data,
  });
}

export function fetchHistoryDevice(data) {
  return axios({
    url: '/monitor/data',
    method: 'post',
    data,
  });
}

export function fetchAllDevice(data) {
  return axios({
    url: '/deviceinfo',
    method: 'get',
    params: data,
  });
}

export function fetchDeviceType(data) {
  return axios({
    url: '/deviceinfo/devicetype/all',
    method: 'get',
    params: data,
  });
}

export function fetchAreas(data) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: { ...data, isArea: false },
  });
}

export function postDevice(data) {
  return axios({
    url: '/deviceinfo',
    method: 'post',
    data,
  });
}
